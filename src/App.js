import React, { Component } from 'react'
import Note from './components/Note'
import io from 'socket.io-client'

export const socket = io('https://bitbybit-2019.herokuapp.com')

// export const definedStyles = {
//     textColour: 'white',
//     background: 'hsl(0, 0%, 7%)',
// }

class App extends Component {
    componentDidMount() {
            socket.emit('text', {text: 'This is a text message'}, (data) => console.log(data))
            socket.on('activity', (data) => console.log(data))
    }

    render() {
        return (
            <div>
                <Note/>
                <button></button>
            </div>
        )
    }
}

export default App