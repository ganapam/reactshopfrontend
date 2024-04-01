// Admin.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Footer from '../Footer/Footer';
import axios from 'axios';
import './Admin.css'; 

const AdminPage = () => {
    const [shopStatus, setShopStatus] = useState(null);
    const navigate = useNavigate(); // Hook provided by react-router-dom

    useEffect(() => {
        const fetchShopStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    // Redirect to login if token is not found
                    navigate('/login');
                    return;
                }
                const response = await axios.get('http://127.0.0.1:8000/shop/status', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setShopStatus(response.data);
            } catch (error) {
                console.error('Error fetching shop status:', error);
                // Handle unauthorized access or other errors
                navigate('/login'); // Redirect to login on error
            }
        };

        fetchShopStatus();
    }, [navigate]); // Added navigate to the dependencies array to fix the warning

    const handleStatusUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                // Redirect to login if token is not found
                navigate('/login');
                return;
            }
            const newStatus = !shopStatus.status; // Toggle the status
            const response = await axios.post('http://127.0.0.1:8000/shop/status', {
                status: newStatus
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setShopStatus({ ...response.data, status: newStatus }); // Update status locally
        } catch (error) {
            console.error('Error updating shop status:', error);
            // Handle unauthorized access or other errors
            navigate('/login'); // Redirect to login on error
        }
    };

    return (
        <div>
            <AdminNavbar/>
            <div className="container">
                {shopStatus !== null && (
                    <div className="status-container">
                        <p className="status-message">
                            {shopStatus.status ? 'Shop is open' : 'Shop is closed'}
                        </p>
                        <button className="status-button" onClick={handleStatusUpdate}>
                            {shopStatus.status ? 'Close Shop' : 'Open Shop'}
                        </button>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default AdminPage;
