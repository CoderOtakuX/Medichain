// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MediChain {
    struct Medicine {
        string name;
        string manufacturer;
        uint256 manufactureDate;
        uint256 expiryDate;
        bool isVerified;
    }

    mapping(string => Medicine) public medicines;
    mapping(address => bool) public authorizedManufacturers;

    event MedicineAdded(string indexed batchNumber, string name, string manufacturer);
    event MedicineVerified(string indexed batchNumber, bool isVerified);

    constructor() {
        authorizedManufacturers[msg.sender] = true;
    }

    modifier onlyAuthorizedManufacturer() {
        require(authorizedManufacturers[msg.sender], "Not an authorized manufacturer");
        _;
    }

    function addMedicine(
        string memory _batchNumber,
        string memory _name,
        string memory _manufacturer,
        uint256 _manufactureDate,
        uint256 _expiryDate
    ) public onlyAuthorizedManufacturer {
        require(medicines[_batchNumber].manufactureDate == 0, "Medicine already exists");
        
        medicines[_batchNumber] = Medicine({
            name: _name,
            manufacturer: _manufacturer,
            manufactureDate: _manufactureDate,
            expiryDate: _expiryDate,
            isVerified: true
        });

        emit MedicineAdded(_batchNumber, _name, _manufacturer);
    }

    function verifyMedicine(string memory _batchNumber) public view returns (bool) {
        return medicines[_batchNumber].isVerified;
    }

    function getMedicineDetails(string memory _batchNumber) public view returns (Medicine memory) {
        return medicines[_batchNumber];
    }

    function authorizeManufacturer(address _manufacturer) public onlyAuthorizedManufacturer {
        authorizedManufacturers[_manufacturer] = true;
    }
}

