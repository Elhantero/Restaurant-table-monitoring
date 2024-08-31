import * as tableTypes from "../constants/tableTypes";
import tableTypeToNameMap from "../constants/tableTypeToNameMap";
import tableTypeToSeatsCountMap from "../constants/tableTypeToSeatsCountMap";

const getRandomNumFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const allTypesArr = Object.keys(tableTypes);
export default () => {
    const tableCount = getRandomNumFromInterval(5, 20);
    return [...Array(tableCount).keys()]
        .map(o => {
            const id = (o + 1).toString();
            const type = allTypesArr[getRandomNumFromInterval(0, allTypesArr.length - 1)];
            const name = tableTypeToNameMap?.[type] || tableTypeToNameMap?.default;
            const maxGuests = tableTypeToSeatsCountMap?.[type] || tableTypeToSeatsCountMap?.default;
            const guests = getRandomNumFromInterval(0, maxGuests);
            return {
                id,
                type,
                name,
                warning: false,
                guests,
                maxGuests,
            }
        })
}