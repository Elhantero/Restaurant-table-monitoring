import React, {useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import styled from 'styled-components';
import {RootState} from "../../../store";
import {selectCurrentSelectedTableId, selectTableById} from "../../../selectors/tablesSelectors";
import {changeWarningByTableId} from "../../../slices/tableSlices";
import tableTypeToColorMap from "../../../constants/tableTypeToColorMap";
import tableTypeToBgImgMap from "../../../constants/tableTypeToBgImgMap";

interface WrapperProps {
    $readyStatus?: boolean,
    $isEditNow?: boolean,
}

const Wrapper = styled.div<WrapperProps>`
    display: flex;
    gap: 15px;
    flex-direction: column;
    background: ${((props) => (props.$readyStatus && !props.$isEditNow ? 'deepskyblue' : 'ghostwhite'))};
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

interface BtnProps {
    $btnType?: string
}

interface LabelProps {
    $readyStatus?: boolean,
}

const Label = styled.label<LabelProps>`
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

const TopLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;

    > div:first-child {
        width: 100%;
        display: grid;
        gap: 20px;
        grid-template-columns: 200px 200px;
    }
    > div:last-child {
        display: flex;
        align-items: center;
        gap: 20px;
        white-space: nowrap;
    }

    .name {
        padding: 5px;
        background-color: ${props => props.type ? tableTypeToColorMap[props.type] : tableTypeToColorMap.default};
        width: fit-content;
    }

    .guests {
        padding: 5px;
        background-color: #f1dab6;
        width: fit-content;
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

const BotLine = styled.div`
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
    
    >div:first-child {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    >div:last-child {
        display: flex;
        align-items: center;
        gap: 20px;
        cursor: pointer;
        padding: 5px;
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

const SingleTable = ({
                            tableId,
                            singleTable,
                            currentSelectedTableId,
                            changeCurrentSelectedTableId
                        }) => {

    const [showSettings, setShowSettings] = useState(false);

    const dispatch = useDispatch();

    const handleReadyStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeWarningByTableId({
            id: tableId,
            warning: e.target.checked
        }))
    };

    const handleShowHideSettings = (e: React.ChangeEvent<HTMLInputElement>) => setShowSettings(e.target.checked);

    const {
        id,
        type,
        name,
        warning,
        guests,
        maxGuests,
    } = singleTable;

    return (
        <Wrapper className={singleTable.warning ? 'blinking' : ''}>
            <TopLine type={type}>
                <div>
                    <div className='name'>{name}</div>
                    <div className='guests'>Guests: {singleTable.guests} of {singleTable.maxGuests}</div>
                </div>

                <div>
                    {warning ? (
                        <div className="warning">
                            Check additional info and fix warning -->
                        </div>
                    ) : null}
                    <input
                        hidden
                        type="checkbox"
                        name={tableId.toString()}
                        id={tableId.toString()}
                        onChange={handleShowHideSettings}
                    />
                    <Label htmlFor={tableId.toString()}>
                        <i className={`arrow ${showSettings ? 'up' : 'down'}`}/>
                    </Label>
                </div>
            </TopLine>

            {
                showSettings ? (
                    <BotLine type={type}>
                        <div>
                            <div>table ID: {tableId}</div>
                            <div>table type: {type}</div>
                            <div>
                                table view:
                                <br/>
                                <br/>
                                <div className="tableView"></div>
                            </div>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                onChange={handleReadyStatus}
                                checked={warning}
                                title="Зміна статусу готовності, готові питання виводяться в кінці"
                                id={`warning_${tableId}`}
                            />
                            <label htmlFor={`warning_${tableId}`}>
                                {warning ? (
                                    <span>Fix warning</span>
                                ) : (
                                    <span>Mark it as warning</span>
                                )}
                            </label>
                        </div>
                    </BotLine>
                ) : null
            }
        </Wrapper>
    );
};

const mapStateToProps = (state: RootState, {tableId}: { tableId: string }) => ({
    singleTable: selectTableById(state, tableId),
    currentSelectedTableId: selectCurrentSelectedTableId(state),
});

export default connect(mapStateToProps)(SingleTable);
