import React, { Component } from 'react'
import styles from './FileDir.module.css'

class File extends Component {
    // This is a callback function that returns the filename to the parent
    onButtonPress = () => {
            this.props.onPress(this.props.name)
    }

    render() {
        const { active, name } = this.props 

        return( 
            <div className={styles.innerContainer} style={active ? {color: 'white', fontSize: '19px'} : {}} onClick={this.onButtonPress.bind(this)}>
                {name}
            </div>
        )  
    }
}


class FileDir extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: false,
            files: [],
            currentFileOpen: undefined
        }

        this.addNewFile = this.addNewFile.bind(this)
    }

    componentDidMount() {
        fetch('https://note-by-note.herokuapp.com/ls')
            .then(res => res.json())
            .then((result) => {
                    this.setState({
                        isLoaded: true,
                        files: result.filenames,
                    })

            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            })
    }

    fileList = () => {return this.state.files.length !== 0 ? this.state.files.map((file) => 
        <File 
            name={file} 
            onPress={this.changeFileState.bind(this)} 
            active={file === this.state.currentFileOpen ? true : false}
            key={file}
        />
    ) : <div className={styles.sadMessage}>No files :(</div>}

    changeFileState(message) {
        this.setState({
            currentFileOpen: message
        })
        this.props.callbackCurrentFile(message)
    }

    addNewFile() {
        const filename = window.prompt("What is the file name:")
        if (filename === null) {
            return;
        }
        fetch("https://note-by-note.herokuapp.com/file/" + filename, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                content: "Hey you made a new file!"
            })
        })
        .then(response => {
            this.setState(prevState => ({
                files: [...prevState.files, filename]
            }))
        })
    }


    render() {
        return (
            <div className={styles.outerContainer}>
                <div className={styles.fileHeader}>FILES</div>
                {this.state.isLoaded ? 
                <div className={styles.outerFileList}>
                    {this.fileList()}
                </div> : null }
                <div className={styles.buttonContainer} onClick={this.addNewFile}>
                    New File
                </div>
            </div>
        )
    }
}

export default FileDir