// import node module libraries
import React, { useState } from "react";
import Link from 'next/link';
import { Col, Card, Dropdown, Image } from 'react-bootstrap';
import { MoreVertical } from 'react-feather';

// import required data files
import ProjectsContributionsData from 'data/profile/ProjectsContributionsData';

const ListMaterialComponent = (props) => {
    return (
        <div className="d-md-flex justify-content-between align-items-center mb-4" key={props.key}>
            <div className="d-flex align-items-center">
                <div className="ms-3 ">
                    <h5 className="mb-1">
                        <Link href="#" className="text-inherit">Nom du materiel</Link>
                    </h5>
                    <p className="mb-0 fs-5 text-muted">Description</p>
                </div>
            </div>
            <div className="d-flex align-items-center ms-10 ms-md-0 mt-3">

                <div>
                    50%
                </div>
            </div>
        </div>
    )

}

const MaterialPersoDisable = () => {
    const [material, setMaterial] = useState([<ListMaterialComponent key={0} />])
    return (
        <Col xl={6} lg={12} md={12} xs={12} className="mb-6">
            <Card>
                <Card.Body>
                    <Card.Title as="h4">Matériaux écologiquement nuisibles</Card.Title>
                    {
                        material
                    }
                </Card.Body>
            </Card>
        </Col>
    )
}

export default MaterialPersoDisable