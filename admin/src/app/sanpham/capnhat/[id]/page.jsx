'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from "next/link";

export default function EditProduct({ params }) {
  const router = useRouter();
  const id = params.id;
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState('');  

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch('http://localhost:3000/categories');
      const data = await res.json();
      setCategories(data);
    };
    getCategories();

    const getProduct = async () => {
      const res = await fetch(`http://localhost:3000/products/detail/${id}`);
      const data = await res.json();
      setProduct(data);
      setPreviewImage(data.image); 
      // Đặt giá trị ban đầu cho form
      setValue('name', data.name);
      setValue('price_1', data.price_1);
      setValue('price_2', data.price_2);
      setValue('mota_1', data.mota_1);
      setValue('mota_2', data.mota_2);
      setValue('categoryId', data.categoryId);
    };
    if (id) {
      getProduct();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    // chua du lieu goi di
    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    }

    const res = await fetch(`http://localhost:3000/products/${id}`, {
      method: 'PUT',
      body: formData,
    });
    const result = await res.json(); 
    if (!result.error) {
      router.push('/sanpham');
    } else {
      console.error(result.error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); 
    }
  };

  return (
    <div>
      <div className="nav-add-header">
        <h2 className="title-add-admin" style={{ fontFamily: "Playfair Display", marginTop: "10px", textAlign: "center" }}>
          Chỉnh sửa sản phẩm
        </h2>
        <br />
        <div id="addProductModal">
          <form id="formThemSanPham" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <label htmlFor="name">Tên sản phẩm</label>
            <br />
            <input
              style={{ padding: "13px", width: "100%" }}
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="Nhập tên sản phẩm"
              {...register('name', { required: 'Tên sản phẩm là bắt buộc' })}
            />
            {errors.name && <div className="text-danger">{errors.name.message}</div>}
            <br /><br />
            <label htmlFor="price_1">Giá sản phẩm cũ</label>
            <br />
            <input
              type="number"
              name="price_1"
              id="price_1"
              className="form-control"
              placeholder="Nhập giá sản phẩm ban đầu"
              {...register('price_1', { required: 'Giá cũ là bắt buộc', valueAsNumber: true })}
            />
            {errors.price_1 && <div className="text-danger">{errors.price_1.message}</div>}
            <br /><br />
            <label htmlFor="price_2">Giá sản phẩm mới</label>
            <br />
            <input
              type="number"
              name="price_2"
              id="price_2"
              className="form-control"
              placeholder="Nhập giá sản phẩm hiện tại"
              {...register('price_2', { required: 'Giá là bắt buộc', valueAsNumber: true })}
            />
            {errors.price_2 && <div className="text-danger">{errors.price_2.message}</div>}
            <br /><br />
            <label htmlFor="image">Hình ảnh</label>
            <br />
            <img src={`http://localhost:3000/images/${product?.image}`} width='150px'  height='200px' />
            <i  style={{ color: "red", marginLeft:"30px",marginRight:"30px"}} class="fa-solid fa-arrow-right"></i>
            {previewImage && <img src={previewImage} width="150px" height='200px' alt='Chọn ảnh' />} 
            <input
              type="file"
              name="image"
              id="image"
              className="form-control"
              {...register('image')}
              onChange={handleImageChange}  
            />
            <br /><br />
            <label htmlFor="categoryId">Danh mục</label>
            <select
              style={{ marginLeft: "20px" }}
              name="categoryId"
              id="categoryId"
              className="form-control"
              {...register('categoryId', { required: 'Chọn một danh mục' })}
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <div className="text-danger">{errors.categoryId.message}</div>}
            <br /><br />
            <label htmlFor="mota_1">Mô tả</label>
            <br />
            <textarea
              name="mota_1"
              id="mota_1"
              className="form-control"
              placeholder="Nhập mô tả sản phẩm"
              {...register('mota_1', { required: 'Mô tả là bắt buộc' })}
            />
            {errors.mota_1 && <div className="text-danger">{errors.mota_1.message}</div>}
            <br /><br />
            <label htmlFor="mota_2">Thông tin sách</label>
            <br />
            <textarea
              name="mota_2"
              id="mota_2"
              className="form-control"
              placeholder="Nhập thông tin sản phẩm"
              {...register('mota_2', { required: 'Mô tả là bắt buộc' })}
            />
            {errors.mota_2 && <div className="text-danger">{errors.mota_2.message}</div>}
            <br /><br />
            <button style={{ float: "left" }} className="add-button" type="submit">Sửa</button>
            <Link href="/sanpham">
              <button style={{ float: "right" }} className="close-button" type="button">Đóng</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
