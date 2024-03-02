import useHttps from "hooks/useHttp";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { getToken } from "services/token";
import PostLists from "sub-components/my-post/PostLists";
import SponsorLists from "sub-components/my-post/SponsorLists";


export default function Page() {
  const { http } = useHttps();
  const [posts, setPosts] = useState(null);
  const token = getToken();

  const fetch = () => {
    http
      .get("/notifications/" + token.user.id)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <>
      <Container fluid className="p-6 d-flex">
            <div className="row">
                {posts && posts.map((post, idx) => (
                    <SponsorLists key={idx} post={post} />
                ))}
            </div>
      </Container>
    </>
  );
}
