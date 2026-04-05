import { Auth0Provider } from "@auth0/auth0-react";
import type { AppState, User } from "@auth0/auth0-react";
import type { PropsWithChildren } from "react";
// import { useNavigate } from "react-router-dom";
import { useCreateUser as userCreateUser } from "./api/MyUserApi";

type Props = PropsWithChildren;

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  // const navigate = useNavigate();
  const { createUser } = userCreateUser();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  if (!domain || !clientId || !redirectUri) {
    throw new Error(
      "Auth0 configuration is missing. Please check your environment variables.",
    );
  }

  const onRedirectCallback = (appState?: AppState, user?: User) => {
    if (user?.sub && user?.email) {
      createUser({ auth0Id: user.sub, email: user.email });
    }
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
