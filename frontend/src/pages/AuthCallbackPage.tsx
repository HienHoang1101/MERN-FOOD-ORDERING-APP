import { useAuth0 } from "@auth0/auth0-react";
import { useCreateUser as userCreateUser } from "../api/MyUserApi";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = userCreateUser();

  const hasCreateUser = useRef(false);

  useEffect(() => {
    const createUserAndRedirect = async () => {
      if (user?.sub && user?.email && !hasCreateUser.current) {
        hasCreateUser.current = true;
        await createUser({ auth0Id: user.sub, email: user.email });
      }

      navigate("/");
    };

    void createUserAndRedirect();
  }, [createUser, navigate, user]);

  return <>Loading...</>;
};

export default AuthCallbackPage;
