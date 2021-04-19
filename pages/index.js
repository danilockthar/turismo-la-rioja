import { useState, useEffect, useRef } from 'react';
import { Carousel } from 'react-bootstrap';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
// import Carousel from 'react-multi-carousel';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { slugify } from '../lib/slugify';
import { IoMdMegaphone, IoIosStar, IoIosSearch } from 'react-icons/io';
import { useDebounce } from 'use-debounce';
import { Input } from '@zeit-ui/react';

export const MainWrapper = styled.div`
    padding: 0px 0px 0px 0px;
    box-sizing: border-box;
`;
export const IndexWrapper = styled.div`
    display: grid;
    padding: 0% 0% 2% 0%;
    background: white;
    heigth: 350vh;
    min-height: 350vh;
    @media (max-width: 600px) {
        padding: 2% 0% 3% 0%;
    }
`;
export const Titleh1 = styled.h1`
    font-family: 'Open Sans', sans-serif;
`;
export const PortadaTurismo = styled.div`
    background: #5f0710;
    margin: 0 0 10vh 0;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    position: relative;
    height: 40vh;
    display: grid;
    grid-template-columns: 70% 15% 15%;
    @media (max-width: 600px) {
        height: 25vh;
        grid-template-columns: 1fr;
        grid-template-rows: auto;
    }
`;
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

export const Be = styled.span`
    font-size: 1.4rem;
    color: #393939;
    font-weight: 700;
`;
export const MoveteImg = styled.img`
    width: 41%;
    justify-self: center;
    margin: -6% 0 0 0;
    position: absolute;
    z-index: 90;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
    align-self: center;
    @media (max-width: 600px) {
        top: 40%;
        left: 55%;
        width: 78%;
        margin: 0 14vw 0 0;
    }
`;
export const ButtonArma = styled.a`
    position: absolute;
    padding: 8px;
    z-index: 90;
    transition: 0.3s;
    border: 2px solid white;
    font-family: 'Karla', sans-serif;
    font-weight: 600;
    color: white;
    background: none;
    border-radius: 10px;
    font-size: 1.2rem;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media (max-width: 600px) {
        &:hover {
            color: white;
        }
    }
    @media (min-width: 601px) {
        &:hover {
            color: #333 !important;
            background: white;
        }
    }
`;
export const LinesImg = styled.img`
    position: absolute;
    z-index: 80;
    width: 41%;
    left: 22%;
    top: 54%;
    transform: translate(-50%, -50%);
`;
export const LineasWrapper = styled.div`
    position: absolute;
    top: 0;
    height: 100%;
    right: 5vw;
`;
export const PortadaPaquete = styled.div`
    width: 100%;
    background-image: url('/${(props) => props.src}');
    background-position: inherit;
    background-size: cover;
    height: 70vh;
    margin: 0 0 3% 0;
    position: relative;
    img {
        width: 35%;
        position: absolute;
        top: 10%;
        left: 7%;
        opacity: 0.5;
    }
`;
export const PortadaMovete = styled.img`
    width: 100%;
    height: 30vh;
    border-radius: 5px;
`;

const Index = () => {
    const armatuviaje = useRef(null);
    const [loading, setLoading] = useState(true);
    const [redata, setRedata] = useState();
    const [activeType, setActiveType] = useState('PAQUETES');
    const [nameSearch, setNameSearch] = useState('');
    const [searchValue] = useDebounce(nameSearch, 500);
    const [index, setIndex] = useState(0);
    const [corredor, setCorredor] = useState([]);
    const [packages, setPackages] = useState([]);
    const [localidades, setLocalidades] = useState([]);
    const [products, setProducts] = useState([]);

    async function getLocalidades() {
        let response = await fetch(`https://www.lrseguridad.com.ar/turismorest/public/api/localidades`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        return data;
    }

    useEffect(() => {
        if (searchValue === '') {
            return;
        }
        handleSearchInput(searchValue);
    }, [searchValue]);

    useEffect(() => {
        if (activeType === '') {
            return;
        }
        searchFilter();
    }, [activeType, corredor]);

    const handleSearchInput = async (value) => {
        setLoading(true);
        setActiveType('');
        let response = await fetch(`https://www.lrseguridad.com.ar/turismorest/public/api/corredores-paquetes`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ search: value }),
        });
        let data = await response.json();
        if (data.corredor_paquetes) {
            setPackages(data.corredor_paquetes);
        }
        setLoading(false);
    };

    const searchFilter = async () => {
        setLoading(true);
        let corredores_arr = [];
        if (corredor.length == 0) {
            corredores_arr.push('1', '2', '3', '4', '5');
        } else {
            corredores_arr = corredor;
        }
        let response = await fetch(`https://www.lrseguridad.com.ar/turismorest/public/api/corredores-paquetes`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ corredor: corredores_arr, tipo_paquete: activeType }),
        });
        let data = await response.json();
        if (data.corredor_paquetes) {
            setPackages(data.corredor_paquetes);
        }
        setLoading(false);
    };

    async function getPackages() {
        setLoading(true);
        let response = await fetch(`https://www.lrseguridad.com.ar/turismorest/public/api/paquetepublicos`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        setLoading(false);
        return data;
    }

    const goToArmaFilter = () => {
        armatuviaje.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    };
    useEffect(() => {
        getPackages().then((resp) => {
            setPackages(resp);
            // console.log(resp, 'all paquetes')
        });
        getLocalidades().then((response) => {
            setLocalidades(response);
            // console.log(response, 'LOCALIDADES')
        });
    }, []);

    const changeTypeProducts = (typeproduct) => {
        setActiveType(typeproduct);
    };

    const sumCorredor = (idcorredor) => {
        let arr = [...corredor];
        if (arr.includes(idcorredor)) {
            let newArray = arr.filter((id) => id !== idcorredor);
            setCorredor(newArray);
            return;
        } else {
            arr.push(idcorredor);
            setCorredor(arr);
        }
    };
    return (
        <MainWrapper>
            <Layout title={'Inicio - Movete por La Rioja'}>
                <IndexWrapper>
                    <MoveteImg src="/movetev2.png" alt="Logo de Movete por La Rioja" />
                    <ButtonArma
                        onClick={goToArmaFilter}
                        alt="Botón Armá tu viaje. Te lleva a la sección de buscar viajes y paquetes."
                    >
                        ARMÁ TU VIAJE
                    </ButtonArma>
                    <Carousel interval={6000}>
                        <Carousel.Item>
                            <FirstBlock src="back.jpg" alt="Imagen de fondo del carrusel inicial.">
                                <NavigatorTop>
                                    <a> </a>
                                    <a> </a>
                                </NavigatorTop>
                                <WhiteBack
                                    src="/whitebackground.png"
                                    alt="Imagen decorativa estilo recorte de papel."
                                />
                            </FirstBlock>
                        </Carousel.Item>
                        <Carousel.Item>
                            <FirstBlock src="back1.jpg" alt="Imagen 2 de fondo del carrusel inicial.">
                                <NavigatorTop>
                                    <a> </a>
                                    <a> </a>
                                </NavigatorTop>

                                <WhiteBack
                                    src="/whitebackground.png"
                                    alt="Imagen decorativa estilo recorte de papel."
                                />
                            </FirstBlock>
                        </Carousel.Item>
                        <Carousel.Item>
                            <FirstBlock src="back2.jpg" alt="Imagen 3 de fondo del carrusel inicial.">
                                <NavigatorTop>
                                    <a> </a>
                                    <a> </a>
                                </NavigatorTop>

                                <WhiteBack
                                    src="/whitebackground.png"
                                    alt="Imagen decorativa estilo recorte de papel."
                                />
                            </FirstBlock>
                        </Carousel.Item>
                        <Carousel.Item>
                            <FirstBlock src="back3.jpg" alt="Imagen 4 de fondo del carrusel inicial.">
                                <NavigatorTop>
                                    <a> </a>
                                    <a> </a>
                                </NavigatorTop>

                                <WhiteBack
                                    src="/whitebackground.png"
                                    alt="Imagen decorativa estilo recorte de papel."
                                />
                            </FirstBlock>
                        </Carousel.Item>
                        <Carousel.Item>
                            <FirstBlock src="back4.jpg" alt="Imagen 5 de fondo del carrusel inicial.">
                                <NavigatorTop>
                                    <a> </a>
                                    <a> </a>
                                </NavigatorTop>

                                <WhiteBack
                                    src="/whitebackground.png"
                                    alt="Imagen decorativa estilo recorte de papel."
                                />
                            </FirstBlock>
                        </Carousel.Item>
                        <Carousel.Item>
                            <FirstBlock src="back5.jpg" alt="Imagen 6 de fondo del carrusel inicial.">
                                <NavigatorTop>
                                    <a> </a>
                                    <a> </a>
                                </NavigatorTop>

                                <WhiteBack
                                    src="/whitebackground.png"
                                    alt="Imagen decorativa estilo recorte de papel."
                                />
                            </FirstBlock>
                        </Carousel.Item>
                        <Carousel.Item>
                            <FirstBlock src="back6.jpg" alt="Imagen 7 de fondo del carrusel inicial.">
                                <NavigatorTop>
                                    <a> </a>
                                    <a> </a>
                                </NavigatorTop>

                                <WhiteBack
                                    src="/whitebackground.png"
                                    alt="Imagen decorativa estilo recorte de papel."
                                />
                            </FirstBlock>
                        </Carousel.Item>
                    </Carousel>
                    <SecondBlock>
                        <BannerWrapper>
                            <div>
                                <BannerImg
                                    src="banner2.jpg"
                                    alt="Banner publicitario para descargar la App del ministerio de turismo de La Rioja."
                                />
                                <ButtonWrapperBanner>
                                    <ButtonBanner
                                        alt="Botón de redirección para descargar la aplicación del ministerio de turismo de La Rioja en PlayStore"
                                        href="https://play.google.com/store/apps/details?id=com.turismolarioja.app&hl=es_AR&gl=US"
                                        target="_blank"
                                    >
                                        {' '}
                                        <img src="google-white.png" alt="Imagen de google Play Store" />{' '}
                                    </ButtonBanner>
                                    <ButtonBanner
                                        alt="Banner publicitario para descargar la App del ministerio de turismo de La Rioja en IOS."
                                        href="https://apps.apple.com/ar/app/la-rioja-argentina/id1468278108"
                                        target="_blank"
                                    >
                                        {' '}
                                        <img src="apple-white.png" alt="Imagen de Apple Store" />{' '}
                                    </ButtonBanner>
                                </ButtonWrapperBanner>
                            </div>
                            <a target="_blank" href="https://bancorioja.com.ar/personas/tarjetas/credito-MasterCard">
                                <BannerImg src="bannerbanco.jpg" alt="Banner publicitario del Banco Rioja." />
                            </a>
                        </BannerWrapper>
                        <FilterExplorer>
                            <LogoWrapper src="/cincocaminos.png" alt="Imagen logo Cinco Caminos" />
                            <FilterSearch>
                                <Input
                                    type="text"
                                    alt="Input para ingresar localidad o nombre del paquete a buscar."
                                    label="Búsqueda"
                                    placeholder="Buscá por localidad o nombre del paquete"
                                    onChange={(e) => setNameSearch(e.target.value)}
                                    iconRight={<IoIosSearch size="30px" color="#60605f" />}
                                    width="100%"
                                    size="large"
                                />
                                {/* <input type="text" placeholder="Buscá por localidad o nombre del paquete" onChange={(e) =>setNameSearch(e.target.value)}/> */}
                            </FilterSearch>
                            <SecondFilter ref={armatuviaje}>
                                <FilterATag
                                    alt="Botón para filtrar la búsqueda por paquetes"
                                    onClick={() => changeTypeProducts('PAQUETES')}
                                    active={activeType == 'PAQUETES'}
                                >
                                    {' '}
                                    PAQUETES{' '}
                                </FilterATag>
                                <FilterATag
                                    alt="Botón para filtrar la búsqueda por excursiones"
                                    onClick={() => changeTypeProducts('EXCURSIONES')}
                                    active={activeType == 'EXCURSIONES'}
                                >
                                    {' '}
                                    EXCURSIONES
                                </FilterATag>
                                <FilterATag
                                    alt="Botón para filtrar la búsqueda por alojamientos"
                                    onClick={() => changeTypeProducts('ALOJAMIENTOS')}
                                    active={activeType == 'ALOJAMIENTOS'}
                                >
                                    {' '}
                                    ALOJAMIENTOS
                                </FilterATag>
                                <FilterATag
                                    alt="Botón para filtrar la búsqueda por promociones"
                                    onClick={() => changeTypeProducts('PROMOCIONES')}
                                    isPromo
                                    active={activeType == 'PROMOCIONES'}
                                >
                                    {' '}
                                    <IoMdMegaphone size="30px" /> PROMOCIONES
                                </FilterATag>
                            </SecondFilter>
                            {/* <FilterOption>
                                <a>
                                    {' '}
                                    <LogoWrapper
                                        src="/boton1.png"
                                        alt="Botón para filtrar la búsqueda por corredor del Bermejo"
                                        onClick={() => sumCorredor('1')}
                                        data-id="1"
                                    />{' '}
                                    <ActiveBrush active={corredor.includes('1')} src="/active_brush.png" />{' '}
                                </a>
                                <a>
                                    {' '}
                                    <LogoWrapper
                                        src="/boton2.png"
                                        alt="Botón para filtrar la búsqueda por corredor de La Costa"
                                        onClick={() => sumCorredor('2')}
                                        data-id="2"
                                    />{' '}
                                    <ActiveBrush active={corredor.includes('2')} src="/active_brush.png" />
                                </a>
                                <a>
                                    {' '}
                                    <LogoWrapper
                                        src="/boton3.png"
                                        alt="Botón para filtrar la búsqueda por corredor Ruta 40"
                                        onClick={() => sumCorredor('5')}
                                        data-id="5"
                                    />{' '}
                                    <ActiveBrush active={corredor.includes('5')} src="/active_brush.png" />
                                </a>
                                <a>
                                    {' '}
                                    <LogoWrapper
                                        src="/boton4.png"
                                        alt="Botón para filtrar la búsqueda por corredor de Los Llanos"
                                        onClick={() => sumCorredor('4')}
                                        data-id="4"
                                    />
                                    <ActiveBrush active={corredor.includes('4')} src="/active_brush.png" />
                                </a>
                                <a>
                                    {' '}
                                    <LogoWrapper
                                        src="/boton5.png"
                                        alt="Botón para filtrar la búsqueda por corredor de La Producción"
                                        onClick={() => sumCorredor('3')}
                                        data-id="3"
                                    />
                                    <ActiveBrush active={corredor.includes('3')} src="/active_brush.png" />
                                </a>
                            </FilterOption> */}

                            {/* <SearchIcon>
                     <a onClick={searchFilter}>  Buscar </a>
                  </SearchIcon> */}
                        </FilterExplorer>
                    </SecondBlock>
                    <ProductsBlock>
                        {!loading ? (
                            packages.length > 0 ? (
                                packages
                                    .filter(
                                        (v, i, a) =>
                                            a.findIndex((t) => t.id_paquete_turistico === v.id_paquete_turistico) === i,
                                    )
                                    .map((item, index) => {
                                        return (
                                            <ProductDiv key={index}>
                                                <PortadaProducto
                                                    alt="Imagen portada de cada paquete, alojamiento o excursión"
                                                    src={`https://www.lrseguridad.com.ar/turismo/1.0/${item.path}`}
                                                >
                                                    {item.promocion === 'SI' && (
                                                        <EtiquetaPromo>
                                                            <p>
                                                                {' '}
                                                                <IoIosStar
                                                                    alt="Icono Promoción. Este paquete esta en promoción"
                                                                    color="gold"
                                                                />{' '}
                                                                ¡PROMOCIÓN!{' '}
                                                            </p>
                                                        </EtiquetaPromo>
                                                    )}
                                                    <PortadaInfo>
                                                        <p> {item.localidad} </p>
                                                        <h3> {item.descripcion_paquete} </h3>
                                                        <p className="tipo_paquete"> {item.tipo_producto} </p>
                                                    </PortadaInfo>
                                                </PortadaProducto>
                                                <div className="info_producto">
                                                    <h4> {item.precio_formateado} </h4>
                                                    <p> {item.descripcion_reducida?.substring(0, 80) + '..'} </p>
                                                    <Link
                                                        href={`/[categoria]/[id]`}
                                                        as={`/${slugify(item.tipo_producto)}/${
                                                            item.id_paquete_turistico
                                                        }`}
                                                    >
                                                        <a alt="Botón ver detalle de este paquete"> VER DETALLE </a>
                                                    </Link>
                                                </div>
                                            </ProductDiv>
                                        );
                                    })
                            ) : (
                                <NotFound>
                                    <h4> No se han encontrado resultados. Intente otra búsqueda.</h4>
                                </NotFound>
                            )
                        ) : (
                            <Loader
                                style={{
                                    position: 'absolute',
                                    top: '20%',
                                    left: '55%',
                                    transform: 'translate(-50%,-50%)',
                                }}
                                type="TailSpin"
                                color="#333"
                                height={50}
                                width={50}
                            />
                        )}
                    </ProductsBlock>

                    <SubscribeBlock>
                        <h3> ¡ Subscribite y recibí las mejores ofertas para tu viaje antes de ser publicadas!</h3>
                        <input type="text" placeholder="Ingresá aca tu email" />
                        <button alt="Botón para subscribirse a ofertas de paquetes"> SUBSCRIBIRME</button>
                        <MsgConfirm> </MsgConfirm>
                    </SubscribeBlock>
                </IndexWrapper>
            </Layout>
        </MainWrapper>
    );
};

export default Index;

export const Content = styled.div`
    padding: 0 8% 0 8%;
    position: absolute;
    top: 55vh;
`;

export const Lugares = styled.div`
    margin: 5% 0 0 0;
    padding: 3%;
    width: 100%;
    height: fit-content;
    background: #f4f5f7;
`;
export const LugaresWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 2vw;
`;
export const Lugar = styled.div`
    width: 100%;
    border-radius: 6px;
    background: white;
    height: 40vh;
    p {
        font-family: 'Karla', sans-serif;
        color: #333;
        font-weight: 600;
        padding: 0px 4%;
    }
`;
export const LugarImg = styled.div`
    background-image: url('/${(props) => props.src}');
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 32vh;
`;
export const FirstBlock = styled.div`
    background-image: url('/${(props) => props.src}');
    background-size: cover;
    background-position: center;
    width: 100%;
    display: grid;
    grid-template-rows: 1fr 80vh;
    height: 120vh;
    position: relative;
`;
export const LogoWrapper = styled.img`
    position: relative;
    justify-self: center;
    margin: 0;
    transition: 0.3s;
    max-width: 14vw;
    border-radius: 6px;
    background: ${(props) => (props.active ? '#fedbde' : '')};

    @media (min-width: 601px) {
        &:hover {
            transform: scale(1.1);
        }
    }
    @media (max-width: 600px) {
        max-width: 45vw;
    }
`;
export const LogoWrapperCorredor = styled.img`
    width: 55vw;
`;
export const ActiveBrush = styled.img`
    display: ${(props) => (props.active ? 'block' : 'none')};
    position: absolute;
    width: 14vw;
    margin: 0 0% 0 2%;
    @media (max-width: 600px) {
        width: 45vw;
    }
`;
export const NavigatorTop = styled.div`
    padding: 2% 0 0 0;
    justify-self: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    text-align: center;
    width: 50vw;
    a {
        text-decoration: none;
        font-family: 'Karla', sans-serif;
        color: white;
        font-weight: 600;
    }
`;
export const NotFound = styled.div`
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%, -50%);
    h4 {
        font-family: 'Karla', sans-serif;
        color: #f15454;
    }
    @media (max-width: 600px) {
        width: 100%;
        text-align: center;
    }
`;
export const WhiteBack = styled.img`
    position: absolute;
    bottom: -12vh;
`;
export const SecondBlock = styled.div`
    margin: 5% 0 0 0;
    h4 {
        font-family: 'Karla', sans-serif;
        color: #41060c;
        font-weight: 800;
        border-bottom: 2px solid red;
        width: 7vw;
        justify-self: center;
        text-align: center;
    }
`;
export const FilterOption = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    align-items: center;
    width: 85vw;
    justify-self: center;
    a {
        font-family: 'Karla', sans-serif;
        text-decoration: none;
        color: #41060c;
        font-weight: 600;
        position: relative;
    }
    @media (max-width: 600px) {
        padding: 10px;
        overflow-x: scroll;
        grid-column-gap: 6vw;
        grid-row-gap: 2vh;
    }
`;
export const SecondFilter = styled.div`
    display: flex;
    justify-content: space-around;
    width: 50vw;
    justify-self: center;
    @media (max-width: 600px) {
        padding: 10px;
        overflow-x: scroll;
        width: 80vw;
        grid-column-gap: 6vw;
        grid-row-gap: 2vh;
        justify-content: unset;
    }
`;
export const SearchIcon = styled.div`
    display: grid;
    justify-self: center;
    a {
        color: #3a3a3a;
        font-size: 13px;
        background: #e2dfdf;
        padding: 5px;
        border-radius: 6px;
        font-family: 'Karla', sans-serif;
        display: grid;
        justify-items: center;
        width: 8vw;
        transition: 0.3s;
        &:hover {
            background: #e2dfdf;
        }
        @media (max-width: 600px) {
            font-size: 22px;
            width: fit-content;
            padding: 10px;
        }
    }
`;
export const FilterATag = styled.a`
    font-size: 1.2rem;
    font-weight: 600;
    align-self: end;
    height: fit-content;
    user-select: none;
    border-radius: 10px;
    display: ${(props) => (props.isPromo ? 'flex' : 'content')};
    padding: 10px;
    width: fit-content;
    border: 1px solid #44090f;
    font-family: 'Karla', sans-serif;
    color: ${(props) => (props.active ? '#ffffff !important' : '#44090f')};
    transition: 0.3s;
    cursor: pointer;
    background: white;
    justify-self: center;
    background: ${(props) => (props.active ? '#44090f' : 'white')};
    @media (max-width: 600px) {
        font-size: 0.8rem;
        svg {
            width: 20px;
            height: 20px;
        }
    }
    @media (min-width: 601px) {
        &:hover {
            background: #44090f;
            color: white;
        }
    }
`;
export const FilterExplorer = styled.div`
    display: grid;
    justify-self: center;
    justify-content: center;
    text-align: center;
    grid-row-gap: 6vh;
    @media (max-width: 600px) {
        grid-row-gap: 2vh;
    }
`;
export const CityBar = styled.div`
    width: 90vw;
    height: 6vh;
    background: #41060c;
    border-radius: 3px;
    padding: 5px;
    margin: 3% 0 0 0;
    display: flex;
    justify-content: space-around;
    a {
        font-family: 'Karla', sans-serif;
        color: White;
        font-weight: 600;
    }
`;
export const ProductsBlock = styled.div`
    min-height: 50vh;
    height: 150vh;
    margin: 2% 0 0 0%;
    width: 85%;
    justify-self: center;
    padding: 2vw;
    position: relative;
    display: grid;
    justify-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 2vw;
    grid-row-gap: 2vh;
    overflow-y: scroll;
    ::-webkit-scrollbar-track {
        border: 1px solid #000;
        padding: 2px 0;
        background-color: #404040;
    }
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        height: 75vh;
        width: 85%;
    }
`;
export const ProductDiv = styled.div`
    width: 100%;
    border-radius: 10px;
    background: white;
    height: 62vh;
    box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 35%);
    .info_producto {
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 33vh;
        h4 {
            font-family: 'Karla', sans-serif;
            color: #333;
            margin: 0;
        }
        p {
            font-family: 'Karla', sans-serif;
            color: #333;
            font-size: 1rem;
            margin: 0;
        }
        a {
            font-size: 0.8rem;
            font-weight: 600;
            align-self: center;
            height: fit-content;
            border-radius: 10px;
            padding: 10px;
            width: fit-content;
            border: 1px solid #44090f;
            font-family: 'Karla', sans-serif;
            color: #44090f;
            transition: 0.3s;
            cursor: pointer;
            background: white;
            justify-self: center;
            &:hover {
                background: #44090f;
                color: white;
            }
        }
    }
`;
export const PortadaProducto = styled.div`
    background-image: url('${(props) => props.src}');
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 30vh;
    position: relative;
    h1 {
        color: #333;
    }
`;
export const PortadaInfo = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 6px 0 6px;
    background: #44090f6e;
    p {
        font-family: 'Karla', sans-serif;
        bottom: 6vh;
        color: white;
        left: 1vw;
        margin: 0;
    }
    h3 {
        font-family: 'Karla', sans-serif;
        color: white;
        margin: 0;
    }
    h1 {
        color: white;
    }
    .tipo_paquete {
        color: orange;
        font-weight: 600;
    }
`;
export const AppBlock = styled.div`
    background-image: url('/${(props) => props.src}');
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 80vh;
    position: relative;
    .btn_descarga {
        display: grid;
        font-size: 1.3rem;
        width: 100%;
        background: #41060c;
        text-align: center;
        position: absolute;
        bottom: 0;
        height: 8vh;
        font-family: 'Karla', sans-serif;
        color: white;
    }
`;
export const Banner = styled.div`
    width: 100%;
    margin: 5% 0 5% 0;
`;
export const BannerDiv = styled.a`
    width: 100%;
    height: 30vh;
    display: grid;
    justify-items: center;
    img {
        border-radius: 6px;
    }
`;
export const SubscribeBlock = styled.div`
    padding: 5vw;
    width: 100%;
    display: grid;
    box-sizing: border-box;
    justify-content: center;
    justify-items: center;
    height: 75vh;
    h3 {
        font-family: 'Karla', sans-serif;
        color: #41060c;
        @media (max-width: 600px) {
            padding: 0 5% 0 5%;
            text-align: center;
        }
    }
    input {
        height: 7vh;
        padding: 15px;
        width: 50vw;
        border: 1px solid #e8e8e8;
        text-align: center;
        font-family: 'Karla', sans-serif;
        border-radius: 5px;
        @media (max-width: 600px) {
            width: 90vw;
        }
    }
    button {
        border-radius: 30px;
        width: 12vw;
        padding: 5px;
        border: 1px solid #41060c;
        color: #41060c;
        background: none;
        height: 7vh;
        cursor: pointer;
        transition: 0.3s;
        font-weight: 600;
        &:hover {
            background: #41060c;
            color: white;
        }
        @media (max-width: 600px) {
            padding: 18px;
            width: fit-content;
            height: fit-content;
        }
    }
`;
export const MsgConfirm = styled.p``;
export const BannerWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2vw;
    padding: 0 10% 3% 10%;
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        padding: 6% 4% 12% 4%;
        grid-row-gap: 5vh;
    }
    div {
        position: relative;
    }
`;
export const ButtonWrapperBanner = styled.div`
    display: flex;
    width: 15vw;
    position: absolute !important;
    column-gap: 0.5vw;
    left: 8vw;
    top: 8vh;
    justify-content: space-around;
    @media (max-width: 600px) {
        width: 33vw;
        left: 22vw;
        top: 5vh;
    }
`;
export const BannerImg = styled.img`
    width: 100%;
    border-radius: 3px;
`;
export const ButtonBanner = styled.a`
    border: none;
    border-radius: 3px;
    padding: 5px;
    background: black;
    display: grid;
    justify-content: center;
`;
export const EtiquetaPromo = styled.div`
    position: absolute;
    right: 1vw;
    top: 2vh;
    padding: 5px;
    border-radius: 5px;
    width: fit-content;
    height: fit-content;
    background: #44090f;
    p {
        font-family: 'Karla', sans-serif;
        color: white;
        font-weight: 600;
        letter-spacing: 1px;
        font-size: 0.7rem;
        display: grid;
        margin: 0;
        grid-template-columns: 16px 1fr;
        align-items: center;
    }
`;
export const FilterSearch = styled.div`
    display: flex;
    justify-content: space-around;
    width: fit-content;
    align-items: center;
    width: 35vw;
    justify-self: center;
    @media (max-width: 600px) {
        width: 86vw;
    }
    input {
        font-family: 'Karla', sans-serif;
        color: #44090f;
        width: 25vw;
        @media (max-width: 600px) {
            width: 45vw;
        }
    }
`;
