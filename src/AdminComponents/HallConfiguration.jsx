import "../App.jsx";
import "../App.css";
import { useState } from "react";
import { Sheme } from "./Sheme.jsx";

// Логин - shfe-diplom@netology.ru
// Пароль - shfe-diplom

export const HallConfiguration = () => {    
    
    function hideSection(e) {
        e.preventDefault();
        const sectionBody = document.getElementById("hall__config__body");
        sectionBody.classList.toggle('hall__config__body__active');
    }

    let hallsResponse = [];
    let hallArr = [];
    let hallElements = [];
    let hallConfig = [];
    let [halls, setHalls] = useState();  
    let [id, setId] = useState(); 
    let [config, setConfig] = useState();
    let [grid, setGrid] = useState({row: 0, places: 0, config: [], id: 0});
    let [fixedConfig, setFixedConfig] = useState({row: 0, places: 0, config: []});

    fetch( 'https://shfe-diplom.neto-server.ru/alldata' )
    .then( response => response.json())
    .then( data => {
            hallsResponse = data.result.halls;
            for (let i = 0; i < hallsResponse.length; i++){
                hallArr.push(hallsResponse[i]["hall_name"])
            }
            hallElements = hallArr.map(item => (
                <button type="button" className = "hall__config__name" onClick = {hallStartConfig}>
                {item}
                </button>
            ));
            setHalls(halls = hallElements);
        }  
    ); 

    let hallRaws = 0;
    let hallPlaces = 0;

    function hallStartConfig(e) {
        let hallName = e.target.textContent;
        let hallId = 0;
        hallRaws = 0;
        hallPlaces = 0;
        for (let i = 0; i < hallsResponse.length; i++){
            if(hallsResponse[i]["hall_name"] === hallName){
                hallId = hallsResponse[i].id;
                hallConfig = hallsResponse[i]["hall_config"];
                hallRaws = hallsResponse[i]["hall_rows"];
                hallPlaces = hallsResponse[i]["hall_places"];
                setId(id = hallId);
                setGrid({row: hallRaws, places: hallPlaces, config: hallConfig, id: hallId});
                setFixedConfig({row: hallRaws, places: hallPlaces, config: hallConfig});
                setConfig(config = <Sheme click = {grid}/>);
            }
        };
    };

    let rowCount = 0;
    let placeCount = 0;

    function countRows(e) {
        e.preventDefault();
        rowCount = Number(e.target.value);
        placeCount = Number(document.getElementById("place").value);
        let newConfig = [];
        let newgrid = {};        
        let creatingRow = [];
        for(let i = 0; i < placeCount; i++){
            creatingRow.push("standart");
        };

        for(let i = 0; i < rowCount; i++){
            newConfig.push(creatingRow);
        };

        newgrid.row = Number(e.target.value);
        newgrid.places = Number(document.getElementById("place").value);
        newgrid.config = newConfig;

        setGrid(grid = newgrid); 
        setConfig(config = <Sheme click = {grid}/>);
    };

    function countPlaces(e) {
        e.preventDefault();
        placeCount = Number(e.target.value);
        rowCount = Number(document.getElementById("row").value);
        let newConfig = [];
        let newgrid = {};
        let creatingRow = [];
        for(let i = 0; i < placeCount; i++){
            creatingRow.push("standart");
        };

        for(let i = 0; i < rowCount; i++){
            newConfig.push(creatingRow);
        };

        newgrid.row = Number(document.getElementById("row").value); 
        newgrid.places = Number(e.target.value);
        newgrid.config = newConfig;
        setGrid(grid = newgrid); 
        setConfig(config = <Sheme click = {grid}/>);
    };

    function configBtnCancel(){
        setConfig(config = <Sheme click = {fixedConfig}/>);
    }

    function configBtnSave(){
        let rows = Array.from(document.getElementsByClassName("row"));
        let rowCount = rows.length;
        let arrayConfig = [] 
        for(let i = 0; i < rows.length; i++){
            arrayConfig.push(Array.from(rows[i].getElementsByClassName("place")))
        }

        for(let i = 0; i < arrayConfig.length; i++){
            for(let j = 0; j < arrayConfig[i].length; j++){
                let className = arrayConfig[i][j].className;
                arrayConfig[i][j] = className.slice(6);
            }
        }
        let placeCount = arrayConfig[0].length;
        const params = new FormData();
        params.set('rowCount', String(rowCount));
        params.set('placeCount', String(placeCount));
        params.set('config', JSON.stringify(arrayConfig));
        fetch( `https://shfe-diplom.neto-server.ru/hall/${id}`, {
            method: 'POST',
            body: params 
        })
        .then( response => response.json())
        .then( data => console.log( data ));

        console.log(arrayConfig)
    }

    return (
        <>
            <section className = "admin__section">
                <div className = "section__header">
                    <p className = "section__header__name">Конфигурация залов</p>
                    <button className = "section__header__arrow" onClick={hideSection}>
                        <img className = "section__header__arrow__img" src="../section__header__arrow.png"/>
                    </button>
                </div>
                <div className = "hall__config__body" id = "hall__config__body">
                    <p className = "config__text">Выберите зал для конфигурации:</p>
                    <div className = "hall__config__container">
                        {halls}
                    </div>
                    <div className = "hall__places__container">
                        <p className = "config__text">Укажите количество рядов и максимальное количество кресел в ряду:</p>
                        <div className = "hall__places__form">
                            <div className="hall__places__form__item">
                                <div for = "row" className = "label__row">Рядов, шт</div>
                                <input className = "input__hall" id = "row" type="text" onChange={countRows} value={grid.row}></input>
                            </div>
                            <p>x</p>
                            <div className="hall__places__form__item">
                                <div for = "place" className = "label__place">Мест, шт</div>
                                <input className = "input__hall" id = "place" type="text" onChange={countPlaces} value={grid.places}></input>
                            </div>
                        </div>
                        <div className="status__form">
                            <p className = "config__text">Теперь вы можете указать типы кресел на схеме зала:</p>
                            <form className = "hall__status__form">
                                <div className = "status__container">
                                    <label className="status__label">
                                        <input type="checkbox" className="status__input" id="standart"></input>
                                        - обычные кресла
                                        <span className="status__span status__span__standart"></span>
                                    </label>
                                </div>
                                <div className = "status__container">
                                    <label className="status__label">
                                        <input type="checkbox" className="status__input" id="vip"></input>
                                        - VIP кресла
                                        <span className="status__span status__span__vip"></span>
                                    </label>
                                </div>
                                <div className = "status__container">
                                    <label className="status__label">
                                        <input type="checkbox" className="status__input" id="disabled"></input>
                                        - заблокированные (нет кресла)
                                        <span className="status__span status__span__disabled"></span>
                                    </label>
                                </div>
                            </form>
                            <p className="status__instruction">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
                        </div>
                        <div className = "hall__zone">
                            <p className="screen">ЭКРАН</p>
                            {config}
                        </div>
                        <div className = "btn__container">
                            <button className = "btn__cancel" onClick={configBtnCancel}>Отмена</button>
                            <button className = "btn__save" onClick={configBtnSave}>Сохранить</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

};

export default HallConfiguration;