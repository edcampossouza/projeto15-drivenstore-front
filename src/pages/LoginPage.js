import axios from "axios"
import { useContext, useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import AppContext from "../context/AppContext"
import {TbBooks} from 'react-icons/tb'
import Header from "../components/Header"

export default function LoginPage() {
    const navigate = useNavigate()

    const { setUser, setToken, setUserId } = useContext(AppContext)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)

    function login(e) {
        e.preventDefault()
        setLoading(true)
        axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, { email, password })
            .then(res => {
                setToken(res.data.token)
                setUserId(res.data.userId)
                setUser(res.data.user)                
                navigate("/")

            })
            .catch(err => {
                alert(err.response.data)
                window.location.reload()
            })


    }

    return (
        <>
       
            <LoginForm onSubmit={login} >
                <Title>Booskly</Title>
               
                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='E-mail' required />
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Senha' required />
                <button>{!loading ? 'Entrar' :
                    <ThreeDots
                        color="#FFFFFF"
                        height="60"
                        width="60"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true} />}</button>
                     
                <p>Primeira vez? <Link to="/sign-up"><a>Cadastre-se!</a></Link> </p>
                <p>Quer cotinuar sem login? <Link to="/"><a>Compre aqui!</a></Link> </p>
            </LoginForm>
        </>
    )
}

const Title = styled.h1`
    font-family: 'Libre Bodoni', sans-serif;
    font-size: 80px;
    margin-bottom: 30px;
`


const LoginForm = styled.form`
    width: 100vw;
    height: 100vh;
    background-color: #9BA5BE;
    display: flex;
    flex-direction: column;
    gap: 13px;
    margin: auto;
    justify-content: center;
    align-items: center;
        input {
            width: 326px;
            height: 58px;
            border-radius: 5px;
            border-style: none;
            padding: 10px;
            font-size: 20px;
            &::placeholder {
                font-size: 20px;
                color: black;
            }
        }
        button {
            width: 326px;
            height: 46px;
            background-color: #E0EDF4;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: black;
            cursor: pointer;
            font-size: 20px;
            transition: 0.4s;
            &:hover {
                background-color: #cad9e1;
            }
            

        }
        p {
            margin-top: 30px;
            a {
                text-decoration: underline;
                cursor: pointer;
                font-size: 15px;
                font-weight: 700;
                  &:visited {
                    color: #5a4b4b;
                  }
            }
        }

`