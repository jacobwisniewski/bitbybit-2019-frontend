import React, { Component } from 'react';
import { Editor } from 'slate-react';
import Plain from 'slate-plain-serializer'
import styles from './Writing.module.css'
import { socket } from '../App'


class Writing extends Component {
    constructor() {
        super()
        this.state = {
            isLoaded: false,
            value: undefined
        }
        
    }

    loadData = () => {
        fetch("https://note-by-note.herokuapp.com/file/" + this.props.file)
        .then(res => res.json())
        .then(result => {
            this.setState({
                isLoaded: true,
                value: Plain.deserialize(result.content)
            })
        },
        (error) => {
            this.setState({
                isLoaded: true,
                error
            })
        })
    }

    saveData = () => {
        fetch("https://note-by-note.herokuapp.com/file/" + this.props.file, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                content: Plain.serialize(this.state.value)
            })
        })
    }
    
    componentDidMount() {
        if (this.props.file !== undefined) {
            this.loadData(this.props.file)
        }
        this.messageEmit = setInterval(this.messageEmit, 1000)
    }

    messageEmit = () => {
        if (this.state.value !== undefined) {
            socket.emit('text', {'text': Plain.serialize(this.state.value)})
        }
    }

    componentWillUnmount() {
        clearInterval(this.messageEmit)
    }

    componentDidUpdate(prevProps) {
        if (this.props.file !== prevProps.file) {
            if (this.state.value !== undefined) {
                fetch("https://note-by-note.herokuapp.com/file/" + prevProps.file, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({
                        content: Plain.serialize(this.state.value)
                    })
                })
                this.loadData()
            } else {
                this.loadData(this.props.file)
            }
        }
    }

    
    onChange = ({ value }) => {
        socket.emit('text', {'text': Plain.serialize(value)})
        this.setState({ value })
    }


    render() {
        const { value, isLoaded } = this.state
        return (
            <div className={styles.outerContainer}>
                <div className={styles.button} onClick={this.saveData}>Save</div>
                { value !== undefined && isLoaded ? 
                <div>

                    <Editor 
                        className={styles.editor} 
                        value={this.state.value} 
                        onChange={this.onChange} 
                        autoFocus={true} 
                        spellCheck={true}
                        tabIndex={true}
                        autoCorrect={true}
                    /> 
                </div>
                : <div className={styles.helpfulMessage}>Try create a file or open an existing one!</div> }
            </div>
        )
    }
}

export default Writing;