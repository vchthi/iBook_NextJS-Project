'use client'
import { useEffect, useState } from 'react';
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation'; // Import useRouter từ next/navigation

export default function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((count, item) => count + Number(item.quantity), 0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); 

  useEffect(() => {
    const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
    if (token) {
      setIsLoggedIn(true);
     
    }
  }, []);



  return (
    <header>
      <nav>
        <p className="logo">iBook</p>
        <ul>
          <li>
            <Link href="/">Trang Chủ</Link>
          </li>
          <li>
            <Link href="/sanpham">Sản Phẩm</Link>
          </li>
          <li>
            <Link href="/giohang">
              Giỏ Hàng <span id="amount-cart">{cartCount}</span>
            </Link>
          </li>
          {isLoggedIn  ? (
            <>
              <li>
                <Link href="/info">Thông Tin</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/dangnhap">Đăng nhập</Link>
              </li>
              <li>
                <Link href="/dangky">Đăng ký</Link>
              </li>
            </>
          )}
          <li>
            <form className="search-form" action="/search">
              <input type="text" name="name" className="search-input" placeholder="Search..." />
              <button type="submit" className="search-button">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </li>
        </ul>
      </nav>
    </header>
  );
}
