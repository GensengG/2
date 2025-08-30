import "../App.jsx";
import "../App.css";
import { useState, useEffect } from "react";
import { HallManager } from "./HallManager.jsx";
import { HallConfiguration } from "./HallConfiguration.jsx";
import { HallPrice } from "./HallPrice.jsx";
import { HallOpened } from "./HallOpened.jsx";
import { SessionGrid } from "./SessionGrid.jsx";

export const Admin = () => {

    let headPopup = document.getElementById("head__admin__popup");
    headPopup.style.display = "none";

    const [hallsData, setHallsData] = useState();
    const [filmsData, setFilmsData] = useState();
    const [seancesData, setSeancesData] = useState();
    
    function loadData(){
        fetch('https://shfe-diplom.neto-server.ru/alldata')
            .then(response => response.json())
            .then(data => {
                setHallsData(data.result.halls);
                setFilmsData(data.result.films);
                setSeancesData(data.result.seances);
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <header className="head__admin">
                <div className="logo">ИДЁМ<p className="logo logo__B">В</p>КИНО</div>
                <div className="logo__tipe">АДМИНИСТРАТОРСКАЯ</div>
            </header>
            <main className = "admin__main">
                {hallsData ? (
                    <HallManager hallsStart={hallsData} />
                    ) : (
                    <div className="load__container">Загрузка данных...</div>
                    )
                }
                {hallsData ? (
                    <HallConfiguration hallsStart={hallsData} />
                    ) : (
                    <div className="load__container">Загрузка данных...</div>
                    )
                }
                {hallsData ? (
                    <HallPrice hallsStart={hallsData} />
                    ) : (
                    <div className="load__container">Загрузка данных...</div>
                    )
                }
                {hallsData ? (
                    <SessionGrid hallsStart={hallsData} filmsStart = {filmsData} seancesStart = {seancesData}/>
                    ) : (
                    <div className="load__container">Загрузка данных...</div>
                    )
                }
                {hallsData ? (
                    <HallOpened hallsStart={hallsData} />
                    ) : (
                    <div className="load__container">Загрузка данных...</div>
                    )
                }
            </main>
        </>
    );
};

export default Admin;
