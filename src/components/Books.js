

import axios from "axios"
import { useEffect, useState } from "react"
import { BsCartPlus } from "react-icons/bs"
import { Link, useLocation } from "react-router-dom"
import Header from "../components/Header.js"
import {
    BookPageContainer,
    TitleStyle,
    BookContainer,
    BookInfo
} from '../style/booksPageStyles.js'
import { formataReais } from "../util/util.js"

export default function Books() {
    const { pathname } = useLocation()
    const [allBooks, setAllBooks] = useState([])
    useEffect(() => {
        if (pathname === "/books/best-sellers") {
            axios.get(`${process.env.REACT_APP_API_URL}/books?category=best-sellers`)
                .then(res => {
                    setAllBooks(res.data)
                    console.log("Mais Vendidos", res.data)
                })
        } else if (pathname === "/books/newest") {

            axios.get(`${process.env.REACT_APP_API_URL}/books?category=newest`)
                .then(res => {
                    setAllBooks(res.data)
                    console.log("MaisNovos", res.data)
                })
        } else {

            axios.get(`${process.env.REACT_APP_API_URL}/books`)
                .then(res => {
                    setAllBooks(res.data)
                    console.log("todosOsLivros", res.data)
                })

        }
    }, [])

    return (
        <>
            <Header />

            <TitleStyle>
                {
                    pathname === "/books" ? <h1>Conheça nossos livros!</h1> : pathname === "/books/newest" ? <h1>Veja os Lançamentos!</h1> : <h1>Veja os mais vendidos!</h1>
                }
                
            </TitleStyle>

            <BookPageContainer>
                {allBooks.map((book) =>
                    <Link to={`/book-detail/${book._id}`}>
                        <BookContainer>
                            <img src={book.cover} />
                            <BookInfo>
                                <h2>{book.title}</h2>
                                <h3>by {book.author}</h3>
                                <div>
                                    <p>{formataReais(book.price)}</p>
                                    <Link to={`/book-detail/${book._id}`} >
                                        <button><span>Add to cart</span><BsCartPlus /></button>
                                    </Link>
                                </div>
                            </BookInfo>
                        </BookContainer>
                    </Link>

                )}
            </BookPageContainer>
        </>


    )
}