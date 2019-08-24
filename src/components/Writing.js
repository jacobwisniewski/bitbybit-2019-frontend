import React, { Component } from 'react';
import { Editor } from 'slate-react'
import { Value } from 'slate'

class Writing extends Component {
    constructor() {
        super()
        this.state = {
            value: undefined
        }
    }

    loadData = fileID => {
        console.log(fileID)
        // Set up API 
        this.setState({
            value: Value.fromJSON({ 
                document: {
                    nodes: [
                    {
                        object: 'block',
                        type: 'paragraph',
                        nodes: [
                            {
                                object: 'text',
                                text: 'A line of text in a paragraph.' + fileID,
                            },
                        ],
                    }
                    ],
                 },
            })
        })
    }
    
    componentDidMount() {
        this.loadData(this.props.file)
    }

    componentDidUpdate(prevProps) {
        if (this.props.file !== prevProps.file) {
            this.loadData(this.props.file)
        }
    }
    
    onChange = ({ value }) => {
        this.setState({ value })
    }


    render() {
        return (
            <div>
                { this.state.value === undefined ? null : <Editor value={this.state.value} onChange={this.onChange} /> }
            </div>
        )
    }
}

export default Writing;