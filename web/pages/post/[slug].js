import useHttps from "hooks/useHttp"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Badge, Button, Card, Form, Image } from "react-bootstrap"
import { ChatLeftDots, Heart } from "react-bootstrap-icons"
import { getToken } from "services/token"
import { PageHeading } from "widgets"

export default function Page() {
    const router = useRouter()
    const [token, setToken] = useState(0)
    useEffect(()=>{
        try{
            setToken(getToken())
        }catch(err){
            router.push('/')
        }
    },[])
    const { http } = useHttps()
    const [idPost, setIdPost] = useState("")
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [like, setLike] = useState(0)
    const [comments, setComments] = useState([])
    const [commInput, setCommInput] = useState("")


    // This is the data of the /comment/[slug]
    const slug = parseInt(router.query.slug)
    
    function sendLike(){
        http.post("/likes",
        {
            publicationId:idPost,
            userId:parseInt(token.user.id)
        })
        .then(e=>{
            fetchPost()
        })
    }

    function fetchPost(){
        http.get("/publications/" + parseInt(slug))
            .then(
                e => {
                    setIdPost(e.data.id)
                    setTitle(e.data.product_name)
                    setLike(e.data.Likes.length)
                    setDesc(e.data.description)
                    setComments(e.data.Comments)
                    
                }
            )
    }

    useEffect(() => {
        fetchPost()
    }, [])

    function addComment(){
        http.post("/comments",{
            "publicationId":idPost,
            "userId":token.user.id,
            "text":commInput
        }).then(e=>{
            fetchPost()
            setCommInput("")
        })
    }

    return <>
        <Card className="m-6">
            <Card.Body>
                <PageHeading heading={title} />
                <p>
                    {desc}
                </p>
                <Image src="https://images.unsplash.com/photo-1708432683889-c3133790465f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="img-fluid rounded mx-auto d-block" alt="image" style={{ width: "400px" }} />
            </Card.Body>
            <Card.Footer>
                <div>
                    <Button variant="link" className="mx-2" onClick={sendLike}>
                        <Heart /> J'adore ({like})
                    </Button>
                </div>
            </Card.Footer>
        </Card>
        <Card className="m-6">
            {/* card body */}
            <Card.Body>
                {/* card title */}
                <Card.Title as="h4">Commentaires ({comments.length})</Card.Title>
                {
                    comments.length ? comments.map((e, index) => {
                        return <>
                            <Card className="shadow-none border hover-anim my-1">
                                <Card.Body>
                                    <div className="d-flex ">
                                        <div>
                                            <Image
                                                src="/images/avatar/avatar-6.jpg"
                                                className="rounded-circle avatar-md"
                                                alt="" />
                                        </div>
                                        <div className="ms-3 ">
                                            <h5 className="mb-1">{e.user.name + " " + e.user.last_name}</h5>
                                            <p className="mb-2">
                                                {e.text}
                                            </p>
                                        </div>
                                    </div>

                                </Card.Body>
                            </Card>
                        </>
                    }) : <>
                        <h4 className={"text-center mb-3 text-secondary"}>Soyez le premier à commenter</h4>
                    </>
                }
                <Form.Control as="textarea" placeholder="Ajouter votre commentaire ici" className="my-3" value={commInput} onChange={e => {
                    setCommInput(e.currentTarget.value)
                }} />
                <Button onClick={addComment}>
                    <ChatLeftDots /> Commenter
                </Button>
            </Card.Body>
        </Card>
    </>
}