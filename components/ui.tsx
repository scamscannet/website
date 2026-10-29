'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { PuffLoader } from 'react-spinners';
import { WarningIcon } from './icons';

const cx = (...classes: (string | false | undefined)[]) => classes.filter(Boolean).join(' ');

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'contained' | 'outlined' | 'white-outlined' };

export const Button = ({ variant = 'contained', className, type = 'submit', ...props }: ButtonProps) => (
    <button
        type={type}
        className={cx('button', variant !== 'contained' && `button-${variant}`, className)}
        {...props}
    />
);

export const SectionTitle = ({ className, children }: { className?: string, children: ReactNode }) => (
    <h3 className={cx('section-title', className)}>{children}</h3>
);

export const SectionSubtitle = ({ className, children }: { className?: string, children: ReactNode }) => (
    <p className={cx('section-subtitle', className)}>{children}</p>
);

export const ErrorView = () => {
    const router = useRouter();

    return (
        <section style={{ height: 'calc(100vh - 263px)' }}>
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 48 }}>
                <WarningIcon size={132} />
                <SectionTitle>Oops, something went wrong ...</SectionTitle>
                <div style={{ margin: '0 auto' }}>
                    <Button onClick={() => router.back()}>Go Back</Button>
                </div>
            </div>
        </section>
    );
};

export const Spinner = () => (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <PuffLoader color="#6023FA" />
    </div>
);
