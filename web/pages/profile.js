"use client";
import React, { useState } from "react";
import { Col, Row, Container, Card, Image } from 'react-bootstrap';
import { Header, ProfileHeader } from "sub-components";
import { PageHeading } from "widgets";

export const Posts = () => {
    return (
        <>
            <Col xl={8} md={12} xs={12} className="mb-6">
                <Card>
                    <Card.Body>
                        <div className="d-flex justify-content-between mb-5 align-items-center">
                            {/* avatar */}
                            <div className="d-flex align-items-center">
                                <div>
                                    <Image
                                        src="/images/avatar/avatar-1.jpg"
                                        alt=""
                                        className="avatar avatar-md rounded-circle"
                                    />
                                </div>
                                <div className="ms-3">
                                    <h5 className="mb-0 fw-bold">Jitu Chauhan</h5>
                                    <p className="mb-0">il y a 19 minutes</p>
                                </div>
                            </div>
                            <div>
                                {/* dropdown */}
                            </div>
                        </div>
                        <div className="mb-4">
                            {/* text */}
                            <p className="mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspen
                                disse var ius enim in eros elementum tristique. Duis cursus, mi
                                quis viverra ornare, eros dolor interdum nulla, ut commodo diam
                                libero vitae erat.
                            </p>
                            <Image
                                src="/images/blog/blog-img-1.jpg"
                                className="rounded-3 w-100"
                                alt=""
                            />
                        </div>
                        {/* icons */}
                        <div className="mb-4">
                            <span className="me-1 me-md-4">
                                <i className="fe fe-heart"></i> <span>20 Like</span>
                            </span>
                        </div>
                        <div className=" border-top py-2 d-flex align-items-center mb-4">
                        </div>

                        {/* row */}
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}

export default function Page() {
    const [posts, setPosts] = useState([<Posts />])
    return (
        <>
            <Container fluid className="p-6">
                <PageHeading heading="Mon profile" />
                <Header />
                <p></p>
                <center>
                    {posts}
                </center>

            </Container>
        </>
    )
}