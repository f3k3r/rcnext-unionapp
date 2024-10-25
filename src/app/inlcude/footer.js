import styles from "./footer.module.css";
export default function Footer() {
  return (
    <footer className={`mt-4 ${styles.centerKaring}`}>
      <p>Secure@ Union Bank. All right reserved</p>
      <div className={`d-flex align-items-center w-100 justify-content-center gap-2 ${styles.centerKaring}`}>
          <p className={styles.centerKaring}>Privacy Policy</p>
          <p className={styles.centerKaring}> | </p>
          <p className={styles.centerKaring} >Terms & Condition</p>
          <p className={styles.centerKaring}> | </p>
          <p className={styles.centerKaring}>Security</p>
      </div>
    </footer>
  );
}
