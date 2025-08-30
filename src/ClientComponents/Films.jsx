import "../App.jsx";
import "../App.css";
import { useState } from "react";
import { Booking } from "./Booking.jsx";

export const Films = () => {
    let date = new Date();
    const days = [
        "Вс",
        "Пн",
        "Вт",
        "Ср",
        "Чт",
        "Пт",
        "Сб",
        "Вс",
        "Пн",
        "Вт",
        "Ср",
        "Чт",
        "Пт",
        "Сб",
        "Вс",
        "Пн",
        "Вт",
        "Ср",
        "Чт",
        "Пт",
        "Сб",
        "Вс",
        "Пн",
        "Вт",
        "Ср",
        "Чт",
        "Пт",
        "Сб",
        "Вс",
        "Пн",
        "Вт",
        "Ср",
        "Чт",
        "Пт",
        "Сб"
    ];
;
    const dateNumber = (i) => {
        let currentDate = new Date();
        let nextDate = currentDate.setDate(currentDate.getDate() + i)
        return currentDate.getDate();
    }

    const dateRender = (i) => {
        let weekDay = days[date.getDay() + i];
        return(weekDay)
    }

    let [filmsResult, setFilmsResult] = useState();
    let [clickSeance, setClickSeance] = useState();
    let [filmsData, setFilmsData] = useState();
    let info = [];
    let result = [];
    let films = [];

    let [allFilms, setAllFilms] = useState();

    function generateStartFilms(firstData){
        let seancesArr = filmsData.seances;
        let filmsArr = filmsData.films;
        let hallsArr = filmsData.halls;
    
        info = seancesArr.map(item => ({
            id: item["seance_filmid"],
            number: item["seance_hallid"],
            time: item["seance_time"]
        }))

        let shortArr = filmsArr.map(item => ({
            [item.id]: {
                name: item["film_name"],
                description: item["film_description"],
                poster: item["film_poster"],
                duration: item["film_duration"],
                origin: item["film_origin"]
            }
        }))

        hallsArr = hallsArr.map(item => ({
            id: item.id,
            name: item["hall_name"],
        }))

        let idArr = []
        info.forEach(item => {
            idArr.push(item.id)
        });

        function select (info, films, shortArr, idArr){                
            for (let k = 0; k < shortArr.length; k++){
                let id = Number(Object.keys(shortArr[k]));
                let obj = shortArr[k][id];
                if(idArr.includes(id)){
                    films.push({
                        id: id,
                        name: obj.name,
                        description: obj.description,
                        poster: obj.poster,
                        duration: obj.duration,
                        origin: obj.origin,
                        time: [],
                    })
                }
            }
            for (let i = 0; i < films.length; i++){
                let id = films[i].id;
                let time = [];
                for (let j = 0; j < info.length; j++){
                    if(info[j].id === id){
                        films[i].number = info[j].number;
                        time.push(info[j].time);
                        films[i].time = time;
                    }
                }
            } 
            for (let i = 0; i < films.length; i++){
                let num = films[i].number;
                for (let q = 0; q < hallsArr.length; q++){
                    if(hallsArr[q].id === num){
                        films[i].hall = hallsArr[q].name;
                    }
                }
            }
        }

        select (info, films, shortArr, idArr);
        setFilmsResult(filmsResult = films); 
        
        result = filmsResult.map(item => (
            <div key = {item.id} className = "film__card">               
                <div className = "film__info">
                    <img src = {item.poster} className = "film__poster"></img>
                    <div className = "film__text">
                        <p className = "film__name">{item.name}</p>
                        <p className = "film__description">{item.description}</p>
                        <p className = "film__time">{item.duration} минуты {item.origin}</p>
                    </div>
                </div>
                <div className = "halls__info">
                    <p className = "hall__number">{item.hall}</p>
                    <Booking item = {{info: item, seances: filmsData}}/>
                </div>
            </div>
        ))

        setAllFilms(allFilms = result);
    }
    
    window.addEventListener('load', () => {
        fetch( 'https://shfe-diplom.neto-server.ru/alldata' )
        .then( response => response.json())
        .then( data => {
            setFilmsData(filmsData = data.result);
            generateStartFilms();
        });
    }); 

    function hidePopupSeance(e) {
        const popUp = document.getElementById("popup__background__seance__click");
        popUp.style.display = "none";
    } 

    function dayClick(e) {
        films = [];
        let pastActive = document.getElementsByClassName("day active");
        for(let i = 0; i < pastActive.length; i++){
            pastActive[i].classList.remove("active");
        }
        e.target.classList.add("active");
        generateStartFilms(); 
    }

    let countNextDay = 0;
    function daysColor(day){
        if((day === "Вс") || (day === "Сб")){
            return "day day__weekend";
        } else {
            return "day";
        }
    }

    function dayNextClick(){
        countNextDay ++;
        let pastActive = document.getElementsByClassName("day active");
        for(let i = 0; i < pastActive.length; i++){
            pastActive[i].classList.remove("active");
        }
        let nextActive = document.getElementsByClassName("day day__next");
        nextActive[0].classList.add("day__next__active");

        setDaysBtn(
            <div className="days__list">
                <button className={daysColor(dateRender(countNextDay))} onClick={dayClick}>{dateRender(countNextDay)}, <br />{dateNumber(countNextDay)}</button>
                <button className={daysColor(dateRender(countNextDay + 1))} onClick={dayClick}>{dateRender(countNextDay + 1)}, <br />{dateNumber(countNextDay + 1)}</button>
                <button className={daysColor(dateRender(countNextDay + 2))} onClick={dayClick}>{dateRender(countNextDay + 2)}, <br />{dateNumber(countNextDay + 2)}</button>
                <button className={daysColor(dateRender(countNextDay + 3))} onClick={dayClick}>{dateRender(countNextDay + 3)}, <br />{dateNumber(countNextDay + 3)}</button>
                <button className={daysColor(dateRender(countNextDay + 4))} onClick={dayClick}>{dateRender(countNextDay + 4)}, <br />{dateNumber(countNextDay + 4)}</button>
                <button className={daysColor(dateRender(countNextDay + 5))} onClick={dayClick}>{dateRender(countNextDay + 5)}, <br />{dateNumber(countNextDay + 5)}</button>
                <button className="day day__next day__next__active" onClick={dayNextClick}>{">"}</button>
            </div>
        )
    }

    let [daysBtn, setDaysBtn] = useState(
        <div className="days__list">
            <button className={`${daysColor(dateRender(countNextDay))} active today`} onClick={dayClick}>Сегодня<br /> {dateRender(countNextDay)}, {dateNumber(countNextDay)}</button>
            <button className={daysColor(dateRender(countNextDay + 1))} onClick={dayClick}>{dateRender(countNextDay + 1)}, <br />{dateNumber(countNextDay + 1)}</button>
            <button className={daysColor(dateRender(countNextDay + 2))} onClick={dayClick}>{dateRender(countNextDay + 2)}, <br />{dateNumber(countNextDay + 2)}</button>
            <button className={daysColor(dateRender(countNextDay + 3))} onClick={dayClick}>{dateRender(countNextDay + 3)}, <br />{dateNumber(countNextDay + 3)}</button>
            <button className={daysColor(dateRender(countNextDay + 4))} onClick={dayClick}>{dateRender(countNextDay + 4)}, <br />{dateNumber(countNextDay + 4)}</button>
            <button className={daysColor(dateRender(countNextDay + 5))} onClick={dayClick}>{dateRender(countNextDay + 5)}, <br />{dateNumber(countNextDay + 5)}</button>
            <button className="day day__next" onClick={dayNextClick}>{">"}</button>
        </div>
    ); 

    return (
        <main class = "client__main">
            {daysBtn}
            <div className = "films__list">
                {allFilms}
            </div>
            <div id = "popup__background__seance__click" className="popup__background__seance">
                <div className="popup">
                    <div className="popup__header">
                        <p className="popup__name">Добавление сеанса</p>
                        <button className="popup__close" onClick={hidePopupSeance}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#EFEFEF"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
                    </div>
                    <div className="popup__body">
                    </div>
                </div>
            </div>
        </main>
    );

};

export default Films;

