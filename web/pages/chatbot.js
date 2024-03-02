
import axios from 'axios';
import useHttps from 'hooks/useHttp';
import { useState } from 'react';
import { Container, Row, Col, Card, Image, Tab, Form, Dropdown, Button } from 'react-bootstrap';
import { PageHeading } from 'widgets';
import Link from 'next/link';
const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [botResults, setBotResults] = useState('');
  const [loading, setLoading] = useState(false);
  const { http } = useHttps();
  const [link, setLink] = useState('');
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
    http.post('/publications/get-bot-response', { 'question': message }).then((response) => {
      setBotResults(response.data.response)
      http.get("/publications/" + parseInt(response.data.id))
        .then(
          (response) => {
            setLink(`http://localhost:3000/post/${parseInt(response.data.id)}`)
          }
        )
      setLoading(false)
    }).catch((err) => console.log(err))
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
                    <div key={index} className={`d-flex px-4 flex-row justify-content-start mb-4`}>
                      <div className="p-3 ms-3" style={{ borderRadius: '100px', borderBottomLeftRadius: '0px', color: '#fff', backgroundColor: msg.sender === 'user' ? '#6f35a9' : '#6f35a9)' }}>
                        <p className="small mb-0">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>


                <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                  {messages.map((msg, index) => (
                    <div key={index} className={`d-flex px-4 flex-row justify-content-${msg.sender === 'user' ? 'end' : 'start'} mb-4`}>
                      {msg.sender === 'user' ? null : (
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                          alt="avatar" style={{ width: '45px', height: '100%' }} />
                      )}
                      <div className="p-3 ms-3" style={{ borderRadius: '100px', borderBottomRightRadius: '0px', backgroundColor: msg.sender === 'user' ? 'rgba(57, 192, 237,.2)' : 'rgba(0, 123, 255,.2)' }}>
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
                          <i className="fe fe-mic-off"></i>
                        </span>
                        <Button disabled={loading} variant="primary" type="submit">
                          {loading ? "Chargement..." : "Envoyer"}
                          <span className='px-2'>
                            <i className="fe fe-send"></i>
                          </span>

                        </Button>

                      </Col>
                    </Row>
                  </Form.Group>
                </Form>

                {botResults} <br />
                {link && <Link href={link} target='_blank' style={{ textDecoration: 'none', color: 'green', fontWeight: 'bold' }}>Cliquez ici pour voir le projet</Link>
                }

              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatBot;
