import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const port = 3000;
const app = express();
const API_KEY = "23f47a09d4msh95edea3a961ca40p119fc8jsnf948409fe292";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Listening on ${port}`);
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
