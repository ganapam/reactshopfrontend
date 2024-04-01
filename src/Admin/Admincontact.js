// Import dependencies
import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Define AdminContact component
const AdminContact = () => {
  // Initialize navigate hook
  const navigate = useNavigate();

  // State to store contacts data
  const [contacts, setContacts] = useState([]);

  // Function to fetch contact data
  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/contact/');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contact data:', error);
    }
  };

  // Function to delete a contact by ID
  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/contact/${id}`);
      // After deleting, refetch the contact data to update the list
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  // Check for token in local storage to determine if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If token is not found, redirect to login page
      navigate('/login');
    } else {
      // If token is found, fetch contact data
      fetchContacts();
    }
  }, [navigate]); // Add navigate to the dependencies array to ensure useEffect runs when navigate changes

  // Render component
  return (
    <div>
      <AdminNavbar />
      <div className="wehavetogiveclass">
        <h2>Contact List</h2>
        <div className="row">
          {contacts.map((contact) => (
            <div key={contact.id} className="col-md-0">
              <Card>
                <Card.Body>
                  <Card.Title>Name: {contact.name}</Card.Title>
                  <Card.Text>Email: {contact.email}</Card.Text>
                  <Card.Text>Message: {contact.message}</Card.Text>
                  <Button variant="danger" onClick={() => deleteContact(contact.id)}>Delete</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Export AdminContact component
export default AdminContact;
