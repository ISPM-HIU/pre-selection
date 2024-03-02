// import node module libraries
import Link from "next/link";
import { Card, Image } from "react-bootstrap";

const MyTeam = () => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title as="h4">Vos contact</Card.Title>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <div>
              <Image
                src="/images/avatar/avatar-1.jpg"
                className="rounded-circle avatar-md"
                alt=""
              />
            </div>
            <div className="ms-3 ">
              <h5 className="mb-1">Dianna Smiley</h5>
            </div>
          </div>
          <div>
            {/* icons */}
            <Link href="#" className="text-muted text-primary-hover">
              <i className="fe fe-eye fs-4"></i>
            </Link>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <div>
              <Image
                src="/images/avatar/avatar-2.jpg"
                className="rounded-circle avatar-md"
                alt=""
              />
            </div>
            <div className="ms-3 ">
              <h5 className="mb-1">Anne Brewer</h5>
            </div>
          </div>
          <div>
            {/* icons */}
            <Link href="#" className="text-muted text-primary-hover">
              <i className="fe fe-eye fs-4"></i>
            </Link>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <div>
              <Image
                src="/images/avatar/avatar-3.jpg"
                className="rounded-circle avatar-md"
                alt=""
              />
            </div>
            <div className="ms-3 ">
              <h5 className="mb-1">Richard Christmas</h5>
            </div>
          </div>
          <div>
            {/* icons */}
            <Link href="#" className="text-muted text-primary-hover">
              <i className="fe fe-eye fs-4"></i>
            </Link>
          </div>
        </div>
    
      </Card.Body>
    </Card>
  );
};

export default MyTeam;
