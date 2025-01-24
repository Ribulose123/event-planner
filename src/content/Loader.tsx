import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FaRegCalendar } from "react-icons/fa";

const Loader:React.FC = () => {
  return (
    <div className='relative'>
         <DotLottieReact
      src="https://lottie.host/08b8fae6-aae0-47c8-8de4-00329570fe2f/p1qmFqWooA.lottie"
      loop
      autoplay
    />
   <div className='w-full absolute'>
   <FaRegCalendar/>
   </div>
    </div>
  )
}

export default Loader



