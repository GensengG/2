import "../App.jsx";
import "../App.css";
import { Films } from "./Films.jsx";
import { Logout } from "./Logout.jsx";
import { useState } from "react";

export const Client = () => {
    function loginBtn(){
        let backgroundImg = document.getElementsByTagName("body");
        backgroundImg[0].setAttribute("style", "background-image: url(../public/admin__background.jpg);") 
        // backgroundImg[0].setAttribute("style", "background-image: url(..//admin__background.jpg); background-color: rgba(0, 0, 0, 0.5); background-size:cover; background-position: center; background-repeat: no-repeat; object-fit: cover")
        setState(state = (
            <Logout/>
        ))
    }    
    
    let [state, setState] = useState((
        <>
            <header className="head">
                <div className="logo">ИДЁМ<p className="logo logo__B">В</p>КИНО</div>
                <button className="header__btn" onClick={loginBtn}>Войти</button>
            </header>
            <Films/>
        </>
    ));

    return (
        <>
            {state}
        </>
    );

};

export default Client;
