import axios from "axios"
import { useEffect } from "react"

export default function NewestBooks() {
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/books/newest`)
        .then(res => console.log(res.data))
    }, [])
    return (
        <div>oi</div>
    )
}