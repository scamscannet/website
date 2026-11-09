// Every text shown on the website. Writing rules: see CLAUDE.md.

const site = {
    name: 'ScamScan',
    description: 'Check if a website is a scam. ScamScan shows if a site is on a scam list, an AI risk score, a screenshot and whois data.',
    operator: '[Operator: full name or company]',
    email: 'email_example@gmail.com',
    address: 'Im Staderfeld 63a, Neu Eliah, BW 96929',
    hostingProvider: '[Hosting provider, country]',
    copyright: (year: number) => `© ${year} ScamScan`,
};

const contact = `${site.operator}, ${site.address}. Email: ${site.email}`;

export const texts = {
    site,

    meta: {
        home: { title: 'ScamScan: check if a website is a scam', description: 'Enter a URL to see if a website is on a scam list, its AI risk score, a screenshot and its whois data. No account needed.' },
        about: { title: 'About us', description: 'ScamScan checks websites for fraud using scam lists, user reports and an AI model, and works to get scam sites taken down.' },
        blog: { title: 'Blog', description: 'Articles on how common online scams work and how to avoid them.' },
        check: { title: 'Website check: is this website safe?', description: 'Check a website before you buy or log in. See our verdict, user reports and takedowns for any URL.' },
        takedown: { title: 'Takedown tracker', description: 'Scam websites we reported to registrars and hosting providers, and the status of each case.' },
        takedownDetail: (domain: string, status: string) => ({ title: `Takedown: ${domain}`, description: `Takedown case for ${domain}. Current status: ${status}.` }),
        tools: { title: 'Tools', description: 'Whois lookups for domains and IP addresses, IP geolocation and domain zone downloads.' },
        whois: { title: 'Whois lookup for domains and IP addresses', description: 'Find out who registered a domain or owns an IP address, with dates, contacts, name servers and location.' },
        domainZone: { title: 'Domain zones', description: 'Search all domain zones and download a CSV for each one.' },
        login: { title: 'Log in', description: 'Log in to ScamScan.' },
        admin: { title: 'Admin', description: 'ScamScan admin.' },
        notFound: { title: 'Page not found', description: 'This page does not exist.' },
        privacy: { title: 'Privacy policy', description: 'Which personal data ScamScan processes, why, for how long, and your rights.' },
        terms: { title: 'Terms and conditions', description: 'The rules for using ScamScan, its website checks, reports and tools.' },
    },

    nav: {
        about: 'About us',
        tools: 'Tools',
        blog: 'Blog',
        contact: 'Contact',
        report: 'Report a scam',
        openApp: 'Open app',
    },

    footer: {
        meeting: 'Want to talk?',
        bookMeeting: 'Book a meeting',
        privacy: 'Privacy policy',
        terms: 'Terms and conditions',
        home: 'Home',
        rightsReserved: 'All rights reserved.',
    },

    home: {
        heroTitle: { before: 'Taking down ', highlight: 'scams.', after: 'One website at a time.' },
        heroSubtitle: 'Paste a domain or URL and find out if you can trust it.',
        reportBanner: 'Found a scam website? We will take it down.',
        reportBannerButton: 'Start takedown',
        impactTitle: 'Our numbers',
        impactSubtitle: 'What ScamScan has done so far.',
        metrics: [
            { value: '400+', label: 'Sites Blocked' },
            { value: '500', label: 'Users Protected' },
            { value: '230', label: 'Achievements Unlocked' },
            { value: '87', label: 'Other relevant stats' },
        ],
        toolsTitle: 'Tools',
        toolsSubtitle: 'Look up who owns a domain or IP address and where it is hosted.',
        tools: {
            domainWhois: { title: 'Domain whois', text: 'See who registered a domain, with which registrar and when.' },
            ipWhois: { title: 'IP whois', text: 'See which company and network an IP address belongs to.' },
            domainZones: { title: 'Domain zone downloads', text: 'Download the domains of a zone as a CSV file.' },
            geolocation: { title: 'Geolocation', text: 'See the country and approximate location of the server behind an IP address.' },
        },
        partnersTitle: 'Partners',
        partnersSubtitle: 'Organizations we work with.',
        articlesTitle: 'Articles',
        articlesSubtitle: 'How common scams work and how to avoid them.',
        articlesButton: 'Go to the blog',
    },

    about: {
        title: 'About ScamScan',
        columns: [
            { title: 'What we do', text: 'ScamScan checks websites for signs of fraud. We combine public scam lists, reports from our users and an AI model that scores the domain name and the page content.' },
            { title: 'Why we built it', text: 'Scam sites copy real brands and often disappear within days. Checking a site before you pay or log in takes a few seconds.' },
            { title: 'What you can use', text: 'A website check for any URL, whois lookups for domains and IP addresses, domain zone downloads and a tracker of the sites we are working to take down.' },
        ],
    },

    blog: {
        title: 'Online safety articles',
        subtitle: 'How common scams work and how to avoid them.',
        readArticle: 'Read article',
        readMore: 'Read more',
        recentTitle: 'Recent posts',
        loadMore: 'Load more',
        contents: 'Contents',
        conclusion: 'Summary',
        breadcrumbBlog: 'Blog',
        cards: [
            { date: '20 March 2023', title: 'FIDO security keys for two-factor authentication', description: 'How FIDO security keys work as a second factor, and why phishing sites can\'t steal them.', link: '#' },
            { date: '20 March 2023', title: 'Current phishing trends', description: 'Phishing methods that are common right now and how to spot them.', link: '#' },
            { date: '20 March 2023', title: '5 ways to avoid online scams', description: 'Five things you can do today to make online scams less likely to work on you.', link: '#' },
            { date: '20 March 2023', title: 'What to do after you\'ve been scammed', description: 'The first steps after a scam: who to call, what to block and where to report it.', link: '#' },
            { date: '20 March 2023', title: 'FIDO security keys for two-factor authentication', description: 'How FIDO security keys work as a second factor, and why phishing sites can\'t steal them.', link: '#' },
            { date: '20 March 2023', title: '5 ways to avoid online scams', description: 'Five things you can do today to make online scams less likely to work on you.', link: '#' },
        ],
        phishing: {
            title: 'How to spot and avoid phishing',
            subtitle: 'Phishing messages pretend to come from a bank, a shop or a public office to get your password, card details or money. Most of them follow the same few patterns, and once you know them they are easy to spot.',
            sections: [
                {
                    title: 'Common phishing techniques',
                    points: [
                        { heading: 'Spoofed sender', text: 'The sender name looks right, but the address is slightly off, for example support@paypa1.com. Check the full address, not just the name.' },
                        { heading: 'Disguised links', text: 'The link text says one thing and points somewhere else. On a computer, hover over the link to see the real address. On a phone, press and hold it.' },
                        { heading: 'Copied brands', text: 'Messages copy the logo and tone of banks, parcel services, tax offices and online shops. A familiar logo proves nothing.' },
                        { heading: 'Time pressure', text: '"Your account will be closed in 24 hours." Deadlines like this are there to stop you from thinking. Real companies give you time.' },
                    ],
                },
                {
                    title: 'Warning signs',
                    points: [
                        { heading: 'Generic greeting', text: '"Dear customer" instead of your name. Companies you have an account with usually know your name.' },
                        { heading: 'Spelling mistakes', text: 'Typos and odd wording are common in phishing, but more and more phishing is written without errors. Don\'t rely on this sign alone.' },
                        { heading: 'Unexpected attachments', text: 'Invoices or delivery notes you weren\'t expecting can contain malware. Don\'t open them.' },
                    ],
                },
                {
                    title: 'How to protect yourself',
                    points: [
                        { heading: 'Check through another channel', text: 'Open the company\'s website or app yourself, or call the number on your card. Never use the contact details in the suspicious message.' },
                        { heading: 'Turn on two-factor authentication', text: 'With a second factor, a stolen password alone is not enough to log in. Security keys and passkeys also refuse to work on fake login pages.' },
                        { heading: 'Check the link', text: 'Paste the address into the ScamScan website check before you enter any data.' },
                    ],
                },
            ],
            conclusion: 'Phishing works because it looks familiar and puts you under time pressure. Slow down, check the sender and the link, and log in through the official app or website instead of the link in the message. If you find a phishing site, report it to us.',
            date: '2023-03-20',
            hashtags: ['#phishing', '#cybersecurity', '#anti-scam'],
        },
    },

    errors: {
        generic: 'Something went wrong',
        goBack: 'Go back',
        notFound: 'Page not found',
        backHome: 'Back to home',
    },

    search: {
        placeholder: 'Enter a domain or URL, e.g. example.com',
        button: 'Check now',
        invalidWhois: 'That isn\'t a valid domain or IP address. Try something like scamscan.net or 142.251.208.174.',
    },

    app: {
        menu: { check: 'Website check', takedown: 'Takedown tracker', tools: 'Tools', back: 'Back to website' },
        headerPlaceholder: 'Check another website',
        headerErrors: { whois: 'No whois data for this domain or IP address.' },
    },

    check: {
        title: 'Website check',
        subtitle: 'Enter a website address to check if it\'s safe.',
        loading: 'Loading…',
        failed: 'Could not load this data. Try again later.',
        verdict: {
            title: 'Verdict',
            scamscan: 'ScamScan',
            external: 'External blocklists',
            externalText: 'Results from other blocklists will show here.',
            trusted: 'This website is on our list of safe sites. We have seen no signs of fraud.',
            blocked: 'This website is on our block list. Don\'t enter personal data or make payments on it.',
            unknown: 'We haven\'t classified this website yet. That doesn\'t mean it\'s safe.',
        },
        reports: {
            title: 'Reports',
            noneTitle: 'No reports',
            none: 'Nobody has reported this website yet.',
            count: (count: number) => count === 1 ? '1 report' : `${count} reports`,
            since: (date: string) => `First reported on ${date}`,
        },
        self: {
            title: 'Wait, you\'re checking us?',
            text: 'Fair enough. Trust no one. So we ran the scan on ourselves, very thoroughly, with a magnifying glass.',
            facts: [
                { key: 'Verdict', value: 'Safe. We would say that, of course.' },
                { key: 'Scam score', value: '0%. We graded our own homework.' },
                { key: 'Reports', value: 'None. We checked twice, then once more.' },
                { key: 'Takedown', value: 'Not planned. We asked ourselves nicely.' },
            ],
            button: 'Check a website that isn\'t us',
        },
        takedown: { title: 'Takedown', text: 'If we are working to take this website down, the progress will show here.' },
        scrape: {
            title: 'Website data',
            noData: 'No data',
            text: 'This website has not been scanned by us. You can request a new scan by pressing the button below.',
            button: 'Request scan',
            limit: 'You can request 3 scans a day.',
            requested: 'Scan requested. Check back in a few minutes.',
            failed: 'Could not request a scan. You may have used your 3 scans for today.',
        },
        geolocation: { title: 'Geolocation', text: 'The location of the server behind this website will show here.' },
        score: {
            title: 'AI scam score',
            tooltip: 'How likely our AI model thinks this site is a scam, based on the domain name and the page content.',
            domain: 'Domain name',
            website: 'Page content',
            noData: 'No data',
            low: 'Low risk',
            moderate: 'Moderate risk',
            high: 'High risk',
        },
        screenshots: {
            title: 'Screenshot',
            description: 'Click the image to see the full page.',
            viewText: 'View page text',
            openFullSize: 'Open full size',
            noImage: 'No image',
            alt: (domain: string) => `Screenshot of ${domain}`,
        },
        whois: {
            title: 'Whois data',
            domain: 'Domain',
            ip: 'IP',
            registrar: 'Registrar',
            registrationDate: 'Registration date',
            ownerName: 'Owner name',
            country: 'Country',
            registrant: 'Registrant',
            details: (title: string) => `${title} details`,
        },
        report: {
            title: 'Is this website a scam?',
            text: 'Tell us what happened. Reports help us warn other people and get sites taken down.',
            button: 'Report this website',
        },
    },

    takedown: {
        title: 'Takedown tracker',
        subtitle: 'Scam websites we reported to registrars and hosting providers, and the status of each case.',
        columns: { domain: 'Domain', reported: 'Reported', lastUpdate: 'Last update', category: 'Category', status: 'Status' },
        back: '← All takedowns',
        lastUpdate: 'Last update:',
        website: 'Website',
        rows: { domain: 'Domain', category: 'Category', registrar: 'Registrar', hostingProvider: 'Hosting provider', ip: 'IP', country: 'Country', reported: 'Reported' },
        progress: 'Takedown progress',
    },

    tools: {
        title: 'Tools',
        subtitle: 'Look up domains and IP addresses.',
        cards: {
            whois: { title: 'Whois lookup', text: 'Registration and ownership details for any domain.' },
            geolocation: { title: 'IP geolocation', text: 'Owner, network and location of any IP address.' },
            domainZone: { title: 'Domain zones', text: 'Browse domain zones and download them as CSV.' },
        },
    },

    whois: {
        title: 'Whois lookup',
        subtitle: 'Find out who registered a domain or who owns an IP address, with dates, contacts and name servers.',
        placeholder: 'Enter a domain or IP address',
        noData: (value: string) => `No whois data for ${value}.`,
        table: 'Table',
        raw: 'Raw',
        loading: 'Loading…',
        noRaw: 'No raw data available.',
        tables: {
            registrar: 'Registrar',
            dates: 'Dates',
            nameServers: 'Name servers',
            registrant: 'Registrant',
            admin: 'Admin contact',
            billing: 'Billing contact',
            tech: 'Tech contact',
            geolocation: 'Geolocation',
            summary: 'Summary',
            network: 'Network',
        },
        rows: {
            name: 'Name',
            organization: 'Organization',
            email: 'Email',
            phone: 'Phone',
            street: 'Street',
            city: 'City',
            state: 'State',
            postalCode: 'Postal code',
            country: 'Country',
            ianaId: 'IANA ID',
            url: 'Registrar URL',
            abuseEmail: 'Abuse email',
            abusePhone: 'Abuse phone',
            status: 'Status',
            expires: 'Expires',
            created: 'Registered',
            updated: 'Updated',
            address: 'Address',
            longitude: 'Longitude',
            latitude: 'Latitude',
            whoisServer: 'Whois server',
            asn: 'ASN',
            company: 'Company',
            route: 'Route',
            abuseContact: 'Abuse contact',
            netName: 'Network name',
            firstIp: 'First IP',
            lastIp: 'Last IP',
        },
    },

    domainZone: {
        title: 'Domain zones',
        subtitle: 'Search all domain zones and download a CSV for each one.',
        placeholder: 'Search domain zones',
        columns: { zone: 'Zone', count: 'Domains', registrar: 'Registrar', lastUpdate: 'Last update' },
        download: 'Download',
        noData: 'No data',
        rowsPerPage: 'Rows per page:',
        pageOf: (page: number, last?: number) => `${page} of ${last ?? '-'}`,
    },

    report: {
        details: { title: 'Report a scam', text: 'Tell us which website it is and what happened.' },
        contact: { title: 'Report a scam', text: 'Do you want updates on this report?' },
        done: { title: 'Report sent', text: 'Thank you. We will review the website.' },
        failed: { title: 'Report not sent', text: 'Something went wrong. Please try again later.' },
        urlLabel: 'Website address',
        urlPlaceholder: 'example-scam.com',
        descriptionLabel: 'What happened?',
        descriptionPlaceholder: 'For example: they wanted payment by gift card, the shop never delivered, or the login page looked like my bank\'s.',
        continue: 'Continue',
        wantsUpdates: 'Yes, send me updates',
        anonymous: 'No, stay anonymous',
        emailLabel: 'Your email',
        emailPlaceholder: 'you@example.com',
        contactAllowed: 'You may contact me if you have questions about my report.',
        submit: 'Send report',
        close: 'Close',
    },

    legal: {
        lastUpdated: 'Last updated: 9 November 2026',
        privacy: {
            title: 'Privacy policy',
            intro: 'This policy explains which personal data we process when you use ScamScan, why we do it, how long we keep it and what rights you have. We follow the EU General Data Protection Regulation (GDPR).',
            sections: [
                {
                    title: 'Who is responsible',
                    paragraphs: [
                        `The controller for this website is ${contact}`,
                        'For any question about your data or to use your rights, write to us at the email address above.',
                    ],
                },
                {
                    title: 'Visiting the website',
                    paragraphs: [
                        `When you open a page, our servers log your IP address, the date and time, the page requested, your browser and operating system, and the page you came from. We need this to deliver the website and to protect it against attacks (Art. 6(1)(f) GDPR). The website is hosted by ${site.hostingProvider}. Logs are deleted after [14] days unless we need them to investigate an attack.`,
                    ],
                },
                {
                    title: 'Website checks',
                    paragraphs: [
                        'When you check a website, the address you enter is sent to our API to look up our verdict and any reports. We store the checked addresses, but not together with your identity. We use them to run the service and to improve our scam detection (Art. 6(1)(f) GDPR).',
                        'When you request a scan, our servers visit the website and store a screenshot, its text and its server details. To enforce the limit of 3 scans a day, we keep your IP address together with the time of the request for [24 hours].',
                    ],
                },
                {
                    title: 'Reporting a scam',
                    paragraphs: [
                        'When you report a website, we store the website address and, if you give it, your description of what happened. We use this to review the website and to request a takedown (Art. 6(1)(f) GDPR).',
                        'Giving your email address is optional. If you do, we use it only to send you updates about your report and, if you agreed, to ask you questions about it (Art. 6(1)(a) GDPR). You can withdraw your consent at any time by writing to us. We don\'t pass your name or email address to registrars or hosting providers.',
                    ],
                },
                {
                    title: 'Whois lookups and the map',
                    paragraphs: [
                        'For a whois lookup, the domain or IP address you enter is sent to our whois service, which queries the public registration databases (registries and registrars).',
                        'The map in the IP lookup loads its images from OpenStreetMap (OpenStreetMap Foundation, United Kingdom). Your browser sends your IP address to their servers to do this. The UK has an adequacy decision from the EU Commission. See the OpenStreetMap Foundation\'s privacy policy for details.',
                    ],
                },
                {
                    title: 'Cookies',
                    paragraphs: [
                        'We don\'t use tracking, analytics or advertising cookies. Only team members who log in get a session cookie, which is needed to keep them logged in (§ 25(2) TDDDG).',
                    ],
                },
                {
                    title: 'Data about websites and their operators',
                    paragraphs: [
                        'To find and take down scam websites, we process public data about websites: their content, screenshots, server details and whois registration data. This can include names or contact details of the people who run them. We do this to protect the public from fraud (Art. 6(1)(f) GDPR). We share it with registrars, hosting providers, payment providers and authorities when we request a takedown. If you think we list your website by mistake, contact us and we will review it.',
                    ],
                },
                {
                    title: 'How long we keep data',
                    paragraphs: [
                        'We keep data only as long as we need it for the purposes above. Reports and takedown cases are kept for [3 years] after they are closed, so we can recognize scams that return. Your email address is deleted when your report is closed or when you withdraw your consent.',
                    ],
                },
                {
                    title: 'Your rights',
                    paragraphs: [
                        'You have the right to access your data, to have it corrected or deleted, to restrict its processing, to receive it in a portable format and to object to processing based on legitimate interest (Art. 15 to 21 GDPR). If you gave consent, you can withdraw it at any time, which doesn\'t affect processing before that.',
                        'You can also complain to a data protection authority, for example the one in the country where you live or the one responsible for us.',
                    ],
                },
                {
                    title: 'Changes',
                    paragraphs: ['We update this policy when our service changes. The date at the top shows the latest version.'],
                },
            ],
        },
        terms: {
            title: 'Terms and conditions',
            intro: `These terms apply to your use of ScamScan, run by ${site.operator}. By using the website you accept them.`,
            sections: [
                {
                    title: 'What ScamScan offers',
                    paragraphs: [
                        'ScamScan lets you check websites for signs of fraud, report scam websites, follow our takedown cases and use tools such as whois lookups and domain zone downloads. The service is free. We can change, limit or stop features at any time.',
                    ],
                },
                {
                    title: 'Our verdicts are not a guarantee',
                    paragraphs: [
                        'Our verdicts come from our own checks, user reports, automated analysis and external lists. They can be wrong or out of date. A website marked as safe or unclassified can still be a scam, and a website marked as a scam may be legitimate. Use ScamScan as one source of information and make your own decision before you pay or enter personal data.',
                    ],
                },
                {
                    title: 'How you may use ScamScan',
                    paragraphs: [
                        'Don\'t misuse the service. In particular, don\'t query it automatically or in bulk without our written permission, don\'t get around limits such as the 3 scans a day, don\'t submit reports you know are false, and don\'t attack or overload our systems. We can block access if you break these rules.',
                    ],
                },
                {
                    title: 'Reports and takedowns',
                    paragraphs: [
                        'Only report websites that you honestly believe are fraudulent, and describe what happened truthfully. You allow us to use the content of your report to review the website, to request takedowns and to warn others, without naming you.',
                        'We decide for ourselves whether and how to act on a report. We can\'t promise that a website will be taken down, because that decision is made by registrars, hosting providers and authorities.',
                    ],
                },
                {
                    title: 'If you run a listed website',
                    paragraphs: [
                        `If you think we list your website by mistake, write to ${site.email} with the domain and your reasons. We will review it and correct the listing if we were wrong.`,
                    ],
                },
                {
                    title: 'Content and data',
                    paragraphs: [
                        'The design, texts and code of ScamScan belong to us. You may share links to our pages and quote individual results with a source. Screenshots and content of third-party websites belong to their owners and are shown only as evidence.',
                    ],
                },
                {
                    title: 'Liability',
                    paragraphs: [
                        'We are fully liable for intent and gross negligence, for injury to life, body or health, and under the German Product Liability Act. For slight negligence we are liable only if we breach an essential obligation, and then only for typical, foreseeable damage. Otherwise our liability is excluded. This also applies to our staff and agents.',
                    ],
                },
                {
                    title: 'Final provisions',
                    paragraphs: [
                        'German law applies. If you are a consumer, this doesn\'t take away the protection of the mandatory laws of the country where you live. If a provision of these terms is invalid, the rest remains valid. We can update these terms; the date at the top shows the latest version.',
                        `Contact: ${contact}`,
                    ],
                },
            ],
        },
    },

    login: {
        title: 'Log in',
        email: 'Email',
        password: 'Password',
        failed: 'Wrong email or password.',
        button: 'Log in',
        note: 'Accounts are for the ScamScan team only.',
    },

    admin: {
        title: 'Admin',
        nodesCard: { title: 'Scraping nodes', text: 'See your nodes and create new ones.' },
        nodes: {
            title: 'Scraping nodes',
            create: 'Create',
            secret: 'Node created. This is its secret. It is shown only once, so copy it now.',
            copy: 'Copy',
            copied: 'Copied',
            done: 'Done',
            failed: 'Something went wrong. Try again.',
            empty: 'No nodes yet.',
            columns: { name: 'Name', id: 'Node ID', lastSeen: 'Last seen', completed: 'Completed jobs', failed: 'Failed jobs' },
            delete: 'Delete',
            confirmDelete: (name: string) => `Delete node ${name}?`,
        },
    },
};
