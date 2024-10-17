import React, {useState} from 'react';
import { Link } from "react-router-dom";

const Layout = ({ children }) => {

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(event.currentTarget);
  };
  
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-base-100 text-lg">
      <div className="flex justify-between items-center w-almost_full m-almost_full">
        <div className="flex">
          <img src="/images/leap_logo.png" alt="Leap Logo - Home" className="h-16 w-auto"/>
        </div>  
        <label className="input input-bordered flex items-center gap-2 w-7/12 rounded-2xl bg-bg_grey border-none p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-8 w-8 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd" />
          </svg>
          <input 
              type="text" 
              name="query"
              className="grow outline-none" 
              placeholder="Search by county..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
        </label>    
        <div className="flex justify-center items-center">
          <button className="btn btn-secondary text-white">Learn More about LEAP-VA</button>
          <Link to = '/about' className="ml-4 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.25} stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
          </Link>
        </div>
      </div>
      <main className="flex-grow w-almost_full mb-almost_full bg-bg_grey">
        {children}
      </main>
    </div>
  );
};

export default Layout;