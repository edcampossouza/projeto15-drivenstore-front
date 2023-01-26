import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import AppContext from "../context/AppContext";
import Header from "../components/Header";
import axios from "axios";
import {
  PageContainer,
  Title,
  ButtonsContainer,
  ButtonStyle,
} from "../style/sharedStyles";
import styled from "styled-components";
import { formataDataHora, formataReais } from "../util/util";

export default function OrdersPage() {
  const { orders, setOrders, token } = useContext(AppContext);
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/orders`,
          axiosConfig
        );
        setOrders(response.data);
      } catch (error) {
        alert(error.response?.data || error.message);
      }
    }
    getOrders();
  }, []);
  return (
    <>
      <Header />
      <PageContainer>
        {orders.length === 0 ? <NoOrders /> : <OrdersTable orders={orders} />}
      </PageContainer>
    </>
  );
}

function NoOrders() {
  return (
    <>
      <Title>Você ainda não tem nenhum pedido!</Title>
      <ButtonsContainer>
        <Link to={"/"}>
          <ButtonStyle>Continuar comprando</ButtonStyle>
        </Link>
        <Link to={"/cart"}>
          <ButtonStyle>Meu Carrinho</ButtonStyle>
        </Link>
      </ButtonsContainer>
    </>
  );
}

function OrdersTable({ orders }) {
  return (
    <>
      <Title>Seus Pedidos</Title>
      <OrdersContainer>
        <thead>
          <tr>
            <td>Pedido</td>
            <td>Data/hora</td>
            <td>Valor</td>
            <td>Detalhes</td>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderContainer key={order._id}>
              <td>{order._id}</td>
              <td>{formataDataHora(order.datetime)}</td>
              <td>{formataReais(order.totalPrice)}</td>
              <td>
                <EyeIcon onClick={() => console.log("xx")} />
              </td>
            </OrderContainer>
          ))}
        </tbody>
      </OrdersContainer>
    </>
  );
}

const EyeIcon = styled(AiFillEye)`
  &:hover {
    cursor: pointer;
  }
`;
const OrderContainer = styled.tr`
  td {
    padding: 5px;
    text-align: center;
  }
`;
const OrdersContainer = styled.table`
  tbody {
    tr:nth-child(even) {
      background-color: #e0edf4;
    }
  }
`;
