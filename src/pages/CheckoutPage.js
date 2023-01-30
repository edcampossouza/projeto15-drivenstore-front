import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Header from "../components/Header";
import AppContext from "../context/AppContext";
import { TitleStyle } from "../style/booksPageStyles";
import {
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
  const [logradouro, setLogradouro] = useState("");
  const [salvarEndereco, setSalvarEndereco] = useState(false);

  useEffect(() => {
    async function carregaEndereco() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/address`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response) {
          setLogradouro(response.data.address.line);
          setNumCep(response.data.address.cep);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    carregaEndereco();
  }, []);
  // exibe formato "000-000"
  function cartaoMask(numero) {
    return numero
      .replace(/^(\d{3})/, "$1")
      .replace(/^(\d{3})(\d{1,3})(.*)/, "$1-$2");
  }

  // considera os 6 primeiros caracteres numericos
  function cartaoFilter(numero) {
    return numero.replace(/\D/g, "").substring(0, 6);
  }

  // exibe formato "000000-000"
  function cepMask(numero) {
    return numero
      .replace(/^(\d{5})/, "$1")
      .replace(/^(\d{5})(\d{1,3})(.*)/, "$1-$2");
  }

  // considera os 8 primeiros caracteres numericos
  function cepFilter(numero) {
    return numero.replace(/\D/g, "").substring(0, 8);
  }

  function aplicaFiltro(e, mask) {
    const { value } = e.target;
    return mask(value);
  }

  async function confirmaPedido(e) {
    const checkoutInfo = {
      address: {
        line: logradouro,
        cep: numCep,
      },
      cardNumber: numCartao,
      saveAddress: salvarEndereco,
    };
    e.preventDefault();
    const numItems = cartItems.reduce((p, c) => p + c.quantity, 0);
    if (numItems === 0) {
      alert("Nenhum item no carrinho");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/checkout`,
        checkoutInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data);
      limpaDados();
      navigate("/orders");
    } catch (error) {
      alert(error.response.data);
    }
  }

  function limpaDados() {
    setLogradouro("");
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
      <TitleStyle>
        <h1>Checkout</h1>
      </TitleStyle>
      <PageContainer>
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
                onChange={(e) => setLogradouro(e.target.value)}
                placeholder="Rua x, num 0"
                required
              />
            </InputRow>
            <InputRowCompact>
              <label>Salvar este endereço para próximas compras?</label>
              <input
                type="checkbox"
                value={salvarEndereco}
                onChange={() => setSalvarEndereco(!salvarEndereco)}
              ></input>
            </InputRowCompact>
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

const InputRowCompact = styled(InputRow)`
  justify-content: flex-start;
  input {
    width: 50px;
  }
  label {
    vertical-align: bottom;
  }
  align-items: flex-end;
`;
