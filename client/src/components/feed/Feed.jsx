import { useContext, useEffect, useState } from "react"
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"

export default function Feed({username}) {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext)

  useEffect(() => {
    const fetchPosts = async () => {
      console.log("posts=>  ",posts);
      const res = username
      ? await axios.get("http://localhost:8800/api/posts/profile/" + username)
      : await axios.get("http://localhost:8800/api/posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
   
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}

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