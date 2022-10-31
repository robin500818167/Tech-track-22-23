// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.css'
// We can use node_modules directely in the browser!
import * as d3 from 'd3';
import CONFIG from './config.js';
import request from './request.js';
import makeHtml from './make.js';

const data = await request(CONFIG.url);

let amount = 0;

console.log(data);

makeHtml(data
	.map(item => item['Welke kleur kledingstukken heb je aan vandaag? (Meerdere antwoorden mogelijk natuurlijk...)'])
	.map(item => item.split(',').map(color => color.trim())).flat()
	// .filter(item => item == 'Zwart' || item === 'Wit') // Zwart en wit zijn awesome!;
	.reduce((acc, curr) => {
		return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
	}, {}), document.querySelector('table'))
