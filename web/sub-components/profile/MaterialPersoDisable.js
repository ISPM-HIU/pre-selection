// import node module libraries
import React, { useEffect, useState } from "react";
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
    useEffect(() => {
        console.log(props);
    }, [])
    return (
        <div key={props.key} className="d-md-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">
                <div className="ms-3 ">
                    <h5 className="mb-1">
                        <Link href="#" className="text-inherit">{props.materiel}</Link>
                    </h5>
                    <p className="mb-0 fs-5 text-muted">{props.description}</p>
                </div>
            </div>
        </div>
    )

}

const MaterialPersoDisable = (props) => {
    const [material, setMaterial] = useState([])
    useEffect(() => {
        setMaterial(props.data)
    }, [props.data])
    return (
        <Col xl={6} lg={12} md={12} xs={12} className="mb-6">
            <Card>
                <Card.Body>
                    <Card.Title as="h4">Matériaux écologiquement nuisibles</Card.Title>
                    {
                        material.length && material[0].map((item, index) => {
                            return <ListMaterialComponent key={index} materiel={item.materiel} description={item.description} />
                        })
                    }
                </Card.Body>
            </Card>
        </Col>
    )
}

export default MaterialPersoDisable