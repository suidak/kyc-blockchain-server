pragma solidity ^0.4.4;

contract kyc {

    struct Customer {
        string fname;
        string lname;
        string dataHash;
        address ethAddress;
        //Identification[] ids;
        string country;
        string birthdate;
        address bankAccount;
        bool isVerified;
    }

    struct ShareHolder {
        string id;
        string name;
    }
    struct Bank {
        string name;
        string certificateInc;
        string license;
        string headquarter;
        string email;
        string phoneNumber;
        string constitutionDate;
        address ethAddress;
        bool isVerified;
    }

    //  list of all customers

    Customer[] allCustomers;

    //  list of all Banks/Organisations

    Bank[] allOrgs;
    
    //events
    event addedBank(address bankAddress, string name);
    event addedCustomer(address customerAddress, string fname);
    event notAddedCustomer(address customerAddress);

    constructor() public {

	}

    function ifAllowed(string Uname, address bankAddress) public payable returns(bool) {
        for(uint i = 0; i < allOrgs.length; ++i) {
            if(stringsEqual(allOrgs[i].name, Uname) && allOrgs[i].ethAddress == bankAddress && allOrgs[i].isVerified) {
                return true;
            }
        }
        return false;
    }
    

    function addBank(string name,address ethAddress,string certificateInc, string license, string headquarter, string email, string phoneNumber, string constitutionDate) public payable returns(uint) {
        uint l = allOrgs.length++;
        allOrgs[l] = Bank(name,certificateInc,license,headquarter,email,phoneNumber,constitutionDate,ethAddress,false);
        emit addedBank(ethAddress,name);
        return 0;
    }


    function addCustomer(string fname,
        string lname,
        string dataHash,
        address ethAddress,
        string country,
        string birthdate,
        address bankAccount) public payable returns(uint) {
        if(!isPartOfOrg(bankAccount))
        {
            emit notAddedCustomer(ethAddress);
            return 0;
        }
        
        uint len = allCustomers.length ++;
        allCustomers[len] = Customer(fname,lname,dataHash,ethAddress,country,birthdate,bankAccount,false);
        emit addedCustomer(ethAddress,fname);
        return 1;
    }
    


    // function to return customer profile data

    function verifyCustomer(address ethAccount) public payable returns(int) {
        for(uint i = 0; i < allCustomers.length; ++ i) {
            if(allCustomers[i].ethAddress == ethAccount) {
                allCustomers[i].isVerified = true;
                return 1;
            }   
        }
        return 0;
    }

    function verifyBank(address ethAccount) public payable returns(int) {
        for(uint i = 0; i < allOrgs.length; ++ i) {
            if(allOrgs[i].ethAddress == ethAccount) {
                allOrgs[i].isVerified = true;
                return 1;
            }   
        }
        return 0;
    }

    function isCustomerVerified(address ethAccount) view public returns (uint b){
		for(uint i = 0; i < allCustomers.length; ++ i) {
            if(allCustomers[i].ethAddress == ethAccount && allCustomers[i].isVerified==true) {
                return 1;
            }   
        }
        return 0;
	}

    function isBankVerified(address ethAccount) view public returns (uint b){
		for(uint i = 0; i < allOrgs.length; ++ i) {
            if(allOrgs[i].ethAddress == ethAccount && allOrgs[i].isVerified==true) {
                return 1;
            }   
        }
        return 0;
	}
   

    // getter function
    function getBankName(address ethAcc) public payable returns(string) {
        for(uint i = 0; i < allOrgs.length; ++ i) {
            if(allOrgs[i].ethAddress == ethAcc) {
                return allOrgs[i].name;
            }
        }
        return "null";
    }
    
    //   internal function to compare strings
    
    function stringsEqual(string storage _a, string memory _b) internal returns (bool) {
		bytes storage a = bytes(_a);
		bytes memory b = bytes(_b);
		if (a.length != b.length)
			return false;
		// @todo unroll this loop
		for (uint i = 0; i < a.length; i ++)
        {
			if (a[i] != b[i])
				return false;
        }
		return true;
	}
	
	    //  function to check access rights of transaction request sender

    function isPartOfOrg(address bankAccount) public payable returns(bool) {
        for(uint i = 0; i < allOrgs.length; ++ i) {
            if(allOrgs[i].ethAddress == bankAccount)
                return true;
        }
        return false;
    }
    
    //fallback
	function () public payable {
	
	}



}