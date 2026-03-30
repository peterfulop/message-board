import { LoadingSpinner } from './components/LoadingSpinner';

export default function Loading() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 80 }}>
            <LoadingSpinner />
        </div>
    );
}
