import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Token ekleme interceptor'u
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("İstek interceptor hatası:", error);
    return Promise.reject(error);
  }
);

// Hata yönetimi interceptor'u (opsiyonel ama tavsiye edilir)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("🚨 API Hatası:", error?.response?.data || error.message);
    // Burada auth hatası olursa logout bile yapılabilir
    return Promise.reject(error);
  }
);

export default axiosInstance;
