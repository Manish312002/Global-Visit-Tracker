import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import { VERSION } from "ejs";


const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  password: "root",
  database: "Web Dev",
  host: "localhost",
  port: 5432
}
)
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisisted(){
  const result = await db.query("select country_code from visitedCountries")
  const countries = [];

  result.rows.forEach((country)=>{
    countries.push(country.country_code)
  });
  return(countries)
}


app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  res.render("index.ejs",{total:countries.length,countries:countries})
});

app.post("/add", async(req,res)=>{
  const input = req.body.country;
  try{
    const result = await db.query(
      "select country_code from countries where country_name=$1",[input])

    const data = result.rows[0];
    const countryCode = data.country_code;
    try{
      await db.query("insert into visitedcountries (country_code) values ($1)",[countryCode])
      res.redirect("/")
    }catch(err) {
      console.log(err)
      const countries = await checkVisisted();
      res.render("index.ejs",{
        countries:countries,
        total:countries.length,
        error: "Country has already added, try again."
      })
    }
  }catch(err) {
    console.log(err)
    const countries = await checkVisisted();
    res.render("index.ejs",{
      countries:countries,
      total:countries.length,
      error:"Country name does not exists, try again."
    })
  }
})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
