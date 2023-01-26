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
import { formataData, formataReais } from "../util/util";

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
  const [selectedOrder, setSelecterOrder] = useState(null);
  return (
    <>
      <Title>Seus Pedidos</Title>
      <>
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
                <td>{formataData(order.datetime)}</td>
                <td>{formataReais(order.totalPrice)}</td>
                <td>
                  <EyeIcon onClick={() => setSelecterOrder(order._id)} />
                </td>
              </OrderContainer>
            ))}
          </tbody>
        </OrdersContainer>
        {selectedOrder && <OrdersDetail orderID={selectedOrder} />}
      </>
    </>
  );
}

function OrdersDetail({ orderID }) {
  const [order, setOrder] = useState(null);
  const { token } = useContext(AppContext);
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  async function getOrderDetails() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/orders/${orderID}`,
        axiosConfig
      );
      setOrder(response.data);
    } catch (error) {
      alert(error.response?.data || error.message);
    }
  }
  useEffect(() => {
    getOrderDetails();
  }, [orderID]);
  return (
    <>
      {!order ? (
        "Carregando..."
      ) : (
        <>
          <OrderTitle>Pedido #{orderID}</OrderTitle>
          <OrderDetails>
            <TableTitle>
              <td></td>
              <td>Titulo</td>
              <td>Autor</td>
              <td>Qtd.</td>
              <td>Preco Total</td>
              <td>Tipo</td>
              <td></td>
            </TableTitle>
            <tbody>
              {order.books.map((book) => (
                <OrderContainer>
                  <td>
                    <img src={book.book.cover} />
                  </td>
                  <td>{book.book.title}</td>
                  <td>{book.book.author}</td>
                  <td>{book.quantity}</td>
                  <td>{formataReais(book.totalPrice)}</td>
                  <td>
                    {book.book.type === "digital" && "Digital"}
                    {book.book.type === "physical" && "Físico"}
                  </td>
                  <td>
                    {book.book.type === "digital" && (
                      <ButtonStyle>
                        <a href={book.book.downloadLink} target="_blank">
                          Baixar
                        </a>
                      </ButtonStyle>
                    )}
                  </td>
                </OrderContainer>
              ))}
            </tbody>
          </OrderDetails>
        </>
      )}
    </>
  );
}
const EyeIcon = styled(AiFillEye)`
  &:hover {
    cursor: pointer;
  }
`;
const TableTitle = styled.thead`
  td {
    text-align: center;
    font-weight: bold;
  }
`;
const OrderContainer = styled.tr`
  td {
    padding: 5px;
    text-align: center;
    vertical-align: middle;
  }
  img {
    width: 100px;
  }
`;
const OrdersContainer = styled.table`
  tbody {
    tr:nth-child(odd) {
      background-color: #e0edf4;
    }
  }
`;
const OrderDetails = styled.table`
  tbody {
    tr:nth-child(odd) {
      background-color: #e0edf4;
    }
  }
`;
const OrderTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid black;
  margin: 10px 0px;
`;
