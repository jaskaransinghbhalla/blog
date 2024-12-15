import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import InputForm from "../components/Input";
import { SignInFormType } from "../types";

export default function SignIn() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState<boolean>(false);
  const jwtToken = localStorage.getItem("token");
  const BACKEND_HOST = "http://localhost:8787";
  if (jwtToken) {
    setInterval(() => navigate("/blogs"), 2000);
    return (
      <div className="text-3xl flex flex-col justify-center items-center h-screen">
        <div>You have logged in already. </div>
        <div>Redirecting you to the Blogs Page </div>
      </div>
    );
  }
  const [formInput, setFormInput] = useState<SignInFormType>({
    email: "",
    password: "",
  });

  const handleSignIn = () => {
    try {
      setLoader(true);
      axios
        .post(`${BACKEND_HOST}/api/v1/user/signin`, formInput)
        .then((response) => {
          localStorage.setItem("token", response.data.jwt);
          console.log("Signed In successful", response.data);
          setLoader(false);
          navigate("/blogs");
        });
    } catch (e) {
      console.log(e);
      alert(
        "Error while Signing In. Please check the credentials and Try Again"
      );
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInput((prevInput) => ({
      ...prevInput,
      [name.toLocaleLowerCase()]: value,
    }));
  };
  return (
    <div>
      {loader && <div>Loading</div>}
      <div className="grid grid-cols-1 lg:grid-cols-2 ">
        {/* Left */}
        <div className="bg-white-400 flex justify-center items-center h-screen">
          <div className=" w-full flex flex-col justify-center items-center">
            <div className="text-2xl font-bold">Login Account</div>
            <div className="text-gray-600 mt-2 mb-4">
              Do not have a Account{" "}
              <span
                onClick={() => {
                  navigate("/signup");
                }}
                className="underline"
              >
                Signup?
              </span>
            </div>
            <div className="flex flex-col mx-2">
              <InputForm
                onChange={handleChange}
                placeholder="Email"
                name="Email"
                type="email"
                value={formInput.email}
              />
              <InputForm
                onChange={handleChange}
                placeholder="Password"
                name="Password"
                type="password"
                value={formInput.password}
              />
              <Button text="Signin" onClick={handleSignIn}></Button>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="bg-gray-200 flex justify-center items-center invisible lg:visible h-screen">
          <div className="px-8 col-span-2">
            <div className="font-semibold text-3xl">
              "It is good to hear what community feels like through an open
              platform."
            </div>
            <div className="my-4">
              <div className="font-bold">Suman Kumar Sharma</div>
              <div className="text-gray-500">Director, Anemeshia</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
