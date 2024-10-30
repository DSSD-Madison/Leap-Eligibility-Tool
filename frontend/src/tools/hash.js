const encode = (arr) => {
  if (arr.length !== 9) {
    throw new Error('Array must be exactly 9 items long');
  }
  
  const chunks = [
    arr.slice(0, 3),
    arr.slice(3, 6),
    arr.slice(6, 9)
  ];
  
  const encoded = chunks.map(chunk => {
    const value = chunk.reduce((acc, val, idx) => {
      return acc + (val.toLowerCase() === 'y' ? Math.pow(2, 2 - idx) : 0);
    }, 0);
    
    return value.toString(36);
  }).join('');
  
  return encoded;
};

const decode = (str) => {
  if (str.length !== 3) {
    throw new Error('Encoded string must be exactly 3 characters');
  }
  
  const result = str.split('').flatMap(char => {
    const value = parseInt(char, 36);
    
    return [
      value & 4 ? 'y' : 'n',  // Check first bit
      value & 2 ? 'y' : 'n',  // Check second bit
      value & 1 ? 'y' : 'n'   // Check third bit
    ];
  });
  
  return result;
};