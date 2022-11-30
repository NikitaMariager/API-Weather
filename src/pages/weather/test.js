import React from "react";
import { useEffect } from "react";

function Test() {
  useEffect(() => {
    console.log("loaded");

    return () => {
      console.log("unmounting");
    };
  }, []);

  return <div>test</div>;
}

export default Test;
