'use client'

import React from 'react';
import ProductCard from '../components/ProductCard';

import { useEffect, useState } from "react";

// export const metadata = {
//   title: "Sản phẩm",
//   description:
//     "iBook is a book shop that provides you with quality books that help boost your productivity and mood. Having a physical book is great. There is no doubt that you will enjoy these books more than others you have ever tasted.",
// };


export default async function search(params) {
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
  const { searchParams } = params;
  console.log(searchParams);

  const res = await fetch(`http://localhost:3000/products/search/${searchParams.name}`);
  const productSearch = await res.json();

  return (



<div className="container-product">
<div className="bor-left-product">
       
      </div>

      <div className="bor-right-product">
        <div className="col-right">
          
          <div className="content-3-product">
          <h3 id="result-search">Kết quả tìm kiếm cho từ khóa: {searchParams.name}</h3>
            <div className="box-product">
            <ProductCard data={productSearch} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
