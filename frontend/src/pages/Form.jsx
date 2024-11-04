import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";

function Form() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const incomeRef = useRef(null);
  const oldestRef = useRef(null);
  const [isHomeowner, setIsHomeowner] = useState(null);
  const [isBusinessOwner, setIsBusinessOwner] = useState(null);
  const [householdSize, setHouseholdSize] = useState(null);
  const [appliancesPurchased, setAppliancesPurchased] = useState(null);
  const [isCoopMember, setIsCoopMember] = useState(null);
  const [isElectricOwner, setIsElectricOwner] = useState(null);
  const { countyID } = useParams();

  // to create loader when loading
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      nameRef === null ||
      emailRef === null ||
      incomeRef.current === null ||
      oldestRef.current === null ||
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

    // check that email is valid
    if (!validateEmail(emailRef.current.value)) {
      alert("Please enter a valid email");
    }

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const income = incomeRef.current.value;
    const oldest = oldestRef.current.value;

    const data = {
      name: name,
      email: email,
      county: countyID,
      isHomeowner: isHomeowner,
      isBusinessOwner: isBusinessOwner,
      income: income,
      householdSize: householdSize,
      oldestOccupantAge: oldest,
      appliancesPurchased: appliancesPurchased,
      isCoopMember: isCoopMember,
      isElectricOwner: isElectricOwner,
    };

    console.log(data);

    fetch("localhost:8080/api/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res !== 200) {
          alert("Request failed");
        }
        return res.json();
      })
      .then((json) => {
        alert("Submitted successfully");
        setLoading(false);
      });
  };

  return (
    <div>
      {/* sidebar */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col p-10">
          {/* Page content here */}
          <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden">
            Question List
          </label>

          {/* Form content */}
          <form>
            <div className="mb-4" id="name_div">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                className="w-[250px] h-[40px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                ref={nameRef}
              />
            </div>

            <div className="mb-4" id="email_div">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email:
              </label>
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
            <label
              htmlFor="homeowner"
              className="block text-gray-700 font-medium mb-2"
              id="homeowner"
            >
              Are you a homeowner?
            </label>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="yes1"
                name="homeowner"
                value="yes"
                onChange={() => setIsHomeowner("yes")}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              ></input>
              <label
                htmlFor="yes1"
                className="ml-2 block text-gray-700 font-medium"
              >
                Yes
              </label>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="no1"
                name="homeowner"
                value="no"
                onChange={() => setIsHomeowner("no")}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              ></input>
              <label
                htmlFor="no1"
                className="ml-2 block text-gray-700 font-medium"
              >
                No
              </label>
            </div>

            {/* business owner */}
            <label
              htmlFor="buisness"
              className="block text-gray-700 font-medium mb-2"
              id="small"
            >
              Are you a small business owner?
            </label>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="yes2"
                name="buisness"
                value="yes"
                onChange={() => setIsBusinessOwner("yes")}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              ></input>
              <label
                htmlFor="yes2"
                className="ml-2 block text-gray-700 font-medium"
              >
                Yes
              </label>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="no2"
                name="buisness"
                value="no"
                onChange={() => setIsBusinessOwner("no")}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              ></input>
              <label
                htmlFor="no2"
                className="ml-2 block text-gray-700 font-medium"
              >
                No
              </label>
            </div>

            {/* income */}
            <div className="mb-4" id="income_div">
              <label
                htmlFor="income"
                className="block text-gray-700 font-medium mb-2"
              >
                What is your gross household income?
              </label>
              <input
                type="number"
                id="income"
                name="income"
                placeholder="e.g. 50000"
                ref={incomeRef}
                className="w-[250px] h-[40px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              ></input>
            </div>

            {/* live in household */}
            <label
              htmlFor="live"
              className="block text-gray-700 font-medium mb-2"
              id="people"
            >
              How many live in your household?
            </label>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="one"
                name="live"
                value="1"
                onChange={() => setHouseholdSize("1")}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              ></input>
              <label
                htmlFor="one"
                className="ml-2 block text-gray-700 font-medium"
              >
                1
              </label>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="two"
                name="live"
                value="2-4"
                onChange={() => setHouseholdSize("2-4")}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              ></input>
              <label
                htmlFor="two"
                className="ml-2 block text-gray-700 font-medium"
              >
                2-4
              </label>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="three"
                name="live"
                value="5-7"
                onChange={() => setHouseholdSize("5-7")}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              ></input>
              <label
                htmlFor="three"
                className="ml-2 block text-gray-700 font-medium"
              >
                5-7
              </label>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="four"
                name="live"
                value="8 or more"
                onChange={() => setHouseholdSize("8 or more")}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              ></input>
              <label
                htmlFor="four"
                className="ml-2 block text-gray-700 font-medium"
              >
                8 or more
              </label>
            </div>

            {/* occupant */}
            <div className="mb-4" id="oldest">
              <label
                htmlFor="occupant"
                className="block text-gray-700 font-medium mb-2"
              >
                What is the age of the oldest occupant in your household?
              </label>
              <input
                type="number"
                id="occupant"
                name="occupant"
                placeholder="e.g. 60"
                ref={oldestRef}
                className="w-[250px] h-[40px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              ></input>
            </div>

            {/* purchased */}
            <label
              htmlFor="purchased"
              className="block text-gray-700 font-medium mb-2"
              id="appliance"
            >
              Have you purchased or updated any of the following appliances...?
            </label>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="yes3"
                name="purchased"
                value="yes"
                onChange={() => setAppliancesPurchased("yes")}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              ></input>
              <label
                htmlFor="yes3"
                className="ml-2 block text-gray-700 font-medium"
              >
                Yes
              </label>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="no3"
                name="purchased"
                value="no3"
                onChange={() => setAppliancesPurchased("no")}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              ></input>
              <label
                htmlFor="no3"
                className="ml-2 block text-gray-700 font-medium"
              >
                No
              </label>
            </div>

            {/* coop */}
            <label
              htmlFor="coop"
              className="block text-gray-700 font-medium mb-2"
              id="coop"
            >
              Are you in a rural electric co-op?
            </label>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="yes4"
                name="coop"
                value="yes"
                onChange={() => setIsCoopMember("yes")}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              ></input>
              <label
                htmlFor="yes4"
                className="ml-2 block text-gray-700 font-medium"
              >
                Yes
              </label>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="no4"
                name="coop"
                value="no"
                onChange={() => setIsCoopMember("no")}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              ></input>
              <label
                htmlFor="no4"
                className="ml-2 block text-gray-700 font-medium"
              >
                No
              </label>
            </div>

            {/* electric */}
            <label
              htmlFor="electric"
              className="block text-gray-700 font-medium mb-2"
              id="electric"
            >
              Do you or did you used to own an electric vehicle?
            </label>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="yes5"
                name="electric"
                value="yes"
                onChange={() => setIsElectricOwner("yes")}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              ></input>
              <label
                htmlFor="yes5"
                className="ml-2 block text-gray-700 font-medium"
              >
                Yes
              </label>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="no5"
                name="electric"
                value="no"
                onChange={() => setIsElectricOwner("no")}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              ></input>
              <label
                htmlFor="no5"
                className="ml-2 block text-gray-700 font-medium"
              >
                No
              </label>
            </div>

            {loading ? (
              <span className="loading loading-spinner loading-lg"></span>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Submit
              </button>
            )}
          </form>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <a href="#name_div">Name</a>
            </li>
            <li>
              <a href="#email_div">Email</a>
            </li>
            <li>
              <a href="#homeowner">Homeowner</a>
            </li>
            <li>
              <a href="#small">Small buisness owner</a>
            </li>
            <li>
              <a href="#income_div">Household income</a>
            </li>
            <li>
              <a href="#people">People in household</a>
            </li>
            <li>
              <a href="#oldest">Oldest occupant</a>
            </li>
            <li>
              <a href="#appliance">Appliance purchases</a>
            </li>
            <li>
              <a href="#coop">Co-op</a>
            </li>
            <li>
              <a href="#electric">Electric vehicle</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Form;
