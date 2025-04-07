const switchB = document.querySelector("#switch");
const inputsL = document.getElementsByClassName("input");
const hrs = document.getElementsByClassName("hrs")
const hrt = document.getElementsByClassName("hr_t")

switchB.addEventListener("click", ev => colSw())


function colSw(bl) {
    if(switchB.checked || bl) {
        switchB.checked=true;
        isBlack=true;
        document.body.style.backgroundColor = "#333333";
        backward.style.backgroundColor="#333333"
        forward.style.backgroundColor="#333333"
        filter.style.backgroundColor="#aaaaaa"
        filter.classList.add("filter-color-change");
        document.body.classList.add("text-color-change");
        [...inputsL].forEach(element => {
            element.style.backgroundColor="#383838"
        });
        [...hrs].forEach(element => {
            element.style.backgroundColor="#222222"
        });
        [...hrt].forEach(element => {
            element.style.backgroundColor="#111111"
        });
    }
    else {
        isBlack=false;
        document.body.style.backgroundColor = "white";
        backward.style.backgroundColor="#f0f0f0"
        forward.style.backgroundColor="#f0f0f0"
        filter.style.backgroundColor="white"
        filter.classList.remove("filter-color-change");
        document.body.classList.remove("text-color-change");
        [...inputsL].forEach(element => {
            element.style.backgroundColor="white"
        });
        [...hrs].forEach(element => {
            element.style.backgroundColor="#d8c7c7"
        });
        [...hrt].forEach(element => {
            element.style.backgroundColor="#a79696"
        });
    }
}
