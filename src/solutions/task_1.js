// Please implement your solution in this file

export const prepareData = (filterObject) => {
  return (d) => {
    const filteredByYear = d.filter(
      (i) => i.launch_year === filterObject.year.toString()
    );
    const payLoadsFiltered = filteredByYear.filter((i) => {
      const yesOrNo = [];
      i.rocket.second_stage.payloads.forEach((j) => {
        if (j.customers.some((s) => s.includes(filterObject.customerName))) {
          yesOrNo.push(1);
        }
      });
      return yesOrNo.length > 0 ? true : false;
    });

    const timeSorted = payLoadsFiltered.sort(function (x, y) {
      return y.launch_date_unix - x.launch_date_unix;
    });

    const payloadCountSorted = timeSorted.sort(function (x, y) {
      return (
        y.rocket.second_stage.payloads.length -
        x.rocket.second_stage.payloads.length
      );
    });

    return payloadCountSorted.reduce((a, i) => {
      return [
        ...a,
        {
          flight_number: i.flight_number,
          mission_name: i.mission_name,
          payloads_count: i.rocket.second_stage.payloads.length,
        },
      ];
    }, []);
  };
};
