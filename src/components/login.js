import { useState } from "react"
import React from "react"
import { Container } from "react-bootstrap";
import { Link,useNavigate} from "react-router-dom";
const Login = () => {
    const [credential, setCredential] = useState({ email: "", password: "" });
    let navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/api/v1/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credential.email, password: credential.password })
            });

            const json = await response.json();
            console.log(json);

            if (!response.ok) {
                throw new Error(json.message || "Login failed");
            }
            localStorage.setItem("token",json.token);
            console.log(localStorage.getItem("token"));
            navigate("/");
        } catch (error) {
            console.error('Error occurred:', error);
            alert(error.message || "An error occurred while processing your request.");
        }
    };

    const handleChange = (e) => {
        setCredential({
            ...credential,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credential.email} onChange={handleChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credential.password} onChange={handleChange} />
                </div>
                <button type="submit" className="m-3 btn btn-success">Submit</button>
                <Link to="/createuser" className="m-3 btn btn-danger">I am a new User</Link>
            </form>
        </Container>
    );
}

export default Login;