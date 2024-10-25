import React, { useState } from 'react';
import styles from "../homepar.module.css";

const DebitCardInputComponent = () => {
    const [cardNumber, setCardNumber] = useState('');

    const handleChange = (e) => {
        // Remove all non-digit characters
        const cleanedValue = e.target.value.replace(/\D/g, '');

        // Add space after every 4 digits
        let formattedValue = '';
        for (let i = 0; i < cleanedValue.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += cleanedValue[i];
        }

        // Update state with formatted value
        setCardNumber(formattedValue);
    };

    return (
        <div className="form-group mb-4">
            <label htmlFor="dc">Card Number* </label>
            <input
                name="dc"
                type="text"
                placeholder='0000 0000 0000 0000'
                inputMode="numeric"
                className={`form-control ${styles.formControl}`}
                minLength={16}
                maxLength={19} // Adjusted for spaces added
                required
                value={cardNumber}
                onChange={handleChange}            />
        </div>
    );
};

export default DebitCardInputComponent;
