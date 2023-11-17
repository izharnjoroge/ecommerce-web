import React, { useRef, useState } from "react";
import supabase from "../../../config/client";
import { useNavigate } from "react-router-dom";
import "./auth.scss";

/*
 The commented code uses the useRef Hook instead of the useState Hook 
*/

// // Enum for authentication modes
// enum AuthMode {
//   SignUp = "signUp",
//   SignIn = "signIn",
// }

// const Auth = () => {
//   // Naviagator HOOk
//   const navigate = useNavigate();

//   // References HOOK
//   const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   //State For Form
//   // const [formData, setFormData] = useState({
//   //   email: "",
//   //   password: "",
//   // });

//   //Error State
//   // const [formError, setFormError] = useState<string | null>();

//   // Default to SignUp mode
//   const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.SignUp);

//   const authActions = {
//     [AuthMode.SignUp]: signUpNewUser,
//     [AuthMode.SignIn]: signInWithEmail,
//   };

//   async function signUpNewUser(email: string, password: string) {
//     const { data, error } = await supabase.auth.signUp({
//       email: email,
//       password: password,
//     });
//     handleAuthResult(data, error);
//   }

//   async function signInWithEmail(email: string, password: string) {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email: email,
//       password: password,
//     });
//     handleAuthResult(data, error);
//   }

//   const handleAuthResult = (data: any, error: any) => {
//     if (error) {
//       alert(error);
//       return;
//     }
//     if (data) {
//     }

//     // setFormData({
//     //   email: "",
//     //   password: "",
//     // });

//     const successMessage =
//       authMode === AuthMode.SignUp ? "Account created successfully" : "Welcome";
//     alert(successMessage);
//     navigate("/home");
//   };

//   // const handleChange = (
//   //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   // ) => {
//   //   const { name, value } = e.target;
//   //   setFormData({
//   //     ...formData!,
//   //     [name]: value,
//   //   });
//   // };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(emailRef.current!.value);
//     console.log(passwordRef.current!.value);
//     // authActions[authMode](emailRef.current!, passwordRef.current!);
//   };

//   return (
//     <div className="auth-main">
//       <div>
//         <form onSubmit={handleSubmit} className="form-main">
//           <div className="input-elements">
//             <label>Email</label>
//             <input
//               type="text"
//               name="email"
//               required
//               className="input-fields"
//               ref={emailRef}
//               // value={emailRef.current}
//               // value={formData?.email ?? ""}
//               // onChange={handleChange}
//             />
//           </div>
//           <div className="input-elements">
//             <label>Password</label>
//             <input
//               type="text"
//               name="password"
//               min={6}
//               max={16}
//               required
//               className="input-fields"
//               ref={passwordRef}
//               // value={passwordRef.current}
//               // value={formData?.password ?? ""}
//               // onChange={handleChange}
//             />
//           </div>
//           <button className="buttons">
//             {authMode === AuthMode.SignUp ? "Sign Up" : "Sign In"}
//           </button>
//         </form>
//         <p>
//           {authMode === AuthMode.SignUp
//             ? "Already have an account? "
//             : "Don't have an account? "}
//           <button
//             type="button"
//             className="buttons"
//             onClick={() =>
//               setAuthMode(
//                 authMode === AuthMode.SignUp ? AuthMode.SignIn : AuthMode.SignUp
//               )
//             }
//           >
//             {authMode === AuthMode.SignUp ? "Sign In" : "Sign Up"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Auth;

// Enum for authentication modes
enum AuthMode {
  SignUp = "signUp",
  SignIn = "signIn",
}

const Auth = () => {
  // Naviagator HOOk
  const navigate = useNavigate();

  //State For Form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //Error State
  const [formError, setFormError] = useState<string | null>();

  // Default to SignUp mode
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.SignIn);

  const authActions = {
    [AuthMode.SignUp]: signUpNewUser,
    [AuthMode.SignIn]: signInWithEmail,
  };

  async function signUpNewUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    handleAuthResult(data, error);
  }

  async function signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    handleAuthResult(data, error);
  }

  const handleAuthResult = (data: any, error: any) => {
    if (error) {
      alert(error);
      return;
    }
    if (data) {
    }

    setFormData({
      email: "",
      password: "",
    });

    const successMessage =
      authMode === AuthMode.SignUp ? "Account created successfully" : "Welcome";
    alert(successMessage);
    navigate("/home");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData!,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData.email);
    console.log(formData.password);
    authActions[authMode](formData.email, formData.password!);
  };

  return (
    <div className="auth-main">
      <div>
        <form onSubmit={handleSubmit} className="form-main">
          <div className="input-elements">
            <label>Email</label>
            <input
              type="text"
              name="email"
              required
              className="input-fields"
              value={formData?.email ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="input-elements">
            <label>Password</label>
            <input
              type="text"
              name="password"
              min={6}
              max={16}
              required
              className="input-fields"
              value={formData?.password ?? ""}
              onChange={handleChange}
            />
          </div>
          <button className="buttons">
            {authMode === AuthMode.SignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p>
          {authMode === AuthMode.SignUp
            ? "Already have an account? "
            : "Don't have an account? "}
          <button
            type="button"
            className="buttons"
            onClick={() =>
              setAuthMode(
                authMode === AuthMode.SignUp ? AuthMode.SignIn : AuthMode.SignUp
              )
            }
          >
            {authMode === AuthMode.SignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
