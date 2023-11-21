import supabase from "./config/client";
import { dataInterface } from "./interface/data";

export async function fetchProducts() {
  try {
    const { data } = await supabase.from("shop_items").select();
    const products: dataInterface[] = data || [];
    return products;
  } catch (error) {
    throw error;
  }
}

export  async function fetchProduct(id:string) {
  try {
    const { data} = await supabase
        .from("shop_items")
        .select()
        .eq("id", id)
        .limit(1);
    const product: dataInterface[] = data || [];
    return product;
  } catch (error) {
    throw error;
  }
}

export  async function updateProduct({title,description,amount,rating,imageUrl,id} :{title:string,description:string,amount:string,rating:string,imageUrl:string,id:string}) {
  console.log('here' ,imageUrl);
  try {
    const { data} = await supabase
        .from("shop_items")
        .update([
          {
            title,
            description,
            amount,
            rating,
            imageUrl,
          },
        ])
        .eq("id", id);
   if(data){

   }
  } catch (error) {
    throw error;
  }
}