import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button, Navbar, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { Badge } from 'react-bootstrap';
import { useCart,useDispatch } from './contextreducer';
const NavbarComp = () => {
    let data=useCart()
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate('/login')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-2 bg-white rounded p-2" style={{ color: 'green' }} href="#">FoodZilla</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("token"))?
                            <li className="nav-item">
                            <Link className="nav-link active fs-5" aria-current="page" to="/">Myorders</Link>
                        </li>:""}
                        </ul>
                    </div>
                    
                        {(!localStorage.getItem("token"))?
                        <div className='d-flex '>
                        <Link className='btn bg-white text-success mx-1' to="/login">Login</Link>
                        <Link className='btn bg-white text-success mx-1' to="/createuser">SignUp</Link>
                        </div>
                    :
                    <div className='d-flex '>
                    <div className='btn bg-white text-success mx-1'>
                        <Link to="/cart" style={{textDecoration:"none"}}>mycart{" "}</Link>
                        <Badge pill bg='danger'>{data.length}</Badge>
                    </div>
                    <div>
                        <Link className='btn bg-white text-danger mx-1' onClick={handleLogout}>LogOut</Link>
                    </div>
                    </div>
                    }
                </div>
            </nav>
        </div>
    );
}

export default NavbarComp;
