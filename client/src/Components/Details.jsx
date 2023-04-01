import './Details.css'
import loading from '../photos/loading.gif'

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDogsDetails, clean } from "../redux/actions";
import img from '../photos/perro.png'


export default function Details(){
    const dispatch = useDispatch();
    let dogsDetail = useSelector((state) => state.dogsDetails); 
    const { id } = useParams(); 

    useEffect(() => {
    dispatch(getDogsDetails(id));
    dispatch(clean());
    }, [dispatch, id]); 

return (
  <div className='background'>
    <div className='detailsCss'>
        {dogsDetail.length === 0 ? <img className="loadingGiff" src={loading} alt="Loading..." /> :
        <div className='detailsContainer'>
        <div>
            <div className='h2css'>
             <h2> {dogsDetail.name} </h2> 
             </div>
                 <div>
                     <img className="imag" src={dogsDetail.image || img} alt="imag of dog"></img>
                 </div>
                <h3 className='h3temperaments'>{dogsDetail.createdInDataBase ? dogsDetail.temperaments.map(el => el.name ).join(', ') : dogsDetail.temperament?.split(', ').map(e => e ).join(', ') }</h3>
                 <p className='weightCss' > Min Weight: {dogsDetail.min_weight},  Max Weight: {dogsDetail.max_weight} </p>
                 <p className='heightCss'> Min Height: {dogsDetail.min_height},  Max Height: {dogsDetail.max_height} </p>
                 <p className='lifeSpanCss'> Life Span: {dogsDetail.life_span} </p>
                
             </div>
             <Link to ="/home" >
                     <button className='backButton'> Back </button>
                 </Link>
         </div> }

         </div> 
    </div>
)
}

