import React, { useState, useRef } from 'react'
import { Form, Card, Button, Alert } from 'react-bootstrap'
import { projectFirestore } from '../../db/firebase'
import { useHistory } from 'react-router-dom'

export default function EditContact(props) {

    const history = useHistory()

    if (!props.location.props) {
        history.push('/')
    };

    const { name, phone, contactId } = props.location.props

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const nameRef = useRef()
    const phoneRef = useRef()

    async function submitHandler(event) {
        event.preventDefault()

        try {
            setError('')
            setLoading(true)
            await projectFirestore.collection('contacts').doc(contactId).update({
                name: nameRef.current.value,
                phone: phoneRef.current.value,
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
                    <h2 className="text-center mb-4">Edit contact</h2>
                    { error && <Alert variant="danger">{ error }</Alert> }
                    <Form onSubmit={ submitHandler }>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" ref={ nameRef } defaultValue={ name } />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control type="tel" ref={ phoneRef } defaultValue={ phone } />
                        </Form.Group>
                        <Button disabled={ loading } className="w-100" type="submit">Update contact</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
