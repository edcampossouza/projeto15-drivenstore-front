import { useContext, useEffect, useInsertionEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import AppContext from "../context/AppContext"
import { BsHandbag } from 'react-icons/bs';
import { BsChatSquare } from 'react-icons/bs'
import axios from "axios";
import logo from '../assets/images/logo2.png'
import { RxHamburgerMenu } from 'react-icons/rx'
import {RiCloseLine} from 'react-icons/ri'
import {BiLogOut} from 'react-icons/bi'

export default function Header() {
    const { token, setToken, cartItems } = useContext(AppContext)
    const [cart, setCart] = useState([])
    const [open, setOpen] = useState(false)


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
            <Blur open={open} onClick={() => setOpen(false)} ></Blur>
            <Link to="/">
                <h1>Booksly</h1>
            </Link>
            <nav>
                <Menu open={open} > 
                      
                      <Link to="/" >
                        <span>Home</span>
                    </Link>
                    <Link to="/books" >
                        <span>Livros</span>
                    </Link>
                    <span>Lançamentos</span>
                    <span>Mais vendidos</span>
                    {token.length <= 0 ?

                        <Link to="/sign-in">
                            <span>Login</span>
                        </Link>
                        :
                        <Link to="/" onClick={() => {
                            setToken([])
                            window.location.reload()
                            }}>
                        <span><BiLogOut size="1.4em" /></span>
                        </Link>
                    }
                </Menu>
                <MobileMenu >
                    {!open ? <RxHamburgerMenu onClick={() => {setOpen(!open)}} /> : <RiCloseLine onClick={() => {setOpen(!open)}}/>}
                    
                </MobileMenu>
                <div>
                    <Link to="/cart">
                        <BsHandbag size="1.6em" />
                    </Link>
                    <p>{cart}</p>

                </div>
            </nav>

        </HeaderStyle>
    )
}

const Blur = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 90px;
    display: none!important;
    left: 0;
    z-index: 1;
    
        @media(max-width: 900px) {
            display: ${props => props.open ? 'block!important' : 'none!important'};
            backdrop-filter: blur(5px);
            
            
        }
   
`

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
                div {
                    display: flex;
                    gap: 20px;
                }
        }
        img {
            width: 200px;
          
        }
        p {
            margin-right: 200px;
            font-size: 13px;
            margin-left: -20px;
            @media(max-width:1300px) {
                margin-right: 80px;
            }
            @media(max-width:900px) {
                margin-right: 20px;
            }
        }
        
       
        h1 {
            font-size: 50px;
            margin-left: 200px;
            @media(max-width:1300px) {
                margin-left: 80px;
            }
            @media(max-width:900px) {
                margin-left: 20px;
            }
        }
        span {
            cursor: pointer;
            &:hover {
                text-decoration: underline;
                color: white;
            }
            @media(max-width: 900px) {
                font-size: 20px;     
                
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

const Menu = styled.div`
        @media(max-width:900px) {
        visibility: ${props => props.open ? 'visible!important' : 'hidden!important'};
        display: flex;
        position: absolute;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        top: 89px;
        right: 0px;
        width: 50vw;
        height: calc(100vh - 90px);
       background-color: #606d8e;           
        padding: 40px;
        z-index: 2;
    }
`

const MobileMenu = styled.div`
    font-size: 30px;
    display: none!important;;
    @media(max-width:900px) {
        display: block!important;
    }

    
`