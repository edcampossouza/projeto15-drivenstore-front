import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import AppContext from "../context/AppContext";
import {
  Title,
  ButtonStyle,
  ButtonsContainer,
  PageContainer,
} from "../style/sharedStyles";
export default function Cart() {
  const { cartItems, setCartItems } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AppContext);
  useEffect(() => {
    buscaItems();
  }, []);
  async function buscaItems() {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/cart`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(response.data);
    } catch (error) {
      alert(error.response.data);
    } finally {
      setLoading(false);
    }
  }
  async function removeLivro(livro) {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/cart/${livro._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      buscaItems();
    } catch (error) {
      alert(error.response.data);
    }
  }
  console.log(cartItems);
  return (
    <>
      <Header />
      <PageContainer>
        {loading ? (
          "Carregando..."
        ) : (
          <>
            {cartItems.length < 1 ? (
              <>
                <Title>Seu carrinho está vazio</Title>
                <ButtonsContainer>
                  <Link to={"/"}>
                    <ButtonStyle>Continuar comprando</ButtonStyle>
                  </Link>
                  <Link to={"/orders"}>
                    <ButtonStyle>Meus Pedidos</ButtonStyle>
                  </Link>
                </ButtonsContainer>
              </>
            ) : (
              <>
                <Title>Seu carrinho</Title>
                <CartContainer>
                  <TableTitle>
                    <td>Capa</td>
                    <td>Titulo</td>
                    <td>Qtd.</td>
                  </TableTitle>
                  <CartItems>
                    {cartItems.map((item) => (
                      <ItemRow key={item._id}>
                        <td>
                          <img src={item.cover} alt={`cover ${item.title}`} />
                        </td>
                        <td>
                          <Link to={`/book-detail/${item.bookID}`}>
                            {item.title}
                          </Link>
                        </td>
                        <td>{item.quantity}</td>
                        <td onClick={() => removeLivro(item)}>
                          <ButtonStyle>Remover</ButtonStyle>
                        </td>
                      </ItemRow>
                    ))}
                  </CartItems>
                </CartContainer>
                <ButtonsContainer>
                  <Link to={"/"}>
                    <ButtonStyle>Continuar comprando</ButtonStyle>
                  </Link>
                  <Link to={"/checkout"}>
                    <ButtonStyle>Checkout</ButtonStyle>
                  </Link>
                </ButtonsContainer>
              </>
            )}
          </>
        )}
      </PageContainer>
    </>
  );
}

const TableTitle = styled.thead`
  text-align: center;
`;
const CartContainer = styled.table``;
const CartItems = styled.tbody``;
const ItemRow = styled.tr`
  img {
    width: 100px;
  }
  td {
    vertical-align: middle;
    text-align: center;
  }
`;
