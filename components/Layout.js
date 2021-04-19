import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import WhatsApp from './WhatsApp';
import DeclaracionJurada from './DeclaracionJurada';

const Layout = ({ children, title = '', optitle, opimage, opdescription }) => {
    return (
        <div>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
                <meta charSet="utf-8" />
                <meta name="description" content="Comprá tu paquete de viajes La Rioja" />
                <meta property="og:site_name" content="Movete por la Rioja" />
                <meta property="og:title" content={optitle || 'Movete por la Rioja'} />
                <meta
                    property="og:description"
                    content={opdescription || 'Reservá tu paquete o excursión y conocé La Rioja'}
                />
                <meta
                    property="og:image"
                    itemprop="image"
                    content={opimage || 'https://movete.larioja.gob.ar/marca2.png'}
                />
                <meta property="og:type" content="website" />
                <meta property="og:updated_time" content="1440432930" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,400;1,500&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap"
                    rel="stylesheet"
                />
                <title>{title}</title>
            </Head>
            <Header />
            {children}
            <DeclaracionJurada />
            <WhatsApp />
            <Footer />
        </div>
    );
};

export default Layout;
