import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { BsCartPlus } from "react-icons/bs"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import { formataReais } from "../util/util"
import { TbAlertCircle } from "react-icons/tb"


export default function BooksPage() {
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
                <h1>Conheça nossos livros!</h1>
            </TitleStyle>

            <BookPageContainer>
                {books.map((book) =>
                    <Link to={`/book-detail/${book._id}`}>
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
                    </Link>

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
    padding-right: 300px;
    padding-left: 300px;
  

`

const TitleStyle = styled.div`
    border-bottom: 1px solid #dfdddd;
    display: flex;
    justify-content: left;
    text-align: left;   
    margin: 180px 200px 100px 200px;
    height: 90px;
    h1 {
        font-size: 40px;
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
    cursor: pointer;
        img {
                width: 180px;
                height: 270px;
                border-radius:10px;
                //box-shadow: -10px 10px 7px -4px rgba(0, 0, 0, 0.4)
                box-shadow: 0px 5px 10px 3px rgba(0, 0, 0, 0.5);
            &:hover{
                width: 190px;
                height: 280px;
           }
            
           
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
            background-color: #9BA5BE;
            width: 70px;
            height: 25px;            
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

