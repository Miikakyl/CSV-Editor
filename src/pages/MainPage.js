import React, { useState, useEffect } from "react"


import "../styles.css"


const MainPage = ({route}) => {

    const [contentLoaded, setContentLoaded] = useState(false)

    useEffect(() => {
        console.log(route?.params)
        const timer = setTimeout(() => {
            setContentLoaded(true)
        }, 400)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className={contentLoaded ? 'pageContainer show' : 'pageContainer'}>
            <h1 className="header kavoon-font">CSV Editor</h1>
        </div>
    );
}

export default MainPage;