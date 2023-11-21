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
      setAuth(false);
      navigate("/", { replace: true });
    } else {
      alert("Logged Out");
      setAuth(false);
      navigate("/", { replace: true });
    }
    navigate("/", { replace: true });
  }

  return <button onClick={logOut}>signOut</button>;
};

export default SignOut;
