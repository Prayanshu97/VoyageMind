import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_API;

const MapboxAutocomplete = ({ selectProps = {} }) => {
  const { value, onChange } = selectProps;

  const [query, setQuery] = useState(value?.place_name || '');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (value && value.place_name !== query) {
      setQuery(value.place_name);
    }
  }, [value]);

  const handleChange = async (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    if (!inputValue) return setSuggestions([]);

    try {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(inputValue)}.json`,
        {
          params: {
            access_token: MAPBOX_TOKEN,
            autocomplete: true,
            limit: 5,
          },
        }
      );
      setSuggestions(res.data.features);
    } catch (err) {
      console.error('Mapbox Geocoding error:', err);
    }
  };

  const handleSelect = (place) => {
    setQuery(place.place_name);
    setSuggestions([]);
    if (onChange) onChange(place);
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="Enter destination"
        value={query}
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full max-h-60 overflow-y-auto">
          {suggestions.map((place) => (
            <li
              key={place.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(place)}
            >
              {place.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MapboxAutocomplete;
