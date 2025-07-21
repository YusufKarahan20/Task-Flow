import { Helmet } from "react-helmet-async";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useAuth } from "../contexts/AuthContexts";

export default function DashboardAnalyst() {
  const { logout } = useAuth();
  const { data: user, isLoading, isError, error } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-lg animate-pulse">Yükleniyor...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <p className="text-red-600 font-semibold">❌ Hata: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
      <Helmet>
        <title>Analyst Dashboard</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-2">
        Hoş geldin, {user.displayName || user.email}! 📊
      </h1>

      <p className="mb-6 text-gray-600">Rolün: {user.role}</p>

      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Çıkış Yap
      </button>
    </div>
  );
}
