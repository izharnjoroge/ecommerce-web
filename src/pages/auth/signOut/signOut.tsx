import { useNavigate } from "react-router-dom";
import supabase from "../../../config/client";
import { useAuthContext } from "../../../authContext/auth_context";

const SignOut = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthContext();

  async function logOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error);
    }
    alert("Logged Out");
    setAuth(false);
    navigate("/");
  }

  return <button onClick={logOut}>signOut</button>;
};

export default SignOut;
