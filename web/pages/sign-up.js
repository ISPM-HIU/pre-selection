// import node module libraries
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";

// import authlayout to override default layout
import AuthLayout from "layouts/AuthLayout";
import { useState } from "react";
import useHttps from "hooks/useHttp";
import { useRouter } from "next/router";
import { setToken } from "services/token";

const SignUp = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const { http } = useHttps();
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    data.last_name = ""
    try {
      setLoading(true)
      let response = await http.post("/users", data)
      if(response) {
        setToken(response.data)
        router.push("/home")
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-0">
              <Link href="/">
                <Image
                  src="/images/logo.jpg"
                  className="mb-2"
                  width={100}
                />
              </Link>
              <p className="mb-3">Veuillez saisir vos informations d'utilisateur.</p>
            </div>
            {/* Form */}
            <Form onSubmit={handleSubmit}>
              {/* Username */}
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Nom et prenom</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="name"
                  placeholder="User Name"
                  required=""
                />
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={handleChange}
                  name="email"
                  placeholder="Enter address here"
                  required=""
                />
              </Form.Group>

               {/* Email */}
               <Form.Group className="mb-3" controlId="email">
                <Form.Label>Numéro</Form.Label>
                <Form.Control
                  type="number"
                  onChange={handleChange}
                  name="phone"
                  placeholder="Enter address here"
                  required=""
                />
              </Form.Group>


              {/* Password */}
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  onChange={handleChange}
                  name="password"
                  placeholder="**************"
                  required=""
                />
              </Form.Group>

              {/* Checkbox */}
              {/* <div className="mb-3">
                <Form.Check type="checkbox" id="check-api-checkbox">
                  <Form.Check.Input type="checkbox" />
                  <Form.Check.Label>
                    I agree to the <Link href="#"> Terms of Service </Link> and{" "}
                    <Link href="#"> Privacy Policy.</Link>
                  </Form.Check.Label>
                </Form.Check>
              </div> */}

              <div>
                {/* Button */}
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    {loading ? "Chargement..." : "Connexion"}
                  </Button>
                </div>
                <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link href="/" className="fs-5">
                      Déjà membre ? Se connecter{" "}
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/forget-password"
                      className="text-inherit fs-5"
                    >
                      Mot de passe oublié?
                    </Link>
                  </div>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

SignUp.Layout = AuthLayout;

export default SignUp;
