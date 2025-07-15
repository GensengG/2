import "../App.jsx";
import "../App.css";
import { useState } from "react";
import { QRCode } from "react-qr-code";
import { ReactDOM   } from "react-dom";

export const Booking = (item) => {
    let info = item.item.info;
    let seancesArr = item.item.seances.seances;
    let hallsArr = item.item.seances.halls;
    let [clickTime, setClickTime] = useState();
    let [prices, setPrices] = useState({standart:0, vip:0});
    let [config, setConfig] = useState([]);
    let [tickets, setTickets] = useState();
    let [places, setPlaces] = useState();
    let [coasts, setCoasts] = useState();          
    let [seanceId, setSeanceId] = useState();
    let [tickets, setTickets] = useState();
    let currentConfig = [];    
    let filmName = info.name;
    let hallName = info.hall;
    let indexPlaces = 0;
    let indexRows = 0;
    let rowArr = [];
    let ticketsArr = tickets;

    function counterPlaces (){
        return indexPlaces++;
    }

    function counterRows (){
        return indexRows++;
    }

    function bookingPlace (e) {
        let choosePlace = e.target;
        choosePlace.classList.toggle("booked__place");
    }
    function showPopupSeance(e) {
        const popUp = document.getElementById("popup__background__current__config");
        popUp.style.display = "block";
        setClickTime(clickTime = e.target.textContent);
        let needFilmArr = [];
        let currentPrices = {};
        for(let i = 0; i < seancesArr.length; i++){
            if(seancesArr[i]["seance_filmid"] === info.id){
                needFilmArr.push(seancesArr[i]);
            }
        }

        for(let i = 0; i < hallsArr.length; i++){   
            if(hallsArr[i]["hall_name"] === info.hall){
                currentPrices.standart = hallsArr[i]["hall_price_standart"];
                currentPrices.vip = hallsArr[i]["hall_price_vip"];
                setPrices(prices = currentPrices);
            }
        }

        for(let i = 0; i < needFilmArr.length; i++){
            if((Number(needFilmArr[i]["seance_time"].slice(-2)) === Number(e.target.textContent.slice(-2))) &&
              (Number(needFilmArr[i]["seance_time"].slice(0, 2)) === Number(e.target.textContent.slice(0, 2)))){
                setSeanceId(seanceId = needFilmArr[i].id);
            }
        }

        fetch( `https://shfe-diplom.neto-server.ru/hallconfig?seanceId=${seanceId}&date=${parmsDate()}` )
            .then( response => response.json())
            .then( data => {
                setConfig(config = data.result);
        });
    }

    function showPopupBooking() {
        const popUp = document.getElementById("popup__background__booking");
        popUp.style.display = "block";
    }

    function statusPlace(status){
        if(status === "standart"){
            return "free__standart"
        } else if(status === "vip"){
            return "free__vip"
        } else {
            return status
        }
    }
    
    function generatePlaces(arr){
        return arr.map(item => (
            <div className={`current__place ${statusPlace(item)}`} key={counterPlaces()} id={indexPlaces} onClick={bookingPlace}>
            </div> 
        ));
    }

    for(let i = 0; i < config.length; i++){
        rowArr.push(
            <div className = "current__row" id={indexRows} key={counterRows()} >
                {generatePlaces(config[i])}
            </div>
        )
    }

    let parmsDate = () => {
        let activDayBtn = document.getElementsByClassName("day active");
        let clickDate = 0;
        let clickWeekDay = "";
        let activWeekDay = () => {
            if(activDayBtn[0].textContent.length === 6){
                clickWeekDay = activDayBtn[0].textContent.slice(0, -4);
                clickDate = Number(activDayBtn[0].textContent.slice(4));
            } else if(activDayBtn[0].textContent.length === 5){
                clickWeekDay = activDayBtn[0].textContent.slice(0, -3);
                clickDate = Number(activDayBtn[0].textContent.slice(4));
            } else if (activDayBtn[0].textContent.length === 14){
                clickDate = Number(activDayBtn[0].textContent.slice(12));
                clickWeekDay = activDayBtn[0].textContent.slice(8, -4);
            } else if (activDayBtn[0].textContent.length === 13){
                clickDate = Number(activDayBtn[0].textContent.slice(12));
                clickWeekDay = activDayBtn[0].textContent.slice(8, -3)
            }

        }
        activWeekDay();
        let weekDayToNumber = () => {
            if(clickWeekDay === "Вс"){
                clickWeekDay = 0;
            } else if(clickWeekDay === "Пн"){
                clickWeekDay = 1;
            } else if(clickWeekDay === "Вт"){
                clickWeekDay = 2;
            } else if(clickWeekDay === "Ср"){
                clickWeekDay = 3;
            } else if(clickWeekDay === "Чт"){
                clickWeekDay = 4;
            } else if(clickWeekDay === "Пт"){
                clickWeekDay = 5;
            } else if(clickWeekDay === "Сб"){
                clickWeekDay = 6;
            }
        }
        weekDayToNumber();

        let currentDate = new Date();

        while((currentDate.getDate() !== clickDate) || (currentDate.getDay() !== clickWeekDay)){
            currentDate.setDate(currentDate.getDate() + 1)
        }

        let newYear = currentDate.getFullYear();
        let newMonth = currentDate.getMonth() + 1;
        let newDay = currentDate.getDate();
        if(newMonth < 10){
            newMonth = `0${newMonth}`
        }
        if(newDay < 10){
            newDay = `0${newDay}`
        }
        let newDate = `${newYear}-${newMonth}-${newDay}`;
        return newDate;
    }

    function byingTickets(){
        let chosePlaces = document.getElementsByClassName("booked__place");
        let placeNumber = 0;
        let coast = 0;
        let rowNumber = 0;
        let tickets = [];
        let placesArr = [];
        let coastArr = [];
        for(let j = 0; j < chosePlaces.length; j++){
            if(chosePlaces[j].className.includes("free__standart")){
                coast = prices.standart;
            } else if(chosePlaces[j].className.includes("free__vip")){
                coast = prices.vip;
            };

            let chooseRow = chosePlaces[j].parentElement;
            rowNumber = Number(chooseRow.id) + 1;
            let chooseRowArr = chosePlaces[j].parentElement.children;
            for(let i = 0; i < chooseRowArr.length; i++){
                if(Number(chooseRowArr[i].id) === Number(chosePlaces[j].id)){
                    placeNumber = i + 1;
                }
            }    
            placesArr.push(placeNumber);
            coastArr.push(coast);

            tickets.push({
                row: rowNumber,
                place: placeNumber,
                coast: coast, 
            });
        }
        setTickets(tickets = tickets);
        setPlaces(places = placesArr.join());
        setCoasts(coasts = coastArr.reduce((acc, number) => acc + number, 0))

        showPopupBooking();

        const params = new FormData();
        params.set('seanceId', seanceId);
        params.set('ticketDate', parmsDate());
        params.set('tickets', JSON.stringify(tickets));
        fetch( "https://shfe-diplom.neto-server.ru/ticket", {
            method: 'POST',
            body: params 
        })
        .then( response => response.json())
        .then( data => console.log( data ));
    }
    
    function showQRcode(){
        const popUpBooking = document.getElementById("popup__background__booking");
        popUpBooking.style.display = "none";
        const popUpOrder = document.getElementById("popup__background__order");
        popUpOrder.style.display = "block";
    }

    return (
        <>
            {info.time.map(elem => (
                <button className = "time" onClick={showPopupSeance}>{elem}</button>
            ))}

            <div id = "popup__background__current__config" className="popup__background__current__config">
                <div className="head__popup__current__config">
                    <div className="logo">ИДЁМ<p className="logo logo__B">В</p>КИНО</div>
                </div>
                <div className="popup popup__current__config">
                    <div className="info__current__config"> 
                        <p className="info__current info__current__film">{filmName}</p>
                        <p className="info__current info__current__time">Начало сеанса {clickTime}</p>
                        <p className="info__current info__current__hall">{hallName}</p>
                    </div>
                    <div className = "current__hall__zone">
                        <div className="hall__container">
                            <img className="display" src="../public/display.png"></img>
                            <div className="places__zone"> {rowArr} </div>
                        </div>
                        <div className="prices__zone">
                            <div className="prices__zone__column with__price">
                                <div className="prices__tipe">
                                    <div className="place free__standart"></div>
                                    <p className="prices__zone__text">Свободно ({prices.standart}руб)</p>
                                </div>
                                <div className="prices__tipe">
                                    <div className="place free__vip"></div>
                                    <p className="prices__zone__text">Свободно VIP ({prices.vip}руб)</p>
                                </div>
                            </div>
                            <div className="prices__zone__column no__price">
                                <div className="prices__tipe">
                                    <div className="place disabled"></div>
                                    <p className="prices__zone__text">Занято</p>
                                </div>
                                <div className="prices__tipe">
                                    <div className="place booking"></div>
                                    <p className="prices__zone__text">Выбрано</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "save__current__config">
                        <button className = "btn__save__current__config" onClick={byingTickets}>Забронировать</button> 
                    </div>
                </div>
            </div>                    
            <div id = "popup__background__booking" className="popup__background__booking">
                <div className="head__popup__booking">
                    <div className="logo">ИДЁМ<p className="logo logo__B">В</p>КИНО</div>
                </div>
                <div className="popup__header__booking">
                    <div className="border__top"></div>
                    <p className="popup__name__booking">ВЫ ВЫБРАЛИ БИЛЕТЫ:</p>
                    <div className="border__middle__bottom"></div>
                    <div className="border__middle__top"></div>
                </div>
                <div className="popup popup__booking">
                    <p className="popup__booking__data">На фильм: <span className="popup__booking__data__bold">"{info.name}"</span></p>
                    <p className="popup__booking__data">Места: <span className="popup__booking__data__bold">{places}</span></p>
                    <p className="popup__booking__data">В зале: <span className="popup__booking__data__bold">{info.hall}</span></p>
                    <p className="popup__booking__data">Начало сеанса: <span className="popup__booking__data__bold">{clickTime}</span></p>
                    <p className="popup__booking__data">Стоимость: <span className="popup__booking__data__bold">{coasts}</span></p>
                    <button className="btn__popup__booking" onClick={showQRcode}>ПОЛУЧИТЬ КОД БРОНИРОВАНИЯ</button>
                    <p className="instruction__popup__booking">После оплаты билет будет доступен в этом окне, а также придет вам на почту. Покажите QR-код нашему контроллеру у входа в зал.</p>
                    <p className="instruction__popup__booking">Приятного просмотра!</p>
                    <div className="border__bottom"></div>
                </div>
            </div>
            <div id = "popup__background__order" className="popup__background__order">
                <div className="head__popup__order">
                    <div className="logo">ИДЁМ<p className="logo logo__B">В</p>КИНО</div>
                </div>
                <div className="popup__header__order">
                    <div className="border__top"></div>
                    <p className="popup__name__booking"> ЭЛЕКТРОННЫЙ БИЛЕТ </p>
                    <div className="border__middle__bottom"></div>
                    <div className="border__middle__top"></div>
                </div>
                <div className="popup popup__order">
                    <p className="popup__order__data">На фильм: <span className="popup__order__data__bold">"{info.name}"</span></p>
                    <p className="popup__order__data">Места: <span className="popup__order__data__bold">{places}</span></p>
                    <p className="popup__order__data">В зале: <span className="popup__order__data__bold">{info.hall}</span></p>
                    <p className="popup__order__data">Начало сеанса: <span className="popup__order__data__bold">{clickTime}</span></p>
                    <div className="qrcode">
                        <QRCode value = "код для вашего билета"/> 
                    </div>
                    <div className="instruction__popup__order">
                        <p>Покажите QR-код нашему контроллеру для подтверждения бронирования</p>
                        <p>Приятного просмотра!</p>
                    </div>    
                    <div className="border__bottom"></div>
                </div>
            </div>
        </>
    )
}

export default Booking;
