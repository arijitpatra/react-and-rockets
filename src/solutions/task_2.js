// Please implement your solution in this file

import { useEffect, useState } from "react";
import { prepareData } from "./task_1";

const usePrepareData = (filterParams) => {
  const [final, setFinal] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const setting = (data) => {
    setFullData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    window
      .fetch("https://api.spacexdata.com/v3/launches/past")
      .then((response) => response.json())
      .then((data) => setting(data))
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setFinal(prepareData(filterParams)(fullData));
  }, [filterParams, fullData]);

  return { final, isLoading };
};

export const RocketsList = ({ filterParams }) => {
  const { final, isLoading } = usePrepareData(filterParams);

  const getLists = () => {
    return final.map((i) => (
      <div
        key={i.mission_name}
      >{`#${i.flight_number} ${i.mission_name} (${i.payloads_count})`}</div>
    ));
  };

  return isLoading && final.length === 0 ? (
    <div>Loading...</div>
  ) : final.length > 0 ? (
    getLists()
  ) : (
    <div>No data</div>
  );
};
