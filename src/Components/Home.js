import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState();
  const [minPrice, setMin] = useState();
  const [maxPrice, setMax] = useState();
  const [check, setCheck] = useState(false);
  const [count, setCount] = useState(0);
  const [price,TotalPrice] = useState(0);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((r) => {
        setData(r.products);
        setFilteredData(r.products);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function Search() {
    if (!name.trim()) {
      toast.error("This field cannot be empty");
      return;
    }

    const newData = data.filter((product) =>
      product.title.toLowerCase().includes(name.toLowerCase())
    );

    setFilteredData(newData);
    setCheck(true);

    if (newData.length === 0) {
      toast.error("No such product");
    }
  }

  function Price() {
    if (!minPrice || !maxPrice) {
      toast.error("The fields cannot be empty");
      return 0;
    } else if (minPrice === maxPrice) {
      toast.error("Both values cannot be same");
      return 0;
    }

    const newFilterData = data.filter((product) => {
      const productPrice = parseFloat(product.price);
      return (
        productPrice >= parseFloat(minPrice) &&
        productPrice <= parseFloat(maxPrice)
      );
    });

    setFilteredData(newFilterData);
    setCheck(true);

    if (newFilterData.length === 0) {
      toast.error("Not Found");
    }
  }

  function back() {
    if (setCheck) {
      setFilteredData(data);
      setCheck(false);
    } else {
      nav("/home");
    }
  }

  function Buy(money) {
     TotalPrice(premoney=>money+premoney)
  }
  // function Proceed(id) 
  // {
  //   nav(`/addToCart/${id}`)
  // }
  return (
    <div className="main">
      <h1>Welcome to the home page</h1>

      {(check || name || minPrice || maxPrice) && (
        <button onClick={back}>Back</button>
      )}

      <div className="search">
        <input
          type="text"
          placeholder="Search Product"
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={Search}>Search</button>
        <ToastContainer />
        <img className="cart" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWJW5iKzjpt3BRaI6-PAUF42oiFTraC_0Q3w&usqp=CAU"></img>
        <span className="cartC">Count : {count} Total: {price}</span>
      </div>
      <div className="priceFilter">
        <input
          type="number"
          placeholder="Enter Minimum price"
          onChange={(e) => setMin(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Maximum price"
          onChange={(e) => setMax(e.target.value)}
        />
        <button onClick={Price}>Filter</button>
      </div>

      {filteredData.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Rating</th>
              <th>Stock</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Thumbnail</th>
              <th>Images</th>
              <th>Buy</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.discountPercentage}</td>
                <td>{product.rating}</td>
                <td>{product.stock}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{ maxWidth: "50px", maxHeight: "50px" }}
                  />
                </td>
                <td>
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Image ${index + 1}`}
                      style={{
                        maxWidth: "50px",
                        maxHeight: "50px",
                        marginRight: "5px",
                      }}
                    />
                  ))}
                </td>
                <td>
                  <button onClick={() => {
                    setCount(prevCount => prevCount + 1);
                    Buy(product.price);
                    
                  }}>
                    Add To Cart
                  </button>
              </td>
              </tr>
            ))}
        </tbody>
        </table>
  ) : (
    <p>Loading...</p>
  )
}
    </div >
  );
}

export default Home;
