import Image from "next/image";

export interface PlacesSidebarProps {
    placeTypes: { label: string; value: string }[]
    places: google.maps.places.PlaceResult[]
    selectedType: string
    setSelectedType: (type: string) => void
}
export function PlacesSidebar({ placeTypes, places, selectedType, setSelectedType }: Readonly<PlacesSidebarProps>) {
    return (
        <aside className='w-1/4 h-full bg-white p-4 overflow-y-auto border-r'>
            <h2 className="text-xl font-semibold mb-4">Tipos de lugar</h2>
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

            <h3 className="text-lg font-semibold mb-2">Resultados próximos</h3>
            <div className="space-y-4">
                {places.map((place, index) => (
                    <div
                        key={place.place_id ?? index}
                        className="bg-gray-100 p-3 rounded shadow-sm"
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
            </div>
        </aside>
    )
}