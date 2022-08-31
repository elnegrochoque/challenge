import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faArchive } from '@fortawesome/free-solid-svg-icons';
import { delNote, putArchivedNote } from '../../api/notes';
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal';
import ModalComponent from '../../components/Modal/ModalComponent';
const CardComponent = ({ note }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [edited, setEdited] = useState()
    useEffect(() => {
        const noteEdited = note.edited.split('T')
        setEdited(noteEdited[0] + " " + (noteEdited[1].slice(0, 11)))
    }, [])
    const deleteNote = (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                delNote(note.idnotes)
                Swal.fire(
                    'Deleted!',
                    'Your note has been deleted.',
                    'success'
                )
                window.location.reload(false)
            }
        })
    }
    const archivedNote = (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Are you sure?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                putArchivedNote(note.idnotes)

                window.location.reload(false)
            }
        })
    }
    return (
        <Card className='my-2'>

            <Card.Body>
                <Card.Title onClick={handleShow}>{note.title}</Card.Title>
                <Card.Text >Date :{edited}
                    <FontAwesomeIcon style={{ "fontSize": 20, "marginLeft": 10 }} icon={faTrash} onClick={(e) => deleteNote(e)}></FontAwesomeIcon>
                    <FontAwesomeIcon style={{ "fontSize": 20, "marginLeft": 10 }} icon={faPenToSquare} onClick={handleShow} ></FontAwesomeIcon>
                    <FontAwesomeIcon style={{ "fontSize": 20, "marginLeft": 10 }} icon={faArchive} onClick={(e) => archivedNote(e)} ></FontAwesomeIcon>
                </Card.Text>
            </Card.Body>

            <Modal show={show} onHide={handleClose}>
                <ModalComponent handleClose={handleClose} note={note}></ModalComponent>
            </Modal>
        </Card>
    );
};

export default CardComponent;