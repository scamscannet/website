'use client';

import { useEffect, useState } from 'react';
import { Button, Spinner } from '@/components/ui';
import { createNode, deleteNode, getNodes } from '@/lib/api';
import { texts } from '@/lib/texts';
import type { ScrapingNode } from '@/lib/types';
import styles from '../admin.module.css';

const t = texts.admin.nodes;

const SecretBox = ({ secret, onClose }: { secret: string, onClose: () => void }) => {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(secret);
        setCopied(true);
    };

    return (
        <div className={styles.secretBox}>
            <p className={styles.secretText}>{t.secret}</p>
            <code className={styles.code}>{secret}</code>
            <div className={styles.secretActions}>
                <Button type="button" onClick={copy}>{copied ? t.copied : t.copy}</Button>
                <Button type="button" variant="outlined" onClick={onClose}>{t.done}</Button>
            </div>
        </div>
    );
};

export default function NodesPage() {
    const [nodes, setNodes] = useState<ScrapingNode[] | null>(null);
    const [secret, setSecret] = useState<string | null>(null);
    const [failed, setFailed] = useState(false);

    const load = () => getNodes().then(setNodes).catch(() => setFailed(true));

    useEffect(() => {
        load();
    }, []);

    const run = async (action: () => Promise<unknown>) => {
        setFailed(false);
        try {
            await action();
            await load();
        } catch {
            setFailed(true);
        }
    };

    const create = () => run(async () => setSecret(await createNode()));

    const remove = (node: ScrapingNode) => confirm(t.confirmDelete(node.name)) && run(() => deleteNode(node.node_id));

    return (
        <section className={styles.panel}>
            <div className={styles.panelHeader}>
                <h1 className={styles.cardTitle}>{t.title}</h1>
                <Button type="button" onClick={create}>{t.create}</Button>
            </div>
            {secret && <SecretBox secret={secret} onClose={() => setSecret(null)} />}
            {failed && <p className={styles.error}>{t.failed}</p>}
            {!nodes && !failed && <Spinner />}
            {nodes?.length === 0 && <p className={styles.text}>{t.empty}</p>}
            {nodes && nodes.length > 0 && (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>{t.columns.name}</th>
                            <th className={styles.th}>{t.columns.id}</th>
                            <th className={styles.th}>{t.columns.lastSeen}</th>
                            <th className={styles.th}>{t.columns.completed}</th>
                            <th className={styles.th}>{t.columns.failed}</th>
                            <th className={styles.th} />
                        </tr>
                    </thead>
                    <tbody>
                        {nodes.map((node) => (
                            <tr key={node.node_id}>
                                <td className={styles.td}>{node.name}</td>
                                <td className={styles.td}><code className={styles.code}>{node.node_id}</code></td>
                                <td className={styles.td}>{new Date(node.last_seen).toLocaleString()}</td>
                                <td className={styles.td}>{node.completed_jobs}</td>
                                <td className={styles.td}>{node.failed_jobs}</td>
                                <td className={styles.td}>
                                    <Button type="button" variant="outlined" onClick={() => remove(node)}>{t.delete}</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}
