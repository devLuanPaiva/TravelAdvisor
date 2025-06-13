"use client";
import Loading from "../shared/Loading";
import { useState } from "react";
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
import { useNearbyPlaces } from "@/hooks/useNearbyPlaces";

export function GoogleMapNearby({ session }: Readonly<{ session: Session }>) {
  const [selectedType, setSelectedType] = useState<string>("restaurant");
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  const {
    currentPosition,
    places,
    error,
    directions,
    selectedPlace,
    setSelectedPlace,
    setDirections,
  } = useNearbyPlaces(selectedType, isLoaded);

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
        onSelectPlace={(place) => {
          setSelectedPlace(place);
          setDirections(null);
        }}
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
            mapContainerStyle={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
            }}
            center={currentPosition}
            zoom={16}
            options={{
              mapTypeId: "satellite",
            }}
          >
            {directions && <DirectionsRenderer directions={directions} />}

            {directions?.routes[0]?.legs[0] && (
              <OverlayView
                position={{
                  lat:
                    (directions.routes[0].legs[0].start_location.lat() +
                      directions.routes[0].legs[0].end_location.lat()) /
                    2,
                  lng:
                    (directions.routes[0].legs[0].start_location.lng() +
                      directions.routes[0].legs[0].end_location.lng()) /
                    2,
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div className="bg-white px-3 py-1 min-w-[120px] rounded shadow text-sm font-medium border border-gray-300">
                  {directions.routes[0].legs[0].distance?.text} (
                  {directions.routes[0].legs[0].duration?.text})
                </div>
              </OverlayView>
            )}
            <Marker
              position={currentPosition}
              animation={google.maps.Animation.DROP}
              icon={{
                url: "/marker.png",
                scaledSize: new google.maps.Size(135, 135),
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
                      <Image
                        src="/notImage.png"
                        alt="Sem imagem do local"
                        width={200}
                        height={100}
                        className="w-full h-32 object-cover rounded-[5px] sm:rounded-md mb-1 max-sm:h-20"
                      />
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
