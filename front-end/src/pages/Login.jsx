import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { userLogin } from '../utils/fetchApi';

const ROUTE = 'common_login';
const ELEMENT = 'element-invalid-email';

function Login() {
  const { setUserData } = useContext(AppContext);
  const [input, setInput] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState({ isError: false, message: '' });

  const history = useHistory();

  const onChangeHandler = ({ target }) => {
    setInput({
      ...input,
      [target.name]: target.value,
    });
  };

  const validateInputs = () => {
    const { email, password } = input;
    let disabled = true;
    const PASSWORD_LENGTH = 6;
    const validator = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const inputValidations = [
      email.length > 0,
      password.length >= PASSWORD_LENGTH,
      validator.test(email),
    ];
    if (inputValidations.every((validation) => validation === true)) {
      disabled = false;
    }
    return disabled;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = input;

    const result = await userLogin({ email, password });
    if (result.message) {
      setErrorMessage({ isError: true, message: 'Usuário e/ou senha incorretos' });
    } else {
      const { name, role } = result.user;
      setErrorMessage({ isError: false, message: '' });
      setUserData({
        name,
        email,
        role,
        token: result.token,
      });
      history.push('/customer/products');
    }
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        { errorMessage.isError
        && (
          <p data-testid={ `${ROUTE}__${ELEMENT}` }>{ errorMessage.message }</p>
        )}
        <label htmlFor="email">
          Email:
          <input
            data-testid="common_login__input-email"
            type="text"
            id="email"
            name="email"
            value={ input.email }
            onChange={ onChangeHandler }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            data-testid="common_login__input-password"
            type="text"
            id="password"
            name="password"
            value={ input.password }
            onChange={ onChangeHandler }
          />
        </label>
        <button
          data-testid="common_login__button-login"
          type="submit"
          disabled={ validateInputs() }
        >
          Login
        </button>
        <button
          data-testid="common_login__button-register"
          type="button"
          onClick={ () => history.push('/register') }
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Login;
