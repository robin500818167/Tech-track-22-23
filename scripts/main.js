// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.css'
// We can use node_modules directely in the browser!
import * as d3 from 'd3';
import CONFIG from './config.js';
import request from './request.js';
import changeColor from './changeColor.js';
import data from './fish.json';




//const data = await request(CONFIG.url);
changeColor();

let newdata = Object.values(data)
//console.log(newdata)
//console.log(newdata[0].availability["time-array"]);
//console.log(data.bitterling.availability["time-array"]);

//console.log(d3.rollups(newdata, v => v.length, d => d.availability["time-array"][0] ))
//console.log(d3.group(newdata, d => d.availability["time-array"]))

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
console.log('hourCount', hourCount)



var dataCount = [];
newdata.forEach(e => dataCount[e.availability.hourCount] = dataCount[e.availability.hourCount] ? dataCount[e.availability.hourCount] + 1 : 1);
dataCount = Object.keys(dataCount).map(e => {return {key:e, count:dataCount[e]}});


// set the dimensions and margins of the graph
const margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
console.log(hourCount.length)
  // X axis
  const x = d3.scaleBand()
  .range([ 0, width ])
  .domain([ 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23])
  .padding(0.2);
svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, d3.max(hourCount)])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Bars
  svg.selectAll("mybar")
  .data(hourCount)
  .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", (d, i) => y(hourCount[i]))
    .attr("width", x.bandwidth())
    .attr("height", (d, i) =>  height - y(hourCount[i]))
    .attr("fill", "#69b3a2")

