import React, { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2"
import numeral from "numeral";
import "./Linegraph.css"

function Linegraph({casesType= "cases"}) {

    const [data, setData] = useState({ cases: [] });
    const options = {
        legend: {
            display: false,
        },
        element: {
            point: {
                radius: 0
            }
        },
        maintainAspectRatio: false,
        tooltips : {
            mode : "index",
            intersect : false,
            callbacks : {
                label : function (tooltipItem,data){
                    return numeral(tooltipItem.value).format("+0,0");
                }
            }
        }
    }

    async function getData() {
        await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then((res) => res.json())
            .then((res) => {
                const chartData = buildChart(res);
                setData(chartData);
            });
    }

    function buildChart(data, casesType = "cases") {
        const chartData = [];
        let lastDataPoint;
        for (let date in data[casesType]) {
            // console.log(date);
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: (data['cases'][date] - lastDataPoint)
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data['cases'][date];
        }
        return chartData;
    }


    useEffect(() => {
        getData();
    }, [casesType])

    return (
        <div className="linegraph">
            <Line
                data={{
                    datasets: [{
                        backgroundColor: "orange",
                        borderColor: "orange",
                        data: data
                    }]
                }}
                options={options}
                scales={{
                    xAxes: [{
                        type: "time",
                        time: {
                            format: "MM/DD/YY</div>",
                            tooltipFormat: "ll"
                        }
                    }],

                    yAxes: [{
                        gridLines : {
                            display : false,
                        },
                        ticks : {
                            callback : function (value,index ,values){
                                return numeral(value).format("0a");
                            }
                        }
                    }]
                }
                }
            >

            </Line>
        </div>
    )
}

export default Linegraph
