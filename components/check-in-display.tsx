"use client";

import { useEffect, useState } from "react";
import { CheckInOutEvent } from "../types/checkInOutEvent";

const initialCheckIns = [
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
  {
    id: 2,
    timestamp: "13:15:15",
    employeeName: "Trương Minh Dương",
    statusMessage: "Thiếu đồ bảo hộ",
    ppeStatus: "Thiếu",
    ppeItems: {
      mu: false,
      giay: true,
      gangtay: false,
      aophanquang: true,
    },
    isNew: false,
    avatar: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 3,
    timestamp: "13:14:14",
    employeeName: "Lưu Gia Miên",
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
];

const initialCheckOuts = [
  {
    id: 101,
    timestamp: "17:30:45",
    employeeName: "Nguyễn Văn Hùng",
    statusMessage: "Check-out thành công",
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
  {
    id: 102,
    timestamp: "17:28:22",
    employeeName: "Phạm Thị Mai",
    statusMessage: "Thiếu đồ bảo hộ",
    ppeStatus: "Thiếu",
    ppeItems: {
      mu: true,
      giay: true,
      gangtay: true,
      aophanquang: false,
    },
    isNew: false,
    avatar: "/placeholder.svg?height=120&width=120",
  },
];

const newCheckIns = [
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
  {
    id: 5,
    timestamp: "13:22:47",
    employeeName: "Người lạ",
    statusMessage: "Không xác định",
    ppeStatus: "Không xác định",
    ppeItems: {
      mu: false,
      giay: false,
      gangtay: false,
      aophanquang: false,
    },
    isNew: true,
    avatar: "/placeholder.svg?height=120&width=120",
  },
];

const newCheckOuts = [
  {
    id: 103,
    timestamp: "17:32:10",
    employeeName: "Trần Văn Bình",
    statusMessage: "Thiếu đồ bảo hộ",
    ppeStatus: "Thiếu",
    ppeItems: {
      mu: true,
      giay: false,
      gangtay: false,
      aophanquang: true,
    },
    isNew: true,
    avatar: "/placeholder.svg?height=120&width=120",
  },
];

const cameraFeeds = [
  { id: 1, name: "Cổng chính", location: "C2T10/485B2" },
  { id: 2, name: "Lối vào phụ", location: "C3T05/221A1" },
  { id: 3, name: "Khu vực sản xuất", location: "C1T08/332C4" },
  { id: 4, name: "Bãi đậu xe", location: "C4T02/115B3" },
];

export default function CheckInDisplay() {
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [currentDate, setCurrentDate] = useState("");
  const [checkIns, setCheckIns] = useState(initialCheckIns);
  const [checkOuts, setCheckOuts] = useState(initialCheckOuts);
  const [checkInIndex, setCheckInIndex] = useState(0);
  const [checkOutIndex, setCheckOutIndex] = useState(0);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);

      const day = now.getDate().toString().padStart(2, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const year = now.getFullYear();
      setCurrentDate(`${day}/${month}/${year}`);
    };

    updateClock();
    const clockInterval = setInterval(updateClock, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    if (checkInIndex >= newCheckIns.length) return;

    const addEventInterval = setInterval(() => {
      const newEvent = { ...newCheckIns[checkInIndex], isNew: true };

      setCheckIns((prevEvents) => {
        const updatedEvents = [newEvent, ...prevEvents.slice(0, 2)];
        return updatedEvents;
      });

      setCheckInIndex((prevIndex) => prevIndex + 1);

      setTimeout(() => {
        setCheckIns((prevEvents) =>
          prevEvents.map((event) =>
            event.id === newEvent.id ? { ...event, isNew: false } : event
          )
        );
      }, 15000);
    }, 30000);

    return () => clearInterval(addEventInterval);
  }, [checkInIndex]);

  useEffect(() => {
    if (checkOutIndex >= newCheckOuts.length) return;

    const addEventInterval = setInterval(() => {
      const newEvent = { ...newCheckOuts[checkOutIndex], isNew: true };

      setCheckOuts((prevEvents) => {
        const updatedEvents = [newEvent, ...prevEvents.slice(0, 2)];
        return updatedEvents;
      });

      setCheckOutIndex((prevIndex) => prevIndex + 1);

      setTimeout(() => {
        setCheckOuts((prevEvents) =>
          prevEvents.map((event) =>
            event.id === newEvent.id ? { ...event, isNew: false } : event
          )
        );
      }, 15000);
    }, 45000);

    return () => clearInterval(addEventInterval);
  }, [checkOutIndex]);

  const renderPPEStatus = (ppeItems: any) => {
    if (!ppeItems) return null;

    return (
      <div className="bg-gray-800 bg-opacity-80 p-1 rounded mt-1">
        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
          <div className="flex items-center gap-1">
            <div
              className={`w-3 h-3 rounded-full ${
                ppeItems.mu ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-xs">Mũ</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className={`w-3 h-3 rounded-full ${
                ppeItems.giay ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-xs">Giày</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className={`w-3 h-3 rounded-full ${
                ppeItems.gangtay ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-xs">Găng tay</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className={`w-3 h-3 rounded-full ${
                ppeItems.aophanquang ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-xs">Áo phản quang</span>
          </div>
        </div>
      </div>
    );
  };

  const renderEventRow = (event: CheckInOutEvent) => {
    let bgColor = "bg-gray-900";
    const textColor = "text-white";
    let statusColor = "bg-green-500";

    if (event.ppeStatus === "Thiếu") {
      bgColor = "bg-orange-500 bg-opacity-30";
      statusColor = "bg-orange-500";
    } else if (event.statusMessage === "Không xác định") {
      bgColor = "bg-red-600 bg-opacity-30";
      statusColor = "bg-red-600";
    }

    if (event.isNew) {
      bgColor = "bg-yellow-100 bg-opacity-20";
    }

    return (
      <div
        key={event.id}
        className={`${bgColor} ${textColor} p-2 border-b border-gray-800 flex items-center transition-colors duration-500`}
      >
        <div className="w-1/6 text-base font-mono">{event.timestamp}</div>
        <div className="w-5/6 flex items-center gap-3">
          <div className="relative">
            <img
              src={event.avatar || "/placeholder.svg"}
              alt={event.employeeName}
              className={`w-24 h-24 rounded-full object-cover ${
                event.statusMessage === "Không xác định"
                  ? "border-4 border-red-500"
                  : ""
              }`}
            />
            {event.statusMessage === "Không xác định" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl font-bold text-red-500">X</div>
              </div>
            )}
            <div
              className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${statusColor} border-2 border-gray-900`}
            ></div>
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-xl">{event.employeeName}</div>
            {event.ppeStatus === "Thiếu" && renderPPEStatus(event.ppeItems)}
            {event.statusMessage === "Không xác định" && (
              <div className="text-base font-medium bg-red-700 px-2 py-0.5 rounded inline-block mt-1">
                Cảnh báo: Người lạ
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden">
      <div className="flex h-full">
        {/* Left side - Camera Feeds (4 cameras in grid) */}
        <div className="w-1/2 h-full p-1">
          <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
            {cameraFeeds.map((camera) => (
              <div
                key={camera.id}
                className="relative bg-gray-900 overflow-hidden"
              >
                {/* Camera Feed */}
                <img
                  src={`/placeholder.svg?height=480&width=640&text=Camera+${camera.id}`}
                  alt={`Camera ${camera.id}`}
                  className="w-full h-full object-cover"
                />

                {/* Camera Info Overlay */}
                <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-70 p-1 flex justify-between items-center text-xs">
                  <span>{camera.name}</span>
                  <span className="bg-red-600 px-1 rounded-sm">LIVE</span>
                </div>

                {/* Camera Location */}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-1 text-xs">
                  {camera.location}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Check-in/Check-out Events */}
        <div className="w-1/2 h-full flex flex-col">
          {/* Header with time */}
          <div className="bg-black p-2 flex justify-between items-center">
            <h1 className="text-xl font-bold">Hệ thống Camera AI</h1>
            <div className="flex items-center gap-3">
              <div className="text-sm">{currentDate}</div>
              <div className="text-xl font-mono bg-gray-900 px-3 py-1 rounded">
                {currentTime}
              </div>
            </div>
          </div>

          {/* Check-in Section (CI) */}
          <div className="flex-1 flex flex-col">
            <div className="bg-blue-900 p-2 font-bold">CI - Check In</div>
            <div className="flex-1 overflow-hidden">
              {checkIns.map(renderEventRow)}
            </div>
          </div>

          {/* Check-out Section (CO) */}
          <div className="flex-1 flex flex-col">
            <div className="bg-green-900 p-2 font-bold">CO - Check Out</div>
            <div className="flex-1 overflow-hidden">
              {checkOuts.map(renderEventRow)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
