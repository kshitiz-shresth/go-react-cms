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
  function imageExists(image_url) {

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
                <Card.Title as="h4">Edit Homepage</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="4">
                      {imageExists(`http://localhost:8080/uploaded/${details.logo_image}`) ? (<Image style={{ width: "200px" }} src={`http://localhost:8080/uploaded/${details.logo_image}`} />) : ""}
                      <Form.Group>
                        <label>Logo</label>
                        <Form.Control
                          name="logo_image"
                          type="file"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="4">
                      {imageExists(`http://localhost:8080/uploaded/${details.scala_image}`) ? (<Image style={{ width: "200px" }} src={`http://localhost:8080/uploaded/${details.scala_image}`} />) : ""}
                      <Form.Group>
                        <label>Scala Logo</label>
                        <Form.Control
                          name="scala_image"
                          type="file"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="4">
                      {imageExists(`http://localhost:8080/uploaded/${details.jpx_image}`) ? (<Image style={{ height: "35px" }} src={`http://localhost:8080/uploaded/${details.jpx_image}`} />) : ""}
                      <Form.Group>
                        <label>JPX Logo</label>
                        <Form.Control
                          name="jpx_image"
                          type="file"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="12">
                      {imageExists(`http://localhost:8080/uploaded/${details.banner_image}`) ? (<Image style={{ height: "100px" }} src={`http://localhost:8080/uploaded/${details.banner_image}`} />) : ""}
                      <Form.Group>
                        <label>Banner Image</label>
                        <Form.Control
                          name="banner_image"
                          type="file"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Top First</label>
                        <Form.Control
                          defaultValue={details.top_first}
                          name="top_first"
                          cols="80"
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Top Second</label>
                        <Form.Control
                          cols="80"
                          rows="4"
                          as="textarea"
                          defaultValue={details.top_second}
                          name="top_second"
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Top Third</label>
                        <Form.Control
                          defaultValue={details.top_third}
                          name="top_third"
                          cols="80"
                          rows="4"
                          as="textarea"
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                  </Row>
                  <Row>
                    <Col className="pr-1" md="12">
                      {imageExists(`http://localhost:8080/uploaded/${details.dev_system_image}`) ? (<Image style={{ height: "100px" }} src={`http://localhost:8080/uploaded/${details.dev_system_image}`} />) : ""}
                      <Form.Group>
                        <label>Dev System Image</label>
                        <Form.Control
                          name="dev_system_image"
                          type="file"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="12">
                      {imageExists(`http://localhost:8080/uploaded/${details.cases_image}`) ? (<Image style={{ height: "100px", background: "#001665" }} src={`http://localhost:8080/uploaded/${details.cases_image}`} />) : ""}
                      <Form.Group>
                        <label>Cases Image</label>
                        <Form.Control
                          name="cases_image"
                          type="file"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      {imageExists(`http://localhost:8080/uploaded/${details.team_image}`) ? (<Image style={{ height: "100px", background: "#001665" }} src={`http://localhost:8080/uploaded/${details.team_image}`} />) : ""}
                      <Form.Group>
                        <label>Team Image</label>
                        <Form.Control
                          name="team_image"
                          type="file"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      {imageExists(`http://localhost:8080/uploaded/${details.flow_diagram_image}`) ? (<Image style={{ height: "100px", background: "#001665" }} src={`http://localhost:8080/uploaded/${details.flow_diagram_image}`} />) : ""}
                      <Form.Group>
                        <label>Flow Diagram Image</label>
                        <Form.Control
                          name="flow_diagram_image"
                          type="file"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="12">
                      {imageExists(`http://localhost:8080/uploaded/${details.step_image}`) ? (<Image style={{ height: "100px", background: "#001665" }} src={`http://localhost:8080/uploaded/${details.step_image}`} />) : ""}
                      <Form.Group>
                        <label>Steps Image</label>
                        <Form.Control
                          name="step_image"
                          type="file"
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
