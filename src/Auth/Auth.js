import auth0 from 'auth0-js';

// OJO: configurar lo de abajo

const webAuth = new auth0.WebAuth({
  domain: 'Aqui Tu Dominio',
  clientID: 'Aqui Tu ID de Cliente',
  responseType: 'token id_token',
  scope: 'openid profile',
  redirectUri: 'http://localhost:3000/', // cambiar la URI si es necesario
});

const login = ({ to }) => {
  // recibe le red social a invocar
  webAuth.authorize({
    connection: to,
  });
};

const signUp = ({ email, password, setState}) => {
  // Registro con email y password
  // ... tambien resive el metodo para setear el state
  webAuth.signup({
    connection: 'Username-Password-Authentication',
    email,
    password,
  }, (error, response) => {
    if (response) {
      const { email } = response;
      setState({
        name: email,
      });
    }
    console.log('Oops!', error);
  });
};

const handleAutentication = (setState) => {
  // Este metodo escucha la URL para recuperar los datos
  // ... se ejecuta en el effect
  webAuth.parseHash((error, result) => {
    if (result) {
      const { idTokenPayload } = result;

      setState({
        name: idTokenPayload.name,
        picture: idTokenPayload.picture,
      })
    }
    console.log('Oops!', error);
  });
};

export {
  login,
  signUp,
  handleAutentication,
}