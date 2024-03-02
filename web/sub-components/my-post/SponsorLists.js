// import node module libraries
import { Row, Col, Card, Image } from "react-bootstrap";

import moment from 'moment';
import 'moment/locale/fr';
import Link from "next/link";

function SponsorLists({ post }) {
  const timeFromNow = moment(post.createdAt).fromNow();
  console.log(post)
  return (
    <Col md={5} className="m-1">
      {/* card */}
      <Card >
        {/* card body */}
        <Card.Body>
          {/* card title */}
          <Card.Title as="h4">
            <Link href={`/post/${post.publication.id}`}>
              {post.publication.product_name}
            </Link>
          </Card.Title>
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
                  <h5 className="mb-1">{post.user.name}</h5>
                  <p className="text-muted mb-2">
                    {timeFromNow}
                  </p>
                  <p className="text-muted mb-2">
                    {post.type == "invest" ? "Je veux investir dans votre projet":"Je veux acheter un de ces projets"}
                    voici mes contact: {post.user.email} / {post.user.phone}
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
