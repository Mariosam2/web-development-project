// NotFoundPage.tsx
import { useNavigate } from "react-router";
import "./NotFound.css";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <span className="not-found__code mb-4">404</span>
      <h1 className="not-found__title mb-2.5">Page not found</h1>
      <p className="not-found__subtitle">The page you're looking for doesn't exist or has been moved.</p>
      <button className="not-found__btn" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};
