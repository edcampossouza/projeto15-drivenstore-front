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
import { formataReais } from "../util/util";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const { cartItems, setCartItems, token } = useContext(AppContext);
  const [valor, setValor] = useState(0);
  const [items, setItems] = useState(0);

  const [numCartao, setNumCartao] = useState("");
  const [numCep, setNumCep] = useState("");
  const [logradouro, setEndereco] = useState("");

  // exibe formato "000-000"
  function cartaoMask(numero) {
    return numero
      .replace(/^(\d{3})/, "$1")
      .replace(/^(\d{3})(\d{1,3})(.*)/, "$1-$2");
  }

  // considera os 6 primeiros caracteres numericos
  function cartaoFilter(numero) {
    return numero.replace(/\D/g, "").replace(/$(\d{6})(.*)/, "$1");
  }

  // exibe formato "000000-000"
  function cepMask(numero) {
    return numero
      .replace(/^(\d{5})/, "$1")
      .replace(/^(\d{5})(\d{1,3})(.*)/, "$1-$2");
  }

  // considera os 8 primeiros caracteres numericos
  function cepFilter(numero) {
    return numero.replace(/\D/g, "").replace(/$(\d{8})(.*)/, "$1");
  }

  function aplicaFiltro(e, mask) {
    const { value } = e.target;
    return mask(value);
  }

  async function confirmaPedido(e) {
    e.preventDefault();
    const numItems = cartItems.reduce((p, c) => p + c.quantity, 0);
    if (numItems === 0) {
      alert("Nenhum item no carrinho");
      return;
    }
    alert("itens: " + cartItems);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/checkout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data);
      limpaDados();
      navigate("/");
    } catch (error) {
      alert(error.response.data);
    }
  }

  function limpaDados() {
    setEndereco("");
    setNumCartao("");
    setNumCep("");
    setCartItems([]);
  }

  useEffect(() => {
    setValor(cartItems.reduce((p, c) => p + c.price * c.quantity, 0));
    setItems(cartItems.reduce((p, c) => p + c.quantity, 0));
  }, [cartItems]);

  return (
    <>
      <Header />
      <PageContainer>
        <Title>Checkout</Title>
        <StyledSection>
          <h2>Totais</h2>
          <p> Valor total: {formataReais(valor)}</p>
          <p>Itens no carrinho: {items}</p>
        </StyledSection>
        <StyledForm onSubmit={confirmaPedido}>
          <StyledSection>
            <h2>Dados do pagamento</h2>
            <InputRow>
              <label>Numero do Cartao:</label>
              <input
                value={cartaoMask(numCartao)}
                onChange={(e) => setNumCartao(aplicaFiltro(e, cartaoFilter))}
                placeholder="000-000"
                required
              />
            </InputRow>
          </StyledSection>
          <StyledSection>
            <h2>Dados da Entrega</h2>
            <InputRow>
              <label>CEP:</label>
              <input
                value={cepMask(numCep)}
                placeholder="00000-000"
                onChange={(e) => setNumCep(aplicaFiltro(e, cepFilter))}
                required
              />
            </InputRow>
            <InputRow>
              <label>Logradouro:</label>
              <input
                class="logradouro"
                value={logradouro}
                onChange={(e) => setEndereco(e.target.value)}
                placeholder="Rua x, num 0"
                required
              />
            </InputRow>
            <InputRow>
              <span></span>
              <ButtonStyle type="submit">Confirmar Pedido</ButtonStyle>
            </InputRow>
          </StyledSection>
        </StyledForm>

        <ButtonsContainer>
          <ButtonStyle>
            <Link to="/cart">Ver Carrinho</Link>
          </ButtonStyle>
          <ButtonStyle>
            <Link to="/">Continuar comprando</Link>
          </ButtonStyle>
        </ButtonsContainer>
      </PageContainer>
    </>
  );
}

const StyledSection = styled.section`
  margin-bottom: 20px;
  width: 715px;
  h2 {
    font-size: 20px;
  }
  input {
    border: 1px solid black;
    height: 25px;
    border-radius: 5px;
    margin-left: 5px;
    text-align: center;
    ::placeholder {
      text-align: center;
    }
  }
  input.logradouro {
    width: 250px;
  }
  @media screen and (max-width: 715px) {
    width: 100%;
  }
`;
const StyledForm = styled.form`
  width: 715px;
  @media screen and (max-width: 715px) {
    width: 100%;
  }
`;
const InputRow = styled.div`
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
`;
