import React from 'react';
import {Form,InputGroup,FormControl} from 'react-bootstrap'

function Search(props){

        return(
            <Form inline>
                    <InputGroup>
                        <FormControl
                                type="text"
                                placeholder="Search Location..."
                        />
                        <InputGroup.Append>
                            <InputGroup.Text><i className="fas fa-search"></i></InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
            </Form>
        )

}

export default Search;
