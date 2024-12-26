'use client';
import Link from "next/link";
import "../globals.css";
import { useEffect, useState } from "react";

export default function Category() {

  const [data, setData] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/categories", {
      cache: 'no-store'
    });
    const newData = await res.json();
    setData(newData);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const  deleteCategory = async (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      const res = await fetch(`http://localhost:3000/categories/${id}`, {
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
                Quản lí danh mục
              </h2>
              <Link href="/themdanhmuc">
        
                  <button className="add-pro">Thêm danh mục</button>
     
              </Link>
            </div>
            <table className="table" id="render table-admin">
              <thead className="header-admin">
             
                <tr>
                  <th>STT</th>
                  <th>Tên</th>
                  <th>Mô tả</th>
                  <th style={{ width: "250px" }}>Thao tác</th>
                </tr>   
              </thead>
              <tbody id="dulieucate">
              {data.map((category, index) => (
                <tr key={category._id}>
                  <td>{index+1}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                  <Link href={`/danhmuc/capnhat/${category._id}`}>
                     
                        <button className="edit-button">Chỉnh sửa</button>
                      
                    </Link>
             
                      <button className="delete-button" onClick={() => deleteCategory(category._id)}>Xóa</button>
           
                  </td>
                </tr>))}
              </tbody>
            </table>
          </div>
  
  );
}
