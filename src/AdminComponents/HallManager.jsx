import "../App.jsx";
import "../App.css";
import { useState } from "react";

// Логин - shfe-diplom@netology.ru
// Пароль - shfe-diplom

export const HallManager = () => {
    const params = new FormData();
    let hallsResponse = [];
    let hallArr = [];
    let hallElements = [];
    let [halls, setHalls] = useState();  

    fetch( 'https://shfe-diplom.neto-server.ru/alldata' )
        .then( response => response.json())
        .then( data => {
                hallsResponse = data.result.halls;
                for (let i = 0; i < hallsResponse.length; i++){
                    hallArr.push(hallsResponse[i]["hall_name"])
                }
                hallElements = hallArr.map(item => (
                    <div className = "hall">
                        <p className = "hall_name">- {item}</p>
                        <button className = "hall__delete" onClick={deleteHall}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg></button>
                    </div>
                ));
                setHalls(halls = hallElements);
            }
        );

    function showPopup() {
        const popUp = document.getElementById("popup__background");
        popUp.style.display = "block";
    }

    function hidePopup() {
        const popUp = document.getElementById("popup__background");
        popUp.style.display = "none";
    }

    function deleteHall(e){
        const bascet = e.target;
        const deleteBtn = bascet.closest("div"); 
        const hall = deleteBtn.children[0].textContent;
        const hallName = hall.slice(2);
        let deleteId = 0;

        console.log(hallName);

        for (let i = 0; i < hallsResponse.length; i++){
            if(hallsResponse[i]["hall_name"] === hallName){
                deleteId = hallsResponse[i].id
            }
        }

        fetch( `https://shfe-diplom.neto-server.ru/hall/${deleteId}`, {
            method: 'DELETE',
        })
            .then( response => response.json())
            .then( data => console.log( data ));

    }

    function createHall(){
        const addedHall = document.getElementById("create__hall");
        const addedHallName = addedHall.value;

        params.set("hallName", addedHallName);
        fetch( 'https://shfe-diplom.neto-server.ru/hall', {
            method: 'POST',
            body: params 
        })
        .then( response => response.json())
        .then( data => {
            console.log( data )
        });

        hidePopup();
    } 

    function createHallClear() {
        const addedHall = document.getElementById("create__hall");
        addedHall.value = "";
    }

    function hideSection(e) {
        e.preventDefault();
        const sectionBody = document.getElementById("hall__manager__body");
        sectionBody.classList.toggle('hall__manager__body__active');
    }
    
    return (
        <>
            <section className = "admin__section">
                <div className = "section__header">
                    <p className = "section__header__name">Управление залами</p>
                    <button className = "section__header__arrow" onClick={hideSection}>
                        <img className = "section__header__arrow__img" src="../section__header__arrow.png"/>
                    </button>
                </div>
                <div className = "hall__manager__body active" id = "hall__manager__body">
                    <p className = "hall__text">Доступные залы:</p>
                        {halls}
                    <button className="create__hall" onClick={showPopup}>Создать зал</button>
                </div>
            </section>
            <div id = "popup__background" className="popup__background">
                <div className="popup__background__shadow">
                    <div className="popup__hall__manager">
                        <div className="popup__header">
                            <p className="popup__name__hall__manager">Добавление зала</p>
                            <button className="popup__close" onClick={hidePopup}><img src="./popup__close.png" className="popup__close__img"></img></button>
                        </div>
                        <div className="popup__body__hall__manager">
                            <label for="create__hall" className="popup__label">Название зала</label>
                            <input type="text" name="create__hall" id = "create__hall" className = "hall__add__input" placeholder="Например, &quot;Зал1&quot;"></input>
                            <div className="btns__hall__manager">
                                <button className="save__btn__hall__manager" onClick={createHall}>Добавить зал</button>
                                <button className="cancel__btn__hall__manager" onClick={createHallClear}>Отменить</button>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </>
    );

};

export default HallManager;