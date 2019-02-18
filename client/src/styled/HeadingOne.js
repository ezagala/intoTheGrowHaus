import styled from 'styled-components'; 

const HeadingOne = styled.h1`
display: ${props => props.display ? props.display : 'block'};
margin: ${props => props.margin ? props.margin : '0'};
padding: ${props => props.padding ? props.padding : null}; 
`

export default HeadingOne; 
