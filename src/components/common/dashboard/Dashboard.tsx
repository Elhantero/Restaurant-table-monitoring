import React from 'react';
import {connect} from "react-redux";
import SingleTable from "./SingleTable";
import {RootState} from "../../../store";
import {selectTablesOrder} from "../../../selectors/tablesSelectors";

const Dashboard = ({ tablesOrder } : { tablesOrder: string[] }) => {
    return (
        <>
            {tablesOrder.map(tableId => <SingleTable key={tableId} tableId={tableId}/>)}
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    tablesOrder: selectTablesOrder(state),
});

export default connect(mapStateToProps)(Dashboard);