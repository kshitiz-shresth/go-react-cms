import axios from "axios";
import React, { useEffect, useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  OverlayTrigger,
  Tooltip,
  Row,
  Col,
} from "react-bootstrap";

function Service() {
  let [services, setServices] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8080/services').then(res => {
      setServices(res.data.data)
    })
  },[])

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">
                  <Button
                    className="btn-fill"
                    variant="info"
                    onClick={()=>{setServices(oldValue=>[{id:2,title:"hello",description:"New"},...oldValue])}}
                  >
                    <div className="d-flex align-items-center">
                      <i className="nc-icon nc-simple-add"></i>
                      <p className="ml-3 mb-0 ">Create New</p>
                    </div>
                  </Button>
                </Card.Title>

              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">

                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Title</th>
                      <th className="border-0">Description</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map(item => (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td className="td-actions">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-537440761">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-21130535">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Service;
