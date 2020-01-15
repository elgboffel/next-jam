import React from 'react';
import App from 'next/app';
import { AnimatePresence } from 'framer-motion';
import SiteLayout from '~/src/js/components/SiteLayout';

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    return (
        <SiteLayout>
            <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} key={router.route} />
            </AnimatePresence>
        </SiteLayout>
    );
  }
}

export default MyApp;