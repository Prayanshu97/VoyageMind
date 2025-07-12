import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router'

function Hero() {
  return (
    <div className='flex flex-col items-center max-w-4xl mx-auto gap-9 px-4 sm:px-6 md:px-8'>
      <img 
        src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' 
        alt='Travel adventure' 
        className='w-full max-w-xl h-48 sm:h-64 md:h-80 object-cover rounded-2xl shadow-lg mt-8 mb-4' 
      />
      <h1 className='font-extrabold text-3xl sm:text-4xl md:text-5xl text-center mt-4 text-primary'>
        <span className='text-primary'>VoyageMind:</span> <span className='text-slate-700'>Personalized AI Travel Itineraries</span>
      </h1>
      <p className='text-lg sm:text-xl text-slate-500 text-center'>
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
      <Link to={'/create-trip'}>
        <Button className='bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg rounded-full shadow-md transition-all'>
          Start Planning
        </Button>
      </Link>
    </div>
  )
}

export default Hero