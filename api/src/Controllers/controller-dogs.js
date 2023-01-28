const {getAllData} = require('../getData.js');
const {Dog} =require('../db.js')

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
const findDogId = async (req, res)=>{
    // const {id}= req.params;
    // try{
    //     const dbId = await getAllData();
    //  const elId = await dbId.filter(e => e.id === id);
    //     console.log(elId)
    //     if (elId) {
    //         res.status(200).json(elId)
    //     } else {
    //         res.status(404).send("No se encontro coincidencia con el id ingresado");
    //     }
    // }catch(error){
    //     console.log(error)
    // }   
    const { id } = req.params;
    if(id.includes('-')){
        let dogsId = await Dog.findOne({
        where: {
         id: id,
     },
      include: Temperament, 
     })
     dogsId? res.status(200).send(dogsId) : res.status(404).send('Dog not found')
 } else {
 let dogsAPI = await getAllData();
 let dogsAPIfiltered = dogsAPI.filter((e) => e.id == id)
 dogsAPIfiltered? res.status(200).send(dogsAPIfiltered) : res.status(404).send("Dog's ID has not been found")
 }
}
const createRaza = async(req, res)=>{
    const { name, height, weight, life_span, temperamets}= req.body;
    try{
        if(!name|| !height || !weight || !life_span || !temperamets ){return res.status(404).send("Faltan parametros")}
        const newRaza = await Dog.create({ name: name, height: height, weight:weight, life_span:life_span, temperamets:[temperamets]})
        res.status(201).send(newRaza);
    }
    catch(error){
        res.status(404).send(error);
        console.log(error)
    }
}

module.exports={
    finAllDogName,
    findDogId,
    createRaza
}