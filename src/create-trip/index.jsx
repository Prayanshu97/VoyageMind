import MapboxAutocomplete from '@/components/custom/MapboxAutocomplete'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options'
import { getGeminiResponse } from '@/service/AiModal'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/service/firebaseConfig'
import { useNavigate } from 'react-router'
import { useAuth } from '@/service/AuthContext'


function CreateTrip() {

  const [place, setPlace] = useState()
  const [formData, setFormData] = useState()
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pendingTrip, setPendingTrip] = useState(false)

  const navigate = useNavigate()
  const { user, setUser } = useAuth()
  
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    if (user && pendingTrip) {
      setPendingTrip(false)
      onGenerateTrip(true)
    }
  }, [user])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => toast.error('Login failed. Please try again.')
  })

  const onGenerateTrip = async (skipLoginCheck = false) => {
    if(!formData?.noOfDays || !formData?.location || !formData?.budget  || !formData?.traveler){
      toast("Please fill all the details.")
      setPendingTrip(false)
      return
    }
    if(formData?.noOfDays<=0 || formData?.noOfDays>15){
      toast("Enter days between 1 and 15.")
      return
    }
    if(!user && !skipLoginCheck){
      setOpenDialog(true)
      setPendingTrip(true)
      return
    }
    setLoading(true)
    const FINAL_PROMPT=AI_PROMPT
      .replace('{location}', formData?.location?.place_name)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)
    const result = await getGeminiResponse(FINAL_PROMPT)
    setLoading(false)
    SaveAiTrip(result)
  }

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: Array.isArray(JSON.parse(TripData)) ? JSON.parse(TripData) : [JSON.parse(TripData)],
      userEmail: user?.email,
      id: docId
    }); 
    setLoading(false)
    navigate('/view-trip/' + docId)
  }

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers:{
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp) => {
      setUser(resp.data)
      setOpenDialog(false)
    })
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences:</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

      <div className='mt-20 flex flex-col gap-10'>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is your choice of destination?</h2>
          <MapboxAutocomplete
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v)
                handleInputChange('location', v)
              },
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning?</h2>
          <Input placeholder={'Ex. 3'} type='number' max="15" min="1"
          onChange = {(e) => handleInputChange('noOfDays', e.target.value)} />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index} 
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget==item.title && 'shadow-lg border-black'}`}>
                <h2 className='text-4 xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelList.map((item, index) => (
              <div key={index} 
              onClick={() => handleInputChange('traveler', item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveler==item.people && 'shadow-lg border-black'}`}>
                <h2 className='text-4 xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
            
      <div className='my-10 flex justify-end'>
        <Button 
        disabled={loading}
        onClick={() => onGenerateTrip()}>
          {loading?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />
            :   
            'Generate Trip'
          }
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg"/>
              <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
              <p>Sign in to the app with Google Authentication securely.</p>
              <Button
              onClick={login}
              className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle />
                Sign In With Google                
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default CreateTrip