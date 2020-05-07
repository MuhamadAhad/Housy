import React, {Component} from 'react';
import {InputGroup,FormControl} from 'react-bootstrap';

class DatePick extends Component{

    render(){
        const date = new Date();
        return(
            <div className="comFilter">
                <h5>Date</h5>
                <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text><i className="fas fa-calendar"></i></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    type="date"
                    name="datePick"
                    placeholder="2020-10-11"
                    max={`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`}
                />
                </InputGroup>
            </div>
        )
    }

}

export default DatePick