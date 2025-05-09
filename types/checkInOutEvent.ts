export type CheckInOutEvent = {
  id: number;
  timestamp: string;
  employeeName: string;
  statusMessage: string;
  ppeStatus: string;
  ppeItems: {
    mu: boolean;
    giay: boolean;
    gangtay: boolean;
    aophanquang: boolean;
  };
  isNew: boolean;
  avatar: string;
};

export const initialCheckIns: CheckInOutEvent[] = [
  {
    id: 1,
    timestamp: "13:17:20",
    employeeName: "Bùi Kim Tiến Điền",
    statusMessage: "Check-in thành công",
    ppeStatus: "Đầy đủ",
    ppeItems: {
      mu: true,
      giay: true,
      gangtay: true,
      aophanquang: true,
    },
    isNew: false,
    avatar: "/placeholder.svg?height=120&width=120",
  },
  // thêm các check-ins khác nếu cần
];

export const newCheckIns: CheckInOutEvent[] = [
  {
    id: 4,
    timestamp: "13:20:22",
    employeeName: "Phan Văn Quân",
    statusMessage: "Thiếu đồ bảo hộ",
    ppeStatus: "Thiếu",
    ppeItems: {
      mu: false,
      giay: true,
      gangtay: true,
      aophanquang: false,
    },
    isNew: true,
    avatar: "/placeholder.svg?height=120&width=120",
  },
];
