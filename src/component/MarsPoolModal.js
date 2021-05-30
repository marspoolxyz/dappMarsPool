import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";

function MarsPoolModal() {
    const [show, setShow] = useState(false);
  
    const handleShow = () => setShow(true);
  
    return (
      <>
        <div
          class="d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          <Button variant="primary" onClick={handleShow}>
            Launch Form modal
          </Button>
        </div>
        <Modal show={show}>
          <Modal.Header closeButton>
            <Modal.Title>Login Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <></>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Close Modal</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  export default MarsPoolModal;