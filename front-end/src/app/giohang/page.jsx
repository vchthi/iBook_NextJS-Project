"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,clearCart,
} from "@/redux/slices/cartslice";
import { useMemo } from "react";
import "../globals.css";
import Link from "next/link";


export default function Cart() {
  const cartItems = useSelector((state) => state.cart?.items) || [];
  console.log(cartItems);
  const dispatch = useDispatch();

  const total = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price_2 * item.quantity,
        0
      ),
    [cartItems]
  );
  
  return (
    <div className="container-cart">
      <div className="content-cart">
        <div className="box-left">
          <table id="table-cart">
            <thead>
              <tr>
                <th id="th-cart">STT</th>
                <th id="th-cart">Sản phẩm</th>
                <th id="th-cart">Tên</th>
                <th id="th-cart">Đơn giá</th>
                <th id="th-cart">Số lượng</th>
                <th id="th-cart">Thành tiền</th>
                <th id="th-cart"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr style={{ marginLeft: "40px" }} key={item._id}>
                  <td id="td-cart">{index + 1}</td>
                  <td id="td-cart">
                    <img
                      style={{ width: "50px" }}
                      src={`http://localhost:3000/images/${item.image}`}
                      alt="" 
                    />
                  </td>
                  <td id="td-cart">{item.name}</td>{" "}
                  <td id="td-cart">{item.price_2}</td>
                  <td id="td-cart">
                    <input
                      type="number"
                      className="qty"
                      min="1"
                      max="100"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          updateCartItemQuantity({
                            _id: item._id,
                            quantity: parseInt(e.target.value),
                          })
                        )
                      }
                    />
                  </td>
                  <td id="td-cart">{(item.price_2 * item.quantity)}</td>{" "}
                  <td id="td-cart">
                    <button className="delPro" onClick={() => dispatch(removeFromCart(item._id))}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="btn-choice">
            <Link href="/">
              <button className="btn-shop">
                <i className="fa-solid fa-angle-left"></i> Tiếp tục mua
              </button>
            </Link>
            
            <Link href="thanh_toan">
              <button className="btn-check">
                Thanh toán <i className="fa-solid fa-chevron-right"></i>
              </button>
            </Link>
          </div>
        </div>

        <div style={{ marginLeft: "15px" }} className="box-right">
          <div className="voucher">
            <label htmlFor="voucher-code">Mã giảm giá</label>
            <br />
            <input
              className="inp-text"
              type="text"
              id="voucher-code"
              placeholder="Nhập mã giảm giá"
            />
            <button className="but-apply" type="submit">
              Nhập
            </button>
          </div>
          <div className="total">
            <div style={{ marginBottom: "10px" }}>
              <span>Giảm giá: </span>
              <span style={{ float: "right" }}>0</span>
              <br />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <span>Tổng cộng: </span>
              <span id="sumMoney" style={{ float: "right" }}>
                {total}
              </span>
              <br />
            </div>
            <input type="checkbox" id="paymentCheckbox" required /> Thanh toán
            khi nhận hàng
          </div>
        </div>
      </div>
    

              <button className="btn-del-all" onClick={() => dispatch(clearCart())}>Xóa tất cả</button>
      <div style={{ marginBottom: "30px" }} className="foot">
        <i className="fa-solid fa-truck-fast"></i> Giao hàng miễn phí trong tuần
        này
      </div>
    </div>
  );
}

