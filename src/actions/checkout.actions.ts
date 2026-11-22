"use server";

import { getToken } from "@/lib/auth";
import type { CheckoutSchemaType } from "@/lib/schema/checkout.schema";

const baseUrl = process.env.NEXT_PUBLIC_BASIC_URL;

export async function OnlinePayment(
  cartId: string,
  formData: CheckoutSchemaType,
  successUrl: string,
) {
  const token = await getToken();

  const headers: HeadersInit = {
    token: token as string,
    "Content-Type": "application/json",
  };

  const response = await fetch(
    `${baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(successUrl)}`,
    {
      method: "POST",
      body: JSON.stringify({ formData }),
      headers,
    },
  );

  const data = await response.json();
  return data;
}



export async function CashPayment(cartId: string) {
  const token = await getToken();
  const response = await fetch(`${baseUrl}/api/v2/orders/${cartId}`, {
    method: "POST",
    headers: {
  "Content-Type": "application/json",
  ...(token ? { token } : {}),
},
  });
  const data = await response.json();
  return data;
}
