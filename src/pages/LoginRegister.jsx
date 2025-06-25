import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../store/authSlice';
import FullPageLoader from '../components/FullPageLoader';
import {useNavigate} from 'react-router-dom';
import '../styles/LoginRegister.css'; 

function LoginRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector(state => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [localError, setLocalError] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(()=>{
    if(user){
      navigate('/');
    }
  }, [user, navigate]);
  

  const canSubmit = [form.email, form.password].every(Boolean) && status !== 'loading';

  const handleChange=e=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    setLocalError('');
    
    if(!isLogin && form.password !== form.confirmPassword){
        setLocalError('Passwords do not match');
        return;
    }

    if(isLogin){
        dispatch(login({ email:form.email,password: form.password }));
    }else{
        dispatch(register({ email:form.email, password:form.password }));
    }    
  };

  if (status === 'loading') return <FullPageLoader message='Please wait...'/>;
  return (
    <div className='auth-container'>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form className='auth-form' onSubmit={handleSubmit} >
            <div className='form-group'>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div className='form-group'>
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    min={6}
                    required
                />
            </div>
            {!isLogin && (
                <div className='form-group'>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        min={6}
                        required
                    />
                </div>
            )}

            {(localError || error) && (
                <p className="auth-error">{localError || error}</p>
                )}
            <button type="submit" disabled={!canSubmit}>
                {status === 'loading' 
                    ? 'Please wait...'
                    : isLogin
                    ? 'Login'
                    : 'Register'}
            </button>
        </form>
        <p className="toggle-auth" onClick={() => setIsLogin(prev => !prev)}>
            {isLogin
            ? "Don't have an account? Register"
            : 'Already have an account? Login'}
        </p>

    </div>
    
  );
}
export default LoginRegister;
