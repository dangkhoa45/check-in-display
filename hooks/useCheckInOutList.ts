import { useEffect, useState } from "react";

export const useCheckInOutList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://dev4.tadalabs.vn/api/resource/Employee%20Checkin?fields=[%22*%22]&limit_page_length=50&limit_start=0&order_by=creation%20desc",
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
