import React from 'react'

const Hero = () => {
  return (
    <div className='py-24 px-6 text-center bg-white text-gray-800'>
        <h1 className='text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12'>
            <span className='capitalize'>Bring creative projects to life on</span>
            <br />
            <span className='uppercase text-green-600'>Crowdfund</span>
        </h1>


        <div className='flex justify-center items-center space-x-2'>
            <button className='inline-block bg-red-400 px-6 py-2.5 bg-green-600
            text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-700'>
                Add Project
            </button>

            <button className='inline-block bg-white px-6 py-2.5 border border-green-600
            text-green-600 font-medium text-xs leading-tight uppercase rounded-full shadow-md 
            hover:bg-green-600 hover:text-white'>
                Back Projects
            </button>
        </div>

        <div className='flex justify-center items-center mt-10'>
            <div className='flex flex-col justify-center items-center h-20 border shadow-md w-full'>
                <span className='text-lg font-bold text-green-900 leading-5'>{0}</span>
                <span>Projects</span>
            </div>

            <div className='flex flex-col justify-center items-center h-20 border shadow-md w-full'>
                <span className='text-lg font-bold text-green-900 leading-5'>{0}</span>
                <span>Backings</span>
            </div>

            <div className='flex flex-col justify-center items-center h-20 border shadow-md w-full'>
                <span className='text-lg font-bold text-green-900 leading-5'>{0} ETH</span>
                <span>Donated</span>
            </div>
        </div>
        
        
    </div>
  )
}

export default Hero