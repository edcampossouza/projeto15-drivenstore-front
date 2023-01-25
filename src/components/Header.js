import { useContext, useEffect, useInsertionEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import AppContext from "../context/AppContext"
import { AiOutlineShoppingCart } from 'react-icons/ai';
import axios from "axios";
import logo from '../assets/images/logo2.png'

export default function Header() {
    const { token, user, cartItems } = useContext(AppContext)
    const [cart, setCart] = useState([])
    console.log(user)

    useEffect(() => {
        if (token.length > 0) {

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }


            axios.get(`${process.env.REACT_APP_API_URL}/cart`, config)
                .then(res => {
                    const cartQuantity = (res.data).reduce((s, a) => Number(s) + Number(a.quantity), 0)
                    setCart(cartQuantity)
                    console.log(cartQuantity)
                })

        }


    }, [])

 
    useEffect(()=>{
        const cartQuantity = cartItems.reduce((s,a) => Number(s) + Number(a.quantity), 0 )
        setCart(cartQuantity)
    },[cartItems])

    return (
        <HeaderStyle>

            <h1>Booksly</h1>
            <nav>
                {console.log(cart)}
                {token.length <= 0 ?
                    <Buttons>
                        <Link to="/sign-in">
                            <button>Login</button>
                        </Link>
                    </Buttons>
                    :

                    <h2>{`Olá, ${user}`}</h2>
                }
                 <Link to="/cart">
                    <AiOutlineShoppingCart />
                </Link>
                {cart}

            </nav>


        </HeaderStyle>
    )
}

const HeaderStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 80px;
    background-color: #e0edf4;
    width: 100%;
    
    //border-bottom: 1px solid #dfdddd;
    font-family: 'Libre Bodoni', sans-serif;
        nav {
            display: flex;
            gap: 10px;
        }
`

const Buttons = styled.div`
    margin-right: 30px;
    display: flex;
    gap: 30px;
    height: 20px;
    align-items: center;
    justify-content: center;
        button {
            background-color: #e0edf4;
         
           font-size:15px ;
            &:hover{
                text-decoration: underline;
            }
        }
`