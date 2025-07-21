// src/hooks/useCurrentUser.js
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => axiosInstance.get("/auth/me"),
    select: (res) => res.data,
    staleTime: 1000 * 60 * 5, // 5 dakika cache
    retry: false,
    onError: (error) => {
      console.error("Kullanıcı verisi alınamadı ❌", error);
    },
  });
}
