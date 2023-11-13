import { useNavigate } from "react-router-dom";
import supabase from "../config/client";

export async function signOut() {
    const navigate = useNavigate();
    const { error } = await supabase.auth.signOut()
    if(error){

    }
    navigate('/auth');
  }