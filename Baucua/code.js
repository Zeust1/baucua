const images = 
    [
    "./img/bau.png",
    "./img/cua.png",
    "./img/tom.png",
    "./img/ca.png",
    "./img/huou.png",
    "./img/ga.png"
    ]


const roll = document.getElementById("roll")
const header1 = document.getElementById("header-1")
const header2 = document.getElementById("header-2")
const header3 = document.getElementById("header-3")
const reset = document.getElementById("reset")
const imgs = document.querySelectorAll('#main img');
let resultPoint = []





// đặt điểm
let point = 0
let sumPoint = []
function setPoints (id) {
    const pointElementId = `${id.toString()}Point`;
    if(point < 3) {
        if(document.getElementById(pointElementId).textContent !== 0){
            let input = pointElementId.slice(0, pointElementId.length - 5)
            document.getElementById(pointElementId).innerText = +document.getElementById(pointElementId).textContent + 1
            point+=1
            sumPoint.push(input)
        }else {
            document.getElementById(pointElementId).innerText = 1
        }

    }else {
        console.log("Không đủ điểm cược")
    }

}






roll.addEventListener("click", onRoll)

function onRoll (){
resultPoint = []
let count = 0;
const interval = setInterval(() => {
    
    header1.setAttribute("src", images[Math.floor(Math.random() * 6)])
    header2.setAttribute("src", images[Math.floor(Math.random() * 6)])
    header3.setAttribute("src", images[Math.floor(Math.random() * 6)])
    count++;
    reset.disabled = true
    roll.disabled = true
    imgs.forEach(element => document.getElementById(element.id).removeAttribute("onclick"))
    // -------------------------------------------------------------------------------------------

    // check point cược

    if (count >= 100) {
        clearInterval(interval);
        roll.disabled = false
        reset.disabled = false
        imgs.forEach(element => document.getElementById(element.id).setAttribute("onclick", "setPoints(this.id)"))
        let box1 = header1.src.split("/")[4].split(".")[0]
        let box2 = header2.src.split("/")[4].split(".")[0]
        let box3 = header3.src.split("/")[4].split(".")[0]
        resultPoint.push(box1, box2, box3)
        // checkPoint (box1, box2, box3)
        checkPoint(sumPoint, resultPoint)
    }
}, 10);
}











// reset điểm cược
function resetBtn ()  {
    const main = document.querySelector(".main")
    const div = main.querySelectorAll("div")
    point = 0
    div.forEach((element) => {
        element.firstChild.innerText = 0
    })
    sumPoint = []
}





function checkPoint (arr1, arr2) {

    const sortArr1 = arr1.slice().sort()
    const sortArr2 = arr2.slice().sort()
    if (sortArr1.length !== sortArr2.length) {
      return sortArr1.forEach(value => console.log("Bạn đã đoán sai với 1 " + value))
    }else {
        for (let i = 0; i < sortArr1.length; i++) {
            if (sortArr1[i] !== sortArr2[i]) {
                return sortArr1.forEach(value => console.log("Bạn đã đoán sai với 1 " + value))
            }
        }
    }
    return sortArr1.forEach(value => console.log("Bạn đã đoán đúng với 1 " + value))
}