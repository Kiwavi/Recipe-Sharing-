import React from 'react';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from '../../../src/redux/logged';
import { useDispatch } from 'react-redux';
import { hasnorecipes } from '../../../src/redux/userhasrecipes';
import { tokenDel } from '../../../src/components/login/setToken';


export default function Signup () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const path = window.location.pathname;
    let navigate = useNavigate();
    const dispatch = useDispatch();
    
    
    function Submitted (e) {
        console.log('Yo');
        e.preventDefault();
        axios.post('api/auth/register', {
            email: email,
            password: password,
        }).then(
            response => {
                console.log(response.data);
                navigate('/login');
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
    
    return (
        <div>
          <p class="flex justify-center text-3xl justify-center mt-6"> Signup  </p>
          
          <div class="w-full flex justify-center">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3 mt-10" onSubmit={Submitted}>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                  Email
                    </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name="email" type="email" placeholder="Username" onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                  Password
                </label>
                <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <p class="text-red-500 text-xs italic">Please choose a password.</p>
              </div>
              <div class="flex items-center justify-between">
                <input type="submit" value="Submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/>
              </div>
            </form>
          </div>
        </div>
    );    
}
