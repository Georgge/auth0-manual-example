import auth0 from 'auth0-js';

// OJO: configurar lo de abajo

const webAuth = new auth0.WebAuth({
  domain: process.env.REACT_APP_DOMAIN,
  clientID: process.env.REACT_APP_CLIENTID,
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
  const localUser = localStorage.getItem('user');

  webAuth.parseHash((error, result = {}) => {
    if (result) {
      const { idTokenPayload } = result;
      console.log(idTokenPayload);

      setState(idTokenPayload);

      localStorage.setItem('user', JSON.stringify(idTokenPayload));
    } 

    if (localUser) {
      setState(JSON.parse(localUser));
    }
    console.log('Oops!', error);
  });
};

const logOut = (setState) => {
  webAuth.logout({
    returnTo: 'http://localhost:3000/',
    client_id: process.env.REACT_APP_CLIENTID,
  })

  localStorage.removeItem('user');
  setState({
    name: '',
    picture: '',
    password_error: false,
  })
}
export {
  login,
  signUp,
  handleAutentication,
  logOut,
}