import React from 'react';

import { Input, Label, Col, FormFeedback, FormText } from 'reactstrap';

const input = (props) => {
    let inputElement = null;
    
    switch (props.elementType) {
        case ('input'):
            inputElement = <Input 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        default:
            inputElement = <Input 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div>
            <Label for={props.id} sm={1}>{props.id}</Label>
            <Col sm={11}>
                {inputElement}
                <FormFeedback>...</FormFeedback>
                <FormText>{props.text}</FormText>
            </Col>
        </div>
    )

}

export default input;