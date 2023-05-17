import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../../config/firebase-config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: username });
            const response = await axios.post('http://localhost:5000/users', {
                id: user.uid,
                username: username,
            });
            console.log('User created', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error signing up', error);
        }
    };

    return (
        <div className='Signup'>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type='submit'>Sign Up</button>
                <Link to='/'>Already have an account? Log in</Link>
            </form>
        </div>
    );
};

export default Signup;
