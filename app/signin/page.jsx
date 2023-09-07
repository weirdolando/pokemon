"use client";

import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

import Pokeball from "@/app/assets/pokeball.webp";
import CenteredScreenWrapper from "../components/CenteredScreenWrapper";
import UnstyledButton from "../components/UnstyledButton/UnstyledButton";
import { COLORS, WEIGHTS } from "../constants";
import Spacer from "../components/Spacer/Spacer";

export default function Login() {
  return (
    <CenteredScreenWrapper>
      <Image src={Pokeball} width={50} height={50} />
      <Title>Sign in to your account</Title>
      <Spacer size={48} />
      <Form>
        <Label htmlFor="email">Email address</Label>
        <Input id="email" type="email" name="email" required />
        <Spacer size={24} />
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" name="password" required />
        <Spacer size={24} />
        <Button type="submit">Log In</Button>
      </Form>
      <Spacer size={24} />
      <span>
        Don't have an account?{" "}
        <RegisterLink href="/register">Register</RegisterLink>
      </span>
      <Spacer size={102} />
    </CenteredScreenWrapper>
  );
}

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
`;

const RegisterLink = styled(Link)`
  text-decoration: none;
  color: ${COLORS.secondary[900]};
`;
