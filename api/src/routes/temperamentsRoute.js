const { Router } = require('express');
const router = Router();
const axios = require('axios')
const api = 'https://api.thedogapi.com/v1/breeds';
const { Temperament } = require('../db');


router.get('/temperaments', async (req, res) => {
  try {
    const apiInfo = await axios.get(api)
    let everyTemperament =  apiInfo.data?.map(dog => dog.temperament ? dog.temperament : null).map(dog => dog && dog.split(', '));
    const lsdb = everyTemperament.flat(Infinity);
    const TempCopy = [... new Set(lsdb)]

    for (let element in TempCopy) {
      Temperament.findOrCreate({
        where: { name: TempCopy[element] },
      });
    }
    const newtemps = await Temperament.findAll();
    res.status(200).json(newtemps);
    console.log(newtemps);
   
  } catch (error) {
    res.status(404).send(error);
  }
})

module.exports = router;
