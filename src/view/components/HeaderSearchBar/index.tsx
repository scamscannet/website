// Core
import React, { FC, useState } from 'react';
import { useTheme } from 'styled-components';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Bus
// import {} from '../../../bus/'
import { useWhoisquery } from '@/bus/whoisquery';

// Contants
import * as book from '@/view/routes/book';

// Styles
import * as S from './styles';

// Icons
import { SearchIcon } from '@/assets/images/icons';

//
import { inithialState, /*ipv4Regex,*/ schema } from './static';
import { schema as schemaDomain } from './staticDomain';
import { useScamCheck } from '@/bus/scamcheck';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOverflowHidden } from '@/tools/hooks';
import { domainRegex } from '../SearchBar/static';

// Types
type PropTypes = {
    /* type props here */
    placeholder?: string
    scamCheck?: boolean
}

export const HeaderSearchBar: FC<PropTypes> = ({ placeholder = 'Enter a domain or URL (e.g., www.example.com)', scamCheck = false }) => {
    const theme = useTheme();
    const { /* fetchWhoisqueryIp, fetchWhoisqueryDomain, */ whoisquery: { error: whoisQueryError }} = useWhoisquery();
    const { scamchek: { error: scamCheckError }} = useScamCheck();
    const { fetchScamCheck } = useScamCheck();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const overflowHandler = useOverflowHidden();
    const [ value, setValue ] = useState('');
    const {  control, handleSubmit, formState: { errors }} = useForm({ values: inithialState, resolver: yupResolver(scamCheck ? schemaDomain : schema), mode: 'onBlur' });

    // const WhoisquerryHandler = (ipOrUrl: string) => {
    //     if (ipOrUrl.match(urlRegex)) {
    //         fetchWhoisqueryDomain(ipOrUrl);
    //     }
    //     if (ipOrUrl.match(ipv4Regex)) {
    //         fetchWhoisqueryIp(ipOrUrl);
    //     }
    // };

    const fetchScamCheckHandler = (value: string) => {
        if (value.match(domainRegex)) {
            fetchScamCheck(value);
        }
    };

    const onSubmit: SubmitHandler<{urlOrIp?: string | undefined}> = ({ urlOrIp }) => {
        const ipOrUrl = urlOrIp?.trim();
        if (ipOrUrl) {
            overflowHandler(true);
            scamCheck ? fetchScamCheckHandler(ipOrUrl) : null;
            scamCheck ? navigate(`${book.SCAM_CHECK}#${ipOrUrl}`) : navigate(`${book.WHOIS_QUERY}#${ipOrUrl}`);
        }
    };

    return (
        <S.SearchBarWrapper>
            <S.SearchBar
                $error = { !!errors.urlOrIp?.message && !!value }
                onSubmit = { (event) => {
                    event.preventDefault();
                    handleSubmit(onSubmit)();
                } }>
                <Controller
                    control = { control }
                    name = 'urlOrIp'
                    render = { ({ field: { onChange, onBlur }}) => (
                        <S.Input
                            autoCapitalize = 'none'
                            placeholder = { placeholder }
                            onBlur = { onBlur }
                            onChange = { (event) => {
                                event.target.value = event.target.value.trim();
                                onChange(event);
                                setValue(event.target.value);
                            } }
                        />
                    ) }
                />
                <button style = {{ width: '24px', height: '24px', outline: 0, border: 0, padding: 0, background: 'transparent' }}>
                    <SearchIcon
                        color = { theme.palette.purple.main }
                        height = { 24 }
                        width = { 24 }
                    />
                </button>
            </S.SearchBar>
            {pathname === '/scam-check' && value && scamCheckError && (<S.SerachError>No scrape available for this url.</S.SerachError>)}
            {pathname === '/whois-query' && value && whoisQueryError && (<S.SerachError>No scrape available for this domain/ip.</S.SerachError>)}
        </S.SearchBarWrapper>
    );
};
