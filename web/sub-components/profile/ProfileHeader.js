// import node module libraries
import { PlusCircle } from "react-feather";
import Link from "next/link";
import { useContext, useState } from "react";
import { Col, Row, Image, Button } from "react-bootstrap";
import { UserContext } from "./context/userContext";

const ProfileHeader = () => {
  const [stateRoute, setStateRoute] = useState({
    info: true,
    products: false,
    vendu: false,
    invest: false
  })

  return (
    <Row className="align-items-center">
      <Col xl={12} lg={12} md={12} xs={12}>
        {/* Bg */}
        <div
          className="pt-5 rounded-top"
          style={{
            background: "url(/images/background/profile-cover.jpg) no-repeat",
            backgroundSize: "cover",

          }}
        ></div>
        <div className="bg-white rounded-bottom smooth-shadow-sm ">
          <div className="d-flex align-items-center justify-content-between pt-2 pb-2 px-4">
            <div>
            </div>
          </div>
          <div className="row">

            {/* nav */}
            <div className="col-7">
              <ul className="nav nav-lt-tab px-4" id="pills-tab" role="tablist">
                <li className="nav-item">
                  <Link className="nav-link" href="/">
                    Vers un avenir énergétique plus vert, un achat à la fois.
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-5 d-flex justify-content-end">
              <ul className="nav px-4" >
                <li className="nav-item">
                  <Link href={"/post-add"}>
                    <Button >
                      <PlusCircle className="me-2" /> Ajouter une nouvelle publication
                    </Button>
                  </Link>

                </li>
              </ul>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ProfileHeader;
