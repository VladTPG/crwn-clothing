/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  auth,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { signinWithGooglePopup } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss";
const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const resetPasswordField = () => {
    setFormFields({ ...formFields, password: defaultFormFields.password });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInUserWithEmailAndPassword(email, password);
      console.log(response);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("User not found, please sign up");
          resetFormFields();
          break;
        case "auth/wrong-password":
          alert("Wrong password, please try again");
          resetPasswordField();
          break;
        case "auth/too-many-requests":
          alert("Too many attempts, please try again later");
          resetFormFields();
          break;
        default:
          console.log(error);
          break;
      }
    }
  };

  const signUpForm = [
    {
      label: "Email",
      required: true,
      type: "email",
      onChange: handleChange,
      name: "email",
      value: email,
    },
    {
      label: "Password",
      required: true,
      type: "password",
      onChange: handleChange,
      name: "password",
      value: password,
    },
  ];

  const signInWithGoogle = async () => {
    const { user } = await signinWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span className="">Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        {signUpForm.map((formInput) => (
          <FormInput key={formInput.label} {...formInput}></FormInput>
        ))}

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={"google"}
            onClick={signInWithGoogle}
          >
            Google Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
