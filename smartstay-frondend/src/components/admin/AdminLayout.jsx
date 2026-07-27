import React from 'react';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div style={styles.container}>
      <AdminSidebar />
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
    background: '#f0f2f5',
  },
  content: {
    marginLeft: '250px',
    flex: 1,
    padding: '20px',
    background: '#f0f2f5',
    minHeight: '100vh',
  },
};

export default AdminLayout;  // ⬅️ YEH IMPORTANT HAI