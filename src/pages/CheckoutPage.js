import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const { cartItems } = useContext(AppContext);
  const [valor, setValor] = useState(0);
  const [items, setItems] = useState(0);

  const [numCartao, setNumCartao] = useState("");

  useEffect(() => {
    setValor(cartItems.reduce((p, c) => p + c.price, 0));
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
        <StyledForm>
          <StyledSection>
            <h2>Dados do pagamento</h2>
            <InputRow>
              <label>Numero do Cartao:</label>
              <input value={numCartao} placeholder="000-000" required />
            </InputRow>
          </StyledSection>
          <StyledSection>
            <h2>Dados da Entrega</h2>
            <InputRow>
              <label>CEP:</label>
              <input value={numCartao} placeholder="00000-000" required />
            </InputRow>
            <InputRow>
              <label>Logradouro:</label>
              <input
                class="logradouro"
                value={numCartao}
                placeholder="Rua x, num 0"
                required
              />
            </InputRow>
            <InputRow>
              <span></span>
              <ButtonStyle>Confirmar Pedido</ButtonStyle>
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
