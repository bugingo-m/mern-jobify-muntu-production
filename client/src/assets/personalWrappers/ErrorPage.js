import styled from 'styled-components'



const Wrapper=styled.div`
    display:grid ;
    
    div{
        img{
            max-width:600px ;
        }
        margin: auto;
        text-align:center;
        p{
            margin-top:-1.2rem ;
        }
        a{
            text-decoration:underline ;
            color:var(--primary-500);
            font-weight:700 ;
        }
        h5{
            font-weight:700 ;
        }
    }


`

export default Wrapper