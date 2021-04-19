import { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { FaPhone, FaWhatsapp, FaRegEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Accordion, Collapse, Card, Toggle } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import AccordionContext from 'react-bootstrap/AccordionContext';
import 'bootstrap/dist/css/bootstrap.min.css';

export const MainWrapper = styled.div`
    padding: 0px 0px 0px 0px;
    box-sizing: border-box;
    min-heigth: 120vh;
`;
export const ContactoWrapper = styled.div`
    padding: 10% 2% 2% 2%;
    background: #f1f1f1;
`;

const Contacto = () => {
    function ContextAwareToggle({ children, eventKey, callback }) {
        const currentEventKey = useContext(AccordionContext);

        const decoratedOnClick = useAccordionToggle(eventKey, () => callback && callback(eventKey));

        const isCurrentEventKey = currentEventKey === eventKey;

        return (
            <ButtonFAQ
                color={isCurrentEventKey ? '#41060c' : '#333'}
                onClick={decoratedOnClick}
                alt="Botón para desplegar la pregunta frecuente"
            >
                {children}
                <DobleFlecha src="/dobleflecha.png" rotate={isCurrentEventKey ? true : false} alt="Imagen flecha" />
            </ButtonFAQ>
        );
    }

    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    function isEmailValid(email) {
        if (!email) return false;

        if (email.length > 254) return false;

        var valid = emailRegex.test(email);
        if (!valid) return false;

        // Further checking of some things regex can't handle
        var parts = email.split('@');
        if (parts[0].length > 64) return false;

        var domainParts = parts[1].split('.');
        if (
            domainParts.some(function (part) {
                return part.length > 63;
            })
        )
            return false;

        return true;
    }

    const inputname = useRef(null);
    const inputemail = useRef(null);
    const inputmensaje = useRef(null);
    const [loading, setLoading] = useState(false);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [message, setMessage] = useState({ color: 'tomato', content: '' });
    const [disable, setDisable] = useState(false);

    const sendMessage = async () => {
        if (nombre == '' || email == '' || mensaje == '') {
            if (nombre == '') {
                inputname.current.style.border = '1px solid tomato';
            }
            if (email == '') {
                inputemail.current.style.border = '1px solid tomato';
            }
            if (mensaje == '') {
                inputmensaje.current.style.border = '1px solid tomato';
            }
            setMessage({ color: 'tomato', content: 'Rellene todos los campos por favor.' });
            setTimeout(() => {
                setMessage({ color: 'tomato', content: '' });
                inputname.current.style.border = '1px solid #d4d4d4';
                inputemail.current.style.border = '1px solid #d4d4d4';
                inputmensaje.current.style.border = '1px solid #d4d4d4';
            }, 3000);
            return;
        }
        if (!isEmailValid(email)) {
            inputemail.current.style.border = '1px solid tomato';
            setMessage({ color: 'tomato', content: 'Ingrese un email válido por favor.' });
            setTimeout(() => {
                setMessage({ color: 'tomato', content: '' });
                inputname.current.style.border = '1px solid #d4d4d4';
                inputemail.current.style.border = '1px solid #d4d4d4';
                inputmensaje.current.style.border = '1px solid #d4d4d4';
            }, 3000);
            return;
        }
        setLoading(true);
        let info = {
            nombre,
            email,
            mensaje,
        };

        let formdata = JSON.stringify({ info });
        let response = await fetch(`https://www.lrseguridad.com.ar/turismorest/public/api/contacto`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, email, mensaje }),
        });
        let data = await response.json();
        setLoading(false);
        if (data.res) {
            setNombre('');
            setEmail('');
            setMensaje('');
            setMessage({
                color: '#00bb46',
                content: 'Se registró tu mensaje. En breve te contactaremos por correo electrónico.',
            });
            setDisable(true);
        } else {
            setMessage({ color: 'tomato', content: 'Algo salió mal. Intente nuevamente.' });
        }
    };

    return (
        <MainWrapper>
            <Layout title={'Contacto - Movete por La Rioja'}>
                <IndexWrapper>
                    <FirstBlock src="back1.jpg" alt="Imagen fondo en página contacto">
                        <WhiteBack src="/whitebackground.png" alt="Imagen estilo recorte papel" />
                        <ContactoItems>
                            <MoveteImg src="/movetev2.png" alt="Logo movete" />
                            <ContactoIntro>
                                <h2> Contacto</h2>
                                <p>
                                    {' '}
                                    En este sector encuentras nuestros medios de comunicación y también puedes enviarnos
                                    un mensaje directo que será respondido a la mayor brevedad posible a los medios que
                                    dispongas.
                                </p>
                            </ContactoIntro>
                            <TelefonosWrapper>
                                <Item>
                                    <FaMapMarkerAlt size="30px" color="#44090f" />
                                    <p> Av.Ortíz de Ocampo y Av. Mártires de la Dictadura</p>
                                </Item>
                                <Item>
                                    <FaRegEnvelope size="30px" color="#44090f" />
                                    <p> info.moveteporlarioja@gmail.com</p>
                                </Item>
                                <Item>
                                    <FaWhatsapp size="30px" color="#44090f" />
                                    <p> 380-154505808 </p>
                                </Item>
                                <Item>
                                    <FaPhone size="30px" color="#44090f" />
                                    <p> (380) 4426345 </p>
                                </Item>
                            </TelefonosWrapper>
                            <FormaWrapper>
                                <InputWrapper>
                                    <input
                                        ref={inputname}
                                        name="nombre"
                                        type="text"
                                        placeholder="Nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                    <input
                                        ref={inputemail}
                                        name="email"
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </InputWrapper>
                                <textarea
                                    ref={inputmensaje}
                                    name="mensaje"
                                    placeholder="Mensaje"
                                    value={mensaje}
                                    onChange={(e) => setMensaje(e.target.value)}
                                />
                                <ButtonSend
                                    disab={disable}
                                    disabled={disable}
                                    onClick={sendMessage}
                                    alt="Botón enviar mensaje"
                                >
                                    {' '}
                                    {loading ? 'loading' : 'ENVÍAR'}
                                </ButtonSend>
                                <Mensaje color={message.color}> {message.content} </Mensaje>
                            </FormaWrapper>
                            <Sociales>
                                <a
                                    href="https://www.facebook.com/turismolarioja"
                                    target="_blank"
                                    alt="Link Facebook Turismo La Rioja"
                                >
                                    {' '}
                                    <img src="/f.png" alt="Imagen Logo Facebook" />{' '}
                                </a>
                                <a
                                    href="https://instagram.com/turismolarioja?igshid=tp19m2c8fi36"
                                    target="_blank"
                                    alt="Link Instagram Turismo La Rioja"
                                >
                                    {' '}
                                    <img src="/i.png" alt="Imagen Logo Instagram" />{' '}
                                </a>
                                <a
                                    href="https://twitter.com/SecTurLaRioja?s=08"
                                    target="_blank"
                                    alt="Link Twitter Turismo La Rioja"
                                >
                                    {' '}
                                    <img src="/t.png" alt="Imagen Logo Twitter" />{' '}
                                </a>
                                <a
                                    href="https://www.youtube.com/user/turismolarioja"
                                    target="_blank"
                                    alt="Link Youtube Turismo La Rioja"
                                >
                                    {' '}
                                    <img src="/y.png" alt="Imagen Logo Youtube" />{' '}
                                </a>
                                <a
                                    href="mailto: info.moveteporlarioja@gmail.com"
                                    target="_blank"
                                    alt="Link Email Turismo La Rioja"
                                >
                                    {' '}
                                    <img src="/gm.png" alt="Imagen Logo Gmail" />{' '}
                                </a>
                                <a
                                    href="https://wa.me/message/WPUKLGW6MADYP1"
                                    target="_blank"
                                    alt="Link WhatsApp Turismo La Rioja"
                                >
                                    {' '}
                                    <img src="/w.png" alt="Imagen Logo WhatsApp" />{' '}
                                </a>
                            </Sociales>
                        </ContactoItems>
                    </FirstBlock>
                    <PregFreq>
                        <Cascada>
                            <LogoWrapperCorredor src="/icono_frecuentes.png" alt="Imagen Preguntas Frecuentes" />
                            <Accordion defaultActiveKey="0">
                                <Card>
                                    <ContextAwareToggle eventKey="0"> ¿Por qué viajar con Movete?</ContextAwareToggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body as={BodyFAQ}>
                                            Movete por La Rioja te ofrece precios promocionales de paquetes, alojamiento
                                            y excursiones para viajar por la provincia de La Rioja.
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
                                            Ingresa a www.movete.larioja.gob.ar, selecciona el viaje que desees y
                                            contacta a la agencia de viaje para finalizar la compra.
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
                                            enviando un email para reservar. Esto generará tu código de viaje que
                                            recibirás en la casilla de tu email.
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <ContextAwareToggle eventKey="3">
                                        ¿Cuánto tiempo dura mi código de viaje?
                                    </ContextAwareToggle>
                                    <Accordion.Collapse eventKey="3">
                                        <Card.Body as={BodyFAQ}>
                                            El código de viaje tiene un tiempo de duración de 48 hs, es decir tenes dos
                                            días para contactar la agencia y comprar tu viaje.
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <ContextAwareToggle eventKey="4">
                                        ¿Qué sucede si vence el tiempo de mi código de viaje?
                                    </ContextAwareToggle>
                                    <Accordion.Collapse eventKey="4">
                                        <Card.Body as={BodyFAQ}>
                                            Podés generar uno nuevamente ingresando a la web y contactando a la agencia
                                            de viaje.
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <ContextAwareToggle eventKey="5">¿Cómo pago mi viaje?</ContextAwareToggle>
                                    <Accordion.Collapse eventKey="5">
                                        <Card.Body as={BodyFAQ}>
                                            Podés abonar con todos los medios de pago que habilita la agencia de viajes:
                                            contado, efectivo, tarjeta de crédito, tarjeta de débito, entre otros. Si
                                            sos empleado público podes acceder al beneficio de descuento por planilla.
                                            <br />
                                            <b>IMPORTANTE:</b> si contás con la tarjeta de crédito del Banco Rioja podes
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
                                            Podés acercarte al Banco Rioja ubicado en Av. Rivadavia y esq. San Martín
                                            para solicitar la tarjeta de crédito. O bien, podés solicitarla desde el
                                            siguiente link:
                                            <a
                                                href="https://bancorioja.com.ar/personas/tarjetas/credito-MasterCard"
                                                target="_blank"
                                                alt="Link para solicitar tarjeta de crédito del Banco Rioja"
                                            >
                                                {' '}
                                                Solicitar tarjeta{' '}
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
                                            Los niños hasta los 2 años de edad, no pagan el servicio. Hasta los 10 años
                                            de edad tienen un descuento del 25% en la compra del servicio.
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <ContextAwareToggle eventKey="8">
                                        ¿Puedo realizar el viaje en mi auto particular?
                                    </ContextAwareToggle>
                                    <Accordion.Collapse eventKey="8">
                                        <Card.Body as={BodyFAQ}>
                                            Si, con Movete podes comprar paquetes con traslados, alojamiento y
                                            excusiones incluidas. También podes contratar servicios de forma individual.
                                            Comprando alojamiento únicamente no accederemos al precio promocional. Es
                                            obligatoria la compra de una excursión como mínimo para acceder al
                                            beneficio.
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <ContextAwareToggle eventKey="9">
                                        ¿Puedo hacer la compra con Previaje?
                                    </ContextAwareToggle>
                                    <Accordion.Collapse eventKey="9">
                                        <Card.Body as={BodyFAQ}>
                                            La agencia a la cual compras tu viaje, si está registrada en Pre Viaje,
                                            podes cargar la factura en www.previaje.gob.ar y obtener el descuento del
                                            50%. Ver los términos y condiciones en la web de previaje.
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
                                    <ContextAwareToggle eventKey="11">
                                        ¿Cuidados al momento de viajar?
                                    </ContextAwareToggle>
                                    <Accordion.Collapse eventKey="11">
                                        <Card.Body as={BodyFAQ}>
                                            Pensamos en tu bienestar y queremos que tengas una buena experiencia de
                                            viaje. Por ello aquí te adjuntamos recomendaciones a seguir:
                                            <Afiches>
                                                <AficheIMG
                                                    src="/afiche1.jpg"
                                                    alt="Imagen afiche 1 recomendaciones COVID"
                                                />
                                                <AficheIMG
                                                    src="/afiche2.jpg"
                                                    alt="Imagen afiche 2 recomendaciones COVID"
                                                />
                                            </Afiches>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Cascada>
                    </PregFreq>
                </IndexWrapper>
            </Layout>
        </MainWrapper>
    );
};

export default Contacto;

export const IndexWrapper = styled.div`
    display: grid;
    padding: 0% 0% 2% 0%;
    background: white;
    heigth: fit-content;
    @media (max-width: 600px) {
        padding: 2% 3% 3% 3%;
    }
`;
export const MoveteImg = styled.img`
    width: 30%;
    justify-self: center;
    z-index: 90;
    align-self: center;
    @media (max-width: 600px) {
        width: 78%;
        margin: 0 14vw 0 0;
        top: 10%;
    }
`;
export const WhiteBack = styled.img`
    position: absolute;
    bottom: 0;
`;
export const FirstBlock = styled.div`
    background-image: url('/${(props) => props.src}');
    background-size: cover;
    background-position: center;
    width: 100%;
    display: grid;
    grid-template-rows: 1fr 80vh;
    height: 200vh;
    position: relative;
`;
export const ContactoIntro = styled.div`
    height: 26vh;
    align-items: center;
    flex-direction: column;
    justify-self: center;
    width: 50vw;
    text-align: center;
    display: flex;
    h2 {
        font-family: 'Karla', sans-serif;
        margin: 0;
        color: #41060c;
    }
    p {
        font-family: 'Karla', sans-serif;
        margin: 0;
        color: #41060c;
    }
    @media (max-width: 600px) {
        height: fit-content;
        width: 80vw;
    }
`;
export const TelefonosWrapper = styled.div`
    justify-content: space-around;
    display: flex;
    justify-self: center;
    width: 85%;
    margin: 1% 0 5% 0;
    @media (max-width: 600px) {
        flex-direction: column;
        margin: 10% 0 5% 0;
    }
`;
export const Item = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        font-family: 'Karla', sans-serif;
        color: #41060c;
        font-weight: 600;
    }
`;
export const FormaWrapper = styled.div`
    width: 50vw;
    padding: 40px;
    background: white;
    display: grid;
    justify-self: center;
    grid-row-gap: 2vh;
    textarea {
        transition: 0.3s;
        background: none;
        border: 1px solid #d4d4d4;
        padding: 10px;
        height: 20vh;
        font-family: 'Karla', sans-serif;
    }
    @media (max-width: 600px) {
        top: 83%;
        width: 85vw;
    }
`;
export const ButtonSend = styled.button`
    line-height: 1;
    position: relative;
    background: ${(props) => (props.disab ? '#b6b6b6' : 'tomato')};
    padding: 8px;
    cursor: pointer;
    justify-self: end;
    font-family: 'Karla', sans-serif;
    color: white;
    font-weight: 600;
    width: fit-content;
    height: 5vh;
    border: none;
    font-size: 0.8rem;
`;
export const InputWrapper = styled.div`
    display: grid;
    justify-content: space-around;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1vw;
    width: 100%;
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        grid-row-gap: 1vh;
    }
    input {
        transition: 0.3s;
        background: none;
        font-family: 'Karla', sans-serif;
        width: 100%;
        height: 6vh;
        padding: 10px;
        border: 1px solid #d4d4d4;
        @media (max-width: 600px) {
            width: 65vw;
        }
    }
`;
export const Sociales = styled.div`
    margin: 3% 0 0 0;
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
        width: 70%;
        display: none;
    }
`;
export const Mensaje = styled.p`
    font-family: 'Karla', sans-serif;
    position: absolute;
    bottom: -1vh;
    left: 3vw;
    color: ${(props) => props.color};
`;
export const ContactoItems = styled.div`
    position: absolute;
    display: grid;
    top: 30vh;
    @media (max-width: 600px) {
        top: 14vh;
    }
`;
export const PregFreq = styled.div`
    height: fit-content;
    padding: 1vw 4vw 4vw 4vw;
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
