import React,{useState} from "react";
import blue from "../sounds/blue.mp3"
import yellow from "../sounds/yellow.mp3"

function Box(props) {
  var Clicked = false;
    function makeSound(soundItem) {
        new Audio(soundItem).play();
    }
    function reset(){
        if(props.wonVar||props.click){
            Clicked = false;
        }
    }
    reset();
    return <div id={props.id} style={{ color: props.innerContent == "X" ? "" : "orange" }} className={props.className} onClick={() => {
        if (!Clicked) {
            Clicked = true;
            props.handleComponent(props.id);
            makeSound(blue)
        }
    }} >
        <span className="inner-box">{props.innerContent}</span>
    </div>
}
export default Box;