import incentivesData from '../data/incentives.json';

const mapAnswersToIncentives = (answers) => {
  
  if (answers.length !== 9) {
    answers = Array(9).fill('n');
  }

  const eligibleIncentives = new Set();

  if (answers[0] === 'y') { // Homeowner
      eligibleIncentives.add("energy-mortgages"); // Energy Efficient Mortgages
      eligibleIncentives.add("clean-energy-financing"); // Local Option - Clean Energy Financing
      eligibleIncentives.add("local-rebate"); // Local Residential Rebate Programs
  }

  if (answers[1] === 'y') { // Small business owner
      eligibleIncentives.add("small-business-loan"); // Small Business & Non-Profit Loan Program
  }

  if (answers[2] === 'y') { // Low income (less than 60% of state median)
      eligibleIncentives.add("liheap"); // Low Income Home Energy Assistance Program
      eligibleIncentives.add("wap"); // Weatherization Assistance Program
      eligibleIncentives.add("income-solar"); // Income Qualifying Solar Program
  }

  // Question 3 (household size) is for information gathering only

  if (answers[4] === 'y') { // Age 60 or older
      eligibleIncentives.add("age-weatherization"); // Age Qualifying Weatherization Program
      eligibleIncentives.add("age-solar"); // Age Qualifying Solar Program
  }

  if (answers[5] === 'y') { // Updated appliances
      eligibleIncentives.add("efficiency-tax-credit"); // Residential Energy Efficiency Tax Credit
      eligibleIncentives.add("energy-tax-deduction"); // Income Tax Deduction for Energy-Efficient Products
      eligibleIncentives.add("sales-tax-exemption"); // Sales Tax Exemption
  }

  if (answers[6] === 'y') { // Rockingham County
      eligibleIncentives.add("rockingham-wind"); // Small Wind Ordinance
  }

  if (answers[7] === 'y') { // Rural electric co-op
      eligibleIncentives.add("reap"); // USDA - Rural Energy for America Program
  }

  if (answers[8] === 'y') { // Electric vehicle
      eligibleIncentives.add("ev-tax-credit"); // Plug-In Electric Drive Vehicle Tax Credit
      eligibleIncentives.add("refueling-tax-credit"); // Alternative Fuel Vehicle Refueling Property Tax Credit
      eligibleIncentives.add("used-ev-tax-credit"); // Previously-Owned Clean Vehicle Tax Credit
      eligibleIncentives.add("ev-charger-rewards"); // Dominion Energy Virginia - EV Charger Rewards
  }

  // Convert IDs to full incentive objects
  return incentivesData.incentives.filter(incentive => 
    eligibleIncentives.has(incentive.id) || incentive.default === true
  );
};

const encode = (arr) => {
  if (arr.length !== 9) {
    throw new Error('Array must be exactly 9 items long');
  }
  
  // Convert y/n array to binary string
  const binaryStr = arr
    .map(val => val === 'y' ? '1' : '0')
    .join('');
  
  // Convert binary to base36 for shorter string
  const decimal = parseInt(binaryStr, 2);
  const encoded = decimal.toString(36);
  
  // Add checksum (sum of 1s in binary)
  const checksum = arr.filter(x => x === 'y').length.toString(36);
  
  return `${encoded}-${checksum}`;
};

// Convert numeric string back to y/n array
const decode = (str) => {
  try {
    // Split encoded string and checksum
    const [encoded, checksum] = str.split('-');
    
    // Convert back from base36 to decimal
    const decimal = parseInt(encoded, 36);
    
    // Convert to binary and pad with leading zeros
    const binaryStr = decimal.toString(2).padStart(9, '0');
    
    // Convert to y/n array
    const arr = binaryStr.split('').map(bit => bit === '1' ? 'y' : 'n');
    
    // Verify checksum
    const actualChecksum = arr.filter(x => x === 'y').length.toString(36);
    if (actualChecksum !== checksum) {
      throw new Error('Checksum validation failed');
    }
    
    // Verify array length
    if (arr.length !== 9) {
      throw new Error('Invalid decoded array length');
    }
    
    return arr;
  } catch (e) {
    console.error('Error decoding string:', e);
    return Array(9).fill('n');
  }
};

// Example usage:
// const answers = ['y', 'n', 'y', 'n', 'y', 'n', 'y', 'n', 'y'];
// const encoded = encode(answers);
// const decoded = decode(encoded);
// const eligibleIncentives = mapAnswersToIncentives(decoded);

export { mapAnswersToIncentives, encode, decode };
