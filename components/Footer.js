import { useState } from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';

export const FooterWrapper = styled.div`
    padding: 4% 8% 4% 8%;
    height: 75vh;
    box-sizing: border-box;
    background-image: url('/grunge.jpg');
    background-position: inherit;
    background-size: cover;
    width: 100%;
    position: relative;
    @media (max-width: 600px) {
        padding: 8% 4% 4% 4%;
    }
`;
export const LogoImg = styled.img`
    width: 70%;
`;
export const PTag = styled.p`
    font-family: 'Open Sans', sans-serif;
    color: white;
    font-weight: 600;
    font-size: 0.8rem;
`;
export const LaRiojaWrapper = styled.img`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 32vw;
    @media (max-width: 600px) {
        width: 75vw;
    }
`;
export const DoscientosWrapper = styled.img`
    position: absolute;
    bottom: 0;
    right: 32%;
    width: 8vw;
    @media (max-width: 600px) {
        left: 5vw;
        width: 24vw;
        bottom: 20vw;
    }
`;
export const MinisterioWrapper = styled.img`
    width: 28vw;
    left: 8vw;
    position: absolute;
    bottom: 3vw;
    @media (max-width: 600px) {
        width: 60vw;
    }
`;
const Footer = () => {
    return (
        <>
            <FooterWrapper>
                <TopFooter>
                    <Sociales>
                        <a href="https://www.facebook.com/turismolarioja" target="_blank">
                            {' '}
                            <img alt="Botón Facebook de Turismo La Rioja." src="/f.png" />{' '}
                        </a>
                        <a href="https://instagram.com/turismolarioja?igshid=tp19m2c8fi36" target="_blank">
                            {' '}
                            <img alt="Botón Instagram de Turismo La Rioja." src="/i.png" />{' '}
                        </a>
                        <a href="https://twitter.com/SecTurLaRioja?s=08" target="_blank">
                            {' '}
                            <img alt="Botón Twitter de Turismo La Rioja." src="/t.png" />{' '}
                        </a>
                        <a href="https://www.youtube.com/user/turismolarioja" target="_blank">
                            {' '}
                            <img alt="Botón Youtube de Turismo La Rioja." src="/y.png" />{' '}
                        </a>
                        <a href="mailto: info.moveteporlarioja@gmail.com" target="_blank">
                            {' '}
                            <img alt="Botón Email de Turismo La Rioja." src="/gm.png" />{' '}
                        </a>
                        <a href="https://wa.me/message/WPUKLGW6MADYP1" target="_blank">
                            {' '}
                            <img alt="Botón WhatsApp de Turismo La Rioja." src="/w.png" />{' '}
                        </a>
                    </Sociales>
                    <MenuLink>
                        <Bloque>
                            <a alt="Link nosotros" className="titlea">
                                NOSOTROS{' '}
                            </a>
                        </Bloque>
                        <Bloque>
                            <Link href="/preguntas-frecuentes" passHref>
                                <a alt="Link preguntas frecuentes." className="titlea">
                                    PREGUNTAS FRECUENTES
                                </a>
                            </Link>
                        </Bloque>
                        <Bloque>
                            <a alt="Link legales" className="titlea">
                                {' '}
                                LEGALES
                            </a>
                        </Bloque>
                        <Bloque>
                            <Link href="/contacto" passHref>
                                <a alt="Link contacto." className="titlea">
                                    CONTACTO{' '}
                                </a>
                            </Link>
                        </Bloque>
                    </MenuLink>
                </TopFooter>
                <MinisterioWrapper src="/pie_logo1.png" alt="Imagen ministerio de La Rioja" />
                {/* <DoscientosWrapper src="/pie_logo2.png" alt="Imagen bicentenario de La Rioja" /> */}
                <LaRiojaWrapper src="/pie_logo3.png" alt="Imagen logo del gobierno de La Rioja" />
            </FooterWrapper>
        </>
    );
};

export default Footer;

export const TopFooter = styled.div`
    display: grid;
    padding: 3% 0 0 0;
    grid-row-gap: 8vh;
    @media (max-width: 600px) {
        padding: 10% 0 0 0;
    }
`;
export const Sociales = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    width: 35vw;
    justify-self: center;
    justify-items: center;
    a {
        color: #41060c;
        display: grid;
        justify-content: center;
        border-radius: 100%;
        width: 8vh;
        height: 8vh;
    }
    img {
        width: 12vw;
    }
    @media (max-width: 600px) {
        width: 100%;
    }
`;
export const MenuLink = styled.div`
    width: 65vw;
    display: grid;
    justify-self: center;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: center;
    @media (max-width: 600px) {
        width: 90vw;
        grid-template-columns: 1fr;
        grid-row-gap: 2vh;
    }
`;
export const Bloque = styled.div`
    display: grid;
    text-align: center;
    a {
        color: white;
        font-family: 'Karla', sans-serif;
    }
    .titlea {
        color: white;
        font-weight: 600;
    }
`;
