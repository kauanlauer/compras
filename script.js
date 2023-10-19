// Inicialize o Firebase com as configurações do seu projeto
const firebaseConfig = {
    apiKey: "AIzaSyCmPWE7wjKuL-iH_Plq4Dn5Va5z-xjGSxU",
    authDomain: "compras-db75b.firebaseapp.com",
    databaseURL: "https://compras-db75b-default-rtdb.firebaseio.com",
    projectId: "compras-db75b",
    storageBucket: "compras-db75b.appspot.com",
    messagingSenderId: "349408434820",
    appId: "1:349408434820:web:c105e1d21dc053f5bec0d1"
  };

firebase.initializeApp(firebaseConfig);

// Função para mostrar o formulário de registro
function showRegistrationForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registrationForm').style.display = 'block';
}

// Função para mostrar o formulário de login
function showLoginForm() {
    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

// Função para exibir mensagens de feedback
function showMessage(message, success) {
    const feedbackDiv = document.getElementById('feedback');
    const messageDiv = document.getElementById('message');

    messageDiv.textContent = message;
    feedbackDiv.style.display = 'block';
    
    if (success) {
        feedbackDiv.style.backgroundColor = '#ffffff'; // Fundo branco para mensagens de sucesso
        messageDiv.style.color = '#000000'; // Texto preto para mensagens de sucesso
    } else {
        feedbackDiv.style.backgroundColor = '#f44336'; // Cor de fundo vermelho para mensagens de erro
        messageDiv.style.color = '#000000'; // Texto preto para mensagens de erro
    }
}


function register() {
    const email = document.getElementById('registrationEmail').value;
    const password = document.getElementById('registrationPassword').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Registro bem-sucedido
            const user = userCredential.user;
            showMessage('Registro bem-sucedido. Você pode fazer login agora.', true);
            showLoginForm();
        })
        .catch((error) => {
            // Lidar com erros de registro
            const errorCode = error.code;
            const errorMessage = error.message;
            showMessage('Erro de registro: ' + errorCode + ' - ' + errorMessage, false);
        });
}

function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberLogin = document.getElementById('rememberLogin').checked;

    firebase.auth().setPersistence(rememberLogin ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
            return firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .then((userCredential) => {
            // Login bem-sucedido
            const user = userCredential.user;
            showMessage('Login bem-sucedido. Bem-vindo, ' + user.email + '!', true);

            // Redirecionar o usuário para a página principal (substitua 'pagina-principal.html' pelo URL desejado)
            window.location.href = 'lista.html';
        })
        .catch((error) => {
            // Lidar com erros de login
            const errorCode = error.code;
            const errorMessage = errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found' ? 'Usuário ou senha errados' : error.message;
            showMessage('Erro de login: ' + errorMessage, false);
        });
}

// Função para redefinir a senha
function resetPassword() {
    const email = document.getElementById('resetPasswordEmail').value;

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            // E-mail de redefinição de senha enviado com sucesso
            showMessage('E-mail de redefinição de senha enviado. Verifique sua caixa de entrada.', true);
            // Você pode redirecionar o usuário para uma página de confirmação aqui
        })
        .catch((error) => {
            // Lidar com erros de redefinição de senha
            const errorCode = error.code;
            const errorMessage = error.message;
            showMessage('Erro ao enviar o e-mail de redefinição de senha: ' + errorCode + ' - ' + errorMessage, false);
        });
}

// Função para mostrar o formulário de redefinição de senha
function showResetPasswordForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('resetPasswordForm').style.display = 'block';
}

// Função para voltar ao formulário de login
function backToLoginForm() {
    document.getElementById('resetPasswordForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}
