"use client";
import {
  ArrowUpOutlined,
  SettingOutlined,
  PlusOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
const { Meta } = Card;
import Link from "next/link";
import Image from "next/image";
import { CartContext } from "./Context/DrawerContext";
import { useContext } from "react";
import { title } from "process";

// Define the Card interface
interface CardProps {
  image: string;
  title: string;
  desc: string;
  backgroundColor: string;
  link?: string;
  iconBg?: string;
  id: Number;
}

const cards: CardProps[] = [
  {
    image: "/Customer Engagement.png",
    title: "Mobile Apps",
    desc: "Get your own mobile app",
    backgroundColor: "#0A488F",
    link: "/MobileApps",
    iconBg: "bg-blue-800",
    id: 0,
  },
  {
    image: "/Actionable Insights.png",
    title: "BI",
    desc: "Create Dashboards",
    link: "/Bi",
    backgroundColor: "#579064",
    iconBg: "bg-green-800",
    id: 1,
  },
  {
    image: "/Employees Productivity.png",
    title: "HR",
    desc: "Talents",
    link: "/HR",
    backgroundColor: "#950000",
    iconBg: "bg-red-800",
    id: 2,
  },
  {
    image: "/Operations Excellence.png",
    title: "Operations",
    desc: "ERP Management",
    link: " /Operations",
    backgroundColor: "#8F6C0A",
    iconBg: "bg-yellow-800",
    id: 3,
  },
];

export default function Home() {
  const { cart, addToCart } = useContext(CartContext);

  return (
    <>
      <main className=" bg-white  p-5 w-full  mx-auto ">
        <div className="relative min-h-[70vh] p-10 ">
          <div className="absolute inset-0 bg-gradient-to-tr from-white to-blue-100"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-800 to-blue-900 clip-diagonal"></div>

          <div className="relative z-10 p-4">
            <div className="flex justify-between ">
              <div className="flex items-center">
                <p className="text-2xl text-[#0097C2]">Get Support</p>
                <Image
                  src="/Path.png"
                  alt="support"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full  bg-[#2f5682]">
                <BarsOutlined className=" !text-[#fff]" />
              </div>
            </div>

            <div className="container mt-5 mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {cards.map((card) => (
                  <Card
                    hoverable
                    key={card.title}
                    bodyStyle={{
                      backgroundColor: card.backgroundColor,
                      color: "#ffffff",
                    }}
                    style={{ border: "transparent" }}
                    cover={
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          alt={card.title}
                          className="w-1/2 h-1/2 mx-auto"
                          src={card.image}
                          width={100}
                          height={100}
                        />
                      </div>
                    }
                  >
                    <Meta
                      className="text-white"
                      title={card.title}
                      description={card.desc}
                    />
                    <div className="mt-4 flex nowrap justify-between items-center">
                      <p className="text-lg text-white">100 DTSU*</p>
                      <div className="flex gap-2">
                        <Link
                          href={card.link}
                          className={`w-12 h-12 rounded-full  ${card.iconBg} flex justify-center items-center`}
                        >
                          <ArrowUpOutlined className="!text-white" />
                        </Link>
                        <div
                          className={`w-12 h-12 rounded-full ${card.iconBg} flex justify-center items-center`}
                          onClick={() =>
                            addToCart({
                              title: card.title,
                              image: card.image,
                              id: card.id,
                              quantity: 1,
                            })
                          }
                        >
                          <PlusOutlined className="!text-white" />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end w-full gap-3 p-2 text-white">
                <div className="flex items-center gap-2">
                  <SettingOutlined className="!text-green-400" />
                  <span className="text-sm">Remaining DTSUs: 200</span>
                </div>
                <div className="flex items-center gap-2">
                  <SettingOutlined className="!text-red-400" />
                  <span className="text-sm">Consumed DTSUs: 350</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
