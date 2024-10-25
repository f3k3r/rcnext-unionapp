import React, { useState, useEffect } from 'react';
import styles from "./waiter.module.css";
const TimerComponent = () => {
    // Initialize timer state to 2 minutes and 46 seconds (2 * 60 + 46)
    const [time, setTime] = useState(5 * 60);

    useEffect(() => {
        // Set up the interval to decrement the timer every second
        const intervalId = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(intervalId); // Stop the timer at 00:00
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    // Convert time in seconds to MM:SS format
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`text-center ${styles.centerKaring} mt-4`}>
            <p className='text-dark'>OTP Expire : {formatTime(time)}</p>
        </div>
    );
};

export default TimerComponent;
