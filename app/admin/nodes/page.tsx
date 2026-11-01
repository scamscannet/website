'use client';

import { useEffect, useState } from 'react';
import { Button, Spinner } from '@/components/ui';
import { createNode, deleteNode, getNodes } from '@/lib/api';
import type { ScrapingNode } from '@/lib/types';
import styles from '../admin.module.css';

const SecretBox = ({ secret, onClose }: { secret: string, onClose: () => void }) => {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(secret);
        setCopied(true);
    };

    return (
        <div className={styles.secretBox}>
            <p className={styles.secretText}>
                Your node was created. This is its secret and it is shown only once.
                Copy it now, you will not be able to see it again.
            </p>
            <code className={styles.code}>{secret}</code>
            <div className={styles.secretActions}>
                <Button type="button" onClick={copy}>{copied ? 'Copied' : 'Copy'}</Button>
                <Button type="button" variant="outlined" onClick={onClose}>Done</Button>
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

    const remove = (node: ScrapingNode) => confirm(`Delete node ${node.name}?`) && run(() => deleteNode(node.node_id));

    return (
        <section className={styles.panel}>
            <div className={styles.panelHeader}>
                <h3 className={styles.cardTitle}>Scraping Nodes</h3>
                <Button type="button" onClick={create}>Create</Button>
            </div>
            {secret && <SecretBox secret={secret} onClose={() => setSecret(null)} />}
            {failed && <p className={styles.error}>Something went wrong, please try again.</p>}
            {!nodes && !failed && <Spinner />}
            {nodes?.length === 0 && <p className={styles.text}>You have no nodes yet.</p>}
            {nodes && nodes.length > 0 && (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Name</th>
                            <th className={styles.th}>Node ID</th>
                            <th className={styles.th}>Last seen</th>
                            <th className={styles.th}>Completed jobs</th>
                            <th className={styles.th}>Failed jobs</th>
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
                                    <button type="button" className={styles.deleteButton} onClick={() => remove(node)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}
