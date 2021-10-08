import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://192.168.1.36:5000')

const MessageList = () => {

    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')


    useEffect(()=>{
        //run when websocket is connected
        socket.on('connect', ()=>{
            setMessages([...messages, `connected with id: ${socket.id}`])
            //get form historic messages from database
        })
    })

    const saveInput = (e) => {
        setInput(e.target.value)
        //you press enter in the input field
        if(e.code === 'Enter'){
            submit()
        }
    }

    const submit = () => {
        if (!input)return

        socket.emit('message', input)

        //save message locally and clear input field
        setMessages([...messages, input])
        const inputField = document.querySelector('.input')
        inputField.value=""
        setInput("")
    }

    
    //make the message list
    const messageItem = messages.map(i => {
        return(
            <div className="message">
                <p>{i}</p>
            </div>
        )
    })

    socket.on('recieve-message', (message) => {
        setMessages([...messages, message])
    })

    return (
        <div className="messageList">
            <div className="wrap">
                {messageItem}
            </div>
            
            <input className="input" type="text" onKeyUp={saveInput} />
            <button type="button" onClick={submit} >Send</button>
        </div>
    )
}

export default MessageList
