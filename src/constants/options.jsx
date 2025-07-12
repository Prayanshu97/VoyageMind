export const SelectTravelList = [
  {
    id: 1,
    title: 'Just me',
    desc: 'Solo exploration',
    icon: '🧍‍♂️',
    people: '1 People',
  },
  {
    id: 2,
    title: 'Couple',
    desc: 'A romantic escape for two',
    icon: '👫',
    people: '2 People',
  },
  {
    id: 3,
    title: 'Family',
    desc: 'Fun for all ages',
    icon: '👨‍👩‍👧‍👦',
    people: '3 to 5 People',
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'Adventures with your crew',
    icon: '🧑‍🤝‍🧑',
    people: '2 to 5 People',
  }
];


export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: '💸',
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Balance comfort and cost',
    icon: '💵',
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Premium experiences',
    icon: '💎',
  }
];

export const AI_PROMPT = `Generate a travel plan for Location: {location}, for {totalDays} days for {traveler} with a {budget} budget. 

Return a JSON array with one object, with this exact structure:

[
  {
    "travelPlan": {
      "location": "<location name>",
      "hotelOptions": [
        {
          "hotelName": "<string>",
          "hotelAddress": "<string>",
          "price": "<string>",
          "hotelImageUrl": "<string>",
          "geoCoordinates": { "latitude": <number>, "longitude": <number> },
          "rating": "<string>",
          "description": "<string>"
        }
      ],
      "itinerary": {
        "day1": {
          "morning": {
            "placeName": "<string>",
            "place": "<string>",
            "details": "<string>",
            "placeImageUrl": "<string>",
            "geoCoordinates": { "latitude": <number>, "longitude": <number> },
            "ticketPricing": "<string>",
            "rating": "<string>",
            "time": "<string>"
          },
          "afternoon": { ...same fields as morning... },
          "evening": { ...same fields as morning... }
        },
        ...repeat for each day up to {totalDays}...
      }
    }
  }
]

- All fields must always be present, even if data is missing (use empty string, null, or placeholder).
- Do NOT omit any field or key.
- The response must be valid JSON, parsable by JSON.parse in JavaScript.
- Do NOT include any explanation or text outside the JSON.`