'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';


export default function CategoryEdit({ params }) {
  const router = useRouter();
  const id = params.id; 
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const getCategory = async () => {
      const res = await fetch(`http://localhost:3000/categories/${id}`);
      const data = await res.json();
      setCategory(data);
      setValue('name', data.name);
      setValue('description', data.description);
    };

    if (id) {
      getCategory();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const res = await fetch(`http://localhost:3000/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!result.error) {
      router.push('/danhmuc'); 
    } else {
      console.error(result.error);
    }
  };

  return (
    <div>
      <div className="nav-add-header">
        <h2 className="title-add-admin" style={{ fontFamily: "Playfair Display", marginTop: "10px", textAlign: "center" }}>
          Chỉnh sửa danh mục
        </h2>
        <div id="addProductModal">
          <form id="formThemDanhMuc" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" id="_id" name="_id" value={id} {...register('_id')} />
            <br />
            <label htmlFor="name">Tên danh mục</label>
            <br />
            <input
              style={{ padding: "13px", width: "100%" }}
              type="text"
              id="name"
              name="name"
              placeholder="Nhập tên danh mục"
              {...register('name', { required: 'Tên danh mục là bắt buộc' })}
            />
            {errors.name && <div className="text-danger">{errors.name.message}</div>}
            <br />
            <label htmlFor="description">Mô tả</label>
            <br />
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Nhập mô tả danh mục"
              {...register('description', { required: 'Mô tả là bắt buộc' })}
            />
            {errors.description && <div className="text-danger">{errors.description.message}</div>}
            <br /><br />
            <button style={{ float: "left" }} className="add-button" type="submit">Sửa</button>
            <Link href="/danhmuc">
              <button style={{ float: "right" }} className="close-button" type="button">Đóng</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
