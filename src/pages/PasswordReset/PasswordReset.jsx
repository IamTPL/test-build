import React from 'react';
import PasswordResetForm from './PasswordResetForm';
import loginImage from '../../assets/login.png';

const PasswordReset = () => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <PasswordResetForm />
            </div>
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img
                    src={loginImage}
                    alt="Login"
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
            </div>
        </div>
    );
};

export default PasswordReset;
