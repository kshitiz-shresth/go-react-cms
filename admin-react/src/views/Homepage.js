import axios from "axios";
import React, { useEffect, useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Image
} from "react-bootstrap";
import ReactNotificationAlert from "react-notification-alert";

function Homepage() {
  const [details, setDetails] = useState({})
  const [validated, setValidated] = useState(false);
  const notificationAlertRef = React.useRef(null);

  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() == false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const formData = new FormData(form)
      axios.post('http://localhost:8080/basic-details', formData).then(res => {
        form.reset()
        fetchData()
        alert()
      })
    }
  }
  const fetchData = () => {
    axios.get('http://localhost:8080/basic-details').then(res => {
      setDetails(res.data.data)
    })
  }
  function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

  }

  const alert = () => {
    var options = {};
    options = {
      place: "br",
      message: (
        <div>
          Updated Successfully
        </div>
      ),
      type: "info",
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <div className="rna-container">
        <ReactNotificationAlert ref={notificationAlertRef} />
      </div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="6">
                      {imageExists(`http://localhost:8080/uploaded/${details.logo_image}`) ? (<Image height={"150px"} src={`http://localhost:8080/uploaded/${details.logo_image}`} />) : ""}
                      <Form.Group>
                        <label>Logo</label>
                        <Form.Control
                          name="logo_image"
                          type="file"
                          accept="image/png, image/jpeg"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Top First</label>
                        <Form.Control
                          defaultValue={details.top_first}
                          name="top_first"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Top Second</label>
                        <Form.Control
                          type="text"
                          defaultValue={details.top_second}
                          name="top_second"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Top Third</label>
                        <Form.Control
                          defaultValue={details.top_third}
                          name="top_third"
                          type="text"
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Details
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Homepage;
