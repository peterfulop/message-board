import type { Message } from '@/lib/messages';
import styles from './MessageItem.module.css';

type Props = {
    message: Message;
    onDelete: (id: string) => void;
    disabled: boolean;
};

export function MessageItem({ message, onDelete, disabled }: Props) {
    return (
        <article className={styles.item}>
            <div>
                <p className={styles.content}>{message.content}</p>
                <time
                    className={styles.time}
                    dateTime={message.created_at}
                    suppressHydrationWarning
                >
                    {new Date(message.created_at).toLocaleString()}
                </time>
            </div>
            <button
                onClick={() => onDelete(message.id)}
                disabled={disabled}
                className={styles.deleteBtn}
                aria-label="Delete message"
            >
                ✕
            </button>
        </article>
    );
}
