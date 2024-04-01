import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import logo from '../assests/IMG/logo.jpg';
import '../CSS/styles.css';

const AdminNavbar = () => {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('');
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Ref for the dropdown menu
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from local storage
        navigate('/login'); // Navigate to the login page
    };

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
                    <Link className="navbar-brand" to="/admin">
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
                            <li className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`}>
                                <Link className="nav-link" to="/admin" onClick={handleItemClick}>Admin</Link>
                            </li>
                            <li className={`nav-item ${location.pathname === '/adminuploadcomponent' ? 'active' : ''}`}>
                                <Link className="nav-link" to="/adminuploadcomponent" onClick={handleItemClick}>Home</Link>
                            </li>
                            {/* <li className={`nav-item ${location.pathname === '/adminproduct' ? 'active' : ''}`}>
                                <Link className="nav-link" to="/adminproduct" onClick={handleItemClick}>Product</Link>
                            </li> */}
                            <li className="nav-item dropdown">
                                <Link
                                    className={`nav-link dropdown-toggle ${location.pathname === '/adminproduct' ? 'active' : ''}`}
                                    to="/adminproduct"
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
     
                                    <li onClick={handleItemClick}><Link className="dropdown-item" to="/adminwire">Wires</Link></li>
                                    <li onClick={handleItemClick}><Link className="dropdown-item" to="/adminpipes">Pipes</Link></li>
                                    <li onClick={handleItemClick}><Link className="dropdown-item" to="/adminwaterpipes">Water Pipes</Link></li>
                                    <li onClick={handleItemClick}><Link className="dropdown-item" to="/adminblubs">Blubs</Link></li>
                                    <li onClick={handleItemClick}><Link className="dropdown-item" to="/adminplastictaps">Plastic Taps</Link></li>

                                </ul>
                            </li>
                            {/* <li className={`nav-item ${location.pathname === '/adminwire' ? 'active' : ''}`}>
                                <Link className="nav-link" to="/adminwire" onClick={handleItemClick}>Wires</Link>
                            </li> */}
                            <li className={`nav-item ${location.pathname === '/admincontact' ? 'active' : ''}`}>
                                <Link className="nav-link" to="/admincontact" onClick={handleItemClick}>Contact</Link>
                            </li>
                            <li className={`nav-item ${location.pathname === '/adminnews' ? 'active' : ''}`}>
                                <Link className="nav-link" to="/adminnews" onClick={handleItemClick}>News</Link>
                            </li>
                            <li>
                            <button onClick={handleLogout} aria-label="Logout" >
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-logout"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
    <path d="M7 12h14l-3 -3m0 6l3 -3" />
  </svg>
</button>
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

export default AdminNavbar;
