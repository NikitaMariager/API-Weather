import Titel from "../components/Titel";

import useGetData from "../hooks/useGetData";
import Loader from "../components/loader";
import Error from "../components/Error";
import { useEffect, useState } from "react";

function Words() {
  //request-hook
  const { error, loading, data, getData } = useGetData();

  //state
  const [word, setWord] = useState("walk");

  //når component loader udføres nedenfor funktion
  useEffect(() => {
    callAPI();
  }, []);

  // ved klik på en knap
  const callAPI = () => {
    getData(
      "https://mashape-community-urban-dictionary.p.rapidapi.com/define",
      {
        "X-RapidAPI-Key": "d144e5bddamshf87dd83559b293ep15839cjsn6aa4d5f002a9",
        "X-RapidAPI-Host": "mashape-community-urban-dictionary.p.rapidapi.com",
      },
      { term: word }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    callAPI();
  };

  return (
    <div className="word">
      <Titel headline="Have you ever felt the need to look up the definition of a colloquially used slang word? " />

      <p>Type in a word and see its slang-meaning</p>

      <div className="msgcontainer">
        {/* error */}
        {error && <Error />}

        {/* loading */}
        {loading && <Loader />}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="type in a word"
          onInput={(e) => setWord(e.target.value)}
          defaultValue={word}
        ></input>
        <button>Search for difiniton</button>
      </form>

      {data && (
        <div>
          <h2>Definition:</h2>
          <p>{data.list[1].definition}</p>

          <h2>Example:</h2>
          <p>{data.list[1].example}</p>
        </div>
      )}
    </div>
  );
}

export default Words;
