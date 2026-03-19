import React, { useState, useContext, useCallback } from 'react'

const notificationContext = React.createContext();

export const useNotification = () => {
    const context = useContext(notificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const notify = useCallback((message, type = 'info') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 3000);
    }, []);

    return (
        <notificationContext.Provider value={{ notifications, notify }}>
            {children}
        </notificationContext.Provider>
    );
}
