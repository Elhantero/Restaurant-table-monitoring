import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    gap: 15px;
    flex-direction: column;
    padding: 15px;
    box-sizing: border-box;
    font-size: 18px;
    >div {
        background: ghostwhite;
        box-sizing: border-box;
        padding: 15px;
    }
    >div:first-child {
        background: none;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
    } 
`;


