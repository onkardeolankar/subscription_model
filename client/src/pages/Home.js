import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PriceCard from "../components/cards/PriceCard";
import { UserContext } from "../context";

const Home = () => {
  const[state,setState] = useContext(UserContext);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const { data } = await axios.get("/prices");
    console.log("prices get request", data);
    setPrices(data);
  };

  const handleClick = async (e, price) => {
    e.preventDefault();
    console.log("plan clicked", price.id);
    if (state && state.token ){
      const {data} = await axios.post("/create-subsription",{
        priceId: price.id,
      });
      window.open(data);
    }
    else{
      Navigate("/register");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row col-md-6 offset-md-3 text-center">
        <h1 className="pt-5 fw-bold">
          Explore the right plan for your business
        </h1>
        <p className="lead pb-4">Choose a plan that suites you best!</p>
      </div>

      <div className="row pt-5 mb-3 text-center">
        {prices &&
          prices.map((price) => (
            <PriceCard key={price.id} price={price} handleSubscription={handleClick} />
          ))}
      </div>
    </div>
  );
};

export default Home;
