import Titel from "../components/Titel";

import useGetData from "../hooks/useGetData";
import Loader from "../components/loader";
import Error from "../components/Error";
import { useState } from "react";
import { useEffect } from "react";
import Pagination from "../components/pagination/Pagination";

function Facts() {
  //request-hook
  const { error, loading, data, getData } = useGetData();

  //pagination
  const [currentPage, setCurrentPage] = useState(0); //hvilken side skal vises nu - side 1(0)
  const [itemsPerPage, setItemsPerPage] = useState(5); //hvor mange items der skal vises på en side

  useEffect(() => {
    getData(
      "https://facts-by-api-ninjas.p.rapidapi.com/v1/facts",
      {
        "X-RapidAPI-Key": "d144e5bddamshf87dd83559b293ep15839cjsn6aa4d5f002a9",
        "X-RapidAPI-Host": "facts-by-api-ninjas.p.rapidapi.com",
      },
      { limit: "30" }
    );
  }, []);

  return (
    <div className="facts">
      <Titel headline="5 fun facts" />

      <div className="msgcontainer">
        {/* error */}
        {error && <Error />}

        {/* loading */}
        {loading && <Loader />}
      </div>

      {data &&
        data
          .slice(
            currentPage * itemsPerPage,
            currentPage * itemsPerPage + itemsPerPage
          )
          .map((f, i) => (
            <div key={"fact" + i} className="fact">
              <p>{data.indexOf(f) + 1}</p>
              <h4>{f.fact}</h4>
            </div>
          ))}

      {/* pagination */}
      {data && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemPerPage={itemsPerPage}
          itemsTotal={data.length}
        />
      )}
    </div>
  );
}

export default Facts;
