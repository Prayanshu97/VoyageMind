import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');

  useEffect(() => {
    const placeName = trip?.userSelection?.location?.place_name;
    if (placeName) fetchPlaceImage(placeName);
  }, [trip]);
  
  const fetchPlaceImage = async (placeName) => {
    try {
      const title = encodeURIComponent(placeName.trim().replace(/\s+/g, '_'));

      const placeRes  = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
      const placeData = await placeRes.json();
      const directImg = placeData.originalimage?.source || placeData.thumbnail?.source;

      if (directImg && !/flag|coat_of_arms|emblem/i.test(directImg)) {
        setPhotoUrl(directImg);
        return;
      }

      const catTitle = `Category:Tourist_attractions_in_${title}`;
      const catRes   = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=${catTitle}&cmlimit=1&format=json&origin=*`
      );
      const catData  = await catRes.json();
      const topAttr  = catData?.query?.categorymembers?.[0]?.title;

      if (topAttr) {
        const attrRes  = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topAttr)}`);
        const attrData = await attrRes.json();
        const attrImg  = attrData.originalimage?.source || attrData.thumbnail?.source;

        if (attrImg && !/flag|coat_of_arms|emblem/i.test(attrImg)) {
          setPhotoUrl(attrImg);
          return;
        }
      }

      setPhotoUrl('/placeholder.jpg');
    } catch (err) {
      console.error('Image fetch failed:', err);
      setPhotoUrl('/placeholder.jpg');
    }
  };

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className='hover:scale-105 transition-all'>
        <img
          src={photoUrl}
          alt='place'
          className='object-cover rounded-xl h-[220px] w-full'
        />
        <div>
          <h2 className='font-bold text-lg'>
            {trip?.userSelection?.location?.place_name}
          </h2>
          <h2 className='text-sm text-gray-500'>
            {trip.userSelection?.noOfDays} Days trip with {trip.userSelection?.budget} budget.
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
