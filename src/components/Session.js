import React, { Component, useState } from 'react'
import styles from './Session.module.css'
import { socket } from '../App'
import {
	CircularInput,
	CircularTrack,
	CircularProgress,
	CircularThumb,
} from 'react-circular-input'
import { Spring } from 'react-spring/renderprops'

const getTimeString = (seconds) => {
    const date = new Date(null);
    date.setSeconds(seconds); 
    return date.toISOString().substr(11, 8);
}

function CircularSelector(props) {
        const [value, setValue] = useState(0.25)

        function changeValue(value) {
            setValue(value + 1 > 1 ? value : value + 1)
            props.callbackSetTime(value)
        }

        return (
            <Spring to={{ value}}>
                {props => (
                    <CircularInput 
                        value={props.value} 
                        onChange={changeValue}
                        radius={130}
                    >
                        <CircularTrack strokeWidth={40} />
                        <CircularProgress strokeWidth={40} stroke="#00adb5" />
                        <CircularThumb r={25}  fill="#435055"/>
                    </CircularInput>
                )}  
            </Spring>
        )
}


class ActiveSession extends Component {
    constructor() {
        super();
        this.sessionEnd = this.sessionEnd.bind(this)
        this.sessionBreak = this.sessionBreak.bind(this)
    }

    sessionEnd() {
        socket.emit('end_session')
        this.props.callbackSessionEnd()
    }

    sessionBreak() {
        socket.emit('break', {duration: 10})
        this.props.callbackSessionBreak(10)
    }
    render() {
        return (
            <div className={styles.outerContainer}>  
                <div className={styles.header}>Active Session</div>
                <div className={styles.selector}>
                <CircularInput 
                    value={this.props.timeLeft / this.props.sessionTime } 
                    radius={130}
                >
                    <CircularTrack strokeWidth={40} />
                    <CircularProgress strokeWidth={40} stroke="#00adb5" strokeLinecap="butt"/>
                </CircularInput>
                </div>
                <div className={styles.timer}>{getTimeString(this.props.timeLeft)}</div>
                <div>
                    <div className={styles.button} onClick={this.sessionEnd}>Session end</div>
                    <div className={styles.button} onClick={this.sessionBreak}>5min break</div>
                </div>
                <div>{this.props.activity}</div>
            </div>
        )
    }
}

class NoActiveSession extends Component {
    constructor() {
        super();
        this.state = {
            setTime: 0.25
        }

        this.callbackSetTime = this.callbackSetTime.bind(this)
        this.startSession = this.startSession.bind(this)
    }

    callbackSetTime = (value) => {
        this.setState({
            setTime: value
        })
    }

    startSession() {
        socket.emit('start_session', {duration: this.state.setTime * 60 * 60})
        this.props.callbackSessionState(this.state.setTime * 60 * 60 * 2)
    }

    render() {
        return (
            <div className={styles.outerContainer}>
                <div className={styles.header}>Create Session</div>
                <div className={styles.selector}>
                    <CircularSelector callbackSetTime={this.callbackSetTime} />
                </div>
                <div className={styles.timer}>{getTimeString(this.state.setTime * 60 * 60 * 2)}</div>
                <div className={styles.button} onClick={this.startSession}>Start</div>
            </div>
            
        )
    }
    
}

class Session extends Component {
    constructor() {
        super();
        this.state = {
            activeSession: false,
            activeBreak: false,
            sessionTime: 0,
            setTime: 0,
            activity: 'low',
            timeLeft: 0,
            breakTime: 0
        }

        this.callbackSessionState = this.callbackSessionState.bind(this)
        this.countDown = this.countdown.bind(this)   
        this.callbackSessionEnd = this.callbackSessionEnd.bind(this) 
        this.callbackSessionBreak = this.callbackSessionBreak.bind(this)
    }

    componentDidMount() {
        socket.on('end_session', () => this.callbackSessionEnd())
        socket.on('activity', (result) => {
            console.log(result)
            this.setState({activity: result})})
        socket.on('break', (value) => this.stopTimer() )
    }

    callbackSessionBreak = (time) => {
        this.setState({
            breakTime: time,
            activeBreak: true
        })
        clearInterval(this.timer)
        this.breakTimer = setInterval(this.breakCountdown, 1000)
    }

    callbackSessionEnd = () => {
        this.setState({
            activeSession: false,
            timeLeft: 0
        })
        // End the countdown
        clearInterval(this.timer)
    }

    callbackSessionState = (time) => {
        this.setState({
            activeSession: !this.state.activeSession,
            timeLeft: time,
            sessionTime: time
        })
        this.timer = setInterval(this.countdown, 1000)
    }
    
    countdown = () => {
        if (this.state.timeLeft <= 0) {
            this.setState({timeLeft: 0})
            clearInterval(this.timer)
            this.callbackSessionEnd()
        } else {
            this.setState({timeLeft: this.state.timeLeft - 1})
        }
    }

    breakCountdown = () => {
        if (this.state.breakTime <= 0) {
            this.setState({breakTime: 0})
            clearInterval(this.breakTimer)
            this.timer = setInterval(this.countdown, 1000)
        } else {
            this.setState({breakTime: this.state.breakTime - 1})
        }    
    }
    
    render() {
        const { activeSession } = this.state

        return (
            <div className={styles.outerContainer}>
                {activeSession ?    
                <ActiveSession 
                    break={this.state.break}
                    activity={this.state.activity}
                    timeLeft={this.state.timeLeft} 
                    sessionTime={this.state.sessionTime}
                    callbackSessionEnd={this.callbackSessionEnd} 
                    callbackSessionBreak={this.callbackSessionBreak}
                />
                : 
                <NoActiveSession 
                    callbackSessionState={this.callbackSessionState}
                />
                }
            </div>
        )
    }
}

export default Session;