import React, { useState, useEffect } from "react"

import LandingPageImage from "../assets/landingPageImage.jpg"
import DataInputs from "../components/DataInputs"

import "../styles.css"

const LandingPage = () => {
    const [contentLoaded, setContentLoaded] = useState(false)

    //Timer function which waits 0.4s so that fonts from Google and the landing page image has loaded
    useEffect(() => {

        const timer = setTimeout(() => {
            setContentLoaded(true)
        }, 400)

        return () => clearTimeout(timer)
    }, [])


    return (
        <div className={contentLoaded ? 'pageContainer show' : 'pageContainer'}>
            <h1 className="header kavoon-font">CSV Editor</h1>

            <div className="landingPageContent">
                <div className="textSection">
                    <h2 className="landingPageText kavoon-font">Effortlessly edit CSV files by adding or removing data, while also visualizing your data with various chart options.
                    </h2>

                <DataInputs />
                </div>
                <img
                    className="landingPageImage"
                    src={LandingPageImage}
                    alt="Landing page image"
                />
            </div>
        </div>
    );
}

export default LandingPage;