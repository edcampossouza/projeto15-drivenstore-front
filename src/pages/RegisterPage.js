import axios from 'axios'
import { useContext, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import AppContext from '../context/AppContext'





export default function RegisterPage() {
    const { setUser } = useContext(AppContext)
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [registering, setRegistenring] = useState(false)

    async function register(e) {
        e.preventDefault()
        setRegistenring(true)

        const user = {
            name,
            email,
            password,
            confirmPassword
        }

        axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, user)
            .then(res => {
                alert(res.data)
                setUser(user.name)
                navigate("/")
                setRegistenring(false)
                setName("")
                setEmail("")
                setPassword("")
                setConfirmPassword("")

            })
            .catch(err => {
                alert(err.response.data)
                window.location.reload()
            })
    }

    return (
        <>
            <MyWalletContainer />
            <RegisterForm onSubmit={register}>
                <input required type='text' placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)} />
                <input required type='email' placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input required type='password' placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input required type='password' placeholder='Confirma a senha' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button>{!registering ? 'Cadastrar' :
                    <ThreeDots
                        color="#FFFFFF"
                        height="60"
                        width="60"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true} />}</button>
                <p>Já tem uma conta? <Link to={"/"}><span>Entre agora!</span></Link></p>

            </RegisterForm>
        </>

    )
}

const MyWalletContainer = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-top: 95px;
    margin-bottom: 28px;

`

const RegisterForm = styled.form`
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
            background-color: #A328D6;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            cursor: pointer;
            font-size: 20px;
            font-weight: 700;
            transition: 0.4s;
            &:hover {
                background-color: #7c2c9f;
            }

        }
        p {
            margin-top: 30px;
            color: white;
            span {
                color: white;
                text-decoration: underline;
                cursor: pointer;
                font-size: 15px;
                font-weight: 700;
            }
        }

`