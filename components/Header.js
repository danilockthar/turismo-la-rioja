import React, { useState, useContext, useEffect, useRef } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { FaPhone, FaWhatsapp, FaInfoCircle, FaMapMarkerAlt, FaRegEnvelope } from 'react-icons/fa';
import { TiHome, TiLightbulb, TiMessages, TiFeather, TiInfoLargeOutline } from 'react-icons/ti';
import { ContextState } from '../context/global';
import { motion } from 'framer-motion';

const Header = () => {
    const top = {
        closed: {
            rotate: 0,
            translateY: 0,
        },
        opened: {
            rotate: -40,
            translateY: 17,
        },
    };
    const center = {
        closed: {
            opacity: 1,
        },
        opened: {
            opacity: 0,
        },
    };
    const bottom = {
        closed: {
            rotate: 0,
            translateY: 0,
        },
        opened: {
            rotate: 40,
            translateY: -16,
        },
    };

    const movePanel = {
        closed: {
            translateX: '100vw',
        },
        opened: {
            translateX: '-100vw',
        },
    };

    const router = useRouter();

    const menuref = useRef(null);
    const [toggle, setToggle] = useState(false);
    const [itemCart, setItemCart] = useContext(ContextState);
    const [showContacto, setShowContacto] = useState(false);

    const handleContacto = () => {
        setShowContacto(!showContacto);
    };

    useEffect(() => {
        if (router.pathname == '/contacto') {
            setShowContacto(false);
        }
    }, [router]);
    return (
        <React.Fragment>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css?family=Karla:400,700,700i&display=swap"
                    rel="stylesheet"
                ></link>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            </Head>
            <HeaderWrapper>
                <MenuBars onClick={() => setToggle(!toggle)}>
                    <BarMotionWrapp animate={toggle ? 'opened' : 'closed'} variants={top}>
                        <BarTop></BarTop>
                    </BarMotionWrapp>
                    <BarMotionWrapp animate={toggle ? 'opened' : 'closed'} variants={center}>
                        <BarCenter width={toggle ? '27px' : '20px'}></BarCenter>
                    </BarMotionWrapp>
                    <BarMotionWrapp animate={toggle ? 'opened' : 'closed'} variants={bottom}>
                        <BarBottom width={toggle ? '27px' : '15px'}></BarBottom>
                    </BarMotionWrapp>
                </MenuBars>
                <Link href="/" passHref>
                    <a className="link_logo">
                        <LogoWrapper src="/marca2.png" alt="Logo Movete por La Rioja" />
                    </a>
                </Link>

                <MenuWrapper>
                    <FirstMenu>
                        <Link href="/">
                            <ATag alt="Link Inicio">
                                {' '}
                                <TiHome size="22px" /> INICIO{' '}
                            </ATag>
                        </Link>
                        <Link href="/semana-santa">
                            <ATag alt="Link Semana Santa">
                                <TiFeather size="22px" /> SEMANA SANTA{' '}
                            </ATag>
                        </Link>
                        <Link href="/preguntas-frecuentes">
                            <ATag alt="Link Preguntas Frecuentes">
                                {' '}
                                <TiInfoLargeOutline size="22px" /> PREGUNTAS FRECUENTES{' '}
                            </ATag>
                        </Link>
                        <ATag alt="Link Previaje" href="https://www.previaje.gob.ar/" target="_blank">
                            {' '}
                            <TiLightbulb size="22px" />
                            PREVIAJE{' '}
                        </ATag>
                        <Link href="/contacto">
                            <ATag alt="Link Contacto" onMouseEnter={handleContacto} onMouseLeave={handleContacto}>
                                {' '}
                                <TiMessages size="22px" /> CONTACTO{' '}
                            </ATag>
                        </Link>

                        {showContacto && router && router.pathname != '/contacto' ? (
                            <ContactoModal>
                                <Item>
                                    <FaMapMarkerAlt size="22px" color="#44090f" />
                                    <p>Av.Ortíz de Ocampo y Av. Mártires de la Dictadura</p>
                                </Item>
                                <Item>
                                    <FaRegEnvelope size="22px" color="#44090f" />
                                    <p> info.moveteporlarioja@gmail.com</p>
                                </Item>
                                <Item>
                                    <FaWhatsapp size="22px" color="#44090f" />
                                    <p> 380-154505808 </p>
                                </Item>
                                <Item>
                                    <FaPhone size="22px" color="#44090f" />
                                    <p> (380) 4426345 </p>
                                </Item>
                            </ContactoModal>
                        ) : (
                            ''
                        )}
                    </FirstMenu>
                </MenuWrapper>
                {toggle ? (
                    <LateralMenu ref={menuref}>
                        <LateralWrapp>
                            <Link href="/" passHref>
                                <a alt="Link Inicio">
                                    {' '}
                                    <TiHome size="22px" /> Inicio
                                </a>
                            </Link>
                            <Link href="/semana-santa" passHref>
                                <a alt="Link Semana Santa">
                                    {' '}
                                    <TiFeather size="22px" /> Semana Santa
                                </a>
                            </Link>
                            <Link href="/preguntas-frecuentes" passHref>
                                <a alt="Link Preguntas Frecuentes">
                                    <TiInfoLargeOutline size="22px" /> Preguntas frecuentes
                                </a>
                            </Link>
                            <a href="https://www.previaje.gob.ar/" target="_blank" alt="Link previaje">
                                <TiLightbulb size="22px" /> Previaje
                            </a>
                            <Link href="/contacto" passHref>
                                <a alt="Link contacto">
                                    <TiMessages size="22px" /> Contacto
                                </a>
                            </Link>
                        </LateralWrapp>
                    </LateralMenu>
                ) : (
                    ''
                )}
            </HeaderWrapper>
        </React.Fragment>
    );
};

export default Header;

export const HeaderWrapper = styled.div`
padding:0% 7% 0% 7%;
top:6vh;
width:100%;
position:absolute;
justify-items: center;
grid-row-gap:5vh;
box-sizing:border-box;
background:none;
display:grid;
z-index:100;
align-items:center;
}
// -webkit-box-shadow: 0px 3px 5px -2px rgba(0,0,0,0.75);
// -moz-box-shadow: 0px 3px 5px -2px rgba(0,0,0,0.75);
// box-shadow: 0px 3px 5px -2px rgba(0,0,0,0.75);
@media (max-width: 600px) {
    grid-template-columns:1fr 1fr;
    grid-row-gap:1vh;
    height:auto;
    padding:3% 8% 3% 8%;
    top:5vh;
    position:fixed;
    background:white;
    top:0;
    }
  .link_logo{
    z-index:10;
  }
`;
export const LogoWrapper = styled.img`
    margin: 0;
    max-width: 18vw;
    cursor: pointer;
    @media (max-width: 600px) {
        max-width: 45vw;
        z-index: 100;
    }
`;
export const MenuWrapper = styled.div`
    display: grid;
    width: 90%;
    grid-column-gap: 2vw;
    align-items: center;
    @media (max-width: 600px) {
        display: none;
    }
`;
export const ATag = styled.a`
    padding: 8px;
    border-radius: 30px;
    border: 1px solid transparent;
    display: grid;
    justify-content: center;
    display: grid;
    grid-template-columns: 3vw 1fr;
    height: fit-content;
    color: white;
    font-weight: 700;
    user-select: none;
    transition: 0.3s;
    justify-items: center;
    font-size: ${(props) => (props.size ? props.size : '0.8em')};
    font-family: 'Open Sans', sans-serif;
    &:hover {
        color: white;
        border: 1px solid white;
    }
`;
export const CarritoWrapper = styled.div`
    display: flex;
    justify-content: space-around;
`;
export const AuthWrapper = styled.div`
    display: flex;
    justify-content: space-around;
`;
export const PTag = styled.p`
    font-family: 'Open Sans', sans-serif;
    font-size: ${(props) => (props.size ? props.size : '0.8rem')};
    color: ${(props) => (props.color ? props.color : '#333')};
`;
export const SecondMenu = styled.div`
    justify-content: end;
    display: grid;
    grid-column-gap: 2vw;
    align-items: center;
    grid-template-columns: 6vw 7vw;
    @media (max-width: 600px) {
        display: none;
    }
`;
export const FirstMenu = styled.div`
    display: flex;
    justify-content: space-around;
    @media (max-width: 600px) {
        flex-direction: column;
        height: 27vh;
    }
`;
export const HeadUserInfo = styled.p`
    font-family: 'Open Sans', sans-serif;
    color: #333;
    font-weight: 600;
    margin: 0 -2vw 0 -3vw;
    font-size: 0.8rem;
`;
export const ContactoModal = styled.div`
    background: #ffffffb0;
    position: absolute;
    width: fit-content;
    height: fit-content;
    top: 25vh;
    z-index: 3000;
    right: 11vw;
    padding: 10px;
    border-radius: 6px;
    display: grid;
    @media (max-width: 600px) {
        display: none;
    }
`;
export const Item = styled.div`
    display: grid;
    grid-template-columns: 2vw 1fr;
    justify-content: space-around;
    width: 100%;
    align-items: center;
    p {
        font-family: 'Karla', sans-serif;
        color: #41060c;
        font-weight: 600;
        font-size: 0.7rem;
    }
`;
export const MenuBars = styled.div`
    display: none;
    height: 3vh;
    align-items: center;
    cursor: pointer;
    @media (max-width: 600px) {
        display: grid;
        grid-template-rows: auto auto auto;
        grid-row-gap: 0.5vh;
        justify-self: baseline;
    }
`;
export const BarTop = styled.div`
    background: #41060c;
    height: 3px;
    width: 33px;
    border-radius: 2px;
    transform-origin: 0.75px 4px;
`;

export const BarCenter = styled.div`
    background: #41060c;
    height: 3px;
    width: 33px;
    border-radius: 2px;
`;

export const BarBottom = styled.div`
    background: #41060c;
    height: 3px;
    width: 33px;
    border-radius: 2px;
    transform-origin: 0.75px 4px;
`;
export const BarMotionWrapp = styled(motion.div)`
    transform-origin: 0.75px 4px;
`;
export const LateralMenu = styled(motion.div)`
    @media (max-width: 600px) {
        display: grid;
    }
    display: none;
    width: 60vw;
    background: white;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    padding: 30% 0% 0 0%;
`;
export const LateralWrapp = styled.div`
    width: 100%;
    display: grid;
    height: 30vh;
    flex-direction: column;
    a {
        color: #41060c;
        font-family: 'Karla', sans-serif;
        font-weight: 600;
        display: grid;
        grid-template-columns: 30px 1fr;
        align-items: center;
        border-bottom: 1px solid #dedede;
        padding: 6%;
    }
`;
// &::after{
//     content: "";
//     position: absolute;
//     left: 0;
//     right: 0;
//     top: 100%;
//     height: 4px;
//     background: linear-gradient(180deg,rgba(9,30,66,0.13) 0,rgba(9,30,66,0.13) 1px,rgba(9,30,66,0.08) 1px,rgba(9,30,66,0) 4px);
// }
