import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { logout } from '../src/redux/logged';
import { useDispatch } from 'react-redux';
import { hasnorecipes } from '../src/redux/userhasrecipes';
import { tokenDel } from '../src/components/login/setToken';


export default function SearchResults () {
    const [data,setData] = useState([]);
    const searchParams = useParams();
    const [searchparam, setSearchParam] = useState(null);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const path = window.location.pathname;
    
    function fetchSearchResults () {
        axios.get('api/v1/recipes/?name='.concat(searchParams.searchword)).then(
            response => {
                const data = response.data;
                console.log(data);
                setData(data);
            }
        ).catch(error => {console.log(error['message']);
                          // should change this to one function and just call it because i will need to do this for all axios requests to endpoints that require authentication error 401 means the token has expired or is invalid, according to what I know right now.
                          if (error['message'] === 'Request failed with status code 401') {
                              dispatch(logout());
                              dispatch(hasnorecipes());
                              tokenDel();
                              navigate('/login?'.concat('next=',path));
                          }
                         });
    }

    useEffect( () => {
        fetchSearchResults();
    }, []);


    function NavigateToSearch(e) {
        e.preventDefault();
        navigate('/search/'.concat(searchparam));
        window.location.reload();
    }
    
    return (
        <div>
          <form class="flex justify-center mt-6" onSubmit={NavigateToSearch}>   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"> Search </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setSearchParam(e.target.value)}  required="required"/>
              <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
          </form>

          {
              data.length ? <p class="flex justify-center text-3xl mt-6"> Results </p> : <p> </p>
          }
          
          {
              data.length ?
              data.map(result =>
                  <div className='mt-12'>
                    <li class="flex justify-center text-2xl" key={result.id}> <Link to={"/recipesearch/".concat(result.id)}> {result.name} </Link>
                  </li>
                  </div>
              )
                  :
                  <p className='flex justify-center text-xl mt-12'> No Results Found! </p>
          }

        </div>
    ); 
}
