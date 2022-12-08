import React from 'react';
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { tokenSet } from "./setToken";
import { login, loguser } from '../../redux/logged';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';



export default function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();
    const dispatch = useDispatch();
    
    function Submitted (e) {
        console.log('Yo');
        e.preventDefault();
        axios.post('api/auth/login', {
            email: email,
            password: password,
            // csrfmiddlewaretoken: csrftoken,
        }).then(
            response => {
                const user_data = response.data; // returns user email and token
                const email = user_data['user']['email'];
                const id = user_data['user']['id'];
                const token = user_data['token'];
                tokenSet(email,token);
                dispatch(login());
                dispatch(loguser(email));
                toast.success('Login Success', {
                    position: toast.POSITION.TOP_RIGHT
                });
                if (window.location.href.includes('next')) {
                    const curr_url = new URL(window.location.href);
                    const next_url = curr_url.searchParams.get('next');
                    navigate(next_url);
                }
                else {
                    navigate('/');
                }
            }
        ).catch(error => {
            console.log(error['message']);
            if (error['message'] === 'Request failed with status code 400') {
                toast.error('Incorrect credentials', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        });                  
    }

    return (
        <div>
          <p class="flex justify-center text-3xl mt-4"> Login </p>
          <div class="w-full flex justify-center">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3 mt-6" onSubmit={Submitted}>
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
                <Link to="/signup"> Signup </Link>
              </div>
            </form>
          </div>
        </div>
    );    
}
