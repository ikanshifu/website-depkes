document.addEventListener("click",validate(submit))
function validate(){
    let input_fname = document.getElementById("first_name");
    let input_lname = document.getElementById("last_name");
    let input_email = document.getElementById("email");
    let input_number = document.getElementById("phone");
    let input_username = document.getElementById("username");
    let input_password = document.getElementById("password");
    let input_cpassword = document.getElementById("cpassword");

    if(input_fname.value==""||input_lname.value==""||input_email.value==""||input_number.value==""||input_username.value===""||input_password.value===""||input_cpassword.value===""){
        alert("All fields must not be empty!");
        return false;
    }else if(!charOnly(input_fname.value)){
        alert("Your name should only contain characters!");
        return false;
    }else if(!charOnly(input_lname.value)){
        alert("Your name should only contain characters!");
        return false;
    }else if(!userOnly(input_username.value)){
        alert("Your username should only contain lowercase characters and no space!");
        return false;
    }else if(!input_email.value.endsWith(".com")||!validEmail(input_email.value)){
        alert("Please enter a valid email address!");
        return false;
    }else if(!isNum(input_number.value)){
        alert("Your phone number must only contain numbers!");
    }else if(!passCheck(input_password.value)){
        alert("Your password should contain numbers and no spaces!");
    }else if(input_cpassword.value!=input_password.value){
        alert("Please make sure that the passwords match!");
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

function validEmail(element){
    let mark = 0;
    for(let i = 0;i<element.length;i++){
        if(element[i]=='@'){
            mark = 1;
        }
    }
    if(mark==1){
        return true;
    }else{
        return false;
    }
}

function charOnly(element){
    for(let i = 0;i<element.length;i++){
        if(element[i]>='a'&&element[i]<='z'){
            continue;
        }else if(element[i]==' '){
            continue;
        }else if(element[i]>='A'&&element[i]<='Z'){
            continue;
        }else{
            return false;
        }
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