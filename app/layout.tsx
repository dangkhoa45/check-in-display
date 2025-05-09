import ClockDisplay from "@/components/ClockDisplay";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
};
interface Props {
  camera1: React.ReactNode;
  camera2: React.ReactNode;
  camera3: React.ReactNode;
  camera4: React.ReactNode;
  ci: React.ReactNode;
  co: React.ReactNode;
}

export default function RootLayout({
  camera1,
  camera2,
  camera3,
  camera4,
  ci,
  co,
}: Props) {
  return (
    <html lang="vi">
      <body className="bg-black text-white">
        <div className="flex h-screen w-full overflow-hidden">
          {/* LEFT - 4 camera */}
          <div className="w-1/2 p-1 grid grid-cols-2 grid-rows-2 gap-1 h-full">
            {camera1}
            {camera2}
            {camera3}
            {camera4}
          </div>

          {/* RIGHT - CI/CO */}
          <div className="w-1/2 flex flex-col h-full">
            <div className="bg-black p-2 flex justify-between items-center">
              <h1 className="text-xl font-bold">Hệ thống Camera AI</h1>
              <ClockDisplay />
            </div>

            <div className="flex-1 flex flex-col">
              <div className="bg-blue-900 p-2 font-bold">CI - Check In</div>
              <div className="flex-1 overflow-hidden">{ci}</div>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="bg-green-900 p-2 font-bold">CO - Check Out</div>
              <div className="flex-1 overflow-hidden">{co}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
