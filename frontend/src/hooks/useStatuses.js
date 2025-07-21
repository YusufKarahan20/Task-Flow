// src/hooks/useStatuses.js
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axiosInstance";

export const useStatuses = () => {
  return useQuery({
    queryKey: ["statuses"],
    queryFn: () => axiosInstance.get("/statuses"),
    select: (res) => res.data,
    staleTime: 1000 * 60 * 10, // 10 dakika cache
    onError: (err) => {
      console.error("Durumlar alınırken hata oluştu ❌", err);
    },
  });
};
