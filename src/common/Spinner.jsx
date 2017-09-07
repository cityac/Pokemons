// @flow
import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Image = styled.img`
  animation: ${spin} 4s infinite linear;
  float: left;
  margin: 10px;
  `;
const Spinner = () =>
  <Image src="/public/img/loading.png" alt="loading indicator"  width="96px" height="96px"/>;

export default Spinner;
