import "../App.jsx";
import "../App.css";
import { useState } from "react";

export const Sheme = (click) => {
    let grid = click.click;
    let startConfig = grid.config;
    let newRow = grid.row;
    let newPlaces = grid.places;
    let newConfig = [];    
    function changeConfig(){
        newConfig = [];
        let creatingRow = [];
        for(let i = 0; i < newPlaces; i++){
            creatingRow.push("standart");
        };
        for(let i = 0; i < newRow; i++){
            newConfig.push(creatingRow);
        };
    };

    changeConfig();
    let index = 0;
    function placeStatus(e) {
        let standart = document.getElementById("standart");
        let vip = document.getElementById("vip");
        let disabled = document.getElementById("disabled");
        let firstClass = e.target.className;
        let status = firstClass.slice(6);

        if(standart.checked){
            e.target.classList.remove(status);
            e.target.classList.toggle("standart");
        } else if (vip.checked){
            e.target.classList.remove(status);
            e.target.classList.toggle("vip");
        } else if (disabled.checked){
            e.target.classList.remove(status);
            e.target.classList.toggle("disabled");
        }
    }   
    function generatePlaces(arr){
        return arr.map(item => (
            <div className={`place ${item}`} key={counter ()} onClick={placeStatus}>
                
            </div> 
        ));
    }
    function counter (){
        return index ++;
    }
    return (
        <>
            {startConfig.map(item => (
                <div className = "row" key={counter()}>
                    {generatePlaces(Object.values(item))}
                </div>
            ))}
        </>
    )
}

export default Sheme;
