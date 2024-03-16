import { useState } from "react";
import { useSignup } from "../Hooks/useSignup";

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const { signup, isLoading, error } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(name, email, phone, gender, password);
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <label>Name</label>
            <input
                type='text'
                onChange={(eventObject) => setName(eventObject.target.value)}
                value={name}
            />

            <label>Email</label>
            <input
                type='email'
                onChange={(eventObject) => setEmail(eventObject.target.value)}
                value={email}
            />

            <label>Phone Number</label>
            <input
                type='number'
                onChange={(eventObject) => setPhone(eventObject.target.value)}
                value={phone}
            />

            <label>Gender</label>
            <input
                type='text'
                onChange={(eventObject) => setGender(eventObject.target.value)}
                value={gender}
            />

            <label>Password</label>
            <input
                type='password'
                onChange={(eventObject) => setPassword(eventObject.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default Signup;