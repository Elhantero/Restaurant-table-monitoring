import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import random from "lodash/random";
import {selectTablesOrder} from '../../selectors/tablesSelectors';
import {AppDispatch, RootState} from "../../store";
import Layout from "../common/layout/Layout";
import {fetchTablesData, changeWarningByTableId, changeRandomGuestCountByTableId} from "../../slices/tableSlices";
import {Article, Nav} from "../common/layout/styled/styledComponents";
import Statistic from "../common/statistic/Statistic";
import Dashboard from "../common/dashboard/Dashboard";

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
                }));
                dispatch(changeRandomGuestCountByTableId(res))
            }, 5000);
        }
    }, [tablesOrder]);


    return (
        <Layout>
            <Nav>
                <Statistic />
            </Nav>
            <Article>
                <Dashboard />
            </Article>
        </Layout>
    );
};

const mapStateToProps = (state: RootState) => ({
    tablesOrder: selectTablesOrder(state),
});

export default connect(mapStateToProps)(Main);
