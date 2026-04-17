'use client';

import type { Message } from '@/lib/messages';
import { MessageItem } from './MessageItem';
import styles from './MessageList.module.css';

type Props = {
    messages: Message[];
    onDelete: (id: string) => void;
};

export function MessageList({ messages, onDelete }: Props) {
    return (
        <section className={styles.list}>
            {messages.length === 0 && (
                <p className={styles.empty}>No messages yet. Be the first!</p>
            )}
            {messages.map((msg) => (
                <MessageItem key={msg.id} message={msg} onDelete={onDelete} disabled={false} />
            ))}
        </section>
    );
}
