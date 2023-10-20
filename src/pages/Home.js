import React, { useState, useEffect, useRef } from "react";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import logo from '/home/lgassin/git/appMeteo/src/logo.svg'
import axios from "axios";
import { Button } from "@mui/material";


export default function Home() {

  const [tempActuelle, setTempActuelle] = useState("");
  const [tempDemain, setTempDemain] = useState("");

  const addData = () => {
    const uri = "mongodb://localhost:27017";
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
      if (err) {
        console.error("Error connecting to MongoDB", err);
        return;
      }

      const db = client.db("donneesMeteo");
      const collection = db.collection("temperature");

      // Insérer un document
      collection.insertOne({ ville: "Carpentras", temp: 25 }, (err, result) => {
        if (err) {
          console.error("Error inserting document", err);
          client.close();
          return;
        }

        console.log("Document inserted with _id:", result.insertedId);
        client.close();
      });
    });
  }

  const getMeteoActuelle = () => {
    const lat = "39.099724"
    const lon = "-94.578331"
    const time = "1643803200"
    const APIkey = `bf6c12f516884293fcfadc11337b083c`
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=57&lon=-2.15&cnt=3&units=metric&appid=${APIkey}`
    console.log(url)
    axios.get(url).then((res) => {
      console.log("data", res.data);
    })
  }

  const getMeteoDemain = () => {
    const lat = "44.0555639"
    const lon = "5.048722"
    const time = "1643803200"
    const APIkey = `bf6c12f516884293fcfadc11337b083c`
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=fr&units=metric&appid=${APIkey}`
    console.log(url)
    axios.get(url).then((res) => {
      console.log("data", res.data);
      const resultat = res.data.list[8].main.temp_max
      setTempDemain(resultat)
      console.log("temp", resultat);
    })
  }

  return (
    <Grid>
      <p>OUIdd</p>
      <Button variant="contained" onClick={getMeteoDemain}>
        Get meteo
      </Button>
      <Grid display={"flex"} sx={{ justifyContent: "space-evenly" }}>
        <p>Temp actuelle </p>
        <p>Temp de demain {tempDemain} C°</p>
      </Grid>

    </Grid>
  );
}