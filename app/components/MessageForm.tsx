'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createMessage } from '../actions';
import { LoadingSpinner } from './LoadingSpinner';
import styles from './MessageForm.module.css';

export function MessageForm() {
    const [content, setContent] = useState('');
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const isEmpty = content.trim().length === 0;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isEmpty) return;

        startTransition(async () => {
            await createMessage(content);
            setContent('');
            router.refresh(); // re-runs the Server Component fetch, streams fresh list
        });
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                className={styles.input}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write a message…"
                disabled={isPending}
                aria-label="Message content"
            />
            <button
                type="submit"
                className={styles.button}
                disabled={isPending || isEmpty}
                aria-busy={isPending}
            >
                {isPending ? <LoadingSpinner size={16} /> : 'Save'}
            </button>
        </form>
    );
}
