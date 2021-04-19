import { useState } from 'react';
import styled from 'styled-components';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsApp = () => {
    return (
        <Wrapper
            href="https://wa.me/message/WPUKLGW6MADYP1"
            target="_blank"
            alt="Link ir al WhatsApp del ministerio de Turismo de la Rioja"
        >
            <img src="/icono_wsap.png" alt="Imagen logo WhatsApp" />
            <p> ¡Envianos un WhatsApp!</p>
        </Wrapper>
    );
};

export default WhatsApp;

export const Wrapper = styled.a`
position:fixed;
right:2vw;
bottom:2vh;
z-index:1000;
border-radius:100%;
display:flex;
justify-content:space-around;
align-items:center;
@media (max-width: 600px) {
    width:fit-content;
    left:3vw;
    justify-content:flex-end;
}
img{
  width:5vw;
  @media (max-width: 600px) {
    width:15vw;
}
}
p{
  font-family: 'Karla',sans-serif;
  color: white;
  background: #32ba46;
  padding: 13px 10px 13px 40px;
  margin: 0 -5% 0 -47px;
  z-index: -1;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  font-weight: 600;
  @media (max-width: 600px) {
    display:none;
}
}
}
`;
