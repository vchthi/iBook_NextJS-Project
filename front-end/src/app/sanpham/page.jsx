// export const metadata = {
//   title: "Sản phẩm",
//   description:
//     "iBook is a book shop that provides you with quality books that help boost your productivity and mood. Having a physical book is great. There is no doubt that you will enjoy these books more than others you have ever tasted.",
// };
"use client";
import React, { useState, useEffect } from "react";
import "../globals.css";
import ProductCard from "../components/ProductCard";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://localhost:3000/categories");
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      let res;
      if (categoryId) {
        res = await fetch(
          `http://localhost:3000/products/category/${categoryId}`
        );
      } else {
        res = await fetch("http://localhost:3000/products");
      }

      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, [categoryId]);

  const categoryClick = (categoryId) => {
    setCategoryId(categoryId);
  };


  // -*************************************************
  const [sortOption, setSortOption] = useState("asc");

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("http://localhost:3000/products");
      const newProducts = await res.json();
      setProducts(newProducts);
    }
    fetchProducts();
  }, []);

  const handleSort = (products) => {
    return [...products].sort((a, b) => {
      if (sortOption === "asc") {
        return a.price_2 - b.price_2;
      } else {
        return b.price_2 - a.price_2;
      }
    });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="container-product">
      <div className="bor-left-product">
        <div className="col-left-product">
          <ul>
            <li>
              <a style={{ textDecoration: "none" }}>
                <button className="manager-button-product">
                  <strong style={{ fontFamily: "Playfair Display" }}>
                    DANH MỤC SẢN PHẨM
                  </strong>
                </button>
              </a>
            </li>
            <br />
            <li>
              <a
                onClick={() => categoryClick(null)}
                style={{ textDecoration: "none" }}
                href="#"
              >
                <button className="category-button">
                  <i
                    style={{ marginRight: "10px", color: "#3577F0" }}
                    className="fa-solid fa-list"
                  ></i>
                  Tất cả sản phẩm
                </button>
              </a>
            </li>
            {categories.map((category) => (
              <li key={category._id}>
                <a
                  onClick={() => categoryClick(category._id)}
                  style={{ textDecoration: "none" }}
                >
                  <button className="category-button">
                    <i
                      style={{ marginRight: "10px", color: "#3577F0" }}
                      className="fa-solid fa-list"
                    ></i>
                    {category.name}
                  </button>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bor-right-product">
        <div className="col-right">
    
          <select id="select-product-page" onChange={handleSortChange}>
            <option value="asc">Giá tăng dần</option>
            <option value="desc">Giá giảm dần</option>
          </select>
        
          <div className="content-3-product">
            <div className="box-product">
              {/* {products.map((product) => (
                <div className="box1-product mr1" key={product._id}>
                  <a href="#" style={{ textDecoration: "none" }}>
                    <img
                      src={`${product.image}`}
                    />
                    <h4>{product.name}</h4>
                    <p>
                      <del>{product.price_1}</del>
                    </p>
                    <h5>{product.price_2}</h5>
                    <button
                      className="btn-product"
                      style={{ margin: "auto", marginTop: "20px" }}
                    >
                      Order Now
                    </button>
                  </a>
                </div>
              ))} */}
              <ProductCard data={handleSort(products)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
