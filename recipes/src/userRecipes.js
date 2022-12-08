import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { hasnorecipes } from '../src/redux/userhasrecipes';
import { tokenDel } from '../src/components/login/setToken';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logout } from '../src/redux/logged';


export default function UserRecipes () {
    const [userrecipes, setUserRecipes] = useState([]);
    let navigate = useNavigate();
    const path = window.location.pathname;
    const dispatch = useDispatch();

    
    function getUserRecipes() {
        axios.get(
    	    'api/v1/myrecipes/'
    	).then(response => {
            const recipes = response.data;
            if (recipes.length) {
                setUserRecipes(recipes);
            }
    	}
    	      ).catch(error => {console.log(error['message']);
                                if (error['message'] === 'Request failed with status code 401') {
                                    dispatch(logout());
                                    dispatch(hasnorecipes());
                                    tokenDel();
                                    navigate('/login?'.concat('next=',path));
                                }
                               });
    }
    
    useEffect(() => {
        getUserRecipes();
    }, []);

    return (
        <div>
          <p className='flex justify-center text-3xl mt-4'> My Recipes </p>
          { userrecipes.length ?
              userrecipes.map(result => 
                  <li key={result.id}> <Link to={"/recipe/".concat(result.id)}> <p className='flex justify-center text-xl'> {result.name} </p> </Link></li>
              )
            :
            <p className='flex justify-center text-xl mt-12'>  You have no recipes! </p>
          }
        </div>
    );    
}
