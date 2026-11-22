"use client";

interface ProductTotalPriceProps {
  price: number;
  count: number;
}

export default function ProductTotalPrice({price, count}: ProductTotalPriceProps) {
  const totalPrice = price * count;

  return (
    <span className="font-heading text-xl font-bold text-primary">
      {totalPrice.toFixed(2)} EGP
    </span>
  );
}
