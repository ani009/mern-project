import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './card';
import { Container } from "react-bootstrap";

const Body = () => {
    const [foodcat, setFoodcat] = useState([]);
    const [fooditem, setFooditem] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");

    const loadData = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/v1/fooddata", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();
            setFooditem(data[0]);
            setFoodcat(data[1]);
            setIsLoading(false);
        } catch (error) {
            console.error('Error loading data:', error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <div id="carouselExampleControls" className="carousel slide mt-4" data-bs-ride="carousel" style={{ objectFit: "cover !important" }}>
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption" style={{ zIndex: "1" }}>
                        <div class="d-flex">
                            <input class="form-control me-2 bg-white" style={{color:"black"}} type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900×700/?burger" style={{ filter: "brightness(30%" }} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×700/?icecream" style={{ filter: "brightness(30%" }} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×700/?chicken" style={{ filter: "brightness(30%" }} className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <Container>
                <div className="container m-3">
                    {isLoading && <div>Loading...</div>}
                    {!isLoading && foodcat.map((category) => (
                        <div className="container" key={category._id}>
                            <div className="fs-2 m-3">{category.CategoryName}</div>
                            <hr />
                            <div className="row row-cols-md-3 row-cols-2 d-flex">
                                {fooditem
                                    .filter((item) => (item.CategoryName === category.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                    .map((filteredItem) => {
                                        return(
                                        <div className="" key={filteredItem._id}>
                                            <Card fooditem={filteredItem} options={filteredItem.options[0]} />
                                        </div>
                                    )})}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </>
    );
}

export default Body;
