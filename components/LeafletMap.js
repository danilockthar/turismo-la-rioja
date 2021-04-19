import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import MapboxStyle from './MapboxStyle';
import 'leaflet/dist/leaflet.css';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

const MAPBOX_ACCESS_TOKEN =
    'pk.eyJ1IjoiZGFuaWxvY2t0aGFyIiwiYSI6ImNrNnRoaTYwbDBpN2szZm9nZ3o2bWRweHgifQ.7uuAmAjwb4OFv50g2GvMQg';

const LeafletMap = (props) => {
    const mapRef = useRef(null);
    const [loadMap, setLoadMap] = useState(false);
    let loveIcon = L.icon({
        iconUrl: '/place.svg',
        iconRetinaUrl: '/place.svg',
        iconAnchor: [17, 46],
        popupAnchor: [10, -44],
        iconSize: [35, 65],
    });

    const setMap = (action) => {
        if (action) {
            setTimeout(() => {
                setLoadMap(true);
            }, 50);
        } else {
            setLoadMap(false);
        }
    };

    useEffect(() => {
        if (props.isOpen) {
            setMap(true);
        } else {
            setMap(false);
        }
    }, [props.isOpen]);

    return (
        <WrapperWrapper open={props.isOpen}>
            <WrapperMap open={props.isOpen}>
                <a className="close-tag" onClick={props.openMap}>
                    <AiOutlineClose size="30px" color="#333" />
                </a>
                {loadMap ? (
                    <Map
                        scrollWheelZoom={false}
                        center={[props.latitud, props.longitud]}
                        zoom={13}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <MapboxStyle accessToken={MAPBOX_ACCESS_TOKEN} style="mapbox://styles/mapbox/streets-v9" />
                        <TileLayer
                            attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker icon={loveIcon} position={[props.latitud, props.longitud]}>
                            <Popup>Ubicación</Popup>
                        </Marker>
                    </Map>
                ) : (
                    <Loader
                        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                        type="TailSpin"
                        color="#00BFFF"
                        height={50}
                        width={50}
                    />
                )}
            </WrapperMap>
        </WrapperWrapper>
    );
};

export default LeafletMap;

export const WrapperWrapper = styled.div`
    transition: 0.3s;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: #00000059;
    overflow-y: none;
    z-index: 1900;
    display: ${(props) => (props.open ? 'block' : 'none')};
`;

export const WrapperMap = styled.div`
    transition: 0.3s;
    background: white;
    border-radius: 6px;
    padding: 10px;
    position: fixed;
    z-index: 2000;
    width: 80%;
    height: 70%;
    display: ${(props) => (props.open ? 'block' : 'none')};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media (max-width: 600px) {
        height: 50vh;
    }
    .close-tag {
        padding: 6px;
        background: white;
        border-radius: 30px;
        -webkit-box-shadow: 0px 0px 5px 0px rgba(61, 59, 61, 1);
        -moz-box-shadow: 0px 0px 5px 0px rgba(61, 59, 61, 1);
        box-shadow: 0px 0px 5px 0px rgba(61, 59, 61, 1);
        position: absolute;
        top: -3vh;
        right: -1vw;
        z-index: 3000;
        @media (max-width: 600px) {
            right: -4vw;
        }
    }
`;
