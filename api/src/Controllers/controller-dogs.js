//const {Dog}= require('../db.js');
const {getAllData} = require('../getData.js');

const finAllDogName = async (req, res)=>{
    const {name} = req.query
    const dog = await getAllData();
    //console.log(dog);
    if(name){
        const search = await dog.filter(rec => rec.name.toLowerCase().includes(name.toLowerCase()))
        if(search.length > 0){
            res.status(201).json(search)
        }else{
            res.status(400).send('dogs no encontrado')
        }
    }else{
    const orderRecipes = dog.sort((a, b) => a.name.localeCompare(b.name))
    res.json(orderRecipes);
    }
    
}

module.exports=finAllDogName;