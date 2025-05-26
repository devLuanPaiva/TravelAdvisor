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
      } fixed top-0 left-0 h-full w-[85%] z-20 md:static md:w-1/4 md:z-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white overflow-y-auto border-r border-gray-700 transition-all duration-300 ease-in-out`}
    >
      <h2 className="text-xl font-semibold mb-4 p-4">
        <button
          className="w-full flex justify-between items-center text-base font-bold text-gray-200 hover:text-white transition-colors duration-200"
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
        <ul className="space-y-2 mb-6 p-4">
          {placeTypes.map((type) => (
            <li key={type.value}>
              <button
                className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                  selectedType === type.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
                }`}
                onClick={() => setSelectedType(type.value)}
              >
                {type.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-lg font-semibold mb-3 text-gray-100 p-4">
        Resultados próximos
      </h3>
      <section className="space-y-4 flex flex-col items-center p-4">
        {displayedPlaces.map((place, index) => (
          <div
            key={place.place_id ?? index}
            className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg shadow transition duration-300 w-full"
          >
            {place.photos?.[0] && (
              <Image
                src={place.photos[0].getUrl({ maxWidth: 400 })}
                width={120}
                height={100}
                alt={place.name ?? "Lugar"}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <h4 className="font-semibold text-sm text-gray-200">
              {place.name}
            </h4>
            {place.rating && (
              <p className="text-yellow-400 text-sm">
                ⭐ {place.rating.toFixed(1)} / 5
              </p>
            )}
          </div>
        ))}

        {placesWithImages.length > 3 && !showAllPlaces && (
          <button
            className="mt-2 text-blue-400 hover:text-blue-300 transition-colors text-center "
            onClick={() => setShowAllPlaces(true)}
          >
            Mostrar mais
          </button>
        )}
        {placesWithImages.length > 3 && showAllPlaces && (
          <button
            className="mt-2 text-blue-400 hover:text-blue-300 transition-colors text-center "
            onClick={() => setShowAllPlaces(false)}
          >
            Mostrar menos
          </button>
        )}
      </section>

      <section className="sticky bottom-0 z-20 w-full left-0 py-2 px-4 flex items-center justify-between gap-1 bg-gray-950">
        <div className="flex items-center gap-2">
          <Image
            src={session.user?.image ?? user}
            width={45}
            height={45}
            alt="usuário"
            className="rounded-[5px]"
          />
          <div className="flex flex-col">
            <h3 className="text-sm font-bold">Olá, {session.user?.name}!</h3>
            <p className="text-xs">{session.user?.email} </p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/sign-in" })}
          className="size-10  rounded-full bg-radial-[at_25%_25%] from-gray-900 via-gray-800 to-black z-50 flex items-center justify-center  text-white cursor-pointer"
        >
          <IoIosLogOut size={30} />
        </button>
      </section>
    </aside>
  );
}
