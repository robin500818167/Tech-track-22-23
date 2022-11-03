// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.css'
// We can use node_modules directely in the browser!
import * as d3 from 'd3';
import CONFIG from './config.js';
import request from './request.js';

const data = await request(CONFIG.url);

let amount = 0;

console.log(data.paths);

