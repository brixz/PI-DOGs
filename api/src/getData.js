const axios = require('axios');
require('dotenv').config();
const { APY_KEY } = process.env;
const { Dog, Temperament} = require("./db.js");

const getApi = async ()=>{
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
    try {
        const crea = await getApi();
        crea?.map(e=>{})
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    getApi
};