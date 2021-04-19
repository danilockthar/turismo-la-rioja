import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from 'react-multi-carousel';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 601 },
        items: 3,
    },
    mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 1,
    },
};

const ROUTES = ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp', '7.webp', '8.webp'];

const GalleryBox = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [selected, setSelected] = useState();

    useEffect(() => {
        setIsLoading(true);
        try {
            setImages(props.gallery);
            setSelected('https://www.lrseguridad.com.ar/turismo/1.0/' + props.gallery[0].path);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }, []);

    return (
        <GalleryWrapper>
            {isLoading ? (
                <p>loading..</p>
            ) : (
                <>
                    <SelectedImage bg={selected} alt="Imagen del paquete seleccionada" />
                    <CarouselWrapper>
                        {images.map((item, key) => {
                            return (
                                <MiniImage
                                    bg={`https://www.lrseguridad.com.ar/turismo/1.0/${item.path}`}
                                    select={selected === item}
                                    onClick={() =>
                                        setSelected(`https://www.lrseguridad.com.ar/turismo/1.0/${item.path}`)
                                    }
                                    alt="Imagen miniatura en la galería de imagenes del paquete"
                                />
                            );
                        })}
                    </CarouselWrapper>
                </>
            )}
        </GalleryWrapper>
    );
};

export default GalleryBox;

export const GalleryWrapper = styled.div`
    width: 100%;
    height: fit-content;
    display: grid;
    grid-row-gap: 2vh;
`;

export const SelectedImage = styled.div`
    background-image: url('${(props) => props.bg}');
    width: 100%;
    height: 45vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 6px;
    transition: 0.2s;
`;

export const MiniImage = styled.div`
    background-image: url('${(props) => props.bg}');
    width: 100%;
    height: 15vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    transition: 0.2s;
    border-radius: 6px;
    border: ${(props) => (props.select ? '2px solid dodgerblue' : '2px solid transparent')};
    &:hover {
        border: 2px solid dogerblue;
    }
`;
export const CarouselWrapper = styled.div`
    display: grid;
    grid-row-gap: 1vh;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;
