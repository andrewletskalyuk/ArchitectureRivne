import React, { Component } from 'react';
import Home from './pages/Home';
import Header from './components/Header/index';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <div>
                <Header/>
                <Home/>
            </div>
        );
    }
}
