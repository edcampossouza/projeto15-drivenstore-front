import { useContext, useEffect, useInsertionEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import AppContext from "../context/AppContext"
import { BsHandbag } from 'react-icons/bs';
import { BsChatSquare } from 'react-icons/bs'
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

    useEffect(() => {
        const cartQuantity = cartItems.reduce((s, a) => Number(s) + Number(a.quantity), 0)
        setCart(cartQuantity)
    }, [cartItems])


    return (
        <HeaderStyle>
            <Link to="/">
                <h1>Booksly</h1>
            </Link>
            <nav>
                <Link to="/" >
                <span>Home</span>
                </Link>
                <Link to="/books" >
                <span>Livros</span>
                </Link>
                <span>Lançamentos</span>
                <span>Mais vendidos</span>
                {token.length <= 0 &&
                    <Buttons>
                        <Link to="/sign-in">
                            <button>Login</button>
                        </Link>
                    </Buttons>


                    // <h2>{`Olá, ${user}`}</h2>
                }
               
                    <Link to="/cart">
                        <BsHandbag size="1.6em" />
                    </Link>                    
                    <p>{cart}</p>



            </nav>


        </HeaderStyle>
    )
}

const HeaderStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 90px;
    background-color: #9BA5BE;
    width: 100%;    
    border-bottom: 1px solid #dfdddd;
    font-family: 'Libre Bodoni', sans-serif;
    position: fixed;
    top: 0;
    z-index: 1;
   
        nav {
            display: flex;
            align-items: center;
            gap: 30px;
            
            
        }
        img {
            width: 200px;
          
        }
        p {
            margin-right: 200px;
            font-size: 13px;
            margin-left: -20px;
           
        }
        
       
        h1 {
            font-size: 40px;
            margin-left: 200px;
        }
        span {
            cursor: pointer;
            &:hover {
                text-decoration: underline;
                color: white;
            }
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
            background-color: #9BA5BE;
            font-size:16px;          
            &:hover{
                text-decoration: underline;
                color: #e9e9e9;
            }
        }
`