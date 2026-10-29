'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './ui';
import { CloseIcon, SuccessIcon, WarningIcon } from './icons';
import { sendReport } from '@/lib/api';
import { emailRegex, urlRegex } from '@/lib/validation';
import styles from './ReportModal.module.css';

type Step = 'details' | 'contact' | 'done';
type Field = 'url' | 'description' | 'email';

const TEXTS = {
    details: ['Report a Scam', 'Help keep the web safe by reporting scams. Share the details below, and let\'s work together for a secure online space!'],
    contact: ['Report a Scam', 'Would you like to receive updates on the resolution of this report?'],
    done: ['Report Submitted', 'Your report has been successfully submitted. Thank you for taking the initiative to make the web safer!'],
    failed: ['Report Not Submitted', 'Your report hasn\'t been successfully submitted'],
};

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
            await sendReport({
                url,
                comment: description,
                email: wantsUpdates ? email : '',
                source: '',
                contact_allowed: contactAllowed,
                tags: null,
            });
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

    const [title, text] = failed ? TEXTS.failed : TEXTS[step];

    return createPortal(
        <div className={styles.overlay} onClick={(event) => event.target === event.currentTarget && onClose()}>
            <div className={styles.formWrapper}>
                <button type="button" className={styles.closeButton} onClick={onClose}>
                    <CloseIcon />
                </button>
                <form className={styles.form} onSubmit={submit}>
                    {step === 'done' && !failed ? <SuccessIcon /> : <WarningIcon />}
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.text}>{text}</p>
                    {step !== 'done' && <div className={styles.divider} />}

                    <div className={`${styles.step} ${step === 'details' ? styles.activeStep : ''}`}>
                        <div className={styles.inputsContainer}>
                            <label className={styles.inputWrapper}>
                                <span className={styles.label}>Scam URL or domain</span>
                                <input
                                    className={`${styles.input} ${invalid.url ? styles.invalid : ''}`}
                                    placeholder="www.example-scam.com"
                                    value={url}
                                    onChange={(event) => setUrl(event.target.value)}
                                    onBlur={() => validate('url')}
                                />
                            </label>
                            <label className={styles.inputWrapper}>
                                <span className={styles.label}>Scam description</span>
                                <textarea
                                    className={`${styles.input} ${styles.textArea} ${invalid.description ? styles.invalid : ''}`}
                                    placeholder="Provide details such as the nature of the scam, suspicious activities, or any relevant information that can help us understand and address the issue"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    onBlur={() => validate('description')}
                                />
                            </label>
                        </div>
                        <Button type="button" className={styles.button} onClick={() => validate('url', 'description') && setStep('contact')}>
                            Continue
                        </Button>
                    </div>

                    <div className={`${styles.step} ${step === 'contact' ? styles.activeStep : ''}`}>
                        <div className={styles.radioButtons}>
                            <label className={styles.radioButtonWrapper}>
                                <input className={styles.radioButton} type="radio" checked={wantsUpdates} onChange={() => chooseUpdates(true)} />
                                <span className={styles.radioButtonText}>Yes, I'd like to receive updates</span>
                            </label>
                            <label className={styles.radioButtonWrapper}>
                                <input className={styles.radioButton} type="radio" checked={!wantsUpdates} onChange={() => chooseUpdates(false)} />
                                <span className={styles.radioButtonText}>Stay anonymous</span>
                            </label>
                            {wantsUpdates && (
                                <>
                                    <div className={styles.divider} />
                                    <label className={styles.inputWrapper}>
                                        <span className={styles.label}>Share your email for updates</span>
                                        <input
                                            className={`${styles.input} ${invalid.email ? styles.invalid : ''}`}
                                            placeholder="your.email@example.com"
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
                                <span className={styles.checkboxText}>
                                    I agree to be contacted if there are questions
                                    or additional information is needed regarding my report.
                                </span>
                            </label>
                        )}
                        <Button className={styles.button}>Submit a Report</Button>
                    </div>

                    {step === 'done' && (
                        <Button type="button" className={styles.button} onClick={onClose}>Close</Button>
                    )}
                </form>
            </div>
        </div>,
        document.body,
    );
};
