import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/animations/loading.json';
import { useSelector } from 'react-redux';

const Loading = () => {
    // const { isLoading } = useSelector((state) => state.loading);
    return (
        <div className="z-50 h-[500px] flex items-center justify-center">
            <Lottie
                style={{ height: 150 }}
                animationData={loadingAnimation}
                loop={true}
            />
        </div>
    );
};

export default Loading;
