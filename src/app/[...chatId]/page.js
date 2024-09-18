'use client'

import { useState } from "react";
import { ChatSidebar } from "../../../components/chatSidebar";

export default function ChatPage() {
  const [messageText, setMessageText] = useState("");
  const [responseMessage, setResponseMessage] = useState([]);
  //////////////////////////////////////////////////////////////////////////////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch(`/api/chat`, {
      method: "POST",
      headers: {
        'content-type': "application/json"
      },
      body: JSON.stringify({message: messageText})
    });

    if(!response.ok){
      throw new Error('Error')
    }
    const result = await response.json();
    setResponseMessage([...responseMessage, result.text])
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>

      <div className="grid h-screen grid-cols-[260px_1fr]">
      <ChatSidebar></ChatSidebar>

        <div className="bg-gray-700 flex flex-col ">

          <div className="flex-1 text-white">{responseMessage.map((msg, i) => <p key={i}>{msg}</p>)}</div>

          <p>{messageText}</p>

          <footer className="bg-gray-800 p-10">
            <form onSubmit={handleSubmit}>
              <fieldset className="flex gap-2">
                <textarea 
                placeholder="Say hi..." 
                className="globalFocusInput"
                value = {messageText}
                onChange={(e) => setMessageText(e.target.value)}
                ></textarea>
                <button type="submit" className="globalBtn">Send</button>
              </fieldset>
            </form>
          </footer>

        </div>

      </div>

    </>
  )
}