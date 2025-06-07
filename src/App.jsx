import './App.css';
// import { SportForm } from "./components/SportForm.jsx";
// import { SportForm } from "./components/SportRender.jsx";
import { Client } from "./ClientComponents/Client.jsx";
// import { responseLogIn } from "./ClientComponents/Logout.jsx";
// import { Admin } from "./AdminComponents/Admin.jsx";
import { useState } from "react";

function App() {

  // let [admin, setAdmin] = useState(<Client />);
  
  // function adminTrue(responseLogIn){
  //     if(responseLogIn){
  //       setAdmin(admin = <Admin />);
  //     }
  // }

  // setInterval(function adminTrue(responseLogIn){
  //     if(responseLogIn){
  //       setAdmin(admin = <Admin />);
  //     }
  // }, 1000)

  return (
    <div className="clien__body">
        <Client />
        {/* {admin} */}
    </div>
  );

}


export default App;