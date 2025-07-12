import React, { useEffect, useState } from 'react';

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const placeName = trip?.userSelection?.location?.place_name;
    if (placeName) {
      setLoading(true);
      fetchPlaceImage(placeName);
    }
  }, [trip]);

  const fetchPlaceImage = async (placeName) => {
    try {
      const title = encodeURIComponent(placeName.trim().replace(/\s+/g, '_'));
      const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
      const wikiData = await wikiRes.json();
      const directImage = wikiData.originalimage?.source || wikiData.thumbnail?.source;
      if (directImage && !/flag|coat_of_arms|emblem/i.test(directImage)) {
        setPhotoUrl(directImage);
        return;
      }
      const catTitle = `Category:Tourist_attractions_in_${title}`;
      const catRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=${catTitle}&cmlimit=1&format=json&origin=*`);
      const catData = await catRes.json();
      const topAttraction = catData?.query?.categorymembers?.[0]?.title;
      if (topAttraction) {
        const attrRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topAttraction)}`);
        const attrData = await attrRes.json();
        const attrImage = attrData.originalimage?.source || attrData.thumbnail?.source;
        if (attrImage && !/flag|coat_of_arms|emblem/i.test(attrImage)) {
          setPhotoUrl(attrImage);
          return;
        }
      }
      setPhotoUrl('/placeholder.jpg');
    } catch (err) {
      console.error('Image fetch failed:', err);
      setPhotoUrl('/placeholder.jpg');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className='h-[340px] w-full rounded-xl bg-gray-200 animate-pulse' />
      ) : (
        <img src={photoUrl} className='h-[340px] w-full object-cover rounded-xl' alt='place' />
      )}
      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.place_name}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              📅 {trip.userSelection?.noOfDays} Days
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              💰 {trip.userSelection?.budget} Budget
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              🥂 No. of travelers: {trip.userSelection?.traveler}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
