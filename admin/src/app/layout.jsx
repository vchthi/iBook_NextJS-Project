
import "./globals.css";
import Link from "next/link";
export default function RootLayout({ children }) {
  return (
  
    <html lang="en">
        <head>
       <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Clicker Script"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Playfair Display"
        />
        <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />{" "}
    </head>
      
      <body >
      <div className="container">
        <div>
          <div className="head-admin">
            <p className="logo-admin">iBook</p>
            <div className="search-container">
              <input type="text" id="productSearch" placeholder="Tìm kiếm..." />
              <button id="search">Tìm kiếm</button>
            </div>
            <div className="user-section">
              <img
                src="./images/worldtrigger.jpg"
                className="user-avatar"
                alt="User Avatar"
              />
              <span className="user-name">User</span>
            </div>
          </div>
          <div className="container-admin">
            <div className="bor-left">
              <div className="col-left">
                <ul>
                  <li>
                    <Link
                      href="/"
                      style={{ textDecoration: "none" }}
                    >
                      <button className="manager-button" id="btn">
                        <i
                          style={{ marginRight: "5px" }}
                          className="fa-solid fa-list"
                        ></i>
                        Quản lí sản phẩm
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/danhmuc"
                      style={{ textDecoration: "none" }}
                    >
                      <button className="manager-button" id="btn">
                        <i
                          style={{ marginRight: "5px" }}
                          className="fa-solid fa-list"
                        ></i>
                        Quản lí danh mục
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bor-right">
              <div className="col-right">
              {children}
              </div>
            </div>
          </div>
        </div></div>
      </body>
    </html>
  );
}
