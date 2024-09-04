"use client";

import Image from "next/image";
import {
  AntDesignOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Tooltip } from "antd";
import { useContext } from "react";
import { CartContext } from "@/app/Context/DrawerContext";

export default function NavBar() {
  const { cart, cartOrKitchen, setCartOrkitchen, openCart, openCloseCart , kitchen  } =
    useContext(CartContext);

  return (
    <nav className=" w-full  mt-5 p-3">
      <div className="navbar ">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[24px]">Welcome to My Company!</p>
            <p className="text-[#637182] text-sm">
              You have started your{" "}
              <span className="text-[black]">30 day trial</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Avatar.Group
              size="large"
              max={{
                count: 3,
                style: {
                  color: "#7C838A",
                  backgroundColor: "#E6E6E6",
                  cursor: "pointer",
                },
                popover: { trigger: "click" },
              }}
            >
              <Avatar src="/hero2.png" />
              <Avatar src="/hero1.png" />
              <Avatar src="/hero3.png" />
              <Tooltip title="Ant User" placement="top">
                <Avatar
                  style={{ backgroundColor: "#E6E6E6" }}
                  icon={<UserOutlined />}
                />
              </Tooltip>
              <Avatar
                style={{ backgroundColor: "#E6E6E6" }}
                icon={<AntDesignOutlined />}
              />
            </Avatar.Group>
            <div>
              <p className="text-[#637182] text-normal">
                Our architects are here to help
              </p>
              <p className="text-[#0097C2] text-xs">Book a free session</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge
              className="cursor-pointer"
              onClick={() => {
                setCartOrkitchen("cart");
                openCloseCart();
              }}
              color="#FFD900"
              count={cart.length}
            >
              <Avatar
                style={{ backgroundColor: "#E1ECF9", color: "#4A6585" }}
                shape="circle"
                size="large"
              >
                <ShoppingCartOutlined />
              </Avatar>
            </Badge>
            <Badge
              className="cursor-pointer"
              onClick={() => {
                setCartOrkitchen("Kitchen");
                openCloseCart();
              }}
              color="#FFD900"
              count={kitchen.length}
            >
              <Avatar
                style={{ backgroundColor: "#E1ECF9", color: "#4A6585" }}
                shape="circle"
                size="large"
              >
                <BankOutlined />
              </Avatar>
            </Badge>
          </div>
        </div>
      </div>
    </nav>
  );
}
