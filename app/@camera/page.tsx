export default function CameraGrid() {
  const cameraFeeds = [
    { id: 1, name: "Cổng chính", location: "C2T10/485B2" },
    { id: 2, name: "Lối vào phụ", location: "C3T05/221A1" },
    { id: 3, name: "Khu vực sản xuất", location: "C1T08/332C4" },
    { id: 4, name: "Bãi đậu xe", location: "C4T02/115B3" },
  ];

  return (
    <>
      {cameraFeeds.map((camera) => (
        <div key={camera.id} className="relative bg-gray-900 overflow-hidden">
          <img
            src={`/placeholder.svg?height=480&width=640&text=Camera+${camera.id}`}
            alt={`Camera ${camera.id}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-70 p-1 flex justify-between items-center text-xs">
            <span>{camera.name}</span>
            <span className="bg-red-600 px-1 rounded-sm">LIVE</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-1 text-xs">
            {camera.location}
          </div>
        </div>
      ))}
    </>
  );
}
