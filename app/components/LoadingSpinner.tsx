import styles from './LoadingSpinner.module.css';

export function LoadingSpinner({ size = 32 }: { size?: number }) {
    return (
        <div
            className={styles.spinner}
            style={{ width: size, height: size }}
            aria-label="Loading"
        />
    );
}
