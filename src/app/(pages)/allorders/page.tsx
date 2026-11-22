"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getUserOrders } from "@/services/allOrders.service";
import {
  Banknote,
  Box,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  PackageOpen,
  Phone,
  ReceiptText,
  ShoppingBag,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AllOrdersIF } from "@/types/allOrders.Type";

export default function AllOrders() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [orders, setOrders] = useState<AllOrdersIF[]>([]);
  const [openOrders, setOpenOrders] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  async function userOrders(userId: string) {
    try {
      setIsLoading(true);
      const response = await getUserOrders(userId);
      setOrders(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (userId) {
      userOrders(userId);
    } else {
      setIsLoading(false);
    }
  }, [userId]);

  return (
    <div className="container mx-auto pb-16">
      <section className="top bg-white">
        <div className="container mx-auto">
          <div className="body py-5">
            <div className="bread-crumb mb-5">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="/"
                      className="text-black text-md font-bold opacity-50 hover:text-black hover:opacity-100"
                    >
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbSeparator className="text-black" />

                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-black text-md font-bold">
                      My Orders
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="icon p-2.5 bg-green-600 w-fit rounded-lg shadow-lg shadow-green-200">
                  <PackageOpen size={28} className="text-white" />
                </div>

                <div className="title">
                  <h2 className="text-3xl text-black font-black">My Orders</h2>

                  <p className="text-sm text-gray-400">
                    {isLoading
                      ? "Loading your orders..."
                      : `Track and manage your ${orders.length} orders`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        {/* Loading state */}
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <OrderSkeleton key={index} />
          ))}

        {/* Empty state */}
        {!isLoading && orders.length === 0 && <EmptyOrders />}

        {/* Orders list */}
        {!isLoading &&
          orders.map((order) => {
          const orderId = order._id;
          const isDetailsOpen = openOrders[orderId] ?? false;

          // ---- derived data ----
          const firstItem = order.cartItems[0];
          const itemsCount = order.cartItems.reduce(
            (sum, item) => sum + item.count,
            0,
          );
          const subtotal = order.cartItems.reduce(
            (sum, item) => sum + item.price * item.count,
            0,
          );
          const orderDate = new Date(order.createdAt).toLocaleDateString(
            "en-US",
            { month: "short", day: "numeric", year: "numeric" },
          );

          return (
            <React.Fragment key={order._id}>
              <div className="border border-green-400 rounded-xl p-4">
                <div className=" bg-white shadow p-4 rounded-t-md mb-3 flex items-center gap-3">
                  <Image
                    src={firstItem.product.imageCover}
                    width={80}
                    height={80}
                    alt={firstItem.product.title}
                    className="border"
                  />
                  <div className="w-full space-y-2.5">
                    <div className=" flex justify-between items-center">
                      {order.isDelivered ? (
                        <h6 className=" p-2 w-fit flex items-center gap-1 font-black rounded-2xl text-[10px] bg-green-200 text-green-700">
                          <CheckCircle2 size={15} /> Delivered
                        </h6>
                      ) : (
                        <h6 className=" p-2 w-fit flex items-center gap-1 font-black rounded-2xl text-[10px] bg-amber-200 text-amber-600">
                          <Clock size={15} /> Processing
                        </h6>
                      )}

                      <span className="bg-gray-200 text-gray-600 flex items-center gap-1 w-fit p-2 px-2.5 rounded-md text-[10px] font-bold uppercase">
                        {order.paymentMethodType === "card" ? (
                          <CreditCard size={20} />
                        ) : (
                          <Banknote size={20} />
                        )}
                        {order.isPaid ? "Paid" : "Unpaid"}
                      </span>
                    </div>

                    <h2 className="text-2xl text-gray-400">
                      # <span className=" font-black text-black">{order.id}</span>
                    </h2>

                    <p className=" flex items-center gap-2 text-[10px] text-gray-400">
                      <span className=" flex items-center gap-1">
                        <CalendarDays size={15} /> {orderDate}
                      </span>{" "}
                      <span className=" flex items-center gap-1">
                        <Box size={15} /> {itemsCount} items
                      </span>{" "}
                    </p>

                    <div className="flex justify-between items-center w-full">
                      <h3 className="font-bold text-2xl">
                        {order.totalOrderPrice} EGP
                      </h3>
                      <Button
                        variant="ghost"
                        onClick={() =>
                          setOpenOrders((prev) => ({
                            ...prev,
                            [orderId]: !isDetailsOpen,
                          }))
                        }
                        className="bg-transparent text-gray-400 hover:bg-transparent hover:text-gray-600"
                      >
                        {isDetailsOpen ? "Hide" : "Details"}

                        {isDetailsOpen ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {isDetailsOpen && (
                  <>
                    <div>
                      <h3 className=" flex items-center gap-2 font-bold text-xl">
                        <span className="text-green-600 bg-green-100 p-2 rounded-full">
                          <ReceiptText size={20} />
                        </span>{" "}
                        Order Items
                      </h3>

                      {order.cartItems.map((item) => (
                        <div
                          key={item._id}
                          className=" bg-white shadow rounded-xl p-4 border my-5 flex items-center gap-2"
                        >
                          <Image
                            src={item.product.imageCover}
                            width={50}
                            height={50}
                            alt={item.product.title}
                          />
                          <div className=" flex justify-between w-full items-center">
                            <div>
                              <h2 className=" text-xl font-bold line-clamp-1">
                                {item.product.title}
                              </h2>
                              <p className=" text-md text-gray-500">
                                {item.count} x {item.price} EGP
                              </p>
                            </div>
                            <div>
                              <p className=" text-xl font-bold">
                                {item.count * item.price}
                              </p>
                              <p className="text-center text-md text-gray-500">
                                EGP
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className=" grid grid-cols-12 gap-4 mt-10">
                        <div className="col-span-6 bg-white shadow rounded-xl p-3">
                          <h3 className=" font-bold text-md flex items-center gap-2">
                            <span className="text-blue-700 bg-blue-100 p-2 rounded-md">
                              <User size={15} />
                            </span>{" "}
                            Customer Info
                          </h3>
                          <p className=" text-xl font-bold my-3">
                            {order.user.name}
                          </p>
                          <p className=" text-md text-gray-500">
                            {order.user.email}
                          </p>
                          <span className=" flex items-center gap-2 mt-3 text-gray-400">
                            <Phone size={15} className="fill-gray-400" />{" "}
                            {order.user.phone}
                          </span>
                        </div>

                        <div className="col-span-6 bg-amber-100 border border-amber-200 shadow rounded-xl p-3">
                          <h3 className=" font-bold text-md flex items-center gap-2">
                            <span className="text-amber-700 bg-amber-400 p-2 rounded-md">
                              <Clock size={15} />
                            </span>{" "}
                            Order Summary
                          </h3>
                          <p className=" flex justify-between items-center text-md text-gray-500 my-3">
                            Subtotal <span>{subtotal} EGP</span>
                          </p>
                          <p className=" flex justify-between items-center text-md text-gray-500">
                            Tax <span>{order.taxPrice} EGP</span>
                          </p>
                          <p className=" flex justify-between items-center text-md text-gray-500 mt-3">
                            Shipping{" "}
                            <span>
                              {order.shippingPrice === 0
                                ? "Free"
                                : `${order.shippingPrice} EGP`}
                            </span>
                          </p>
                          <span className=" flex items-center justify-between text-xl gap-2 mt-3 font-bold">
                            Total <span>{order.totalOrderPrice} EGP</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </section>
    </div>
  );
}

function OrderSkeleton() {
  return (
    <div className="border border-green-200 rounded-xl p-4 animate-pulse">
      <div className="bg-white shadow p-4 rounded-t-md flex items-center gap-3">
        <div className="w-20 h-20 rounded-md bg-gray-200 shrink-0" />

        <div className="w-full space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-6 w-24 rounded-2xl bg-amber-100" />
            <div className="h-8 w-20 rounded-md bg-gray-200" />
          </div>

          <div className="h-7 w-32 rounded bg-gray-200" />

          <div className="flex items-center gap-3">
            <div className="h-3 w-24 rounded bg-gray-100" />
            <div className="h-3 w-16 rounded bg-gray-100" />
          </div>

          <div className="flex justify-between items-center">
            <div className="h-7 w-28 rounded bg-gray-200" />
            <div className="h-8 w-20 rounded-md bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyOrders() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 border-2 border-dashed border-green-300 rounded-2xl bg-green-50/40">
      <div className="relative mb-6">
        <span className="absolute inset-0 rounded-full bg-green-200 animate-ping opacity-40" />
        <div className="relative p-6 rounded-full bg-green-100 text-green-600 shadow-lg shadow-green-100">
          <ShoppingBag size={48} />
        </div>
      </div>

      <h3 className="text-2xl font-black text-black">No orders yet</h3>
      <p className="text-gray-400 mt-2 max-w-sm">
        Looks like you haven&apos;t placed any orders. Once you do, you&apos;ll
        be able to track them right here.
      </p>

      <Button
        asChild
        className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold px-6 shadow-lg shadow-green-200"
      >
        <Link href="/">
          <ShoppingBag size={18} />
          Start Shopping
        </Link>
      </Button>
    </div>
  );
}