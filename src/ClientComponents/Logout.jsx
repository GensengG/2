import "../App.jsx";
import "../App.css";
import { useState } from "react";
import { Admin } from "../AdminComponents/Admin.jsx";

export const Logout = () => {
    let email = "";
    let password = "";
    let user = "";
    let result = "";

    function logIn(){
        email = document.getElementById("email");
        password = document.getElementById("password");

        user = {
            login: email.value,
            password: password.value,
        };

        fetch("https://shfe-diplom.neto-server.ru/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(user),
        })
        .then( response => response.json())
        .then( response => {
                result = response;
            }
        );       

        if(result.success){
            setAdmin(admin = (
                <Admin />
            ));
        } else {
            // alert(result.error);
        } 
    }          

    let [admin, setAdmin] = useState((
        <>
            <div className="login__div login__div__popup">
                <form className="login__form">
                    <div className="login__form__name">АВТОРИЗАЦИЯ</div>
                    <div className="login__form__item">
                        <label for="email" className="form__item__label">E-mail</label>
                        <input type="email" name="email" id = "email" className="form__item__input"/>
                    </div>
                    <div className="login__form__item">
                        <label for="password" className="form__item__label">Пароль</label>
                        <input type="password" name="password" id = "password" className="form__item__input"/>
                    </div>
                </form>
                <button type="submit" className="form__submit__input form__submit__input__popup" onClick={logIn}>Авторизоваться</button>
            </div>
        </>
    ));

    return (
        <div className="admin__body">
            <header className="head__admin head__admin__popup" id="head__admin__popup">
                <div className="logo">ИДЁМ<p className="logo logo__B">В</p>КИНО</div>
                <div className="logo__tipe">АДМИНИСТРАТОРСКАЯ</div>
            </header>
            {admin}
        </div>
    )
};

export default Logout;