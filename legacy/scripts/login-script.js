document.addEventListener("click",validate(submit))
function validate(){
    let input_email = document.getElementById("email");
    let input_username = document.getElementById("username");
    let input_password = document.getElementById("password");

    if(input_username.value==""||input_password.value===""){
        alert("Please fill out all the fields");
        return false;
    }else if(!userOnly(input_username.value)){
        alert("Your username should only contain lowercase characters and no space!");
        return false;
    }else if(!passCheck(input_password.value)){
        alert("Your password should contain numbers and no spaces!");
    }
    return true;
}

function userOnly(element){
    for(let i = 0;i<element.length;i++){
        if(element[i]>='a'&&element[i]<='z'){
            continue;
        }else if(element[i]>=0&&element[i]<=9){
            continue;
        }else if(element[i]==' '){
            return false;
        }else{
            return false;
        }
    }
    return true;
}

function passCheck(element){
    for(let i = 0;i<element.length;i++){
        if(element[i]>='a'&&element[i]<='z'){
            continue;
        }else if(element[i]>='A'&&element[i]<='Z'){
            continue;
        }else if(element[i]==' '){
            return false;
        }else{
            return false;
        }
    }
    return true;
}

validate();