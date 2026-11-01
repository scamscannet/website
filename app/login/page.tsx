'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { login } from '@/lib/api';
import styles from './page.module.css';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [failed, setFailed] = useState(false);

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            await login(email, password);
            router.push('/admin');
        } catch {
            setFailed(true);
        }
    };

    return (
        <main className={styles.page}>
            <form className={styles.form} onSubmit={submit}>
                <h3 className={styles.title}>Log in</h3>
                <label className={styles.inputWrapper}>
                    <span className={styles.label}>Email</span>
                    <input className={styles.input} type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
                </label>
                <label className={styles.inputWrapper}>
                    <span className={styles.label}>Password</span>
                    <input className={styles.input} type="password" required value={password} onChange={(event) => setPassword(event.target.value)} />
                </label>
                {failed && <p className={styles.error}>Invalid email or password.</p>}
                <Button className={styles.button}>Log in</Button>
                <p className={styles.note}>Account management is not open to the public.</p>
            </form>
        </main>
    );
}
