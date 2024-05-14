import AWS from 'aws-sdk'
import {AWS_ACCESS_KEY,AWS_COGNITO_POOL_CLIENT_ID,AWS_COGNITO_POOL_ID,AWS_REGION,AWS_SECRET_ACCESS_KEY } from '../secrets'
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username= document.getElementById('username').value, password= document.getElementById('password').value;
    AWS.config.update({
        region: AWS_REGION,
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    });

    const cognitoIdentity = new AWS.CognitoIdentityServiceProvider();

    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId:AWS_COGNITO_POOL_CLIENT_ID,
    
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password
        }
      };
      
      
    try {
    // Inicia sesión en Cognito
        cognitoIdentity.initiateAuth(params, (err, data) => {
            if (err) {
            console.error('Error al iniciar sesión en Cognito:', err);
            } else {
            console.log('Sesión iniciada en Cognito:', data);
            localStorage.setItem('CognitoSession', data.Session)
            window.location ='index.html'
            }
        });
    } catch (error) {
        console.error('Error al registrar:', error);
        // Muestra un mensaje de error al usuario
    }
})

document.getElementById('logout').addEventListener('click', async () => {
    // Cerrar sesión en Cognito
    const cognitoIdentity = new AWS.CognitoIdentityServiceProvider();
    const params = {
        ClientId: AWS_COGNITO_POOL_CLIENT_ID
    };
    try {
        await cognitoIdentity.globalSignOut(params).promise();
        console.log('Usuario desconectado de Cognito');
    } catch (error) {
        console.error('Error al cerrar sesión en Cognito:', error);
        // Manejar errores según sea necesario
    }

    // Eliminar tokens almacenados
    if (localStorage.getItem('CognitoSession') !== null) {
        localStorage.removeItem('CognitoSession');
        console.log('Elemento eliminado correctamente del localStorage');
    } else {
        console.log('La clave "CognitoSession" no está presente en el localStorage');
    }
    
    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = '/login'; // Cambia '/login' por la ruta de tu página de inicio de sesión
});
  
  


