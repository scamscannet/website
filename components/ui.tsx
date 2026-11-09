'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { PuffLoader } from 'react-spinners';
import { WarningIcon } from './icons';
import { texts } from '@/lib/texts';

const cx = (...classes: (string | false | undefined)[]) => classes.filter(Boolean).join(' ');

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'contained' | 'outlined' | 'white-outlined' };

export const Button = ({ variant = 'contained', className, type = 'submit', ...props }: ButtonProps) => (
    <button
        type={type}
        className={cx('button', variant !== 'contained' && `button-${variant}`, className)}
        {...props}
    />
);

/** Each page has exactly one h1, sections use h2. */
export const SectionTitle = ({ as: Tag = 'h2', className, children }: { as?: 'h1' | 'h2', className?: string, children: ReactNode }) => (
    <Tag className={cx('section-title', className)}>{children}</Tag>
);

export const SectionSubtitle = ({ className, children }: { className?: string, children: ReactNode }) => (
    <p className={cx('section-subtitle', className)}>{children}</p>
);

export const ErrorView = ({ notFound }: { notFound?: boolean }) => {
    const router = useRouter();

    return (
        <section style={{ height: 'calc(100vh - 263px)' }}>
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 48 }}>
                <WarningIcon size={132} />
                <SectionTitle as="h1">{notFound ? texts.errors.notFound : texts.errors.generic}</SectionTitle>
                <div style={{ margin: '0 auto' }}>
                    <Button type="button" onClick={() => notFound ? router.push('/') : router.back()}>
                        {notFound ? texts.errors.backHome : texts.errors.goBack}
                    </Button>
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
