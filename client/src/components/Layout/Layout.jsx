import React from 'react'
import {Outlet} from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex gap-2  h-screen">
      <nav className="md:w-[200px] border-r border-gray-300 pr-4 h-full">
        <div className='mb-3'>
          <h2 className="text-xl tracking-wide">Category</h2>
          <hr className="border-black" />
        </div>
        <h3 className="text-green-400 text-xl font-bold tracking-tighter">Fruits & Vegetables</h3>
      </nav>
      <div className="flex-1 pl-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout