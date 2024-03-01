"use client"
import {
  Row, Col, Container, Card,
  ListGroup,
  Badge,
  Image,
  Button,
  Tab,
  Form,
} from 'react-bootstrap';
// import widget as custom components
import { PageHeading } from 'widgets'
import { DropFiles } from "widgets";

const produit = {
  id: "",
  nomProd: "",
  description: "",
  listeMatieres: [{ id: "", nomMatiere: "" }],
  img: ""
}

import { useState } from 'react';

const Billing = () => {
  const [data, setData] = useState();
  const [infoProduit, setInfoProduit] = useState({});
  const [matieres, setMatieres] = useState([{ id: 1, name: '' }]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]:e.target.value
    })
  }

  const addMatiere = () => {
    const newMatiere = { id: matieres.length + 1, name: '' };
    setMatieres([...matieres, newMatiere]);
  };
  
  const removeMatiere = (indexToRemove) => {
    const updatedMatieres = matieres.filter((m, index) => index !== indexToRemove);
    setMatieres(updatedMatieres);
  };

  const handleInputChange = (index, event) => {
    const updatedMatieres = [...matieres];
    updatedMatieres[index].name = event.target.value;
    setMatieres(updatedMatieres);
  };

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Publication" />
      <Row>
        <Col xl={12} lg={12} md={12} sm={12}>
          <Tab.Container defaultActiveKey="design">
            <Card>
              <Card.Body className="p-5">
                <div>
                  {/* border */}
                  <Form>
                    {/* row */}
                    <Row className="mb-3">
                      <label
                        htmlFor="nomProduit"
                        className="col-sm-4 col-form-label
                      form-label"
                      >
                        Nom du produit
                      </label>
                      <div className="col-md-8 col-12">
                        <input
                          type="text"
                          onChange={handleChange}
                          name="product_name"
                          className="form-control"
                          placeholder="Entrez le nom de votre produit"
                          id="nomProduit"
                          required
                        />
                      </div>
                    </Row>
                    {/* row */}
                    <Row className="mb-3">
                      <Form.Label className="col-sm-4" htmlFor="description">
                        Description 
                      </Form.Label>
                      <Col md={8} xs={12}>
                        <Form.Control 
                          as="textarea" 
                          name="description"
                          rows={3}
                          type="textarea"
                          placeholder="Entrez sa description"
                          id="description"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Form.Label className="col-sm-4" htmlFor="description">
                        Liste des matières utilisées
                      </Form.Label>
                      <Col md={8} xs={12}>
                        <Tab.Content>
                          <Tab.Pane eventKey="design" className="pb-1 p-1">
                            {/* code started */}
                            <ListGroup>
                              {matieres.map((m, index) => (

                                <ListGroup.Item key={m.id}>
                                  <Row >
                                    <Col className='col-9'>
                                      <Form.Control type="text"
                                        placeholder="Ajouter une matière que vous avez utilisée"
                                        value={m.name}
                                        onChange={(e) => handleInputChange(index, e)} required
                                      />
                                    </Col>
                                    <Col className='d-flex justify-content-end py-2'>
                                      <i className="fas fa-trash-alt text-danger " onClick={() => removeMatiere(index)}></i>
                                    </Col>
                                  </Row>
                                </ListGroup.Item>

                              ))}
                            </ListGroup>
                            <Button variant="primary" className="mt-2" onClick={addMatiere}>Ajouter une autre matière</Button>

                            {/* end of code */}
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                    <Row className="mb-8">
                      <Col md={4} className="mb-3 mb-md-0">
                        {/* heading */}
                        <h5 className="mb-0">Image de votre produit</h5>
                      </Col>
                      <Col md={8}>
                        {/* dropzone input */}
                        <Form.Control type="file" />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={8} xs={12}>
                        <Button variant="success" className="me-4 mb-2 ms-0">
                          Valider
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>

              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>

    </Container>
  )
}

export default Billing