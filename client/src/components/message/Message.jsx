import './message.css'
import {format} from "timeago.js"

export default function Message({message, own}) {
  return (
    <div className={message.text === undefined ? "div_none" : "div_ok"}>
    <div className={own ? "message own" : "message"}>
        <div className="messagetop">
            <img className='messageImg' src="https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg" alt="" />
            <p className='messageText'>
              {message.text}
            </p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
    </div>
  )
}
