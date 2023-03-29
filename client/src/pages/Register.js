import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import StandardInput from '../components/form/StandardInput';
import useUserStore from '../store/user';

function Register() {
  const register = useUserStore((s) => s.register);
  const history = useHistory();
  const [user, setUser] = useState({});

  const handleChange = (id, value) => {
    setUser({ ...user, ...{ [id]: value } });
  };

  const handleSubmit = () => {
    if (user.password && user.passwordConfirm && (user.password === user.passwordConfirm)) {
      const { passwordConfirm, ...payload } = user;
      register(payload).then(() => history.push('/'));
    }
  };

  return (
    <div className="card w-full max-w-sm place-self-center shadow-xl bg-neutral">
      <div className="card-body">
        <div className="card-title flex justify-center gap-0 text-2xl">
          <div className="text-primary font-bold">JS</div>
          Budget
        </div>
        <StandardInput id="firstName" type="text" placeholder="First" onChange={(input) => handleChange(input.target.id, input.target.value)} />
        <StandardInput id="lastName" type="text" placeholder="Last" onChange={(input) => handleChange(input.target.id, input.target.value)} />
        <StandardInput id="email" type="text" placeholder="Email Address" onChange={(input) => handleChange(input.target.id, input.target.value)} />
        <StandardInput id="password" type="password" placeholder="Password" onChange={(input) => handleChange(input.target.id, input.target.value)} />
        <StandardInput id="passwordConfirm" type="password" placeholder="Confirm Password" onChange={(input) => handleChange(input.target.id, input.target.value)} />
        <div className="flex justify-between">
          <div className="text-xs justify-center">
            {'Already have an account? '}
            <a href="./login" className="label-text-alt link link-hover text-accent">Login</a>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Register</button>
      </div>
    </div>
  );
}

export default Register;
