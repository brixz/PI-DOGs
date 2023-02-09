import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, orderBy, filterByTemperaments, getTemperaments, filterByBreed } from "../redux/actions";
import Card from './Card'
import './Home.css'
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import loading from '../photos/loading.gif'

export default function Home(){

const dispatch = useDispatch();
const allDogs = useSelector ((state) => state.dogs);
const temperaments = useSelector ((state) => state.temperaments)
const [, setOrder] = useState('All') 
const [, setBreeds] = useState('All') 

const [currentPage, setCurrentPage] = useState(1)
const [dogsPerPage] = useState(8)
const indexOfLastDog = currentPage * dogsPerPage;
const indexOfFirstDog =  indexOfLastDog - dogsPerPage;
const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
const [temperament, setTemperament] = useState('All')

const pagination = (currentPageNumber) => {
    setCurrentPage(currentPageNumber)
}


useEffect(() => {
    setCurrentPage(1)
}, [allDogs])

useEffect(() => {
    if(!allDogs.length){
    dispatch(getDogs())
    // dispatch(filterByTemperaments()) 
    dispatch(getTemperaments())
    }
})



function handleClick(e){
    e.preventDefault(); 
    dispatch(getDogs())
    }



function handleSort (e){
    e.preventDefault() 
    dispatch(orderBy(e.target.value)) 
    setCurrentPage(1) 
    setOrder(e.target.value) 
    }

function handleFilterByTemp (e){
    e.preventDefault()
    dispatch(filterByTemperaments(e.target.value))
    setCurrentPage(1)
    setTemperament(e.target.value) 
    }
   
function handleFilterByBreed (e){
    e.preventDefault();
    dispatch(filterByBreed(e.target.value))
    setCurrentPage(1)
    setBreeds(e.target.value) 
}
    return(
        
        <div className="homeDiv">
            <div className="welcome">
            <h1> Welcome! </h1>
            </div>
            <div>
            <button className='refBtn' onClick={e => {handleClick(e)}}>Refresh</button>
            </div>
            <div className="searchBar">
            <SearchBar/>
            </div>
             <a href="/home/form">
               <button className="createButton" type="button">Create Dog!</button>
             </a>
            <div>
                <select className="filterBy" onChange={e => handleSort(e)}>
                <option value ="default"> Sort by.. </option>
                <option value = "az"> A-Z</option>
                <option value = "za"> Z-A </option>
                <option value = "asc"> Lightest </option>
                <option value = "desc"> Heaviest </option>
                </select>
            </div>
           
            <div>
            <select  className='filterTemps' value = {temperament} onChange = {(e)=> handleFilterByTemp(e)}>
        <option value="All"> All temperaments </option>
                    {temperaments?.map((temp, index) => (
                      <option onClick = {(e)=> handleClick(e)} key={index}>
                        {temp.name}
                      </option>
                    ))}
        </select>   
            </div>

            <div>     
        <select className='filterBreeds' onChange = {(e) => {handleFilterByBreed(e)}}> 
            <option value = "all">All breeds</option>
            <option value = "created">Created Breeds</option>
            <option value = "api"> Api Breeds</option>
        </select>
        </div>
 
        <div className="Pagination">
        <button className="paginationButton1"
        onClick={() => pagination(currentPage === 1 ? currentPage : currentPage -1)}
          > « </button>

            <Pagination
                dogsPerPage = {dogsPerPage} 
                allDogs = {allDogs.length} 
                pagination = {pagination} 
            />

        <button className="paginationButton2"
        onClick={() => pagination(currentPage === 0 ? currentPage : currentPage + 1 )} 
          > » </button>
        </div>


            {currentDogs.length === 0 ?
            <div><img className='loadingGif' src={loading} alt="Loading..."/></div> :
            <div className="CardContainer">
            <div className="gradient"></div>
                {currentDogs?.map((e) => {
                    return (
                    <div key={e.id} >
                        <Card 
                        id={ e.id }
                        name = { e.name }
                        image = { e.image }
                        temperament = { typeof e.temperament === 'string' ? e.temperament : e.temperament?.join(', ')}
                        min_weight = {e.min_weight}
                        max_weight = {e.max_weight}
                            />                     
                    </div>
)})}
        </div>
          }
 </div>
    )
}
