import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from "axios";
import { hasrecipe, hasnorecipes } from '../src/redux/userhasrecipes';
import { useNavigate } from "react-router-dom";
import Food from './images/food.jpg';
import Food2 from './images/East-Africa-food.jpg';
import Food3 from './images/frontpic.jpg';
import Food4 from './images/mokimo.jpg';


export default function Home () {
    const logged = useSelector((state) => state.logged.isLogged);
    const [searchparam, setSearchParam] = useState(null);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    
    function getUserRecipes() {
        axios.get(
    	    'api/v1/myrecipes/'
    	).then(response => {
            const recipes = response.data;
            console.log(recipes);
            if (recipes.length) {
                dispatch(hasrecipe());
            }

            if (recipes.length === 0) {
                dispatch(hasnorecipes());
            }
            
    	}
    	      );
    }
    
    useEffect(() => {
        if (logged) {
            console.log('Yes you are');
            getUserRecipes();
        }
    }, []);

    
    function NavigateToSearch() {
        navigate('search/'.concat(searchparam));
    }
    
    return (
        <div className='bg-slate-50'>
          <p class="flex justify-center text-3xl mt-6"> Home of Recipes  </p>
          <p class="flex justify-center text-lg mt-5 text-bold"> Get and share recipes for all types of foods and drinks. Find out how different people and different cultures create smoothies, foods, beverages and cocktails. </p>
          <form class="w-auto flex justify-center mr-6 mt-4" onSubmit={NavigateToSearch}>   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setSearchParam(e.target.value)}  required="required"/>
              <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
          </form>
          <div class="flex justify-center grid grid-cols-2 gap-4 mx-32 mt-6 mb-12 ">
            <div> <img src={Food} class="object-scale-down" alt="BigCo Inc. logo"/> </div>
            <div> <img src={Food2} class="object-scale-down" alt="BigCo Inc. logo"/>  </div>
            <div> <img src={Food3} class="object-scale-down" alt="BigCo Inc. logo"/> </div>
            <div> <img src={Food4} class="object-scale-down" alt="BigCo Inc. logo"/>  </div>
          </div>
        </div>
    );
}
