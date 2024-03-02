import useHttps from "hooks/useHttp";
import { useState } from "react";
import { Container } from "react-bootstrap";
import PostLists from "sub-components/my-post/PostLists";
import SponsorLists from "sub-components/my-post/SponsorLists";

export default function Page(){
    const {http} = useHttps();
    const [post, setPost] = useState(null)
    const [sponsor, setSponsor] = useState(null)
    const fetch = ()=>{
        http.get('/notifications',{userId:1}).then(
            (response)=>{
                setPost(response.data.filter((item)=>item.type == 'achat'))
                setPost(response.data.filter((item)=>item == 'investissement'))
            }
        ).catch((err)=>console.log(err))
    }
    return <>
    <Container fluid className="p-6 d-flex">
        <PostLists />
        <SponsorLists />
    </Container>
    </>
}