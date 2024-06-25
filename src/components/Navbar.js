import React, { useState, useEffect } from 'react';
import logo from '../assets/fitofyy_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({msisdn}) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const [dropDown,setDropDown] = useState(false)

  useEffect(() => {
    if (searchInput) {
      fetch(`/search?keyword=${searchInput}`)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data);
          setIsDropdownOpen(true);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });
    } else {
      setSearchResults([]);
      setIsDropdownOpen(false);
    }
  }, [searchInput]);

  const handleClick = (id) => {
    navigate(`/videos/${id}`);
    setIsDropdownOpen(false);
    setSearchInput('');
    setIsSideDrawerOpen(false);
  };

  const toggleSideDrawer = () => {
    setIsSideDrawerOpen(!isSideDrawerOpen);
  };

  const handleDeactivate=async()=>{
    let msisdn = Cookies.get('fitofyy_user');
    const data = {
      msisdn : msisdn,
      serviceName : "Fitofyy"
    }

    setDropDown(false)

    try{

      const res = await axios.post('https://slcallback.fitofyy.com/deactivate-user',data)
    console.log(res)
    if(res.data.code == 0){
      Cookies.remove('fitofyy_user')
      Cookies.remove('user')
      Cookies.remove('new_user_without_login');
      window.location.replace('http://consent.hutch.lk/register-service/VA%3D%3DCQ%3D%3Dew%3D%3D')
      // navigate('/login')
    }
    else{
      toast.error("Something Went Wrong")
      navigate('/home')
    }

    }catch(err){
      toast.error("Something Went Wrong")
      navigate('/home')
    }
    


  }




  return (
    <div className='w-full'>
      <nav className="gradient-bg border-gray-200 shadow-lg dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to={`/demo`}>
            <img src={logo} className="h-10 mr-3" alt="Flowbite Logo" />
          </Link>
          <div className="flex md:order-2">
            <button onClick={toggleSideDrawer} className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search</span>
            </button>
            <div className="relative hidden md:block">
              <input 
                type="text" 
                value={searchInput}
                onFocus={() => setIsDropdownOpen(true)}
                onChange={(e) => setSearchInput(e.target.value)}
                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Search..."
              />
              {isDropdownOpen && searchResults.length > 0 && (
                <div 
                  className="absolute top-full w-full mt-2 border border-gray-300 rounded-md bg-white dark:bg-black" 
                  style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}
                >
                  {searchResults.map((result) => (
                    <div key={result.id} className="p-2 dropdown-item " onClick={() => handleClick(result.id)}>
                      {result.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>



         <div className="flex flex-col">
<button id="dropdownDefaultButton" onClick={()=>setDropDown(!dropDown)} class="text-[16px] ml-4 bg-gray-300/20 skew-y-1  hover:scale-110 shadow-lg hover:shadow-amber-300 hover:text-white font-bold rounded-lg px-2 py-2 " type="button">My Account 
</button>

{
  dropDown &&
  <div id="dropdown" class="mt-16 absolute z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      <li>
        <Link class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleDeactivate}>Deactivate </Link>
      </li>
      
    </ul>
</div>
}

</div>



        </div>
      </nav>
      {isSideDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed top-0 right-0 w-64 h-full   p-4 gradient-bg">
            <button onClick={toggleSideDrawer} className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mb-4">
              Close
            </button>
            <div className="relative">
            <input
  type="text"
  value={searchInput}
  onFocus={() => setIsDropdownOpen(true)}
  onChange={(e) => setSearchInput(e.target.value)}
  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none dark:text-white"
  placeholder="Search..."
/>

              {isDropdownOpen && searchResults.length > 0 && (
                <div
                  className="absolute top-full w-full mt-2 border border-gray-300 text-gray-200 rounded-md bg-black dark:bg-black"
                  style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}
                >
                  {searchResults.map((result) => (
                    <div key={result.id} className="p-2 dropdown-item capitalize " onClick={() => handleClick(result.id)}>
                      {result.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <ToastContainer/>
    </div>
  );
};

export default Navbar;
