import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import random from "lodash/random";
import {selectIdToTableDataMap, selectTablesOrder} from '../../selectors/tablesSelectors';
import {AppDispatch, RootState} from "../../store";
import Layout from "../common/layout/Layout";
import {fetchTablesData, changeWarningByTableId} from "../../slices/tableSlices";

import SingleTable from "../common/singleTable/SingleTable";

const Main = ({ tablesOrder } : { tablesOrder: string[] }) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchTablesData());
    }, []);

    useEffect(() => {
        if (tablesOrder?.length) {
            setInterval(() => {
                const randomIndex = random(tablesOrder.length - 1);
                const res = tablesOrder[randomIndex];
                dispatch(changeWarningByTableId({
                    id: res,
                    warning: true
                }))
            }, 3000);
        }
    }, [tablesOrder]);


    return (
        <Layout>
            {tablesOrder.map(tableId => <SingleTable key={tableId} tableId={tableId}/>)}
        </Layout>
    );
};

const mapStateToProps = (state: RootState) => ({
    idToTableDataMap: selectIdToTableDataMap(state),
    tablesOrder: selectTablesOrder(state),
});

export default connect(mapStateToProps)(Main);
