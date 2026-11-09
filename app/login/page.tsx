'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { login } from '@/lib/api';
import { texts } from '@/lib/texts';
import styles from './page.module.css';

const t = texts.login;

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
                <h1 className={styles.title}>{t.title}</h1>
                <label className={styles.inputWrapper}>
                    <span className={styles.label}>{t.email}</span>
                    <input className={styles.input} type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
                </label>
                <label className={styles.inputWrapper}>
                    <span className={styles.label}>{t.password}</span>
                    <input className={styles.input} type="password" required value={password} onChange={(event) => setPassword(event.target.value)} />
                </label>
                {failed && <p className={styles.error}>{t.failed}</p>}
                <Button className={styles.button}>{t.button}</Button>
                <p className={styles.note}>{t.note}</p>
            </form>
        </main>
    );
}
