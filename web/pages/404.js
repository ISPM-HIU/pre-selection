// import node module libraries
import { Fragment } from "react";
import { Col, Row, Image } from "react-bootstrap";
import Link from "next/link";

// import blank layout, header and footer to override default layout
import NotFound from "layouts/NotFound";

const Error404 = () => {
  return (
    <Fragment>
      <Row>
        <Col sm={12}>
          <div className="text-center">
            <div className="mb-3">
              <Image
                src="/images/error/404-error-img.png"
                alt=""
                className="img-fluid"
              />
            </div>
            <h1 className="display-4 fw-bold">Oops! Page introuvable.</h1>
            <Link href="/" className="btn btn-primary">
              Go Home
            </Link>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

Error404.Layout = NotFound;

export default Error404;
