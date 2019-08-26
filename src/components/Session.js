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
        const [value, setValue] = useState(0.05)

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

        this.state = {
            isLoaded: false,
            graphData: undefined
        }
    }

    componentDidMount() {
        this.getGraphData()
        this.graphLoop = setInterval(this.getGraphData, 10 * 1000)
    }

    componentWillUnmount() {
        clearInterval(this.graphLoop)
    }

    getGraphData = () => {
        fetch("http://note-by-note.herokuapp.com/activity")
        .then(res => res.json())
        .then(result => {
            this.setState({
                isLoaded: true,
                graphData: result.data
            })
        })
    }

    sessionEnd() {
        socket.emit('end_session')
        this.props.callbackSessionEnd()
    }

    sessionBreak() {
        if (!this.props.break) {
            socket.emit('break', {duration: 60})
            this.props.callbackSessionBreak(60)
            
        }
     
    }


    render() {
        const { activity } = this.props
        return (
            <div className={styles.outerContainer}>  
                <div className={styles.header}>Active Session</div>
                <div className={styles.selector}>
                    <Spring from={{value: 1}} to={{value: 0}} config={{duration: this.props.timeLeft * 1000}} key={this.props.sessionTime}>
                        { props => (
                            <CircularInput 
                                value={props.value} 
                                radius={130}
                            >
                                <CircularTrack strokeWidth={40} />
                                <CircularProgress strokeWidth={40} stroke="#00adb5" strokeLinecap="butt"/>
                            </CircularInput>
                        )}
                    </Spring>
                
                </div>
                <div className={styles.timer}>{getTimeString(this.props.timeLeft)}</div>
                <div className={styles.buttContainer}>
                    <div className={styles.smallButton} onClick={this.sessionEnd}>Session end</div>
                    <div className={styles.smallButton} onClick={this.sessionBreak}>1  min break</div>
                </div>
                <div className={styles.activity} style={{color: activity === 'none' ? 'red' : activity === 'low' ? 'orange' : activity === 'medium' ? '#E9E43E' : 'green' }}>Your activity: {this.props.activity}</div>
                {this.props.activity === "none" ? <div className={styles.activity}>Get back to work!</div> : null}
                {this.state.isLoaded ? <img className={styles.graph} src={`data:image/jpeg;base64,${this.state.graphData}`}/> : null}
            </div>
        )
    }
}

class NoActiveSession extends Component {
    constructor() {
        super();
        this.state = {
            setTime: 0.05
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
        socket.emit('start_session', {duration: this.state.setTime * 60 * 60 * 2})
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
            breakTime: 0,
            breakLength: 0,
        }

        this.callbackSessionState = this.callbackSessionState.bind(this)
        this.countDown = this.countdown.bind(this)   
        this.breakCountdown = this.breakCountdown.bind(this)
        this.callbackSessionEnd = this.callbackSessionEnd.bind(this) 
        this.callbackSessionBreak = this.callbackSessionBreak.bind(this)
    }

    componentDidMount() {
        socket.on('activity', (result) => {this.setState({activity: result})})
        socket.on('break', (value) => this.callbackSessionBreak(value.duration))
        socket.on('end_session', () => this.callbackSessionEnd())
    }

    callbackSessionBreak = (time) => {
        console.log('sessionbreak')
        this.setState({
            breakTime: time,
            activeBreak: true,
            breakLength: time,
            reset: true
        })
        clearInterval(this.timer)
        this.breakTimer = setInterval(this.breakCountdown, 1000)
    }

    callbackSessionEnd = () => {
        console.log('endsession')
        this.setState({
            activeSession: false,
            activeBreak: false,
            sessionTime: 0,
            setTime: 0,
            activity: 'low',
            timeLeft: 0,
            breakTime: 0,
            breakLength: 0,
        })
        // End the countdown
        clearInterval(this.breakTimer)
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
            this.setState({breakTime: 0, activeBreak: false, sessionTime: this.state.timeLeft})
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
                    break={this.state.activeBreak}
                    activity={this.state.activity}
                    timeLeft={this.state.activeBreak ? this.state.breakTime : this.state.timeLeft} 
                    sessionTime={this.state.activeBreak ? this.state.breakLength : this.state.sessionTime}
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