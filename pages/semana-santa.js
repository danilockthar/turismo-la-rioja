import { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { Carousel } from 'react-bootstrap';
import { FaPhone, FaWhatsapp, FaRegEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Accordion, Collapse, Card, Toggle } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import AccordionContext from 'react-bootstrap/AccordionContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';

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
    const [activeOption, setActiveOption] = useState('TURISMO');

    const carouselRef = useRef(null);

    const handleNext = () => carouselRef.current.next();

    const handlePrev = () => carouselRef.current.prev();
    const TurismoCarrusel = (
        <Activities>
            <CarouselWrapper>
                <Carousel arrows={false} interval={300000} ref={carouselRef}>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>PARQUE NACIONAL TALAMPAYA</TitleSanta>
                            <p>
                                <b> Localización:</b> Parque Nacional Talampaya <br></br>
                                <b>Actividad:</b> Trekking, senderismo <br></br>
                                <b>Dificultad:</b> Baja <br></br>
                                <b>Tiempo: </b> 3 hs <br></br>
                                Por la noche, el Parque Nacional Talampaya ofrece una experiencia completamente
                                diferente. La luz de la luna revela paisajes mágicos y tranquilos, un ambiente sereno y
                                encantador. Este paseo nocturno nos brinda la posibilidad de observar la fauna en plena
                                actividad, una experiencia única e irrepetible. <br></br>
                                Durante Semana Santa: <br></br>
                                Jueves a lunes a partir de las 20:30<br></br>
                                Operador: <br></br>
                                Runacay EVyT<br></br>
                                Teléfono de contacto (wsp): 0380-154489686 / 0380-154447380<br></br>
                                Mail de contacto: info@runacay.com<br></br>
                                Web: <a>www.runacay.com </a>
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>QUEBRADA DE EDUARDO</TitleSanta>
                            <p>
                                <b> Localización:</b> Parque Nacional Talampaya <br></br>
                                <b>Actividad:</b> Senderismo, trekking<br></br>
                                <b>Dificultad:</b> Baja<br></br>
                                <b>Tiempo:</b> 3 hs Este sensacional lugar ubicado dentro del Parque Nacional Talampaya,
                                le permitirá vivir de manera natural y sin medios de locomoción, paisajes únicos,
                                historia y arqueología, ya que por este sitio pasaron culturas prehispánicas, también
                                arrieros que llevaban el ganado vacuno a pastar y a tomar agua en pequeñas aguadas que
                                se forman en el desierto, siempre rodeados por bloques en forma de farallones de
                                estructura sedimentarias. <br></br>
                                Prestador/Operador: <br></br>
                                Asociación de Guías del Parque Nacional Talampaya<br></br>
                                Teléfono de contacto (wsp): (03825) 15410288<br></br>
                                Mail de contacto: talampaya.acg@gmail.com<br></br>
                                Web: www.talampayaecoturismo.com <br></br>
                                *Runacay EVyT<br></br>
                                Teléfono de contacto (wsp): 0380-154489686<br></br>
                                Mail de contacto: info@runacay.com<br></br>
                                Web: <a>www.runacay.com</a>
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>TALAMPAYA ECO TURISMO</TitleSanta>
                            <p>
                                <b>Localización: </b> Parque Nacional Talampaya <br></br>
                                <b>Actividad:</b> Cicloturismo, trekking, senderismo<br></br>
                                <b>Dificultad:</b> Baja<br></br>
                                <b>Tiempo:</b> 2 a 4 horas depende actividad elegida El Parque Nacional Talampaya ofrece
                                varias alternativas para estar en contacto con la naturaleza. Una de estas es el
                                Cicloturismo. Esta actividad invita a recorrer el imponente Cañón de Talampaya para
                                todos aquellos que quieran disfrutar del silencio, la tranquilidad y la magia que
                                envuelve a este lugar. <br></br>
                                Durante Semana Santa: <br></br>
                                De miércoles a lunes: <br></br>
                                Ciclo turismo hasta jardín botánico a partir de las 8:30 hasta las 17:00 hs <br></br>
                                Combinado de ciclo turismo + senderismo desde las 8:30 hs a 14:30 hs <br></br>
                                Prestador: <br></br>
                                *Asociación de Guías del Parque Nacional Talampaya <br></br>
                                Teléfono de contacto (wsp): (03825) 15410288 <br></br>
                                Mail de contacto: talampaya.acg@gmail.com <br></br>
                                Web: <a>www.talampayaecoturismo.com</a>
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>TALAMPAYA MILENARIO (CIUDAD PERDIDA, CAÑÓN DEL ARCO IRIS)</TitleSanta>
                            <p>
                                <b>Localización: </b> Parque Nacional Talampaya <br></br>
                                <b>Actividad:</b> Trekking<br></br>
                                <b>Dificultad:</b> Baja<br></br>
                                <b>Tiempo:</b> 3 a 5 hs (según actividad elegida) Circuito Arco Iris: Geoformas
                                caprichosas y cientos de colores mezclados en una verdadera paleta de pintor, le dan el
                                nombre a este singular y deslumbrante paseo. Circuito Ciudad Perdida: Un valle
                                erosionado y tallado por el agua y el viento, forman una extensa depresión que asemeja a
                                una ciudad que emerge desde la misma roca sedimentaria. Ambos circuitos que también
                                pueden combinarse, arrancan desde el área de servicios ubicado sobre Ruta Nacional 76 km
                                133, para luego internarse en pleno desierto, sobre lechos de ríos que en época estival
                                increíblemente llevan agua por algunas horas. Esta opción se conoce como circuito
                                combinado.<br></br>
                                Durante Semana Santa:<br></br>
                                De jueves a lunes dos salidas diarias (mañana 9:00 hs – tarde 14:00 hs)<br></br>
                                Prestador: <br></br>
                                Cooperativa Talampaya Limitada<br></br>
                                Teléfono de contacto (wsp): 03825-15677701<br></br>
                                Web: <a>www.talampayamilenario.com.ar </a>
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>CRÁTER CORONA DEL INCA</TitleSanta>
                            <p>
                                <b> Localización:</b> Cordillera de los Andes Departamento Vinchina <br></br>
                                <b>Actividad:</b> Travesía Todo Terreno (4x4) <br></br>
                                <b>Dificultad:</b> Media <br></br>
                                <b>Tiempo:</b> Full Day (día completo) <br></br>
                                Un Cráter volcánico ubicado en el corazón de la Cordillera de los Andes, lo llevará a
                                vivir una de las experiencias más fascinantes a 5.500 metros. Donde se pone a prueba no
                                sólo la capacidad conductiva si no las máquinas y motores de los vehículos que ascienden
                                hasta este escenario fascinante y surrealista. Es una experiencia única para los amantes
                                de la naturaleza indómita. <br></br>
                                Operadores: <br></br>
                                Laguna Brava Excursiones <br></br>
                                Teléfono de contacto (wsp): 03825-15409879 <br></br>
                                Mail de contacto: <a> lagunaexcursiones@gmail.com </a> <br></br>
                                Runacay EVyT <br></br>
                                Teléfono de contacto (wsp): 0380-154489686 / 0380-154447380 <br></br>
                                Mail de contacto: <a>info@runacay.com </a>
                                <br></br>
                                Web:<a> www.runacay.com </a>
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>CAÑÓN DEL TRIÁSICO (DIURNO Y NOCTURNO)</TitleSanta>
                            <p>
                                <b> Localización:</b> : Villa Unión Departamento Felipe Varela <br></br>
                                <b>Actividad:</b> Travesía Todo Terreno (4x4) <br></br>
                                <b>Dificultad:</b> Baja <br></br>
                                <b>Tiempo:</b> 2 hs <br></br>
                                El Cañón del Triásico se encuentra ubicado en la Reserva Departamental Banda Florida,
                                muy cercano a Villa Unión (ciudad de referencia para visitar el Parque Nacional
                                Talampaya). Durante la excursión se atraviesa lechos de ríos y cañones. Cada parada se
                                hace en puntos panorámicos para apreciar las bellezas de sus miradores y curiosidades
                                geológicas. <br></br>
                                Durante Semana Santa: <br></br>
                                De jueves a domingo dos salidas diarias <br></br>
                                Por la mañana: <br></br>
                                8:00, 9:00, 10:00 hs <br></br>
                                Por la tarde: <br></br>
                                14:00, 15:00, 16:00 hs <br></br>
                                Prestador: <br></br>
                                Cooperativa Villa Unión del Talampaya <br></br>
                                Teléfono de contacto (wsp): 0380-154489686 <br></br>
                                Mail de contacto: <a>info@runacay.com </a> <br></br>
                                Web:<a> www.runacay.com</a>
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>MINA LA MEJICANA</TitleSanta>
                            <p>
                                <b> Lugar: </b> Cerro Famatina, Departamento Famatina y Chilecito <br></br>
                                <b>Actividad:</b> Travesía Todoterreno (4x4)<br></br>
                                <b>Dificultad:</b> Media<br></br>
                                <b>Tiempo:</b> Full Day (día completo)<br></br>
                                En el corazón del Cerro Famatina se ubica uno de los sitios históricos considerados como
                                uno los más importantes del mundo. En pleno auge de la minería en Argentina entre 1900 y
                                1930, se construyó un sistema de transporte aéreo llamado Cable Carril, proyecto
                                ejecutado por una empresa alemana. Este sistema permitió transportar minerales desde la
                                mina “La Mejicana“, a 4.500 metros, hasta la ciudad de Chilecito, en un tramo que supera
                                los 35 kms de longitud. Fue declarado Monumento Histórico Nacional el 25 de octubre de
                                1982. Durante Semana Santa se puede visitar, sujeto a inclemencias climáticas y estado
                                de caminos.<br></br>
                                Prestador:<br></br>
                                *Salir del Cráter EVyT<br></br>
                                Teléfono de contacto (wsp): 0380-154447380<br></br>
                                Mail de contacto: <a> excursionesalirdelcrater@hotmail.com </a> <br></br>
                                Web:<a> www.salirdelcrater.com.ar </a>
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>TREKKING A LA ESTACIÓN 3 DEL CABLE CARRIL</TitleSanta>
                            <p>
                                <b> Lugar: </b> Cerro Famatina, Departamento Chilecito <br></br>
                                <b>Actividad: </b> Trekking, senderismo <br></br>
                                <b>Dificultad: </b> Media <br></br>
                                <b>Tiempo: </b>Full Day (día completo) <br></br>
                                Una excursión para toda la familia, saliendo desde la Ciudad de Chilecito pasando por
                                Santa florentina un pueblo de montaña. Nos encontramos en el rio amarillo donde dejamos
                                los vehículos para iniciar la caminata, el recorrido es por senderos de montaña, y
                                caminos vecinales, a los largo de la caminata nos encontraremos con la variara flora de
                                las sierras de Famatina, escucharemos los pájaros del lugar y veremos el vuelo del
                                cóndor. Luego de unas horas de caminata y sorteando las distintas dificultades del
                                camino llegamos a las Estación 3 del Cable Carril. Al regresar pasamos por el puesto de
                                Abrahán y retomamos el camino de regreso a los vehículos. Durante Semana Santa se puede
                                visitar, sujeto a inclemencias climáticas. <br></br>
                                Prestador: <br></br>
                                *Rutur Viajes EVyT <br></br>
                                Teléfono de contacto (wsp): 03825-15615958 <br></br>
                                Mail de contacto: <a> info@ruturviajes.com.ar </a> <br></br>
                                Web: <a>www.ruturviajes.com.ar </a>
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>RESERVA BANDA FLORIDA</TitleSanta>
                            <p>
                                <b>Localización: </b> Banda Florida, Departamento Gral. Felipe Varela <br></br>
                                <b>Actividad:</b> Trekking, cicloturismo, Travesía Todoterreno (cuadriciclo)<br></br>
                                <b>Dificultad: </b>Baja a Media (depende de la actividad elegida)<br></br>
                                <b>Tiempo:</b> 2 a 5 hs (depende de la actividad elegida)<br></br>
                                La Reserva Departamental Banda Florida es un área cercana a Villa Unión, donde pueden
                                realizarse varias actividades turísticas y en contacto con la naturaleza. Las visitas
                                están organizadas por una Cooperativa de jóvenes emprendedores. La misma incluye
                                miradores, paredones multicolores, sitios arqueológicos, y curiosidades geológicas.
                                Durante Semana Santa solo actividades de senderismo y trekking. Consultar por otras
                                actividades y horarios disponibles como así también las salidas programadas.<br></br>
                                Prestador:<br></br>
                                *Cooperativa Runa Mayu<br></br>
                                Teléfonos de contacto (wsp): (03825) 15520958 / 15434788<br></br>
                                Mail de contacto: <a>runamayu@hotmail.com </a>
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>VALLECITO ENCANTADO</TitleSanta>
                            <p>
                                <b>Localización: </b> Guandacol, Departamento Gral. Felipe Varela <br></br>
                                <b>Actividad:</b> Trekking<br></br>
                                <b>Dificultad:</b> Baja<br></br>
                                <b>Tiempo:</b> 1 h<br></br>
                                Enmarcado dentro de la Reserva Departamental Loma Bola, el sitio conocido como Vallecito
                                Encantado, atrae por su singular belleza, destacada por sus geoformas y su cañón
                                multicolor. Un hermoso paseo, distinto y sencillo de realizar. Se encuentra ubicado
                                sobre Ruta Nacional 40 a pocos kilómetros antes de llegar a la localidad de Guandacol.
                                Se sabe que en toda esta zona el Gral. Felipe Varela solía recorrer cada día en busca de
                                sus animales que pastaban y caminaban muchos kilómetros en busca de agua. De aquí
                                proviene el nombre del Producto Turístico “Senderos de Varela”. Durante Semana Santa los
                                días jueves, viernes y sábado Vallecito Encantado estará habilitado para recorrerlo
                                acompañado por guías locales. Horario: 8:30 a 18:00 hs... Además se ofrecerán otras
                                actividades en toda el área cercana a Guandacol, como cabalgatas, senderismo, city
                                tours, paseos guiados, Off Road 4x4, etc.
                                <br></br>
                                Prestadores:<br></br>
                                Guías locales de Guandacol<br></br>
                                Teléfonos de contacto y reservas (wsp): (03825) 15586308<br></br>
                                Mail de contacto: <a>guandacolturism@hotmail.com </a> <br></br>
                                Web:<a> www.turismoguandacol.com.ar </a>
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>RUTA DEL VUELO (ALADELTA Y PARAPENTE)</TitleSanta>
                            <p>
                                <b>Localización: </b> Ciudad Capital La Rioja <br></br>
                                <b>Actividad: </b>Parapente y Aladelta<br></br>
                                <b>Grado de dificultad:</b> bajo<br></br>
                                <b>Tiempo:</b> De 2 a 4 hs (según actividad y recorrido elegido)<br></br>
                                Circuito Turístico que recorre los diferentes sitios donde se practica aladelta y
                                parapente. Las excelentes condiciones climáticas y bajas probabilidades de lluvias,
                                hacen de la provincia de La Rioja uno de los destinos más visitados por pilotos de todo
                                el mundo, ya que se puede practicar este deporte casi todos los días del año. El
                                recorrido incluye: La Rioja Capital, Pampa de la Viuda en Sanagasta, Villa Mazán en
                                Arauco, Famatina y Chilecito, Ambil en Ortiz de Ocampo.<br></br>
                                Durante Semana Santa:<br></br>
                                La actividad se realizara solo en la ciudad capital y alrededores, consultar y reservar
                                previamente. Todas las actividades estarán disponibles de jueves a lunes (sólo con
                                reservas). <br></br>
                                Prestador: <br></br>
                                *Escuela de Vuelo Libre Águila Blanca y DS Uno Viajes EVyT<br></br>
                                Teléfono de contacto (wsp): 0380-154686949<br></br>
                                Mail de contacto: <a> rubioavila@hotmail.com </a> <br></br>
                                Web: <a>www.rutadelvuelo.com.ar</a>
                                <br></br>
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>Pucará del Dique </TitleSanta>
                            <p>
                                <b> Localización: </b> Dique los Sauces (Dpto. Sanagasta) <br></br>
                                <b>Actividad: </b>Trekking, senderismo<br></br>
                                <b>Grado de dificultad: </b> Bajo<br></br>
                                <b>Tiempo: </b> 3 hs<br></br>
                                Esta propuesta que entremezcla turismo naturaleza con lo cultural patrimonial, ofrece en
                                un corto plazo de tiempo un hermoso camino con vistas asombrosas, rodeado de montañas,
                                valles, quebradas y el lago artificial construido a principios de siglo XX. Llegar al
                                Pucará del Dique significa estar en contacto nuevamente con nuestros antepasados, donde
                                los vestigios de este fuerte construido hace más de 500 años lo transportaran por
                                algunos minutos a esa época, comprendiendo muchas cuestiones de su supervivencia en
                                terrenos agrestes.<br></br>
                                Durante Semana Santa:<br></br>
                                La actividad se realizara contratando directamente al operador autorizado<br></br>
                                Operador: <br></br>
                                Corona del Inca EVyT<br></br>
                                Teléfono de contacto (wsp): 3804-422142<br></br>
                                Mail de contacto: <a>expediciones@coronadelinca.com.ar</a> <br></br>
                                Web: <a>http://www.coronadelinca.tur.ar </a> <br></br>
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>SENDEROS DE SANTA VERA CRUZ</TitleSanta>
                            <p>
                                <b>Localización: </b> Santa Vera Cruz (Dpto. Castro Barros) <br></br>
                                <b>Actividad:</b> Trekking, senderismo <br></br>
                                <b>Grado de dificultad:</b> Bajo <br></br>
                                <b>Tiempo:</b> 5 hs <br></br>
                                Ubicado entre Montañas y rodeado de un paisaje deslumbrante, El Castillo de Dionisio lo
                                invita a descubrir no sólo sus actividades relacionadas a lo místico, si no que podrá
                                realizar caminatas y trekkings en sus senderos diagramados y preparados para tal fin.
                                Son dos los senderos propuestos que nos llevaran a miradores ubicados a 2.000 msnm en la
                                falda de las Sierras del Velasco con una vista deslumbrante y un entorno geográfico
                                apacible digno de disfrutar en esta propuesta.<br></br>
                                Durante Semana Santa:<br></br>
                                Día jueves trekking a la Santa vera Cruz. <br></br>
                                Día sábado trekking al Peñón del Cóndor. <br></br>
                                El resto de visitas al castillo estará disponible todos los días de 10:00 hs a 19:00 hs.
                                <br></br>
                                Prestador: <br></br>
                                *Guías locales de Castillo de Dionisio<br></br>
                                Teléfono de contacto (wsp): 011-1544734566<br></br>
                                Mail de contacto: <a>pedroarmandofernandez@hotmail.com </a> <br></br>
                                Web: <a>http://www.castillodedionisio.com.ar </a>
                                <br></br>
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>PUENTE NATURAL</TitleSanta>
                            <p>
                                <b> Localización: </b> Reserva Provincial Los Colorados (Departamento Independencia){' '}
                                <br></br>
                                <b>Actividad: </b> Trekking, senderismo, cabalgata <br></br>
                                <b>Grado de dificultad: </b> Bajo<br></br>
                                <b>Tiempo: </b> 2 a 5 hs (combinado con otros circuitos)<br></br>
                                El Sitio denominado Los Colorados, es un área protegida, declarada por ley provincial en
                                el año 2015. Posee una extensión de casi 20 mil hectáreas. Dentro de esta, emerge de
                                entre los paredones rojizos una geoformas conocida como "Puente Natural", la visita
                                incluye la modalidad a elección ya sea trekking o cabalgata. Toda la Reserva se enmarca
                                en un paisaje único, donde la historia y la naturaleza lo cautivarán a cada segundo.
                                <br></br>
                                Durante Semana Santa:<br></br>
                                Se recomienda en el caso de cabalgatas u otra actividad que no sea trekking reservar con
                                anticipación. El ingreso a los circuitos y apertura de las visitas (vehicular) estará
                                disponible de jueves a lunes desde las 8:00 hs a 18:00 hs.<br></br>
                                Prestador: <br></br>
                                *Cooperativa El Chacho Los Colorados<br></br>
                                Teléfono de contacto (wsp): 0380-154642945<br></br>
                                Web: <a>www.reservaloscolorados.com.ar </a>
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>PUENTE NATURAL</TitleSanta>
                            <p>
                                <b> Localización: </b> Reserva Provincial Los Colorados (Departamento Independencia){' '}
                                <br></br>
                                <b>Actividad: </b> Trekking, senderismo, cabalgata <br></br>
                                <b>Grado de dificultad: </b> Bajo<br></br>
                                <b>Tiempo: </b> 2 a 5 hs (combinado con otros circuitos)<br></br>
                                El Sitio denominado Los Colorados, es un área protegida, declarada por ley provincial en
                                el año 2015. Posee una extensión de casi 20 mil hectáreas. Dentro de esta, emerge de
                                entre los paredones rojizos una geoformas conocida como "Puente Natural", la visita
                                incluye la modalidad a elección ya sea trekking o cabalgata. Toda la Reserva se enmarca
                                en un paisaje único, donde la historia y la naturaleza lo cautivarán a cada segundo.
                                <br></br>
                                Durante Semana Santa:<br></br>
                                Se recomienda en el caso de cabalgatas u otra actividad que no sea trekking reservar con
                                anticipación. El ingreso a los circuitos y apertura de las visitas (vehicular) estará
                                disponible de jueves a lunes desde las 8:00 hs a 18:00 hs.<br></br>
                                Prestador: <br></br>
                                *Cooperativa El Chacho Los Colorados<br></br>
                                Teléfono de contacto (wsp): 0380-154642945<br></br>
                                Web: <a>www.reservaloscolorados.com.ar </a>
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>QUEBRADA DE LOS CÓNDORES</TitleSanta>
                            <p>
                                <b> Localización: </b> Departamento Ángel Vicente Peñaloza <br></br>
                                <b>Actividad:</b> Trekking, cabalgata<br></br>
                                <b>Grado de dificultad:</b> Moderado<br></br>
                                <b>Tiempo:</b> 2 a 5 hs (depende de la actividad elegida)<br></br>
                                Hileras de Sierras cubiertas de verde y varios riachuelos marcan un trazo profundo entre
                                las quebradas, es el camino a Sierra de Los Quinteros. En este hermoso paisaje existen
                                varios miradores naturales para la observación del cóndor andino en su hábitat natural.
                                El mirador Balcón de los Cóndores en Santa Cruz conocido como Quebrada de los Cóndores o
                                Quebrada del Cóndor es el más conocido tal vez por los años que la Familia de la Vega
                                vienen ofreciendo los servicios de alojamiento, comida y visitas. También en el paraje
                                Las Higueras otro balcón nos ofrece vistas fabulosas hacia la Quebrada y Dique de Olta,
                                cautivándolo a quienes visitan estos puntos de observación. Las visitas pueden hacerse
                                en cualquiera época del año en diferentes modalidades, trekking, senderismo, cabalgata,
                                o si prefiere solo disfrutar de la tranquilidad del lugar.<br></br>
                                Prestador: <br></br>
                                Guías locales Posta Quebrada del Cóndor<br></br>
                                Teléfono de contacto (wsp): 380-4803725<br></br>
                                Mail de contacto: <a> postaloscondores@yahoo.com.ar </a> <br></br>
                                Website: <a>www.quebradadelcondor.com.ar </a>
                            </p>
                        </Activity>
                    </Carousel.Item>
                </Carousel>
            </CarouselWrapper>
            <ButtonCarouselPrev onClick={handlePrev}>
                <ArrowLeftOutlined color={'#380206'} />
            </ButtonCarouselPrev>
            <ButtonCarousel onClick={handleNext}>
                <ArrowRightOutlined color={'#380206'} />
            </ButtonCarousel>
        </Activities>
    );
    const BodegaCarrusel = (
        <Activities>
            <CarouselWrapper>
                <Carousel arrows={false} interval={300000} ref={carouselRef}>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>Visitas a nuestras bodegas con visitas guidas.</TitleSanta>
                            <p>
                                Recordamos que las visitas cuenta con el servicio de degustación en algunas de las
                                bodegas, por ellos solicitamos que al momento de realizar dicha visita, los turísticas
                                pongan en conocimiento de la persona que será designada como conductor para poner en
                                conocimiento de las misma.
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>DEPARTAMENTO FAMATINA:</TitleSanta>
                            <p>
                                <b> Chañarmuyo</b>
                                <br></br>
                                <b> Bodega y Casa de Huéspedes</b>
                                <br></br>
                                Camino al dique s/n y ruta provincial nº39 km 15 <br></br>
                                Tel. 380 – 154278010 Lionel - Visita con reserva previa<br></br>
                                Correo electrónico: <a>reservas@chanarmuyo.com </a> <br></br>
                                Página web: <a>www.chanarmuyo.com </a> <br></br>
                                Visitas Guiadas de Lunes a Sábados 11hs. <br></br>
                                Venta de productos Al hospedarse allí la visita guiada es sin costo
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>DEPARTAMENTO CHILECITO: </TitleSanta>
                            <p>
                                <b> Valle de la Puerta, Chilecito</b> <br></br>
                                <b>Vichigasta</b> <br></br>
                                Dirección: Ruta Nacional 74km 1186 <br></br>
                                TEL. 03825-490085/ 15526467 Alicia Páez - Visita con reserva previa<br></br>
                                <a>aliciapaez@valledelapuerta.com </a> <br></br>
                                <a>www.valledelapuerta.com </a> <br></br>
                                <a>jcollovati@valledelapuerta.com </a>
                                <br></br>
                                Visitas guiadas en auto por los viñedos + Visita a la bodega. <br></br>
                                Degustación, Venta de Vino y Aceites de Oliva. <br></br>
                                Horario de Atención: de 8:30 a 18 hs. De lunes a Sábados <br></br>
                                Domingo de 8:30 a 13 hs.
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>La Riojana Cooperativa Vitivinícola, Chilecito</TitleSanta>
                            <p>
                                Dirección: La Plata 646 <br></br>
                                Tel: 3825-423150<br></br>
                                <a>www.lariojana.com.ar </a> <br></br>
                                <a> turismo@lariojana.com.ar</a> <br></br>
                                Salón de venta abierto con degustación de sus productos Vino y Oliva. <br></br>
                                Horario de Atención: <br></br>
                                Jueves y viernes de 8 a 17 hs. <br></br>
                                Sábado de 9 a 13 hs.
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>DEPARTAMENTO SANAGASTA:</TitleSanta>
                            <p>
                                <b>Finca Vista Larga </b> <br></br>
                                Dirección: Ruta Nac. Km 75 Sanagasta, Valle de Huaco. Dpto. Castro Barros <br></br>
                                Finca orgánica familiar. Vinos varietales, aceite de oliva virgen extra, aceitunas y
                                nueces.
                                <br></br>
                                Contactar vía whatsapp o en las redes @fincavistalarga <br></br>
                                Visitas Guiadas, degustación y venta. <br></br>
                                Horarios de Atención 10 a 19 hs. Visita con reserva previa<br></br>
                                Tel: 0380 421-4901 Matías Laboran / mail:<a> info@vistalarga.com.ar </a> <br></br>
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>Finca Lomas Blancas, Villa Sanagasta </TitleSanta>
                            <p>
                                Dirección: Ruta Nacional 75 Km 30 <br></br>
                                Visita con reserva previa al tel 380- 450074 <br></br>
                                Restaurant y casa de te.<br></br>
                                Abierto jueves , viernes , sabado y domingo.<br></br>
                                Horario de Atencion a partir de las 12 hs. <br></br>
                                Sabado mediodia cantante Maria Rosa Mercado en el almuerzo <br></br>
                                <a>www.fincalomasblancas.com </a>
                                <br></br>
                                Facebook: finca lomas blancas<br></br>
                                Instagram: fincalomasblancas
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>DEPARTAMENTO CASTRO BARROS:</TitleSanta>
                            <p>
                                <b>Viñedo y Bodega Artesanal “Casa India “ </b> <br></br>
                                <b> Vinos Artesanales </b>
                                <br></br>
                                Agua Blanca, Dpto. Castro Barros <br></br>
                                Dirección: Ruta Nac. 75 km 72 ½<br></br>
                                Horario de Atención 9 a 19 hs <br></br>
                                Visitas guiadas a viñedo y bodega - Degustación y venta de Vinos artesanales. <br></br>
                                Cel.: 0380-154494889 Silvio Salvadore - Se reciben grupos hasta 6 personas por recorrido
                                y se solicita visita con reserva previa.<br></br>
                                <a>indiacasa@gmail.com </a>
                                <br></br>
                                <a> www.facebook.com/vinoscasaindia</a>
                                <br></br>
                                <a>www.indiacasa.com</a>
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>Bodega y Finca de Aminga, Castro Barros</TitleSanta>
                            <p>
                                <b>Vinos “Febrero Riojano” </b> <br></br>
                                Dirección: Av. Castro Barros S/N. <br></br>A 80 km de la ciudad Capital, tomando la Ruta
                                Nac. 75 en el Centro de Aminga. <br></br>
                                Visitas guiadas por los viñedos y bodega – Degustación <br></br>
                                Horario de Atención todos los días de 9 a 17 hs. En el Salón de Venta <br></br>
                                Tel; 3825- (15) 558178 / 380 (15) 4882953 - Visita con reserva previa<br></br>
                                <a href="mailto:bodegadeaminga@gmail.com">bodegadeaminga@gmail.com</a> <br></br>
                                FB: Bodega de Aminga <br></br>
                                IG: febreroriojano
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>DEPARTAMENTO GENERAL FELIPE VARELA: </TitleSanta>
                            <p>
                                <b>Bodega Familia Sacavino Arrieta</b> <br></br>
                                <b>Vino artesanal</b> <br></br>
                                Los Palacios (camino a Talampaya) <br></br>
                                Tel: 0351- 156186283 Liliana Arrieta <br></br>
                                0351 156160898 Luis Sacavino <br></br>
                                Visita con reserva previa<br></br>
                                Horario de Atención de 9: 30 a 12:30 hs. / 16: 30 a 21 hs. <br></br>
                                Ubicado en Bv. Principal Los Palacios 9550 <br></br>
                                Visitas guiadas a viñedos y bodega, venta de productos, comidas Regionales.<br></br>
                                Del 01/04 al 04/04 Tapeos y Pinchos<br></br>
                                <a href="mailto:bodegafamiliasacavinoarrieta@gmail.com">
                                    bodegafamiliasacavinoarrieta@gmail.com
                                </a>{' '}
                                <br></br>
                                Facebook: Bodega Familia Sacavino Arrieta<br></br>
                                Instagram: bodegasacavinoarrieta<br></br>
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>BODEGA DE AICUÑA </TitleSanta>
                            <p>
                                <b>Aicuña</b> <br></br>
                                <b>Vinos Caseros </b>
                                <br></br>
                                Dirección: Ruta Prov. N° 17 (a 1 km del arco de entrada al pueblo)<br></br>
                                Contacto: 3825-15534013 Leonardo Ormeño - Visita con reserva previa<br></br>
                                Horario de Atención 9 a 12 hs. / 15 a 18 hs. <br></br>
                                Degustación, Visitas guiada y venta de productos.<br></br>
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>Bodega Artesanal “Las Jarillas” - Vinos Artesanales Guandacol</TitleSanta>
                            <p>
                                Dirección: Mariano Moreno s/n <br></br>
                                Tel: 011-56355341 Ricardo Aguilar - Visita con reserva previa<br></br>
                                Reservas: <a href="">jarillasdeguandacol@yahoo.com.ar </a>
                                <br></br>
                                Bodega Artesanal +Restaurante + Alojamiento + Venta de sus productos <br></br>
                                Horario: de 10 a 13 hs. / 17 a 19 hs. <br></br>
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>DEPARTAMENTO ARAUCO </TitleSanta>
                            <p>
                                <b>Hilal </b> <br></br>
                                Productora de Oliva <br></br>
                                Aceites y aceitunas <br></br>
                                Dirección: Local comercial, calle 25 de Mayo <br></br>
                                Horario Semana Santa de 9 a 13hs y 17:30 a 22 hs. Domingo de 9 a 13 hs. <br></br>
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>Familia Giordana Olivares </TitleSanta>
                            <p>
                                <b>Aceituna y Aceite de Oliva </b> <br></br>
                                Dirección: Ruta Nac. 74 Km 1169 - Vichigasta <br></br>
                                Tel: 3825-490641/42 fijo Visita con reserva previa <br></br>
                                Visitas guiada por la finca y la Fábrica. Venta de aceites de oliva, Aceituna, Productos
                                cosméticos a base de olivo y plantines. <br></br>
                                Face: Familia Giordana Olivares <br></br>
                                <a href="">www.familiagiordana.com </a>
                            </p>
                        </Activity>
                    </Carousel.Item>
                </Carousel>
            </CarouselWrapper>
            <ButtonCarouselPrev onClick={handlePrev}>
                <ArrowLeftOutlined />
            </ButtonCarouselPrev>
            <ButtonCarousel onClick={handleNext}>
                <ArrowRightOutlined />
            </ButtonCarousel>
        </Activities>
    );

    const MuseoCarrusel = (
        <Activities>
            <CarouselWrapper>
                <Carousel arrows={false} interval={300000} ref={carouselRef}>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>GUIADAS ESPECIALIZADAS</TitleSanta>
                            <p>
                                La propuesta consiste en realizar guías y recorridos por circuitos y sitios de interés
                                patrimonial a fin fortalecer y difundir el valor cultural de estos lugares. El recorrido
                                está planteado con un tiempo estimado entre 45 minutos y 1 hora y media, dependiendo del
                                circuito o sitio, en los días jueves 1, viernes 2 y sábado 3 (hasta el medio día) de
                                abril. La visita especializada comprende los siguientes Museos, sitios y circuitos:
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>Museo INCA HUASI (Departamento Capital) </TitleSanta>
                            <p>
                                • Horarios: de 9 a 13 y de 15 a 19 hs.<br></br>• Punto de partida: Museo Inca Huasi -
                                Dirección: Juan Bautista Alberdi 650<br></br>• Duración de la visita 45min aprox
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>Museo de ARTE SACRO (Departamento Capital)</TitleSanta>
                            <p>
                                • Horarios: de 9 a 13 y de 15 a 19 hs<br></br>• Punto de Partida: Casa de Culturas -
                                Dirección: Pelagio B. Luna esq. Catamarca<br></br>• Horario de inicio de la visita
                                especializada: <br></br>• Duración de la visita 1 hora y media aprox.
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>Museo QYLLUR ÑAN (Departamento Vinchina) </TitleSanta>
                            <p>Horarios: 10 a 13 y de 15 a 18 hs.</p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>Museo Castro Barros (Localidad de Chuquis) </TitleSanta>
                            <p>Horarios: de 10 a 13 y de 15 a 18 hs.</p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>
                                Naranjo Histórico y Celda de San Francisco (Monumento Histórico Nacional){' '}
                            </TitleSanta>
                            <p>
                                • Horario de apertura: de 9 a 12 y de 16 a 19 hs <br></br>• Punto de partida: Convento
                                San Francisco Solano – Dirección: 25 de Mayo esq. Abel Bazan y Bustos<br></br>• Duración
                                de la visita 30 min aprox.
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>LAS PADERCITAS: Iglesia y Templete (Monumento Histórico Nacional)</TitleSanta>
                            <p>
                                • Horario de apertura: de 9 a 12 y de 16 a 19 hs <br></br>• Punto de partida: Museo Inca
                                Huasi - Dirección: Juan Bautista Alberdi 650<br></br>• Duración de la visita 1 hora
                                aprox.
                                <br></br>• Servicio de traslado a Las Padercitas sin cargo
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>SITIO HISTÓRICO Y ARQUEOLÓGICO ESTANCIA JESUITA EL SALADILLO. </TitleSanta>
                            <p>
                                • Punto de partida: Museo Inca Huasi - Dirección: Juan Bautista Alberdi 650 <br></br>•
                                Horario de apertura de 10:13 y 16:30 hs<br></br>• Duración de la visita 1 hora y media
                                aprox.<br></br>• Servicio de traslado a El Saladillo sin cargo
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>BUS AL PARQUE NACIONAL TALAMPAYA</TitleSanta>
                            <p>
                                Servicio de traslado al Parque Nacional Talampaya $3.000 (incluye traslado únicamente){' '}
                                <br></br>- Viernes 2 de Abril<br></br>- Lugar de Salida: Iglesia La Merced – Dirección:
                                Av. Rivadavia esq. 9 de Julio<br></br>- Horario: Salida a las 7 hs y regreso a las 16
                                hs.
                                <br></br>- Precio de excursión:<br></br>
                                Tarifa para residentes riojanos: $600<br></br>
                                Tarifa para nacionales: $1800<br></br>
                                Tel: 380 154580581 - E-mail: travelgit@gmail.com
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>ACTIVIDAD DEPARTAMENTO CAPITAL </TitleSanta>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>FERIA DE ARTESANOS </TitleSanta>
                            <p>
                                Lugar: Plaza Facundo Quiroga - Dirección: Pelagio B. Luna 100 <br></br>- Fecha: del
                                martes 30/03 al sábado 17/04<br></br>- Horarios: 10:00 a 13:00 hs y de 14:00 a 23:00 hs
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>FERIA “ENTRE REDES”</TitleSanta>
                            <p>
                                Lugar: Paseo Creativo - Dirección: Pelagio B. Luna 764 <br></br>- Fechas: Jueves 1,
                                viernes 2 y sábado 3 de abril de 17 a 22hs.
                            </p>
                        </Activity>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Activity>
                            <TitleSanta>MERCADO ARTESANAL</TitleSanta>
                            <p>
                                Dirección: Pelagio B. Luna esq. Catamarca <br></br>- Fechas: Jueves 1, viernes 2 y
                                sábado 3 de abril de 9:30 a 13 hs y 17 a 21hs.
                            </p>
                        </Activity>
                    </Carousel.Item>
                </Carousel>
            </CarouselWrapper>
            <ButtonCarouselPrev onClick={handlePrev}>
                <ArrowLeftOutlined />
            </ButtonCarouselPrev>
            <ButtonCarousel onClick={handleNext}>
                <ArrowRightOutlined />
            </ButtonCarousel>
        </Activities>
    );

    return (
        <MainWrapper>
            <Layout title={'Contacto - Movete por La Rioja'}>
                <IndexWrapper>
                    <FirstBlock src="portada.jpg" alt="Imagen fondo en página contacto">
                        <WhiteBack src="/whitebackground.png" alt="Imagen estilo recorte papel" />
                    </FirstBlock>
                    <PregFreq>
                        <Title>SEMANA SANTA 2021</Title>
                        <Pestañas>
                            <PestañaOption
                                onClick={() => setActiveOption('TURISMO')}
                                active={activeOption === 'TURISMO'}
                            >
                                {' '}
                                TURISMO AVENTURA
                            </PestañaOption>
                            <PestañaOption
                                onClick={() => setActiveOption('BODEGAS')}
                                active={activeOption === 'BODEGAS'}
                            >
                                {' '}
                                BODEGAS TURÍSTICAS
                            </PestañaOption>
                            <PestañaOption onClick={() => setActiveOption('MUSEO')} active={activeOption === 'MUSEO'}>
                                {' '}
                                MUSEO Y CIRCUITOS GUÍADOS
                            </PestañaOption>
                        </Pestañas>
                        {activeOption === 'TURISMO' && TurismoCarrusel}
                        {activeOption === 'BODEGAS' && BodegaCarrusel}
                        {activeOption === 'MUSEO' && MuseoCarrusel}
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
        padding: 2% 0% 3% 0%;
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
    height: 60vh;
    position: relative;
`;
export const PregFreq = styled.div`
    height: fit-content;
    padding: 1vw 4vw 4vw 4vw;
    width: 100%;
    display: grid;
    @media (max-width: 600px) {
        padding: 1vw 0 4vw 0;
    }
`;
export const Title = styled.h1`
    font-family: 'Karla', sans-serif;
    color: #41060c;
    justify-self: center;
    letter-spacing: 3px;
    @media (max-width: 600px) {
        font-size: 1.2rem;
    }
`;

export const Pestañas = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        margin: 2vh 0 0 0;
    }
`;
export const PestañaOption = styled.h4`
    font-family: 'Karla', sans-serif;
    color: #41060c;
    letter-spacing: 3px;
    text-align: center;
    cursor: pointer;
    border: 1px solid #41060c;
    justify-self: center;
    background: ${(props) => (props.active ? '#41060c' : 'none')};
    color: ${(props) => (props.active ? 'white' : '#41060c')};
    padding: 4px;
    width: 90%;
    border-radius: 6px;
    @media (max-width: 600px) {
        font-size: 1rem;
    }
`;

export const Activities = styled.div`
    height: 100vh;
    width: 100%;
    background: #38020630;
    padding: 15px;
    position: relative;
    border-radius: 6px;
    .carousel-control-prev {
        display: none;
    }
    .carousel-control-next {
        display: none;
    }
    .carousel-item {
        height: 100vh;
        @media (max-width: 600px) {
            height: 150vh;
        }
    }
    @media (max-width: 600px) {
        height: 150vh;
        padding: 0;
    }
`;
export const TitleSanta = styled.h3`
    font-family: 'Karla', sans-serif;
    margin: 0;
    color: #41060c;
    font-size: 2rem;
    text-align: center;
    align-self: end;
    @media (max-width: 600px) {
        font-size: 1.2rem;
    }
`;

export const Activity = styled.div`
    margin: 0 0 0 0;
    height: 100vh;
    display: grid;
    p {
        font-size: 1.1rem;
        font-family: 'Karla', sans-serif;
        margin: 2vh 4vw;
        color: #41060c;
        padding: 0 4vw 0 4vw;
        @media (max-width: 600px) {
            font-size: 0.8rem;
            width: 100%;
            margin: 2vh 0vw;
        }
    }
    a {
        font-size: 1rem;
        font-family: 'Karla', sans-serif;
        color: blue !important;
    }
`;
export const ButtonCarousel = styled.button`
    position: absolute;
    right: 1%;
    top: 50%;
    border: none;
    background: white;
    border-radius: 999px;
    padding: 5px;
    display: grid;
    transform: translate(-50%, -50%);
    @media (max-width: 600px) {
        right: -6vw;
    }
`;
export const ButtonCarouselPrev = styled.button`
    position: absolute;
    left: 3%;
    border: none;
    background: white;
    border-radius: 999px;
    padding: 5px;
    top: 50%;
    display: grid;
    transform: translate(-50%, -50%);
    @media (max-width: 600px) {
        left: 0;
    }
`;
export const CarouselWrapper = styled.div`
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
