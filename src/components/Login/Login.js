import { Button } from "bootstrap";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    return (
        <Form>
            <Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                        placeholder="Enter Email"
                        required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>password</Form.Label>
                    <Form.Control
                        type="text"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        placeholder="Enter password"
                        required />
                </Form.Group>
                <Button type="submit" className="bg-dark w-100">SignUP</Button>
            </Form.Group>
        </Form>
    )
}

export default Login;