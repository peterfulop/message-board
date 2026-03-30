import { supabase } from './supabase';

export type Message = {
    id: string;
    content: string;
    created_at: string;
};

export async function listMessages(): Promise<Message[]> {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data ?? [];
}
