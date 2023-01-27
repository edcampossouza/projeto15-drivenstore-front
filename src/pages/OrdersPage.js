import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import AppContext from "../context/AppContext";
import Header from "../components/Header";
import { TitleStyle } from "./BooksPage";
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
      {orders.length === 0 ? <NoOrders /> : <OrdersTable orders={orders} />}
    </>
  );
}

function NoOrders() {
  return (
    <>
      <TitleStyle>
        <h1>Você ainda não tem nenhum pedido!</h1>
      </TitleStyle>
      <PageContainer>
        <ButtonsContainer>
          <Link to={"/"}>
            <ButtonStyle>Continuar comprando</ButtonStyle>
          </Link>
          <Link to={"/cart"}>
            <ButtonStyle>Meu Carrinho</ButtonStyle>
          </Link>
        </ButtonsContainer>
      </PageContainer>
    </>
  );
}

function OrdersTable({ orders }) {
  const [selectedOrder, setSelecterOrder] = useState(null);
  return (
    <>
      <TitleStyle>
        <h1>Seus Pedidos</h1>
      </TitleStyle>
      <PageContainer>
        <OrdersContainer>
          <TableTitle>
            <tr>
              <td>Pedido</td>
              <td>Data</td>
              <td>Valor</td>
              <td>Detalhes</td>
            </tr>
          </TableTitle>
          <tbody>
            {orders.map((order) => (
              <OrderContainer key={order._id}>
                <td className="wide">{order._id}</td>
                <td className="narrow">{order._id.substring(15, 24)}</td>
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
      </PageContainer>
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
          <OrderWide order={order} />
          <OrderNarrow order={order} />
        </>
      )}
    </>
  );
}

function OrderWide({ order }) {
  return (
    <WideContainer>
      <OrderTitle>Pedido #{order._id}</OrderTitle>
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
    </WideContainer>
  );
}

function OrderNarrow({ order }) {
  return (
    <NarrowContainer>
      <OrderTitle>Pedido #{order._id}</OrderTitle>
      <OrderDetails>
        <TableTitle>
          <td></td>
          <td>Detalhes</td>
          <td></td>
        </TableTitle>
        <tbody>
          {order.books.map((book) => (
            <OrderContainer>
              <td>
                <img src={book.book.cover} />
              </td>
              <InnerTable>
                <tbody>
                  <tr>
                    <td>{book.book.title}</td>
                  </tr>
                  <tr>
                    <td>{book.book.author}</td>
                  </tr>
                  <tr>
                    <td>
                      {book.quantity} unidade{book.quantity > 1 && "s"}
                    </td>
                  </tr>
                  <tr>
                    <td>{formataReais(book.totalPrice)}</td>
                  </tr>
                  <tr>
                    <td>
                      {book.book.type === "digital" && "Digital"}
                      {book.book.type === "physical" && "Físico"}
                    </td>
                  </tr>
                </tbody>
              </InnerTable>

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
    </NarrowContainer>
  );
}

const WideContainer = styled.div`
  @media (max-width: 715px) {
    display: none;
  }
`;
const NarrowContainer = styled.div`
  @media (min-width: 716px) {
    display: none;
  }
`;

const InnerTable = styled.table`
  tbody {
    tr:nth-child(odd) {
      background-color: #e0edf4;
    }
    tr:nth-child(even) {
      background-color: #9ba5be;
    }
  }
`;
const EyeIcon = styled(AiFillEye)`
  &:hover {
    cursor: pointer;
  }
`;
const TableTitle = styled.thead`
  td {
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    padding: 5px 10px;
  }
`;
const OrderContainer = styled.tr`
  td {
    padding: 5px;
    text-align: center;
    vertical-align: middle;
  }
  @media (max-width: 715px) {
    td.wide {
      display: none;
    }
  }
  @media (min-width: 716px) {
    td.narrow {
      display: none;
    }
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
    tr:nth-child(even) {
      background-color: #ffffff;
    }
  }
  @media (max-width: 715px) {
    > tbody {
      tr:nth-child(odd) {
        background-color: #ffffff;
      }
      tr:nth-child(even) {
        background-color: #ffffff;
      }
    }
  }
`;
const OrderTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid black;
  text-align: center;
  margin: 20px 0px;
`;
