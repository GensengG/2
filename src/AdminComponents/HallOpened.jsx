import "../App.jsx";
import "../App.css";
import { useState, useEffect } from "react";

export const HallOpened = ( {hallsStart} ) => {      
    function hideSection(e) {
        e.preventDefault();
        const sectionBody = document.getElementById("hall__opened__body");
        sectionBody.classList.toggle('hall__opened__body__active');
    }

    let [hallsResponse, setHallsResponse] = useState(hallsStart);
    let hallOpen = 0;
    let hallId = 0;
    let [halls, setHalls] = useState();  
    let [id, setId] = useState();
    let [open, setOpen] = useState();
    let [openInfo, setOpenInfo] = useState({text: "Выберите зал", btn: "Открыть/Закрыть зал"});
    
    function loadHalls () {
        let halls = [];
        for (let i = 0; i < hallsResponse.length; i++){
            halls.push(hallsResponse[i]["hall_name"])
        }
        function getClass(item){
            if(halls[0] === item){
                return "hall__config__name__active";

            } else {
                return "hall__config__name";
            }
        };
        let elements = halls.map(item => (
            <button type="button" className = {getClass(item)} onClick = {hallNameChecked}>
            {item}
            </button>
        ));
        setHalls(elements);
    };

    useEffect(() => {
        loadHalls();
    }, []);

    function hallNameChecked(e) {
        let pastActive = document.getElementsByClassName("hall__config__name__active");
        pastActive[0].className = "hall__config__name";
        e.target.className = "hall__config__name__active";
        
        let hallName = e.target.textContent;
        for (let i = 0; i < hallsResponse.length; i++){
            if(hallsResponse[i]["hall_name"] === hallName){
                hallId = hallsResponse[i].id;
                hallOpen = hallsResponse[i]["hall_open"];
                setId(id = hallId);
                setOpen(open = hallOpen);
                if(hallOpen === 0){
                    let newOpenInfo = {
                        text:"Всё готово к открытию", 
                        btn:"Открыть продажу билетов",
                    }
                    setOpenInfo(openInfo = newOpenInfo);
                } else {
                    let newOpenInfo = {
                        text:"Зал уже открыт", 
                        btn:"Закрыть продажу билетов",
                    }
                    setOpenInfo(openInfo = newOpenInfo);
                }
            }
        }
    }

    function openedSave(e){
        e.preventDefault();
        const params = new FormData();

        if(open === 0){
            let newOpenInfo = {
                text:"Зал уже открыт", 
                btn:"Закрыть продажу билетов",
            }
            setOpenInfo(openInfo = newOpenInfo);
            params.set("hallOpen", "1")
        } else {
            let newOpenInfo = {
                text:"Всё готово к открытию", 
                btn:"Открыть продажу билетов",
            }
            setOpenInfo(openInfo = newOpenInfo);
            params.set("hallOpen", "0")
        };

        fetch( `https://shfe-diplom.neto-server.ru/open/${id}`, {
            method: 'POST',
            body: params 
        })
            .then( response => response.json())
            .then( data => {
                console.log( data );
                loadHalls();
            });
    }

    return (
        <>
            <section className = "admin__section">
                <div className = "section__header">
                    <p className = "section__header__name">Открыть продажи</p>
                    <button className = "section__header__arrow" onClick={hideSection}>
                        <img className = "section__header__arrow__img" src="../public/section__header__arrow.png"/>
                    </button>
                </div>
                <div className = "hall__opened__body active" id = "hall__opened__body">
                    <p className="opened__instruction">Выберите зал для открытия/закрытия продаж:</p>
                    <div className = "hall__config__container">
                        {halls}
                    </div> 
                    <div className = "open__sales">
                        <p className = "text__open__sales">
                           {openInfo.text} 
                        </p>
                        <button className = "btn__open__sales" onClick={openedSave}>{openInfo.btn}</button> 
                    </div>                                
                </div>
            </section>
        </>
    );
}


export default HallOpened;
