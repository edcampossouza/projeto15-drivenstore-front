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
    min-height: 90px;
    background-color: #e0edf4;
    width: 100%;
    
    //border-bottom: 1px solid #dfdddd;
    font-family: 'Libre Bodoni', sans-serif;
        nav {
            display: flex;
            gap: 10px;
            margin-right: 200px;
        }
        img {
            width: 200px;
          
        }
        p {
            margin-right: 200px;
        }
        h1 {
            font-size: 40px;
            margin-left: 200px;
        }
        @media (max-width: 715px) {
            justify-content: space-around;
            h1 {
                margin-left: 0;
            }
            p {
                margin-right: 0;
            }
            
            h2 {
                display: none;
            }
            nav {
                margin-right: 0;
            }
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