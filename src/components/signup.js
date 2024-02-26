import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Signup = () => {
    const [credential, setcredentaial] = useState({ name: "", email: "", password: "", geolocation: "" })
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/api/v1/createuser", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password, location: credential.geolocation })
            });
    
            // Await response.json()
            const json = await response.json();
            console.log(json);
    
            if (!json.success) {
                alert("Enter valid credentials");
            }
        } catch (error) {
            console.error('Error occurred:', error);
            alert("An error occurred while processing your request.");
        }
    };
    const onchange = (e) => {
        setcredentaial({
            ...credential,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <Container>
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credential.name} onChange={onchange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credential.email} onChange={onchange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credential.password} onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Address</label>
                        <input type="text" className="form-control"  name="geolocation" value={credential.geolocation} onChange={onchange} />
                    </div>
                    
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
                </form>
            </Container>
        </>
    );
}
export default Signup;