import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import TopNavbar from '../Navbars/TopNavbar';
import MainNavbar from '../Navbars/MainNavbar';
import Footer from '../Footer/Footer';
import '../CSS/styles.css';

const Contact = () => {
  // State variables for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      // Make POST request using Axios
      const response = await axios.post('http://127.0.0.1:8000/contact/', {
        name,
        email,
        message,
      });

      // Reset form fields and show success message
      setName('');
      setEmail('');
      setMessage('');
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error.message);
      setSubmitError('Failed to submit form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='contactbackground'>
      <TopNavbar />
      <MainNavbar />
      <Container className="my-5">
        {/* Big Card with Contact Form */}
        <Card className="contact-card my-3">
          <Card.Body>
            <Card.Title className="mb-4">Contact Us</Card.Title>
            {submitSuccess && <div className="text-success mb-3">Form submitted successfully!</div>}
            {submitError && <div className="text-danger mb-3">{submitError}</div>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-control"
                  required
                />
              </Form.Group>
              <div className="text-center"> {/* Centering the button */}
                <Button variant="primary" type="submit" className="submit-button" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        {/* Small Card with Contact Information */}
        <Row className="my-3">
          <Col>
            <Card className="contact-info-card">
              <Card.Body>
                <Card.Title className="mb-4000">Contact Information</Card.Title>
                <Card.Text>
                  <FaMapMarkerAlt /> Address: 123 Main Street, City, Country
                  <br />
                  <FaPhone /> Phone: +1234567890
                  <br />
                  <FaEnvelope /> Email: example@example.com
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Contact;
