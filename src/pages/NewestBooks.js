// import axios from "axios"
// import { useEffect, useState } from "react"
// import { BsCartPlus } from "react-icons/bs"
// import { Link } from "react-router-dom"

// import Header from "../components/Header.js"
// import {
//     BookPageContainer,
//     TitleStyle,
//     BookContainer,
//     BookInfo
// } from '../style/booksPageStyles.js'
// import { formataReais } from "../util/util.js"
import Books from "../components/Books.js"

export default function NewestBooks() {
    // const [books, setBooks] = useState([])
    // useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_API_URL}/books?category=newest`)
    //     .then(res => setBooks(res.data))
    // }, [])
    return (
        <Books/>
        // <>
        //     <Header />
         
        //     <TitleStyle>
        //         <h1>Veja os Lançamentos!</h1>
        //     </TitleStyle>

        //     <BookPageContainer>
        //         {books.map((book) =>
        //             <Link to={`/book-detail/${book._id}`}>
        //                 <BookContainer>
        //                     <img src={book.cover} />
        //                     <BookInfo>
        //                         <h2>{book.title}</h2>
        //                         <h3>by {book.author}</h3>
        //                         <div>
        //                             <p>{formataReais(book.price)}</p>
        //                             <Link to={`/book-detail/${book._id}`} >
        //                                 <button><span>Add to cart</span><BsCartPlus /></button>
        //                             </Link>
        //                         </div>
        //                     </BookInfo>
        //                 </BookContainer>
        //             </Link>

        //         )}
        //     </BookPageContainer>
        // </>


    )
}