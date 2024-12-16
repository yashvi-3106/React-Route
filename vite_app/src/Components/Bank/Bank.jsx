

import { useState, useEffect } from 'react';
import './Bank.css';  // Import the CSS file

const Bank = () => {
  // State variables for holding the data
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [centers, setCenters] = useState([]);
  const [branches, setBranches] = useState([]);
  const [branchDetails, setBranchDetails] = useState(null);
  const [bankDetails, setBankDetails] = useState(null); // For storing IFSC bank details
  const [ifscCode, setIfscCode] = useState(''); // IFSC code input value

  // To store the selected values
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCenter, setSelectedCenter] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');

  // Fetch list of states
  useEffect(() => {
    fetch('https://bank-apis.justinclicks.com/API/V1/STATE/')
      .then(response => response.json())
      .then(data => setStates(data))
      .catch(error => console.error('Error fetching states:', error));
  }, []);

  // Fetch districts when a state is selected
  useEffect(() => {
    if (selectedState) {
      fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/`)
        .then(response => response.json())
        .then(data => setDistricts(data))
        .catch(error => console.error('Error fetching districts:', error));
    }
  }, [selectedState]);

  // Fetch cities when a district is selected
  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/`)
        .then(response => response.json())
        .then(data => setCities(data))
        .catch(error => console.error('Error fetching cities:', error));
    }
  }, [selectedDistrict]);

  // Fetch centers when a city is selected
  useEffect(() => {
    if (selectedCity) {
      fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/${selectedCity}/`)
        .then(response => response.json())
        .then(data => setCenters(data))
        .catch(error => console.error('Error fetching centers:', error));
    }
  }, [selectedCity]);

  // Fetch branches when a center is selected
  useEffect(() => {
    if (selectedCenter) {
      fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/${selectedCity}/${selectedCenter}/`)
        .then(response => response.json())
        .then(data => setBranches(data))
        .catch(error => console.error('Error fetching branches:', error));
    }
  }, [selectedCenter]);

  // Fetch branch details when a branch is selected
  useEffect(() => {
    if (selectedBranch) {
      const branchName = selectedBranch.endsWith('.json') ? selectedBranch : `${selectedBranch}.json`;
      const branchUrl = `https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/${selectedCity}/${selectedCenter}/${branchName}`;
      
      fetch(branchUrl)
        .then(response => response.json())
        .then(data => setBranchDetails(data))
        .catch(error => console.error('Error fetching branch details:', error));
    }
  }, [selectedBranch]);

  // Fetch bank details based on IFSC code
  const fetchBankDetails = () => {
    if (ifscCode.trim() !== '') {
      fetch(`https://bank-apis.justinclicks.com/API/V1/IFSC/${ifscCode}/`)
        .then(response => response.json())
        .then(data => setBankDetails(data))
        .catch(error => console.error('Error fetching bank details:', error));
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Bank Branch Finder</h1>

      {/* IFSC Code Lookup Section */}
      <div className="ifsc-container">
        <label className="ifsc-label">Enter IFSC Code:</label>
        <input
          type="text"
          className="ifsc-input"
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value)}
          placeholder="Enter IFSC Code"
        />
        <button className="ifsc-button" onClick={fetchBankDetails}>
          Get Bank Details
        </button>

        {/* Display IFSC Bank Details */}
        {bankDetails && (
          <div className="bank-details">
            <h2>Bank Details:</h2>
            <pre>{JSON.stringify(bankDetails, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* State, District, City, Center, Branch Select Dropdowns */}
      <div className="select-container">
        <label className="select-label">Select State:</label>
        <select className="select-dropdown" onChange={(e) => setSelectedState(e.target.value)} value={selectedState}>
          <option value="">Select State</option>
          {states.map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>
      </div>

      <div className="select-container">
        <label className="select-label">Select District:</label>
        <select className="select-dropdown" onChange={(e) => setSelectedDistrict(e.target.value)} value={selectedDistrict}>
          <option value="">Select District</option>
          {districts.map((district, index) => (
            <option key={index} value={district}>{district}</option>
          ))}
        </select>
      </div>

      <div className="select-container">
        <label className="select-label">Select City:</label>
        <select className="select-dropdown" onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
          <option value="">Select City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="select-container">
        <label className="select-label">Select Center:</label>
        <select className="select-dropdown" onChange={(e) => setSelectedCenter(e.target.value)} value={selectedCenter}>
          <option value="">Select Center</option>
          {centers.map((center, index) => (
            <option key={index} value={center}>{center}</option>
          ))}
        </select>
      </div>

      <div className="select-container">
        <label className="select-label">Select Branch:</label>
        <select className="select-dropdown" onChange={(e) => setSelectedBranch(e.target.value)} value={selectedBranch}>
          <option value="">Select Branch</option>
          {branches.map((branch, index) => (
            <option key={index} value={branch}>{branch.replace('.json', '')}</option>
          ))}
        </select>
      </div>

      {/* Display Branch Details */}
      {branchDetails && (
        <div className="branch-details">
          <h2>Branch Details:</h2>
          <pre>{JSON.stringify(branchDetails, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Bank;

