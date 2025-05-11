"use client"
import { useEffect, useState } from "react";

export const useAlarmList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          "https://dev4.tadalabs.vn/api/resource/Alarm%20Report?" +
          new URLSearchParams({
            fields: JSON.stringify([
              "name",
              "alarm_type",
              "cam_id",
              "khu_vuc",
              "timestamp",
              "loai_vi_pham",
              "trang_thai",
              "image",
            ]),
            limit_page_length: "10",
            limit_start: "0",
            order_by: "timestamp desc",
            filters: JSON.stringify([
              ["alarm_type", "=", "Xâm Nhập Trái Phép"],
            ]),
          });

        const res = await fetch(url, {
          headers: {
            Authorization: "token a6b73e5e5d8b4f4:87aaa4e073c8b9f",
          },
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const result = await res.json();
        setData(result.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
