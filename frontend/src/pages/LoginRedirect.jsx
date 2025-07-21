// src/pages/LoginRedirect.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts";
import { Helmet } from "react-helmet-async";

export default function LoginRedirect() {
  const navigate = useNavigate();
  const { userRole, loading } = useAuth();

  useEffect(() => {
    if (loading) return; // Hâlâ auth yükleniyorsa bekle

    switch (userRole) {
      case "product_owner":
        navigate("/dashboard/po");
        break;
      case "developer":
        navigate("/dashboard/developer");
        break;
      case "tester":
        navigate("/dashboard/tester");
        break;
      case "analyst":
        navigate("/dashboard/analyst");
        break;
      default:
        navigate("/unauthorized");
    }
  }, [userRole, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Helmet>
        <title>Yönlendiriliyor...</title>
      </Helmet>
      <h1 className="text-xl font-semibold animate-pulse text-gray-700">
        Yönlendiriliyorsunuz...
      </h1>
    </div>
  );
}
