// const colors = ['#9000ff', '#205523', '#ce5515', '#661717', '#181152',
    // '#81428b', '#255190', '#22A699', '#F2BE22', '#F29727', '#F24C3D'];
const colors = ["#f5e0dc","#f2cdcd","#f5c2e7","#cba6f7","#f38ba8","#eba0ac","#fab387","#f9e2af","#a6e3a1","#94e2d5","#89dceb","#74c7ec","#89b4fa","#b4befe"]
function shortNameToColor(shortName) {
    let sum = 0;

    if (shortName) {
        for (let i = 0; i < shortName.length; i++) {
            sum += shortName.charCodeAt(i);
        }
    }
    
    return colors[sum % colors.length];
}

module.exports = {
    shortNameToColor
};