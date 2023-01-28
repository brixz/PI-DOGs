const axios = require('axios')
const api = 'https://api.thedogapi.com/v1/breeds'
const { Temperament } = require('../db')


const findTemp = async (req, res) => {
  try {
    const temperamentsFromDB = await Temperament.findAll();
    if(temperamentsFromDB >= 1) res.send(temperamentsFromDB)
    else{
    const apiInfo = await axios.get(api);
    let everyTemperament =  apiInfo.data?.map(dog => dog.temperament ? dog.temperament : null).map(dog => dog && dog.split(', '));
    const mySet = new Set(everyTemperament);
   //const sep = mySet.flat(Infinity);
   //console.log(mySet)
     let temperamentsToDB = await mySet.flat(Infinity);
     console.log(temperamentsToDB)
     temperamentsToDB.map(e =>{
    Temperament.findOrCreate({
        where:{name: e}
    })
   });
  }
    //mySet.forEach((t) => {
    //     if(t){
    //       Temperament.findOrCreate({
    //         where:{ name : t}
    //     });
    //     }
    //    })

   

  //  temperamentsToDB = await Temperament.findAll();
  //  res.status(200).send(temperamentsToDB) 
  } catch (error) {
    res.status(404).send("No temperaments found")
  }
}

module.exports = findTemp;