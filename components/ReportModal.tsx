'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './ui';
import { CloseIcon, SuccessIcon, WarningIcon } from './icons';
import { sendReport } from '@/lib/api';
import { emailRegex, urlRegex } from '@/lib/validation';
import { texts } from '@/lib/texts';
import styles from './ReportModal.module.css';

type Step = 'details' | 'contact' | 'done';
type Field = 'url' | 'description' | 'email';

const t = texts.report;

export const ReportModal = ({ onClose }: { onClose: () => void }) => {
    const [step, setStep] = useState<Step>('details');
    const [failed, setFailed] = useState(false);
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [wantsUpdates, setWantsUpdates] = useState(true);
    const [email, setEmail] = useState('');
    const [contactAllowed, setContactAllowed] = useState(false);
    const [invalid, setInvalid] = useState<Record<Field, boolean>>({ url: false, description: false, email: false });

    const isFieldValid = (field: Field) => {
        if (field === 'url') return urlRegex.test(url);
        if (field === 'description') return description.length >= 6;
        return !wantsUpdates || emailRegex.test(email);
    };

    const validate = (...fields: Field[]) => {
        const result = { ...invalid };
        fields.forEach((field) => {
            result[field] = !isFieldValid(field);
        });
        setInvalid(result);

        return fields.every(isFieldValid);
    };

    const chooseUpdates = (value: boolean) => {
        setWantsUpdates(value);
        setContactAllowed(false);
    };

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        if (!validate('url', 'description', 'email')) {
            return;
        }
        try {
            // The API only takes the domain for now; description and contact details are not sent.
            await sendReport(url);
        } catch {
            setFailed(true);
        }
        setStep('done');
    };

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [onClose]);

    useEffect(() => {
        if (step !== 'done') return;
        const timer = setTimeout(onClose, 5000);

        return () => clearTimeout(timer);
    }, [step, onClose]);

    const { title, text } = failed ? t.failed : t[step];

    return createPortal(
        <div className={styles.overlay} onClick={(event) => event.target === event.currentTarget && onClose()}>
            <div className={styles.formWrapper}>
                <button type="button" className={styles.closeButton} onClick={onClose} aria-label={t.close}>
                    <CloseIcon />
                </button>
                <form className={styles.form} onSubmit={submit}>
                    {step === 'done' && !failed ? <SuccessIcon /> : <WarningIcon />}
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.text}>{text}</p>
                    {step !== 'done' && <div className={styles.divider} />}

                    <div className={`${styles.step} ${step === 'details' ? styles.activeStep : ''}`}>
                        <div className={styles.inputsContainer}>
                            <label className={styles.inputWrapper}>
                                <span className={styles.label}>{t.urlLabel}</span>
                                <input
                                    className={`${styles.input} ${invalid.url ? styles.invalid : ''}`}
                                    placeholder={t.urlPlaceholder}
                                    value={url}
                                    onChange={(event) => setUrl(event.target.value)}
                                    onBlur={() => validate('url')}
                                />
                            </label>
                            <label className={styles.inputWrapper}>
                                <span className={styles.label}>{t.descriptionLabel}</span>
                                <textarea
                                    className={`${styles.input} ${styles.textArea} ${invalid.description ? styles.invalid : ''}`}
                                    placeholder={t.descriptionPlaceholder}
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    onBlur={() => validate('description')}
                                />
                            </label>
                        </div>
                        <Button type="button" className={styles.button} onClick={() => validate('url', 'description') && setStep('contact')}>
                            {t.continue}
                        </Button>
                    </div>

                    <div className={`${styles.step} ${step === 'contact' ? styles.activeStep : ''}`}>
                        <div className={styles.radioButtons}>
                            <label className={styles.radioButtonWrapper}>
                                <input className={styles.radioButton} type="radio" checked={wantsUpdates} onChange={() => chooseUpdates(true)} />
                                <span className={styles.radioButtonText}>{t.wantsUpdates}</span>
                            </label>
                            <label className={styles.radioButtonWrapper}>
                                <input className={styles.radioButton} type="radio" checked={!wantsUpdates} onChange={() => chooseUpdates(false)} />
                                <span className={styles.radioButtonText}>{t.anonymous}</span>
                            </label>
                            {wantsUpdates && (
                                <>
                                    <div className={styles.divider} />
                                    <label className={styles.inputWrapper}>
                                        <span className={styles.label}>{t.emailLabel}</span>
                                        <input
                                            className={`${styles.input} ${invalid.email ? styles.invalid : ''}`}
                                            placeholder={t.emailPlaceholder}
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            onBlur={() => validate('email')}
                                        />
                                    </label>
                                </>
                            )}
                        </div>
                        {wantsUpdates && (
                            <label className={styles.checkboxWrapper}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    checked={contactAllowed}
                                    onChange={(event) => setContactAllowed(event.target.checked)}
                                />
                                <span className={styles.checkboxText}>{t.contactAllowed}</span>
                            </label>
                        )}
                        <Button className={styles.button}>{t.submit}</Button>
                    </div>

                    {step === 'done' && (
                        <Button type="button" className={styles.button} onClick={onClose}>{t.close}</Button>
                    )}
                </form>
            </div>
        </div>,
        document.body,
    );
};
