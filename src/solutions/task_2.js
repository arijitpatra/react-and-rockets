// Please implement your solution in this file

import { useEffect, useState } from "react";
import { prepareData } from "./task_1";

/* custom hook to fetch API once and process data on filter params change 
(could have been moved to different file, but not sure if I am allowed or not to do so for this task) */
const useFetchAndPrepareData = (filterParams) => {
  const url = "https://api.spacexdata.com/v3/launches/past";
  const [workingData, setWorkingData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const setting = (data) => {
    setMasterData(data);
    setIsLoading(false);
  };

  // fetch api
  useEffect(() => {
    setIsLoading(true);
    window
      .fetch(url)
      .then((response) => response.json())
      .then((data) => setting(data))
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  // re-process data on filter change
  useEffect(() => {
    setWorkingData(prepareData(filterParams)(masterData));
  }, [filterParams, masterData]);

  return { workingData, isLoading };
};

export const RocketsList = ({ filterParams }) => {
  const { workingData, isLoading } = useFetchAndPrepareData(filterParams);

  const getLists = () => {
    return workingData.map((item) => (
      <div
        key={item.mission_name}
      >{`#${item.flight_number} ${item.mission_name} (${item.payloads_count})`}</div>
    ));
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : workingData.length > 0 ? (
    getLists()
  ) : (
    <div>No data</div>
  );
};
