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
      

      var dataEmail = {
        Name: 'email',
        Value: usuario.email,
      };
  
      var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
      
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
  },
  authenticate(login){
    return new Promise((resolve, reject) => {
      var authenticationData = {
        Username: login.email,
        Password: login.senha,
      };
      var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData
      );
      var poolData = {
        UserPoolId: process.env.VUE_APP_AWS_COGNITO_USER_POOL_ID,
        ClientId: process.env.VUE_APP_AWS_COGNITO_USER_POOL_CLIENT_ID,
        Storage: new AmazonCognitoIdentity.CookieStorage({secure: false, domain: "localhost"}),
      };

      var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

      var userData = {
        Username: login.email,
        Pool: userPool,
        Storage: new AmazonCognitoIdentity.CookieStorage({secure: false, domain: "localhost"}),
      };

      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
          //var accessToken = result.getAccessToken().getJwtToken();
          
          resolve(result);
        },
        onFailure: function(err) {
          reject(err);
        },
      });
    });
  }
}

export default funcs