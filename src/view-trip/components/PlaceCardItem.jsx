import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const PlaceCardItem = ({ placeData, location }) => {
    const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (placeData?.placeName) {
            setLoading(true);
            fetchWikipediaImage(placeData.placeName);
        }
    }, [placeData]);

    const fetchWikipediaImage = async (placeName) => {
        try {
            const title = encodeURIComponent(placeName.trim());
            const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
            const data = await res.json();

            // Check for missing or disambiguation pages
            if (data?.type === 'standard' && (data.originalimage?.source || data.thumbnail?.source)) {
                const image = data.originalimage?.source || data.thumbnail?.source;
                setPhotoUrl(image);
            } else {
                setPhotoUrl('/placeholder.jpg');
            }
        } catch (err) {
            console.error('Wikipedia image fetch failed:', err);
            setPhotoUrl('/placeholder.jpg');
        } finally {
            setLoading(false);
        }
    };

    if (!placeData) {
        return (
            <div className='border rounded-xl p-3 mt-2 flex gap-5 bg-card text-slate-400'>
                <div className='w-[100px] sm:w-[130px] h-[100px] sm:h-[130px] rounded-xl bg-gray-200 flex items-center justify-center'>
                    <span>No data</span>
                </div>
                <div>
                    <h2 className='font-bold text-lg'>No place data available</h2>
                </div>
            </div>
        );
    }

    return (
        <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeData?.placeName + ',' + location)}`}
            target='_blank'
        >
            <div className='border rounded-xl p-3 mt-2 flex flex-col sm:flex-row gap-4 sm:gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer bg-card'>
                {loading ? (
                    <div className='w-[100px] sm:w-[130px] h-[100px] sm:h-[130px] rounded-xl bg-gray-200 animate-pulse' />
                ) : (
                    <img src={photoUrl} className='w-[100px] sm:w-[130px] h-[100px] sm:h-[130px] rounded-xl object-cover' alt='place' />
                )}
                <div className='flex-1'>
                    <h2 className={`font-bold text-lg text-primary ${loading ? 'bg-gray-200 animate-pulse rounded w-32 h-6 mb-2' : ''}`}>{loading ? '' : placeData.placeName}</h2>
                    <p className={`text-sm text-slate-500 ${loading ? 'bg-gray-100 animate-pulse rounded w-40 h-4 mb-2' : ''}`}>{loading ? '' : placeData.details}</p>
                    <p className={`mt-2 text-emerald-600 font-medium ${loading ? 'bg-gray-100 animate-pulse rounded w-24 h-4' : ''}`}>{loading ? '' : `🕙 ${placeData.time}`}</p>
                </div>
            </div>
        </Link>
    );
};

export default PlaceCardItem;
