import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { getCategories } from '../../api/categories';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { postNote, putNote } from '../../api/notes';

const ModalComponent = ({ handleClose, note }) => {

    const [categories, setCategories] = useState([])
    const [categoryListNote, setCategoryListNote] = useState([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const addCategory = (e) => {
        if (e.target.value !== "1") {

            const filtered = categories.filter((item) => item.category !== e.target.value)
            let categoryAux = categoryListNote
            categoryAux.push(e.target.value)
            setCategoryListNote(categoryAux)
            setCategories(filtered)
        }
    }
    const delCategory = (e, category) => {
        if (e.target.value !== "1") {
            const filtered = categoryListNote.filter((item) => item !== category)
            let categoryAux = categories
            categoryAux.push({ category: category })
            setCategoryListNote(filtered)
            setCategories(categoryAux)
        }
    }
    useEffect(() => {
        getCategoriesAux()

    }, [])

    const getCategoriesAux = async () => {
        const categoriesAux = await getCategories()
        let filtered = categoriesAux
        if (note) {
            setTitle(note.title)
            setContent(note.content)
            setCategoryListNote(note.categories)
            for (let i = 0; i < note.categories.length; i++) {
                filtered = filtered.filter((item) => item.category !== note.categories[i])
            }
        }
        setCategories(filtered)
    }
    const saveNote = async (e) => {
        e.preventDefault()
        const noteAux = { "title": title, "content": content, "categories": categoryListNote }
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                if (note) {
                    putNote(noteAux, note)
                } else {
                    postNote(noteAux)
                }

                window.location.reload(false)
            }
        })

    }
    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Create note</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" style={{ height: '100px' }} value={content}
                            onChange={(e) => setContent(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Categories</Form.Label>
                        {categoryListNote && categoryListNote.map((category) => {
                            return <p key={category}>{category}   <FontAwesomeIcon value={category} icon={faXmarkCircle} onClick={(e) => delCategory(e, category)}></FontAwesomeIcon> </p>
                        })}
                    </Form.Group>
                    <Form.Select aria-label="Floating label select example" onChange={(e) => addCategory(e)}>
                        <option value="1">Open this select menu</option>
                        {categories && categories.map((category) => {
                            return <option key={category.category} value={category.category} >{category.category}</option>
                        })}
                    </Form.Select>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={(e) => saveNote(e)}>
                    Save
                </Button>
            </Modal.Footer>
        </div>
    );
};

export default ModalComponent;