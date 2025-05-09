export default function Camera3() {
  return (
    <div className="relative bg-gray-900 overflow-hidden">
      <img
        src={`/placeholder.svg?height=480&width=640&text=Camera+3`}
        alt="Camera 3"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-70 p-1 flex justify-between items-center text-xs">
        <span>Cổng chính</span>
        <span className="bg-red-600 px-1 rounded-sm">LIVE</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-1 text-xs">
        C2T10/485B2
      </div>
    </div>
  );
}
