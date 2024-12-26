'use client';
import Link from "next/link";
import "../globals.css";
import { useEffect, useState } from "react";

export default function Products() {
  const [data, setData] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/products", {
      cache: 'no-store'
    });
    const newData = await res.json();
    setData(newData);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
      });
      // const result = await res.json();
      // if (result.message) {
        fetchProducts(); 
      // }
    }
  };


  return (
    <div>
     
            <div className="nav-add-header">
              <h2 className="title-add-admin" style={{ float: "left", fontFamily: "Playfair Display", marginTop: "10px" }}>
                Quản lí sản phẩm
              </h2>
              <Link href="/themsanpham">
                <button className="add-pro">Thêm sản phẩm</button>
              </Link>
            </div>
       
            <table className="table" id="render">
              <thead className="header-admin">
                <tr>
                  <th>STT</th>
                  <th>Ảnh</th>
                  <th>Tên</th>
                  <th>Danh mục</th>
                  <th>Giá cũ</th>
                  <th>Giá mới</th>
                  <th>Mô tả</th>
                  <th>Thông tin</th>
                  <th style={{ width: "250px" }}>Thao tác</th>
                </tr>
              </thead>
              <tbody id="dulieu">
              {data.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td><img style={{ width: "70px", height: "100px" }} src={`http://localhost:3000/images/${product.image}`} alt="Product Image" /></td>
                    <td>{product.name}</td>
                    <td>{product.category.categoryName}</td>
                    <td>{product.price_1}</td>
                    <td>{product.price_2}</td>
                    <td style={{ textAlign: "justify" }}>{product.mota_1}</td>
                    <td style={{ textAlign: "justify" }}>{product.mota_2}</td>
                    <td>
                      <Link href={`/sanpham/capnhat/${product._id}`}>
                        <button className="edit-button">Chỉnh sửa</button>
                      </Link>
                      <button className="delete-button" onClick={() => deleteProduct(product._id)}>Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
       </div>
  );
}
