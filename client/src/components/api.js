import React, { Component } from 'react';
import axios from 'axios';

// Konfiguration für die API-Abrufe
const api = axios.create({
    baseURL: `http://localhost:3000/api/`
});

class Api extends Component {

    state = {
        users: []
    }

    constructor() {
        super();
        api.get('/users').then(res => {
            console.log(res.data);
            this.setState({ users: res.data });
        });

    }
}
