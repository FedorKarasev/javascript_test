import React, { useState, useRef } from 'react'
import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../context/FirebaseAuthProvider'
import { projectFirestore } from '../../db/firebase'
import { useHistory } from 'react-router-dom'

export default function AddNewContact() {

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const nameRef = useRef()
    const phoneRef = useRef()

    const { currentUser } = useAuth()
    const history = useHistory()

    async function submitHandler(event) {
        event.preventDefault()

        try {
            setError('')
            setLoading(true)
            await projectFirestore.collection('contacts').add({
                name: nameRef.current.value,
                phone: phoneRef.current.value,
                userId: currentUser.uid
            })
            history.push('/')
        } catch (error) {
            setError(`Cannot add a contact. ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Add new contact</h2>
                    { error && <Alert variant="danger">{ error }</Alert> }
                    <Form onSubmit={ submitHandler }>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" ref={ nameRef } placeholder="Ivan" required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control type="tel" ref={ phoneRef } placeholder="+7 (999) 999-99-99" required />
                        </Form.Group>
                        <Button disabled={ loading } className="w-100" type="submit">Add new contact</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
