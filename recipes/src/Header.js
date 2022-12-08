import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/logged';
import { hasnorecipes } from '../src/redux/userhasrecipes';
import { Link } from "react-router-dom";
import { tokenDel } from './components/login/setToken';
import axios from "axios";
import { toast } from 'react-toastify';

// need to to check whether the person has some entries, if they have, create a link for them to check their entries, if they don't, do nothing

export default function Header () {
    const dispatch = useDispatch();
    const logged = useSelector((state) => state.logged.isLogged);
    const has_recipes = useSelector((state) => state.userentries.userhasrecipes);

    // gets rid of the token in django knox
    function Logout() {
        axios.post(
            '/api/auth/logout').then(
                response => {
                    console.log(response.data);
                    toast.success('Logout successful!', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            );
    }
    
    return (
        <div className='bg-yellow-400 py-4'>
          <div className="flex justify-between items-center">
        <Link to="/"> <p className='text-3xl ml-3'> Recipes  </p>  </Link>
            <ul className='flex mr-3 justify-around w-96'>
              <li>
                <Link to="about"> About</Link>
              </li>
              <li>
                <Link to="add-recipe"> Add Recipe </Link>
              </li>
              <li>
                {
                    has_recipes ? <Link to="my-recipes"> My Recipes </Link> : <p></p>
                }
              </li>
              <li>
	        {
		    logged ?
		        <button onClick={() => { dispatch(hasnorecipes()); Logout(); dispatch(logout()); tokenDel();}}>
			  Logout
		        </button>
		    :
		    /* <button onClick={() => dispatch(login())} className='bg-purple-400'> */
		    /*   Login */
		    /* </button> */
                    <Link to="/login"> Login  </Link>
	        }
              </li>
              <li>
                {/* <Link to="signup"> Signup </Link> */}
              </li>
            </ul>
          </div>
        </div>
    );
}
