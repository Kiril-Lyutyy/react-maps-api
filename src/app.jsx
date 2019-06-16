import React, {Component} from 'react';
import classList from './scss/app.scss';
import {Route, NavLink, Switch} from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import About from './components/About/About';
import PageNotFound from './components/PageNotFound/PageNotFound';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <React.Fragment>
                <Navbar bg="light" variant="light">
                    <Container>
                        <Row>
                            <Col>
                                <Nav className={'mr-auto ' + classList.top__menu_wrapper}>
                                    <NavLink className={classList.top_menu__link}
                                             to="/" exact>Main page</NavLink>
                                    <NavLink className={classList.top_menu__link}
                                             to="/auth">Authorization</NavLink>
                                    <NavLink className={classList.top_menu__link}
                                             to="/about">About author</NavLink>
                                </Nav>
                            </Col>
                        </Row>
                    </Container>
                </Navbar>

                <Switch>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/" exact component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route component={PageNotFound}/>
                </Switch>

            </React.Fragment>
        )
    }
}

export default App;