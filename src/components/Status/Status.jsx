import React from "react";
import { useStatus } from "../../Store/Store.js";

const Status = (color) => {
  const status = useStatus((state) => state.status);

  return (
    <div
      style={{ borderColor: `${status[color]}` }}
      className="w-3 h-3 mr-2 inline-block rounded-full border-[3px] "
    ></div>
  );
};

export default Status;
