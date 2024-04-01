import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import axios from 'axios';
import '../CSS/styles.css';

const TopNavbar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [shopStatus, setShopStatus] = useState(null);

    useEffect(() => {
        // Fetch shop status from API
        const fetchShopStatus = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/shop/status');
                setShopStatus(response.data.status);
            } catch (error) {
                console.error('Error fetching shop status:', error);
            }
        };

        fetchShopStatus();
    }, []);

    return (
        <nav className={`navbar navbar-expand-lg navbar-dark bg-darks ${isHovered ? 'top-bar-hovered' : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="container-fluid">
                <div className="text-white">
                    {shopStatus !== null && (
                        <>
                            <span>{shopStatus ? 'Shop is Open' : 'Shop is Closed'}</span>
                            <span className="ms-3 d-lg-inline">{shopStatus ? 'Open: 8am - 7pm' : 'Contact Phone  Timing 8am to 7pm'}</span>
                        </>
                    )}
                </div>
                <div className="ms-auto d-none d-lg-block">
                    <a href="/" className="text-white me-3 social-icons"><FaTwitter /></a>
                    <a href="/" className="text-white me-3 social-icons"><FaFacebookF /></a>
                    <a href="/" className="text-white social-icons"><FaInstagram /></a>
                </div>
            </div>
        </nav>
    );
}

export default TopNavbar;
