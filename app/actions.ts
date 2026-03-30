'use server';

import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

export async function createMessage(content: string): Promise<void> {
    if (!content.trim()) return;
    const { error } = await supabase.from('messages').insert({ content: content.trim() });
    if (error) throw new Error(error.message);
    revalidatePath('/');
}

export async function deleteMessage(id: string): Promise<void> {
    const { error } = await supabase.from('messages').delete().eq('id', id);
    if (error) throw new Error(error.message);
    revalidatePath('/'); // cache invalidated — correct on next SSR visit
}
