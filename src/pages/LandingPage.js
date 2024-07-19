import React, { useState, useEffect } from "react"

import LandingPageImage from "../assets/landingPageImage.png"
import DataInputs from "../components/DataInputs"

import "../styles.css"
import Logo from "../components/Logo"

const LandingPage = () => {
    const [contentLoaded, setContentLoaded] = useState(false)

    //Timer function which waits 0.4s so that fonts from Google and the landing page image have loaded
    useEffect(() => {

        const timer = setTimeout(() => {
            setContentLoaded(true)
        }, 400)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className={contentLoaded ? 'page-container show' : 'page-container'}>
            <Logo />
            <div className="container my-5 position-relative">
                <div className="row g-0">
                    <div className="col-6 d-flex justify-content-end">
                        <img
                            className="landing-page-image"
                            src={LandingPageImage}
                            alt="Landing page image"
                        />
                    </div>
                    <div className="col-6">
                        <div className="landing-page-text-container px-4">
                            <p className="jakarta-font landing-page-big-text">Effortlessly edit CSV files by adding or removing data.</p>
                            <p className="landing-page-small-text">Import your CSV file and start editing instantly.</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 d-flex justify-content-end p-0">
                        <DataInputs />
                    </div>
                </div>
               
            </div>
        </div>
    );
}

export default LandingPage;