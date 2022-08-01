import React, { useState } from 'react';
import StandardInput from '../components/form/StandardInput';
import { useUserActions } from '../contexts/UserContext';

function Register() {
  const { register } = useUserActions();
  const [user, setUser] = useState({});

  const handleChange = (id, value) => {
    setUser({ ...user, ...{ [id]: value } });
  };

  const handleSubmit = () => {
    if (user.password && user.passwordConfirm && (user.password === user.passwordConfirm)) {
      const { passwordConfirm, ...payload } = user;
      register(payload);
    }
  };

  return (
    <div className="card w-full max-w-sm place-self-center shadow-xl bg-neutral">
      <div className="card-body">
        <StandardInput id="first" type="text" placeholder="First" onChange={(input) => handleChange(input.target.id, input.target.value)} />
        <StandardInput id="last" type="text" placeholder="Last" onChange={(input) => handleChange(input.target.id, input.target.value)} />
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
