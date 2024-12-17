function togglePasswordVisibility(){
    const passwordInput = document.getElementById("password");
    const passwordType = passwordInput.getAttribute("type");
    if(passwordType === 'password'){
        passwordInput.getAttribute('type','text');
    }else{
        passwordInput.getAttribute('type','password');
    }
}
