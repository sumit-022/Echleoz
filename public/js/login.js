const check = document.getElementById('checkbox');
const password = document.getElementById('password')
check.addEventListener('click', () => {
    if (check.checked == true) {
        password.setAttribute('type', 'text')
    }
    else{
        password.setAttribute('type', 'password');
    }
})