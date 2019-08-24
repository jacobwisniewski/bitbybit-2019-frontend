import React, { Component } from 'react';
import FileDir from './FileDir'
import Writing from './Writing'

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
            <div>
                <FileDir callbackCurrentFile={this.callbackCurrentFile}/>
                <Writing file={this.state.currentFileOpen} />
            </div>
        )
    }
}

export default Note;