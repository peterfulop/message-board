import { supabase } from '@/lib/supabase';
import { createMessage, deleteMessage } from './actions';

export const revalidate = 0;

export default async function Page() {
    const { data: messages } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <main
            style={{
                maxWidth: 600,
                margin: '40px auto',
                padding: '0 16px',
                fontFamily: 'sans-serif',
            }}
        >
            <h1>Message Board</h1>

            <form action={createMessage} style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
                <input
                    name="content"
                    placeholder="Write a message…"
                    required
                    style={{
                        flex: 1,
                        padding: '8px 12px',
                        fontSize: 16,
                        border: '1px solid #ccc',
                        borderRadius: 4,
                    }}
                />
                <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
                    Post
                </button>
            </form>

            <ul
                style={{
                    listStyle: 'none',
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                }}
            >
                {messages?.map((msg) => (
                    <li
                        key={msg.id}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'start',
                            padding: 12,
                            border: '1px solid #eee',
                            borderRadius: 4,
                        }}
                    >
                        <div>
                            <p style={{ margin: 0 }}>{msg.content}</p>
                            <small style={{ color: '#888' }}>
                                {new Date(msg.created_at).toLocaleString()}
                            </small>
                        </div>
                        <form action={deleteMessage.bind(null, msg.id)}>
                            <button
                                type="submit"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#c00',
                                }}
                            >
                                ✕
                            </button>
                        </form>
                    </li>
                ))}
            </ul>
        </main>
    );
}
