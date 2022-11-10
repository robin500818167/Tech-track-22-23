// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.css'
// We can use node_modules directely in the browser!
import * as d3 from 'd3';
import CONFIG from './config.js';
import request from './request.js';
import make from './make.js';

const data = await request(CONFIG.url);
make();
let amount = 0;

console.log(data);

const chartWidth = 700
const chartHeight = 800

// const yScale = d3.scaleLinear()
// 	.domain([0, d3.max(data, d => d.Aantal)])
// 	.range([0, chartWidth]);

const xScale = d3.scaleBand()
	.domain(d3.map(data, d => d.availabilty))
	.range([0, chartHeight])
  .paddingInner(0.05);

d3.select('#bars')
  .selectAll('rect')
  .data(data)
  .join('rect')
  .attr('height', 25) //yScale.bandwith())
  .attr('width', d => xScale(d.availabilty))
//   .attr('y', d => yScale(d.availabilty))
  .classed('animate__animated animate__headShake animate__infinite', () => Math.random() > 0.8)
  .classed('animate__slower', () => Math.random() > 0.5)

d3.select('#labels')
  .selectAll('text')
  .data(data)
  .join('text')
//   .attr('y', d => yScale(d.availabilty) + 15)
  .text(d => d.availabilty);
