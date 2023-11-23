import React, { Component } from 'react';
import Home from './pages/Home'; 


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <div>
                <Home/>
            </div>
        );
    }
}
