// import node module libraries
import React, { useState } from "react";
import Link from 'next/link';
import { Col, Card, Dropdown, Image } from 'react-bootstrap';
import { MoreVertical } from 'react-feather';

// import required data files
import ProjectsContributionsData from 'data/profile/ProjectsContributionsData';

/**
 * Composant à afficher
 * @param {*} props.value Valeur 
 * @returns 
 */
const ListMaterialComponent = (props) => {
    return (
        <div className="d-md-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">
                <div className="ms-3 ">
                    <h5 className="mb-1">
                        <Link href="#" className="text-inherit">{props.value.name}</Link>
                    </h5>
                    <p className="mb-0 fs-5 text-muted">{props.value.desc}</p>
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
    const [material, setMaterial] = useState([{name:"ajax",desc:"Description"}])
    return (
        <Col xl={6} lg={12} md={12} xs={12} className="mb-6">
            <Card>
                <Card.Body>
                    <Card.Title as="h4">Matériaux écologiquement nuisibles</Card.Title>
                    {
                        material.map((e,index)=>{
                            return <ListMaterialComponent value={e}/>
                        })
                    }
                </Card.Body>
            </Card>
        </Col>
    )
}

export default MaterialPersoDisable