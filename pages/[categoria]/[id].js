import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/Layout';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';
import { DatePicker } from 'antd';
import moment from 'moment';
import { shuffleArray } from '../../lib/shuffle';
import { MdPlace, MdKeyboardBackspace } from 'react-icons/md';
import { ContextState } from '../../context/global';
import { StepContext } from '../../context/steps';
import Reservas from '../../components/Reservas';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Accordion, Collapse, Card, Toggle } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import AccordionContext from 'react-bootstrap/AccordionContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import dynamic from 'next/dynamic';
import { FacebookShareButton, FacebookIcon, WhatsappIcon, WhatsappShareButton } from 'react-share';
import { Parallax } from 'react-scroll-parallax';
import GalleryBox from '../../components/GalleryBox';

const LeafletDynamic = dynamic(() => import('../../components/LeafletMap'), { ssr: false });

const Paquete = ({ data, gallery }) => {
    function ContextAwareToggle({ children, eventKey, callback }) {
        const currentEventKey = useContext(AccordionContext);

        const decoratedOnClick = useAccordionToggle(eventKey, () => callback && callback(eventKey));

        const isCurrentEventKey = currentEventKey === eventKey;

        return (
            <ButtonFAQ color={isCurrentEventKey ? '#41060c' : '#333'} onClick={decoratedOnClick}>
                {children}
                <DobleFlecha
                    src="/dobleflecha.png"
                    alt="Imagen de flecha para abrir la descripción del paquete al clickear."
                    rotation={isCurrentEventKey ? true : false}
                />
                <span> VER DESCRIPCIÓN </span>
            </ButtonFAQ>
        );
    }

    const router = useRouter();

    if (router.isFallback) {
        return (
            <MainWrapper>
                <Layout title={'Movete por La Rioja'}>
                    <ContentLoad>
                        <Loader
                            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                            type="TailSpin"
                            color="#00BFFF"
                            height={50}
                            width={50}
                        />
                    </ContentLoad>
                </Layout>
            </MainWrapper>
        );
    }

    const dateFormat = 'YYYY-MM-DD';

    const [step, setStep] = useContext(StepContext);
    const [itemCart, setItemCart] = useContext(ContextState);
    // const [data, setData] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [loadingEmpresa, setLoadingEmpresa] = useState(true);
    const [path, setPath] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addLoading, setAddLoading] = useState(false);
    const [showReservas, setShowReservas] = useState(false);
    const [infoReservas, setInfoReservas] = useState({});
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [startDate, setStartDate] = useState(moment(new Date(), dateFormat));
    const [endDate, setEndDate] = useState(moment(new Date(), dateFormat));
    const [desdeDate, setDesdeDate] = useState(moment(new Date(), dateFormat));
    const [verMas, setVerMas] = useState(false);
    const [hastaDate, setHastaDate] = useState(moment(new Date(), dateFormat));
    const [rangeDate, setRangeDate] = useState([]);
    const [personas, setPersonas] = useState(1);
    const [amountOnChange, setAmountOnChange] = useState(0);
    const { RangePicker } = DatePicker;

    // const callDispatch = () => {
    //   dispatch({
    //     type: 'SELECT_PACKAGE',
    //     data: {
    //         id: 2,
    //         tipo_paquete: 'HOTELES',
    //     }
    // });
    // }

    const openMap = () => {
        setIsMapOpen(!isMapOpen);
    };

    useEffect(() => {
        if (router && router.query.id) {
            const getIde = async (ide) => {
                const result = await fetch(
                    `https://www.lrseguridad.com.ar/turismorest/public/api/paquetes-publicos/${ide}`,
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                    },
                );
                const response = await result.json();
                return response;
            };
            const getEmpresas = async (idpack) => {
                const result = await fetch(
                    `https://www.lrseguridad.com.ar/turismorest/public/api/paquete-empresas/${idpack}`,
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                    },
                );
                const response = await result.json();
                return response;
            };
            const respons = getEmpresas(router.query.id).then((resp) => {
                setEmpresas(resp.empresas);
                setLoadingEmpresa(false);
            });
            setLoading(false);
        }
    }, [router && router.query.id]);

    const disabledDate = (current) => {
        // console.log('DISABLED DATE')
        const tooLate =
            current && current < moment(data && data.fecha_desde ? data.fecha_desde : new Date(), dateFormat);
        const tooEarly =
            current && current > moment(data && data.fecha_hasta ? data.fecha_hasta : new Date(), dateFormat);
        return tooEarly || tooLate;
    };

    const buyThisPackage = (idpaquete) => {
        // console.log(idpaquete)
    };
    const handleCantidadPeople = (value) => {
        if (value > 0) {
            setPersonas(value);
            // setAmountOnChange(value * data.precio)
        }
        return;
    };

    const handleClose = () => {
        setStep(1);
        setShowReservas(false);
        document.body.style.overflow = 'unset';
    };
    const openReservas = (agencia, precio) => {
        setInfoReservas({
            nombre: agencia.nombre,
            precio,
            idagencia: agencia.idagencia,
            idproducto: agencia.idproducto,
            idpaqueteturistico: agencia.idpaqueteturistico,
            tipo_producto: agencia.tipo_producto,
        });
        setShowReservas(true);
        document.body.style.overflow = 'hidden';
    };

    // {message: "syntax error, unexpected ')', expecting ']'", exception: "ParseError", file: "/var/www/html/turismorest/app/Http/Controllers/PaqueteTuristicoController.php", line: 212, trace: Array(34)} "rest paqete"

    if (loading) {
        return (
            <MainWrapper>
                <Layout title={'Movete por La Rioja'}>
                    <ContentLoad>
                        <Loader
                            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                            type="TailSpin"
                            color="#00BFFF"
                            height={50}
                            width={50}
                        />
                    </ContentLoad>
                </Layout>
            </MainWrapper>
        );
    }
    return (
        <MainWrapper>
            <Layout
                title={data && data.nombre_producto + '- Movete por la Rioja'}
                optitle={data && data.nombre_producto}
                opimage={data && `https://www.lrseguridad.com.ar/turismo/1.0/${data.path}`}
            >
                <Reservas handleClose={handleClose} showReservas={showReservas} agencia={infoReservas} />

                <Content>
                    {/* {console.log(data , 'LENGTH ')} */}
                    {data ? (
                        <>
                            <LeafletDynamic
                                openMap={openMap}
                                isOpen={isMapOpen}
                                latitud={data.latitud !== null ? data.latitud : -29.4131}
                                longitud={data.longitud !== null ? data.longitud : -66.8558}
                            />
                            <Parallax className="custom-class" y={[-15, 12]} tagOuter="figure">
                                <MainBackground
                                    src={`https://www.lrseguridad.com.ar/turismo/1.0/${data.path}`}
                                    alt="Imagen portada del paquete seleccionado."
                                ></MainBackground>
                            </Parallax>
                            <WhiteBack src="/whitebackground.png" alt="Textura papel blanco sobre imagen portada." />
                            <MainProduct>
                                <h1 className="title_id"> {data.nombre_producto} </h1>
                                <h4 className="corredor_id">
                                    {' '}
                                    <MdPlace color="#ff8f03" size="30px" /> {data.localidad}{' '}
                                    <SeeMap onClick={openMap}>Ver ubicación en el mapa</SeeMap>
                                </h4>
                                <ShareButtons>
                                    <FacebookShareButton
                                        url={`https://movete.larioja.gob.ar${router && router.asPath}`}
                                        alt="Botón de compartir en Facebook"
                                        children={
                                            <ShareButton back="#3b5998">
                                                <FacebookIcon size="30px" round /> Compartir
                                            </ShareButton>
                                        }
                                    />
                                    <WhatsappShareButton
                                        url={`https://movete.larioja.gob.ar${router && router.asPath}`}
                                        alt="Botón de compartir en WhatsApp"
                                        children={
                                            <ShareButton back="#25d366">
                                                <WhatsappIcon size="30px" round />
                                                Compartir
                                            </ShareButton>
                                        }
                                    />
                                </ShareButtons>
                                <DescriptionResponsive>
                                    <AcordionWrapper>
                                        <Accordion>
                                            <Card>
                                                <ContextAwareToggle eventKey="0"> </ContextAwareToggle>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body as={BodyFAQ}>
                                                        {ReactHtmlParser(data.descripcion_detallada)}
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                    </AcordionWrapper>
                                </DescriptionResponsive>
                                <GalleryAndMap>
                                    {/* gallery */}
                                    <GalleryBox gallery={gallery} />

                                    {/* MAPA */}
                                </GalleryAndMap>

                                <SubtitleWrap>
                                    <Underline />
                                </SubtitleWrap>
                                <EmpresasBlock grid={empresas.length > 0}>
                                    {loadingEmpresa ? (
                                        <Loader
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%,-50%)',
                                            }}
                                            type="TailSpin"
                                            color="#00BFFF"
                                            height={50}
                                            width={50}
                                        />
                                    ) : empresas.length > 0 ? (
                                        shuffleArray(empresas).map((item, index) => {
                                            return (
                                                <EmpresaBox key={index}>
                                                    {item.cantidad_noche >= 1 && (
                                                        <NochesAmount>
                                                            {' '}
                                                            {item.cantidad_noche >= 1 &&
                                                                item.cantidad_noche} <br />{' '}
                                                            {item.cantidad_noche > 1 ? (
                                                                <span>NOCHES</span>
                                                            ) : item.cantidad_noche === 0 ? (
                                                                ''
                                                            ) : (
                                                                <span>NOCHE</span>
                                                            )}{' '}
                                                        </NochesAmount>
                                                    )}
                                                    <ImgDiv
                                                        img={
                                                            item.logo_agencia != null
                                                                ? `https://www.lrseguridad.com.ar/turismo/1.0/archivos//${item.logo_agencia}`
                                                                : `https://www.lrseguridad.com.ar/turismo/1.0/${item.path}`
                                                        }
                                                        alt="Logo de la agencia."
                                                    />
                                                    <EmpresaInfo>
                                                        <div className="empresa_first">
                                                            <TitleEmpresa> {item.agencia} </TitleEmpresa>
                                                            <PrecioEmpresa>
                                                                {' '}
                                                                <span> {item.precio_formateado} </span>por persona.
                                                            </PrecioEmpresa>
                                                            <Salidas> Consultar fechas disponibles.</Salidas>
                                                        </div>
                                                        <button
                                                            alt="Botón para solicitar el código de descuento del paquete."
                                                            onClick={() =>
                                                                openReservas(
                                                                    {
                                                                        nombre: item.agencia,
                                                                        idagencia: item.id_agencia,
                                                                        idproducto: item.id_producto,
                                                                        idpaqueteturistico: item.id_paquete_turistico,
                                                                        tipo_producto: data.tipo_producto,
                                                                    },
                                                                    item.precio,
                                                                )
                                                            }
                                                        >
                                                            {' '}
                                                            GENERAR CÓDIGO DE DESCUENTO
                                                        </button>
                                                    </EmpresaInfo>
                                                </EmpresaBox>
                                            );
                                        })
                                    ) : (
                                        <NoEmpresasYet>
                                            <h2> Este paquete aún no tiene agencias de viajes designadas. </h2>
                                            <Link href="/" passHref>
                                                <a alt="Botón de volver hacia atrás">
                                                    {' '}
                                                    <MdKeyboardBackspace size="1.5rem" /> VOLVER ATRÁS
                                                </a>
                                            </Link>
                                        </NoEmpresasYet>
                                    )}
                                </EmpresasBlock>
                            </MainProduct>
                        </>
                    ) : (
                        <h1> No se encontraron resultados para este paquete.</h1>
                    )}
                </Content>
            </Layout>
        </MainWrapper>
    );
};

export default Paquete;

export async function getStaticPaths() {
    const response = await fetch(`https://www.lrseguridad.com.ar/turismorest/public/api/paquetepublicos`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return {
        paths: data.map(({ id_paquete_turistico, tipo_producto }) => ({
            params: { categoria: tipo_producto, id: '15' },
        })),
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    const response = await fetch(
        `https://www.lrseguridad.com.ar/turismorest/public/api/paquetes-publicos/${params.id}`,
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
    );
    const data = await response.json();
    return {
        props: { data: data.paquete[0], gallery: data.paths },
        revalidate: 10,
    };
}

export const MainBackground = styled.div`
    background-image: url('${(props) => props.src}');
    background-size: cover;
    background-position: center;
    width: 100%;
    display: grid;
    grid-template-rows: 1fr 80vh;
    height: 85vh;
    position: relative;
    @media only screen and (max-width: 600px) {
        height: 60vh;
    }
`;
export const DescModal = styled.div`
    display: block;
    width: 100%;
    height: 100vh;
    position: fixed;
    background: #00000080;
    z-index: 100;
    top: 0;
    left: 0;
`;
export const DescWrapper = styled.div`
    display: 'block';
    width: 75%;
    height: fit-content;
    position: fixed;
    background: white;
    padding: 5%;
    z-index: 200;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    @media only screen and (max-width: 600px) {
        width: 90vw;
        height: 60vh;
    }
`;
export const BtnClose = styled.button`
    font-family: 'Karla', sans-serif;
    font-weight: 600;
    color: #e27474;
    padding: 3px;
    width: 3vw;
    height: 5vh;
    cursor: pointer;
    border: none;
    border-radius: 3px;
    text-align: center;
    position: absolute;
    right: 1vw;
    top: 2vh;
    @media only screen and (max-width: 600px) {
        width: 12vw;
    }
`;
export const BackgroundInfo = styled.div`
    position: absolute;
    top: 62%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    h1 {
        font-family: 'Karla', sans-serif;
        color: white;
        text-align: center;
    }
    h4 {
        display: flex;
        font-size: 1.8rem;
        width: fit-content;
        align-self: center;
        justify-content: space-around;
        font-family: 'Karla', sans-serif;
        color: white;
    }
    p {
        display: flex;
        justify-content: space-around;
        font-family: 'Karla', sans-serif;
        color: white;
        font-size: 1.1rem;
        @media only screen and (max-width: 600px) {
            display: none;
        }
    }
    @media only screen and (max-width: 600px) {
        top: 70%;
    }
`;
export const SeeMoreButton = styled.a`
    font-family: 'Karla', sans-serif;
    color: white;
    align-self: center;
    background: #547d45;
    width: 8vw;
    text-align: center;
    border-radius: 8px;
    display: block;
    padding: 6px;
    @media only screen and (max-width: 600px) {
        display: none;
    }
    &:hover {
        color: #b4f00a;
    }
`;
export const PortadaPaquete = styled.img`
    width: 100%;
    border-radius: 5px;
    height: 30vh;
    margin: 0 0 3% 0;
`;
export const MainWrapper = styled.div`
    padding: 0px 0px 0px 0px;
    box-sizing: border-box;
    min-height: 100vh;
`;
export const IndexWrapper = styled.div`
    padding: 10% 8% 2% 8%;
    background: white;
    heigth: 120vh;
    min-height: 120vh;
    @media (max-width: 600px) {
        padding: 50% 3% 3% 3%;
    }
`;

export const Content = styled.div`
    background: white;
    min-height: 100vh;
`;
export const ContentLoad = styled.div`
    position: relative;
    min-height: 70vh;
`;

export const CardProduct = styled.div`
    width: 100%;
    padding: 20px 10px 20px 10px;
    background-color: #ffffff;
    border-radius: 5px;
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 20px;
    grid-gap: 5px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

export const TitleProduct = styled.h3`
    border-radius: 8px;
    color: #505050;
    font-family: 'Karla', sans-serif;
`;

export const MainProduct = styled.div`
    display: grid;
    min-height: 100vh;
    padding: 0% 0 5% 0;
    @media only screen and (max-width: 600px) {
        padding: 5% 0% 0% 0%;
    }
    h3 {
        font-family: 'Karla', sans-serif;
        color: #41060c;
        font-weight: 800;
        justify-self: center;
    }
    .title_id {
        width: 60%;
        justify-self: center;
        margin: 2% 0 0 0;
        text-align: center;
        z-index: 2;
        color: #333;
        @media only screen and (max-width: 600px) {
            font-size: 1.4rem;
            width: 90%;
        }
    }
    .corredor_id {
        text-align: center;
        z-index: 2;
        color: #333;
    }
`;
export const DescriptionResponsive = styled.div`
    padding: 0% 6% 2% 6%;
    display: grid;
    @media only screen and (max-width: 600px) {
        padding: 10% 3% 10% 3%;
    }
    p {
        padding: 5% 0 0 0;
        font-family: 'Karla', sans-serif;
        color: #333;
        font-size: 1.2rem;
    }
`;
export const PathsProduct = styled.img`
    @media only screen and (max-width: 600px) {
        grid-column: 1/-1;
    }
`;

export const DetailProduct = styled.div`
    padding: 4%;
`;

export const DetailsTitle = styled.h4`
    color: rgb(90 90 90);
`;

export const Details = styled.h4`
    color: #6f6f6f;
`;

export const TableDetails = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 3px;
    background-color: white;
    border-radius: 5px;
    border-top: 10px solid #96292b;
`;

export const TableHead = styled.div`
    background-color: rgb(223, 222, 223);
    padding: 5px;
    font-family: 'Karla', sans-serif;
    font-weight: 600;
    color: #333;
`;

export const TableBody = styled.div`
    font-family: 'Karla', sans-serif;
    color: #737373;
    font-weight: 600;
`;

export const Description = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    background: white;
`;

export const FooterProduct = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media only screen and (max-width: 600px) {
        grid-template-columns: 1fr;
        grid-column: 1/-1;
        padding-left: 0%;
    }
`;

export const ContactButton = styled.button`
    border: 0px;
    border-radius: 20px;
    background-color: rgb(226, 48, 48);
    color: white;
    padding: 10px;
    @media only screen and (max-width: 600px) {
        grid-column: 1/-1;
        padding-left: 0%;
        width: 100%;
        background: blue;
    }
`;
export const FromDate = styled.div``;
export const DescDetail = styled.p`
    font-family: 'Karla', sans-serif;
    color: #333;
`;
export const CuantosViajan = styled.div`
    display: grid;
    justify-content: center;
`;
export const IDapp = styled.div`
    display: grid;
    padding: 2%;
    border-radius: 3px;
    border: 1px solid #f1f1f1;
    .date_people {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
`;
export const SumarButton = styled.a`
    position: relative;
    padding: 5px;
    font-family: 'Karla', sans-serif;
    font-weight: 600;
    color: white;
    background: #96292b;
    border-radius: 30px;
    width: 12vw;
    display: grid;
    grid-template-columns: 1fr 30px;
    text-align: center;
    line-height: 2.2;
    &:hover {
        color: white;
    }
`;
export const WhiteBack = styled.img`
    position: absolute;
    bottom: -2vh;
`;
export const EmpresasBlock = styled.div`
    display: grid;
    grid-template-columns: ${(props) => (props.grid ? '1fr 1fr 1fr' : '1fr')};
    grid-column-gap: 2vw;
    justify-items: center;
    padding: 0 8% 0 8%;
    margin: 4% 0 4% 0;
    grid-row-gap: 12vh;
    @media only screen and (max-width: 600px) {
        margin: 20% 0 0 0;
        grid-template-columns: 1fr;
    }
`;
export const EmpresaBox = styled.div`
    cursor: pointer;
    transition: 0.3s;
    display: grid;
    grid-template-rows: 35% 1fr;
    border-radius: 6px;
    width: 85%;
    position: relative;
    height: fit-content;
    box-shadow: 0px 0px 34px -15px rgba(0, 0, 0, 0.75);
    img {
        height: auto;
        width: 15vw;
        border-bottom-left-radius: 6px;
        border-top-left-radius: 6px;
        justify-self: center;
        padding: 10px;
        @media only screen and (max-width: 600px) {
            width: 90%;
        }
    }
    @media only screen and (max-width: 600px) {
        grid-template-columns: 1fr;
        height: fit-content;
        padding: 3%;
    }
    &:hover {
        box-shadow: 0px 0px 47px -15px rgba(0, 0, 0, 0.75);
    }
`;
export const ImgDiv = styled.div`
    background-image: url('${(props) => props.img}');
    height: 16vh;
    width: 30%;
    padding: 5px;
    justify-self: center;
    align-self: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;
export const EmpresaInfo = styled.div`
display:flex;
flex-direction:column;
justify-content:space-around;
margin:6%;
button{
  margin: 5% 0 0 0;
  font-size: .8rem;
  font-weight: 600;
  align-self: center;
  height: fit-content;
  border-radius:10px;
  padding:10px;
  width:fit-content;
  border:1px solid #44090f;
  font-family:'Karla',sans-serif;
  color: ${(props) => (props.active ? '#ffffff !important' : '#44090f')};
  transition:0.3s;
  cursor:pointer;
  background:white;
  justify-self:center;
  background: ${(props) => (props.active ? '#44090f' : 'white')};
  @media (max-width: 60px) {
    margin: 6% 0 0 0;
  }
  @media (min-width: 601px) {
      &:hover{
          background:#44090f;
          color:white;
      }
    }
}
.empresa_first{
  display: flex;
  flex-direction:column;
  position: relative;
  padding: 0% 4% 0 4%;
}
}
@media only screen and (max-width: 600px) {
  grid-template-columns:1fr;
  height:fit-content;
}
`;
export const Salidas = styled.p`
    font-family: 'Karla', sans-serif;
    color: #777777;
    margin: 0;
`;
export const PrecioEmpresa = styled.h4`
    font-family: 'Karla', sans-serif;
    color: #333;
    font-weight: 400;
    font-size: 0.9rem;
    span {
        color: #333;
        font-weight: 600;
        font-size: 1.2rem;
    }
`;
export const NochesAmount = styled.p`
    margin: 0;
    font-family: 'Karla', sans-serif;
    color: white;
    background: #41060c;
    text-align: center;
    right: -1vw;
    top: -5vh;
    border-radius: 100%;
    width: 6vw;
    height: 6vw;
    position: absolute;
    padding: 5px;
    font-size: 1.4rem;
    display: grid;
    justify-content: center;
    align-content: center;
    font-weight: 600;
    @media only screen and (max-width: 600px) {
        width: 16vw;
        height: 16vw;
    }
    span {
        font-size: 0.6rem;
        margin: -2vh 0 0 0;
    }
`;
export const TitleEmpresa = styled.h4`
    font-family: 'Karla', sans-serif;
    color: #41060c;
    font-weight: 800;
    font-size: 1.2rem;
`;
export const SubtitleWrap = styled.div`
    justify-self: center;
    position: relative;
    text-align: center;
    align-self: center;
    h3 {
        font-family: 'Karla', sans-serif;
        font-size: 1.8rem;
    }
`;
export const Underline = styled.div`
    width: 3vw;
    height: 0.7vh;
    background: #ca1b2d;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 0vh;
    @media only screen and (max-width: 600px) {
        bottom: 0vh;
        width: 18vw;
    }
`;
export const ButtonFAQ = styled.h6`
    font-family: 'Karla', sans-serif;
    color: ${(props) => props.color};
    font-weight: 600;
    text-align: center;
    cursor: pointer;
    padding: 2% !important;
    font-size: 1.6rem;
    user-select: none;
    @media (max-width: 600px) {
        padding: 8% 15% 0 15% !important;
    }
    &:hover {
        color: #41060c !important;
    }
    span {
        font-family: 'Karla', sans-serif;
        font-size: 1.1rem;
        color: #631219;
        margin: 1%;
        letter-spacing: 3px;
        font-weight: 600;
        user-select: none;
    }
`;
export const BodyFAQ = styled.div`
    margin: 2% 5% 2% 5%;
    text-align: left;
    @media (max-width: 600px) {
        text-align: center;
    }
`;
export const DobleFlecha = styled.img`
    width: 1.4vw;
    transition: 0.3s;
    margin: 0 0% 0 3%;
    transform: ${(props) => (props.rotation ? 'rotate(-180deg)' : 'rotate(0deg)')};
    @media (max-width: 600px) {
        width: 3.5vw;
    }
`;
export const AcordionWrapper = styled.div`
    margin: 2% 5% 0% 5%;
    @media (max-width: 600px) {
        margin: 0;
    }
    p {
        margin: 0;
        padding: 0;
    }
`;
export const NoEmpresasYet = styled.div`
    display: grid;
    @media (max-width: 600px) {
        margin: 0% 0 25% 0;
    }
    h2 {
        margin: 5% 0 0 0;
        text-align: center;
        font-family: 'Karla', sans-serif;
        color: #333;
        @media (max-width: 600px) {
            font-size: 1.5rem;
        }
    }
    a {
        margin: 4% 0 0 0;
        font-size: 0.8rem;
        font-weight: 600;
        align-self: center;
        height: fit-content;
        border-radius: 10px;
        padding: 10px;
        width: fit-content;
        border: 1px solid #44090f;
        font-family: 'Karla', sans-serif;
        color: white !important;
        transition: 0.3s;
        cursor: pointer;
        background: white;
        justify-self: center;
        background: #44090f;
        @media (max-width: 600px) {
            margin: 10% 0 0 0;
        }
        @media (min-width: 601px) {
            &:hover {
                background: #44090f;
                color: white;
            }
        }
    }
`;

export const ShareButtons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 20vw;
    justify-self: center;
    align-items: center;
    grid-column-gap: 2vw;
    @media (max-width: 600px) {
        width: 70vw;
    }
`;
export const ShareButton = styled.span`
    padding: 5px;
    border-radius: 6px;
    background: ${(props) => props.back};
    display: grid;
    justify-content: space-around;
    font-family: 'Karla', sans-serif;
    color: white;
    font-weight: 600;
    grid-template-columns: 30px 1fr;
    align-items: center;
`;
export const GalleryAndMap = styled.div`
    padding: 0% 18% 2% 18%;
    display: grid;
    grid-column-gap: 2vw;
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        grid-row-gap: 2vh;
    }
`;
export const SeeMap = styled.p`
    font-size: 1rem;
    font-weight: 600;
    color: #380206;
    cursor: pointer;
`;
