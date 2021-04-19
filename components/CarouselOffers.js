import { useState } from 'react';
import styled from 'styled-components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import Loader from 'react-loader-spinner';
import Link from 'next/link';
import { slugify } from '../lib/slugify';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 601 },
        items: 3,
    },
    mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 1,
    },
};

const CarouselOffers = ({ offers }) => {
    const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
        const {
            carouselState: { currentSlide },
        } = rest;
        return (
            <ButtonContainer>
                <LeftArrow className={currentSlide === 0 ? 'disable' : ''} onClick={() => previous()}>
                    {' '}
                    <RiArrowLeftSLine size="30px" />{' '}
                </LeftArrow>
                <RightArrow onClick={() => next()}>
                    <RiArrowRightSLine size="30px" />{' '}
                </RightArrow>
            </ButtonContainer>
        );
    };

    return (
        <>
            <CarouselWrapp>
                <Present>
                    <Title weight="700" color="#393939" size="1.7rem">
                        {' '}
                        Volvé a soñar con tu próximo viaje.
                    </Title>
                    <PTag line="2" weight="600" color="#393939" size="1rem">
                        Seleccionamos estas ofertas para vos, algunas con reserva flexible y otras con precios
                        sorprendentes. Elegi la que va mejor con tus planes y compra tu próximo paquete.{' '}
                    </PTag>
                    <BtnIntro>Ver mas ofertas </BtnIntro>
                </Present>
                {offers.length > 0 ? (
                    <Carousel
                        responsive={responsive}
                        ssr={true}
                        infinite={true}
                        arrows={false}
                        customButtonGroup={<ButtonGroup />}
                    >
                        {offers.map((item, index) => {
                            return (
                                <Link
                                    href={`/[categoria]/[id]`}
                                    as={`/${slugify(item.tipo_producto)}/${item.id_paquete_turistico}`}
                                    key={index}
                                >
                                    <Card key={index}>
                                        <CardImg image={`https://www.lrseguridad.com.ar/turismo/1.0/${item.path}`}>
                                            <NochesCard> {item.cantidad_noche} NOCHES</NochesCard>
                                        </CardImg>
                                        <CardInfoWrap>
                                            <CardTop>
                                                <TitleCard>Paquetes a {item.localidad}</TitleCard>
                                            </CardTop>
                                            <CardBottom>
                                                <PTag> Precio final por persona</PTag>
                                                <PriceCard>
                                                    {' '}
                                                    $ <Be>{item.precio}</Be>Ars
                                                </PriceCard>
                                                <DiscountCard> {item.dct} </DiscountCard>
                                            </CardBottom>
                                        </CardInfoWrap>
                                    </Card>
                                </Link>
                            );
                        })}
                    </Carousel>
                ) : (
                    <Loader
                        style={{ display: 'grid', alignItems: 'center', justifyContent: 'center' }}
                        type="TailSpin"
                        color="#00BFFF"
                        height={50}
                        width={50}
                    />
                )}
            </CarouselWrapp>
        </>
    );
};

export default CarouselOffers;

export const Title = styled.h2`
    font-family: 'Open Sans', sans-serif;
    color: ${(props) => (props.color ? props.color : '#a1a1a1')};
    font-size: ${(props) => (props.size ? props.size : '1.8rem')};
    font-weight: ${(props) => (props.weight ? props.weight : '600')};
    position: relative;
`;
export const PTag = styled.p`
    font-family: 'Open Sans', sans-serif;
    line-height: ${(props) => (props.line ? props.line : '1.2')};
    font-size: ${(props) => (props.size ? props.size : '0.8rem')};
    color: ${(props) => (props.color ? props.color : '#333')};
    font-weight: ${(props) => (props.weight ? props.weight : '500')};
`;
export const CarouselWrapp = styled.div`
    margin: 10vh 0 10vh 0;
    padding: 5vh 0 0 0;
    display: grid;
    width: 100%;
    height: 75vh;
    background: #f4f5f7;
    border-radius: 5px;
    grid-template-columns: 25% 1fr;
    grid-column-gap: 1vw;
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        height: auto;
    }
`;
export const Present = styled.div`
    background: #f4f5f7;
    width: 100%;
    height: 100%;
    padding: 1vh 2vw 0 2vw;
    position: relative;
    @media (max-width: 600px) {
        height: 55vh;
    }
`;
export const BtnIntro = styled.a`
background: none;
padding: 10px;
border-radius: 30px;
color: #ea1b37;
font-family: 'Open Sans',sans-serif;
font-weight: 700;
position: absolute;
bottom: 5vh;
font-size: 0.8em;
border: 2px solid #ea1b37;
}
`;
export const Card = styled.div`
    cursor: pointer;
    width: 100%;
    height: 65vh;
    background: #f1f1f1;
    box-shadow: 5px 5px 10px #b0b0b0, -5px -5px 10px #ffffff;
`;
export const CardImg = styled.div`
    width: 100%;
    height: 25vh;
    background-image: url('${(props) => props.image}');
    background-position: center;
    background-size: cover;
    position: relative;
`;
export const NochesCard = styled.p`
    background: #ea1b37;
    margin: 0;
    color: #fff;
    position: absolute;
    font-size: 0.6rem;
    left: 1vw;
    line-height: 1.2;
    bottom: -1vh;
    font-weight: 600;
    height: 3vh;
    padding: 0.3vw;
    border-radius: 5px;
    @media (max-width: 600px) {
        background: #ea1b37;
        margin: 0;
        color: #fff;
        position: absolute;
        font-size: 1rem;
        left: 1vw;
        line-height: 0.1;
        bottom: -1vh;
        font-weight: 600;
        height: 3vh;
        padding: 3vw;
        border-radius: 5px;
    }
`;
export const TitleCard = styled.h4`
    color: #393939;
    font-weight: 700;
`;
export const PriceCard = styled.p`
    color: #333;
    font-size: 0.8rem;
`;
export const DiscountCard = styled.p`
    background: #ea1b37;
    color: white;
    width: 3.4vw;
    position: absolute;
    bottom: 1vh;
    right: 0.6vw;
    font-size: 0.9rem;
    text-align: center;
    padding: 2px;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    font-weight: 700;
    @media (max-width: 600px) {
        width: 16vw;
        right: 1.6vw;
    }
`;
export const CardInfoWrap = styled.div`
    padding: 10px;
    display: grid;
    grid-template-rows: 25vh;
`;
export const CardTop = styled.div``;
export const CardBottom = styled.div`
    border-top: 1px solid #dfdfdf;
`;
export const Be = styled.span`
    font-size: 1.4rem;
    color: #393939;
    font-weight: 700;
`;
export const LeftArrow = styled.div`
    border: 1px solid #b3b3b3;
    position: absolute;
    left: 0;
    cursor: pointer;
    background: white;
    width: 50px;
    margin-left: -20px;
    height: 50px;
    border-radius: 100%;
    line-height: 4.2;
    display: inline-block;
    -webkit-box-shadow: 0px 3px 5px -2px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 3px 5px -2px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 3px 5px -2px rgba(0, 0, 0, 0.75);
`;
export const RightArrow = styled.div`
    border: 1px solid #b3b3b3;
    position: absolute;
    right: 0;
    cursor: pointer;
    background: white;
    width: 50px;
    margin-right: -20px;
    border-radius: 100%;
    height: 50px;
    line-height: 4.2;
    display: inline-block;
    -webkit-box-shadow: 0px 3px 5px -2px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 3px 5px -2px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 3px 5px -2px rgba(0, 0, 0, 0.75);
`;
export const ButtonContainer = styled.div`
    position: absolute;
    top: 55%;
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: space-around;
`;
