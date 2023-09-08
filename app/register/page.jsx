"use client";

import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

import Pokeball from "@/app/assets/pokeball.webp";
import CenteredScreenWrapper from "../components/CenteredScreenWrapper";
import UnstyledButton from "../components/UnstyledButton/UnstyledButton";
import { COLORS, WEIGHTS } from "../constants";
import Spacer from "../components/Spacer/Spacer";
import { useRouter } from "next/navigation";
import signUp from "../firebase/auth/signUp";
import { useState } from "react";
import { getErrorMessage } from "../firebase/auth/errorHandle";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { push } = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    setErrorMessage("");
    setIsLoading(true);

    const { error, result } = await signUp(
      formData.name,
      formData.email,
      formData.password
    );

    if (error) {
      setIsLoading(false);
      return setErrorMessage(getErrorMessage(error.code));
    } else {
      setIsLoading(false);
      setFormData({
        name: "",
        email: "",
        password: "",
      });

      return push("/");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <CenteredScreenWrapper>
      <Image src={Pokeball} width={50} height={50} alt="pokeball" />
      <Title>Register an account</Title>
      <Spacer size={48} />
      <Form onSubmit={handleSubmit}>
        {errorMessage && (
          <>
            <ErrorWrapper>{errorMessage}</ErrorWrapper>
            <Spacer size={12} />
          </>
        )}
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          required
        />
        <Spacer size={24} />
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          name="email"
          onChange={handleChange}
          required
        />
        <Spacer size={24} />
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          required
        />
        <Spacer size={24} />
        <Button type="submit" disabled={isLoading}>
          Register
        </Button>
      </Form>
      <Spacer size={24} />
      <span>
        Already have an account? <SignInLink href="/signin">Sign in</SignInLink>
      </span>
      <Spacer size={102} />
    </CenteredScreenWrapper>
  );
}

const ErrorWrapper = styled.div`
  width: 100%;
  text-align: center;
  border-radius: 4px;
  padding: 4px 8px;
  color: red;
  font-size: ${14 / 16}rem;
  background-color: hsl(0 80% 70% / 10%);
  border: 2px solid hsl(0 80% 70%);
`;

const Title = styled.h1`
  font-size: ${24 / 16}rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 4px 8px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 350px;
`;

const Button = styled(UnstyledButton)`
  background-color: ${COLORS.primary[600]};
  color: ${COLORS.light[700]};
  padding: 8px 12px;
  border-radius: 8px;
  width: 100%;
  text-align: center;
  font-weight: ${WEIGHTS.bold};
  transition: all 200ms ease;

  &:hover {
    background-color: ${COLORS.primary[700]};
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const SignInLink = styled(Link)`
  text-decoration: none;
  color: ${COLORS.secondary[900]};
`;
