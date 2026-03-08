import { GoogleIcon } from "@src/shared/ui/GoogleIcon";
import "./GoogleButton.css";
export const GoogleButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };
  return (
    <button type="button" onClick={handleGoogleLogin} className="btn-google">
      <GoogleIcon />
      Continue with Google
    </button>
  );
};
