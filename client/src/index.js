import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {AuthContextProvider} from "../src/context/AuthContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <AuthContextProvider>
            <App />
      </AuthContextProvider>

);

// I went on to implement logout and follow the steps to do so,
// 1. open Topbar.js 
// 2. import { AuthContext } from "../../context/AuthContext"; 
// 3.const { user,dispatch } = useContext(AuthContext);
// 4. after the topbarImg paste this <span className="topbarLink" onClick={handleClick}>Sign out</span>
// 5. Make a function called 
// const handleClick = () => {
//       logoutCall(
//         dispatch
//       );
//     }




// 6. import {logoutCall} from '../../apiCalls'
// 7. Open up apiCalls and paste the following
// export const logoutCall = async (dispatch) => {
//   dispatch({ type: "LOGOUT" });
// };



// 8. Go to AuthActions and paste
// export const Logout=()=>({
//     type:"LOGOUT",
// })



// 9. Go to AuthReducer and paste 
// case "LOGOUT":
//             return {
//                 user:localStorage.setItem("user", null),
//                 isFetching:false,
//                 error:false
//             };




// and That's it when you will press the signout button we will set the user to null and we will be redirected to login page

// Follow me for react native tuts enjoy 👍