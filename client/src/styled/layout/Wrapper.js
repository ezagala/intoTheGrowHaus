import styled from 'styled-components';

const login = `@media(max-width: 1200px){
                min-width: 225px; 
                  @media(max-width: 700px ){
                    margin: 5% auto 0 auto; 
                  }
                }`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: ${props => props.width ? props.width : '90%'};
  height: ${props => props.height ? props.height : '100%'};
  margin: ${props => props.margin ? props.margin : '0 auto'};
  background: ${props => props.background ? props.background : null}; 
  border-radius: ${props => props.borderRadius ? props.borderRadius : null}; 
  
  ${props => props.login ? login : null /* Media queries for the login panel */}

`;

export default Wrapper;