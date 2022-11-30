import React from "react";
import Titel from "../../components/Titel";

import Loader from "../../components/loader";
import Error from "../../components/Error";
import { useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData";

//map
import { initMap, changeMapView, removeMap } from "../../helpers/leaflet";

const Weather3 = () => {
  //request-hook
  const { error, loading, data, getData } = useGetData();
  const {
    error: errorDAWA,
    loading: loadingDAWA,
    data: dataDAWA,
    getData: getDataDAWA,
  } = useGetData();

  const [zip, setZip] = useState("8000");

  useEffect(() => {
    if (zip.length === 4 && !isNaN(zip)) {
      getData(
        "https://api.openweathermap.org/data/2.5/weather?zip=" +
          zip +
          ",dk&units=metric&lang=da&appid=8816e8e517c9a755807202693f5462ed"
      );
    } else {
      getDataDAWA(
        "https://api.dataforsyningen.dk/postnumre/autocomplete?q=" + zip
      );
    }
  }, [zip]);

  useEffect(() => {
    //hvis der er data (og dermed koordinater til et valgt postnummer) flyt kort-view til post nr-kordinater
    if (data)
      changeMapView(
        [data.coord.lat, data.coord.lon],
        data.weather[0].description
      );
  }, [data]); //lytter efter data fra openweather (med koordinater)

  //init map
  useEffect(() => {
    initMap([56, 10]);

    return () => {
      removeMap(); //fjerner kortet når component unmountes
    };
  }, []);

  return (
    <div>
      <div>
        <Titel headline="vejret med adresseopslag ved DAWA og kort" />

        <div className="msgcontainer">
          {/* error */}
          {error && <Error />}

          {/* loading */}
          {loading && <Loader />}
        </div>

        <input
          className="weather2Input"
          type="text"
          placeholder="Indtast et postnummer"
          defaultValue={zip}
          maxLength="4"
          onInput={(e) => setZip(e.target.value.substring(0, 4))}
          list="adresseforslag"
        ></input>

        <datalist id="adresseforslag">
          {dataDAWA &&
            dataDAWA.map((a) => (
              <option value={a.tekst} key={a.postnummer.nr}></option>
            ))}
        </datalist>
      </div>

      <div className="weather3">
        {data && (
          <div className="weather2">
            <div className="weather2-container">
              <h2>Vejret i {data.name}</h2>
              <p>{data.weather[0].description}</p>
              <p>Temperatur: {Math.round(data.main.temp)} &#8451; </p>
              <p>Luftfugtighed: {data.main.humidity}</p>
            </div>
            <div className="img-container">
              <img
                src={
                  "http://openweathermap.org/img/wn/" +
                  data.weather[0].icon +
                  ".png"
                }
                alt=""
              />
            </div>
          </div>
        )}
        {/* Map */}
        <div
          id="mapContainer"
          style={{
            width: "300px",
            height: "300px",
            backgroundColor: "silver",
          }}
        >
          kortet er på vejret
        </div>
      </div>
    </div>
  );
};

export default Weather3;
