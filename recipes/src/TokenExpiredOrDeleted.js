import React from 'react';
import { useNavigate } from "react-router-dom";
import { logout } from '../src/redux/logged';
import { useDispatch } from 'react-redux';
import { hasnorecipes } from '../src/redux/userhasrecipes';
import { tokenDel } from '../src/components/login/setToken';

export function TokenRefresh(nextpage) {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const path = window.location.pathname;
    
    dispatch(logout());
    dispatch(hasnorecipes());
    tokenDel();
    navigate('/login?next='.concat(path));    
}
