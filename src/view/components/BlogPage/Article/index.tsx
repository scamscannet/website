import React, { useEffect, useRef, useState } from 'react';

// Elements
import { CustomLink, SectionSubtitle, SectionTitle } from '@/view/elements';

// Styles
import * as S from './styles';

// Data
import { mockedData } from './data';
import { useLocation, useParams } from 'react-router-dom';
import { useScroll } from '@/tools/hooks';
import { breakpoints } from '@/assets';

export const Article = () => {
    const [ data, setData ] = useState<typeof mockedData[0] | null>(null);
    const [ width, setWidth ] = useState(0);
    const { hash } = useLocation();
    const { id } = useParams();
    const ref = useRef<HTMLDivElement | null>(null);
    const isScrolled = useScroll();

    useEffect(() => {
        new Promise<typeof mockedData>((res) => {
            setTimeout(() => {
                res(mockedData);
            }, 1000);
        }).then((res) => setData(res[ `${Number(id) - 1}` ]));
    }, []);


    const scrollToSection = (sectionId: string | number) => {
        const section = document.getElementById(`${sectionId}`);
        if (section) {
            window.scrollTo({ behavior: 'smooth', top: section.getBoundingClientRect().top - document.body.getBoundingClientRect().top });
        }
    };

    const createSlug = (text:string) => {
        let slug = text.toLowerCase();

        slug = slug.replace(/\s+/g, '-').replace(/[^\w-]/g, '');

        return slug;
    };


    useEffect(() => {
        const width = ref.current?.clientWidth;
        if (!width) {
            return;
        }
        setWidth(width);
        if (hash && width >= breakpoints.lg) {
            scrollToSection(hash);
        }
    }, [ data ]);

    useEffect(() => {
        // const anchors = document.querySelectorAll('[data-anchor=anchor]');
        // console.log(anchors);
    }, [ data ]);

    // console.log('width', width);

    const marginTop = width > breakpoints.lg ? 120 : 48;

    return (
        data ? (
            <S.Container ref = { ref }>
                <S.Navigation>
                    <S.NavigationItem>
                        <CustomLink
                            $styles = { S.NavigationLink }
                            to = '/'>
                            ScamScan
                        </CustomLink>
                    </S.NavigationItem>
                    <S.Circle />
                    <S.NavigationItem>
                        <CustomLink
                            $styles = { S.NavigationLink }
                            to = '/blog'>
                            Blog
                        </CustomLink>
                    </S.NavigationItem>
                    <S.Circle />
                    <S.NavigationItem>
                        {data.title}
                    </S.NavigationItem>
                </S.Navigation>
                <SectionTitle $styles = { S.Title }>{data.title}</SectionTitle>
                <S.Wrapper>
                    <S.LeftSide>

                        <S.ImageWrapper>
                            <img
                                alt = 'img_'
                                src = { data.img_url }
                            />
                        </S.ImageWrapper>
                        <SectionSubtitle $styles = { S.Subtitle } >{data.subtitle}</SectionSubtitle>
                        {
                            data.paragraph.map((paragraph) => {
                                return (
                                    <div
                                        id = { '#' + createSlug(paragraph.title) }
                                        key = { paragraph.id }>
                                        <SectionTitle $styles = { S.Title }>
                                            {paragraph.title}
                                        </SectionTitle>
                                        <S.ParagraphList>
                                            {
                                                paragraph.text.map((text) => {
                                                    return (
                                                        <S.ParagraphListItem  key = { text.heading }>
                                                            <SectionSubtitle $styles = { S.Subtitle }>
                                                                <span style = {{ fontWeight: 'bold' }}>{text.heading}</span>{text.text}
                                                            </SectionSubtitle>
                                                        </S.ParagraphListItem>
                                                    );
                                                })
                                            }
                                        </S.ParagraphList>
                                    </div>
                                );
                            })
                        }
                        <div id = '#conclusion'>
                            <SectionTitle $styles = { S.Title }>Conclusion</SectionTitle>
                        </div>
                        <SectionSubtitle $styles = { S.Subtitle }>{data.conclusion}</SectionSubtitle>
                    </S.LeftSide>
                    <S.RightSide $mt = { isScrolled ? marginTop : 0 }>
                        <S.DateHashtagsWrapper>
                            <SectionSubtitle $styles = { S.Subtitle }>
                                {data.date}
                            </SectionSubtitle>
                            <S.HashtagsWrapper>
                                {
                                    data.hashtags.map((hashtag, idx) => {
                                        return (
                                            <SectionSubtitle
                                                $styles = { S.Subtitle }
                                                key = { idx }>
                                                {hashtag}
                                            </SectionSubtitle>
                                        );
                                    })
                                }
                            </S.HashtagsWrapper>
                        </S.DateHashtagsWrapper>
                        <S.TablesOfContent>Table of Contents</S.TablesOfContent>
                        <S.AnchorsWrapper>
                            {
                                data.anchors.map((a, i) => {
                                    const linkTo = '#' + createSlug(a);

                                    return (
                                        <CustomLink
                                            $styles = { S.Ancor(linkTo === hash) }
                                            dataAnchor = 'anchor'
                                            key = { a + i }
                                            to = { linkTo }
                                            onClick = { () => {
                                                scrollToSection('#' + createSlug(a));
                                            } }>
                                            {a}
                                        </CustomLink>
                                    );
                                })
                            }
                        </S.AnchorsWrapper>
                    </S.RightSide>
                </S.Wrapper>
            </S.Container>
        ) : <div>loading data.....</div>

    );
};
