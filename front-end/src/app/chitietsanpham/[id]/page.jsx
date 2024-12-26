"use client";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartslice";
import { useState } from "react";
import useSWR from 'swr';
import "../../globals.css";
import Link from "next/link";



const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Detail({ params }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  const {
    data: product,
    error,
    isLoading,
  } = useSWR(`http://localhost:3000/products/detail/${params.id}`, fetcher, {
    refreshInterval: 6000,
  });

  const { data: relatedproduct } = useSWR(
    `http://localhost:3000/products/related/${params.id}/related`,
    fetcher,
    {
      refreshInterval: 6000,
    }
  );
  if (error) return <div>Lỗi load dữ liệu.</div>;
  if (isLoading) return <div>Đang tải</div>;
  return (
    <div className="container">
      <div className="row-content" id="showDetail">
        <div className="row-left">
          <img src={`http://localhost:3000/images/${product.image}`} alt="" />
          <br />
        </div>
        <div className="row-right">
          <h3 id="name">{product.name}</h3>
          <div className="price">
            <del
              style={{
                color: "#ddd",
                fontSize: "25px",
                fontFamily: "Playfair Display",
              }}
              id="price_1"
            >
              {product.price_1}
            </del>
            <span
              style={{
                marginRight: "20px",
                fontSize: "30px",
                color: "rgb(178, 62, 62)",
                fontFamily: "Playfair Display",
              }}
              id="price_2"
            >
              {product.price_2}
            </span>
          </div>
          <p style={{ marginTop: "30px" }} id="mota_1">
            {product.mota_1}
          </p>
          <div className="quantity">
            <input
              className="number"
              type="number"
              min="1"
              max="100"
              
              value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>
          <button type="submit" className="btn-cart" onClick={() => dispatch(addToCart({ item: product, quantity: quantity }))}>
            Thêm vào giỏ
          </button>
          <p style={{ marginTop: "20px" }} id="mota_2">
            {product.mota_2}
          </p>
        </div>
      </div>
      <div className="content-3">
        <h3 style={{ fontSize: "40px" }}>Sản phẩm liên quan</h3>
        <br />
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Perspiciatis, eos.
        </p>
        <br />
        <div className="box" id="showLienQuan" style={{ marginBottom: "30px" }}>
          {relatedproduct ? (
            relatedproduct.map((product) => (
              <div className="box1-product mr1" key={product._id}>
              
                  <img src={`http://localhost:3000/images/${product.image}`} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p>
                    <del>{product.price_1}</del>
                  </p>
                  <h5>{product.price_2}</h5>
                  <Link
                  href={`/giohang`}
                  style={{ textDecoration: "none" }}
                ><button
                    className="btn-product"
                    style={{ margin: "auto", marginTop: "20px" }}
                  >
                    Order Now
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <div>Không có</div>
          )}
        </div>
      </div>
    </div>
  );
}
