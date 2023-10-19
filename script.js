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

// Resto do seu código aqui...

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
        feedbackDiv.style.backgroundColor = '#ffffff';
        messageDiv.style.color = '#000000';
    } else {
        feedbackDiv.style.backgroundColor = '#f44336';
        messageDiv.style.color = '#000000';
    }
}

// Função para registrar um usuário
function register() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('registrationEmail').value;
    const password = document.getElementById('registrationPassword').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Registro bem-sucedido
            const user = userCredential.user;
            showMessage('Registro bem-sucedido. Você pode fazer login agora.', true);
            showLoginForm();

            // Aqui você pode armazenar o nome do usuário (primeiro e último) no banco de dados, se desejar.
            // Certifique-se de configurar um banco de dados Firebase para fazer isso.
        })
        .catch((error) => {
            // Lidar com erros de registro
            const errorCode = error.code;
            const errorMessage = error.message;
            showMessage('Erro de registro: ' + errorCode + ' - ' + errorMessage, false);
        });
}


// Função para fazer login
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberLogin = document.getElementById('rememberLogin').checked;

    firebase.auth().setPersistence(rememberLogin ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
            return firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .then((userCredential) => {
            const user = userCredential.user;
            showMessage('Login bem-sucedido. Bem-vindo, ' + user.email + '!', true);
            window.location.href = 'lista.html';
        })
        .catch((error) => {
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
            showMessage('E-mail de redefinição de senha enviado. Verifique sua caixa de entrada.', true);
        })
        .catch((error) => {
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

// Função para fazer login com o Google
function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then((userCredential) => {
            const user = userCredential.user;
            showMessage('Login com o Google bem-sucedido. Bem-vindo, ' + user.displayName + '!', true);
            window.location.href = 'lista.html'; // Redirecione o usuário ou execute outras ações necessárias.
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            showMessage('Erro ao fazer login com o Google: ' + errorCode + ' - ' + errorMessage, false);
        });
}
