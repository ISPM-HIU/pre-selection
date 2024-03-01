
import axios from 'axios';
import { useState } from 'react';
import { Container, Row, Col, Card,Image, Tab, Form, Dropdown, Button } from 'react-bootstrap';
import { PageHeading } from 'widgets'; 

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [botResults, setBotResults] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
    }
  };

  const getOpenAiResponse = async (e) => {
    e.preventDefault()
    setLoading(true);
    setBotResults(null);
    console.log(message)
    const body = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Vous êtes un assistant qui donne des conseils afin de rassembler et transformer ces produits à travers des projets écologiques.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization":
          "Bearer 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",
      },
    };
    try {
      let response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        body,
        config
      );

      if (response) {
        let bot_response = response.data.choices[0].message.content;
        console.log(bot_response);
        setLoading(false);
        setBotResults(bot_response);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Container fluid className="p-6">
        <i className="bi bi-chat-square"></i>
      <PageHeading heading="Notre discussion" />
      <Row>
        <Col xl={12} lg={12} md={12} sm={12}>
          <Tab.Container defaultActiveKey="design">
            <Card>
              <Card.Body>

                <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                  {messages.map((msg, index) => (
                    <div key={index} className= {`d-flex px-4 flex-row justify-content-start mb-4`}>
                      <div className="p-3 ms-3" style={{ borderRadius:'100px',borderBottomLeftRadius:'0px',color:'#fff', backgroundColor: msg.sender === 'user' ? '#6f35a9' : '#6f35a9)' }}>
                        <p className="small mb-0">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>


                <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                  {messages.map((msg, index) => (
                    <div key={index} className= {`d-flex px-4 flex-row justify-content-${msg.sender === 'user' ? 'end' : 'start'} mb-4`}>
                      {msg.sender === 'user' ? null : (
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                          alt="avatar" style={{ width: '45px', height: '100%' }} />
                      )}
                      <div className="p-3 ms-3" style={{ borderRadius:'100px',borderBottomRightRadius:'0px', backgroundColor: msg.sender === 'user' ? 'rgba(57, 192, 237,.2)' : 'rgba(0, 123, 255,.2)' }}>
                        <p className="small mb-0">{msg.text}</p>
                      </div>   
                    </div>
                  ))}
                </div>
        
                <Form onSubmit={getOpenAiResponse}>
                    <Form.Group className='py-3' controlId="chatMessage">
                        <Row>
                        <Col xs={10}>
                            <Form.Control
                              type="text"
                              placeholder="Entrez les matériels que vous utilisez"
                              value={message}
                              onChange={handleMessageChange}
                              required
                            />
                        </Col>
                        <Col xs={2} className="">
                            <span className='px-5'>
                              <i class="fe fe-mic-off"></i>
                            </span>
                            <Button disabled={loading} variant="primary" type="submit">
                                {loading ? "Chargement..." : "Envoyer"}
                                <span className='px-2'>
                                    <i class="fe fe-send"></i>
                                </span>

                            </Button>

                        </Col>
                        </Row>
                    </Form.Group>
                </Form>

                {botResults}

              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatBot;
