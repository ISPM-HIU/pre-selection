// import node module libraries
import { Col, Row, Container } from 'react-bootstrap';

// import widget as custom components
import { PageHeading } from 'widgets'

// import sub components
import {
  AboutMe,
  ActivityFeed,
  MyTeam,
  ProfileHeader,
  ProjectsContributions,
  RecentFromBlog
} from 'sub-components'
import { UserContextProvider } from 'sub-components/profile/context/userContext';
import useHttps from 'hooks/useHttp';
import { useEffect, useState } from 'react';

const Profile = () => {
  const { http } = useHttps();
  const [posts, setPosts] = useState([]);

  const fetchPosts = ()=>{
    http.get('/publications').then(
      (response)=>{
        console.log(response.data);
        setPosts(response.data)
      }
    ).catch((err)=>{console.log(err);})
  }

  useEffect(()=>{
    fetchPosts();
  },[])
  
  return (
    <UserContextProvider>
      <Container fluid className="p-6">
        {/* Page Heading */}
        {/* <PageHeading heading="Overview"/> */}

        {/* Profile Header  */}
        <ProfileHeader />

        {/* content */}
        <div className="py-6">
          <Row>

            {/* About Me */}
            {/* <AboutMe /> */}

            {/* Projects Contributions */}
            {/* <ProjectsContributions /> */}

            {/* Recent From Blog */}
            <Col xl={8} md={12} xs={12} >
                {
                  posts && posts.map((item)=>{
                    return(
                      <RecentFromBlog key={item.id} props={item} />
                    )
                  })
                }
            </Col>
          
            <Col xl={4} lg={12} md={12} xs={12} className="mb-6">

              {/* My Team */}
              <MyTeam />

              {/* Activity Feed */}
              <ActivityFeed />

            </Col>
          </Row>
        </div>

      </Container>
    </UserContextProvider>

  )
}

export default Profile