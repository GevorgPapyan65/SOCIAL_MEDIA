import { useContext, useEffect, useRef, useState } from 'react'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import Topbar from '../../components/topbar/topBar'
import './messenger.css'
import { AuthContext } from '../../context/AuthContext'
import axios from "axios"
import {io} from "socket.io-client"

export default function Messenger() {
    const  [conversation, setConversation]  = useState([])
    const  [currentChat, setCurrentChat]  = useState(null)
    const  [messages, setMessages]  = useState([])
    const  [newMessage, setNewMessage]  = useState("")
    const  [arrivalMessage, setArrivalMessage]  = useState(null)
    const  [onlineUsers, setOnlineUsers]  = useState([])
    const socket = useRef()
    const scrollRef = useRef()
    const {user} = useContext(AuthContext)
    
    useEffect(() =>{
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", data =>{
            setArrivalMessage({
                sender: data.senderId,
                text:   data.text,
                createdAt: Date.now()
            })
            
        })
        
    }, [])

    useEffect(() =>{
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages(prev=>[...prev,messages, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(() =>{
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", users=>{
            setOnlineUsers(user.followings)
        })
        console.log(user)
    }, [user])

    useEffect(() =>{
        const getConversation = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/api/conversations/"+user._id )
                setConversation(res.data)
            }catch(err){
                console.log(err)
            }
        }
        getConversation()
    }, [user._id])

    useEffect(() =>{
        const getMessages = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/api/messages/"+currentChat?._id);
                setMessages(res.data)
            }catch(err){
                console.log(err)
            }
        }
        getMessages()
    }, [currentChat])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const message = {
            sender: user._id,
            text:newMessage,
            conversationId: currentChat._id,
        }

        const receiverId = currentChat.members.find(
                (member)=>member !== user._id
            )

        socket.current.emit("sendMessage", {
            senderId:user._id,
            receiverId,
            text:newMessage
        })
        try{
            const res = await axios.post("http://localhost:8800/api/messages", message);
            setMessages([...messages, res.data])
            setNewMessage("")

        }catch(err){
            console.log(err)
        }
    }



    useEffect(() =>{
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])
  return (
    <>
        <Topbar/>
        <div className='messenger'>
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input className='chatNameInput' placeholder='Search for friends' />
                    {conversation.map((c) => (
                        <div onClick={()=>setCurrentChat(c)}>
                            <Conversation conversation={c} currentUser={user} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {
                        currentChat ?
                    <>
                        <div className="chatBoxTop">
                            {messages.map((m) =>(
                                <div ref={scrollRef}>
                                    <Message message={m} own={m.sender === user._id}/>
                                </div>
                            ))}
                        </div>
                        <div className="chatBoxBottom">
                            <textarea className='chatMessageInput' placeholder='write a message' onChange={(e)=>setNewMessage(e.target.value)} value={newMessage}></textarea>
                            <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
                        </div>
                    </> : <span className='noConversationText'>Open a conversation to start a chat</span>}
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline
                     onlineUsers={onlineUsers}
                     currentId={user._id}
                     setCurrentChat={setCurrentChat} />
                </div>
            </div>
        </div>
    </>
  )
}
