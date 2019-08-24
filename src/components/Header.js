import io from 'socket.io-client'
import React, { Component } from 'react'

var socket;
class Header extends Component {

    socket = io("http://localhost:3001")

    render() {
        return (
            <div>
                
            </div>
        )
    }
    
}

export { Header, socket };