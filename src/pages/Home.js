import React from "react";
import Titel from "../components/Titel";
import { useEffect, useState } from "react";
import useGetData from "../hooks/useGetData";
import Loader from "../components/loader";
import Error from "../components/Error";
import Newscard from "../components/Newscard";

const Home = () => {
  //request-hook
  const { error, loading, data, getData } = useGetData();

  //State
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("general");

  const [country, setCountry] = useState("us");

  //når component loader udføres nedenfor funktion
  useEffect(() => {
    /* getData(
      "https://newsapi.org/v2/top-headlines?country=se&category=sports&q=" +
        search +
        "&apiKey=3e1f9cc3960e44c9b24129b8b96158a9"
    ); */
    callAPI();
  }, []);

  //søg - kald på API - når der klikke på søg
  const handleSubmit = (e) => {
    e.preventDefault(); //forhindrer reload af siden (skal undgåes fordi det tømmer state)

    /*  getData(
      "https://newsapi.org/v2/top-headlines?country=se&category=sports&q=" +
        search +
        "&apiKey=3e1f9cc3960e44c9b24129b8b96158a9"
    ); */

    callAPI();
  };

  //Genbrug af url - gemmer API adreesen i en var for kun at have url stående et sted
  const callAPI = () => {
    getData(
      "https://newsapi.org/v2/top-headlines?country=" +
        country +
        "&category=" +
        category +
        "&q=" +
        search +
        "&apiKey=3e1f9cc3960e44c9b24129b8b96158a9"
    );
  };

  return (
    <div className="news">
      <Titel headline="News search" />

      <div className="msgcontainer">
        {/* error */}
        {error && <Error />}

        {/* loading */}
        {loading && <Loader />}
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Søgeord:</label>
        <label htmlFor="category">Category:</label>
        <label htmlFor="country" id="labelCountry">
          Country:
        </label>
        <div>
          <input
            id="search"
            type="text"
            defaultValue={search}
            onInput={(e) => setSearch(e.target.value)}
          ></input>
        </div>

        {/* kategori */}

        <div>
          <select
            id="category"
            defaultValue={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>business</option>
            <option>entertainment</option>
            <option>general</option>
            <option>health</option>
            <option>science</option>
            <option>sports</option>
          </select>
        </div>

        {/* Country */}

        <div>
          <input
            id="country"
            list="countryList"
            defaultValue={country}
            onInput={(e) => setCountry(e.target.value)}
          />
          <datalist id="countryList">
            <option value="ae" />
            <option value="ar" />
            <option value="at" /> <option value="au" />
            <option value="be" />
            <option value="bg" /> <option value="br" />
            <option value="ca" />
            <option value="ch" /> <option value="cn" />
            <option value="co" />
            <option value="cu" /> <option value="cz" />
            <option value="de" />
            <option value="eg" /> <option value="fr" />
            <option value="gb" />
            <option value="gr" /> <option value="hk" />
            <option value="hu" />
            <option value="id" /> <option value="ie" />
            <option value="il" />
            <option value="in" /> <option value="it" />
            <option value="jp" />
            <option value="kr" /> <option value="lt" />
            <option value="lv" />
            <option value="ma" /> <option value="mx" />
            <option value="my" />
            <option value="ng" /> <option value="nl" />
            <option value="no" />
            <option value="nz" /> <option value="ph" />
            <option value="pl" /> <option value="pt" /> <option value="ro" />{" "}
            <option value="rs" /> <option value="ru" /> <option value="sa" />{" "}
            <option value="se" /> <option value="sg" /> <option value="si" />{" "}
            <option value="sk" /> <option value="th" /> <option value="tr" />{" "}
            <option value="tw" /> <option value="ua" /> <option value="us" />{" "}
            <option value="ve" /> <option value="za" />
          </datalist>
        </div>

        <button>Søg</button>
      </form>

      {/* hvis der er data og de har en length - vis antal match - og ellers 'ingen match' */}
      {data?.articles.length ? (
        <p>Antal match: {data.totalResults}</p>
      ) : (
        <p>desværre ingen match</p>
      )}

      {/*  {data ? (
        <p>Antal match: {data.totalResults}</p>
      ) : (
        <p>Desværre ingen match</p>
      )} */}

      <div className="newsContainer">
        {/* Data */}
        {data &&
          data.articles.map((a, i) => (
            <Newscard newsevent={a} key={"news" + i} />
            /*  <div key={"news" + i} className="newsarticle">
              <img src={a.urlToImage} alt=""></img>
              <h4>{a.title}</h4>
              <p>{a.description}</p>

              <a href={a.url} target="_blank">
                {" "}
                Læs mere
              </a>
            </div> */
          ))}
      </div>
    </div>
  );
};

export default Home;
