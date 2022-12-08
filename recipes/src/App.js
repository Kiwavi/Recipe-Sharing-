import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Home';
import About from './About';
import Login from '../src/components/login/Login';
import axios from "axios";
import Signup from '../src/components/signup/Signup';
import CounterShow from './CounterShow';
import Header from './Header';
import PostRecipe from './postRecipe';
import RequireAuth from './requireAuth';
import NotFound from './notFound';
import UserRecipes from './userRecipes';
import RecipeDetail from './RecipeDetail';
import EditRecipe from './editRecipe';
import SearchResults from './Search';
import SearchedRecipeDetail from './SearchedRecipeDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';

axios.defaults.baseURL = "http://127.0.0.1:8000";
// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

// this is a nested route and is shown by the routes being wrapped inside a div
export default function App() {
  return (
      <Router>
        <div class="min-h-screen flex flex-col">
          <div class="main flex-grow">
            <ToastContainer/>
            <Header/>
            <Routes>
              <Route path="/" element={<Home/>}> </Route>
              <Route path="about" element={<About/>}> </Route>
              <Route path="/login" element={<Login/>}> </Route>
              <Route path="signup" element={<Signup/>}> </Route>
              <Route path="counter" element={<CounterShow/>}> </Route>
              <Route path="add-recipe" element={<RequireAuth> <PostRecipe/> </RequireAuth>}> </Route>
              <Route path="/my-recipes" element={<RequireAuth> <UserRecipes/> </RequireAuth>}> </Route>
              <Route path="recipe/:id" element={<RequireAuth> <RecipeDetail/> </RequireAuth>}> </Route>
              <Route path="recipe/:id/edit" element={<RequireAuth> <EditRecipe/> </RequireAuth>}> </Route>
              <Route path="search/:searchword" element={<SearchResults/>}> </Route>
              <Route path="recipesearch/:id" element={<SearchedRecipeDetail/>}> </Route>
              <Route path='*' element={<NotFound />}/>
            </Routes>
          </div>
          <Footer/>
        </div>
      </Router>
  );
}
