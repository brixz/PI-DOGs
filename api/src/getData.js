const axios = require('axios');
require('dotenv').config();
const { APY_KEY } = process.env;
const { Dog, Temperament} = require("./db.js");

const getApi = async()=>{
try {
    let dog;
    const apiInfo = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${APY_KEY}`);
    dog = apiInfo.data.map((e) => {
        return{
        id: e.id,
        name: e.name,
        weight: e.weight.metric, 
        height: e.height.metric,
        life_span: e.life_span,
        temperament: e.temperament,
        image: e.image.url
        }
    })
    return dog;
 }catch(err){
    console.log(err);
 }
}

const getDB = async()=>{
    try{
        let allInDB = await Dog.findAll({
          include: [Temperament],
        });
        console.log("dogsDbInfo:", allInDB)
        let dogsDB = allInDB.map((dog) => {
          let allTemperaments = dog.temperaments?.map((temp) => temp.name);
          return {
            id: dog.id,
            name: dog.name,
            height: dog.height,
            weight: dog.weight,
            life_span: dog.life_span,
            temperament: allTemperaments,
            image: dog.image,
          };
        });
        return dogsDB;
      }catch (error) {
        console.log(error);
      }
}
const getAllData = async()=>{
    const api = await getApi();
    const db = await getDB();
    return api.concat(db);    
    return api;
}

module.exports={
    getApi,
    getDB,
    getAllData,
};