import React, { Component, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import { constant } from "lodash";

const Login = () => {
    require("../../../public/css/login.css");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="Login bloc--bg-white">
            <div className="bloc1 bloc--bg-red">
                <h1 className="title">Connectez-vous</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="group" size="lg">
                        <Form.Label>Nom d'utilisateur</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="group" size="lg">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button block="true" size="lg" type="submit" disabled={!validateForm()} onClick={event => window.location.href='/'}>
                        Se connecter
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;