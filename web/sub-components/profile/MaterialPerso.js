"use client";
import React, { useState } from 'react';
import { Col, Row, Card, Button, Form } from 'react-bootstrap';

const InputComponent = (props) => {
    return (
        <Row key={props.key}>
            <Col xs={6} className="mb-6">
                <Form.Control
                    type="text"
                />
            </Col>
            {' '}
            <Col xs={6} className='mb-5'>
                <Button variant="outline-danger" size="sm" className="me-1" id={props.id} onClick={props.delete}><i class="fa fa-archive" aria-hidden="true" /></Button>
            </Col>
        </Row>
    )
}

const MaterialPerso = () => {
    const [listMaterial, setListMaterial] = useState([]);

    const deleteInput = (e) => {
        const id = e.target.id;
        setInputList(inputList.filter((item, index) => index != id));
    }
    const [inputList, setInputList] = useState([<InputComponent key={0} delete={deleteInput} id={0} />]);

    const addMaterial = (e) => {
        e.preventDefault();
    }

    const addInput = (e) => {

        setInputList([...inputList, <InputComponent key={inputList.length} id={inputList.length} delete={deleteInput} />]);
    }
    
    return (
        <Col xl={6} lg={12} md={12} xs={12} className="mb-6">
            {/* card */}
            <Card>
                {/* card body */}
                <Card.Body>
                    {/* card title */}
                    <Card.Title as="h4">Matériel personnel</Card.Title>
                    <span className="fw-medium text-dark fs-5 ls-2">Information</span>
                    <p className="mt-2 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspen disse var ius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
                    </p>
                    <Row>
                        <Col xs={12} className="mb-5">
                            <h6 className="fs-5 ls-2">Liste de vos matériels</h6>
                            {
                                //listMaterial.length!==0?
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className="mb-5">
                            <h6 className="fs-5 ls-2">Nom du matériel </h6>
                        </Col>
                    </Row>
                    {
                        inputList
                    }
                    <Row>
                        <Col xs={12} className="mb-5">
                            <Button variant="success" className="me-1" onClick={addInput}>Ajouter de nouvelle matériel</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default MaterialPerso