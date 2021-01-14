import React, { useState, useRef } from 'react'
import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../context/FirebaseAuthProvider'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {

    const { resetPassword } = useAuth()

    const emailRef = useRef()

    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function submitHandler(event) {
        event.preventDefault()
        
        try {
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions.')
            emailRef.current.value = ''
        } catch (error) {
            setError(`Failed to reset a password. ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Reset Password</h2>
                    { error && <Alert variant="danger">{ error }</Alert> }
                    { message && <Alert variant="success">{ message }</Alert> }
                    <Form onSubmit={ submitHandler }>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={ emailRef } required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Log In</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}