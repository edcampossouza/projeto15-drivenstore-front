import axios from "axios"
import { useEffect, useState } from "react"
import { BsCartPlus } from "react-icons/bs"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"

export default function BookDetailPage() {
    const { id } = useParams()
    const [book, setBook] = useState([])
    console.log(id)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/books/${id}`)
            .then(res => {
                setBook(res.data)
                console.log(res.data)
            })

    }, [])



    return (
        <>
          
                <div>
                    <img width={"200px"} src={book.cover} />
                    <div>

                        <h1>{book.title}</h1>
                        <h2>{book.author}</h2>
                        <h3>{book.synopsis}</h3>
                        <p>{book.type}</p>
                        <span>R$ {book.price}</span>
                    </div>
                </div>


            

        </>

    )
}
