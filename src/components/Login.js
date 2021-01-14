import React, { useState, useRef } from 'react'
import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../context/FirebaseAuthProvider'
import { useHistory, Link } from 'react-router-dom'

export default function Login() {

    const { login } = useAuth()
    const history = useHistory()

    const emailRef = useRef()
    const passwordRef = useRef()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function submitHandler(event) {
        event.preventDefault()
        
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch (error) {
            setError(`Failed to log in. ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
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
                        <Button disabled={ loading } className="w-100" type="submit">Log In</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}