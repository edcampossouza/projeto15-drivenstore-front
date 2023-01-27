import { Link } from "react-router-dom"
import styled from "styled-components"
import table from '../assets/images/table.png'
import Header from "../components/Header"

export default function HomePage() {
    return (
        <>
            <Header />
            <Home>
                <div>
                    <h1>Compre todos os melhores e mais populares livros aqui!</h1>
                    <p><span>Booskly</span> é a escolha perfeita para encontrar os melhores títulos. Com uma ampla variedade de gêneros e preços acessíveis, é fácil encontrar o livro certo para você. A loja oferece entrega rápida e pagamento seguro, além de atendimento ao cliente excepcional. Com uma grande seleção de títulos, incluindo clássicos e lançamentos recentes, é fácil encontrar o livro perfeito</p>
                    <Link to="/books" > 
                    <button>Shop now!</button>
                    </Link>
                </div>
                <img src={table} />
            </Home>
        </>

    )
}

const Home = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    background-color: #e9e9e9;
 
        @media (max-width:1050px) {
                flex-direction: column-reverse;
                margin-top: 90px;
                height:calc(100vh - 90px) ;
                  
                        
        }
       @media (max-width:600px) {
                
        }
    
        div {
            margin-left: 20px;
            width: 40%;
            height: 45%;           
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: left;
            @media (max-width:1050px) {
                   width: 70%;
                   height: 350px;
                   margin-left: 0;
                   justify-content: flex-start;
                   gap: 30px;
                    
                }
                @media (max-width:400px) {
                   gap: 10px;
                   width: 75%;
                    
            }
                
           
                
        }

        img {
            width: 700px;
            height: 400px;
            @media (max-width:1050px) {
                    width: 600px;
                    height: 400px;
                    margin-top: 40px;
                   
                    
                    
            }
            @media (max-width:980px) {
                    width: 600px;
                    height: 400px;
                  
                    
            }
            @media (max-width:600px) {
                    width: 400px;
                    height: 200px;                 
                    
            }
            @media (max-width:385px) {
                    width: 350px;
                    height: 200px;                 
                    
            }
        }
        h1 {
            font-size: 50px;
            font-weight: bold;
                 @media (max-width:1100px) {
                   margin-top: 10px;
                   font-size: 30px;
                    
                }
                @media (max-width:385px) {
                    font-size:20px;
                    
            }
            
        }
        
        button {
            width: 300px;
            height: 50px;
            background-color: #A9D9CA;
            box-shadow: 0px 5px 10px 3px rgba(0, 0, 0, 0.3);
            &:hover {
                        background-color: #8FB9AC;
                    }
            @media (max-width:385px) {
                   width:250px ;
                    
            }
           
        }
`