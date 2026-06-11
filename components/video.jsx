import React from 'react'

const Video = () => {
   return (
   <div className="relative h-screen">
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 h-full w-full object-cover"
  >
    <source src="/videos/homeVideo.mp4" type="video/mp4" />
  </video>


  <div className="absolute inset-0 bg-black/40"></div>

  
  <div className="relative z-10 flex h-full flex-wrap gap-4 flex-col items-center justify-center text-center px-4">
   

    <a
      href="#order-form"
      className="rounded-full bg-red-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700"
    >
      Order Drinks
    </a>
    
     <a
      href="#enquiry-form"
      className="rounded-full bg-red-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700"
    >
      Enquire Now
    </a>
  </div>
</div>
  );
}

export default Video