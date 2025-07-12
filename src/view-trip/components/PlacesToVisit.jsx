import React from 'react';
import PlaceCardItem from './PlaceCardItem';


function PlacesToVisit({ trip }) {
    const itineraryEntries = Object.entries(trip?.tripData?.[0]?.travelPlan?.itinerary ?? {});

    return (
        <div>
            <h2 className="font-bold text-lg text-primary mt-5">Places to Visit</h2>

            <div>
                {itineraryEntries.map(([dayKey, dayData], index) => (
                <div className='mt-2'>
                    <h2 className="text-lg font-medium">Day {index + 1}</h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                        {['morning', 'afternoon', 'evening'].map((slot) =>
                        <div key={slot}>
                            <h2 className='font-medium text-sm text-orange-500'>{slot.charAt(0).toUpperCase() + slot.slice(1)}</h2>
                            {dayData[slot] ? (
                                <PlaceCardItem placeData={dayData[slot]} location={trip?.tripData?.[0]?.travelPlan?.location} />
                            ) : (
                                <div className='border rounded-xl p-3 mt-2 flex gap-5 bg-gray-100 text-gray-400'>
                                    <div className='w-[130px] h-[130px] rounded-xl bg-gray-200 flex items-center justify-center'>
                                        <span>No data</span>
                                    </div>
                                    <div>
                                        <h2 className='font-bold text-lg'>No place data</h2>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    </div>
                </div>
            ))}
            </div>

        </div>
    );
}

export default PlacesToVisit;
