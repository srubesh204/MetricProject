import React from 'react';
import Notification from './Notifications';
import { ArrowLeft, Notifications } from '@mui/icons-material';


const HangingNoti = () => {
    const [showNotification, setShowNotification] = React.useState(false);

    return (
        <div className="hanging-item" onMouseEnter={() => setShowNotification(true)} onMouseLeave={() => setShowNotification(false)}>
            <span><ArrowLeft style={{color: "white"}}/><Notifications style={{color: "white"}}/></span>
            {showNotification && <Notification />}
        </div>
    );
};

export default HangingNoti;
