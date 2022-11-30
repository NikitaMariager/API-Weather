import React from "react";
import { formatDistanceToNow } from "date-fns";
import { da } from "date-fns/locale";

function Newscard({ newsevent }) {
  return (
    <div>
      <div className="newsarticle">
        {
          /* hvis der er der så hvis det - ellers vis logo  */
          newsevent.urlToImage ? (
            <img src={newsevent.urlToImage} alt=""></img>
          ) : (
            <img src="../../assets/logo.png" alt=""></img>
          )
        }

        <h4>{newsevent.title}</h4>
        <p>
          {new Date(newsevent.publishedAt).toLocaleString("da-dk", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </p>

        <p>{newsevent.description}</p>
        <p>
          {formatDistanceToNow(new Date(newsevent.publishedAt), {
            locale: da,
            addSuffix: true,
          })}
        </p>
        <a href={newsevent.url} target="_blank">
          {" "}
          Læs mere
        </a>
      </div>
    </div>
  );
}

export default Newscard;
