import React, { useState } from "react";
import Link from "next/link";
import { MoreVertical } from "react-feather";
import { Col, Row, Card, Image, Button, Modal } from "react-bootstrap";

const RecentFromBlog = () => {
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
      <CustomToggle>
        <MoreVertical size="15px" className="text-muted" />
      </CustomToggle>
    );
  };

  return (
    <Col xl={8} md={12} xs={12} className="mb-6">
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
                <h5 className="mb-0 fw-bold">Jitu Chauhan</h5>
                <p className="mb-0">19 minutes ago</p>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspen disse var ius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
            </p>
            <Image src="/images/blog/blog-img-1.jpg" className="rounded-3 w-100" alt="" />
          </div>
          {/* icons */}
          <div className="mb-4">
            <span className="me-1 me-md-4">
              <i className="fe fe-heart"></i> <span>20 Like</span>
            </span>
            <span className="me-1 me-md-4">
              <Button variant="link" onClick={() => setShowModal(true)}>
                <i className="fe fe-message-square"></i> Commentaire
              </Button>
            </span>
            <span>
              <i className="fe fe-share-2"></i>
              <span> Share</span>
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
                  <button type="button" className="btn btn-info">
                    <i className="fe fe-message-square"></i> Commentaire
                  </button>
                </span>
              </div>
              <div className="col-4 d-flex justify-content-end">
                <span>
                  <button type="button" className="btn btn-dark" style={{ backgroundColor: "#562356" }}>
                    <i className="fe fe-share-2"></i> Partager
                  </button>
                </span>
              </div>
            </div>
          </div>
          {/* row */}
        </Card.Body>
      </Card>

      {/* Commentaire Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Commentaire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Ajoutez ici le contenu de votre modal pour le commentaire */}
          <p>Contenu de la modal pour le commentaire</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Fermer</Button>
          {/* Ajoutez ici d'autres boutons d'action si nécessaire */}
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default RecentFromBlog;
