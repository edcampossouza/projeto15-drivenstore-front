import axios from "axios"
import { useContext, useEffect, useState } from "react"
import stars from '../assets/images/stars.png'
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import Header from "../components/Header"
import AppContext from "../context/AppContext"
import { formataReais } from "../util/util"
import { IoMdGlobe } from 'react-icons/io'
import {BsCalendar3} from 'react-icons/bs'
import {RxPerson} from 'react-icons/rx'
import {FiBook} from 'react-icons/fi'

export default function BookDetailPage() {
    const { id } = useParams()
    const { token, setCartItems, cartItems } = useContext(AppContext)
    const [book, setBook] = useState([])
    const [quantity, setQuantity] = useState()
    const [isAddingToCart, setIsAddingToCart] = useState(true)
    const [addedToCart, setAddedToCard] = useState([false, ""])
    console.log(id)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/books/${id}`)
            .then(res => {
                setBook(res.data)              
                console.log(res.data)
            })

    }, [])

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    function addToCart() {
        if(token.length <= 0) return alert("Você precisa estar logado para adicionar o livro ao carrinho")

        axios.post(`${process.env.REACT_APP_API_URL}/cart`, { bookID: id, quantity }, config)
            .then(res => {
                setIsAddingToCart(false)
                setAddedToCard([true, res.data])            
            })
    }


    return (
        <>

            <Header />

            <BookContainer>
                <BookImage>
                    <img src={book.cover} />
                </BookImage>
                <BookInfo>
                    <div>
                        <h1>{book.title}</h1>
                        <h2>by {book.author}</h2>
                        <p> <img src={stars} /> 427 avaliações de clientes</p>
                        <h3>{book.synopsis}</h3>

                        {/* <p>{book.type === "physical" && "Capa dura"}</p> */}
                    </div>
                    <div>

                        {addedToCart[0] && <h5>{addedToCart[1]}</h5>}
                        {isAddingToCart ?

                            <div>
                                <span>{formataReais(book.price)}</span>
                                <AddToCart>
                                    <p>Quantidade: </p>
                                    <input onChange={(e) => setQuantity(e.target.value)} type="number" />
                                    <button onClick={addToCart} >Add to cart</button>
                                </AddToCart>
                            </div>
                            :
                            <FinalButtons>
                                <Link to="/">
                                    <button>Continuar comprando</button>
                                </Link>
                                <Link to="/cart">
                                    <button>Ir para o carrinho</button>
                                </Link>
                            </FinalButtons>

                        }

                    </div>
                    <FootNotes>
                        <div>
                        <p>Idioma</p>
                            <IoMdGlobe />
                            <span>Português</span>
                        </div>
                        <div>
                            <p>Data de publicação</p>
                            <BsCalendar3 />
                            <span>14/03/2022</span>
                            
                        </div>
                        <div>
                            <p>Idade para leitura</p>
                            <RxPerson />
                            <span>14+ anos</span>
                            
                        </div>
                        <div>
                            <p>Editora</p>
                            <FiBook />
                            <span>4Letras</span>
                            
                        </div>

                    </FootNotes>


                </BookInfo>

            </BookContainer>

        </>

    )
}


const BookContainer = styled.div`
  display: flex;  
  height: 80%;  
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #e9e9e9;
         h1 {
                font-size: 30px;
                font-weight: 500;
               
            }
            span {
               font-size: 25px;
               font-weight: bold;
            }
            h5 {
                font-size: 20px;
                color: #00bcd4;
            }
            @media (max-width: 800px) {
               flex-direction: column;
               margin-top: 90px;
               height: 140vh;
              
            }
         
   
`

const AddToCart = styled.div`
    display: flex !important;;
    flex-direction: row!important;
    align-items: center;
            input {
                width: 45px;
                height: 20px;
                padding: 10px;
                margin-left: -20px;
                box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.3);
            }
            button {
                width:300px;
                height: 40px;
                background-color: #A9D9CA;
                box-shadow: 0px 5px 10px 3px rgba(0, 0, 0, 0.5);
                &:hover {
                        background-color: #8FB9AC;
                    }
            }
`

const BookImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30vw;
    height: 45vh;

        img {
            width:350px ;
            box-shadow: 0px 5px 10px 3px rgba(0, 0, 0, 0.5);
            @media (max-width: 800px) {
             
                margin-top: 20px;
              
            }
            
        }
        @media (max-width: 800px) {
            margin-bottom: 10px;
              img {
                width: 250px;
               
              }
            }
      

`

const BookInfo = styled.div`
    margin-left: 30px;
    width: 40vw;
    display: flex;
    flex-direction: column;    
    gap: 30px;
        div {
            display: flex;
            flex-direction: column;
            gap: 30px;
        }
        img {
            width: 100px;
        }
        @media (max-width: 1100px) {
            margin-left: 100px;
               
        }
        @media (max-width: 800px) {
            margin-left: 0;
            width: 360px;
            margin-top: 30px;
           
            
               
        }

`

const FootNotes = styled.div`
    display: flex;
    justify-content: space-between!important;
    flex-direction: row!important;
    margin-top: 25px;
            div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center; 
                gap: 20px;
                
            }
            p {
                font-size: 15px;
            }
            span {
                font-weight: bold;
                font-size: 14px;
            }
`

const FinalButtons = styled.div`
    display: flex!important;
    flex-direction: row!important;
        button {
                    width:300px;
                    height: 40px;
                    background-color: #A9D9CA;
                    box-shadow: 0px 5px 10px 3px rgba(0, 0, 0, 0.5);
                    &:hover {
                        background-color: #8FB9AC;
                    }
                    
                }
                @media (max-width: 1500px) {
                     flex-direction: column!important;
                     justify-content: center;
                     align-items: center;

                 }
`   