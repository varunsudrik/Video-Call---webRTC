import React, { useState,useCallback } from 'react'
import { useEffect } from 'react'
import { Navigate } from "react-router-dom";

import {useSocket} from '../context/SocketProvider'

function Lobby() {
    const [email, setEmail] =useState('')
    const [room, setRoom] =useState('')
    const socket = useSocket()

    const handleSubmitForm = useCallback(
        (e) => {
          e.preventDefault();
          console.log(email, room)
          socket.emit("room:join", { email, room });
        },
        [email, room, socket]
      );

      const handleJoinRoom = useCallback(
        (data) => {
          const { email, room } = data;
          Navigate(`/room/${room}`);
        },
        [Navigate]
      );
    
      useEffect(() => {
        socket.on("room:join", handleJoinRoom);
        return () => {
          socket.off("room:join", handleJoinRoom);
        };
      }, [socket, handleJoinRoom]);
        
  return (
    <div>
        <>Lobby</>
        <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email ID</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room Number</label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button>Join</button>
      </form>

        </div>
  )
}

export default Lobby