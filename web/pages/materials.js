// import node module libraries
import { Container, Row, Button } from 'react-bootstrap';

// import widget as custom components
import { PageHeading } from 'widgets'

// import sub components
import { MaterialPerso, MaterialPersoDisable, MaterialSuggestion } from 'sub-components'
import { useState } from 'react';
import useHttps from 'hooks/useHttp';

const Settings = () => {
  const [listMaterial, setListMaterial] = useState([]);
  const [materialDisable, setMaterialDisable] = useState([])
  const [idMaterial, setIdMaterial] = useState([])
  const {http} = useHttps();
  const isValid = ()=>{
    const materials = listMaterial.join(', ');
    http.post('/validationMaterial',{material:materials}).then(
      (response)=>{
        setMaterialDisable([response.data.material])
        setIdMaterial(response.data.suggestions)
      }
    ).catch((err)=>{console.log(err);})
  }
  const addListMaterial = (value)=>{
    console.log("ajout");
    setListMaterial(value)
  }
  return (
    <>
      <Container fluid className="p-6">

        {/* Page Heading */}
        <PageHeading heading="Vos matériels" />
        <div className="py-6">
          <Row>
            <MaterialPerso list={addListMaterial}/>
            {materialDisable && <MaterialPersoDisable data={materialDisable}/>}
          </Row>
          <Row>
          <Button onClick={isValid} style={{width:'50%', margin:'auto'}} variant="primary">Valider</Button>

          </Row>
          <Row>
            <MaterialSuggestion id={idMaterial}/>
          </Row>
        </div>
      </Container>
      
      
      
    </>

  )
}

export default Settings