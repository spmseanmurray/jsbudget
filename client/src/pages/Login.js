import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import useUserStore from '../store/user';
import StandardInput from '../components/form/StandardInput';

function Login() {
  const login = useUserStore((s) => s.login);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="card w-full max-w-sm place-self-center shadow-xl bg-neutral">
      <div className="card-body">
        <div className="card-title flex justify-center gap-0 text-2xl">
          <div className="text-primary font-bold">JS</div>
          Budget
        </div>
        <StandardInput id="email" type="text" placeholder="Email Address" onChange={(input) => setEmail(input.target.value)} icon={faEnvelope} />
        <StandardInput id="password" type="password" placeholder="Password" onChange={(input) => setPassword(input.target.value)} icon={faLock} />
        <div className="flex justify-between">
          <div className="text-xs justify-center">
            {'Don\'t have an account? '}
            <a href="./register" className="label-text-alt link link-hover text-accent">Signup</a>
          </div>
          <a href="./reset" className="label-text-alt link link-hover text-accent">Forgot your password?</a>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => login({ email, password }).then(() => history.push('/'))}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
