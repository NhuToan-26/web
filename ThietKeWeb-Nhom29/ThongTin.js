function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function findUser(email, password) {
    const users = getUsers();
    return users.find(u => u.email === email && u.password === password);
}

function login(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const user = findUser(email, password);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateNavbar();
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide();
    } else {
        alert('Email hoặc mật khẩu không đúng.');
    }
    return false;
}

function register(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const users = getUsers();

    if (users.some(u => u.email === email)) {
        alert('Email đã tồn tại.');
        return false;
    }

    const user = { name, email, password };
    saveUser(user);
    alert('Đăng ký thành công! Hãy đăng nhập.');
    showLoginForm();
    return false;
}

function logout() {
    localStorage.removeItem('currentUser');
    updateNavbar();
}

function updateNavbar() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginLink = document.getElementById('loginLink');
    const logoutLink = document.getElementById('logoutLink');
    const userDisplay = document.getElementById('userDisplay');

    if (currentUser) {
        userDisplay.textContent = `Xin chào, ${currentUser.name}`;
        userDisplay.classList.remove('d-none');
        loginLink.classList.add('d-none');
        logoutLink.classList.remove('d-none');
    } else {
        userDisplay.classList.add('d-none');
        loginLink.classList.remove('d-none');
        logoutLink.classList.add('d-none');
    }
}

function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

window.onload = function () {
    updateNavbar();
    document.getElementById('showRegister').onclick = showRegisterForm;
    document.getElementById('showLogin').onclick = showLoginForm;
};
