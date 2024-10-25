import React, { useState } from 'react';
import styles from "./page.module.css";
const ExpiryDateInputComponent = () => {
    const [expiryDate, setExpiryDate] = useState('');

    const formatExpiryDate = (value) => {
        // Remove all non-digit characters
        const cleanValue = value.replace(/\D+/g, '');

        // Format the cleaned value
        const formattedValue = cleanValue.replace(
            /^(\d{2})(\d{0,2}).*/,
            (_, p1, p2) => [p1, p2].filter(Boolean).join('/')
        );

        setExpiryDate(formattedValue);
    };

    const handleChange = (e) => {
        formatExpiryDate(e.target.value);
    };

    return (
        <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date*</label>
            <input
                id="expiryDate"
                name="expiryDate"
                type="text"
                placeholder='MM/YY'
                inputMode='numeric'
                className={`form-control ${styles.formControl}`}
                required
                maxLength={5} minLength={5}
                aria-label="Expiry Date"
                value={expiryDate}
                onChange={handleChange}
            />
        </div>
    );
};

export default ExpiryDateInputComponent;
