import "../App.jsx";
import "../App.css";
import { useState } from "react";

export const IntoLent = (data) => {
    let item = data;
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

        let oneHall = oneHallSession.map(item => (
            <div className="into__lent__container">
                <p className="into__lent__name"></p>
                    {item.name}
                <p className="into__lent__time">{item["seance_time"]}</p>
            </div>
        ));
        return oneHall;
    }

    return (
        <>
            {intoLent (item) }
        </>
    )
}

export default IntoLent;
