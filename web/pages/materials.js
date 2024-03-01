// import node module libraries
import { Container, Row, Button } from 'react-bootstrap';

// import widget as custom components
import { PageHeading } from 'widgets'

// import sub components
import { MaterialPerso, MaterialPersoDisable, MaterialSuggestion } from 'sub-components'

const Settings = () => {
  return (
    <>
      <Container fluid className="p-6">

        {/* Page Heading */}
        <PageHeading heading="Vos matériels" />
        <div className="py-6">
          <Row>
            <MaterialPerso />
            <MaterialPersoDisable />
          </Row>
          <Row>
          <Button style={{width:'50%', margin:'auto'}} variant="primary">Valider</Button>

          </Row>
          <Row>
            <MaterialSuggestion />
          </Row>
        </div>
      </Container>
      
      
      
    </>

  )
}

export default Settings