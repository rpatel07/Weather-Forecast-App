import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const port = 3000;
const app = express();
const URL = "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather";
const API = "23f47a09d4msh95edea3a961ca40p119fc8jsnf948409fe292";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(port,()=>{console.log(`listening on ${port}`)});

app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.post("/weather", async (req, res) => {
    try {
        const cityName = req.body.city;
        console.log(cityName);
        const result = await axios.get(URL, {
            params: { city: cityName },
            headers: {
                'X-RapidAPI-Key': API,
                'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
            }
        });
        console.log(result.data);
        res.render("index.ejs", { info: result.data,placeName:cityName });
    } catch (error) {
        res.status(404).send(error.message);
    }
});
