// import node module libraries
"use client";
import useHttps from "hooks/useHttp";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, Image, Container, Button } from "react-bootstrap";

const ListeMaterial = (props) => {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4" key={props.key}>
                <div className="d-flex align-items-center">
                    <div>
                        <Image
                            src="/images/avatar/avatar-1.jpg"
                            className="rounded-circle avatar-md"
                            alt=""
                        />
                    </div>
                    <div className="ms-3 ">
                        <h5 className="mb-1">{props.product_name}</h5>
                        <p className="text-muted mb-0 fs-5 text-muted">
                            {props.description}
                        </p>
                    </div>
                </div>
                <div>
                    <Link href="#" className="text-muted text-primary-hover me-3">
                        <i className="fa fa-info fs-4"></i>
                    </Link>
                </div>
            </div>
        </>
    )
}

const MaterialSuggestion = (props) => {
    const [posts, setPosts] = useState([]);
    const { http } = useHttps();
    const fetchPosts = (id) => {
        http.get(`/publications/${id}`).then(
            (response) => {
                setPosts(prevPosts=>[...prevPosts, response.data])
            }
        ).catch((err) => { console.log(err); })
    }
    useEffect(() => {
        console.log(props.id);
        props.id.map((item) => {
            fetchPosts(item.response.id)
        })

    }, [props.id])
    return (
        <Container fluid className="p-6">
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title as="h4">Materiel suggéré</Card.Title>
                    {
                        posts && posts.map((item, index) => {
                            <ListeMaterial key={index} description={item.description} product_name={item.product_name} />
                        })
                    }
                </Card.Body>
            </Card>
        </Container>

    );
};

export default MaterialSuggestion;
