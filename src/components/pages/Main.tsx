import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Nav, Article } from '../styled/styledComponents';
import { selectIdToTableDataMap, selectTablesOrder, selectCurrentSelectedTableId } from '../../selectors/tablesSelectors';
import {AppDispatch, RootState} from "../../store";
import Layout from "../common/layout/Layout";
import {fetchTablesData, changeWarningByTableId} from "../../slices/tableSlices";
import random from "lodash/random";
import SingleTable from "../common/singleTable/SingleTable";

const Main = ({
                  tablesOrder
              }) => {
  const dispatch = useDispatch<AppDispatch>();

      useEffect(() => {
        dispatch(fetchTablesData());
      }, []);

    useEffect(() => {
        setInterval(() => {
            const randomIndex = random(tablesOrder.length - 1);
            const res = tablesOrder[randomIndex];
            dispatch(changeWarningByTableId({
                id: res,
                warning: true
            }))
        }, 10000);
    }, [tablesOrder]);



  return (
      <Layout>
          <Nav id="mainNav">
                Some Stat
          </Nav>
          <Article id="mainArticle">
              {tablesOrder.map(tableId => (
                  <SingleTable
                      tableId={tableId}
                  />
              ))}
          </Article>
      </Layout>
  );
};

const mapStateToProps = (state: RootState) => ({
  idToTableDataMap: selectIdToTableDataMap(state),
  tablesOrder: selectTablesOrder(state),
  currentSelectedTableId: selectCurrentSelectedTableId(state),
});

export default connect(mapStateToProps)(Main);
