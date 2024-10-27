import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


const app = express();
const API_KEY = process.env.API_KEY;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(3000, () => {
    console.log(`Listening on ${3000}`);
});

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/weather", async (req, res) => {
    const cityName = req.body.city;
    const options = {
        method: 'GET',
        url: `https://open-weather13.p.rapidapi.com/city/${cityName}/EN`,
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.render("index.ejs", { info: response.data, placeName: cityName });
        console.log(response.data);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(404).send(error.message);
    }
});
