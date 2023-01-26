import styled from "styled-components";

export const Title = styled.h1`
  font-size: 36px;
`;

export const PageContainer = styled.div`
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
`;

export const ButtonStyle = styled.button`
  background-color: #6383a7;
  font-size: 16px;
  height: 40px;
  border-radius: 5px;
  color: white;
  margin-bottom: 5px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    color: white;
  }
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    border: none;
    width: 200px;
    border-radius: 5px;
    margin: 10px 15px;
  }
  @media (max-width: 715px) {
    flex-direction: column;
    align-items: center;
  }
`;
