import React, { Component, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom";
import { constant } from "lodash";
import {Helmet} from "react-helmet";

import "../../../public/css/login.css"

const API_URL = process.env.MIX_APP_URL +'api/';

const Login = () => {
    require("../../../public/css/login.css");
    const title = "Page de connexion";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    let navigate = useNavigate();
    const loginForm = async () => {
        let data = { "email": email, "password": password };
        const response = await axios.post(API_URL + "users/login", data);
        if (response.data.success) {
            window.sessionStorage.setItem('token', response.data.data);
            navigate("/");
        } else {
            // afficher l'erreur "response.data.error"
            let error = document.getElementById("error");
            error.textContent = response.data.error;
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <main className="Login bloc--bg-white">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <p role="status" className="visually-hidden"> La Boite à Sel - {title} </p>

            <div className="bloc1 bloc--bg-red">
                <h1 className="title">Connectez-vous</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="group" size="lg">
                        <Form.Label htmlFor="email">Nom d'utilisateur</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            id="email"
                            placeholder="Votre adresse mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="group" size="lg">
                        <Form.Label htmlFor="password">Mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            id="password"
                            placeholder="Votre mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button block="true" size="lg" type="submit" disabled={!validateForm()} onClick={loginForm}>
                        Se connecter
                    </Button>
                    <p id="error"></p>
                </Form>
            </div>
        </main>
    );
}

export default Login;
