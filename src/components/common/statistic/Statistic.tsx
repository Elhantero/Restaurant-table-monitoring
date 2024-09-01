import React from 'react';
import {connect} from "react-redux";
import {RootState} from "../../../store";
import {
    selectFreeSpaceCount, selectFreeTablesCount, selectGuestsCount, selectMaxGuestsCount,
} from "../../../selectors/tablesSelectors";
import {Wrapper} from "./styled/styledComponents";


const Statistic = ({
    guestsCount,
    maxGuestsCount,
    freeSpaceCount,
    freeTablesCount,
} : {
    guestsCount: number,
    maxGuestsCount: number,
    freeSpaceCount: number,
    freeTablesCount: number,
}) => {
    return (
        <Wrapper>
            <div>
                <b>Online statistic</b>
            </div>
            <div>Guests count - {guestsCount} of {maxGuestsCount}</div>
            <div>Free space count - {freeSpaceCount}</div>
            <div>Free tables count - {freeTablesCount}</div>
        </Wrapper>
    );
};
const mapStateToProps = (state: RootState) => ({
    guestsCount: selectGuestsCount(state),
    maxGuestsCount: selectMaxGuestsCount(state),
    freeSpaceCount: selectFreeSpaceCount(state),
    freeTablesCount: selectFreeTablesCount(state),
});

export default connect(mapStateToProps)(Statistic);