'use server';

import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

export async function createMessage(formData: FormData) {
    const content = formData.get('content') as string;
    if (!content?.trim()) return;

    await supabase.from('messages').insert({ content: content.trim() });
    revalidatePath('/');
}

export async function deleteMessage(id: string) {
    await supabase.from('messages').delete().eq('id', id);
    revalidatePath('/');
}
