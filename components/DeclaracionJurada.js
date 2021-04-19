import { useState } from 'react';
import styled from 'styled-components';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaWhatsapp } from 'react-icons/fa';

const DeclaracionJurada = () => {
    return (
        <Wrapper
            href="https://docs.google.com/forms/d/e/1FAIpQLSeggypzmNhXpSj35xLkuhKrA_ujbChZHt_3yzMa6nsc8y9kwA/viewform"
            target="_blank"
            alt="Link para ir al formulario de declaración jurada de la provincia de La Rioja"
        >
            <p className="ddjj-wide"> DDJJ DE CIRCULACIÓN</p>
        </Wrapper>
    );
};

export default DeclaracionJurada;

export const Wrapper = styled.a`
    position: fixed;
    right: 2vw;
    bottom: 14vh;
    z-index: 1000;
    border-radius: 100%;
    align-items: center;
    @media (max-width: 600px) {
        width: fit-content;
        left: 20vw;
        bottom: 12vh;
        justify-content: flex-end;
    }
    .ddjj-wide {
        font-family: 'Karla', sans-serif;
        color: white;
        background: #380206;
        padding: 6px;
        margin: 0 -5% 0 -47px;
        z-index: -1;
        border-radius: 6px;
        font-weight: 600;
        @media (max-width: 600px) {
            padding: 5px;
            font-size: 0.8em;
        }
    }
    .ddjj-mobile {
        display: none;
        font-family: 'Karla', sans-serif;
        color: white;
        background: #380206;
        padding: 8px;
        margin: 0 -5% 0 -47px;
        z-index: -1;
        border-radius: 20px;
        font-weight: 600;
        @media (max-width: 600px) {
            display: block;
        }
    }
`;
