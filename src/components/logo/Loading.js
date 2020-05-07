import React from 'react';
import Loader from 'react-loader-spinner';

function Loading(props){

    return(
        <Loader 
            type="Circles"
            color="#0275d8"
            width={50}
            className={props.className}
        />
    )


}

export default Loading;