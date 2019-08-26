import React, { Component } from 'react'
import Note from './components/Note'
import Session from './components/Session'
import io from 'socket.io-client'
import styles from './App.module.css'
import Header from './components/Header'

export const socket = io('http://bitbybit-2019.herokuapp.com')

class App extends Component {
    render() {
        return (
            <div className={styles.outerContainer}>
                <Header/>
                <div className={styles.noteContainer}>
                    <Note/>
                    <Session/>
                </div>
            </div>
        )
    }
}

export default App