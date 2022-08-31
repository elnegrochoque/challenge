import React, { useEffect, useState } from 'react';
import CardComponent from '../../components/Card/CardComponent';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import ModalComponent from '../../components/Modal/ModalComponent';
import { getNote, getNotesFiltered } from '../../api/notes';
import { getCategories } from '../../api/categories';
import Form from 'react-bootstrap/Form';
const Principal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [notes, setNotes] = useState([])
    const [categories, setCategories] = useState([])


    useEffect(() => {
        getNotes()
    }, [])
    const getNotes = async () => {
        const notesAux = await getNote()
        setNotes(notesAux)
        const categoriesAux = await getCategories()
        setCategories(categoriesAux)
    }

    const filterCategories = async (e) => {
        if (e.target.value === "1") {
            getNotes()
        } else {
            const notesFiltered = await getNotesFiltered(e.target.value)
            setNotes(notesFiltered)
        }
    }

    return (
        <Container >
            <Row className='m-5'>
                <Col>
                    <h1 >My Notes</h1>
                </Col>
                <Col>
                    <Button onClick={handleShow}>Create Note</Button>
                </Col>
                <Col><Button variant="link" > <Link to="/archived">Archived</Link></Button></Col>
                <Col>
                    <Form.Select aria-label="Floating label select example" onChange={(e) => filterCategories(e)}>
                        <option value="1">Filter</option>
                        {categories && categories.map((category) => {
                            return <option key={category.category} value={category.category} >{category.category}</option>
                        })}
                    </Form.Select></Col>
            </Row>
            <Row xs={2}>
                {notes && notes.map((note) => {
                    return <Col key={note.idnotes}><CardComponent note={note} /> </Col>
                })}
            </Row>
            <Modal show={show} onHide={handleClose}>
                <ModalComponent handleClose={handleClose}></ModalComponent>
            </Modal>
        </Container>
    );
};

export default Principal;
