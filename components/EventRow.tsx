import { CheckInOutEvent } from "@/types/checkInOutEvent";

interface Props {
  event: CheckInOutEvent;
}

export default function EventRow({ event }: Props) {
  let bgColor = "bg-gray-900";
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

  const renderPPEStatus = (ppeItems: any) => (
    <div className="bg-gray-800 bg-opacity-80 p-1 rounded mt-1">
      <div className="grid grid-cols-2 gap-x-2 gap-y-1">
        {Object.entries(ppeItems).map(([key, value]) => (
          <div key={key} className="flex items-center gap-1">
            <div
              className={`w-3 h-3 rounded-full ${
                value ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-xs capitalize">{key}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className={`${bgColor} text-white p-2 border-b border-gray-800 flex items-center transition-colors duration-500`}
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
}
