'use client';

import { Message } from '@/lib/messages';
import { createMessage, deleteMessage } from '../actions';
import { MessageForm } from './MessageForm';
import { MessageList } from './MessageList';
import useOptimisticData from '@/hooks/useOptimisticData';

export function MessageBoard({ initialMessages }: { initialMessages: Message[] }) {
    const { optimisticData, handleCreate, handleDelete } = useOptimisticData<Message>({
        initialData: initialMessages,
        createTempItem: (content) => ({
            id: crypto.randomUUID(),
            content,
            created_at: new Date().toLocaleString('hu-HU'),
        }),
        onCreate: createMessage,
        onDelete: deleteMessage,
    });

    return (
        <>
            <MessageForm onSubmit={handleCreate} />
            <MessageList messages={optimisticData} onDelete={handleDelete} />
        </>
    );
}
