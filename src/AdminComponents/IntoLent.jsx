import "../App.jsx";
import "../App.css";
import { useState, useEffect } from "react";
export const SessionGrid = () => {    
    
    function hideSection(e) {
        e.preventDefault();
        const sectionBody = document.getElementById("session__grid__body");
        sectionBody.classList.toggle('session__grid__body__active');
    }

    let filmsResponse = [];
    let hallsResponse = [];
    let sessionResponse = [];
    let hallArr = [];
    let hallElements = [];
    let filmsInfo = [];
    let filmsElements = [];
    let [films, setFilms] = useState();  
    let [filmsInformation, setFilmsInformation] = useState();  
    let [halls, setHalls] = useState();  
    let [nameFilm, setNameFilm] = useState();
    let [nameHall, setNameHall] = useState({name: "", id: 0});
    let [sessionId, setSessionId] = useState({text: "", id: 0});
    let [deletedSession, setDeletedSession] = useState();
    let [seances, setSeances] = useState();
    let [hallInput, setHallInput] = useState();

    const loadHalls = () => {
        fetch( 'https://shfe-diplom.neto-server.ru/alldata' )
        .then( response => response.json())
        .then( data => {
                filmsInfo = [];
                sessionResponse = data.result.seances;
                filmsResponse = data.result.films;
                hallsResponse = data.result.halls;
                for (let i = 0; i < filmsResponse.length; i++){
                    filmsInfo.push({
                        name: filmsResponse[i]["film_name"],
                        time: filmsResponse[i]["film_duration"],
                        poster:filmsResponse[i]["film_poster"],
                        id:filmsResponse[i].id,
                    })
                }

                setFilmsInformation(filmsInformation = filmsInfo);
                let colorArr = [
                    "#CCCCFF",
                    "#C5D0E6",
                    "#ABCDEF",
                    "#4D7198",
                    "#9ACEEB",
                    "#606E8C",
                    "#A2A2D0",
                    "#A2ADD0",
                    "#5F9EA0",
                    "#B0B7C6",
                    "#00538A",
                    "#2271B3",
                    "#9DB1CC",
                    "#49678D",
                    "#5D9B9B",
                    "#2A6478",
                    "#79A0C1",
                    "#6699CC",
                    "#4682B4",
                ];

                function setRandomColor() {      
                    let filmsArr = document.getElementsByClassName("films__list__item");
                    for(let i = 0; i < filmsArr.length; i++){
                        filmsArr[i].setAttribute('style', `background-color:${colorArr[i]}`);
                        filmsArr[i].id = colorArr[i];
                    }
                };

                filmsElements = filmsInfo.map(item => (
                    <div className = "films__list__item" draggable="true" onDragStart={start} onDragEnd={end} onLoad={setRandomColor}>
                        <img src={item.poster} className = "film__item__poster"></img>
                        <div className = "film__item__info">
                            <p className = "film__item__name">{item.name}</p>
                            <p className = "film__item__time">{item.time} минут</p>
                        </div>
                        <button className = "film__item__delete" onClick={deleteFilm}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg></button>
                    </div>
                ));

                function intoLent (date) {
                    let id = 0;
                    for(let i = 0; i < hallsResponse.length; i++){
                        if(hallsResponse[i]["hall_name"] === date){
                            id = hallsResponse[i].id;
                        }
                    }

                    let oneHallSession = [];
                    for(let i = 0; i < sessionResponse.length; i++){
                        if(sessionResponse[i]["seance_hallid"] === id){
                            oneHallSession.push(sessionResponse[i]);
                        }
                    }

                    for(let i = 0; i < oneHallSession.length; i++){
                        for(let j = 0; j < filmsInfo.length; j++){
                            if(filmsInfo[j].id === oneHallSession[i]["seance_filmid"]){
                                oneHallSession[i].name = filmsInfo[j].name;
                            }
                        }
                    }

                    let oneHallTime = [];
                    let oneHall = [];

                    for(let i = 0; i < oneHallSession.length; i++){
                        oneHallTime.push(
                            Number(oneHallSession[i]["seance_time"].slice(-5, -3)),
                        )
                    }
                    let oneHallSort = oneHallTime.sort((a, b) => a - b);

                    for(let i = 0; i < oneHallSort.length; i++){
                        for(let j = 0; j < oneHallSession.length; j++){
                            if(Number(oneHallSession[j]["seance_time"].slice(-5, -3)) === oneHallSort[i]){
                                oneHall.push(oneHallSession[j]);
                            }
                        }
                    }

                    let resultWithoutColor = oneHall.map(item => (
                        <div className="into__lent__container" onDragStart={startDrop} onDragEnd={endDrop}>
                            <p className="into__lent__name" draggable="true">{item.name}</p>
                            <p className="into__lent__time">{item["seance_time"]}</p>
                        </div>
                    ));

                    return resultWithoutColor;
                }
                setFilms(films = filmsElements);
                hallArr = [];
                for (let i = 0; i < hallsResponse.length; i++){
                    hallArr.push(hallsResponse[i]["hall_name"]);
                }
                
                hallElements = hallArr.map(item => (
                    <div className="session">
                        <p className="hall__name__lent">{item}</p>
                        <div id = {item} className="popup__basket" onDragOver={dropEnd}>
                            <div className="basket">
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="40.000000pt" height="40.000000pt" viewBox="0 0 100.000000 100.000000" preserveAspectRatio="xMidYMid meet">
                                    <g transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                                    <path d="M398 858 c-9 -7 -18 -22 -20 -33 -2 -15 -12 -21 -38 -23 -45 -5 -60 -18 -60 -53 0 -26 -3 -29 -35 -29 -33 0 -35 -2 -35 -33 0 -23 8 -41 25 -57 30 -28 32 -46 5 -60 -17 -9 -20 -21 -20 -70 0 -49 3 -61 20 -70 18 -10 20 -21 20 -118 0 -167 19 -182 235 -182 213 0 237 18 243 184 4 79 9 106 23 125 26 32 25 95 -1 121 -27 27 -25 52 5 80 36 34 31 74 -10 78 -55 5 -57 8 -40 48 8 20 15 40 15 44 0 9 -127 60 -147 60 -6 0 -15 -9 -18 -21 l-7 -21 -15 21 c-11 17 -25 21 -72 21 -31 0 -64 -6 -73 -12z m130 -21 c6 -7 11 -32 10 -55 0 -24 2 -46 6 -49 3 -4 6 1 6 10 0 23 23 21 45 -3 18 -20 17 -20 -138 -20 l-157 0 0 30 c0 31 0 31 67 34 10 1 20 -9 24 -24 5 -18 7 -12 8 26 1 28 4 54 8 57 12 12 110 7 121 -6z m124 -8 c29 -11 54 -22 56 -24 1 -1 -3 -14 -9 -29 -10 -21 -19 -26 -46 -26 -19 0 -46 8 -61 17 -15 9 -28 17 -29 18 -6 3 22 65 29 65 4 0 31 -9 60 -21z m21 -106 c-7 -2 -21 -2 -30 0 -10 3 -4 5 12 5 17 0 24 -2 18 -5z m87 -41 c0 -10 -11 -29 -25 -42 l-25 -23 0 -198 c0 -109 -3 -204 -6 -213 -5 -14 -33 -16 -209 -16 -202 0 -203 0 -209 22 -3 13 -6 109 -6 214 l0 191 -26 24 -26 24 264 5 263 6 -262 2 c-167 1 -263 6 -263 12 0 6 95 10 265 10 250 0 265 -1 265 -18z m-500 -182 c0 -27 -4 -50 -10 -50 -5 0 -10 23 -10 50 0 28 5 50 10 50 6 0 10 -22 10 -50z m500 0 c0 -21 -4 -42 -10 -45 -6 -4 -10 13 -10 45 0 32 4 49 10 45 6 -3 10 -24 10 -45z m-110 -337 c-42 -18 -293 -15 -325 4 -16 10 17 12 170 12 178 -1 188 -2 155 -16z"/>
                                    <path d="M321 616 c-13 -15 -13 -357 0 -377 3 -6 17 -9 30 -7 l24 3 0 195 c0 190 -1 195 -21 198 -11 2 -26 -4 -33 -12z"/>
                                    <path d="M422 618 c-9 -9 -12 -62 -12 -189 0 -186 5 -205 47 -197 17 3 18 19 18 198 0 188 -1 195 -20 198 -11 1 -26 -3 -33 -10z"/>
                                    <path d="M522 618 c-9 -9 -12 -62 -12 -189 0 -186 5 -205 47 -197 17 3 18 19 18 198 0 188 -1 195 -20 198 -11 1 -26 -3 -33 -10z"/>
                                    <path d="M622 618 c-9 -9 -12 -62 -12 -189 0 -186 5 -205 47 -197 17 3 18 19 18 198 0 188 -1 195 -20 198 -11 1 -26 -3 -33 -10z"/>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div className="session__lent" onDragOver={drop}>
                            {intoLent(item)}
                        </div>
                    </div>
                ));

                setHalls(halls = hallElements);
            }  
        );
    }

    useEffect(() => {
        loadHalls();
    }, []);

    function getColor(){
        let arr = document.getElementsByClassName("into__lent__container");
        for(let i = 0; i < arr.length; i++){
            let filmsArray = document.getElementsByClassName("film__item__name");
            for(let j= 0; j< filmsArray.length; j++){
                let infoContainer = filmsArray[j].parentElement;
                let filmContainer = infoContainer.parentElement;
                let color = filmContainer.id;
                if(arr[i].children[0].textContent === filmsArray[j].textContent){
                    arr[i].setAttribute('style', `background-color:${color};`)
                }
            }
        }
    }

    getColor();

    function start(e){
        let elementParent = e.target.closest("div");
        let nameDiv = elementParent.getElementsByClassName("film__item__name");
        elementParent.classList.add("selected");
        setNameFilm(nameFilm = nameDiv[0].textContent);
    };

    function end(e){
        let elementParent = e.target.closest("div");
        elementParent.classList.remove("selected");
    };

    function startDrop(e){
        let dropElement = e.target;
        setDeletedSession(deletedSession = dropElement.textContent);
        let session = dropElement.parentElement.parentElement.parentElement;
        let hallName = session.querySelector("p").textContent;
        let basket = document.getElementById(`${hallName}`);
        basket.style.display = "block";
    };

    function endDrop(e){
        let dropElement = e.target;
        let session = dropElement.parentElement.parentElement.parentElement;
        let hallName = session.querySelector("p").textContent;
        let basket = document.getElementById(`${hallName}`);
        basket.style.display = "none";
    }

    function dropEnd(e){
        e.preventDefault();
        let dropedElement = e.target.parentElement;
        let hallName = dropedElement.parentElement.id;

        e.target.addEventListener("drop", (e) => {
            e.preventDefault();
            let hallId = 0;
            for (let i = 0; i < hallsResponse.length; i++){
                if(hallsResponse[i]["hall_name"] === hallName){
                    hallId = hallsResponse[i].id;
                }
            }
            for (let i = 0; i < sessionResponse.length; i++){
                if((sessionResponse[i]["seance_hallid"] === hallId) && (sessionResponse[i].name === deletedSession)){
                    let newSessionId = {
                        id: sessionResponse[i].id,
                        text: deletedSession,
                    }
                    setSessionId(sessionId = newSessionId);
                }
            }
            showPopupSessionDelete();
        })
    };

    function drop(e){
        e.preventDefault();
        let hallName =e.target.textContent;

        e.target.addEventListener("drop", (e) => {
            e.preventDefault();
            let container = e.target.closest("div");
            let hall = container.parentElement.children[0].textContent;
            setHallInput(hallInput = hall);
            let hallId = 0;
            let seances = [];
                    
            for (let i = 0; i < hallsResponse.length; i++){
                if(hallsResponse[i]["hall_name"] === hallInput){
                    hallId = hallsResponse[i].id;
                    let hallInfo = {
                        name: hall,
                        id: hallId
                    }
                    setNameHall(nameHall = hallInfo);
                }
            }

            for (let i = 0; i < sessionResponse.length; i++){
                if(sessionResponse[i]["seance_hallid"] === hallId){
                    let filmId = sessionResponse[i]["seance_filmid"];
                    let duration = 0;
                    let filmName = "";
                    for (let i = 0; i < filmsResponse.length; i++){
                        if(filmsResponse[i].id === filmId){
                            duration = filmsResponse[i]["film_duration"];
                            filmName = filmsResponse[i]["film_name"];
                        }
                    }
                    seances.push({
                        timeStart: sessionResponse[i]["seance_time"],
                        duration: duration,
                        name: filmName,  
                        filmId: filmId,
                        hallId: hallId,
                    });
                }
            }
            setSeances(seances = seances);

            let popUp = document.getElementById("popup__background__add__session");
            popUp.style.display = "block";
        })
    };

    function deleteFilm(e){
        const bascet = e.target;
        const deleteItem = bascet.closest("div"); 
        const film = deleteItem.getElementsByClassName("film__item__name");
        const filmName = film[0].textContent;
        let deleteId = 0;

        for (let i = 0; i < filmsResponse.length; i++){
            if(filmsResponse[i]["film_name"] === filmName){
                deleteId = filmsResponse[i].id
            }
        }

        fetch( `https://shfe-diplom.neto-server.ru/film/${deleteId}`, {
            method: 'DELETE',
        })
            .then( response => response.json())
            .then( data => {
                console.log( data );
                loadHalls();
            });
    }

    function showPopup() {
        const popUp = document.getElementById("popup__background__add__film");
        popUp.style.display = "block";
    }

    function hidePopup() {
        const popUp = document.getElementById("popup__background__add__film");
        popUp.style.display = "none";
    }

    let name = document.getElementById("name");
    let time = document.getElementById("time");
    let description = document.getElementById("description");
    let country = document.getElementById("country");
    let poster = document.getElementById("poster");

    function filmBtnCancel(){
        name.value = "";
        name.placeholder = "Например, \"Гражданин Кейн\""
        time.value = "";
        description.value = "";
        country.value = "";
        poster.value = "";
    }

    function filmAdd(){
        let params = new FormData();
        params.set('filmName', String(name.value));
        params.set('filmDuration', Number(time.value));
        params.set('filmDescription', String(description.value));
        params.set('filmOrigin', String(country.value));
        params.set('filePoster', poster.files[0]);
        if(Number(time.value) > 0){
            fetch( "https://shfe-diplom.neto-server.ru/film", {
                method: 'POST',
                body: params 
            })
            .then( response => response.json())
            .then( data => {
                console.log( data );
                loadHalls();
            });
        } else {
            alert("продолжительность фильма не может быть отрицательной величиной");
        }
    }
    function hidePopupSession() {
        const popUp = document.getElementById("popup__background__add__session");
        popUp.style.display = "none";
    }

    function hidePopupSessionDelete(){
        const popUp = document.getElementById("popup__background__delete__session");
        popUp.style.display = "none";
    }

    function showPopupSessionDelete(){
        const popUp = document.getElementById("popup__background__delete__session");
        popUp.style.display = "block";
    }

    function posterAdd() {
        poster.click();
        poster.onchange = function() {
            if (this.files[0].size > 3145728) { 
              alert("Размер файла превышен, выберите файл меньше 3МБ.");
              this.value = '';
            }
            if(poster.value){
                setPoster(posters = poster.value)
            }
        };
    }

    function sessionAdd(){
        let filmName = document.getElementById("nameFilm");
        let time = document.getElementsByClassName("time__input");
        let filmsInfo = filmsInformation;
        let filmDuration = 0;
        let maxHour = 0;
        let maxMinutes = 0;
        let seanceHallid = 0;
        let seanceFilmid = 0;
        for (let i = 0; i < filmsInfo.length; i++){
            if(filmsInfo[i]["name"] === filmName.value){
                filmDuration = filmsInfo[i]["time"]
            }

            let durationHour =  Math.floor(filmDuration / 60);
            let durationMinutes = filmDuration - (durationHour * 60);

            maxHour = 23 - durationHour;
            maxMinutes = 59 - durationMinutes;
        }

        for (let i = 0; i < filmsInfo.length; i++){
            if(filmsInfo[i]["name"] === filmName.value){
                seanceFilmid = filmsInfo[i].id;
            }
        }

        for (let i = 0; i < seances.length; i++){
            let start = seances[i]["timeStart"];
            let minutesStart = Number(start.slice(-2));
            let hourStart = Number(start.slice(-5, -3));
            let minutesEnd = 0;
            let hourEnd = 0;
            let duration = Number(seances[i]["duration"]);
            if(duration > 60){
                hourEnd = hourStart + Math.floor(duration / 60);
                minutesEnd = minutesStart + (duration - (60 * Math.floor(duration / 60)));
            } else {
                hourEnd = hourStart;
                minutesEnd = minutesStart + duration;
            }

            if(minutesEnd > 60){
                hourEnd =+ 1;
                minutesEnd =- 60;
            }

            if(Number(time[0].value.slice(-5, -3)) > maxHour){
                alert("Сеанс не может заканчиваться позже 23:59");
            } else if ((Number(time[0].value.slice(-5, -3)) === maxHour) && (Number(time[0].value.slice(-2)) > maxMinutes)){
                alert("Сеанс не может заканчиваться позже 23:59");
            }

            if ((hourStart <= Number(time[0].value.slice(-5, -3))) && (Number(time[0].value.slice(-5, -3)) <= hourEnd) && (minutesStart <= Number(time[0].value.slice(-2))) && (Number(time[0].value.slice(-2)) <= minutesEnd)){
                alert("В этом интервале уже есть сеанс");
            }
        }
        
        let params = new FormData();
        params.set('seanceHallid', nameHall.id);
        params.set('seanceFilmid', seanceFilmid);
        params.set('seanceTime', time[0].value);
        console.log(nameHall.id);

        fetch( "https://shfe-diplom.neto-server.ru/seance", {
            method: 'POST',
            body: params 
        })
        .then( response => response.json())
        .then( data => console.log( data ))

        hidePopupSession();

        loadHalls();
    }

    function sessionBtnCancel(e){
        e.preventDefault();
        let timeInput = document.getElementsByClassName("time__input");
        timeInput[0].value = "00:00";
    }

    function sessionDelete(){ 
        fetch( `https://shfe-diplom.neto-server.ru/seance/${sessionId.id}`, {
            method: 'DELETE',
        })
        .then( response => response.json())
        .then( data => {
            console.log( data );
            hidePopupSessionDelete();
            loadHalls();
        });
    }

    return (
        <>
            <section className = "admin__section">
                <div className = "section__header">
                    <p className = "section__header__name">Сетка сеансов</p>
                    <button className = "section__header__arrow" onClick={hideSection}>
                        <img className = "section__header__arrow__img" src="../public/section__header__arrow.png"/>
                    </button>
                </div>
                <div className = "session__grid__body active" id = "session__grid__body">
                    <button className = "btn__add__film" onClick={showPopup}>Добавить фильм</button> 
                    <div id = "popup__background__add__film" className="popup__background">
                        <div className="popup__background__shadow">
                            <div className="popup__add__film">
                                <div className="popup__header">
                                    <p className="popup__name__add__hall">Добавление фильма</p>
                                    <button className="popup__close" onClick={hidePopup}><img src="../public/popup__close.png" className="popup__close__img"></img></button>
                                </div>
                                <div className="popup__body__add__film">
                                    <div className="label__container">
                                        <label for="name" className = "popup__label">Название фильма:</label>
                                        <input type="text" name="name" id="name" className = "film__name__input" placeholder="Например, &quot;Гражданин Кейн&quot;"></input>
                                    </div>
                                    <div className="label__container">
                                        <label for="time" className="popup__label">Продолжительность фильма (мин.)</label>
                                        <input type="number" name="time" id="time" className = "film__time__input"></input>
                                    </div>
                                    <div className="label__container">
                                        <label for="description" className="popup__label">Описание фильма:</label>
                                        <textarea type="text" name="description" id="description" className = "film__description__input"></textarea>
                                    </div>
                                    <div className="label__container">
                                        <label for="country" className = "popup__label">Страна:</label>
                                        <input type="text" name="country" id="country" className = "film__country__input"></input>
                                    </div>
                                    <div className="btns__container">
                                        <button className = "film__add__btn" onClick={filmAdd}>Добавить фильм</button>
                                        <input type="file" name="poster" id="poster" accept=".png" className = "film__poster__input"></input>  
                                        <button id="poster__add__btn" className="poster__add__btn" onClick={posterAdd}>Загрузить постер</button>
                                        {/* <span id="selected__poster" className="selected__poster">{posters}</span> */}
                                        <button className = "btn__cancel">Отменить</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "films__list">
                        {films}
                    </div> 
                    <div className = "session__lents">
                        {halls}
                    </div>
                    <div className="btns__out">
                        <button className = "btn__cancel__out" onClick={sessionBtnCancel}>Отменить</button>
                        <button className = "film__add__btn__out" onClick={filmAdd}>Сохранить</button>
                    </div>
                    <div id = "popup__background__add__session" className="popup__background">
                        <div className="popup__background__shadow">
                            <div className="popup__add__seance">
                                <div className="popup__header">
                                    <p className="popup__name__add__seance">Добавление сеанса</p>
                                    <button className="popup__close" onClick={hidePopupSession}><img src="../public/popup__close.png" className="popup__close__img"></img></button>
                                </div>
                                <div className="popup__body__add__seance">
                                    <div className="label__container">
                                        <label for="nameHall" className = "popup__label">Название зала:</label>
                                        <input type="text" name="nameHall" id="nameHall" className = "hall__name__input" value = {hallInput}></input>
                                    </div>
                                    <div className="label__container">
                                        <label for="nameFilm" className = "popup__label">Название фильма:</label>
                                        <input type="text" name="nameFilm" id="nameFilm" className = "film__name__input" value = {nameFilm}></input>
                                    </div>
                                    <div className="label__container">
                                        <label for="time" className = "popup__label">Время начала:</label>
                                        <input type="time" name="time" id="time" className = "time__input"></input>
                                    </div>
                                    <div className="btns__container__seance">
                                        <button className = "film__add__btn" onClick={sessionAdd}>Добавить сеанс</button>
                                        <button className = "btn__cancel" onClick={sessionBtnCancel}>Отменить</button> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id = "popup__background__delete__session" className="popup__background__session">
                        <div className="popup__delete__seance">
                            <div className="popup__header">
                                <p className="popup__name__delete__seance">Удаление сеанса</p>
                                <button className="popup__close" onClick={hidePopupSessionDelete}><img src="../public/popup__close.png" className="popup__close__img"></img></button>
                            </div>
                            <div className="popup__body__delete__session">
                                <p className="popup__delete__session">{`Вы действительно хотите снять с сеанса фильм "${sessionId.text}"?`}</p>
                                <div className="btns__container__seance">
                                    <button className = "film__delete__btn" onClick={sessionDelete}>Удалить сеанс</button>
                                    <button className = "btn__cancel" onClick={hidePopupSessionDelete}>Отменить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SessionGrid;
