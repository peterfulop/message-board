import { listMessages } from '@/lib/messages';
import { MessageForm } from './components/MessageForm';
import { MessageList } from './components/MessageList';
import styles from './page.module.css';

export const revalidate = 0;

export default async function Page() {
    const messages = await listMessages();

    return (
        <main className={styles.shell}>
            <h1 className={styles.heading}>Message Board</h1>
            <MessageForm />
            <MessageList initialMessages={messages} />
        </main>
    );
}
