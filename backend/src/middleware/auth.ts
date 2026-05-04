import { auth } from "express-oauth2-jwt-bearer";
import type { Request, Response, NextFunction } from "express";
const audience = process.env.AUTH0_AUDIENCE;
const issuerBaseURL = process.env.AUTH0_ISSUER_BASE_URL;
import jwt from "jsonwebtoken";
import type { StringDecoder } from "node:string_decoder";
import User from "../models/user.ts";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      auth0Id?: string;
    }
  }
}

if (!audience || !issuerBaseURL) {
  throw new Error(
    "Auth0 configuration is missing. Please check your environment variables.",
  );
}

export const jwtCheck = auth({
  audience,
  issuerBaseURL,
  tokenSigningAlg: "RS256",
});

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token as string) as jwt.JwtPayload;
    const auth0Id = decoded.sub;

    if (!auth0Id || typeof auth0Id !== "string") {
      return res.sendStatus(401);
    }

    const user = await User.findOne({ auth0Id });

    if (!user) {
      return res.sendStatus(401);
    }
    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};
