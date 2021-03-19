import React from 'react';
import {Col, Row} from "react-bootstrap";

const LinkElement = (props) => {
    return <Col md={6} sm={12}>
        <a href={props.link.link}>
            <div className="link">
                <img className="card-image" src={props.link.img} alt={props.link.title}/>
                <div className="">
                    <p className="">
                        {props.link.title}
                    </p>
                </div>
            </div>
        </a>
    </Col>;
}

export const Main = (props) => {
    return <Row className="">
        {props.links.map((link, index) => (
            <LinkElement key={index} link={link}/>
        ))}
    </Row>;
}
