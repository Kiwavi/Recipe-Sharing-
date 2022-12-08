import React, {useEffect} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logout } from '../src/redux/logged';
import { useDispatch } from 'react-redux';
import { hasnorecipes } from '../src/redux/userhasrecipes';
import { tokenDel } from '../src/components/login/setToken';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

export default function EditRecipe () {    
    const [recipe_name, setRecipeName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const user = useSelector((state) => state.logged.user);

    // get initial recipe data
    const [init_recipe_name, setInitRecipeName] = useState("");
    const [init_ingredients, setInitIngredients] = useState("");
    const [init_instructions, setInitInstructions] = useState("");

    // get the id from the url
    const searchParams = useParams();
    
    let navigate = useNavigate();
    const path = window.location.pathname;
    const dispatch = useDispatch();

    // fetch initial recipe details
    function getRecipe() {        
        axios.get(
    	    'api/v1/myrecipes/'.concat(searchParams.id,'/')
    	).then(response => {
            const recipe = response.data;
            console.log(recipe['id']);
            setInitRecipeName(recipe['name']);
            setInitIngredients(recipe['ingredients']);
            setInitInstructions(recipe['instructions']);
    	}
    	      ).catch(error => {console.log(error['message']);
                                if (error['message'] === 'Request failed with status code 401') {
                                    console.log(error);
                                    dispatch(logout());
                                    dispatch(hasnorecipes());
                                    tokenDel();
                                    navigate('/login?'.concat('next=',path));
                                }
                               });
    }
    
    useEffect( () => {
        getRecipe();
    }, []);
    
    function removeRecipe() {
        axios.delete('/api/v1/myrecipes/'.concat(searchParams.id,'/'))
            .then(
                (response) => {
                    console.log(response.data);
                    toast.success('Deleted SUccessfully !', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    navigate('/my-recipes');
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
    
    function submitRecipe(e) {
        e.preventDefault();
        axios.put('/api/v1/myrecipes/'.concat(searchParams.id,'/'),
                   {
                       name: recipe_name,
                       ingredients,
                       instructions,
                       user,
                   }).then(
                       response => {
                           console.log(response.data);
                           toast.success('Recipe Changed Successfully!', {
                               position: toast.POSITION.TOP_RIGHT
                           });
                           navigate('/recipe/'.concat(searchParams.id,'/'));
                       }
                   ).catch(error => {console.log(error['message']);
                                     // should change this to one function and just call it because i will need to do this for all axios requests to endpoints that require authentication error 401 means the token has expired or is invalid, according to what I know right now.
                                     if (error['message'] === 'Request failed with status code 401') {
                                         dispatch(logout());
                                         dispatch(hasnorecipes());
                                         tokenDel();
                                         navigate('/login?'.concat('next=',path));
                                     }
                                    });;
    }

    
    return (
        <div>
          <p className='flex justify-center text-3xl mt-6'> Edit Recipe </p>
          <form className='flex flex-col items-center justify-center mt-6' onSubmit={submitRecipe}>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="recipe">
                Recipe Name
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="recipename" type="text" placeholder={init_recipe_name} onChange={(e) => setRecipeName(e.target.value)} required="required"/>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="recipe">
                Ingredients
              </label>
              <CKEditor
                editor={ ClassicEditor }
                data={init_ingredients}
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    setIngredients(data);
                    console.log( { event, editor, data } );
                } }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
                required="required"
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="recipe">
                Instructions
              </label>
              <CKEditor
                editor={ ClassicEditor }
                data={init_instructions}
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    setInstructions(data);
                    console.log( { event, editor, data } );
                } }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
                required="required"
              />
            </div>
            <input type="submit" value="Submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/>
          </form>
          <div className="flex justify-center">
            <button className="text-lg bg-purple-400 mt-6 mb-8" onClick={removeRecipe}>  Delete this recipe </button>
          </div>
        </div>
    );
}
