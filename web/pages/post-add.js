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

import { useState } from 'react';
import useHttps from 'hooks/useHttp';
import { getToken } from 'services/token';

const Billing = () => {
  const [data, setData] = useState();
  const [matieres, setMatieres] = useState([{ id: 1, name: '' }]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(null);
  const { http } = useHttps();
  const token = getToken();

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    let formData = new FormData()
    if(image)
      formData.append("image", image)
    
    formData.append("product_name", data.product_name);
    formData.append("description", data.description);
    formData.append("userId", token.user.id);
    let mat_name = []
    matieres.forEach(mat => {
      mat_name.push(mat.name)
    })
    const result = mat_name.join(", ");
    formData.append("products", result);
    try {
      let validation = await http.post("/validation", {prompt: result})
      console.group(validation.data)
      if(validation.data.validation == "Success") {
        setValidation(true)
        let response = await http.post("/publications", formData)
        if(response) {
          console.log(response.data)
          setLoading(false)
        }
      }
      else {
        setValidation(false)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  } 

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImage(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  }

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
                  <Form onSubmit={handleSubmit}>
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
                          required
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
                                  <Row>
                                    <Col className='col-9'>
                                      <Form.Control type="text"
                                        placeholder="Ajouter une matière que vous avez utilisée"
                                        value={m.name}
                                        required
                                        onChange={(e) => handleInputChange(index, e)}
                                      />
                                    </Col>
                                    <Col className='d-flex justify-content-end py-2'>
                                      <i className="fas fa-trash-alt text-danger " onClick={() => removeMatiere(index)}></i>
                                    </Col>
                                  </Row>
                                </ListGroup.Item>

                              ))}
                            </ListGroup>
                            {loading && !validation && (<p style={{color: "red"}}>Les matières que vous avez utilisées dépassent la moyenne écologique. 
                            Elles peuvent encore nuire à la pollution à cause de l'énergie.</p>)}
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
                        <Form.Control type="file" required onChange={handleImageChange} />
                        {image && <img src={image} className='mt-3' alt="uploaded" width={500} />}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={8} xs={12}>
                        <Button disabled={loading} type='submit' variant="success" className="me-4 mb-2 ms-0">
                          {loading ? (validation == true ? "Publication..." : "En attente de validation...") : "Valider"}
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