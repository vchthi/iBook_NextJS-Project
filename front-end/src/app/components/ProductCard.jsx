import React from "react";
import Link from "next/link";

function ProductCard(props) {
  return (
    <>
      {props.data.map((product) => {
        const { _id, name, image, price_1, price_2 } = product;
        return (
          <div className="box1-product mr1" key={_id}>
           <Link href={`/chitietsanpham/${_id}`}  style={{ textDecoration: "none" }}>

              <img src={`http://localhost:3000/images/${image}`}/>
              <h4>{name}</h4>
              <p>
                <del>{price_1}</del>
              </p>
              <h5>{price_2}</h5>
              <button
                className="btn-product"
                style={{ margin: "auto", marginTop: "20px" }}
              >
                Xem chi tiết
              </button>
            </Link>
          </div>
        );
      })}
    </>
  );
}

export default ProductCard;
