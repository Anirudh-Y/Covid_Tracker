// component naming on the basis of BEM

import './App.css';
import { useState, useEffect } from "react";
import { Card, CardContent, Typography, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import Linegraph from './components/Linegraph';
import "leaflet/dist/leaflet.css";


function App() {

  // State is bascially how we use variables in react in an easier way <<<<<<<

  const [countries, setCounteries] = useState([]);
  const [countryCode, setCountryCode] = useState('WorldWide');
  const [countryInfo, setCountryInfo] = useState("");
  const [tableData, setTableData] = useState([]);
  const [mapCenter,setCenter] = useState([20.59, 78.96 ]);
  const [mapZoom,setZoom] = useState(4);
  const [mapCountries, setMapCountries] = useState([]);

  // Calling an API from disease.sh site   

  async function getData() {

    await fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => { return res.json(); })
      .then((res) => {
        const data = res.map((country) => {
          return {
            name: country.country,
            value: country.countryInfo.iso2,    //different countryInfo here
            cases: country.cases
          }
        })
        setCounteries(data);
        setMapCountries(data);
        const secondData = [...data];
        secondData.sort((a,b)=>{
          return (a.cases>b.cases?-1:1)
        })
      setTableData(secondData);
      });
  }

  async function getWorldWide() {
    await fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      })
  }

  useEffect(() => {
    getData();
    getWorldWide();
  }, [])

  // Handler functions

  const menuHandler = async (e) => {
    const code = e.target.value;
    const url = code === "WorldWide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${code}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountryCode(code);
        setCountryInfo(data);
        // console.log(data.countryInfo.lat,data.countryInfo.long);
        setCenter([data.countryInfo.lat , data.countryInfo.long]);
        // console.log(mapCenter);
        setZoom(5);
      })
  }

  return (
    <div className="app">
      <div className="app_left">
        <div className='app_header'>
          <h1>Covid-19 Tracker</h1>
          <FormControl id="app_dropdown" className='app_dropdown'>
            <InputLabel >{countryInfo.country || "Worldwide"}</InputLabel>
            <Select variant="outlined" value="" label="Worlwide" onChange={menuHandler}>
              <MenuItem value="WorldWide">WorldWide</MenuItem>
              {countries.map((country, index) => {
                return (
                  <MenuItem key={index} value={country.value} name={country.name} className="app_menu">
                    {country.name} ({country.value})
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

        </div>

        {/* header */}
        {/* title + dropdown */}
        <div className='app_stats'>
          <InfoBox title="Today Covid Cases" number={countryInfo.todayCases} total={1000000}></InfoBox>
          <InfoBox title="Today Recovered Cases" number={countryInfo.todayRecovered} total={1000000}></InfoBox>
          <InfoBox title="Today Deaths" number={countryInfo.todayDeaths} total={100000}></InfoBox>
        </div>
        {/* infoboxes */}

        <div className="app_map">
          <Map countries={mapCountries} casesType="" center={mapCenter} zoom={mapZoom} />
        </div>
      </div>

      {/* map */}

      <div className="app_right">
        <Card>
          <CardContent className="app_table">
            <h2>Live Covid Cases</h2>
            <Table countries={tableData} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className = "app_graph">
              <h2>Global Covid Cases</h2>
              <Linegraph/>
          </CardContent>
        </Card>
      </div>

      {/* table + graph */}


    </div>
  );
}

export default App;
