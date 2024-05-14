import backendConfig from "../src/amplifyconfiguration.json"
import AWS from 'aws-sdk'


document.getElementById('register-form').addEventListener('submit', async (e) => {
        
    const username= document.getElementById('username').value, email= document.getElementById('email').value, password= document.getElementById('password').value;
    e.preventDefault();
    AWS.config.update({
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    const cognitoIdentity = new AWS.CognitoIdentityServiceProvider();

    const params = {
        ClientId: process.env.AWS_COGNITO_POOL_CLIENT_ID,
        Password: password,
        Username: username,
        UserAttributes: [
          {
            Name: 'email',
            Value: email
          }
        
        ]
      };
    try {
        cognitoIdentity.signUp(params, (err, data) => {
            if (err) {
              console.error('Error al registrar usuario en Cognito:', err);
            } else {
              console.log('Usuario registrado en Cognito:', data);
            }
          });
        console.log('Usuario registrado:', user);
    } catch (error) {
        console.error('Error al registrar:', error);
        // Muestra un mensaje de error al usuario
    }
})


  
  

