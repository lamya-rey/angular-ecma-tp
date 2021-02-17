import fastify from 'fastify';
// see axios doc on how to use it
import axios from 'axios';

const app = fastify({ logger: true });

//call CatFacts API
async function getCatFacts() {
  try {
    const response = await axios({
      url: 'https://cat-fact.herokuapp.com/facts/random?amount=3',
      method: 'GET',
    });
    return response.data.map(cat => cat.text)
  } catch (err) {
    return null;
  }
}

//call Fox API
async function getFoxImage() {
  try {
    const response = await axios({
      url: 'https://randomfox.ca/floof/',
      method: 'GET',
    });
    return response.data.image;
  } catch (err) {
    return null;
  }
}

//call PublicHolidays API
async function getDayOff(countryCode) {
  try {
    const response = await axios({
      url: `https://date.nager.at/api/v2/PublicHolidays/2021/${countryCode}`,
      method: 'GET',
    });
    return response.data;
  } catch (err) {
    return null;
  }
}

app.post('/', async (req, res) => { const countryCode = req.body.countryCode;
  const catFacts = await getCatFacts();
  const foxImage = await getFoxImage();
  const dayOff = await getDayOff(countryCode);

  return {
    catFacts: catFacts,
    foxImage: foxImage,
    dayOff: dayOff,
  };
});

// Run the server! 
const start = async () => {
  try {
    await app.listen(5000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();