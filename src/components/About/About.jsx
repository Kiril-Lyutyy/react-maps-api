import React from 'react';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

const About = props => (
    <Container>
        <h1>About author</h1>
        <Card>
            <Card.Header as="h5">React google map SPA</Card.Header>
            <Card.Body>
                <Card.Text>
                    <b>Author:</b> Kirill Lyutyy<br/><br/>
                    <b>E-mail:</b> <a href="mailto:kirillyutyy@gmail.com">kirillyutyy@gmail.com</a>
                </Card.Text>

            </Card.Body>
        </Card>
    </Container>
)

export default About;