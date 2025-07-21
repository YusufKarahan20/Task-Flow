// src/pages/Unauthorized.jsx
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-4">
      <Helmet>
        <title>Erişim Reddedildi</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-red-600 mb-3">Erişim Reddedildi ❌</h1>
      <p className="text-gray-700 text-center mb-6 max-w-md">
        Bu sayfaya erişim izniniz bulunmamaktadır. Lütfen yetkili bir hesapla giriş yapmayı deneyin.
      </p>
      <Link
        to="/login-redirect"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
      >
        Dashboard'a Dön
      </Link>
    </div>
  );
}
