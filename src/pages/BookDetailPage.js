import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { BsCartPlus } from "react-icons/bs"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import AppContext from "../context/AppContext"

export default function BookDetailPage() {
    const { id } = useParams()
    const { token } = useContext(AppContext)
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

        axios.post(`${process.env.REACT_APP_API_URL}/cart`, { bookID: id, quantity }, config)
            .then(res => {
                setIsAddingToCart(false)
                setAddedToCard([true, res.data])
            })
    }

    console.log(addedToCart)

    return (
        <>

            <div>
                <img width={"200px"} src={book.cover} />
                <div>
                    <h1>{book.title}</h1>
                    <h2>{book.author}</h2>
                    <h3>{book.synopsis}</h3>
                    <p>{book.type}</p>
                    {addedToCart[0] && <h1>{addedToCart[1]}</h1>}
                    {isAddingToCart ?
                        <div>
                            <span>R$ {book.price}</span>
                            <input onChange={(e) => setQuantity(e.target.value)} type={"number"} />
                            <button onClick={addToCart} >Adicionar ao carrinho</button>
                        </div>
                        :
                        <div>
                            <Link to="/">
                                <button>Continuar comprando</button>
                            </Link>
                            <Link to="/cart">
                                <button>Ir para o carrinho</button>
                            </Link>
                        </div>

                    }




                </div>
            </div>




        </>

    )
}
