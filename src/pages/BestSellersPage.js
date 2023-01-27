import axios from "axios"
import { useEffect } from "react"

export default function BestSellersPage() {
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/books/best-sellers`)
        .then(res => console.log(res.data))
    }, [])
    return (
        <div>oi2</div>
    )
}