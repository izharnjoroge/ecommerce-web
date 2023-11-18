import supabase from "../config/client";

export async function logOut() {
   
    const { error } = await supabase.auth.signOut()
    if(error){

    }
  }