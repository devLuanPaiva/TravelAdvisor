'use client'
import { useEffect, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import Image from 'next/image'

type Place = google.maps.places.PlaceResult

const placeTypes = [
    { label: 'Restaurantes', value: 'restaurant' },
    { label: 'Hotéis', value: 'lodging' },
    { label: 'Hospitais', value: 'hospital' },
    { label: 'Mercados', value: 'supermarket' },
    { label: 'Cafés', value: 'cafe' },
    { label: 'Farmácias', value: 'pharmacy' },
    { label: 'Bancos', value: 'bank' },
    { label: 'Postos de Gasolina', value: 'gas_station' },
    { label: 'Parques', value: 'park' },
    { label: 'Museus', value: 'museum' },
]

export function GoogleMapNearby() {
    const [places, setPlaces] = useState<Place[]>([])
    const [error, setError] = useState<string | null>(null)
    const [selectedType, setSelectedType] = useState<string>('restaurant')
    const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null)

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: apiKey,
        libraries: ['places'],
    })

    useEffect(() => {
        if (typeof window === 'undefined') return

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                setCurrentPosition({
                    lat: latitude,
                    lng: longitude,
                })
            },
            (err) => setError('Erro ao obter localização: ' + err.message)
        )
    }, [])

    useEffect(() => {
        if (!currentPosition || !isLoaded) return

        const map = new google.maps.Map(document.createElement('div'))
        const service = new google.maps.places.PlacesService(map)

        const request: google.maps.places.PlaceSearchRequest = {
            location: currentPosition,
            radius: 100000,
            type: selectedType,
        }

        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                setPlaces(results)
            } else {
                setError('Erro ao buscar locais: ' + status)
            }
        })
    }, [currentPosition, isLoaded, selectedType])

    if (loadError) return <div>Erro ao carregar o mapa</div>
    if (!isLoaded) return <div>Carregando API do Google Maps...</div>

    return (
        <section className='flex items-start gap-4 p-0 justify-between w-full h-screen'>
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
                            key={place.place_id || index}
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
            <section className='w-3/4 h-screen p-10'>
                {currentPosition ? (
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        center={currentPosition}
                        zoom={18}
                    >
                        <Marker position={currentPosition} label="Você está aqui" />
                        {places.map((place, index) => (
                            <Marker
                                key={place.place_id ?? index}
                                position={{
                                    lat: place.geometry?.location?.lat() || 0,
                                    lng: place.geometry?.location?.lng() || 0,
                                }}
                                title={place.name}
                            />
                        ))}
                    </GoogleMap>
                ) : (
                    <div>Carregando mapa...</div>
                )}
                {error && <p className="text-red-500 p-4">{error}</p>}
            </section>
        </section>
    )
}
