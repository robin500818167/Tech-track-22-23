// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.css'
// We can use node_modules directely in the browser!
import * as d3 from 'd3';
import changeColor from './changeColor.js';

const margin = {top: 30, right: 30, bottom: 70, left: 60},
width = 1500 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;

async function updateChart(month) {
  month = Number(month);
  const data = await filterData(month);
  drawChart(data);
}

async function filterData(month) {
    const data = await changeColor();
  
    let newdata = Object.values(data)
    

  newdata = newdata.filter(d=> {
  return  d.availability["month-array-northern"].includes(month)
  })

    var hourCount = [];
    newdata.forEach(d => {
        d.availability["time-array"].forEach(h => {
            if  (hourCount.hasOwnProperty(h))  {
                hourCount[h]++
            } else {
                hourCount[h] = 1;
            }
        } )
    })

    return hourCount;
}

const x = d3.scaleBand()
.range([ 0, width ])
.domain([ 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23])
.padding(0.2);

function initChart() {

    // append the svg object to the body of the page
    const svg = d3.select("#my_dataviz")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("id", "mybars")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // X axis
    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
      .style("font-size", 20)
      .style("fill", "#077C75")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g")
      .attr("id", "yaxis")
      .selectAll("text")
      .style("font-size", 20)
      .style("fill", "#077C75")
      
}

function drawChart(hourCount) {
  
  // set the dimensions and margins of the graph
     // Add Y axis
     const y = d3.scaleLinear()
     .domain([0, 50])
     .range([ height, 0]);

     d3.select("#yaxis")
     .call(d3.axisLeft(y));

    // Bars
    d3.select("#mybars")
    .selectAll("rect")
    .data(hourCount)
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", (d, i) => y(hourCount[i]))
      .attr("width", x.bandwidth())
      .attr("height", (d, i) =>  height - y(hourCount[i]))
      .attr("fill", "#72B5B0")

}     

window.addEventListener('DOMContentLoaded', (e) => {
  d3.selectAll("#filter button").on("click", (e) => {
    updateChart(e.target.value)
  });
  initChart();
  updateChart(1);
})

