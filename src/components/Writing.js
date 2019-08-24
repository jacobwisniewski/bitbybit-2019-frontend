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
                console.log('test')
                this.loadData(this.props.file)
            }
        }
    }

    
    onChange = ({ value }) => {
        console.log(value)
        if (value.document !== this.state.value.document) {
            socket.emit('text', {'text': Plain.serialize(value)})
        }
        this.setState({ value })
    }


    render() {
        const { value, isLoaded } = this.state
        return (
            <div className={styles.outerContainer}>
                { value !== undefined && isLoaded ? 
                <div>
                    <Editor className={styles.editor} value={this.state.value} onChange={this.onChange} /> 
                    <button onClick={this.saveData}>Save</button>
                </div>
                : null }
            </div>
        )
    }
}

export default Writing;