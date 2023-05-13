import "./chatOnline.css";

export default function ChatOnline() {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
            <img className="chatOnlineImg" src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" alt="" />
            <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Vazgen</span>
      </div>
    </div>
  )
}
