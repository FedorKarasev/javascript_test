import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import ForgotPassword from './components/ForgotPassword'
import AddNewContact from './components/contacts/AddNewContact'
import EditContact from './components/contacts/EditContact'
import { FirebaseAuthProvider } from './context/FirebaseAuthProvider'
import { Container } from 'react-bootstrap'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <FirebaseAuthProvider>
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={ Dashboard } />
              <Route path="/login" component={ Login } />
              <Route path="/signup" component={ Signup } />
              <Route path="/forgot-password" component={ ForgotPassword } />
              <PrivateRoute path="/add-new-contact" component={ AddNewContact } />
              <PrivateRoute path="/edit-contact" component={ EditContact } />
            </Switch>
          </Router>
        </FirebaseAuthProvider>
      </div>
    </Container>
  );
}

export default App