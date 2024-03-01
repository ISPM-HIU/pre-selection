// import node module libraries
import { Row, Col, Card, Image } from "react-bootstrap";

function SponsorLists() {
  return (
    <Col className="m-1">
      {/* card */}
      <Card >
        {/* card body */}
        <Card.Body>
          {/* card title */}
          <Card.Title as="h4">Mes sponsors</Card.Title>
          <Card className="shadow-none border hover-anim">
            <Card.Body>
              <div className="d-flex ">
                <div>
                  <Image
                    src="/images/avatar/avatar-6.jpg"
                    className="rounded-circle avatar-md"
                    alt="" />
                </div>
                <div className="ms-3 ">
                  <h5 className="mb-1">Dianna Smiley</h5>
                  <p className="text-muted mb-2">
                    Just create a new Project in Dashui...
                  </p>
                </div>
              </div>

            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default SponsorLists;
