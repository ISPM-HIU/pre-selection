// import node module libraries
"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MoreVertical } from "react-feather";
import { Col, Row, Card, Form, Dropdown, Image, Button, Modal } from "react-bootstrap";
import useHttps from "hooks/useHttp";
import moment from 'moment';
import 'moment/locale/fr';
import { getToken } from "services/token";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import axios from "axios";

const   RecentFromBlog = ({ props }) => {
  const stripePromise = loadStripe('pk_test_51OpkT1RuHF7sMfYGW5PlHQk3lfacfpTWyhC822QmxOqYSjH4MTbbkc2yZOHTrOMsEBFnuZxnGmswNa6DkeAx6RB500reJFUzhC');
  const [clientSecret, setClientSecret] = useState('');
  const [showModal, setShowModal] = useState(false);
  const timeFromNow = moment(props.createdAt).fromNow();
  const token = getToken()
  const {http} = useHttps()
  const [item,setItem] = useState(props)
  
  const options = {clientSecret};
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

  const addLike = () => { 
    try {
      
    } catch (error) {
      console.log(error)
    }
  }

  function buyAction(){
    http.post("/publications/action",
    {
      "publicationId":item.id,
      "userId":token.user.id,
      "actionType":"buy"
    }).then(e=>{
      console.log(e)
    })
  }

  function investAction(){
    http.post("/publications/action",
    {
      "publicationId":item.id,
      "userId":token.user.id,
      "actionType":"invest"
    }).then(e=>{
      console.log(e)
    })
  }

  return (
    <>
      <Card className="mb-6" >
        
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
                <h5 className="mb-0 fw-bold">{props.user.name}</h5>
                <p className="mb-0">{timeFromNow}</p>
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
            {props.image && (
                <Image
                  src={`http://localhost:9090/images/${props.image}`}
                  className="rounded-3 w-100"
                  alt=""
                />
              )}
          </div>
          {/* icons */}
          <div className="mb-4">
            <span className="me-1 me-md-4">
              <i className="fe fe-heart"></i> <span>{props.Likes.length || 0} Like</span>
            </span>
          </div>
          <div className=" border-top py-2 d-flex align-items-center mb-4">
          </div>
          
          <div className="mb-4">
            <div className="row">
              <div className="col-8">
                <span className="me-1 me-md-4">
                  <a style={{textDecoration:'none'}} href={props.link} target="_blank">
                  <button type="button" className="btn btn-outline-primary" onClick={buyAction}>  <i className="fe fe-shopping-bag"></i>  Acheter</button>

                  </a>
                </span>
                <span className="me-1 me-md-4">
                <Link href={`/post/${props.id}`}>
                  <Button className="btn" variant="link">
                    <i className="fe fe-message-square"></i> {props.Comments.length || 0} Commentaire
                  </Button>
                  </Link>
                </span>
              </div>
              <div className="col-4 d-flex justify-content-end">
                <span>
                  <button type="button" 
                    onClick={investAction}
                    className="btn btn-dark"
                    style={{
                      backgroundColor: " #562356;"
                    }}><i className="fe fe-dollar-sign"></i> Investir</button>
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
          <div id="checkout">
          
    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" style={{ backgroundColor: "#80668b" }} onClick={() => setShowModal(false)}>Fermer</Button>
        </Modal.Footer>

      </Modal>
    </>
  );
};

export default RecentFromBlog;
