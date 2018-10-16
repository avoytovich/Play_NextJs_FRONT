import React from 'react';
import { map } from 'lodash';

const objKeys2Strings = (obj, prefix = '', ans = {}) => {
  map(obj, (item, key) => {
    if (typeof item === 'string' || React.isValidElement(item)) {
      ans[prefix + key] = item;
    } else {
      objKeys2Strings(item, `${key}.`, ans);
    }
  });
  return ans;
};

export default objKeys2Strings;
