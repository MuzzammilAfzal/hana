import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div>
        <nav className="bg-gray-300 text-white p-4 flex flex-wrap items-center justify-center  ">
            <span className="text-xl font-bold text-black text-center">
                Hana Sarjapur Distributor
            </span>

            <Link href="https://maps.app.goo.gl/fFFpeUWaw3CyDF3T7?g_st=aw" className="ml-6 bg-blue-500 text-black hover:bg-blue-600">
               📍 Sarjapur.....click here for full address
            </Link>
        </nav>
    </div>
  )
}

export default Navbar