import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { logout } from '../src/redux/logged';
import { useDispatch } from 'react-redux';
import { hasnorecipes } from '../src/redux/userhasrecipes';
import { tokenDel } from '../src/components/login/setToken';

export default function RecipeDetail () {
    const [name, setName] = useState(null);
    const [ingredients, setIngredients] = useState([null]);
    const [instructions, setInstructions] = useState([null]);
    const searchParams = useParams();
    const new_instructions = "<div class=\"flex flex-col items-center justify-center mt-6\">" + instructions + "</div>";
    const new_ingredients = "<div class=\"flex flex-col items-center justify-center mt-6\">" + ingredients + "</div>";
    const link_to_edit_page = "/recipe/".concat(searchParams.id,"/edit");
    // const full_link = "<div> <a href=\"".concat(link_to_edit_page,"\"> Edit/Delete </a> </div>");
    const full_link = "<div> <a href=\"".concat(link_to_edit_page,"\" class=\"flex justify-center mt-6 text-lg text-pink-400\"> Edit/Delete </a> </div>");

    const data = "<p class=\"flex justify-center text-3xl mt-8\">" + name + "</p>" + "<p class=\"text-2xl flex justify-center mt-4\"> Ingredients</p>" + new_ingredients + "<p class=\"text-2xl flex justify-center\"> Instructions </p>" + new_instructions + full_link;
    
    let navigate = useNavigate();
    const path = window.location.pathname;
    const dispatch = useDispatch();

    
    function getRecipe() {
        console.log(searchParams);
        axios.get(
    	    'api/v1/myrecipes/'.concat(searchParams.id,'/')
    	).then(response => {
            const recipe = response.data;
            console.log(recipe['id']);
            setName(recipe['name']);
            setIngredients(recipe['ingredients']);
            setInstructions(recipe['instructions']);
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
    
    useEffect( () => {
        getRecipe();
    }, []);

    return (
        <div dangerouslySetInnerHTML={{__html: [data]}}>
        </div>
    );    
}
