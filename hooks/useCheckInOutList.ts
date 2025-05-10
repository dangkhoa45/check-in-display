"use client";

import { CheckInOutEvent } from "@/types/checkInOutEvent";
import { useEffect, useState } from "react";

const PAGE_SIZE = 3;

interface Props {
  type: "IN" | "OUT";
}

export const useCheckInOutList = ({ type }: Props) => {
  const [data, setData] = useState<CheckInOutEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchData = async (currentPage: number) => {
    setLoading(true);
    try {
      const offset = currentPage * PAGE_SIZE;
      const res = await fetch(
        `https://dev4.tadalabs.vn/api/resource/Employee%20Checkin?fields=["*"]&limit_page_length=${PAGE_SIZE}&limit_start=${offset}&order_by=creation desc&filters=[["log_type", "=", "${type}"]]`,
        {
          headers: {
            Authorization: "token a6b73e5e5d8b4f4:87aaa4e073c8b9f",
          },
          cache: "no-store",
        }
      );

      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const result = await res.json();

      setData(result.data);
      setTotal(result.total || 80);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);

    const interval = setInterval(() => {
      fetchData(page);
    }, 5000);

    return () => clearInterval(interval);
  }, [page]);

  return {
    data,
    loading,
    error,
    page,
    setPage,
    totalPages: Math.ceil(total / PAGE_SIZE),
  };
};
