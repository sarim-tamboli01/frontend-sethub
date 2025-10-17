import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";

//funcation to generate random data
const generateActivityData = (startDate, endDate) => {
  const data = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    const count = Math.floor(Math.random() * 50);
    data.push({
      data: currentDate.toISOString().split("T")[0],
      count: count,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

const getPenalColors = (maxCount) => {
  const colors = {};
  for (let i = 0; i <= maxCount; i++) {
    const greenValue = Math.floor(i / maxCount) * 255;
    colors[i] = `rgb(0,${greenValue},0)`;
  }
  return colors;
};
const HeatMapProfile = () => {
    const [activityData,setActivityData] = useState([]);
    const [panelColors,setPanelColors] = useState({});

    useEffect(()=>{
        const fetchData = async () => {
      const startDate = "2001-01-01";
      const endDate = "2001-01-31";
      const data = generateActivityData(startDate, endDate);
      setActivityData(data);

      const maxCount = Math.max(...data.map((d) => d.count));
      setPanelColors(getPanelColors(maxCount));
    };

    fetchData();
},[]);
 return (
    <div>
      <h4>Recent Contributions</h4>
      <HeatMap
        className="HeatMapProfile"
        style={{ width: "100%", maxWidth: "1100px", height: "360px", color: "white" }}
        value={activityData}
        weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        startDate={new Date("2001-01-01")}
        rectSize={20}
        space={4}
        rectProps={{
          rx: 2.5,
        }}
        panelColors={panelColors}
      />
    </div>
  );

};

export default HeatMapProfile;