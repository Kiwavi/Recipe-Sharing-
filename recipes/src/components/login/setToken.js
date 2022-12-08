import axios from "axios";

export function tokenSet(email,token) {
    window.localStorage.setItem('token',token);
    window.localStorage.setItem('email',email);
    axios.defaults.headers.common["Authorization"] = "Token " + localStorage.getItem('token');
}

export function tokenDel() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('email');
    delete axios.defaults.headers.common["Authorization"];
}

export function add (x,y) {
    const result = x + y;
    return result;
}
