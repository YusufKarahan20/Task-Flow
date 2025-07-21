// src/hooks/useTasks.js
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => axiosInstance.get("/tasks"),
    select: (res) => res.data,
    staleTime: 1000 * 60 * 5, // 5 dakika cache
    retry: false, // opsiyonel: hata aldığında tekrar denemesin
    onError: (err) => {
      console.error("Görevler alınırken hata oluştu:", err);
    },
  });
};
