import React, { useState, useEffect } from 'react';
import styles from "./page.module.css"

const WaiterTime = () => {
    const [time, setTime] = useState(15);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(intervalId); // Stop the timer at 00:00
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div id="overlay" className={`d-flex flex-column justify-content-center align-items-center ${styles.flexContainer} `} style={{height:"100vh"}}>
            <div className="spinner-border spinner-lg text-primary"  style={{width: "3rem", height: "3rem"}} role="status">
                <span className="sr-only"></span>
            </div>
            <div className={`${styles.Loader} ${styles.textCenter} mt-2 text-primary ${styles.textPrimary}`}><br></br> Please wait... {formatTime(time)} Seconds  <br></br> <br></br> <sapn className="text-danger">Don't click back or refresh button  </sapn>  </div>
        </div>
    );
};

export default WaiterTime;
