const wrapper = document.getElementById('wrapper');
const wrapperI = document.getElementById('wrapper-info');

async function temp() {
    let pr = await fetch(`https://api.weatherapi.com/v1/current.json?key=6c1f86ac60b843448eb145323242312&q=Minsk`);
    let a = await pr.json();
    console.log(a)

    wrapperI.children[0].innerHTML = a.current.temp_c +'°C';
}
async function course() {
    let pr = await fetch('https://api.nbrb.by/exrates/currencies');
    let a = await pr.json();

    let usd = a[a.map(function(o) { return o.Cur_Abbreviation; }).lastIndexOf("USD")];
    let usd_pr = await fetch(`https://api.nbrb.by/exrates/rates/${usd.Cur_ID}`);
    let usd_byn = (await usd_pr.json()).Cur_OfficialRate;
    
    wrapperI.children[1].innerHTML=Math.floor(usd_byn*100)/100
}
function init() {temp(); course();}

document.addEventListener('DOMContentLoaded', () => init())