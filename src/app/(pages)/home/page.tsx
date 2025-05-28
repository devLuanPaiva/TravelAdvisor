import { GoogleMapNearby } from "@/components/geolcation/GoogleMapNearby";

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen">
      <main className="p-0 h-[90vh] w-full flex-1  flex flex-col items-center ">
        <GoogleMapNearby />
      </main>
    </div>
  );
}
