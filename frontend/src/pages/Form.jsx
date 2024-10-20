import React, { useRef, useState } from 'react';

function Form() {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const incomeRef = useRef(null);
    const oldestReft = useRef(null);
    const [isHomeowner, setIsHomeowner] = useState(null);
    const [isBusinessOwner, setIsBusinessOwner] = useState(null);
    const [householdSize, setHouseholdSize] = useState(null);
    const [appliancesPurchased, setAppliancesPurchased] = useState(null);
    const [isCoopMember, setIsCoopMember] = useState(null);
    const [isElectricOwner, setIsElectricOwner] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
                nameRef === null ||
                emailRef === null ||
                incomeRef.current === null ||
                oldestReft.current === null ||
                isHomeowner === null ||
                isBusinessOwner === null ||
                householdSize === null ||
                appliancesPurchased === null ||
                isCoopMember === null ||
                isElectricOwner === null
            ) {
                alert("Please fill out all fields before submitting.");
                return; // Exit early if any fields are null
            }

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const income = incomeRef.current.value;
        const oldest = oldestReft.current.value;

        console.log("Name: ", name);
        console.log("Email:", email);
        console.log('Homeowner:', isHomeowner);
        console.log('Business Owner:', isBusinessOwner);
        console.log('Income:', income);
        console.log('Household Size:', householdSize);
        console.log('Oldest Occupant Age:', oldest);
        console.log('Appliances Purchased:', appliancesPurchased);
        console.log('Co-op Member:', isCoopMember);
        console.log('Electric Vehicle Owner:', isElectricOwner);

        // TODO: pass this data to API
    }

    return (
<div className="w-[60%] mx-auto mt-10 p-10 bg-white shadow-md rounded-md" style={{marginBottom: "50px"}}>
                <form>
        <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name:</label>
        <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="John Doe" 
                className="w-[250px] h-[40px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
                ref={nameRef}
        />
        </div>

        <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email:</label>
        <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="you@example.com" 
                className="w-[250px] h-[40px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
                ref={emailRef}
        />
        </div>
        
            {/* homeowner */}
            <label for="homeowner" className="block text-gray-700 font-medium mb-2">Are you a homeowner?</label>
            <div className="flex items-center mb-4">
            <input type="radio" id="yes" name="homeowner" value="yes" onChange={() => setIsHomeowner('yes')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"></input>
            <label for="yes" className="ml-2 block text-gray-700 font-medium">Yes</label>
            </div>

            <div className="flex items-center mb-4">
            <input type="radio" id="no" name="homeowner" value="no" onChange={() => setIsHomeowner('no')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"></input>
            <label for="no" className="ml-2 block text-gray-700 font-medium">No</label>
            </div>

            {/* buisness owner */}
            <label for="buisness" className="block text-gray-700 font-medium mb-2">Are you a small business owner?</label>
            <div className="flex items-center mb-4">
            <input type="radio" id="yes" name="buisness" value="yes" onChange={() => setIsBusinessOwner('yes')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"></input>
            <label for="yes" className="ml-2 block text-gray-700 font-medium">Yes</label>
            </div>

            <div className="flex items-center mb-4">
            <input type="radio" id="no" name="buisness" value="no" onChange={() => setIsBusinessOwner('no')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"></input>
            <label for="no" className="ml-2 block text-gray-700 font-medium">No</label>
            </div>

            {/* income */}
            <div className="mb-4">
            <label for="income" className="block text-gray-700 font-medium mb-2">What is your gross household income?</label>
            <input type="number" id="income" name="income" placeholder="e.g. 50000" ref={incomeRef}
                    className="w-[250px] h-[40px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"></input>
            </div>

            {/* live in household */}
            <label for="live" className="block text-gray-700 font-medium mb-2">How many live in your household?</label>
            <div className="flex items-center mb-4">
            <input type="radio" id="one" name="live" value="1" onChange={() => setHouseholdSize('1')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"></input>
            <label for="one" className="ml-2 block text-gray-700 font-medium">1</label>
            </div>

            <div className="flex items-center mb-4">
            <input type="radio" id="two" name="live" value="2-4" onChange={() => setHouseholdSize('2-4')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"></input>
            <label for="two" className="ml-2 block text-gray-700 font-medium">2-4</label>
            </div>

            <div className="flex items-center mb-4">
            <input type="radio" id="three" name="live" value="5-7" onChange={() => setHouseholdSize('5-7')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"></input>
            <label for="three" className="ml-2 block text-gray-700 font-medium">5-7</label>
            </div>

            <div className="flex items-center mb-4">
            <input type="radio" id="four" name="live" value="8 or more" onChange={() => setHouseholdSize('8 or more')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"></input>
            <label for="four" className="ml-2 block text-gray-700 font-medium">8 or more</label>
            </div>

            {/* occupant */}
            <div className="mb-4">
            <label for="occupant" className="block text-gray-700 font-medium mb-2">What is the age of the oldest occupant in your household?</label>
            <input type="number" id="occupant" name="occupant" placeholder="e.g. 60" ref={oldestReft}
                    className="w-[250px] h-[40px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"></input>
            </div>

        {/* purchased */}
        <label for="purchased" className="block text-gray-700 font-medium mb-2">Have you purchased or updated any of the following appliances: Water Heaters, Furnaces, Boilers, Heat pumps, Air conditioners, Duct/Air sealing, Building Insulation, Windows, Doors, Clothes Washers, Dishwasher, Refrigerators/Freezers, Programmable Thermostats, or anything similar from 2005-2023? </label>
            <div className="flex items-center mb-4">
            <input type="radio" id="yes" name="purchased" value="yes" onChange={() => setAppliancesPurchased('yes')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"></input>
            <label for="yes" className="ml-2 block text-gray-700 font-medium">Yes</label>
            </div>

            <div className="flex items-center mb-4">
            <input type="radio" id="no" name="purchased" value="no" onChange={() => setAppliancesPurchased('no')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"></input>
            <label for="no" className="ml-2 block text-gray-700 font-medium">No</label>
            </div>

        {/* Below should be covered by previous screen */}

        {/* <label for="located" className="block text-gray-700 font-medium mb-2">Are you a small business owner?</label>
            <div className="flex items-center mb-4">
            <input type="radio" id="yes" name="located" value="yes"
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"></input>
            <label for="yes" className="ml-2 block text-gray-700 font-medium">Yes</label>
            </div>

            <div className="flex items-center mb-4">
            <input type="radio" id="no" name="buisness" value="no"
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"></input>
            <label for="no" className="ml-2 block text-gray-700 font-medium">No</label>
            </div> */}

        {/* coop */}
        <label for="coop" className="block text-gray-700 font-medium mb-2">Are you in a rural electric co-op?</label>
            <div className="flex items-center mb-4">
            <input type="radio" id="yes" name="coop" value="yes" onChange={() => setIsCoopMember('yes')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"></input>
            <label for="yes" className="ml-2 block text-gray-700 font-medium">Yes</label>
            </div>

            <div className="flex items-center mb-4">
            <input type="radio" id="no" name="coop" value="no" onChange={() => setIsCoopMember('no')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"></input>
            <label for="no" className="ml-2 block text-gray-700 font-medium">No</label>
            </div>

        {/* electric */}
        <label for="electric" className="block text-gray-700 font-medium mb-2">Do you or did you used to own an electric vehicle?</label>
            <div className="flex items-center mb-4">
            <input type="radio" id="yes" name="electric" value="yes" onChange={() => setIsElectricOwner('yes')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"></input>
            <label for="yes" className="ml-2 block text-gray-700 font-medium">Yes</label>
            </div>

            <div className="flex items-center mb-4">
            <input type="radio" id="no" name="electric" value="no" onChange={() => setIsElectricOwner('no')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"></input>
            <label for="no" className="ml-2 block text-gray-700 font-medium">No</label>
            </div>


            <button type="submit" onClick={handleSubmit}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Submit
            </button>
        </form>
        </div>

    )
  }
  
  export default Form