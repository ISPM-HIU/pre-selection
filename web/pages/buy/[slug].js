import useHttps from "hooks/useHttp"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Badge, Button, Card, Form, Image } from "react-bootstrap"
import { ChatLeftDots, Heart } from "react-bootstrap-icons"
import { getToken } from "services/token"
import { PageHeading } from "widgets"

export default function Page() {
    // const token = getToken()
    // This is the data of the /comment/[slug]
    const [user,setUser] = useState({})
    const router = useRouter()
    const { http } = useHttps()
    const [idPost, setIdPost] = useState("")
    const [commInput, setCommInput] = useState("")
    const [post,setPost] = useState({})

    


    function fetchPost(slug){
        http.get(`/publications/${slug}`)
            .then(
                e => {
                    setPost(e.data)
                    setIdPost(e.data.id)
                    setUser(e.data.user)
                }
            )
    }

    useEffect(() => {
        const slug = router.query.slug
        fetchPost(slug)
    }, [])

    return <>
        <Card className="m-6">
            <Card.Body className="d-flex">
                <Image 
                src="https://images.unsplash.com/photo-1708432683889-c3133790465f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="img-fluid rounded" alt="image" style={{ width: "300px" }} />
                <div className="d-inline-block w-full m-3">
                    <h4>{post.product_name}</h4>
                    <p>{post.description}</p>
                    <div className="mb-2 rounded bg-primary p-3">
                        <h4 className="text-white">
                            Vendeur : {user.name + " " + user.last_name}
                        </h4>
                        <div className="text-white"><span className="fw-bold">Email : </span>{user.email}</div>
                        <div className="text-white"><span className="fw-bold">Numéro : </span>{user.phone}</div>

                    </div>
                </div>
            </Card.Body>
        </Card>
        <Card className="m-6">
            {/* card body */}
            <Card.Body>
    
                <Form.Control as="textarea" placeholder="Ajouter votre commentaire ici" className="my-3" value={commInput} onChange={e => {
                    setCommInput(e.currentTarget.value)
                }} />
                <Button>
                    <ChatLeftDots /> Commenter
                </Button>
            </Card.Body>
        </Card>
    </>
}