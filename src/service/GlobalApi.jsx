import axios from "axios"

const BASE_URL='https://places.googleapis.com/v1/places:searchText'

const config = {
    headers:{
        'Content-Tyep':'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_API,
        'X-Goog-FieldMask':[
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
}

export const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config)