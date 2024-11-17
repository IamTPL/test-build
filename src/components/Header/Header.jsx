import React, { useState } from 'react';
import './HeaderStyle.css';
import userAvatar from '../../assets/user-avatar.png';
import bestLogo from '../../assets/best-logo.png';
import { Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import LogoutConfirmation from '../LogoutConfirmation/LogoutConfirmation';
import { fromJSON } from 'postcss';
import { LogoutOutlined } from '@ant-design/icons';

const Header = () => {
    const navigate = useNavigate();
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

    const handleMenuClick = ({ key }) => {
        if (key === 'login') {
            navigate('/login');
        } else if (key === 'logout') {
            setIsLogoutModalVisible(true);
        }
    };

    const items = [
        {
            key: 'logout',
            label: (
                <span className="py-1">
                    <LogoutOutlined className="mr-2" /> Logout{' '}
                </span>
            ),
        },
    ];

    return (
        <header className="header flex items-center justify-between pl-8 pr-16 h-[7vh] border-b-[1px]">
            <div className="flex items-center">
                <a href="/">
                    <img
                        src={bestLogo}
                        style={{ width: '86px', height: '50px' }}
                        className="rounded-full"
                        alt="profile"
                    />
                </a>
                <p className="font-bold text-xl mb-0">QBO Automation Tool</p>
            </div>
            <div className="flex items-center mb-0">
                <button>
                    <a className="font-bold">Dashboard</a>
                </button>
                <Dropdown
                    menu={{ items, onClick: handleMenuClick }}
                    placement="bottomRight"
                >
                    <button>
                        <img
                            src={userAvatar}
                            className="rounded-full h-8 w-8 ml-6"
                            alt="profile"
                        />
                    </button>
                </Dropdown>
            </div>
            <LogoutConfirmation
                isVisible={isLogoutModalVisible}
                onCancel={() => setIsLogoutModalVisible(false)}
            />
        </header>
    );
};

export default Header;
