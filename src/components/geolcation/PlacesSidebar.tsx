"use client";
import Image from "next/image";
import { useState } from "react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import user from "@/assets/user.jpg";
import { IoIosArrowForward, IoIosArrowDown, IoIosLogOut } from "react-icons/io";

const placeTypes = [
  { label: "Restaurantes", value: "restaurant" },
  { label: "Hotéis", value: "lodging" },
  { label: "Hospitais", value: "hospital" },
  { label: "Mercados", value: "supermarket" },
  { label: "Cafés", value: "cafe" },
  { label: "Farmácias", value: "pharmacy" },
  { label: "Bancos", value: "bank" },
  { label: "Postos de Gasolina", value: "gas_station" },
  { label: "Parques", value: "park" },
  { label: "Museus", value: "museum" },
];
export interface PlacesSidebarProps {
  places: google.maps.places.PlaceResult[];
  selectedType: string;
  setSelectedType: (type: string) => void;
  isShowSidebar: boolean;
  session: Session;
}

export function PlacesSidebar({
  places,
  selectedType,
  setSelectedType,
  isShowSidebar,
  session,
}: Readonly<PlacesSidebarProps>) {
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [showAllPlaces, setShowAllPlaces] = useState(false);

  const placesWithImages = places.filter((place) => place.photos?.[0]);

  const displayedPlaces = showAllPlaces
    ? placesWithImages
    : placesWithImages.slice(0, 3);

  return (
    <aside
      className={`${
        isShowSidebar ? "block" : "hidden"
      } fixed top-0 left-0 h-full w-[85%] z-20 md:static md:w-1/4 md:z-0 bg-gradient-to-b from-gray-900 via-gray-850 to-black text-white overflow-y-auto border-r border-gray-800 transition-all duration-300 ease-in-out`}
    >
      <h2 className="text-lg font-semibold p-4 border-b border-gray-800">
        <button
          className="w-full flex justify-between items-center text-white hover:text-blue-400 transition-colors duration-200"
          onClick={() => setIsTypeOpen(!isTypeOpen)}
        >
          Tipos de Lugar
          {isTypeOpen ? (
            <IoIosArrowDown className="w-5 h-5" />
          ) : (
            <IoIosArrowForward className="w-5 h-5" />
          )}
        </button>
      </h2>

      {isTypeOpen && (
        <ul className="p-4 space-y-2">
          {placeTypes.map((type) => (
            <li key={type.value}>
              <button
                onClick={() => setSelectedType(type.value)}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium tracking-tight transition-colors duration-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  selectedType === type.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
                }`}
              >
                {type.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-sm uppercase tracking-wide font-bold px-4 mt-4 mb-2 text-gray-400">
        Resultados próximos
      </h3>

      <section className="flex flex-col gap-4 px-4 pb-6">
        {displayedPlaces.map((place, index) => (
          <div
            key={place.place_id ?? index}
            className="bg-gray-800 hover:bg-gray-700 p-3 rounded-xl shadow-sm transition-all duration-300"
          >
            {place.photos?.[0] && (
              <Image
                src={place.photos[0].getUrl({ maxWidth: 1000, maxHeight: 800 })}
                width={1000}
                height={1000}
                alt={place.name ?? "Lugar"}
                className="w-full aspect-[3/2] object-cover rounded-md mb-2"
              />
            )}
            <h4 className="font-medium text-sm text-gray-100 truncate">
              {place.name}
            </h4>
            {place.rating && (
              <p className="text-yellow-400 text-sm">
                ⭐ {place.rating.toFixed(1)} / 5
              </p>
            )}
          </div>
        ))}

        {placesWithImages.length > 3 && (
          <button
            onClick={() => setShowAllPlaces(!showAllPlaces)}
            className="text-blue-400 hover:text-blue-300 text-sm transition-colors underline self-start"
          >
            {showAllPlaces ? "Mostrar menos" : "Mostrar mais"}
          </button>
        )}
      </section>

      <section className="sticky bottom-0 left-0 z-10 w-full bg-black/90 border-t border-gray-800 p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src={session.user?.image ?? user}
            width={45}
            height={45}
            alt="usuário"
            className="rounded-lg border border-gray-700"
          />
          <div className="text-sm">
            <h3 className="font-semibold text-gray-100">
              {session.user?.name}
            </h3>
            <p className="text-gray-400 text-xs">{session.user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/sign-in" })}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors text-white"
        >
          <IoIosLogOut size={22} />
        </button>
      </section>
    </aside>
  );
}
