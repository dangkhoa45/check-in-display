import { CheckIn } from "@/types/checkInOutEvent";
import { useEffect, useState } from "react";

interface Props {
  status: string;
}

export const useCheckList = ({ status }: Props) => {
  const [data, setData] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://dev4.tadalabs.vn/api/method/fire_alarm_app.custom_api.dashboard_api.get_checkin_and_intrusion_list?page=1&page_length=3&status=${status}`,
          {
            headers: {
              Authorization: "token a6b73e5e5d8b4f4:87aaa4e073c8b9f",
            },
            cache: "no-store",
          }
        );

        if (!res.ok) throw new Error(`Failed: ${res.status}`);

        const result = await res.json();

        setData(result.message.message.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [status]);

  return { data, loading, error };
};
