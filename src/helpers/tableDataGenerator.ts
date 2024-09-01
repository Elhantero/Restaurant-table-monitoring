import * as tableTypes from "../constants/tableTypes";
import random from 'lodash/random';
import tableTypeToNameMap from "../constants/tableTypeToNameMap";
import tableTypeToSeatsCountMap from "../constants/tableTypeToSeatsCountMap";

const allTypesArr = Object.keys(tableTypes);
export default () => {
    const tableCount = random(5, 20);
    return [...Array(tableCount).keys()]
        .map(o => {
            const id = (o + 1).toString();
            const type = allTypesArr[random(0, allTypesArr.length - 1)];
            const name = tableTypeToNameMap?.[type] || tableTypeToNameMap?.default;
            const maxGuests = tableTypeToSeatsCountMap?.[type] || tableTypeToSeatsCountMap?.default;
            const guests = random(0, maxGuests);
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