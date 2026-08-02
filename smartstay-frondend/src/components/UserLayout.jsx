// src/components/user/UserLayout.jsx

import React, { useState } from 'react';
import UserSidebar from './UserSidebar';

const UserLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    return (
        <div style={styles.container}>
            <UserSidebar 
                isSidebarOpen={isSidebarOpen}
                user={user}
                bookings={bookings}
                wishlist={wishlist}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <div style={styles.content}>
                {children}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        minHeight: '100vh',
        background: '#eef2f6',
    },
    content: {
        flex: 1,
        marginLeft: '0',
        padding: '0',
        background: '#eef2f6',
        minHeight: '100vh',
    },
};

export default UserLayout;