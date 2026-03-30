'use client';

import { useOptimistic, useTransition } from 'react';
import type { Message } from '@/lib/messages';
import { deleteMessage } from '../actions';
import { MessageItem } from './MessageItem';
import styles from './MessageList.module.css';

export function MessageList({ initialMessages }: { initialMessages: Message[] }) {
    const [optimisticMessages, removeOptimistic] = useOptimistic(
        initialMessages,
        (current, idToRemove: string) => current.filter((m) => m.id !== idToRemove),
    );
    const [isPending, startTransition] = useTransition();

    function handleDelete(id: string) {
        startTransition(async () => {
            removeOptimistic(id);
            await deleteMessage(id);
        });
    }

    return (
        <section className={styles.list}>
            {optimisticMessages.length === 0 && (
                <p className={styles.empty}>No messages yet. Be the first!</p>
            )}
            {optimisticMessages.map((msg) => (
                <MessageItem
                    key={msg.id}
                    message={msg}
                    onDelete={handleDelete}
                    disabled={isPending}
                />
            ))}
        </section>
    );
}
