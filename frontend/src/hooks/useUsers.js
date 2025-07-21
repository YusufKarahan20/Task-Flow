// src/hooks/useUsers.js
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => axiosInstance.get("/users"),
    select: (res) => res.data,
    staleTime: 1000 * 60 * 5, // 5 dakika cache
    retry: false,
    onError: (err) => {
      console.error("Kullanıcılar çekilirken hata oluştu:", err);
    },
  });
};
