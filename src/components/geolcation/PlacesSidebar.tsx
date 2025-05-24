'use client'
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

export interface PlacesSidebarProps {
    placeTypes: { label: string; value: string }[]
    places: google.maps.places.PlaceResult[]
    selectedType: string
    setSelectedType: (type: string) => void
    isShowSidebar: boolean
}

export function PlacesSidebar({ placeTypes, places, selectedType, setSelectedType, isShowSidebar }: Readonly<PlacesSidebarProps>) {
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [showAllPlaces, setShowAllPlaces] = useState(false);

    const placesWithImages = places.filter(place => place.photos?.[0]);

    const displayedPlaces = showAllPlaces
        ? placesWithImages
        : placesWithImages.slice(0, 3);

    return (
        <aside className={'w-1/4 h-full bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-4 overflow-y-auto border-r' + (isShowSidebar ? ' block' : ' hidden')}>
            <h2 className="text-xl font-semibold mb-4">
                <button
                    className="w-full flex justify-between items-center text-lg font-bold text-gray-700 mb-2 hover:text-blue-600"
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
                <ul className="space-y-2 mb-6">
                    {placeTypes.map((type) => (
                        <li key={type.value}>
                            <button
                                className={`w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 ${selectedType === type.value ? 'bg-blue-100 text-blue-700' : ''
                                    }`}
                                onClick={() => setSelectedType(type.value)}
                            >
                                {type.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <h3 className="text-lg font-semibold mb-2">Resultados próximos</h3>
            <div className="space-y-4">
                {displayedPlaces.map((place, index) => (
                    <div
                        key={place.place_id ?? index}
                        className=" p-3 rounded shadow-sm"
                    >
                        {place.photos?.[0] && (
                            <Image
                                src={place.photos[0].getUrl({ maxWidth: 400 })}
                                width={120}
                                height={100}
                                alt={place.name ?? 'Lugar'}
                                className="w-full h-40 object-cover rounded mb-2"
                            />
                        )}
                        <h4 className="font-semibold text-sm">{place.name}</h4>
                        {place.rating && (
                            <p className="text-yellow-600 text-sm">
                                ⭐ {place.rating.toFixed(1)} / 5
                            </p>
                        )}
                    </div>
                ))}

                {placesWithImages.length > 3 && !showAllPlaces && (
                    <button
                        className="mt-2 text-blue-500 hover:underline"
                        onClick={() => setShowAllPlaces(true)}
                    >
                        Mostrar mais
                    </button>
                )}
                {placesWithImages.length > 3 && showAllPlaces && (
                    <button
                        className="mt-2 text-blue-500 hover:underline"
                        onClick={() => setShowAllPlaces(false)}
                    >
                        Mostrar menos
                    </button>
                )}
            </div>
        </aside>
    );
}
