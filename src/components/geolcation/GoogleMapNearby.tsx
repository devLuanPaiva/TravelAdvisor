"use client";
import Loading from "../shared/Loading";
import { useEffect, useState } from "react";
import { PlacesSidebar } from "./PlacesSidebar";
import {
  GoogleMap,
  Marker,
  OverlayView,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { Session } from "next-auth";
import Image from "next/image";

type Place = google.maps.places.PlaceResult;

export function GoogleMapNearby({ session }: Readonly<{ session: Session }>) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>("restaurant");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({
          lat: latitude,
          lng: longitude,
        });
      },
      (err) => setError("Erro ao obter localização: " + err.message)
    );
  }, []);

  useEffect(() => {
    if (!currentPosition || !isLoaded) return;

    const map = new google.maps.Map(document.createElement("div"));
    const service = new google.maps.places.PlacesService(map);

    const request: google.maps.places.PlaceSearchRequest = {
      location: currentPosition,
      radius: 10000,
      type: selectedType,
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        setPlaces(results);
      } else {
        setError("Erro ao buscar locais: " + status);
      }
    });
  }, [currentPosition, isLoaded, selectedType]);
  useEffect(() => {
    console.log("place selected", selectedPlace);
  }, [selectedPlace]);

  useEffect(() => {
    if (!selectedPlace || !currentPosition) return;

    const destination = {
      lat: selectedPlace.geometry?.location?.lat() ?? 0,
      lng: selectedPlace.geometry?.location?.lng() ?? 0,
    };

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: currentPosition,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Erro ao traçar rota:", status);
        }
      }
    );
  }, [selectedPlace, currentPosition]);

  if (loadError) return <div>Erro ao carregar o mapa</div>;
  if (!isLoaded) return;

  return (
    <section className="flex items-start gap-4 p-0 justify-between w-full h-full">
      <PlacesSidebar
        session={session}
        places={places}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        isShowSidebar={isShowSidebar}
      />
      <section
        className={`flex flex-col gap-2 h-full p-5 md:p-10 relative transition-all duration-300 ${
          isShowSidebar ? "w-full md:w-3/4" : "w-full"
        }`}
        style={{ zIndex: 0 }}
      >
        <button
          className={`w-fit bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 z-50 ${
            isShowSidebar && "max-md:self-end"
          } `}
          onClick={() => setIsShowSidebar(!isShowSidebar)}
        >
          {isShowSidebar ? (
            <GoSidebarCollapse className="w-6 h-6 " />
          ) : (
            <GoSidebarExpand className="w-6 h-6" />
          )}
        </button>
        {currentPosition ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={currentPosition}
            zoom={18}
          >
            {directions && <DirectionsRenderer directions={directions} />}

            <Marker
              position={currentPosition}
              animation={google.maps.Animation.DROP}
              icon={{
                url: "/marker.png",
                scaledSize: new google.maps.Size(150, 150),
              }}
            />
            {places.map((place, index) => {
              const position = {
                lat: place.geometry?.location?.lat() ?? 0,
                lng: place.geometry?.location?.lng() ?? 0,
              };

              return (
                <OverlayView
                  key={place.place_id ?? index}
                  position={position}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <button
                    onClick={() => {
                      setSelectedPlace(
                        selectedPlace?.place_id === place.place_id
                          ? null
                          : place
                      );
                      setDirections(null);
                    }}
                    className={`bg-white rounded-[5px] sm:rounded-xl shadow-lg w-52 p-2 text-center transform -translate-x-1/2 -translate-y-full cursor-pointer ${selectedPlace && selectedPlace.place_id !== place.place_id ? "hidden" : ""}
                        max-sm:w-36 max-sm:p-1`}
                  >
                    {place.photos?.[0] ? (
                      <Image
                        src={place.photos[0].getUrl({ maxWidth: 200 })}
                        alt={place.name ?? "Imagem do local"}
                        width={200}
                        height={100}
                        className="w-full h-28 object-cover rounded-[5px] sm:rounded-md mb-1 max-sm:h-20"
                      />
                    ) : (
                      <div className="w-full h-28 bg-gray-300 rounded-md flex items-center justify-center text-gray-600 mb-1 max-sm:h-20 text-xs">
                        Sem imagem
                      </div>
                    )}
                    <p className="text-sm font-semibold max-sm:text-xs">
                      {place.name}
                    </p>
                  </button>
                </OverlayView>
              );
            })}
          </GoogleMap>
        ) : (
          <Loading message="Carregando..." />
        )}
        {error && <p className="text-red-500 p-4">{error}</p>}
      </section>
    </section>
  );
}
