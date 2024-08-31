import React, {useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {RootState} from "../../../store";
import {selectTableById} from "../../../selectors/tablesSelectors";
import {changeWarningByTableId} from "../../../slices/tableSlices";
import {Wrapper, Label, TopLine, BotLine} from "./styled/styledComponents";

type Table = {
    id: string,
    type: string,
    name: string,
    warning: boolean,
    guests: number,
    maxGuests: number,
}

const SingleTable = ({tableId, singleTable}: { tableId: string, singleTable: Table }) => {
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
        <Wrapper className={warning ? 'blinking' : ''}>
            <TopLine type={type}>
                <div>
                    <div className='name'>{name}</div>
                    <div className='guests'>Guests: {guests} of {maxGuests}</div>
                </div>

                <div>
                    {warning && (
                        <div className="warning">
                            Check additional info and fix warning -->
                        </div>
                    )}
                    <input
                        hidden
                        type="checkbox"
                        name={tableId}
                        id={tableId}
                        onChange={handleShowHideSettings}
                    />
                    <Label htmlFor={tableId}>
                        <i className={`arrow ${showSettings ? 'up' : 'down'}`}/>
                    </Label>
                </div>
            </TopLine>

            {showSettings && (
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
                            id={`warning_${tableId}`}
                        />
                        <label htmlFor={`warning_${tableId}`}>
                            <span>{warning ? 'Disable checkbox to fix' : 'Mark it as warning'}</span>
                        </label>
                    </div>
                </BotLine>
            )}
        </Wrapper>
    );
};

const mapStateToProps = (state: RootState, {tableId}: { tableId: string }) => ({
    singleTable: selectTableById(state, tableId),
});

export default connect(mapStateToProps)(SingleTable);
