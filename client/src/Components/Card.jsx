import './Card.css'
import React from "react";
import { Link } from "react-router-dom";
import loading from '../photos/perro.png'


export default function Card({ id, image, name, temperament, min_weight, max_weight }){

    return(
    <div className="dogsContainer">
    <div className="dogsCard">
    <div className='gradient'></div>
    
    <div className="dogsImage">
    {image ? (
        <img className="dogImg" src={`${image}`} alt = "There is no img"/>
        ):
        (
            <img className="loadingGifs" src={loading} alt = "There is no img"/>
            )
        }
    </div>
    <a href={`/dogs/${id}`} > 
    <h2 className="cardName"> {name} </h2>
            </a>
    <div className='temperamentsss'>
    <p className="cardTemperaments"> {temperament} </p>
    </div>
    <p className="cardWeight"> Min Weight: {min_weight} - Max weight: {max_weight}  </p>  
    </div>
    </div>
 )
}