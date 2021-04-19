import { useEffect } from 'react';
import { ZEITUIProvider, CSSBaseline } from '@zeit-ui/react';
import Router from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from '../context/global';
import { StepProvider } from '../context/steps';
import '../css/global.css';
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { ParallaxProvider } from 'react-scroll-parallax';
import store from '../redux/store';

function MyApp({ Component, pageProps }) {
    return (
        <ZEITUIProvider>
            <CSSBaseline />
            <Provider store={store}>
                <CartProvider>
                    <StepProvider>
                        <AnimatePresence exitBeforeEnter>
                            <ParallaxProvider>
                                <Component {...pageProps} />
                            </ParallaxProvider>
                        </AnimatePresence>
                    </StepProvider>
                </CartProvider>
            </Provider>
        </ZEITUIProvider>
    );
}

export default MyApp;
