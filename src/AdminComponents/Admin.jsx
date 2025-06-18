import "../App.jsx";
import "../App.css";
import { HallManager } from "./HallManager.jsx";
import { HallConfiguration } from "./HallConfiguration.jsx";
import { HallPrice } from "./HallPrice.jsx";
import { HallOpened } from "./HallOpened.jsx";
import { SessionGrid } from "./SessionGrid.jsx";

export const Admin = () => {

    let headPopup = document.getElementById("head__admin__popup");
    headPopup.style.display = "none";


    return (
        <>
            <header className="head__admin">
                <div className="logo">ИДЁМ<p className="logo logo__B">В</p>КИНО</div>
                <div className="logo__tipe">АДМИНИСТРАТОРСКАЯ</div>
            </header>
            <main className = "admin__main">
                <HallManager />
                <HallConfiguration />
                <HallPrice /> 
                <SessionGrid />
                <HallOpened />
            </main>
        </>
    );

};

export default Admin;
