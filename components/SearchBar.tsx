'use client';

import { useState, type FormEvent } from 'react';
import { Button, SectionSubtitle } from './ui';
import { SearchIcon } from './icons';
import { useGoToTool } from '@/lib/hooks';
import { domainRegex, ipv4Regex, isDomainOrIp, isUrlOrDomain, urlRegex } from '@/lib/validation';
import styles from './SearchBar.module.css';

type SearchBarProps = {
    onSubmit: (value: string) => void
    placeholder?: string
    whois?: boolean
};

export const SearchBar = ({ onSubmit, placeholder = 'Enter a domain or URL (e.g., www.example.com)', whois = false }: SearchBarProps) => {
    const [value, setValue] = useState('');
    const [invalid, setInvalid] = useState(false);
    const isValid = whois ? isDomainOrIp : isUrlOrDomain;
    const showError = invalid && value !== '';

    const submit = (event: FormEvent) => {
        event.preventDefault();
        if (isValid(value)) {
            onSubmit(value);
        } else {
            setInvalid(true);
        }
    };

    return (
        <>
            <form className={styles.form} onSubmit={submit}>
                <input
                    className={`${styles.input} ${showError ? styles.inputError : ''}`}
                    autoCapitalize="none"
                    placeholder={placeholder}
                    value={value}
                    onChange={(event) => setValue(event.target.value.trim())}
                    onBlur={() => setInvalid(!isValid(value))}
                    onFocus={() => whois && setInvalid(false)}
                />
                <Button className={styles.button}>Check now</Button>
            </form>
            {whois && showError && (
                <SectionSubtitle className={styles.error}>
                    The input you provided is invalid.
                    Please provide a valid domain name or IP, such as scamscan.net or 142.251.208.174.
                </SectionSubtitle>
            )}
        </>
    );
};

type HeaderSearchBarProps = {
    tool: '/scam-check' | '/whois-query'
    placeholder?: string
    errorText?: string
};

export const HeaderSearchBar = ({ tool, placeholder = 'Enter a domain or URL (e.g., www.example.com)', errorText }: HeaderSearchBarProps) => {
    const goToTool = useGoToTool();
    const [value, setValue] = useState('');
    const [invalid, setInvalid] = useState(false);
    const isValid = (input: string) => urlRegex.test(input) || domainRegex.test(input) || (tool === '/whois-query' && ipv4Regex.test(input));

    const submit = (event: FormEvent) => {
        event.preventDefault();
        if (isValid(value)) {
            goToTool(tool, value);
        } else {
            setInvalid(true);
        }
    };

    return (
        <div className={styles.headerWrapper}>
            <form className={`${styles.headerForm} ${invalid && value ? styles.headerFormError : ''}`} onSubmit={submit}>
                <input
                    className={styles.headerInput}
                    autoCapitalize="none"
                    placeholder={placeholder}
                    value={value}
                    onChange={(event) => setValue(event.target.value.trim())}
                    onBlur={() => setInvalid(!isValid(value))}
                />
                <button className={styles.headerSubmit}>
                    <SearchIcon color="#6023FA" width={24} height={24} />
                </button>
            </form>
            {value && errorText && <span className={styles.headerError}>{errorText}</span>}
        </div>
    );
};
