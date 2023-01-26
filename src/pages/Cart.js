import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import AppContext from "../context/AppContext";

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
  console.log(cartItems)
  return (
    <>
      <Header />
      {loading ? (
        "Carregando..."
      ) : (
        <>
          {cartItems.length < 1 ? (
            <>
              <Title>Seu carrinho está vazio</Title>
              <ButtonsContainer>
                <Link to={"/"}>
                  <Button>Continuar comprando</Button>
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
                  <td>Quantidade</td>
                </TableTitle>
                <CartItems>
                  {cartItems.map((item) => (
                    <ItemRow key={item._id}>
                      <td>
                        <img src={item.cover} alt={`cover ${item.title}`} />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.quantity}</td>
                      <td onClick={() => removeLivro(item)}>
                        <DeleteBtn>Remover</DeleteBtn>
                      </td>
                    </ItemRow>
                  ))}
                </CartItems>
              </CartContainer>
              <ButtonsContainer>
                <Link to={"/"}>
                  <Button>Continuar comprando</Button>
                </Link>
                <Button>Checkout</Button>
              </ButtonsContainer>
            </>
          )}
        </>
      )}
    </>
  );
}

const Title = styled.h1`
  font-size: 36px;
`;
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
const Button = styled.button``;
const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  Button {
    border: none;
    border-radius: 5px;
  }
`;
const DeleteBtn = styled.button`
  border: none;
  :hover {
    cursor: pointer;
  }
`;
