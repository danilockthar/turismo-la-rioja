import { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import EachPersonForm from './EachPersonForm';
import { DatePicker, Space, Radio, Input, Steps, notification, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import moment from 'moment';
import { StepContext } from '../context/steps';
import { ContextState } from '../context/global';
import Loader from 'react-loader-spinner';
import { FaWindowClose } from 'react-icons/fa';
import { BsFillCaretDownFill, BsFillCaretUpFill, BsFillPersonFill } from 'react-icons/bs';

const Reservas = ({ showReservas, handleClose, agencia }) => {
    const { Step } = Steps;
    const { RangePicker } = DatePicker;

    const [step, setStep] = useContext(StepContext);
    const [itemCart, setItemCart] = useContext(ContextState);
    const [personas, setPersonas] = useState(1);
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [fecha, setFecha] = useState([]);
    const [message, setMessage] = useState('');

    const dateFormat = 'YYYY-MM-DD';

    const handlePersonas = (action) => {
        if (action == 'sum') {
            setPersonas(personas + 1);
            return;
        }
        if (action == 'rest') {
            if (personas == 1) {
                return;
            } else {
                setPersonas(personas - 1);
            }
        }
    };
    const handleReservas = (stepaction) => {
        if (
            (agencia.tipo_producto === 'ALOJAMIENTOS' && fecha.length === 0) ||
            (agencia.tipo_producto === 'EXCURSIONES' && fecha.length === 0)
        ) {
            openNotification();
            return;
        }
        setStep(0);
        setTimeout(() => {
            setStep(stepaction);
        }, 1000);
    };
    useEffect(() => {
        let arr = [];
        Array.from(Array(personas)).forEach((item, index) => {
            arr.push({
                index,
                nombre: '',
                apellido: '',
                dni: '',
                email: '',
                titular: 'N',
                telefono: '',
                fecha_nacimiento: moment().format('YYYY-MM-DD'),
            });
        });
        setReservas(arr);
    }, [personas]);

    const openNotification = () => {
        notification.open({
            message: 'Elige una fecha.',
            description: 'Debes seleccionar una fecha para poder continuar.',
            icon: <SmileOutlined style={{ color: 'white' }} />,
            placement: 'bottomRight',
            style: {
                background: 'dodgerblue',
                color: 'white',
                borderRadius: '6px',
            },
        });
    };

    const confirmarReserva = async () => {
        setStep(0);
        let token = '638c166856e05612560eeafa220488aa';
        let objeto = {
            token,
            id_agencia: agencia.idagencia,
            monto_total: parseInt(agencia.precio) * itemCart.length,
            precio: parseInt(agencia.precio),
            cant_personas: itemCart.length,
            id_producto: agencia.idproducto,
            id_paquete_turistico: agencia.idpaqueteturistico,
            fecha_desde:
                agencia.tipo_producto === 'ALOJAMIENTOS' || agencia.tipo_producto === 'EXCURSIONES'
                    ? fecha[0]
                    : '2020-03-01',
            fecha_hasta:
                agencia.tipo_producto === 'ALOJAMIENTOS'
                    ? fecha[1]
                    : agencia.tipo_producto === 'EXCURSIONES'
                    ? fecha[0]
                    : '2020-03-01',
            personas: itemCart,
        };

        let formdata = JSON.stringify({ objeto });
        let response = await fetch(`https://www.lrseguridad.com.ar/turismorest/public/api/guardar-operacion`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: formdata,
        });
        let data = await response.json();
        if (data.res) {
            setStep(3);
            setSuccess(true);
            setMessage(`Operación realizada con éxito. 
      Acabamos de envíar a tu correo el código de viaje.`);
            return;
        }
        setStep(3);
        setSuccess(true);
        setMessage('Algo salió mal. Intente nuevamente.');
    };

    const renderSwitch = () => {
        switch (step) {
            case 0:
                return (
                    <StepUno>
                        <Loader
                            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                            type="TailSpin"
                            color="#00BFFF"
                            height={50}
                            width={50}
                        />
                    </StepUno>
                );
                break;
            case 1:
                return (
                    <StepUno
                        display={
                            agencia.tipo_producto === 'PAQUETES' || agencia.tipo_producto === 'PROMOCIONES'
                                ? '1fr 1fr'
                                : '1fr 15vw'
                        }
                    >
                        <FirstStepBlock>
                            <div className="how-many-people">
                                <p>¿Cuántas personas van a viajar?</p>
                                <PersonasNumero>
                                    <h4>
                                        {' '}
                                        {personas} <BsFillPersonFill />{' '}
                                    </h4>
                                    <MasMenos>
                                        <a
                                            className="masymenos"
                                            onClick={() => handlePersonas('sum')}
                                            alt="Botón para sumar personas al paquete"
                                        >
                                            <BsFillCaretUpFill size="30px" />{' '}
                                        </a>

                                        <a
                                            className="masymenos"
                                            onClick={() => handlePersonas('rest')}
                                            alt="Botón para restar personas al paquete"
                                        >
                                            {' '}
                                            <BsFillCaretDownFill size="30px" />
                                        </a>
                                    </MasMenos>
                                </PersonasNumero>
                            </div>

                            {agencia.tipo_producto === 'ALOJAMIENTOS' && (
                                <div className="picker-container">
                                    <p>Elegí la fecha en la que deseas alojarte.</p>
                                    <RangePicker
                                        alt="Seleccioná rango de fechas en el calendario"
                                        onChange={(date, dateString) => setFecha(dateString)}
                                        placeholder={['Desde', 'Hasta']}
                                        style={{ height: '6vh', alignSelf: 'center', width: '90%' }}
                                    />
                                </div>
                            )}
                            {agencia.tipo_producto === 'EXCURSIONES' && (
                                <div className="picker-container">
                                    <p>Elegí la fecha deseada para tu excursión.</p>
                                    <DatePicker
                                        // value={moment(fechaNacimiento)}
                                        alt="Seleccioná fecha en el calendario"
                                        placeholder="AAAA-MM-DD"
                                        style={{ height: '6vh', alignSelf: 'center', width: '90%' }}
                                        format={dateFormat}
                                        onChange={(date, dateString) => setFecha([dateString])}
                                    />
                                </div>
                            )}
                        </FirstStepBlock>
                        <button onClick={() => handleReservas(2)} alt="Botón de continuar al siguiente paso">
                            {' '}
                            CONTINUAR
                        </button>
                    </StepUno>
                );
                break;
            case 2:
                return (
                    <StepDos>
                        <PersonaFormNumber>
                            <h3> Completá los datos de las personas que viajan.</h3>
                            {/* {Array.from(Array(personas)).map((item, index) => {
                    return(<p> {index} </p>)
                  })} */}
                        </PersonaFormNumber>
                        <EachPersonForm persons={reservas} />
                    </StepDos>
                );
                break;
            case 3:
                return (
                    <StepTres>
                        {success ? (
                            <div>
                                <h3>{message}</h3>
                            </div>
                        ) : (
                            <div>
                                <h3>Generá tu código de viaje.</h3>
                                <h4> Agencia : {agencia.nombre} </h4>
                                <h4>
                                    Total:{' '}
                                    {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARS' }).format(
                                        parseInt(agencia.precio) * itemCart.length,
                                    )}{' '}
                                </h4>
                                <h4> Personas: {itemCart.length} </h4>
                                <NextButton
                                    onClick={confirmarReserva}
                                    alt="Botón confirmar solicitud de código de descuento"
                                >
                                    {' '}
                                    CONFIRMAR
                                </NextButton>
                            </div>
                        )}
                    </StepTres>
                );
                break;
        }
    };

    return (
        <MainReservas show={showReservas}>
            <MainWrapper show={showReservas}>
                <LogoWrapper src="/marca2.png" alt="Logo de Movete" />
                <StepMarker>
                    <Steps size="small" current={step - 1}>
                        <Step
                            onClick={() => setStep(1)}
                            title="¿Cuántas personas viajan?"
                            description=""
                            alt="Botón volver al paso uno"
                        />
                        <Step title="Datos" description="Información requerida" />
                        <Step title="Finalizando" description="Solicitar código de descuento" />
                    </Steps>
                </StepMarker>
                <BtnClose
                    onClick={() => {
                        handleClose();
                        setFecha([]);
                        setMessage('');
                        setPersonas(1);
                    }}
                    alt="Botón cerrar modal"
                >
                    {' '}
                    <FaWindowClose size="25px" />{' '}
                </BtnClose>
                {renderSwitch()}
                <LogosWrapper show={step !== 2}>
                    <img src="/cuestavieja.png" alt="Imagen cuesta vieja" />
                    <img src="/inkañan.png" alt="Imagen Inkañan" />
                    <img src="/lagunabrava.png" alt="Imagen Laguna Brava" />
                    <img src="/unacay.png" alt="Imagen Unacay" />
                    <img src="/dsuno.png" alt="Imagen dsuno" />
                    <img src="/volterra.png" alt="Imagen Volterra" />
                </LogosWrapper>
            </MainWrapper>
        </MainReservas>
    );
};

export default Reservas;

export const LogoWrapper = styled.img`
    margin: 0;
    max-width: 12vw;
    position: Absolute;
    left: 2vw;
    top: 3vh;

    @media (max-width: 600px) {
        max-width: 45vw;
    }
`;

export const MainReservas = styled.div`
    display: ${(props) => (props.show ? 'block' : 'none')};
    width: 100%;
    height: 100vh;
    position: fixed;
    background: #00000080;
    z-index: 100;
    top: 0;
    left: 0;
`;
export const MainWrapper = styled.div`
    display: ${(props) => (props.show ? 'block' : 'none')};
    width: 75%;
    height: fit-content;
    position: fixed;
    background: white;
    padding: 2%;
    z-index: 200;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    @media only screen and (max-width: 600px) {
        width: 90vw;
        height: 90vh;
        overflow-y: scroll;
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
export const StepUno = styled.div`
    display: grid;
    justify-content: space-around;
    width: 100%;
    align-items: center;
    height: 75vh;
    grid-template-columns: ${(props) => props.display};
    .masymenos {
        color: #41060c;
        transition: 0.3s;
        &:hover {
            color: #41060c;
        }
    }
    .picker-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        @media only screen and (max-width: 600px) {
            grid-template-columns: 1fr;
            justify-items: center;
            grid-template-rows: 1fr 12vh;
        }
    }
    .how-many-people {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-items: center;
        @media only screen and (max-width: 600px) {
            grid-template-columns: 1fr;
        }
    }
    p {
        align-self: center;
        margin: 0;
        font-family: 'Karla', sans-serif;
        color: #41060c;
        width: 100%;
        text-align: center;
        font-size: 1.4rem;
        font-weight: 600;
        @media only screen and (max-width: 600px) {
            font-size: 1.2rem;
            text-align: center;
            width: 80%;
        }
    }
    button {
        font-family: 'Karla', sans-serif;
        color: #41060c;
        border-radius: 10px;
        padding: 8px;
        border: 1px solid #41060c;
        cursor: pointer;
        transition: 0.3s;
        user-select: none;
        font-weight: 600;
        width: 12vw;
        justify-self: center;
        margin: 5% 0 0 0;
        &:hover {
            background: #41060c;
            color: white;
        }
        @media only screen and (max-width: 600px) {
            width: fit-content;
            margin: -30% 0 0 0;
        }
    }
    @media only screen and (max-width: 600px) {
        width: 100%;
        padding: 3vh 2vw 0 2vw;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 2vh;
    }
`;
export const NextButton = styled.button`
    font-family: 'Karla', sans-serif;
    color: #41060c;
    border-radius: 10px;
    padding: 8px;
    border: 1px solid #41060c;
    cursor: pointer;
    transition: 0.3s;
    user-select: none;
    font-weight: 600;
    width: fit-content;
    justify-self: center;
    margin: 5% 0 0 0;
    &:hover {
        background: #41060c;
        color: white;
    }
`;
export const PersonasNumero = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 10px;
    margin: 0 0% 0 -5%;
    width: 10vw;
    height: 8vw;
    align-items: center;
    justify-items: center;
    justify-self: center;
    h4 {
        font-size: 2rem;
        color: #41060c;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-family: 'Karla', sans-serif;
    }
    @media only screen and (max-width: 600px) {
        width: 45vw;
        height: 24vw;
        margin: 0;
    }
`;
export const MasMenos = styled.div`
    display: grid;
`;
export const StepDos = styled.div`
    display: grid;
    padding: 3vw 3vw 0 3vw;
    margin: 4% 0 0 0;
    h3 {
        color: #41060c;
        font-family: 'Karla', sans-serif;
    }
    @media only screen and (max-width: 600px) {
        margin: 25% 0 0 0;
    }
`;
export const StepTres = styled.div`
    display: grid;
    height: 75vh;
    justify-items: center;
    align-items: center;
    text-align: center;
    z-index: 10;
    div {
        z-index: 100;
    }
    h3 {
        color: #41060c;
        font-family: 'Karla', sans-serif;
        font-size: 1.6rem;
    }
    @media only screen and (max-width: 600px) {
        margin: 5% 0 0 0;
        width: 90%;
    }
`;
export const StepMarker = styled.div`
    position: absolute;
    transform: translate(-50%, -50%);
    left: 56%;
    top: 10%;
    width: 60%;
    @media only screen and (max-width: 600px) {
        display: none;
    }
`;
export const CamioncitoIMG = styled.img`
    position: absolute;
    bottom: -1vh;
    width: 90%;
    display: ${(props) => (props.show ? 'block' : 'none')};
    @media only screen and (max-width: 600px) {
        bottom: 4vh;
    }
`;
export const PersonaFormNumber = styled.div`
    display: grid;
    grid-template-columns: 1fr 20%;
    align-items: center;
`;
export const LogosWrapper = styled.div`
    display: ${(props) => (props.show ? 'flex' : 'none')};
    justify-content: space-around;
    position: absolute;
    width: 100%;
    bottom: 2vh;
    left: 0;
    @media only screen and (max-width: 600px) {
        bottom: 3vh;
        left: 4vw;
    }
    img {
        width: 9vw;
        @media only screen and (max-width: 600px) {
            width: 14vw;
        }
    }
`;

export const FirstStepBlock = styled.div`
    display: grid;
    grid-row-gap: 5vh;
    @media only screen and (max-width: 600px) {
        grid-row-gap: 0;
    }
`;
