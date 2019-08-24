import React, { Component } from 'react'
// import { definedStyles } from '../App.js'

const fileStyle = {
    // color: definedStyles.textColour
}

class File extends Component {
    // This is a callback function that returns the filename to the parent
    onButtonPress = () => {
            this.props.onPress(this.props.name)
    }

    render() {
        const { name } = this.props  

        return( 
            <li style={fileStyle} onClick={this.onButtonPress.bind(this)}>
                {name}
            </li>
        )  
    }
}

const outerFileDirStyle = {
    // backgroundColor: definedStyles.background,
    width: '300px',
    textColour: 'white'
}

class FileDir extends Component {
    constructor() {
        super();
        this.state = {
            files: [
                { name: 'File 1' },
                { name: 'File 2' },
                { name: 'File 3' }
            ],
            currentFileOpen: undefined
        }
    }

    fileList = () => this.state.files.map((file) => 
        <File 
            name={file.name} 
            onPress={this.changeFileState.bind(this)} 
            key={file.name}
        />
    )

    changeFileState(message) {
        this.setState({
            currentFileOpen: message
        })
        this.props.callbackCurrentFile(message)
    }

    componentDidMount() {
    }

    render() {
        return (
            <div style={outerFileDirStyle}>
                <div>File directory</div>
                <ul>
                    {this.fileList()}
                </ul>
            </div>
        )
    }
}

export default FileDir;