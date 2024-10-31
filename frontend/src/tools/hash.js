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
  return window.btoa(JSON.stringify(arr));
};

const decode = (str) => {
  try {
    const arr = JSON.parse(window.atob(str));
    if (!Array.isArray(arr) || arr.length !== 9 || !arr.every(val => val === 'y' || val === 'n')) {
      throw new Error('Invalid encoded string format');
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