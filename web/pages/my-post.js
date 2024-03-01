import { Container } from "react-bootstrap";
import PostLists from "sub-components/my-post/PostLists";
import SponsorLists from "sub-components/my-post/SponsorLists";

export default function Page(){
    return <>
    <Container fluid className="p-6 d-flex">
        <PostLists />
        <SponsorLists />
    </Container>
    </>
}