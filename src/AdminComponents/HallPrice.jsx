import "../App.jsx";
import "../App.css";
import { useState, useEffect } from "react";
export const HallPrice = () => {    
    
    function hideSection(e) {
        e.preventDefault();
        const sectionBody = document.getElementById("hall__price__body");
        sectionBody.classList.toggle("hall__price__body__active");
    }

    let hallsResponse = [];
    let hallArr = [];
    let hallElements = [];
    let hallConfig = [];
    let hallId = 0;
    let [halls, setHalls] = useState();  
    let prices = {
        standart: 0,
        vip: 0,
    }
    let [id, setId] = useState();
    let [priceInfo, setPriceInfo] = useState({standart: 0, vip: 0});
    let [priceInfoFixed, setPriceInfoFixed] = useState({standart: 0, vip: 0});

    function startPrice(start){
        let hallName = start.textContent;
        for (let i = 0; i < hallsResponse.length; i++){
            if(hallsResponse[i]["hall_name"] === hallName){
                hallId = hallsResponse[i].id;
                priceInfo.standart = hallsResponse[i]["hall_price_standart"];
                priceInfo.vip = hallsResponse[i]["hall_price_vip"];
                priceInfoFixed.standart = hallsResponse[i]["hall_price_standart"];
                priceInfoFixed.vip = hallsResponse[i]["hall_price_vip"];
                setId(id = hallId);
            }
        };
    }

    useEffect(() => {
        fetch( 'https://shfe-diplom.neto-server.ru/alldata' )
        .then( response => response.json())
        .then( data => {
                hallsResponse = data.result.halls;
                hallArr = [];
                for (let i = 0; i < hallsResponse.length; i++){
                    hallArr.push(hallsResponse[i]["hall_name"])
                }
                function getClass(item){
                    if(hallArr[0] === item){
                        return "hall__config__name__active";

                    } else {
                        return "hall__config__name";
                    }
                };
                hallElements = hallArr.map(item => (
                    <button type="button" className = {getClass(item)} onClick={hallNameChecked}>
                    {item}
                    </button>
                ));
                setHalls(halls = hallElements);

                startPrice(document.getElementsByClassName("hall__config__name__active")[0]);
            }  
        )
    }, []);
    
    function hallNameChecked(e) {
        let pastActive = document.getElementsByClassName("hall__config__name__active");
        pastActive[0].className = "hall__config__name";
        e.target.className = "hall__config__name__active";

        let hallName = e.target.textContent;
        for (let i = 0; i < hallsResponse.length; i++){
            if(hallsResponse[i]["hall_name"] === hallName){
                hallId = hallsResponse[i].id;
                let standart = hallsResponse[i]["hall_price_standart"];
                let vip = hallsResponse[i]["hall_price_vip"];
                let standartBtn = document.getElementById("standartPrice");
                let vipBtn = document.getElementById("vipPrice");
                standartBtn.value = standart;
                vipBtn.value = vip;
            }
        };
        startPrice(e.target);
    }

    let standartPrice = document.getElementById("standartPrice");
    let vipPrice = document.getElementById("vipPrice");

    function changeStandart(e){
        e.preventDefault();
        let newPrice = {};
        newPrice.standart = e.value;
        newPrice.vip = vipPrice.value;
        setPriceInfo(priceInfo = newPrice)
    }

    function changeVip(e){
        e.preventDefault();
        let newPrice = {};
        newPrice.standart = standartPrice.value;
        newPrice.vip = e.value;
        setPriceInfo(priceInfo = newPrice)
    }

    function priceBtnCancel(){
        standartPrice.value = priceInfoFixed.standart;
        vipPrice.value = priceInfoFixed.vip;
    }

    function priceBtnSave(){
        let params = new FormData()
        params.set('priceStandart', Number(standartPrice.value))
        params.set('priceVip', Number(vipPrice.value));
        if ((Number(vipPrice.value) > 0) && (Number(standartPrice.value) > 0)){
            fetch( `https://shfe-diplom.neto-server.ru/price/${id}`, {
                method: 'POST',
                body: params 
            })
            .then( response => response.json())
            .then(data => {
                console.log(data)
            })
        } else {
            alert("Цена билетов не может быть отрицательной величиной");
        } 
    }

    return (
        <>
            <section className = "admin__section">
                <div className = "section__header">
                    <p className = "section__header__name">Конфигурация цен</p>
                    <button className = "section__header__arrow" onClick={hideSection}>
                        <img className = "section__header__arrow__img" src="../public/section__header__arrow.png"/>
                    </button>
                </div>
                <div className = "hall__price__body active" id = "hall__price__body">
                    <p className="config__text">Выберите зал для конфигурации:</p>
                    <div className = "hall__config__container">
                        {halls}
                    </div>                
                    <div>
                        <p className="price__instruction">Установите цены для типов кресел:</p>
                        <div className = "hall__prices__form">
                            <label for = "standartPrice" className = "label__price">Цена, рублей</label>
                            <input className = "input__price" id = "standartPrice" type="text" value={priceInfo.standart} onChange={changeStandart}></input>
                            <p className="price__text">за</p>
                            <div className = "type__place__standart"></div>
                            <p className="price__text">обычные кресла</p>
                        </div>
                        <div className = "hall__prices__form">
                            <label for = "vipPrice" className = "label__price">Цена, рублей</label>
                            <input className = "input__price" id = "vipPrice" type="text" value={priceInfo.vip} onChange={changeVip}></input>
                            <p className="price__text">за</p>
                            <div className = "type__place__vip"></div>
                            <p className="price__text">VIP кресла</p>
                        </div>
                        <div className = "btn__container">
                            <button className = "btn__cancel" onClick={priceBtnCancel}>Отмена</button>
                            <button className = "btn__save" onClick={priceBtnSave}>Сохранить</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default HallPrice;
