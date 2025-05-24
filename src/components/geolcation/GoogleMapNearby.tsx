'use client'
import { useEffect, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { PlacesSidebar } from './PlacesSidebar'
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";


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
    const [isShowSidebar, setIsShowSidebar] = useState(true)
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
            radius: 10000,
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
            <PlacesSidebar
                placeTypes={placeTypes}
                places={places}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                isShowSidebar={isShowSidebar}
            />
            <section className={'flex flex-col gap-2 h-screen p-10 relative' + (isShowSidebar ? ' w-3/4' : ' w-full')} >
                <button
                    className="w-fit bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 z-10"
                    onClick={() => setIsShowSidebar(!isShowSidebar)}>
                    {isShowSidebar ? <GoSidebarCollapse className="w-6 h-6" /> : <GoSidebarExpand className="w-6 h-6" />}
                </button>
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
                                    lat: place.geometry?.location?.lat() ?? 0,
                                    lng: place.geometry?.location?.lng() ?? 0,
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
