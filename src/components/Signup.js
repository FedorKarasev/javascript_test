import React, { useState, useRef } from 'react'
import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../context/FirebaseAuthProvider'
import { useHistory, Link } from 'react-router-dom'
import { projectFirestore } from '../db/firebase'

export default function Signup() {

    const { signup } = useAuth()
    const history = useHistory()

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function submitHandler(event) {
        event.preventDefault()
        
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            const userData = await signup(emailRef.current.value, passwordRef.current.value)
            await projectFirestore.collection('users').doc(userData.user.uid).set({ email: emailRef.current.value })
            history.push('/')
        } catch (error) {
            setError(`Failed to create an account. ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    { error && <Alert variant="danger">{ error }</Alert> }
                    <Form onSubmit={ submitHandler }>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={ emailRef } required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={ passwordRef } required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={ passwordConfirmRef } required />
                        </Form.Group>
                        <Button disabled={ loading } className="w-100" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}
