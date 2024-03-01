// import node module libraries
import { Row, Col, Card, Image } from "react-bootstrap";

function PostLists() {
 
  return (
    <Col className="m-1">
      {/* card */}
      <Card>
        {/* card body */}
        <Card.Body>
          {/* card title */}
          <Card.Title as="h4">Mes publications</Card.Title>
          <Card className="shadow-none border hover-anim">
            <Card.Body>
              <div className="d-flex">
                <div>
                  <div style={{width:"100px",height:"100px"}} className="overflow-hidden">
                    <Image
                      src="/images/avatar/avatar-6.jpg"
                      style={{ width: "100px" }}
                      className="rounded-3"
                      alt="" />
                  </div>
                </div>
                <div className="ms-3 ">
                  <h5 className="mb-1">Dianna Smiley</h5>
                  <p className="text-muted mb-2">
                    Just create a new Project in Dashui...
                  </p>
                  <p className="fs-5 mb-0">Il y a 2 min</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default PostLists;
