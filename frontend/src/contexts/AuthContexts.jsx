import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useQueryClient } from "@tanstack/react-query";
import axios from "../lib/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("🔁 onAuthStateChanged tetiklendi");

      if (user) {
        console.log("👤 Firebase login başarılı:", user.email);
        try {
          const token = await user.getIdToken();
          console.log("🔐 Token alındı:", token.slice(0, 10) + "...");

          const { data } = await axios.get("/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });

          console.log("✅ Backend dönüşü:", data);
          console.log("🧩 Gelen rol:", data.role);

          setUserRole(data.role);
          localStorage.setItem("userRole", data.role);
          localStorage.setItem("token", token);
        } catch (err) {
          console.error("❌ Token doğrulama hatası:", err);
        }
      } else {
        console.log("🚫 Firebase login yok");
        setUserRole(null);
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    queryClient.clear();
    setUserRole(null);
    localStorage.clear();
    window.location.href = "/login"; // useNavigate yerine doğrudan yönlendirme
  };

  return (
    <AuthContext.Provider value={{ userRole, setUserRole, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
