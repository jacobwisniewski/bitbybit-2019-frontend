import React, { Component } from 'react';
import FileDir from './FileDir'
import Writing from './Writing'
import styles from './Note.module.css'

class Note extends Component {
    constructor() {
        super();
        this.state = {
            currentFileOpen: undefined
        }
        this.callbackCurrentFile = this.callbackCurrentFile.bind(this)
    }

    callbackCurrentFile = (file) => {
        this.setState({
            currentFileOpen: file
        })
    }

    render() {
        return (
            <div className={styles.outerContainer}>
                <FileDir callbackCurrentFile={this.callbackCurrentFile}/>
                <Writing file={this.state.currentFileOpen} />
            </div>
        )
    }
}

export default Note;