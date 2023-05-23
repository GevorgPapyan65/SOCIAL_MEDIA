import { Chat, Close, Notifications, Person, Search } from "@mui/icons-material"
import "./topbar.css"
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {logoutCall} from '../../apiCalls'
import { Dispatch } from "react";
import axios from "axios";
import Section from "./Section";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  const {dispatch } = useContext(AuthContext);
  const handleClick = () => {
      logoutCall(
        dispatch
      );
    }

    const [searchQuery, setSearchQuery] = useState("");
    const [usersarr,setUsersarr] = useState([]);

    const handleSearch = async (toSearch) => {
      try {
        console.log("hayvannnn",toSearch);
        const response = await axios.get(`http://localhost:8800/api/users/search?q=${toSearch}`);
        const users = response.data;
        console.log(users)
        // Handle the search results (e.g., update state, display results)
        return users;
      } catch (error) {
        console.error(error);
      }
    };
useEffect(()=>{<Section search={usersarr}/>},[usersarr]);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SocialMedia</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" onClick={handleSearch} />
          <input
            placeholder="Search for friend, post or video"
            className={`searchInput ${searchQuery ? 'newClassName' : ''}`}
            value={searchQuery}
            onChange={async (e) => {
              let update_val = e.target.value
              console.log("eshhhhhhhhhhh",e.target.value);
              setSearchQuery("");
              setSearchQuery(update_val);
              let arr = await handleSearch(update_val);
              setUsersarr(arr);
              // Create a new classname dynamically
              const newClassName = e.target.value ? 'customClassName' : '';
              // Use the new classname in your logic or store it in state, etc.
              console.log(newClassName);
              // Set the display property for .searchContainerUsers
              const searchContainer = document.querySelector('.searchContainerUsers');
              if (searchContainer) {
                searchContainer.style.display = e.target.value ? 'block' : 'none';
              }
            }}
          />
            <div className="searchContainerUsers">
              <Section search={usersarr}/>
            </div>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink"><Link style={{color: "white", textDecoration:"none"}} to="/">Homepage</Link></span>
          <span className="topbarLink"></span>

        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
          <Link to="/messenger"><Chat className="chatMessage"/></Link>
            {/* <span className="topbarIconBadge">2</span> */}
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <span className="topbarLink" onClick={handleClick}>Sign out
        
        </span>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}