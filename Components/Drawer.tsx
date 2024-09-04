"use client";
import React, { useContext, useState } from "react";
import {
  Drawer,
  Button,
  List,
  Avatar,
  Badge,
  Empty,
  Input,
  Typography,
  Space,
  Divider,
} from "antd";
import {
  CloudOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  UpOutlined,
  DownOutlined,
  MailOutlined,
  CreditCardOutlined,
  ShoppingCartOutlined,
  DeleteOutlined,
  GiftOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { CartContext } from "../app/Context/DrawerContext";
import { useRouter } from "next/navigation";

const { Text, Title } = Typography;

const DrawerComponent = () => {
  const [visible, setVisible] = useState(false);

  const {
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    cartOrKitchen,
    moveToKitchen,
    cart,
    kitchen,
    openCart,
    openCloseCart,
  } = useContext(CartContext);

  console.log(cart);
  const router = useRouter();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "red":
        return <SyncOutlined style={{ color: "red" }} />;
      case "yellow":
        return <SyncOutlined style={{ color: "yellow" }} />;
      case "green":
        return <CheckCircleOutlined style={{ color: "green" }} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Drawer
        title={
          <div className="flex justify-between mx-2">
            <p>Your Run {cartOrKitchen}</p>
            {cartOrKitchen === "cart" ? (
              <div className="flex">
                <p className="text-[#637182] text-[12px]">
                  Requests in your <br /> run {cartOrKitchen}
                </p>
                <Badge
                  count={cartOrKitchen == "cart" && cart.length}
                  style={{ backgroundColor: "#FFD900", marginLeft: "10px" }}
                />
              </div>
            ) : (
              <div className="flex">
                <p className="text-[#637182] text-[12px]">
                  Requests in your <br /> run {cartOrKitchen}
                </p>
                <Badge
                  count={cartOrKitchen != "cart" && kitchen.length}
                  style={{ backgroundColor: "#FFD900", marginLeft: "10px" }}
                />
              </div>
            )}
          </div>
        }
        placement="right"
        open={openCart}
        onClose={openCloseCart}
      >
        {cartOrKitchen === "cart" ? (
          cart.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              <ShoppingCartOutlined
                style={{ fontSize: "64px", color: "#8c8c8c" }}
              />
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span className="text-[#00244D] text-[14px]">
                    Your cart is empty!
                    <br />
                    <small className="text-[#637182]">
                      Start adding your requests here
                    </small>
                  </span>
                }
              />
            </div>
          ) : (
            <>
              <List
                dataSource={cart}
                header={
                  <div className="flex justify-between mx-4 text-lg font-semibold text-blue-900 pb-2 border-b">
                    <Text>Product</Text>
                    <Space align="start" size="large">
                      <Text className="text-[14px]">Qty.</Text>
                      <Text>Remove</Text>
                    </Space>
                  </div>
                }
                renderItem={(item: any) => (
                  <List.Item
                    actions={[
                      <Button
                        onClick={() => removeFromCart(item)}
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                      />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Image
                          src={item.image}
                          width={32}
                          height={32}
                          alt="item image"
                          className="w-8 h-8 bg-gray-200 rounded-full"
                        />
                      }
                      title={item.title}
                      description={item.description}
                    />
                    <Space className="ms-3" size="large" align="start">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                        >
                          ▲
                        </button>
                        <span className="px-3 py-1 border-x">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                        >
                          ▼
                        </button>
                      </div>
                    </Space>
                  </List.Item>
                )}
              />
              <Divider />
              <Space direction="vertical" style={{ width: "100%" }}>
                <div className="flex justify-between">
                  <Text>Subtotal</Text>
                  <Text className="text-[#0097C2]" strong>
                    1.00 DTSUs
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text>New Payment</Text>
                  <Text className="!text-[#0097C2]">
                    No, Inclusive in your package
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text strong>Total Units Consumed</Text>
                  <Text className="!text-[#0097C2]" strong>
                    1.00 DTSUs
                  </Text>
                </div>
              </Space>
              <div className="mt-4">
                <Button
                  className="!bg-[#0097C2]"
                  shape="round"
                  type="primary"
                  block
                  size="large"
                  onClick={moveToKitchen}
                >
                  Checkout
                </Button>
              </div>
              <div className="mt-2">
                <Button
                  size="large"
                  type="primary"
                  className="!bg-[transparent] !border-[#0097C2] !text-[#0097C2]"
                  shape="round"
                  block
                  onClick={openCloseCart}
                >
                  Back to Run Information
                </Button>
              </div>
              <div className="mt-4 p-4 bg-[#FCF9E1] rounded-md">
                <Space size={"large"}>
                  <Text>
                    You have made a great choice! Let's Run and be ready for a
                    surprise
                  </Text>
                  <GiftOutlined style={{ color: "gold" }} />
                </Space>
              </div>
              <div className="mt-4 p-4 bg-[#ECF6FE] rounded-md">
                <Space size={"large"}>
                  <InfoCircleOutlined style={{ color: "#00244D" }} />
                  <Text type="secondary">
                    Some requests can take a week or more to be delivered and
                    may be subject to{" "}
                    <span className="text-[#0097c2]">
                      dependency resolution related to your...
                    </span>
                  </Text>
                </Space>
              </div>
            </>
          )
        ) : (
          <>
            {kitchen.length === 0 ? (
              <div style={{ textAlign: "center", marginTop: "100px" }}>
                <ShoppingCartOutlined
                  style={{ fontSize: "64px", color: "#8c8c8c" }}
                />
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <span className="text-[#00244D] text-[14px]">
                      Your kichen is empty!
                      <br />
                      <small className="text-[#637182]">
                        Start adding your requests here
                      </small>
                    </span>
                  }
                />
              </div>
            ) : (
              <>
                <List
                  dataSource={kitchen}
                  header={
                    <div className="flex justify-between mx-4 text-lg font-semibold text-blue-900 pb-2 border-b">
                      <Text>Request</Text>
                      <Space align="start" size="large">
                        <Text className="text-[14px]">Status</Text>
                        <Text>O/P Link</Text>
                      </Space>
                    </div>
                  }
                  renderItem={(item: any) => (
                    <List.Item
                      actions={[
                        <MailOutlined key="mail" />,
                        // <LinkOutlined key="link" />,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Image
                            src={item.image}
                            width={32}
                            height={32}
                            alt="item image"
                            className="w-8 h-8 bg-gray-200 rounded-full"
                          />
                        }
                        title={item.title}
                        description={"Private Training, 12.00 DTSU"}
                      />
                      <Space className="ms-3" size="large" align="start">
                        <div className="flex items-center border rounded-md">
                          <CreditCardOutlined />
                        </div>
                      </Space>
                    </List.Item>
                  )}
                />
                <Divider />
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div className="flex justify-between">
                    <Text>Units Under Processing</Text>
                    <Text className="text-[#0097C2]" strong>
                      12.00 DTSUs
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text>Units Completed</Text>
                    <Text className="!text-[#0097C2]">12.00 DTSUs</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text strong>Total Units Consumed</Text>
                    <Text className="!text-[#0097C2]" strong>
                      12.00 DTSUs
                    </Text>
                  </div>
                </Space>
                <div className="mt-4">
                  <Button
                    className="!bg-[#0097C2]"
                    shape="round"
                    type="primary"
                    block
                    size="large"
                  >
                    Refresh Status
                  </Button>
                </div>
                <div className="mt-2">
                  <Button
                    size="large"
                    type="primary"
                    className="!bg-[transparent] !border-[#0097C2] !text-[#0097C2]"
                    shape="round"
                    block
                    onClick={() => {
                      openCloseCart();
                      router.push("/");
                    }}
                  >
                    Back to Your Dashboard
                  </Button>
                </div>

                <div className="mt-4 p-4 bg-[#ECF6FE] rounded-md">
                  <Space size={"large"}>
                    <InfoCircleOutlined style={{ color: "#00244D" }} />
                    <Text type="secondary">
                      Some requests can take a week or more to be delivered and
                      may be subject to{" "}
                      <span className="text-[#0097c2]">
                        dependency resolution related to your...
                      </span>
                    </Text>
                  </Space>
                </div>
              </>
            )}
          </>
        )}
      </Drawer>
    </>
  );
};

export default DrawerComponent;
