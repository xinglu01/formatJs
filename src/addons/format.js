/* eslint-disable @typescript-eslint/no-this-alias */
import { defaultDateProperties, getMaxLength } from "../utils/utils";
import { DateFormatter } from "./date";

export const initDateFormatter = function(properties) {
    var that = this;
    var target = defaultDateProperties({}, properties);
    that.dateFormatter = new DateFormatter(
        target.datePattern,
        target.dateMin,
        target.dateMax,
    );

    that.blocks = that.dateFormatter.getBlocks();
    that.blocksLength = that.blocks.length;
    that.maxLength = getMaxLength(that.blocks);
    return that;
};
