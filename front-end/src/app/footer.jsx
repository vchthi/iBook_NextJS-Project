import Link from "next/link";
export default function Footer() {
  return (
    <footer>
    <div class="row">
      <div class="col">
        <h3 id="tieude-footer">iBook</h3>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
          has been
          the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a
          galley of
          type
        </p>
      </div>
      <div class="col">
        <h3 id="tieude-footer">Thông tin</h3>
        <ul>
          <li><Link href="#">Trang chủ</Link></li>
          <li><Link href="#">Sản phẩm</Link></li>
          <li><Link href="#">Đăng nhập</Link></li>
          <li><Link href="#">Đăng ký</Link></li>
  
  
        </ul>
      </div>
     
      <div class="col">
        <h3 id="tieude-footer">Liên hệ</h3>
        <ul>
          <li><a href="">QTSC, Tân Chánh Hiệp,<br/> Quận 12, TPHCM</a></li>
          <li><a href="">+1 202-918-2132</a></li>
  
          <li><a href="">ibookvn@gmail.com</a></li>
          <li><a href="">http.ibookvn.com</a></li>
  
  
        </ul>
      </div>
      <div class="col">
        <h3 id="tieude-footer">Chính sách</h3>
        <ul>
          <li><a href="#">Chính sách đổi trả</a></li>
          <li><a href="#">Chính sách bảo hành</a></li>
          <li><a href="#">Chính sách ưu đãi</a></li>
          <li><a href="#">Chính sách bảo mật</a></li>
        </ul>
      </div>
  
    </div>
  </footer>
  
  );
}
