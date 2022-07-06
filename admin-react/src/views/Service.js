import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  Modal,
  Form,
} from "react-bootstrap";

function Service() {
  let [services, setServices] = useState([])
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formType, setFormType] = useState("Add");
  const [updateId, setUpdateId] = useState(null);
  const [defaultTitle, setDefaultTitle] = useState(null);
  const [defaultDescription, setDefaultDescription] = useState(null);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const formData = new FormData(form)
      const title = formData.get('title')
      const description = formData.get('description')
      if (formType === "Add") {
        axios.post('http://localhost:8080/services', { title, description }).then((res) => {
          fetchData()
          handleClose()
        })
      } else if (formType === "Edit") {
        axios.put(`http://localhost:8080/services/${updateId}`, { title, description }).then((res) => {
          fetchData()
          handleClose()
        })
      }

    }
    setValidated(true);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const createNew = () => {
    handleShow()
    setValidated(false)
    setFormType('Add')
    emptyForm()
  }
  const editForm = (item) => {
    handleShow()
    setValidated(false)
    setFormType('Edit')
    setUpdateId(item.id)
    setDefaultTitle(item.title)
    setDefaultDescription(item.description)
  }
  const emptyForm = () => {
    setDefaultTitle('')
    setDefaultDescription('')
  }

  const reOrder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    console.log(result)
    return result;
  };
  const draggedItem = (result) => {
    if (result?.source?.index != result?.destination?.index) {
      setServices(reOrder(services, result?.source?.index, result?.destination?.index));
      axios.post(`http://localhost:8080/service/drag/${result.draggableId}`, {
        sourceIndex: result?.source?.index,
        destinationIndex: result?.destination?.index
      }).then(res => {
      })
    }
  }
  const deleteService = (id)=>{
    if(confirm('Are You Sure?')){
      axios.delete(`http://localhost:8080/services/${id}`).then((res) => {
        fetchData()
      })
    }
  }
  const fetchData = () => {
    axios.get('http://localhost:8080/services').then(res => {
      setServices(res.data.data)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Card>
            <Card.Header>
              <Card.Title as="h4">{formType} Service</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col className="pr-1" md="11">
                    <Form.Group>
                      <label>Title</label>
                      <Form.Control
                        required
                        type="text"
                        name="title"
                        defaultValue={defaultTitle}
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        Title is required.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Form.Group>
                      <label>Description</label>
                      <Form.Control
                        required
                        cols="80"
                        rows="4"
                        as="textarea"
                        name="description"
                        defaultValue={defaultDescription}
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        Description is required.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit" >
                  Save Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">
                  <Button
                    className="btn-fill"
                    variant="info"
                    onClick={createNew}
                  >
                    <div className="d-flex align-items-center">
                      <i className="nc-icon nc-simple-add"></i>
                      <p className="ml-3 mb-0 ">Add New Service</p>
                    </div>
                  </Button>
                </Card.Title>

              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0" style={{ minHeight: "500px" }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th className="border-0">Title</th>
                      <th className="border-0">Description</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <DragDropContext onDragEnd={draggedItem}>
                    <Droppable droppableId="dropId">
                      {(provided, snapshot) => (
                        <tbody
                          ref={provided.innerRef}
                        >
                          {Object.values(services).map((item, index) => {
                            return (
                              <Draggable
                                draggableId={item?.id?.toString()}
                                key={item?.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <tr
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <td>{item.title}</td>
                                      <td>{item.description}</td>
                                      <td className="td-actions">
                                        <Button
                                          className="btn-simple btn-link p-1"
                                          type="button"
                                          variant="info"
                                          onClick={() => { editForm(item) }}
                                        >
                                          <i className="fas fa-edit"></i>
                                        </Button>
                                        <Button
                                          className="btn-simple btn-link p-1"
                                          type="button"
                                          variant="danger"
                                          onClick={() => { deleteService(item.id) }}
                                        >
                                          <i className="fas fa-times"></i>
                                        </Button>
                                      </td>
                                      {provided.placeholder}
                                    </tr>
                                  )
                                }
                                }
                              </Draggable>
                            )
                          }
                          )
                          }
                        </tbody>
                      )
                      }

                    </Droppable>
                  </DragDropContext>

                </table>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Service;
