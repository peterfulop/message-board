'use client';
import styles from './error.module.css';

export default function Error() {
    return (
        <main className={styles['error-page']}>
            <h2>Something went wrong!</h2>
            <p>Try refreshing the page.</p>
        </main>
    );
}
