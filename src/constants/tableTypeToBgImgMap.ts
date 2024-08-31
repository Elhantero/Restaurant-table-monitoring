import * as tableTypes from './tableTypes';
import table_001_2p from '../../public/table_001_2p.png'
import table_001_4p from '../../public/table_001_4p.png'
import table_001_6p from '../../public/table_001_6p.png'
import table_001_8p from '../../public/table_001_8p.png'

export default {
    [tableTypes.diningTable]: table_001_4p,
    [tableTypes.boothTable]: table_001_6p,
    [tableTypes.outdoorTable]: table_001_8p,
    [tableTypes.privateTable]: table_001_2p,
    'default': table_001_2p,
};
