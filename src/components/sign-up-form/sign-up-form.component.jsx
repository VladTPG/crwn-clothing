/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  auth,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-up-form.styles.scss";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);
      await createUserDocumentFromAuth(user, {
        displayName,
      });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else console.log(error.message);
    }
  };

  const signUpForm = [
    {
      label: "Display name",
      required: true,
      type: "text",
      onChange: handleChange,
      name: "displayName",
      value: displayName,
    },
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
    {
      label: "Confirm password",
      required: true,
      type: "password",
      onChange: handleChange,
      name: "confirmPassword",
      value: confirmPassword,
    },
  ];

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span className="">Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        {signUpForm.map((formInput) => (
          <FormInput key={formInput.label} {...formInput}></FormInput>
        ))}

        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
