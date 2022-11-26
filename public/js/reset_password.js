const verifyPassword = () => {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const SubmitButton = document.getElementById('submitBtn');
    const error = document.getElementById('error');
    SubmitButton.disabled = true;
    error.hidden = false;
    if (password == "" || confirmPassword == "") {
        error.innerHTML = "Please fill all the fields";
        return;
    } else if (password != confirmPassword) {
        error.innerHTML = "Password does not match";
        return;
    } else if( password.length < 8) {
        error.innerHTML = "Password must be at least 8 characters";
        return;
    }
    error.innerHTML = "";
    error.hidden = true;
    SubmitButton.disabled = false;
    const submitForm = document.getElementById('submitForm');
    console.log(submitForm);
    submitForm.submit();
}

const resetError = () => {
    const error = document.getElementById('error');
    error.innerHTML = "";
    error.hidden = true;
    const SubmitButton = document.getElementById('submitBtn');
    SubmitButton.disabled = false;
}
document.getElementById('password').addEventListener('keypress', resetError);
document.getElementById('confirmPassword').addEventListener('keypress', resetError);