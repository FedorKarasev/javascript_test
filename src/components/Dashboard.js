import React, { useState, useRef, useEffect } from 'react'
import { Button, Card, Alert, ListGroup, InputGroup, FormControl } from 'react-bootstrap'
import { useAuth } from '../context/FirebaseAuthProvider'
import { useHistory, Link } from 'react-router-dom'
import useContacts from './hooks/useContacts'
import { projectFirestore } from '../db/firebase'

export default function Dashboard() {

    const contacts = useContacts('contacts')

    console.log(contacts)

    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()

    const searchRef = useRef()
    const history = useHistory()

    function handleDelete(event) {
        projectFirestore.collection('contacts').doc(event.target.parentElement.parentElement.id).delete()
    }

    function handleSearchOnChange() {
        // try {
        //     return contacts.filter(contact => contact.name.toLowerCase().includes(searchRef.current.value))
        // } catch (error) {

        // }
    }

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push('/login')
        } catch (error) {
            setError(`Failed to logout. ${error.message}`)
        }
    }

    return (
        <>
            <Card>
                <h2 className="text-center mb-2">Profile Contacts</h2>
                { error && <Alert variant="danger">{ error }</Alert> }
                <Card.Header className="d-flex flex-row justify-content-between align-items-center">
                    <strong>Email:</strong> { currentUser.email }
                    <Button variant="link" onClick={ handleLogout }>Log Out</Button>
                </Card.Header>
                <Card.Body>
                    <Card.Title className="d-flex flex-row justify-content-between align-items-center">
                        Contacts
                        <Link variant="link" to="/add-new-contact">Add new contact</Link>
                    </Card.Title>
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Search a contact..."
                        aria-label="Contact's username"
                        ref={ searchRef } onChange={ handleSearchOnChange }
                        />
                    </InputGroup>
                    <ListGroup>
                        { contacts && contacts.map(contact => (
                            <ListGroup.Item
                            className="d-flex flex-row justify-content-between align-items-center"
                            key={ contact.id }
                            id={ contact.id }>
                                <p>{ contact.name }</p>
                                <p>{ contact.phone }</p>
                                <div>
                                    <Link to={{
                                        pathname: "/edit-contact",
                                        props: {
                                            name: contact.name,
                                            phone: contact.phone,
                                            contactId: contact.id,
                                        }
                                    }}>
                                        <Button variant="info">Edit</Button>
                                    </Link>
                                    <Button className="ml-1" onClick={ handleDelete } variant="danger">Delete</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </>
    )
}
