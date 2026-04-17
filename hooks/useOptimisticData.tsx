'use client';

import { useOptimistic, useState, useTransition } from 'react';

type OptimisticAction<T> =
    | { type: 'add'; item: T }
    | { type: 'delete'; id: string | number }
    | { type: 'update'; freshData: T[] };

type UseOptimisticData<T extends { id: string }, TInput = string> = {
    initialData: T[];
    createTempItem?: (input: TInput) => T;
    onCreate?: (input: TInput) => Promise<T>;
    onDelete?: (id: string) => Promise<void>;
    onUpdate?: (freshData: T[]) => Promise<T[]>;
};

const useOptimisticData = <T extends { id: string }, TInput = string>({
    initialData,
    createTempItem,
    onCreate,
    onDelete,
    onUpdate,
}: UseOptimisticData<T, TInput>) => {
    const [data, setData] = useState<T[]>(initialData);
    const [, startTransition] = useTransition();

    const reducer = (current: T[], action: OptimisticAction<T>): T[] => {
        switch (action.type) {
            case 'add':
                return [action.item, ...current];
            case 'delete':
                return current.filter((m) => m.id !== action.id);
            case 'update':
                return action.freshData;
            default:
                return current;
        }
    };

    const [optimisticData, updateOptimisticData] = useOptimistic<T[], OptimisticAction<T>>(
        data,
        reducer,
    );

    const handleCreate = (input: TInput) => {
        const temp = createTempItem?.(input);
        startTransition(async () => {
            if (temp) updateOptimisticData({ type: 'add', item: temp });
            const real = await onCreate?.(input);
            if (real) setData((prev) => [real, ...prev]);
        });
    };

    const handleDelete = (id: string | number) => {
        startTransition(async () => {
            updateOptimisticData({ type: 'delete', id });
            onDelete?.(id as T['id']).then(() => {
                setData((prev) => prev.filter((m) => m.id !== id));
            });
        });
    };

    const handleUpdate = (freshData: T[]) => {
        startTransition(async () => {
            updateOptimisticData({ type: 'update', freshData });
            onUpdate?.(freshData).then((real) => {
                setData(real);
            });
        });
    };

    return { optimisticData, handleCreate, handleDelete, handleUpdate };
};

export default useOptimisticData;
