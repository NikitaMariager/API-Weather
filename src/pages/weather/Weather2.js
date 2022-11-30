import React from "react";
import Titel from "../../components/Titel";

import Loader from "../../components/loader";
import Error from "../../components/Error";
import { useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData";
const Weather2 = () => {
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

  return (
    <div>
      <Titel headline="vejret med adresseopslag ved DAWA" />

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
    </div>
  );
};

export default Weather2;
