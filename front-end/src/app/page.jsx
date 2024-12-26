import Image from "next/image";
import "./globals.css";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
const res = await fetch("http://localhost:3000/products", { cache: 'no-store' });
const data = await res.json();

const newRes = await fetch("http://localhost:3000/products/newpro", { cache: 'no-store' });
const newdata = await newRes.json();

const saleRes = await fetch("http://localhost:3000/products/sale", { cache: 'no-store' });
const saledata = await saleRes.json();

const hotRes = await fetch("http://localhost:3000/products/hotpro", { cache: 'no-store' });
const hotdata = await hotRes.json();

const bestsellerRes = await fetch("http://localhost:3000/products/bestseller", { cache: 'no-store' });
const bestsellerdata = await bestsellerRes.json();

const vanhocRes = await fetch("http://localhost:3000/products/category/65fb017b5855e62fea735f8c", { cache: 'no-store' });
const vanhocdata = await vanhocRes.json();

const tieuthuyetRes = await fetch("http://localhost:3000/products/category/65fb01f45855e62fea735f8e", { cache: 'no-store' });
const tieuthuyetdata = await tieuthuyetRes.json();

const truyentranhRes = await fetch("http://localhost:3000/products/category/65fb02485855e62fea735f91", { cache: 'no-store' });
const truyentranhdata = await truyentranhRes.json();


export default function Home() {
        cache: 'no-store'
  return (
    <div>
      <div className="content">
        <p style={{ marginTop: "9%" }}>We've got your morning covered with</p>
        <h1>Book</h1>
        <p>
          It is best to start your day with a book. Discover the <br />
          best story you will ever have. We provide the best <br />
          for our customers.
        </p>
        <button className="btn">Order Now</button>
      </div>
      <div className="container">
        <div className="content-2">
          <div className="left">
            <h2>Discover the best book</h2>
            <p>
              Book Store is a book shop that provides you with quality books
              that help boost your productivity and mood. Having a physical book 
              is great. There is no doubt that you will enjoy these books more
              than others you have ever tasted.
            </p>
            <button className="btn">Order Now</button>

          </div>

          <div className="right">
            <Image src="/images/book-section2.png" width={700} height={455} />
          </div>
        </div>
      </div>

      <div className="content-3">
        <h2>Tiểu thuyết</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Perspiciatis, eos.
        </p>
        <div className="box" id="showAll">

       
          <ProductCard data={tieuthuyetdata} />
    
        </div>
        
      </div>
      <div className="content-3">
        <h2>Văn học</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Perspiciatis, eos.
        </p>
        <div className="box" id="showAll">
          
       
          <ProductCard data={vanhocdata} />
        </div>
        
      </div>
      <div className="content-3">
        <h2>Truyện tranh</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Perspiciatis, eos.
        </p>
        <div className="box" id="showAll">
          
       
          <ProductCard data={truyentranhdata} />
        </div>
        
      </div>
      <div className="content-3">
        <h2>Sách mới</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Perspiciatis, eos.
        </p>
        <div className="box" id="showAll">
          
       
          <ProductCard data={newdata} />
        </div>
        
      </div>
      <div className="content-3">
        <h2>Sách nổi bật</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Perspiciatis, eos.
        </p>
        <div className="box" id="showAll">
          
       
          <ProductCard data={hotdata} />
        </div>
        
      </div>
      <div className="content-3">
        <h2>Sách bán chạy</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Perspiciatis, eos.
        </p>
        <div className="box" id="showAll">
          
       
          <ProductCard data={bestsellerdata} />
        </div>
        
      </div>
      <div className="content-3">
        <h2>Giảm giá</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Perspiciatis, eos.
        </p>
        <div className="box" id="showAll">
          
       
          <ProductCard data={saledata} />
        </div>
        
      </div>
      
      
      <button className="view-more">Xem thêm</button>
      {/* Phần tiếp theo (lý do chọn chúng tôi) */}
      <div className="content-4">
        <h2>Tại sao nên chọn chúng tôi?</h2>
        <p>We don’t just make your book, we make your day!</p>
        <div className="box-2">
          <div className="box2 mr1">
            <img src="/images/book.png" />
            <h3>Bìa Sách Đẹp</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="box2 mr1">
            <img src="/images/award.png" />
            <h3>Chất Lượng Cao</h3>
            <p>We provide the highest quality</p>
          </div>
          <div className="box2 mr1">
            <img src="/images/perks.png" />
            <h3>Khác Biệt</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="box2 mr1">
            <img src="/images/coin.png" />
            <h3>Giá Hợp Lí</h3>
            <p>Our Book prices are easy to afford</p>
          </div>
        </div>
      </div>

      <div className="banner-2">
        <div id="b1"></div>
        <div id="b2"></div>
        <div id="b3"></div>
        <div id="b4"></div>
        <div id="b5">
          <h2>
            Get a chance to have an
            <br /> Amazing morning
          </h2>
          <br />
          <p>
            We are giving you a one-time opportunity to experience
            <br /> a better life with book.
          </p>
          <br />
          <button className="btn" style={{ marginLeft: "93px" }}>
            Order Now
          </button>
        </div>
      </div>

      <div className="content-5"></div>
    </div>
  );
}
