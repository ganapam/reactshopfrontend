import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assests/IMG/logo.jpg';
import '../CSS/styles.css';

const MainNavbar = () => {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('');
    const dropdownRef = useRef(null); // Ref for the dropdown menu

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50);
            setScrollDirection(scrollTop > 50 ? 'up' : 'down');
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // Add event listener to close dropdown when clicking outside of it
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.body.addEventListener('click', handleOutsideClick);

        return () => {
            document.body.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        // Add event listener to prevent dropdown from closing when cursor is near the border of the dropdown
        const handleMouseMove = (event) => {
            if (
                dropdownRef.current &&
                dropdownRef.current.contains(event.target) &&
                Math.abs(event.clientY - dropdownRef.current.getBoundingClientRect().top) < 10
            ) {
                setIsDropdownOpen(true);
            } else {
                setIsDropdownOpen(false);
            }
        };

        document.body.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.body.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleItemClick = () => {
        setIsDropdownOpen(false); // Close the dropdown menu when an item is clicked
    };

    return (
        <div>
            <nav className={`navbar navbar-expand-lg navbar-dark bg-dark ${isScrolled ? 'fixed-top' : ''}`}>
                <div className="container-fluid">
                    {/* Logo */}
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Logo" className="logo-img" />
                        {/* Your Company */}
                    </Link>

                    {/* Button for toggling the collapsed navbar */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navigation links */}
                    <div className={`collapse navbar-collapse ${isDropdownOpen ? 'show' : ''}`} id="navbarSupportedContent" ref={dropdownRef}>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                                <Link className="nav-link" to="/" onClick={handleItemClick}>Home</Link>
                            </li>
                            <li className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>
                                <Link className="nav-link" to="/about" onClick={handleItemClick}>About</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    className={`nav-link dropdown-toggle ${location.pathname === '/products' ? 'active' : ''}`}
                                    to="/products"
                                    id="navbarDropdown"
                                    role="button"
                                    aria-expanded={isDropdownOpen ? 'true' : 'false'}
                                    onClick={toggleDropdown}
                                    onMouseEnter={toggleDropdown}
                                    onMouseLeave={toggleDropdown}
                                    style={{ zIndex: isDropdownOpen && scrollDirection === 'up' ? '999' : '0' }} // Adjust z-index dynamically
                                >
                                    Products
                                </Link>
                                <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                                    {/* Iterate over your products here */}
                                    <li onClick={handleItemClick}><Link className="dropdown-item" to="/wire">Wires</Link></li>
                                    <li onClick={handleItemClick}><Link className="dropdown-item" to="/pipes">Pipes</Link></li>
                                    <li onClick={handleItemClick}><Link className="dropdown-item" to="/waterpipes">Water Pipes</Link></li>
                                    <li onClick={handleItemClick}><Link className="dropdown-item" to="/blubs">Blubs</Link></li>
                                    <li onClick={handleItemClick}><Link className="dropdown-item" to="/plastictaps">Plastic Taps</Link></li>
                                    {/* Add more product links as needed */}
                                </ul>
                            </li>
                            <li className={`nav-item ${location.pathname === '/news' ? 'active' : ''}`}>
                                <Link className="nav-link" to="/news" onClick={handleItemClick}>News</Link>
                            </li>
                            <li className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}>
                                <Link className="nav-link" to="/contact" onClick={handleItemClick}>Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Search bar */}
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-light" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </div>
    );
}

export default MainNavbar;
