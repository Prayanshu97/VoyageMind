import React, { useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import { FaGoogle } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import axios from 'axios';
import { toast } from 'sonner'
import { useAuth } from '@/service/AuthContext';

function Header() {
  const { user, setUser } = useAuth();
  const [openDialog, setOpenDialog] = useState(false)

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => toast.error('Login failed. Please try again.')
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      setUser(resp.data)
      setOpenDialog(false)
    })
  }

  const handleLogout = () => {
    googleLogout()
    setUser(null)
    window.location.href = '/'
  }

  return (
    <div className='p-2 sm:p-3 sm:px-5 shadow-sm flex justify-between items-center bg-background border-b border-border'>
      
      <img src="/logo.svg" alt="VoyageMind logo" className="h-10 sm:h-8 md:h-10 lg:h-12 w-auto"/>

      <div>
        {openDialog ? null : (
          user ? (
            <div className='flex items-center gap-2 sm:gap-3'>
              <a href='/create-trip'>
                <Button variant='primary' className='rounded-full cursor-pointer px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base'>+ Create Trip</Button>
              </a>
              <a href='/my-trips'>
                <Button variant='primary' className='rounded-full cursor-pointer px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base'>My Trips</Button>
              </a>
              <Popover>
                <PopoverTrigger>
                  <img src={user?.picture} className='h-[28px] w-[28px] sm:h-[32px] sm:w-[32px] rounded-full border-2 border-primary cursor-pointer' />
                </PopoverTrigger>
                <PopoverContent className='mr-2 mt-4'>
                  <h2 className='cursor-pointer text-primary font-semibold' onClick={handleLogout}>Logout</h2>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button
              variant='primary'
              className='rounded-full px-4 py-1.5 text-sm sm:px-6 sm:py-2 sm:text-base'
              onClick={() => setOpenDialog(true)}
            >
              Sign In
            </Button>
          )
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" className='h-12 mx-auto mb-2' />
              <h2 className='font-bold text-lg mt-7 text-primary'>Sign In With Google</h2>
              <p className='text-slate-500'>Sign in to VoyageMind with Google Authentication securely.</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-3 items-center text-sm sm:text-base bg-primary text-white hover:bg-primary/70">
                <FaGoogle />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Header
