import React from "react";


const Item =(props) => {
    let elValue = React.createRef();
    let addPoint = () =>{
        let currentValue = document.getElementById('test').innerText;
        props.plusPoint(currentValue);
    }
    return(
        <div>
            <div>
                <div id="test" >{props.filmToShow}</div>
                <button onClick={addPoint} >Vote for this</button>
            </div>

        </div>
    )
}
export default Item;