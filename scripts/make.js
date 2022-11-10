async function make() {
document.getElementById('fish').onclick = () => {
    document.getElementById("svg").style.backgroundColor = "#7DC9C3";
    document.getElementById("svg").style.fill = "#72B5B0";
};
document.getElementById('bugs').onclick = () => {
    document.getElementById("svg").style.backgroundColor = "#67B892";
    document.getElementById("svg").style.fill = "#87C9A1";
};
document.getElementById('fosils').onclick = () => {
    document.getElementById("svg").style.backgroundColor = "#F8EEBB";
    document.getElementById("svg").style.fill = "#7E7057";
};
}
export default make;