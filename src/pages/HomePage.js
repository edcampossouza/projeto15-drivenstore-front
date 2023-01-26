import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { BsCartPlus } from "react-icons/bs"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import { formataReais } from "../util/util"

export default function HomePage() {
    const [books, setBooks] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/books`)
            .then(res => {
                setBooks(res.data)
            })
    }, [])



    console.log(books)


    return (
        <>
            <Header />
            <TitleStyle>
                <h1>Conheça nossos livros! <hr /></h1>
            </TitleStyle>

            <BookPageContainer>
                {books.map((book) =>
                    <BookContainer>
                        <img src={book.cover} />
                        <BookInfo>
                            <h2>{book.title}</h2>
                            <h3>{book.author}</h3>
                            <div>
                                <p>{formataReais(book.price)}</p>
                                <Link to={`/book-detail/${book._id}`} >
                                    <button>Add to cart <BsCartPlus /></button>
                                </Link>
                            </div>
                        </BookInfo>
                    </BookContainer>
                )}
            </BookPageContainer>
        </>


    )
}

const BookPageContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 40px;
    justify-content: center;
    justify-items: center;
    align-items: center;

`

const TitleStyle = styled.div`
   // border-bottom: 1px solid #dfdddd;
    display: flex;
    justify-content: center;
    align-content: center;
    h1 {
        font-size: 25px;
        margin: 30px 0 30px 50px;
        font-family: 'Libre Bodoni', sans-serif;
        
    }
`


const BookContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    width: 240px;
    min-height:380px;
    align-items: center;
    position: relative;
   
        img {
            width: 180px;
            height: 270px;
            border-radius:10px;
            box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
        }
       

`

const BookInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 10px;

   
    h2 {
            font-size: 14px;
            margin-left: 30px;
            margin-right: 30px;
        }
        h3 {
            font-size: 12px;
            margin-left: 30px;
            margin-right: 30px;
        }
        p {
            color: #6383A7;
            margin-left: 30px;
            
            font-size: 17px;
        }
        button {
            background-color: #6383A7;
            width: 70px;
            height: 25px;
            border-radius: 5px;
            font-size: 10px;
            color: white;
            margin-bottom: 5px;
            
        }
        div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-right: 20px;
            position: absolute;
            bottom: 0px;
            gap: 35px;
            margin-bottom: 5px;
        }
`