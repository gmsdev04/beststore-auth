var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const funcs = {
  registerUser(usuario) {
    
    return new Promise((resolve, reject) => {
      var poolData = {
        UserPoolId: process.env.VUE_APP_AWS_COGNITO_USER_POOL_ID,
        ClientId: process.env.VUE_APP_AWS_COGNITO_USER_POOL_CLIENT_ID,
      };
    
      var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
      var attributeList = [];
      
      var dataNome = {
        Name: 'custom:nome',
        Value: usuario.nome,
      }

      var dataSobrenome = {
        Name: 'custom:sobrenome',
        Value: usuario.sobrenome,
      }

      var dataEmail = {
        Name: 'email',
        Value: usuario.email,
      };
    
      var attributeNome = new AmazonCognitoIdentity.CognitoUserAttribute(dataNome);
      var attributeSobrenome = new AmazonCognitoIdentity.CognitoUserAttribute(dataSobrenome);
      var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
      
      attributeList.push(attributeNome);
      attributeList.push(attributeSobrenome);
      attributeList.push(attributeEmail);
        
      userPool.signUp(usuario.email, usuario.senha, attributeList, null, function (
        err,
        result
      ) {
        if (err) {
          reject(err);
        }
        resolve(result);  
      });
    });
  },
  confirmEmail(usuario, codigoConfirmacao){

    return new Promise((resolve, reject) => {
      var poolData = {
        UserPoolId: process.env.VUE_APP_AWS_COGNITO_USER_POOL_ID,
        ClientId: process.env.VUE_APP_AWS_COGNITO_USER_POOL_CLIENT_ID,
      };
      
      var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
      var userData = {
        Username: usuario.email,
        Pool: userPool,
      };
      
      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      cognitoUser.confirmRegistration(codigoConfirmacao, true, function(err, result) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }
}

export default funcs