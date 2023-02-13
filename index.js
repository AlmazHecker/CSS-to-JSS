import clipboardy from 'clipboardy';

import { snakeToCamel } from './utils/toCamelCase.js';

const JSS = {};

clipboardy.read().then((res) => {
  const lines = snakeToCamel(res).split('\n');

  let bracketsOpen = false;
  let currentSelector = '';

  lines.map((line) => {
    if (line.includes('{')) {
      bracketsOpen = true;
      const [selector] = line.split('{');
      currentSelector = selector.trim();
      return;
    }
    if (line.includes('}')) {
      bracketsOpen = false;
      return;
    }

    const [key, value] = line.split(':');
    if (typeof value !== 'undefined' && bracketsOpen) {
      JSS[currentSelector] = {
        ...JSS[currentSelector],
        [key.trim()]: value.replace(';', '').trim(),
      };
    }
  });
  clipboardy.writeSync(JSON.stringify(JSS, null, 2));
});
