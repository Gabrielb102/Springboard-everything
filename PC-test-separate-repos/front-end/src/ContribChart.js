import { useEffect } from "react";
import DonutChart from "./DonutChart";


const ContribChart = ({receipts}) => {
    console.log("receipts passed into chart component: ", receipts);
    const chartData = {};
    for (let donor of Object.keys(receipts)) {
        
        const occ = receipts[donor]['occupation'] ? receipts[donor]['occupation'] : "COMPANY OR ORG" ;
        const contribs = receipts[donor]['totalContribs'];

        if (!chartData[occ]) {
            chartData[occ] = contribs;
        } else {
            chartData[occ] += contribs;
        }
    }

    const readyData = Object.keys(chartData).map( occ => {return {
        name : occ,
        value : chartData[occ]
    }});

    const chart = DonutChart(readyData, {
        name: d => d.name,
        value: d => d.value,
        width: 250,
        height: 250
    })

    useEffect(() => {
        const spot = document.querySelector("#chartSpot");
        spot.innerHTML = '';
        if (spot.children.length < 2) spot.appendChild(chart);
    }, [receipts]);

    return (
        <div id="chartSpot" className="info">
            <b>Occupations of Top Contributors</b>
        </div>);
}

export default ContribChart;
