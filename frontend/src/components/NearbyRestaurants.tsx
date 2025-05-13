import React from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import useNearbyRestaurants, { Restaurant } from '../hooks/useNearbyRestaurants';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const NearbyRestaurants = () => {
  const {
    location,
    restaurants,
    loading,
    error,
    getCurrentLocation,
  } = useNearbyRestaurants();

  const [selectedRestaurant, setSelectedRestaurant] = React.useState<Restaurant>();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Restaurantes Próximos</h1>
      
      {!location && (
        <button
          onClick={getCurrentLocation}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? 'Carregando...' : 'Buscar Restaurantes Próximos'}
        </button>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {location && (
        <div className="mt-4">
          <div className="mb-4">
            <p>Sua localização: Latitude {location.latitude}, Longitude {location.longitude}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: location.latitude, lng: location.longitude }}
                zoom={13}
              >
                
                <Marker
                  position={{ lat: location.latitude, lng: location.longitude }}
                  icon={{
                    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                  }}
                />

                
                {restaurants.map((restaurant) => (
                  <Marker
                    key={restaurant.id}
                    position={{
                      lat: restaurant.location.latitude,
                      lng: restaurant.location.longitude,
                    }}
                    onClick={() => setSelectedRestaurant(restaurant)}
                  />
                ))}

                {selectedRestaurant && (
                  <InfoWindow
                    position={{
                      lat: selectedRestaurant.location.latitude,
                      lng: selectedRestaurant.location.longitude,
                    }}
                    onCloseClick={() => setSelectedRestaurant({} as Restaurant)}
                  >
                    <div>
                      <h3 className="font-bold">{selectedRestaurant.name}</h3>
                      <p>{selectedRestaurant.location.address}</p>
                      <p>Distância: {selectedRestaurant.distance} km</p>
                      {selectedRestaurant.rating && <p>Avaliação: {selectedRestaurant.rating}/5</p>}
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Lista de Restaurantes</h2>
              {loading ? (
                <p>Carregando restaurantes...</p>
              ) : (
                <ul className="space-y-2">
                  {restaurants.map((restaurant) => (
                    <li
                      key={restaurant.id}
                      className="p-2 border rounded hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedRestaurant(restaurant)}
                    >
                      <h3 className="font-bold">{restaurant.name}</h3>
                      <p>{restaurant.distance} km</p>
                      {restaurant.rating && <p>⭐ {restaurant.rating}</p>}
                      {restaurant.cuisine && (
                        <p className="text-sm text-gray-600">
                          {restaurant.cuisine.map((c) => c.name).join(', ')}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NearbyRestaurants;