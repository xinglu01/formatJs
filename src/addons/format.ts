/* eslint-disable @typescript-eslint/no-this-alias */
import * as utils from '../utils/utils';
import { DateFormatter } from './date';

export const initDateFormatter = function (properties) {
    const that = this;
    const target = utils.defaultDateProperties({}, properties);
    that.dateFormatter = new DateFormatter(
        target.datePattern,
        target.dateMin,
        target.dateMax,
    );

    that.blocks = that.dateFormatter.getBlocks();
    that.blocksLength = that.blocks.length;
    that.maxLength = utils.getMaxLength(that.blocks);
    return that;
};
