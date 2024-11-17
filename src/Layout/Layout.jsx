import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Layout = ({ Component }) => {
    return (
        <>
            <Header></Header>
            <Component></Component>
            <Footer></Footer>
        </>
    );
};

export default Layout;
