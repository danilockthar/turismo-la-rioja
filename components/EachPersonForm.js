import { useState, useEffect, useContext } from 'react';
import { DatePicker, Space, Radio, Input } from 'antd';
import moment from 'moment';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import { StepContext } from '../context/steps';
import { ContextState } from '../context/global';
import { BsFillCaretLeftFill, BsFillCaretRightFill, BsFillPersonFill } from 'react-icons/bs';

const EachPersonForm = ({ persons }) => {
    const [showNextButton, setShowNextButton] = useState(false);
    const [myPersons, setMyPersons] = useState(persons);
    const [step, setStep] = useContext(StepContext);
    const [itemCart, setItemCart] = useContext(ContextState);
    const [lightstep, setLightStep] = useState(1);
    const [maxStep, setMaxStep] = useState(persons.length);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [titular, setTitular] = useState('N');
    const [littleLoading, setLittleLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSteps = (action, value) => {
        switch (action) {
            case 'sum':
                if (nombre == '' || apellido == '' || dni == '' || email == '' || telefono == '') {
                    setMessage('Por favor rellene todos los campos');
                    setTimeout(() => {
                        setMessage('');
                    }, 3500);
                    return;
                }
                if (maxStep == lightstep) {
                    if (nombre == '' || apellido == '' || dni == '' || email == '' || telefono == '') {
                        setShowNextButton(false);
                    }

                    setShowNextButton(true);
                    return;
                }
                let arr = [];
                let rest = myPersons.filter((item) => item.index != lightstep - 1);
                rest.push({
                    index: lightstep - 1,
                    nombre,
                    apellido,
                    dni,
                    email,
                    fecha_nacimiento: fechaNacimiento,
                    telefono,
                    titular,
                });
                setMyPersons(rest);
                setLightStep(lightstep + 1);
                break;

            default:
                setShowNextButton(false);
                if (lightstep == 1) return;
                let restwo = myPersons.filter((item) => item.index != lightstep - 1);
                restwo.push({
                    index: lightstep - 1,
                    nombre,
                    apellido,
                    dni,
                    email,
                    fecha_nacimiento: fechaNacimiento,
                    telefono,
                    titular,
                });
                setMyPersons(restwo);
                setLightStep(lightstep - 1);
                break;
        }
    };
    const dateFormat = 'YYYY-MM-DD';
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    const handleReservas = (stepaction) => {
        setItemCart(myPersons);
        setStep(0);
        setTimeout(() => {
            setStep(stepaction);
        }, 1000);
    };
    useEffect(() => {
        if (maxStep == lightstep) {
            if (nombre == '' || apellido == '' || dni == '' || email == '' || telefono == '') {
                setShowNextButton(false);
                return;
            }
            let rest = myPersons.filter((item) => item.index != lightstep - 1);
            rest.push({
                index: lightstep - 1,
                nombre,
                apellido,
                dni,
                email,
                fecha_nacimiento: fechaNacimiento,
                telefono,
                titular,
            });
            setMyPersons(rest);
            setShowNextButton(true);
        }
    }, [nombre, apellido, dni, email, telefono]);

    useEffect(() => {
        let index = lightstep - 1;
        let thisperson = myPersons.filter((item) => item.index == index);
        setNombre(thisperson[0].nombre);
        setApellido(thisperson[0].apellido);
        setDni(thisperson[0].dni);
        setEmail(thisperson[0].email);
        setTelefono(thisperson[0].telefono);
        setTitular(thisperson[0].titular);
        setFechaNacimiento(thisperson[0].fecha_nacimiento);
    }, [lightstep]);

    return (
        <MainPersonForm>
            {/* <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
          <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)}/>
          <input type="text" placeholder="DNI" value={dni} onChange={(e) => setDni(e.target.value)}/>
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/> */}
            <Left>
                <label>Nombre:</label>
                <input type="text" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <label>Apellido:</label>
                <input type="text" name="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                <label>DNI:</label>
                <input type="text" name="dni" value={dni} onChange={(e) => setDni(e.target.value)} />
                <label>Email:</label>
                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Left>
            <Right>
                <label>Teléfono:</label>
                <input type="text" name="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                <label>Fecha de nacimiento (AAAA-MM-DD):</label>
                {littleLoading ? (
                    <LoaderDIV>
                        <Loader
                            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                            type="TailSpin"
                            color="#00BFFF"
                            height={15}
                            width={15}
                        />
                    </LoaderDIV>
                ) : (
                    <DatePicker
                        alt="Seleccioná una fecha en el calendario"
                        value={moment(fechaNacimiento)}
                        placeholder="AAAA-MM-DD"
                        format={dateFormat}
                        onChange={(date, dateString) => setFechaNacimiento(dateString)}
                        style={{
                            width: '90%',
                        }}
                    />
                )}
                {/* <Radio.Group onChange={(e)=> setTitular(e.target.value)} value={titular}>
                        <Radio style={radioStyle} value={'S'}>
                        Soy referente de contacto.
                        </Radio>
                        <Radio style={radioStyle} value={'N'}>
                        No soy referente de contacto.
                        </Radio>
                    </Radio.Group> */}
                <NextAndPrev>
                    <p>
                        {' '}
                        <BsFillPersonFill size="24px" /> {lightstep}{' '}
                    </p>
                    <a onClick={() => handleSteps('rest')} alt="Botón volver atrás formulario persona">
                        {' '}
                        <BsFillCaretLeftFill color="#41060c" />{' '}
                    </a>
                    <a onClick={() => handleSteps('sum')} alt="Botón pasar al siguiente formulario de persona">
                        {' '}
                        <BsFillCaretRightFill color="#41060c" />{' '}
                    </a>
                </NextAndPrev>
            </Right>
            {showNextButton ? (
                <NextButton onClick={() => handleReservas(3)} alt="Botón siguiente">
                    {' '}
                    SIGUIENTE
                </NextButton>
            ) : (
                ''
            )}

            <MessageForm>{message}</MessageForm>
        </MainPersonForm>
    );
};

export default EachPersonForm;

export const MainPersonForm = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    input {
        width: 90%;
        background: #f9f9f9;
        border: 1px solid #e4e4e4;
        padding: 5px;
        font-family: 'Karla', sans-serif;
        height: 6vh;
        border-radius: 2px;
        color: #9b7978;
        font-weight: 600;
    }
    label {
        font-weight: 600;
        color: #7d7d7d;
        font-family: 'Karla', sans-serif;
    }
    @media only screen and (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

export const Left = styled.div`
    display: grid;
`;
export const Right = styled.div`
    display: flex;
    flex-direction: column;
`;
export const LoaderDIV = styled.div`
    position: relative;
    height: 10vh;
`;
export const NextAndPrev = styled.div`
    text-align: center;
    padding: 5% 0 5% 0;
    a {
        font-size: 2rem;
        color: #41060c;
    }
    p {
        margin: 0;
        display: grid;
        align-items: center;
        grid-template-columns: 2vw 1vw;
        justify-content: center;
        font-family: 'Karla', sans-serif;
        color: #41060c;
        font-weight: 600;
        @media only screen and (max-width: 600px) {
            grid-template-columns: 10vw 4vw;
            font-size: 1.2em;
        }
    }
    @media only screen and (max-width: 600px) {
        text-align: center;
        margin: 12% 0 0 0;
        position: inherit;
        transform: inherit;
    }
`;
export const MessageForm = styled.p`
    font-family: 'Karla', sans-serif;
    color: #e82a2a;
`;
export const NextButton = styled.button`
    position: absolute;
    bottom: 2vh;
    right: 2vw;
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
    @media only screen and (max-width: 600px) {
        position: inherit;
    }
`;
