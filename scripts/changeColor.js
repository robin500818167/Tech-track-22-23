function changeColor() {
    const sort  = 'fish';
document.getElementById('fish').onclick = () => {
    document.getElementById("svg").style.backgroundColor = "#7DC9C3";
    document.getElementById("svg").style.fill = "#72B5B0";
    const sort = 'fish';
};
document.getElementById('bugs').onclick = () => {
    document.getElementById("svg").style.backgroundColor = "#67B892";
    document.getElementById("svg").style.fill = "#87C9A1";
    const sort = 'bugs';
};
document.getElementById('sea').onclick = () => {
    document.getElementById("svg").style.backgroundColor = "#027C75";
    document.getElementById("svg").style.fill = "#76C4BD";
    const sort = 'sea';
};
}
export default changeColor;