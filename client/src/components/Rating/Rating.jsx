import React from "react";

const Rating = (props) => {

const show = () => {

    let divId = document.getElementById('test').innerHTML = props.data;
    console.log(props.data);

}
    return(
        <div>
            <button onClick={show}>ff</button>
            <div id='test'>Test</div>
        </div>
    )
};

export default Rating;