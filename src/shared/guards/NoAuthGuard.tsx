import { useCheckAuthMutation } from "@src/store/api/authApi";
import { useEffect, useState, type ReactElement } from "react";
import { useNavigate } from "react-router";

interface AuthGuardProps {
  children: ReactElement;
}
export const NoAuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const [checkAuth] = useCheckAuthMutation();
  const [hasAuth, setHasAuth] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth()
      .unwrap()
      .then(() => {
        setHasAuth(true);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log("auth FAIL", err);
        setHasAuth(false);
      });
  }, []);

  return hasAuth === false ? <>{children}</> : null;
};
