import React, { useRef, useState, useEffect } from "react";
import { encode } from "../tools/hash.js";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";
import mediaQuery from "../tools/mediaQuery.js";

const Form = () => {
  const { setSearchQuery, isCountyValid, convertCountyIDToName } = useSearch();
  
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
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [stayInContact, setStayInContact] = useState(false);
  const [contactMethod, setContactMethod] = useState("");
  const [heardAboutLeap, setHeardAboutLeap] = useState("");
  const [referralName, setReferralName] = useState("");
  const [helpNeeded, setHelpNeeded] = useState("");
  const [housingStatus, setHousingStatus] = useState("");
  const [isDisabled, setIsDisabled] = useState(null);
  const [hispanicOrigin, setHispanicOrigin] = useState(null);
  const [ethnicity, setEthnicity] = useState("");
  const [electricProvider, setElectricProvider] = useState("");
  const [gasProvider, setGasProvider] = useState("");
  const [newsletter, setNewsletter] = useState(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { countyID } = useParams();
  const [validCounty, setValidCounty] = useState(false);

  useEffect(() => {
    if (countyID && isCountyValid(countyID)) {
      setValidCounty(true);
      setSearchQuery(convertCountyIDToName(countyID));
    }
  }, [countyID]);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    if (
      nameRef.current === null ||
      emailRef.current === null ||
      incomeRef.current === null ||
      oldestRef.current === null ||
      isHomeowner === null ||
      isBusinessOwner === null ||
      householdSize === null ||
      appliancesPurchased === null ||
      isCoopMember === null ||
      isElectricOwner === null ||
      countyID === null
    ) {
      alert("Please fill out all fields before submitting.");
      setLoading(false);
      return;
    }

    if (!validateEmail(emailRef.current.value)) {
      alert("Please enter a valid email");
      setLoading(false);
      return;
    }

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const income = parseInt(incomeRef.current.value);
    const oldest = parseInt(oldestRef.current.value);

    const leapData = {
      name: name,
      phone: phoneNumber,
      prefferedContact: contactMethod,
      isHomeowner: isHomeowner,
      isBusinessOwner: isBusinessOwner,
      income: income,
      householdSize: householdSize,
      oldestOccupantAge: oldest,
      appliancesPurchased: appliancesPurchased,
      isCoopMember: isCoopMember,
      isElectricOwner: isElectricOwner,
    };

    let answers = Array(9).fill("n");
    if (isHomeowner == "yes") answers[0] = "y";
    if (isBusinessOwner == "yes") answers[1] = "y";
    if (income < 52349) answers[2] = "y";
    if (oldest >= 60) answers[4] = "y";
    if (appliancesPurchased == "yes") answers[5] = "y";
    if (countyID == 51165) answers[6] = "y";
    if (isCoopMember == "yes") answers[7] = "y";
    if (isElectricOwner == "yes") answers[8] = "y";

    const answersEncoded = encode(answers);
    navigate(`/incentives/${answersEncoded}`);
    setLoading(false);
  };

  const questionSections = [
    {
      id: "personal_info",
      title: "Personal Information",
      items: [
        { id: "name_div", label: "Name" },
        { id: "email_div", label: "Email" },
        { id: "phone_div", label: "Phone Number" }
      ]
    },
    {
      id: "ownership",
      title: "Property & Business",
      items: [
        { id: "homeowner", label: "Homeowner Status" },
        { id: "small", label: "Business Ownership" },
      ]
    },
    {
      id: "household",
      title: "Household Details",
      items: [
        { id: "income_div", label: "Income" },
        { id: "people", label: "Household Size" },
        { id: "oldest", label: "Age of Oldest Occupant" },
      ]
    },
    {
      id: "appliances",
      title: "Energy & Appliances",
      items: [
        { id: "appliance", label: "Past Appliance Purchases" },
        { id: "coop", label: "Rural Electric Co-op" },
        { id: "electric", label: "Electric Vehicle" },
      ]
    },
    // {
    //   id: "leap_specific",
    //   title: "LEAP Specific",
    //   items: [
    //     { id: "stayInContact", label: "Stay in Contact" },
    //   ]
    // }
  ];

  const countyName = convertCountyIDToName(countyID);

  if (!validCounty) {
    return (
      <div className="hero min-h-[80vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w">
            <h1 className="text-5xl font-bold mb-4">📍 Select a Valid County</h1>
            <p className="pt-6">Please use the search bar above to select your county.</p>
            <p>This will help us provide you with the most relevant information and assistance.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Header Section */}
          {
            mediaQuery.isNotDesktop() && 
            <div className="bg-white shadow-sm border-b sticky top-0 z-[1]">  {/* Changed z-index to be lower than drawer */}
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between flex-col">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                      {countyName} County Assessment
                    </h1>
                    <p className="text-gray-600 mt-1">
                      Complete this form to discover available incentives
                    </p>
                  </div>
                  <Link to="/" className="flex items-center">
                    <button className="btn btn-secondary text-white">
                      Change County
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          }

          {/* Form Content */}
          <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-8">
            <label htmlFor="my-drawer-2" className="btn btn-secondary drawer-button lg:hidden mb-6 text-white">
              View Questions List
            </label>

            <form className="space-y-8">
              {/* Personal Information Section */}
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-6" id="personal_info">
                <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Personal Information
                </h2>
                
                <div className="space-y-4">
                  <div id="name_div">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      ref={nameRef}
                      placeholder="John Doe"
                      className="input input-bordered w-full max-w-md"
                    />
                  </div>

                  <div id="email_div">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      ref={emailRef}
                      placeholder="you@example.com"
                      className="input input-bordered w-full max-w-md"
                    />
                  </div>

                  <div id="phone_div">
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="(123) 456-7890"
                      value={phoneNumber || ''}
                      onChange={(e) => {
                        // Basic phone number formatting
                        const cleaned = e.target.value.replace(/\D/g, '');
                        let formatted = cleaned;
                        if (cleaned.length >= 10) {
                          formatted = `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6,10)}`;
                        }
                        setPhoneNumber(formatted);
                      }}
                      className="input input-bordered w-full max-w-md"
                    />
                  </div>
                </div>
              </div>

              {/* Property & Business Section */}
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-6" id="ownership">
                <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Property & Business Information
                </h2>

                <div className="space-y-6">
                  <div id="homeowner">
                    <label className="block text-gray-700 font-medium mb-4">
                      Are you a homeowner?
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="yes1"
                          name="homeowner"
                          value="yes"
                          onChange={() => setIsHomeowner("yes")}
                          className="radio radio-secondary"
                        />
                        <label htmlFor="yes1" className="ml-3">Yes</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="no1"
                          name="homeowner"
                          value="no"
                          onChange={() => setIsHomeowner("no")}
                          className="radio radio-secondary"
                        />
                        <label htmlFor="no1" className="ml-3">No</label>
                      </div>
                    </div>
                  </div>

                  <div id="small">
                    <label className="block text-gray-700 font-medium mb-4">
                      Are you a small business owner?
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="yes2"
                          name="business"
                          value="yes"
                          onChange={() => setIsBusinessOwner("yes")}
                          className="radio radio-secondary"
                        />
                        <label htmlFor="yes2" className="ml-3">Yes</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="no2"
                          name="business"
                          value="no"
                          onChange={() => setIsBusinessOwner("no")}
                          className="radio radio-secondary"
                        />
                        <label htmlFor="no2" className="ml-3">No</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Household Details Section */}
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-6" id="household">
                <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Household Details
                </h2>

                <div className="space-y-6">
                  <div id="income_div">
                    <label className="block text-gray-700 font-medium mb-2">
                      What is your gross household income?
                    </label>
                    <input
                      type="number"
                      ref={incomeRef}
                      placeholder="e.g. 50000"
                      className="input input-bordered w-full max-w-md"
                    />
                  </div>

                  <div id="people">
                    <label className="block text-gray-700 font-medium mb-4">
                      How many live in your household?
                    </label>
                    <div className="grid grid-cols-2 gap-4 max-w-md">
                      {[
                        { id: "one", label: "1", value: "1" },
                        { id: "two", label: "2-4", value: "2-4" },
                        { id: "three", label: "5-7", value: "5-7" },
                        { id: "four", label: "8 or more", value: "8 or more" }
                      ].map((option) => (
                        <div key={option.id} className="flex items-center">
                          <input
                            type="radio"
                            id={option.id}
                            name="live"
                            value={option.value}
                            onChange={() => setHouseholdSize(option.value)}
                            className="radio radio-secondary"
                          />
                          <label htmlFor={option.id} className="ml-3">{option.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div id="oldest">
                    <label className="block text-gray-700 font-medium mb-2">
                      What is the age of the oldest occupant in your household?
                    </label>
                    <input
                      type="number"
                      ref={oldestRef}
                      placeholder="e.g. 60"
                      className="input input-bordered w-full max-w-md"
                    />
                  </div>
                </div>
              </div>

              {/* Energy & Appliances Section */}
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-6" id="appliances">
                <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Energy & Appliances
                </h2>

                <div className="space-y-6">
                  <div id="appliance">
                    <label className="block text-gray-700 font-medium mb-4">
                      Have you purchased or updated any of the following appliances:
                      <p className="font-normal text-sm mt-2 text-gray-600">
                        Water Heaters, Furnaces, Boilers, Heat pumps, Air conditioners,
                        Duct/Air sealing, Building Insulation, Windows, Doors, Clothes
                        Washers, Dishwasher, Refrigerators/Freezers, Programmable
                        Thermostats, or anything similar from 2005-2023?
                      </p>
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="yes3"
                          name="purchased"
                          value="yes"
                          onChange={() => setAppliancesPurchased("yes")}
                          className="radio radio-secondary"
                        />
                        <label htmlFor="yes3" className="ml-3">Yes</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="no3"
                          name="purchased"
                          value="no"
                          onChange={() => setAppliancesPurchased("no")}
                          className="radio radio-secondary"
                        />
                        <label htmlFor="no3" className="ml-3">No</label>
                      </div>
                    </div>
                  </div>

                  <div id="coop">
                    <label className="block text-gray-700 font-medium mb-4">
                      Are you in a rural electric co-op?
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="yes4"
                          name="coop"
                          value="yes"
                          onChange={() => setIsCoopMember("yes")}
                          className="radio radio-secondary"
                        />
                        <label htmlFor="yes4" className="ml-3">Yes</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="no4"
                          name="coop"
                          value="no"
                          onChange={() => setIsCoopMember("no")}
                          className="radio radio-secondary"
                        />
                        <label htmlFor="no4" className="ml-3">No</label>
                      </div>
                    </div>
                  </div>

                  <div id="electric">
                    <label className="block text-gray-700 font-medium mb-4">
                      Do you or did you used to own an electric vehicle?
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="yes5"
                          name="electric"
                          value="yes"
                          onChange={() => setIsElectricOwner("yes")}
                          className="radio radio-secondary"
                        />
                        <label htmlFor="yes5" className="ml-3">Yes</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="no5"
                          name="electric"
                          value="no"
                          onChange={() => setIsElectricOwner("no")}
                          className="radio radio-secondary"
                        />
                        <label htmlFor="no5" className="ml-3">No</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="stayInContact"
                    checked={stayInContact}
                    onChange={(e) => setStayInContact(e.target.checked)}
                    className="checkbox checkbox-secondary"
                  />
                  <label htmlFor="stayInContact" className="text-gray-700 font-medium">
                    Stay in contact with LEAP
                  </label>
                </div>

                {stayInContact && (
                  <div className="space-y-6 mt-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        What is your preferred method of contact?
                      </label>
                      <select
                        value={contactMethod}
                        onChange={(e) => setContactMethod(e.target.value)}
                        className="select select-bordered w-full max-w-md"
                      >
                        <option value="">Select a method</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="text">Text Message</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        How did you hear about LEAP?
                      </label>
                      <select
                        value={heardAboutLeap}
                        onChange={(e) => setHeardAboutLeap(e.target.value)}
                        className="select select-bordered w-full max-w-md"
                      >
                        <option value="">Select an option</option>
                        <option value="friend">Friend/Family</option>
                        <option value="social">Social Media</option>
                        <option value="search">Search Engine</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {heardAboutLeap === "friend" && (
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Please list their first and last name below
                        </label>
                        <input
                          type="text"
                          value={referralName}
                          onChange={(e) => setReferralName(e.target.value)}
                          className="input input-bordered w-full max-w-md"
                          placeholder="John Doe"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        How can LEAP help you?
                      </label>
                      <textarea
                        value={helpNeeded}
                        onChange={(e) => setHelpNeeded(e.target.value)}
                        className="textarea textarea-bordered w-full max-w-md"
                        placeholder="Please describe how we can help..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Do you rent or own your home?
                      </label>
                      <div className="space-y-2">
                        {["Rent", "Own"].map((option) => (
                          <div key={option} className="flex items-center">
                            <input
                              type="radio"
                              id={option.toLowerCase()}
                              name="housingStatus"
                              value={option.toLowerCase()}
                              checked={housingStatus === option.toLowerCase()}
                              onChange={(e) => setHousingStatus(e.target.value)}
                              className="radio radio-secondary"
                            />
                            <label htmlFor={option.toLowerCase()} className="ml-3">{option}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Is anyone in your household receiving disability benefits?
                      </label>
                      <div className="space-y-2">
                        {["Yes", "No"].map((option) => (
                          <div key={option} className="flex items-center">
                            <input
                              type="radio"
                              id={`disabled-${option.toLowerCase()}`}
                              name="disabled"
                              value={option.toLowerCase()}
                              checked={isDisabled === option.toLowerCase()}
                              onChange={(e) => setIsDisabled(e.target.value)}
                              className="radio radio-secondary"
                            />
                            <label htmlFor={`disabled-${option.toLowerCase()}`} className="ml-3">{option}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Are you of Hispanic/Latino/Spanish origin?
                      </label>
                      <div className="space-y-2">
                        {["Yes", "No"].map((option) => (
                          <div key={option} className="flex items-center">
                            <input
                              type="radio"
                              id={`hispanic-${option.toLowerCase()}`}
                              name="hispanic"
                              value={option.toLowerCase()}
                              checked={hispanicOrigin === option.toLowerCase()}
                              onChange={(e) => setHispanicOrigin(e.target.value)}
                              className="radio radio-secondary"
                            />
                            <label htmlFor={`hispanic-${option.toLowerCase()}`} className="ml-3">{option}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        How would you best describe yourself?
                      </label>
                      <select
                        value={ethnicity}
                        onChange={(e) => setEthnicity(e.target.value)}
                        className="select select-bordered w-full max-w-md"
                      >
                        <option value="">Select an option</option>
                        <option value="white">White</option>
                        <option value="black">Black or African American</option>
                        <option value="asian">Asian</option>
                        <option value="native">American Indian or Alaska Native</option>
                        <option value="pacific">Native Hawaiian or Other Pacific Islander</option>
                        <option value="other">Other</option>
                        <option value="multiple">Two or More Races</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Who is your electric provider?
                      </label>
                      <input
                        type="text"
                        value={electricProvider}
                        onChange={(e) => setElectricProvider(e.target.value)}
                        className="input input-bordered w-full max-w-md"
                        placeholder="Enter provider name"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Who is your gas provider?
                      </label>
                      <input
                        type="text"
                        value={gasProvider}
                        onChange={(e) => setGasProvider(e.target.value)}
                        className="input input-bordered w-full max-w-md"
                        placeholder="Enter provider name"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Would you like to sign-up for LEAP's newsletter?
                      </label>
                      <div className="space-y-2">
                        {["Yes", "No"].map((option) => (
                          <div key={option} className="flex items-center">
                            <input
                              type="radio"
                              id={`newsletter-${option.toLowerCase()}`}
                              name="newsletter"
                              value={option.toLowerCase()}
                              checked={newsletter === option.toLowerCase()}
                              onChange={(e) => setNewsletter(e.target.value)}
                              className="radio radio-secondary"
                            />
                            <label htmlFor={`newsletter-${option.toLowerCase()}`} className="ml-3">{option}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )} 
              </div>*/}

              {/* Submit Button */}
              <div className="flex justify-center py-6">
                {loading ? (
                  <span className="loading loading-spinner loading-lg text-secondary"></span>
                ) : (
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-secondary btn-lg text-white min-w-[200px]"
                  >
                    Submit Assessment
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Enhanced Sidebar */}
        <div className="drawer-side z-[999]">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <div className="bg-white w-80 min-h-full border-l">
            <div className="sticky top-0 h-screen overflow-y-auto">
              {/* Progress Header */}
              <div className="bg-secondary/5 p-6 border-b">
                <h2 className="font-semibold text-xl text-gray-800">
                  {countyName} County
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Assessment Questions
                </p>
              </div>

              {/* Navigation Menu */}
              <nav className="p-4">
                {questionSections.map((section, index) => (
                  <div key={section.id} className={`${index !== 0 ? 'mt-6' : ''}`}>
                    <div className="flex items-center gap-2 px-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-xs text-secondary font-medium">
                        {index + 1}
                      </div>
                      <h3 className="font-medium text-gray-900 text-sm">
                        {section.title}
                      </h3>
                    </div>
                    <ul className="space-y-1">
                      {section.items.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="block px-8 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>

              {/* Help Box */}
              <div className="p-4 mt-4 mx-4 bg-base-100 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-secondary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                    />
                  </svg>
                  <h3 className="font-medium text-gray-900">
                    Need Help?
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Visit our{' '}
                  <Link to="/about" className="text-secondary hover:underline">
                    FAQ page
                  </Link>
                  {' '}or{' '}
                  <a href="#" className="text-secondary hover:underline">
                    contact support
                  </a>
                  {' '}for assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;