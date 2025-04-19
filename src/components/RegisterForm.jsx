import { useUser } from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';

const RegisterForm = () => {
    const { postUser } = useUser();

    const initValues = {
        username: '',
        password: '',
        email: '',
    };

    const doRegister = async () => {
        try {
            const result = await postUser(inputs); // Call postUser with form data
            console.log('Registration successful:', result);
        } catch (error) {
            console.error('Registration failed:', error.message); // Handle errors
        }
    };

    const { inputs, handleInputChange, handleSubmit } = useForm(doRegister, initValues);

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="registeruser">Username</label>
                    <input
                        name="username"
                        type="text"
                        id="registeruser"
                        onChange={handleInputChange}
                        autoComplete="username"
                    />
                </div>
                <div>
                    <label htmlFor="registeremail">Email</label>
                    <input
                        name="email"
                        type="email"
                        id="registeremail"
                        onChange={handleInputChange}
                        autoComplete="email"
                    />
                </div>
                <div>
                    <label htmlFor="registerpassword">Password</label>
                    <input
                        name="password"
                        type="password"
                        id="registerpassword"
                        onChange={handleInputChange}
                        autoComplete="new-password"
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </>
    );
};

export default RegisterForm;