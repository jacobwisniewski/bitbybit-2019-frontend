import React, { Component } from 'react'
import styles from "./Header.module.css"

class Header extends Component {

    render() {
        return (
            <div className={styles.outerContainer}>
                <div className={styles.header}>
                    Note-by-Note
                </div>
            </div>
        )
    }
    
}

export default Header;