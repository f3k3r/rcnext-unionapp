import styles from "./page.module.css"

export default function Loader() {
  return (
    <div id="overlay" className={styles.flexContainer} >
    <div className="spinner-border spinner-lg text-primary"  style={{width: "3rem", height: "3rem"}} role="status">
        <span className="sr-only"></span>
    </div>
    <div className={`${styles.Loader} ${styles.textCenter} mt-2 ${styles.textPrimary}`}>Please wait...</div>
</div>

  );
}
