import React, { useState } from "react";
import supabase from "../../../config/client";
import { useNavigate } from "react-router-dom";
import "./auth.scss";

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
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.SignUp);

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
      const errorMessage =
        authMode === AuthMode.SignUp
          ? "Error during authentication"
          : "Error Creating Account";
      alert(errorMessage);
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
    const { email, password } = formData!;
    authActions[authMode](email, password);
  };

  return (
    <div className="auth-main">
      <div>
        <form onSubmit={handleSubmit} className="form-main">
          <div className="input-elements">
            <label>Email</label>
            <input
              type="text"
              title="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <div>
              <label>Password</label>
            </div>
            <input
              type="text"
              title="password"
              min={6}
              max={16}
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button>
            {authMode === AuthMode.SignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p className="selections">
          {authMode === AuthMode.SignUp
            ? "Already have an account? "
            : "Don't have an account? "}
          <button
            type="button"
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
