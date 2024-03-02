"use client";
import React, { useRef, useState } from "react";
import { Col, Row, Card, Button, Form } from "react-bootstrap";

const InputComponent = (props) => {
  return (
    <Row>
      <Col className="mb-6 d-flex">
        <Form.Control type="text" disabled={true} value={props.value} />
        <Button
          variant="outline-danger"
          size="sm"
          className="mx-2"
          id={props.id}
          onClick={props.delete}
        >
          <i className="fa fa-archive" aria-hidden="true" />
        </Button>
      </Col>
    </Row>
  );
};

const MaterialPerso = (props) => {
  const [listMaterial, setListMaterial] = useState([]);
  const [inputValue, setInputValue] = useState("");
  let material = [];
  const deleteInput = (e) => {
    const id = e.target.id;
    setInputList(inputList.filter((item, index) => index != id));
  };

  const addMaterial = (e) => {
    e.preventDefault();
  };

  const addInput = (e) => {
    setListMaterial((value) => {
      material = value.slice();
      material.push(inputValue);
      props.list(material);
      return material;
    });

    setInputValue("");
  };

  return (
    <Col xl={6} lg={12} md={12} xs={12} className="mb-6">
      {/* card */}
      <Card>
        {/* card body */}
        <Card.Body>
          {/* card title */}
          <Card.Title as="h4">Matériel personnel</Card.Title>
          <p className="mt-2 mb-6">
            Vous pouvez ajouter des materiels que vous pensez qu'il utilise de
            l'énérgie.
          </p>
          <Row>
            <Col xs={12} className="mb-5">
              <h6 className="fs-5 ls-2">Liste de vos matériels</h6>
              {
                //listMaterial.length!==0?
              }
            </Col>
          </Row>
          {listMaterial.length !== 0 ? (
            listMaterial.map((e, index) => {
              return (
                <>
                  <InputComponent value={e} key={index} />
                </>
              );
            })
          ) : (
            <>
              <h4 className={"text-center mb-3 text-secondary"}>Aucun</h4>
            </>
          )}
          <Row>
            <Col className="mb-6 d-flex">
              <Form.Control
                type="text"
                placeholder="Ajouter votre materiel ici"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.currentTarget.value);
                }}
              />
              <Button variant="success" className="mx-2" onClick={addInput}>
                Ajouter
              </Button>
            </Col>
          </Row>
          <Button
            disabled={props.loading}
            onClick={props.isValid}
            style={{ width: "50%", margin: "auto" }}
            variant="primary"
          >
            {props.loading ? "Chargement..." : "Valider"}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MaterialPerso;
