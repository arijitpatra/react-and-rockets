// Please implement your solution in this file

// inverse sort util
const inverseSort = (data, sortCriteria) => {
  // incase sortCriteria is a chained string of object keys
  const splitSortCriteriaForObjectChaining = (item) =>
    sortCriteria.split(".").reduce((acc, propertyKey) => {
      return acc[propertyKey];
    }, item);

  return data.sort(
    (x, y) =>
      splitSortCriteriaForObjectChaining(y) -
      splitSortCriteriaForObjectChaining(x)
  );
};

export const prepareData = (filterObject) => {
  // prepareData returns a function which accepts data as parameter
  return (data) => {
    // filter data based on the year passed in filterObject
    const dataFilteredByYear = data.filter(
      (item) => item.launch_year === filterObject.year.toString()
    );

    // filter data based on the customer name passed in filterObject
    const dataFilteredByCustomerName = dataFilteredByYear.filter((item) => {
      return item.rocket.second_stage.payloads.some((payload) => {
        return payload.customers.some((customer) =>
          customer.includes(filterObject.customerName)
        );
      });
    });

    // sort by time - reverse chronology
    const dataSortedByTime = inverseSort(
      dataFilteredByCustomerName,
      "launch_date_unix"
    );

    // sort by the number of payloads - descending order
    const dataSortedByPayloadCount = inverseSort(
      dataSortedByTime,
      "rocket.second_stage.payloads.length"
    );

    /* now dataSortedByPayloadCount here is all filtered and sorted, 
    it is the final stage, we transform its structure as per requirement using array reduce method */
    return dataSortedByPayloadCount.reduce((acc, item) => {
      return [
        ...acc,
        {
          flight_number: item.flight_number,
          mission_name: item.mission_name,
          payloads_count: item.rocket.second_stage.payloads.length,
        },
      ];
    }, []);
  };
};
