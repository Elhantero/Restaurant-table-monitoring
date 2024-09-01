import styled from 'styled-components';
import tableTypeToColorMap from "../../../../constants/tableTypeToColorMap";
import tableTypeToBgImgMap from "../../../../constants/tableTypeToBgImgMap";

interface WrapperProps {
    $readyStatus?: boolean,
}

export const Wrapper = styled.div<WrapperProps>`
    display: flex;
    gap: 15px;
    flex-direction: column;
    background: ghostwhite;
    padding: 15px;
    box-sizing: border-box;
    font-size: 18px;

    &.blinking {
        outline: 3px solid #e32626;
        animation-name: blinking;
        animation-duration: 1s;
        animation-iteration-count: 100;
    }

    @keyframes blinking {
        50% {
            outline-color: #ffcd5f;
        }
    }

`;

interface LabelProps {
    $readyStatus?: boolean,
}

export const Label = styled.label<LabelProps>`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 24px;
    justify-content: center;
    box-sizing: border-box;
    padding: 0;
    cursor: pointer;
    user-select: none;
    border-radius: 50%;
    color: ${({$readyStatus}) => $readyStatus ? '#fff' : '#73beff'};
    border: 1px solid ${({$readyStatus}) => $readyStatus ? '#fff' : '#73beff'};

    .arrow {
        border: solid ${({$readyStatus}) => $readyStatus ? '#fff' : '#73beff'};
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 3px;
    }

    .right {
        transform: rotate(-45deg);
    }

    .left {
        transform: rotate(135deg);
    }

    .up {
        transform: rotate(-135deg);
    }

    .down {
        transform: rotate(45deg);
    }
`;

export const TopLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;

    > div:first-child {
        width: 100%;
        display: grid;
        gap: 20px;
        grid-template-columns: 200px 150px 100px;
        div {
            padding: 5px;
            width: fit-content;
        }
    }

    > div:last-child {
        display: flex;
        align-items: center;
        gap: 20px;
        white-space: nowrap;
    }

    .name {
        background-color: ${props => props.type ? tableTypeToColorMap[props.type] : tableTypeToColorMap.default};
    }

    .guests {
        background-color: #f1dab6;
    }
    
    .free {
        background-color: greenyellow;
    }

    .warning {
        padding: 5px;
        background-color: #ff3c3c;
        width: fit-content;
        color: #fff;
    }


    input[type="text"] {
        height: 40px;
        font-size: 16px;
        padding: 3px 10px;
        width: 100%;
        box-sizing: border-box;
    }
`;

export const BotLine = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    input[type=checkbox] {
        transform: scale(2);
        cursor: pointer;
    }

    label {
        cursor: pointer;
    }

    > div:first-child {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    > div:last-child {
        display: flex;
        align-items: center;
        gap: 20px;
        cursor: pointer;
        padding: 5px;
        user-select: none;
    }

    .tableView {
        background-image: url(${props => props.type ? tableTypeToBgImgMap[props.type] : tableTypeToBgImgMap.default});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        width: 100px;
        height: 100px;
    }
`;