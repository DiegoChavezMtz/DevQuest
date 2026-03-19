import React from 'react'
import { useNotification } from '../Context/NotificationProvider'
import './Notification.css'

export const Notification = () => {
    const { notifications } = useNotification();

    return (
        <div className="notification-container">
            {notifications.map(({ id, message, type }) => (
                <div key={id} className={`notification notification--${type}`}>
                    {message}
                </div>
            ))}
        </div>
    );
}
