import supabase from "./config/client";
import {
  OrderInterface,
  categoriesInterface,
  dataInterface,
} from "./interface/data";

export async function fetchProducts() {
  try {
    const { data } = await supabase.from("items").select();
    const products: dataInterface[] = data || [];
    return products;
  } catch (error) {
    throw error;
  }
}

export async function fetchProduct(id: string) {
  try {
    const { data } = await supabase
      .from("items")
      .select()
      .eq("item_id", id)
      .limit(1);
    const product: dataInterface[] = data || [];
    return product;
  } catch (error) {
    throw error;
  }
}

export async function updateProduct({
  name,
  description,
  amount,
  rating,
  imageUrl,
  id,
}: {
  name: string;
  description: string;
  amount: string;
  rating: string;
  imageUrl: string;
  id: string;
}) {
  console.log("here", imageUrl);
  try {
    const { data } = await supabase
      .from("items")
      .update([
        {
          name,
          description,
          amount,
          rating,
          imageUrl,
        },
      ])
      .eq("id", id);
    if (data) {
    }
  } catch (error) {
    throw error;
  }
}

export async function getCategories() {
  try {
    const { data } = await supabase.from("categories").select();
    const products: categoriesInterface[] = data || [];
    return products;
  } catch (error) {
    throw error;
  }
}

export async function fetchOrders() {
  try {
    const { data } = await supabase.from("orders").select();
    const orders: OrderInterface[] = data || [];
    return orders;
  } catch (error) {
    throw error;
  }
}
