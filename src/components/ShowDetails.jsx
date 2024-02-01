import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    try {
      fetch(`https://api.tvmaze.com/shows/${id}`)
        .then((response) => response.json())
        .then((data) => setShow(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [id]);

  const handleBookTicket = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowForm(false);
  };

  return (
    <div>
      {show && (
        <div>
          <div className="d-flex justify-content-center">
            <h2>{show.name}</h2>
          </div>

          <div className="d-flex justify-content-center">
            <img
              src={show.image?.medium}
              alt={show.name}
              className="img-fluid mb-3"
            />
          </div>
          
          <div dangerouslySetInnerHTML={{ __html: show.summary }} />
          <Button onClick={handleBookTicket} variant="primary" className="m-3">
            Book Movie Ticket
          </Button>
          <Link to="/" className="btn btn-secondary">
            Back to Show List
          </Link>

          <Modal show={showForm} onHide={handleCloseForm}>
            <Modal.Header closeButton>
              <Modal.Title>Book Movie Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleFormSubmit}>
                <img
                  src={show.image?.original}
                  alt={show.name}
                  className="img-fluid mb-3"
                />
                <div dangerouslySetInnerHTML={{ __html: show.summary }} />
                <Button variant="primary" type="submit" onClick={()=>{alert(`You Ticket for the movie "${show.name}" is Conformed`)}}>
                  Book Ticket
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default ShowDetails;
