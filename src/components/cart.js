import React from "react";
import { useCart, useDispatch } from "./contextreducer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
const Cart = () => {
    let data = useCart();
    let dispatch = useDispatch();
    if (data.length === 0) {
        return (
            <div>
                <div className="m-5 w-100 text-center fs-3">The Cart is Empty</div>
            </div>
        );
    }
    let totalprice = data.reduce((total, food) => total + food.price, 0);
    return (
        <div>
            <div className="fs-1 text-success" style={{borderBottom:"2px solid white"}}>My-Cart</div>
            <Container>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col" className="text-success text-center">#</th>
                        <th scope="col" className="text-success text-center">Name</th>
                        <th scope="col" className="text-success text-center">Quantity</th>
                        <th scope="col" className="text-success text-center">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => {
                            return (
                                <tr>
                                    <th scope="row" className="text-white text-center">{index + 1}</th>
                                    <td className="text-white text-center">{item.name}</td>
                                    <td className="text-white text-center">{item.qty}</td>
                                    <td className="text-white text-center">{item.price}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="d-flex justify-content-end">
                <h3>Total={' '}₹{totalprice}</h3>
            </div>
            </Container>
        </div>
    );
}
export default Cart;