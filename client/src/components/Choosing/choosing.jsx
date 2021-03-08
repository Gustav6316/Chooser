import React from "react";
import Item from "./Item/Item"
import {renderEntireTree} from "../../index";


let films = new Map();
films.set("Batman", 0).set("Hobbit", 0).set("Matrix", 0).set("Bond", 0);

let filmsArray = Array.from(films, ([name]) => ({name}));

let counterFirstItem = 1;
//let counterSecondItem = filmsArray.length-counterFirstItem-1; Why it`s not working???!


const Choosing = (props) => {


    let plusPoint = (props) => {

        if (filmsArray.length - 2 >= counterFirstItem) {
            counterFirstItem++
        } else {
            counterFirstItem = 0;
        }


        films.set(props, films.get(props) + 1);

        alert("Movie " + props + " has now " + films.get(props) + " point");


        renderEntireTree();

    };

   // let filmToShow = filmsArray[counterFirstItem].name;
  //  let filmToShowSecond = filmsArray[counterSecondItem].name;

    return (
        <div>
            <div className="firstItem">
                <Item  plusPoint={plusPoint} filmToShow={filmsArray[counterFirstItem].name}></Item>

            </div>
            <div className="or">
                or
            </div>
            <div className="secondItem">
                <Item  plusPoint={plusPoint} filmToShow={filmsArray[(filmsArray.length-1)-counterFirstItem].name}></Item>

            </div>
        </div>
    );
}
export default Choosing;