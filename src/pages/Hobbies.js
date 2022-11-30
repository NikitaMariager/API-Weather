import Titel from "../components/Titel";

import useGetData from "../hooks/useGetData";
import Loader from "../components/loader";
import Error from "../components/Error";

function Hobbies() {
  //request-hook
  const { error, loading, data, getData } = useGetData();

  // ved klik på en knap
  const handleClick = () => {
    getData(
      "https://hobbies-by-api-ninjas.p.rapidapi.com/v1/hobbies",
      {
        "X-RapidAPI-Host": "hobbies-by-api-ninjas.p.rapidapi.com",
        "X-RapidAPI-Key": "d144e5bddamshf87dd83559b293ep15839cjsn6aa4d5f002a9",
      },
      { category: "general" }
    );
  };

  return (
    <div>
      <Titel headline="vælg din (tilfældige) Hobby" />

      <div className="msgcontainer">
        {/* error */}
        {error && <Error />}

        {/* loading */}
        {loading && <Loader />}
      </div>

      {data && (
        <div>
          <h2>
            {" "}
            You're new hobby is{" "}
            <a href={data.link} target="_blank">
              {data.hobby}
            </a>{" "}
          </h2>
        </div>
      )}
      <button onClick={handleClick}>Gi mig en hobby!</button>
    </div>
  );
}

export default Hobbies;
