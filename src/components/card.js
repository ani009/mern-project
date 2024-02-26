import React, { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch,useCart } from "./contextreducer";
const Card=(props)=>{
    let dispatch=useDispatch();
    let data=useCart();
    let priceref=useRef();
    let choices=Object.keys(props.options);
    const[qty,setqty]= useState(1);
    const [size,setsize]=useState("");
    const handleaddtocart=async()=>{
        await dispatch({type:"ADD",id:props.fooditem._id,name:props.fooditem.name,price:finalprice,qty:qty,size:size})
        console.log(data);
    }
    let finalprice=qty*parseInt(props.options[size]);
    useEffect(()=>{
        setsize(priceref.current.value);
    })
    return (
        <div className="card-container mt-4">
            <div className="card-image">
                <img className="image" src={props.fooditem.img} alt="required"/>
            </div>
            <div className="card-details">
                <h4>{props.fooditem.name}</h4>

                <select className="bg-success rounded"onChange={(e)=>setqty(e.target.value)}>
                    {Array.from(Array(6), (e, i) => {
                        return (<option key={i + 1} value={i + 1}>{i + 1}</option>);
                    })}
                </select>
                <select className="m-2" ref={priceref} onChange={(e)=>setsize(e.target.value)}>
                    {choices.map((item)=>{
                        return <option key={item} value={item}>{item}</option>
                    })}
                </select>
                <div className="d-inline fs-md-4 finalprice">
                    ₹{finalprice}
                </div>
               
            </div>
            {/* <hr/> */}
            <div className="button">
                <button className="btn bg-success text-black"onClick={handleaddtocart}>Add to cart</button>
            </div>
        </div>
    );
}
export default Card;