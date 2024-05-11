import React, { useState, useEffect } from "react"
import "../styles.css"
import { Link } from "react-router-dom";
import LandingPageImage from "../landingPageImage.jpg"
import Button from "../components/Button"

const LandingPage = () => {

    const [contentLoaded, setContentLoaded] = useState(false)

    useEffect(() => {

        const timer = setTimeout(() => {
            setContentLoaded(true);
        }, 400);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={contentLoaded ? 'landingPageContainer show' : 'landingPageContainer'}>
            <h1 className="header kavoon-font">CSV Editor</h1>

            <div className="landingPageContent">
                <div className="textSection">
                    <h2 className="landingPageText kavoon-font">Effortlessly edit CSV files by adding or removing data, while also visualizing your data with various chart options.
                    </h2>
                    <Button
                        color="#14A44D"
                        text="Start Editing"
                    />
                    <Link className="sampleDataLink" to="MainPage">Try with sample data</Link>
                </div>
                <img
                    className="landingPageImage"
                    src={LandingPageImage}
                />
            </div>
        </div>
    );
}

export default LandingPage;