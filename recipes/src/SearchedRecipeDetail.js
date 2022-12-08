import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { logout } from '../src/redux/logged';
import { useDispatch } from 'react-redux';
import { hasnorecipes } from '../src/redux/userhasrecipes';
import { tokenDel } from '../src/components/login/setToken';

export default function SearchedRecipeDetail () {
    const [name, setName] = useState(null);
    const [ingredients, setIngredients] = useState(null);
    const [instructions, setInstructions] = useState(null);
    const searchParams = useParams();
    let navigate = useNavigate();
    const path = window.location.pathname;
    const dispatch = useDispatch();
    
    const data = "<div class=\"flex justify-center text-3xl mt-12\">".concat(name,"</div>") + "<p class=\"flex justify-center text-2xl mt-3\"> Ingredients </p> />"  + "<div class=\"flex flex-col items-center justify-center text-lg\">".concat(ingredients) + "<p class=\"flex justify-center text-2xl mt-3 mb-3\"> Instructions </p>".concat(instructions);
    
    function getRecipe() {
        console.log(searchParams);
        axios.get(
    	    'api/v1/recipes/?theid='.concat(searchParams.id)
    	).then(response => {
            const recipe = response.data;
            console.log(recipe[0]);
            setName(recipe[0]['name']);
            setIngredients(recipe[0]['ingredients']);
            setInstructions(recipe[0]['instructions']);
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
