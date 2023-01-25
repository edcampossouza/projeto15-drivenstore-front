import { useContext, useEffect, useInsertionEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import AppContext from "../context/AppContext"
import { AiOutlineShoppingCart } from 'react-icons/ai';
import axios from "axios";


export default function Header() {
    const { token, userId } = useContext(AppContext)
    const [cart, setCart] = useState([])
    
    useEffect(() => {
        if (token.length > 0) {

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            console.log(userId)
    
            axios.get(`${process.env.REACT_APP_API_URL}/cart`, config)
                .then(res => {
                    const cartQuantity = (res.data).reduce((s,a) => Number(s) + Number(a.quantity), 0 )
                    setCart(cartQuantity)
                    console.log(cartQuantity)
                })
    
        }
    

    }, [])

 


    return (
        <HeaderStyle>
            <div>LOGO DA LOJA</div>
            <nav>
                {console.log(cart)}
                {token.length <= 0 &&
                    <Buttons>
                        <Link to="/sign-in">
                            <button>Login</button>
                        </Link>
                        <Link to="/sign-up">
                            <button>Cadastro</button>
                        </Link>
                    </Buttons>
                }
                <AiOutlineShoppingCart />
                {cart}

            </nav>


        </HeaderStyle>
    )
}

const HeaderStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    min-height: 60px;
    background-color: rebeccapurple;
        nav {
            display: flex;
            gap: 10px;
        }
`

const Buttons = styled.div`
    display: flex;
    gap: 10px;
    height: 20px;
    align-items: center;
    justify-content: center;
`