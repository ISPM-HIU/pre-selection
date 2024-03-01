// import node module libraries
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MoreVertical } from "react-feather";
import { Col, Row, Card, Form, Dropdown, Image, Button, Modal } from "react-bootstrap";
import useHttps from "hooks/useHttp";

const RecentFromBlog = (props) => {
  
  const [showModal, setShowModal] = useState(false);
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (

    <Link
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="text-muted text-primary-hover"
    >
      {children}
    </Link>
  ));

  CustomToggle.displayName = "CustomToggle";

  const ActionMenu = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
          <MoreVertical size="15px" className="text-muted" />
        </Dropdown.Toggle>
        <Dropdown.Menu align={"end"}>
          <Dropdown.Item eventKey="1">Action</Dropdown.Item>
          <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
          <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  return (
    <Col key={props.key} xl={8} md={12} xs={12} className="mb-6">
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between mb-5 align-items-center">
            {/* avatar */}
            <div className="d-flex align-items-center">
              <div>
                <Image
                  src="/images/avatar/avatar-1.jpg"
                  alt=""
                  className="avatar avatar-md rounded-circle"
                />
              </div>
              <div className="ms-3">
                <h5 className="mb-0 fw-bold">{props.userName}</h5>
                <p className="mb-0">il y a 19 minutes</p>
              </div>
            </div>
            <div>
              {/* dropdown */}
              <ActionMenu />
            </div>
          </div>
          <div className="mb-4">
            {/* text */}
            <p className="mb-4">
              {props.description}
            </p>
            <Image
              src="/images/blog/blog-img-1.jpg"
              className="rounded-3 w-100"
              alt=""
            />
          </div>
          {/* icons */}
          <div className="mb-4">
            <span className="me-1 me-md-4">
              <i className="fe fe-heart"></i> <span>{props.like} Like</span>
            </span>
          </div>
          <div className=" border-top py-2 d-flex align-items-center mb-4">
          </div>
          <div className="mb-4">
            <div className="row">
              <div className="col-8">
                <span className="me-1 me-md-4">
                  <button type="button" className="btn btn-outline-primary">  <i className="fe fe-shopping-bag"></i>  Acheter</button>
                </span>
                <span className="me-1 me-md-4">
                  <Button className="btn btn-info" variant="link" onClick={() => setShowModal(true)}>
                    <i className="fe fe-message-square"></i> Commentaire
                  </Button>
                </span>
              </div>
              <div className="col-4 d-flex justify-content-end">
                <span>
                  <button type="button" className="btn btn-dark"
                    style={{
                      backgroundColor: " #562356;"
                    }}><i className="fe fe-share-2"></i> Partager</button>
                </span>
              </div>
            </div>
          </div>
          {/* row */}
        </Card.Body>
      </Card>

      {/* Commentaire Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton style={{ backgroundColor: "rgb(128, 102, 139)"}}>
          <Modal.Title style={{color:"white"}}>Commentaire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Ajoutez ici le contenu de votre modal pour le commentaire */}
          <div className="d-flex mb-5 smooth-shadow-sm p-3" style={{ borderRadius: " 4px" }}>
            <div>
              <Image
                src="/images/avatar/avatar-7.jpg"
                className="rounded-circle avatar-md"
                alt=""
              />
            </div>
            <div className="ms-3 ">
              <h5 className="mb-1">Irene Hargrove</h5>
              <p className="text-muted mb-2">
                Votre produit me plaît énormément
              </p>
              <p className="fs-5 mb-0">il y a 19 minutes</p>
            </div>
          </div>
          <Form>
            <Form.Group controlId="commentForm.ControlTextarea">
              <Form.Label>Ce que vous pensez de cette publication.</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" style={{ backgroundColor: "#80668b" }} onClick={() => setShowModal(false)}>Fermer</Button>
        </Modal.Footer>

      </Modal>
    </Col>
  );
};

export default RecentFromBlog;
