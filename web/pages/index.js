// import node module libraries
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";

// import authlayout to override default layout
import AuthLayout from "layouts/AuthLayout";
import { useState } from "react";
import useHttps from "hooks/useHttp";
import { useRouter } from "next/router";
import { setToken } from "services/token";

const SignIn = () => {
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
    try {
      setLoading(true)
      console.log(data)
      let response = await http.post("/users/login", data)
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
            <div className="mb-4">
              <Link href="/">
                <Image
                  src="/images/logo.jpg"
                  className="mb-2"
                  width={100}
                />
              </Link>
              <p className="mb-6">Veuillez saisir vos informations d'utilisateur.</p>
            </div>
            {/* Form */}
            <Form onSubmit={handleSubmit}>
              {/* Username */}
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={handleChange}
                  name="email"
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
              <div className="d-lg-flex justify-content-between align-items-center mb-4">
                <Form.Check type="checkbox" id="rememberme">
                  <Form.Check.Input type="checkbox" />
                  <Form.Check.Label>Souviens-toi de moi</Form.Check.Label>
                </Form.Check>
              </div>
              <div>
                {/* Button */}
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    {loading ? "Chargement..." : "Connexion"}
                  </Button>
                </div>
                <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link href="/sign-up" className="fs-5">
                      Créer un compte{" "}
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

SignIn.Layout = AuthLayout;

export default SignIn;
