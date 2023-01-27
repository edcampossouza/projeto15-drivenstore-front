import styled from "styled-components"

export const BookPageContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 40px;
    justify-content: center;
    justify-items: center;
    align-items: center;
    padding-right: 200px;
    padding-left: 200px;
        
        @media (max-width: 1600px) {
            padding-left: 200px;
            padding-right: 200px;
        }
        @media (max-width: 900px) {
            padding-left: 100px;
            padding-right: 100px;
        }
        @media (max-width: 450px) {
            padding-left: 0px;
            padding-right: 0px;
        }
  

`

export const TitleStyle = styled.div`
    border-bottom: 1px solid #dfdddd;
    display: flex;
    justify-content: left;
    text-align: left;   
    margin-top: 140px;
    margin-bottom: 40px;
    padding-left: 200px;
    height: 90px;
    
    h1 {
        font-size: 35px;
        font-family: 'Libre Bodoni', sans-serif;
        @media (max-width: 450px) {
            font-size: 30px;
        }

    }
   
        @media (max-width: 1000px) {
            justify-content: center;     
            padding:0 ;
        }
`


export const BookContainer = styled.div`
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
                @media (max-width: 480px) {
                    width: 260px;
                    height: 340px;
                 }
            
            
           
        }
        

`

export const BookInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 10px;
        h2 {
            font-size: 14px;
            margin-left: 30px;
            margin-right: 30px;
            @media (max-width: 480px) {
                    font-size: 23px;
                    margin: 0;
                    margin-top: 10px;
                 }
        }
        h3 {
            font-size: 12px;
            margin-left: 30px;
            margin-right: 30px;
            @media (max-width: 480px) {
                  font-size: 20px;
                  margin: 0;
                 }
        }
        p {
            color: #6383A7;
            margin-left: 30px;
            
            font-size: 17px;
            @media (max-width: 480px) {
                  font-size: 20px;
                  margin: 0;
                 }
        }
        button {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9BA5BE;
            width: 70px;
            height: 25px;            
            font-size: 10px;
            margin-bottom: 5px;
            border-radius:5px;
            color: white;
                &:hover {
                    box-shadow: 0 5px 16px 0 rgba(0,0,0,0.24),0 17px 90px 0 rgba(0,0,0,0.19);
                }
                span {
                    color: white!important;
                }
           
            @media (max-width: 480px) {
                width: 100px;
                height: 35px;
                  font-size: 15px;
                 }
         
            
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
        span {
            margin-right: 5px;
        }
        @media (max-width: 480px) {
                  height: 170px;
                  gap: 20px;
        }
`

