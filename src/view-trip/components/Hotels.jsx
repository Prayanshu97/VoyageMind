import React from 'react';
import { Link } from 'react-router';

function Hotels({ trip }) {
  const getMapboxImage = (lat, lon, hotelName) => {
  if (!lat || !lon) {
    return '/placeholder.jpg';
  }

  const token = import.meta.env.VITE_MAPBOX_API;

  if (!token) {
    return '/placeholder.jpg';
  }

  const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l-lodging+285A98(${lon},${lat})/${lon},${lat},15/300x200?access_token=${token}`;
  return url;
};


  const hotelOptions = trip?.tripData?.[0]?.travelPlan?.hotelOptions || [];

  return (
    <div>
      <h2 className='font-bold text-xl mt-5 text-primary'>Hotel Recommendations</h2>
      {hotelOptions.length === 0 ? (
        <div className='text-slate-400 my-4'>No hotel recommendations available.</div>
      ) : (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {hotelOptions.map((hotel, index) => (
          <Link
            key={index}
            to={
              'https://www.google.com/maps/search/?api=1&query=' +
              hotel?.hotelName +
              ',' +
              hotel?.hotelAddress
            }
            target='_blank'
          >
            <div className='hover:scale-105 transition-all cursor-pointer bg-card rounded-xl shadow-md p-3 flex flex-col h-full'>
              <img
                src={getMapboxImage(
                  hotel.geoCoordinates?.latitude,
                  hotel.geoCoordinates?.longitude,
                  hotel.hotelName
                )}
                className='rounded-xl object-cover h-[180px] w-full mb-2'
                alt='hotel-map-preview'
              />
              <div className='my-2 flex flex-col gap-2 flex-1'>
                <h2 className='font-semibold text-slate-700'>{hotel?.hotelName}</h2>
                <h2 className='text-xs text-sky-500 truncate'>📍{hotel?.hotelAddress}</h2>
                <h2 className='text-sm text-emerald-600 font-medium'>💰{hotel?.price}</h2>
                <h2 className='text-sm text-yellow-500'>⭐{hotel?.rating} stars</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
      )}
    </div>
  );
}

export default Hotels;

