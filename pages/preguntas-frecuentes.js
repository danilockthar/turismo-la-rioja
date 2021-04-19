import { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
// import { Collapse, Text } from '@zeit-ui/react'
import { Accordion, Collapse, Card, Toggle } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import AccordionContext from 'react-bootstrap/AccordionContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Faq = () => {
    function ContextAwareToggle({ children, eventKey, callback }) {
        const currentEventKey = useContext(AccordionContext);

        const decoratedOnClick = useAccordionToggle(eventKey, () => callback && callback(eventKey));

        const isCurrentEventKey = currentEventKey === eventKey;

        return (
            <ButtonFAQ
                color={isCurrentEventKey ? '#41060c' : '#333'}
                onClick={decoratedOnClick}
                alt="Botón desplegar pregunta frecuente"
            >
                {children}
                <DobleFlecha
                    src="/dobleflecha.png"
                    rotate={isCurrentEventKey ? true : false}
                    alt="Imagen flecha preguntas frecuentes"
                />
            </ButtonFAQ>
        );
    }

    return (
        <MainWrapper>
            <Layout title={'Preguntas frecuentes - Movete por La Rioja'}>
                <MainBlock src="back_frecuentes.jpg"></MainBlock>
                <CascadaBlock>
                    <Cascada>
                        <LogoWrapperCorredor src="/icono_frecuentes.png" />
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <ContextAwareToggle eventKey="0"> ¿Por qué viajar con Movete?</ContextAwareToggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body as={BodyFAQ}>
                                        Movete por La Rioja te ofrece precios promocionales de paquetes, alojamiento y
                                        excursiones para viajar por la provincia de La Rioja.
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <ContextAwareToggle eventKey="1">
                                    {' '}
                                    ¿Cómo hago para comprar un viaje?{' '}
                                </ContextAwareToggle>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body as={BodyFAQ}>
                                        Ingresá a www.movete.larioja.gob.ar, seleccioná el viaje que desees y contactá a
                                        la agencia de viaje para finalizar la compra.
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <ContextAwareToggle eventKey="2">
                                    {' '}
                                    ¿Cómo contacto a la agencia de viajes?
                                </ContextAwareToggle>
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body as={BodyFAQ}>
                                        Una vez seleccionado el viaje, tendrás la posibilidad de ver cuáles son las
                                        distintas agencias y que ofrecen. Al elegir la agencia podrás contactarla
                                        enviando un email para reservar. Esto generará tu código de viaje que recibirás
                                        en la casilla de tu email.
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <ContextAwareToggle eventKey="3">
                                    ¿Cuánto tiempo dura mi código de viaje?
                                </ContextAwareToggle>
                                <Accordion.Collapse eventKey="3">
                                    <Card.Body as={BodyFAQ}>
                                        El código de viaje tiene un tiempo de duración de 48 hs, es decir tenés dos días
                                        para contactar la agencia y comprar tu viaje.
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <ContextAwareToggle eventKey="4">
                                    ¿Qué sucede si vence el tiempo de mi código de viaje?
                                </ContextAwareToggle>
                                <Accordion.Collapse eventKey="4">
                                    <Card.Body as={BodyFAQ}>
                                        Podés generar uno nuevamente ingresando a la web y contactando a la agencia de
                                        viaje.
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <ContextAwareToggle eventKey="5">¿Cómo pago mi viaje?</ContextAwareToggle>
                                <Accordion.Collapse eventKey="5">
                                    <Card.Body as={BodyFAQ}>
                                        Podés abonar con todos los medios de pago que habilita la agencia de viajes:
                                        contado, efectivo, tarjeta de crédito, tarjeta de débito, entre otros. Si sos
                                        empleado público podés acceder al beneficio de descuento por planilla.
                                        <br />
                                        <b>IMPORTANTE:</b> si contás con la tarjeta de crédito del Banco Rioja podés
                                        pagar hasta en 12 cuotas sin interés.
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <ContextAwareToggle eventKey="6">
                                    No tengo la tarjeta de crédito del Banco Rioja ¿Cómo la obtengo?
                                </ContextAwareToggle>
                                <Accordion.Collapse eventKey="6">
                                    <Card.Body as={BodyFAQ}>
                                        Podés acercarte al Banco Rioja ubicado en Av. Rivadavia y esq. San Martín para
                                        solicitar la tarjeta de crédito. O bien, podés solicitarla desde el siguiente
                                        link:
                                        <a
                                            href="https://bancorioja.com.ar/personas/tarjetas/credito-MasterCard"
                                            target="_blank"
                                            alt="Link para solicitar tarjeta de crédito del Banco Rioja"
                                        >
                                            {' '}
                                            Solicitar tarjeta.{' '}
                                        </a>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <ContextAwareToggle eventKey="7">
                                    ¿Qué pasa con los menores de edad o bebés?
                                </ContextAwareToggle>
                                <Accordion.Collapse eventKey="7">
                                    <Card.Body as={BodyFAQ}>
                                        Los niños hasta los 2 años de edad, no pagan el servicio. Hasta los 10 años de
                                        edad tienen un descuento del 25% en la compra del servicio.
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <ContextAwareToggle eventKey="8">
                                    ¿Puedo realizar el viaje en mi auto particular?
                                </ContextAwareToggle>
                                <Accordion.Collapse eventKey="8">
                                    <Card.Body as={BodyFAQ}>
                                        Si, con Movete podés comprar paquetes con traslados, alojamiento y excusiones
                                        incluidas. También podés contratar servicios de forma individual. Comprando
                                        alojamiento únicamente no accederemos al precio promocional. Es obligatoria la
                                        compra de una excursión como mínimo para acceder al beneficio.
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <ContextAwareToggle eventKey="9">
                                    ¿Puedo hacer la compra con Previaje?
                                </ContextAwareToggle>
                                <Accordion.Collapse eventKey="9">
                                    <Card.Body as={BodyFAQ}>
                                        La agencia a la cual comprás tu viaje, si está registrada en Pre Viaje, podés
                                        cargar la factura en{' '}
                                        <a
                                            href="https://www.previaje.gob.ar/"
                                            target="_blank"
                                            alt="Link a web de previaje.gob.ar"
                                        >
                                            {' '}
                                            www.previaje.gob.ar{' '}
                                        </a>{' '}
                                        y obtener el descuento del 50%. Ver los términos y condiciones en la web de
                                        previaje.
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <ContextAwareToggle eventKey="10">
                                    En caso de no poder viajar ¿Qué hago?
                                </ContextAwareToggle>
                                <Accordion.Collapse eventKey="10">
                                    <Card.Body as={BodyFAQ}>
                                        La fecha puede ser reprograma para que puedas realizar el viaje.
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <ContextAwareToggle eventKey="11">¿Cuidados al momento de viajar?</ContextAwareToggle>
                                <Accordion.Collapse eventKey="11">
                                    <Card.Body as={BodyFAQ}>
                                        Pensamos en tu bienestar y queremos que tengas una buena experiencia de viaje.
                                        Por ello aquí te adjuntamos recomendaciones a seguir:
                                        <Afiches>
                                            <AficheIMG src="/afiche1.jpg" alt="Imagen afiche 1 recomendación COVID" />
                                            <AficheIMG src="/afiche2.jpg" alt="Imagen afiche 2 recomendación COVID" />
                                        </Afiches>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Cascada>
                </CascadaBlock>
            </Layout>
        </MainWrapper>
    );
};

export default Faq;

export const MainWrapper = styled.div`
    padding: 0px 0px 0px 0px;
    box-sizing: border-box;
    min-height: 100vh;
`;
export const MainBlock = styled.div`
    width: 100%;
    height: 50vh;
    background-image: url('/${(props) => props.src}');
    background-position: inherit;
    background-size: cover;
`;
export const CascadaBlock = styled.div`
    height: fit-content;
    padding: 4vw;
    width: 100%;
    display: grid;
`;
export const Cascada = styled.div`
    display: grid;
    width: 90%;
    justify-self: center;
    height: fit-content;
    h5 {
        background: #eaeaea;
        font-family: 'Karla', sans-serif;
        display: grid;
        justify-content: center;
        align-content: center;
    }
    @media (max-width: 600px) {
        width: 100%;
    }
`;
export const LogoWrapperCorredor = styled.img`
    width: 12vw;
    justify-self: center;
    margin: 0 0 5% 0;
    @media (max-width: 600px) {
        margin: 15% 0 16% 0;
        width: 30vw;
    }
`;
export const ButtonFAQ = styled.p`
    font-family: 'Karla', sans-serif;
    color: ${(props) => props.color};
    font-weight: 600;
    cursor: pointer;
    padding: 0 2% 0 2%;
    font-size: 1.3em;
    &:hover {
        color: #41060c !important;
    }
`;
export const BodyFAQ = styled.p`
    font-family: 'Karla', sans-serif;
    font-size: 1.3rem;
    text-align: left;
    @media (max-width: 600px) {
        text-align: center;
    }
`;
export const DobleFlecha = styled.img`
    width: 1.4vw;
    transition: 0.3s;
    margin: 0 0% 0 3%;
    transform: ${(props) => (props.rotate ? 'rotate(-180deg)' : 'rotate(0deg)')};
    @media (max-width: 600px) {
        width: 3.5vw;
    }
`;
export const Afiches = styled.div`
    display: grid;
    justify-items: center;
`;
export const AficheIMG = styled.img`
    width: 60%;
`;
