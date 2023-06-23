export const LogoBgMap = {
  pink: require('./1.pink.png'),
  blue: require('./2.blue.png'),
  green: require('./3.green.png'),
};

export function getRandom() {
  let keys = Object.keys(LogoBgMap);
  return LogoBgMap[keys[Math.floor(Math.random() * (keys.length - 1))]];
}
