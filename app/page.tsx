import { listMessages } from '@/lib/messages';
import styles from './page.module.css';
import { MessageBoard } from './components/MessageBoard';

export const revalidate = 0;

export default async function Page() {
    const messages = await listMessages();
    return (
        <main className={styles.shell}>
            <h1 className={styles.heading}>Message Board</h1>
            <MessageBoard initialMessages={messages} />
        </main>
    );
}
