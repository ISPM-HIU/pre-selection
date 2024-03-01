
import { useState } from 'react';
import { Container, Row, Col, Card,Image, Tab, Form, Dropdown, Button } from 'react-bootstrap';
import { PageHeading } from 'widgets'; 


const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
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
                <div className="d-flex justify-content-between mb-5 align-items-center">
                <div className="d-flex align-items-center">
                    <div>
                        <Image
                        src="/images/avatar/avatar-1.jpg"
                        alt=""
                        className="avatar avatar-md rounded-circle"
                        />
                    </div>
                    <div className="ms-3">
                        <h5 className="mb-0 fw-bold">Jitu Chauhan</h5>
                        <p className="mb-0">il y a 19 minutes</p>
                    </div>
                    </div>
                    <div>
                    {/* dropdown */}
                    <a class="text-muted text-primary-hover"><svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></a>
                    </div>
                </div>
                <div class=" border-top py-2 d-flex align-items-center mb-4"></div>

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
        
                <Form onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
                    <Form.Group className='py-3' controlId="chatMessage">
                        <Row>
                        <Col xs={10}>
                            <Form.Control
                            type="text"
                            placeholder="Entrez votre message"
                            value={message}
                            onChange={handleMessageChange}
                            />
                        </Col>
                        <Col xs={2} className="">
                            <Button variant="primary" type="submit">
                            Envoyer
                                <span className='px-2'>
                                    <i class="fe fe-send"></i>
                                </span>

                            </Button>
                            <span className='px-1'>
                            <i class="fe fe-paperclip"></i>
                            </span>

                        </Col>
                        </Row>
                    </Form.Group>
                </Form>

              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatBot;
