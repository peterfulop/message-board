'use server';

import { supabase } from '@/lib/supabase';
import { Message } from '@/lib/messages';

export async function createMessage(content: string): Promise<Message> {
    const { data, error } = await supabase
        .from('messages')
        .insert({ content: content.trim() })
        .select()
        .single();
    if (error) throw new Error(error.message);
    return data;
}

export async function deleteMessage(id: string): Promise<void> {
    const { error } = await supabase.from('messages').delete().eq('id', id);
    if (error) throw new Error(error.message);
}
