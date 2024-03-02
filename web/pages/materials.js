// import node module libraries
import { Container, Row, Button } from "react-bootstrap";

// import widget as custom components
import { PageHeading } from "widgets";

// import sub components
import {
  MaterialPerso,
  MaterialPersoDisable,
  MaterialSuggestion,
} from "sub-components";
import { useState } from "react";
import useHttps from "hooks/useHttp";

const Settings = () => {
  const [listMaterial, setListMaterial] = useState([]);
  const [materialDisable, setMaterialDisable] = useState([]);
  const [suggestion, setSuggestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idMaterial, setIdMaterial] = useState([]);
  const { http } = useHttps();

  const getSuggesstion = () => {
    const materials = listMaterial.join(", ");
    try {
        http
        .post("/publications/get-bot-response", { question: materials })
        .then((response) => {
          console.log(response.data)
          setSuggestion(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    catch (error) {
      console.log(error)
    }
  }

  const getValidation = async () => {
    try {
        const materials = listMaterial.join(", ");
        http
        .post("/validationMaterial", { material: materials })
        .then((response) => {
          console.log(response.data)
          setMaterialDisable([response.data.material]);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    catch (error) {
      console.log(error)
    }
  }


  const isValid = () => {
    setLoading(true);
    Promise.all([
      getValidation(),
      getSuggesstion()
    ])
  };
  const addListMaterial = (value) => {
    console.log("ajout");
    setListMaterial(value);
  };
  return (
    <>
      <Container fluid className="p-6">
        {/* Page Heading */}
        <PageHeading heading="Analyse des matériels." />
        <div className="py-6">
          <Row>
            <MaterialPerso isValid={isValid} list={addListMaterial} />
            {materialDisable && (
              <MaterialPersoDisable loading={loading} data={materialDisable} />
            )}
          </Row>
          <Row>
            {
              suggestion.length != 0 && (
                <MaterialSuggestion id={idMaterial} suggestion={suggestion} />
              )
            }
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Settings;
