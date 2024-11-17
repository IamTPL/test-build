import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import DashBoard from '../pages/DashBoard/DashBoard';
import Login from '../pages/Login/Login';
import PasswordReset from '../pages/PasswordReset/PasswordReset';
import EmailReset from '../pages/EmailReset/EmailReset';
import Check from '../pages/Check/Check';
import Review from '../pages/Review/Review';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Layout Component={DashBoard}></Layout>}
                />
                <Route
                    path="/checks"
                    element={<Layout Component={Check}></Layout>}
                />
                <Route path="/login" element={<Login></Login>} />
                <Route
                    path="/login/reset"
                    element={<EmailReset></EmailReset>}
                />
                <Route
                    path="/login/reset/password"
                    element={<PasswordReset></PasswordReset>}
                />
                <Route
                    path="/review"
                    element={<Layout Component={Review}></Layout>}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
