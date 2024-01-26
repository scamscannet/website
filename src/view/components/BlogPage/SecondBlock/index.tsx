// Core
import React from 'react';

// Styles
import * as S from './styles';
import { Card } from '../../Card';
import { Button } from '@/view/elements';

const cards = [
    {
        id:          1,
        date:        '20 March 2023',
        title:       'Enhancing Security with FIDO Keys in 2FA Protocols',
        description: 'Understand the robust security benefits that FIDO keys bring to two-factor authentication (2FA) systems. Explore the technology behind...',
        link:        '#',
        image:       '#',
    },
    {
        id:          2,
        date:        '20 March 2023',
        title:       'Emerging Trends in Phishing: A Snapshot of Current Cyber Threats',
        description: 'Stay informed about the latest developments in phishing attacks. This article provides an objective overview of new trends...',
        link:        '#',
        image:       '#',
    },
    {
        id:          3,
        date:        '20 March 2023',
        title:       'Practical Measures: 5 Tips to Prevent Online Scams',
        description: 'Take proactive steps to safeguard yourself from online scams with these five practical tips. Backed by security principles, this article provides...',
        link:        '#',
        image:       '#',
    },
    {
        id:          4,
        date:        '20 March 2023',
        title:       'Recovering from a Scam: Practical Steps to Take After Falling Victim',
        description: ' If you’ve been scammed, don’t panic— take control. This article guides you through the immediate actions to mitigate damage, report...',
        link:        '#',
        image:       '#',
    },
    {
        id:          5,
        date:        '20 March 2023',
        title:       'Enhancing Security with FIDO Keys in 2FA Protocols',
        description: 'Understand the robust security benefits that FIDO keys bring to two-factor authentication (2FA) systems. Explore the technology behind...',
        link:        '#',
        image:       '#',
    },
    {
        id:          6,
        date:        '20 March 2023',
        title:       'Practical Measures: 5 Tips to Prevent Online Scams',
        description: 'Take proactive steps to safeguard yourself from online scams with these five practical tips. Backed by security principles, this article provides...',
        link:        '#',
        image:       '#',
    },
];


export const SecondBlock = () => {
    return (
        <S.Container>
            <S.Title>
                Recent blog posts
            </S.Title>
            <S.CardsWrapper>
                {
                    cards.map((card, idx) => {
                        return (
                            <Card
                                card = { card }
                                key = { idx }
                            />
                        );
                    })
                }
            </S.CardsWrapper>
            <Button $styles = { S.Button }>Load More</Button>
        </S.Container>
    );
};
