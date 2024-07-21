document.addEventListener("click",validate(submit))
function validate(){
    let input_weight = document.getElementById("weight");
    let input_height = document.getElementById("height");
    let input_bloodPressure = document.getElementById("blood-pressure");
    let input_bloodSugar = document.getElementById("blood-sugar");
    let input_cholesterol= document.getElementById("cholesterol");
    let input_gout = document.getElementById("gout");

    if(input_weight.value==""||input_height.value==""||input_bloodPressure.value==""||input_bloodSugar.value==""||input_cholesterol.value===""||input_gout.value===""){
        alert("All fields must not be empty!");
        return false;
    }
    return true;
}

function isNum(element){
    for (let i = 0; i < element.length; i++) {
        if (element[i] < '0' || element[i] > '9') { // ASCII codes for '0' (48) to '9' (57)
            return false;
        }
    }
    return true;
}

validate();