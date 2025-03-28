export const courses = [
  {
    id: "solidity-basics",
    title: "Solidity: Beginner to Intermediate Smart Contracts",
    subtitle: "Solidity Beginner Intermediate",
    description: "Get up to speed with the basics of Solidity.",
    difficulty: "Beginner",
    completion: 0,
    backgroundColor: "bg-gray-800",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2832",
    lessons: [
      {
        id: "lesson-1",
        title: "Introduction to Solidity",
        description: "Learn the basics of Solidity programming language and smart contracts.",
        completed: false,
        steps: [
          {
            id: "step-1",
            title: "Understanding Smart Contracts",
            briefDescription: "Learn about smart contracts and create your first contract",
            content: `Smart contracts are programs that run on the Ethereum blockchain. They are written in Solidity and are the building blocks of decentralized applications.

Key Concepts:
 
• Contracts are the fundamental building block of Ethereum applications

• All variables and functions belong to a contract

• Every contract starts with a version pragma

Here's a basic contract structure:

\`\`\`
pragma solidity >=0.5.0 <0.6.0;

contract HelloWorld {
    // Your code goes here
}
\`\`\`

The pragma statement tells the compiler which version of Solidity to use. We'll use version >=0.5.0 <0.6.0 for this tutorial.

Put it to the test:
Create a contract named MyFirstContract with the correct pragma statement.`,
            initialCode: `
pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {

}`,
            expectedCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {

}`,
            completed: false
          },
          {
            id: "step-2",
            title: "Smart Contract Development",
            briefDescription: "Building your first smart contract",
            content: `Smart Contract Development

Let's explore the fundamental structure of a smart contract and its essential components.

1. Basic Contract Structure:

• Pragma directive

• Contract declaration

• State variables

• Functions

• Events

• Modifiers

Example:

\`\`\`
pragma solidity >=0.5.0 <0.6.0;

contract BasicContract {
    // State variables
    address public owner;
    uint256 public value;
    
    // Events
    event ValueUpdated(uint256 newValue);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    // Constructor
    constructor() public {
        owner = msg.sender;
    }
    
    // Functions
    function setValue(uint256 _value) public onlyOwner {
        value = _value;
        emit ValueUpdated(_value);
    }
}
\`\`\`

2. Key Components:

a. State Variables:


• Stored permanently in contract storage

• Can be public, private, or internal

• Can be constant or immutable

b. Functions:


• Can be public, private, internal, or external

• Can be view or pure

• Can be payable

• Can have modifiers

c. Events:


• Used for logging

• Indexed parameters for efficient filtering

• Emitted using emit keyword

d. Modifiers:


• Reusable access control

• Can have parameters

• Use _; to continue execution

Put it to the test:

Create a contract with:

• A public address variable named owner

• A public uint256 variable named balance


• A modifier named onlyOwner

• A constructor that sets the owner

• A public function named deposit that:
  - Takes a uint256 parameter
  - Adds it to the balance
  - Emits an event named Deposit

• A public function named withdraw that:
  - Takes a uint256 parameter
  - Subtracts it from the balance
  - Can only be called by the owner
  - Emits an event named Withdraw`,

            initialCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    // Add your code here
}`,
            expectedCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    address public owner;
    uint256 public balance;
    
    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() public {
        owner = msg.sender;
    }
    
    function deposit(uint256 _amount) public {
        balance += _amount;
        emit Deposit(_amount);
    }
    
    function withdraw(uint256 _amount) public onlyOwner {
        require(_amount <= balance, "Insufficient balance");
        balance -= _amount;
        emit Withdraw(_amount);
    }
}`,
            completed: false
          },
          {
            id: "step-3",
            title: "State Variables",
            briefDescription: "Working with state variables and their visibility",
            content: `State variables are crucial for storing data in smart contracts. Let's explore their types, visibility, and best practices.

1. State Variable Types:

• uint: Unsigned integers

• int: Signed integers

• bool: Boolean values

• address: Ethereum addresses

• string: Text data

• bytes: Byte arrays

• mapping: Key-value pairs

• array: Fixed or dynamic arrays

• struct: Custom data structures

Example:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

contract StateVariables {
    // Basic types
    uint256 public number;
    bool public isActive;
    address public owner;
    string public name;
    
    // Complex types
    struct User {
        string name;
        uint256 age;
        bool isActive;
    }
    
    mapping(address => User) public users;
    User[] public userList;
    
    // Constants
    uint256 public constant MAX_USERS = 100;
    address public immutable deployer;
    
    constructor() public {
        deployer = msg.sender;
    }
}
\`\`\`

2. Visibility Modifiers:

• public: Readable from outside

• private: Only readable internally

• internal: Readable internally and by derived contracts

• external: Only readable from outside

3. Storage Keywords:

• constant: Value set at compile time

• immutable: Value set in constructor

• storage: Default storage location

• memory: Temporary storage

• calldata: Read-only temporary storage

Put it to the test:
Create a contract with:

• A struct named Product containing:
  - name (string)
  - price (uint256)
  - inStock (bool)

• A mapping from address to Product named products

• A public function named addProduct that:
  - Takes name and price as parameters
  - Creates a new Product
  - Stores it in the products mapping

• A public function named getProduct that:
  - Takes an address parameter
  - Returns the product for that address`,
            initialCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    // Add your code here
}`,
            expectedCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    struct Product {
        string name;
        uint256 price;
        bool inStock;
    }
    
    mapping(address => Product) public products;
    
    function addProduct(string memory _name, uint256 _price) public {
        products[msg.sender] = Product({
            name: _name,
            price: _price,
            inStock: true
        });
    }
    
    function getProduct(address _owner) public view returns (string memory, uint256, bool) {
        Product memory product = products[_owner];
        return (product.name, product.price, product.inStock);
    }
}`,
            completed: false
          },
          {
            id: "step-4",
            title: "Function Modifiers",
            briefDescription: "Creating and using function modifiers",
            content: `Function modifiers are powerful tools for adding reusable functionality to functions. Let's explore how to create and use them effectively.

1. Basic Modifiers:

• Reusable access control

• Input validation

• State checks

• Gas optimization

Example:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

contract ModifierExample {
    address public owner;
    uint256 public value;
    bool public isActive;
    
    // Basic modifier
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    // Modifier with parameter
    modifier minimumValue(uint256 _min) {
        require(value >= _min, "Value is too low");
        _;
    }
    
    // Modifier with multiple conditions
    modifier whenActive() {
        require(isActive, "Contract is not active");
        _;
    }
    
    // Modifier with state changes
    modifier updateValue() {
        uint256 oldValue = value;
        _;
        emit ValueUpdated(oldValue, value);
    }
    
    event ValueUpdated(uint256 oldValue, uint256 newValue);
    
    constructor() public {
        owner = msg.sender;
        isActive = true;
    }
    
    function setValue(uint256 _newValue) public onlyOwner whenActive updateValue {
        value = _newValue;
    }
}
\`\`\`

2. Advanced Modifier Patterns:

a. Time-based Modifiers:
\`\`\`
modifier onlyAfter(uint256 _time) {
    require(block.timestamp >= _time, "Too early");
    _;
}
\`\`\`

b. State-based Modifiers:
\`\`\`
modifier whenNotPaused() {
    require(!paused, "Contract is paused");
    _;
}
\`\`\`

c. Role-based Modifiers:
\`\`\`
modifier onlyRole(bytes32 role) {
    require(hasRole(role, msg.sender), "Caller does not have role");
    _;
}
\`\`\`

3. Best Practices:

• Keep modifiers simple and focused

• Use modifiers for common checks

• Consider gas costs

• Use events in modifiers when appropriate

• Document modifier requirements

Put it to the test:
Create a contract with:

• A public uint256 variable named balance

• A public bool variable named isLocked

• A modifier named onlyUnlocked

• A modifier named minimumAmount that takes a uint256 parameter

• A public function named deposit that:
  - Takes a uint256 parameter
  - Can only be called when unlocked
  - Requires a minimum amount
  - Adds the amount to balance

  • A public function named withdraw that:
  - Takes a uint256 parameter
  - Can only be called when unlocked
  - Requires a minimum amount
  - Subtracts the amount from balance`,
            initialCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    // Add your code here
}`,
            expectedCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    uint256 public balance;
    bool public isLocked;
    
    modifier onlyUnlocked() {
        require(!isLocked, "Contract is locked");
        _;
    }
    
    modifier minimumAmount(uint256 _amount) {
        require(_amount >= 100, "Amount too small");
        _;
    }
    
    function deposit(uint256 _amount) public onlyUnlocked minimumAmount(_amount) {
        balance += _amount;
    }
    
    function withdraw(uint256 _amount) public onlyUnlocked minimumAmount(_amount) {
        require(_amount <= balance, "Insufficient balance");
        balance -= _amount;
    }
}`,
            completed: false
          },
          {
            id: "step-5",
            title: "Mathematical Operations",
            briefDescription: "Learn how to perform mathematical operations in Solidity",
            content: `Solidity supports various mathematical operations that are essential for smart contract development. Let's explore the different types of operations and their use cases.

1. Basic Arithmetic Operations:

• Addition (+)

• Subtraction (-)

• Multiplication (*)

• Division (/)

• Modulus (%)

• Exponentiation (**)

Example:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

contract MathOperations {
    // Basic arithmetic
    function add(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }
    
    function subtract(uint256 a, uint256 b) public pure returns (uint256) {
        return a - b;
    }
    
    function multiply(uint256 a, uint256 b) public pure returns (uint256) {
        return a * b;
    }
    
    function divide(uint256 a, uint256 b) public pure returns (uint256) {
        require(b != 0, "Division by zero");
        return a / b;
    }
    
    function modulus(uint256 a, uint256 b) public pure returns (uint256) {
        require(b != 0, "Modulus by zero");
        return a % b;
    }
}
\`\`\`

2. SafeMath Library:

• Prevents overflow and underflow in arithmetic operations

• Essential for older Solidity versions (< 0.8.0)

• Provides safe arithmetic functions

Example:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.0/contracts/math/SafeMath.sol";

contract SafeMathExample {
    using SafeMath for uint256;
    
    uint256 public balance;
    
    function add(uint256 a, uint256 b) public pure returns (uint256) {
        return a.add(b);
    }
    
    function subtract(uint256 a, uint256 b) public pure returns (uint256) {
        return a.sub(b);
    }
}
\`\`\`

3. Common Mathematical Patterns:

a. Percentage Calculations:
\`\`\`
function calculatePercentage(uint256 amount, uint256 percentage) public pure returns (uint256) {
    return amount.mul(percentage).div(100);
}
\`\`\`

b. Exponential Growth:
\`\`\`
function calculateCompound(uint256 principal, uint256 rate, uint256 time) public pure returns (uint256) {
    return principal.mul((100 + rate).pow(time)).div(100.pow(time));
}
\`\`\`

c. Random Number Generation:
\`\`\`
function generateRandom(uint256 seed) public view returns (uint256) {
    return uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, seed)));
}
\`\`\`

4. Best Practices:

• Always check for division by zero

• Use SafeMath for older Solidity versions

• Be aware of overflow/underflow risks

• Consider gas costs of mathematical operations

• Use appropriate data types for calculations

Put it to the test:

Create a contract named MyFirstContract with:

1. A function named calculateTotal that:

• Takes two uint256 parameters: price and quantity

• Multiplies them together

• Returns the result

2. A function named calculateDiscount that:

• Takes a uint256 amount and a uint256 discountPercentage  

• Calculates the discounted amount

• Returns the result

When you're finished, click "check answer" below.`,
            initialCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    // Add your code here
}`,
            expectedCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    function calculateTotal(uint256 price, uint256 quantity) public pure returns (uint256) {
        return price * quantity;
    }
    
    function calculateDiscount(uint256 amount, uint256 discountPercentage) public pure returns (uint256) {
        require(discountPercentage <= 100, "Discount percentage must be <= 100");
        return amount * (100 - discountPercentage) / 100;
    }
}`,
            completed: false
          },
          {
            id: "step-6",
            title: "Structures and Arrays",
            briefDescription: "Working with complex data structures in Solidity",
            content: `Solidity provides powerful ways to organize and store data using structures (structs) and arrays. Let's explore how to work with these data structures effectively.

1. Structures (Structs):

• Custom data types that group related variables

• Can contain different types of data

• Can be used as state variables or function parameters

Example:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

contract StructExample {
    struct User {
        string name;
        uint256 age;
        bool isActive;
        address wallet;
    }
    
    User public user;
    
    function createUser(string memory _name, uint256 _age) public {
        user = User({
            name: _name,
            age: _age,
            isActive: true,
            wallet: msg.sender
        });
    }
}
\`\`\`

2. Arrays:

• Fixed-size arrays: length is specified at declaration

• Dynamic arrays: length can change

• Can be public or private

• Can be storage or memory

Example:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

contract ArrayExample {
    // Fixed-size array
    uint256[5] public fixedArray;
    
    // Dynamic array
    uint256[] public dynamicArray;
    
    // Array of structs
    User[] public users;
    
    struct User {
        string name;
        uint256 age;
    }
    
    // Add element to dynamic array
    function addNumber(uint256 _number) public {
        dynamicArray.push(_number);
    }
    
    // Remove element from dynamic array
    function removeNumber(uint256 _index) public {
        require(_index < dynamicArray.length, "Index out of bounds");
        dynamicArray[_index] = dynamicArray[dynamicArray.length - 1];
        dynamicArray.pop();
    }
}
\`\`\`

3. Array Operations:

a. Push and Pop:
\`\`\`
function addUser(string memory _name, uint256 _age) public {
    users.push(User(_name, _age));
}

function removeLastUser() public {
    require(users.length > 0, "No users to remove");
    users.pop();
}
\`\`\`

b. Array Length:
\`\`\`
function getUserCount() public view returns (uint256) {
    return users.length;
}
\`\`\`

c. Array Access:
\`\`\`
function getUser(uint256 _index) public view returns (string memory, uint256) {
    require(_index < users.length, "Index out of bounds");
    User memory user = users[_index];
    return (user.name, user.age);
}
\`\`\`

4. Best Practices:

• Use fixed-size arrays when possible (more gas efficient)

• Be careful with array operations in loops

• Check array bounds before access

• Consider using mapping for large datasets

• Use memory arrays for temporary data

Put it to the test:
Create a contract named MyFirstContract with:
1. A struct named Product containing:
   
• name (string)
   
   • price (uint256)
   
   • inStock (bool)
2. A dynamic array of Products named products
3. A function named addProduct that:
   
• Takes name and price as parameters
   
   • Creates a new Product
   
   • Adds it to the products array
4. A function named getProduct that:
   
• Takes an index as parameter
   
   • Returns the product at that index

When you're finished, click "check answer" below.`,
            initialCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    // Add your code here
}`,
            expectedCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    struct Product {
        string name;
        uint256 price;
        bool inStock;
    }
    
    Product[] public products;
    
    function addProduct(string memory _name, uint256 _price) public {
        products.push(Product({
            name: _name,
            price: _price,
            inStock: true
        }));
    }
    
    function getProduct(uint256 _index) public view returns (string memory, uint256, bool) {
        require(_index < products.length, "Index out of bounds");
        Product memory product = products[_index];
        return (product.name, product.price, product.inStock);
    }
}`,
            completed: false
          },
          {
            id: "step-7",
            title: "Private Functions and Access Control",
            briefDescription: "Understanding and implementing private functions and access control in Solidity",
            content: `Access control and function visibility are crucial aspects of smart contract security. Let's explore how to implement proper access control and private functions.

1. Function Visibility:

• public: Can be called internally and externally

• private: Can only be called internally

• internal: Can be called internally and by derived contracts

• external: Can only be called externally

Example:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

contract VisibilityExample {
    // Public function
    function publicFunction() public {
        // Can be called from anywhere
    }
    
    // Private function
    function privateFunction() private {
        // Can only be called from within this contract
    }
    
    // Internal function
    function internalFunction() internal {
        // Can be called from this contract and derived contracts
    }
    
    // External function
    function externalFunction() external {
        // Can only be called from outside this contract
    }
}
\`\`\`

2. Access Control Patterns:

a. Owner-based Access Control:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

contract OwnerAccess {
    address public owner;
    
    constructor() public {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    function sensitiveFunction() public onlyOwner {
        // Only the owner can call this
    }
}
\`\`\`

b. Role-based Access Control:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

contract RoleAccess {
    mapping(address => bool) public isAdmin;
    mapping(address => bool) public isModerator;
    
    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Only admin can call this function");
        _;
    }
    
    modifier onlyModerator() {
        require(isModerator[msg.sender], "Only moderator can call this function");
        _;
    }
    
    function addAdmin(address _admin) public {
        isAdmin[_admin] = true;
    }
    
    function addModerator(address _moderator) public onlyAdmin {
        isModerator[_moderator] = true;
    }
}
\`\`\`

3. Private Functions and Internal Logic:

a. Data Validation:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

contract DataValidation {
    uint256 public value;
    
    function setValue(uint256 _value) public {
        _validateValue(_value);
        value = _value;
    }
    
    function _validateValue(uint256 _value) private pure {
        require(_value > 0, "Value must be greater than 0");
        require(_value <= 100, "Value must be less than or equal to 100");
    }
}
\`\`\`

b. Complex Calculations:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

contract ComplexCalculations {
    uint256 public result;
    
    function calculateResult(uint256 a, uint256 b) public {
        result = _performComplexCalculation(a, b);
    }
    
    function _performComplexCalculation(uint256 a, uint256 b) private pure returns (uint256) {
        // Complex calculation logic here
        return (a * b) + (a + b);
    }
}
\`\`\`

4. Best Practices:

• Use private functions for internal logic

• Implement proper access control

• Use modifiers for reusable access control

• Validate inputs in private functions

• Keep sensitive operations private

• Use events to track important state changes

Put it to the test:
Create a contract named MyFirstContract with:
1. A private uint256 variable named secretValue
2. A public function named setSecretValue that:
   
• Takes a uint256 parameter
   
   • Validates the input using a private function
   
   • Updates secretValue if valid
3. A private function named _validateValue that:
   
• Takes a uint256 parameter
   
   • Ensures the value is between 1 and 100
4. A public function named getSecretValue that:
   
• Returns the current secretValue

When you're finished, click "check answer" below.`,
            initialCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    // Add your code here
}`,
            expectedCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    uint256 private secretValue;
    
    function setSecretValue(uint256 _value) public {
        _validateValue(_value);
        secretValue = _value;
    }
    
    function _validateValue(uint256 _value) private pure {
        require(_value > 0, "Value must be greater than 0");
        require(_value <= 100, "Value must be less than or equal to 100");
    }
    
    function getSecretValue() public view returns (uint256) {
        return secretValue;
    }
}`,
            completed: false
          },
          {
            id: "step-8",
            title: "Keccak256 and Type Conversion",
            briefDescription: "Working with hashing and type conversions in Solidity",
            content: `Let's explore two important concepts in Solidity: hashing with keccak256 and type conversions.

1. Keccak256 Hashing:

• Cryptographic hash function

• Produces a 32-byte hash

• Used for generating unique identifiers

• Essential for security features

Example:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

contract HashExample {
    function generateHash(string memory _input) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_input));
    }
    
    function generateHashWithSalt(string memory _input, uint256 _salt) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_input, _salt));
    }
}
\`\`\`

2. Type Conversions:

• Implicit: Automatically converts between compatible types

• Explicit: Manual conversion using type casting

Example:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

contract TypeConversion {
    uint8 public smallNumber = 5;
    uint256 public bigNumber = uint256(smallNumber);
    
    function convertToString(uint256 _number) public pure returns (string memory) {
        return uint2str(_number);
    }
    
    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) return "0";
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}
\`\`\`

Key Points:

• Use keccak256 for generating unique identifiers

• Add salt to hashes for better security

• Be careful with type conversions

• Check for overflow/underflow

• Use explicit conversions when needed

Put it to the test:
Create a contract with:

• A function generateHash that:
  - Takes a string parameter
  - Returns its keccak256 hash

  • A function convertToUint that:
  - Takes a string parameter
  - Converts it to uint256
  - Returns the result`,
            initialCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    // Add your code here
}`,
            expectedCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    function generateHash(string memory _input) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_input));
    }
    
    function convertToUint(string memory _input) public pure returns (uint256) {
        bytes memory b = bytes(_input);
        uint256 result = 0;
        for(uint i = 0; i < b.length; i++) {
            uint8 c = uint8(b[i]);
            if (c >= 48 && c <= 57) {
                result = result * 10 + (c - 48);
            }
        }
        return result;
    }
}`,
            completed: false
          },
          {
            id: "step-9",
            title: "Events and ethers.js",
            briefDescription: "Implementing events and using ethers.js for frontend interaction",
            content: `Events are crucial for frontend-backend communication in Ethereum applications. Let's learn how to implement them and interact with them using ethers.js.

1. Events in Solidity:

• Used to log information to the blockchain

• Gas-efficient way to track state changes

• Can be listened to by frontend applications

Example:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

contract EventExample {
    event UserRegistered(address indexed user, string name);
    event BalanceUpdated(address indexed user, uint256 newBalance);
    
    mapping(address => uint256) public balances;
    
    function register(string memory _name) public {
        emit UserRegistered(msg.sender, _name);
    }
    
    function updateBalance(uint256 _newBalance) public {
        balances[msg.sender] = _newBalance;
        emit BalanceUpdated(msg.sender, _newBalance);
    }
}
\`\`\`

2. Frontend Integration with ethers.js:
\`\`\`
// JavaScript/TypeScript
const ethers = require('ethers');

async function listenToEvents() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
    );
    
    // Listen to UserRegistered events
    contract.on("UserRegistered", (user, name, event) => {
        console.log(\`User \${name} registered at address \${user}\`);
    });
    
    // Listen to BalanceUpdated events
    contract.on("BalanceUpdated", (user, newBalance, event) => {
        console.log(\`Balance updated for \${user}: \${newBalance}\`);
    });
}
\`\`\`

Key Points:

• Use indexed parameters for efficient filtering

• Events are stored in transaction logs

• Frontend can listen to events in real-time

• Events are gas-efficient compared to storage

• Use events for important state changes

Put it to the test:
Create a contract with:

• An event named ItemCreated with:
  - indexed address parameter owner
  - string parameter name
  - uint256 parameter price

  • A function createItem that:
  - Takes name and price as parameters
  - Emits the ItemCreated event

  • A function getItemCount that:
  - Returns the total number of items created`,
            initialCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    // Add your code here
}`,
            expectedCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    event ItemCreated(address indexed owner, string name, uint256 price);
    
    uint256 private itemCount;
    
    function createItem(string memory _name, uint256 _price) public {
        itemCount++;
        emit ItemCreated(msg.sender, _name, _price);
    }
    
    function getItemCount() public view returns (uint256) {
        return itemCount;
    }
}`,
            completed: false
          }
        ]
      },
      {
        id: "lesson-2",
        title: "Smart Contract Development",
        description: "Building your first smart contract",
        completed: false,
        steps: [
          {
            id: "step-1",
            title: "Contract Structure",
            briefDescription: "Understanding the basic structure of a smart contract",
            content: `Smart Contract Development

Let's explore the fundamental structure of a smart contract and its essential components.

1. Basic Contract Structure:

• Pragma directive

• Contract declaration

• State variables

• Functions

• Events

• Modifiers

Example:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

contract BasicContract {
    // State variables
    address public owner;
    uint256 public value;
    
    // Events
    event ValueUpdated(uint256 newValue);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    // Constructor
    constructor() public {
        owner = msg.sender;
    }
    
    // Functions
    function setValue(uint256 _value) public onlyOwner {
        value = _value;
        emit ValueUpdated(_value);
    }
}
\`\`\`

2. Key Components:

a. State Variables:

• Stored permanently in contract storage

• Can be public, private, or internal

• Can be constant or immutable

b. Functions:

• Can be public, private, internal, or external

• Can be view or pure

• Can be payable

• Can have modifiers

c. Events:

• Used for logging

• Indexed parameters for efficient filtering

• Emitted using emit keyword

d. Modifiers:

• Reusable access control

• Can have parameters

• Use _; to continue execution

Put it to the test:
Create a contract with:

• A public address variable named owner

• A public uint256 variable named balance

• A modifier named onlyOwner

• A constructor that sets the owner

• A public function named deposit that:
  - Takes a uint256 parameter
  - Adds it to the balance
  - Emits an event named Deposit

  • A public function named withdraw that:
  - Takes a uint256 parameter
  - Subtracts it from the balance
  - Can only be called by the owner
  - Emits an event named Withdraw`,
            initialCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    // Add your code here
}`,
            expectedCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    address public owner;
    uint256 public balance;
    
    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() public {
        owner = msg.sender;
    }
    
    function deposit(uint256 _amount) public {
        balance += _amount;
        emit Deposit(_amount);
    }
    
    function withdraw(uint256 _amount) public onlyOwner {
        require(_amount <= balance, "Insufficient balance");
        balance -= _amount;
        emit Withdraw(_amount);
    }
}`,
            completed: false
          },
          {
            id: "step-2",
            title: "State Variables",
            briefDescription: "Working with state variables and their visibility",
            content: `State variables are crucial for storing data in smart contracts. Let's explore their types, visibility, and best practices.

1. State Variable Types:

• uint: Unsigned integers

• int: Signed integers

• bool: Boolean values

• address: Ethereum addresses

• string: Text data

• bytes: Byte arrays

• mapping: Key-value pairs

• array: Fixed or dynamic arrays

• struct: Custom data structures

Example:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

contract StateVariables {
    // Basic types
    uint256 public number;
    bool public isActive;
    address public owner;
    string public name;
    
    // Complex types
    struct User {
        string name;
        uint256 age;
        bool isActive;
    }
    
    mapping(address => User) public users;
    User[] public userList;
    
    // Constants
    uint256 public constant MAX_USERS = 100;
    address public immutable deployer;
    
    constructor() public {
        deployer = msg.sender;
    }
}
\`\`\`

2. Visibility Modifiers:

• public: Readable from outside

• private: Only readable internally

• internal: Readable internally and by derived contracts

• external: Only readable from outside

3. Storage Keywords:

• constant: Value set at compile time

• immutable: Value set in constructor

• storage: Default storage location

• memory: Temporary storage

• calldata: Read-only temporary storage

Put it to the test:
Create a contract with:

• A struct named Product containing:
  - name (string)
  - price (uint256)
  - inStock (bool)

  • A mapping from address to Product named products

• A public function named addProduct that:
  - Takes name and price as parameters
  - Creates a new Product
  - Stores it in the products mapping

  • A public function named getProduct that:
  - Takes an address parameter
  - Returns the product for that address`,
            initialCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    // Add your code here
}`,
            expectedCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    struct Product {
        string name;
        uint256 price;
        bool inStock;
    }
    
    mapping(address => Product) public products;
    
    function addProduct(string memory _name, uint256 _price) public {
        products[msg.sender] = Product({
            name: _name,
            price: _price,
            inStock: true
        });
    }
    
    function getProduct(address _owner) public view returns (string memory, uint256, bool) {
        Product memory product = products[_owner];
        return (product.name, product.price, product.inStock);
    }
}`,
            completed: false
          },
          {
            id: "step-3",
            title: "Function Modifiers",
            briefDescription: "Creating and using function modifiers",
            content: `Function modifiers are powerful tools for adding reusable functionality to functions. Let's explore how to create and use them effectively.

1. Basic Modifiers:

• Reusable access control

• Input validation

• State checks

• Gas optimization

Example:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

contract ModifierExample {
    address public owner;
    uint256 public value;
    bool public isActive;
    
    // Basic modifier
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    // Modifier with parameter
    modifier minimumValue(uint256 _min) {
        require(value >= _min, "Value is too low");
        _;
    }
    
    // Modifier with multiple conditions
    modifier whenActive() {
        require(isActive, "Contract is not active");
        _;
    }
    
    // Modifier with state changes
    modifier updateValue() {
        uint256 oldValue = value;
        _;
        emit ValueUpdated(oldValue, value);
    }
    
    event ValueUpdated(uint256 oldValue, uint256 newValue);
    
    constructor() public {
        owner = msg.sender;
        isActive = true;
    }
    
    function setValue(uint256 _newValue) public onlyOwner whenActive updateValue {
        value = _newValue;
    }
}
\`\`\`

2. Advanced Modifier Patterns:

a. Time-based Modifiers:
\`\`\`
modifier onlyAfter(uint256 _time) {
    require(block.timestamp >= _time, "Too early");
    _;
}
\`\`\`

b. State-based Modifiers:
\`\`\`
modifier whenNotPaused() {
    require(!paused, "Contract is paused");
    _;
}
\`\`\`

c. Role-based Modifiers:
\`\`\`
modifier onlyRole(bytes32 role) {
    require(hasRole(role, msg.sender), "Caller does not have role");
    _;
}
\`\`\`

3. Best Practices:

• Keep modifiers simple and focused

• Use modifiers for common checks

• Consider gas costs

• Use events in modifiers when appropriate

• Document modifier requirements

Put it to the test:
Create a contract with:

• A public uint256 variable named balance

• A public bool variable named isLocked

• A modifier named onlyUnlocked

• A modifier named minimumAmount that takes a uint256 parameter

• A public function named deposit that:
  - Takes a uint256 parameter
  - Can only be called when unlocked
  - Requires a minimum amount
  - Adds the amount to balance

  • A public function named withdraw that:
  - Takes a uint256 parameter
  - Can only be called when unlocked
  - Requires a minimum amount
  - Subtracts the amount from balance`,
            initialCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    // Add your code here
}`,
            expectedCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    uint256 public balance;
    bool public isLocked;
    
    modifier onlyUnlocked() {
        require(!isLocked, "Contract is locked");
        _;
    }
    
    modifier minimumAmount(uint256 _amount) {
        require(_amount >= 100, "Amount too small");
        _;
    }
    
    function deposit(uint256 _amount) public onlyUnlocked minimumAmount(_amount) {
        balance += _amount;
    }
    
    function withdraw(uint256 _amount) public onlyUnlocked minimumAmount(_amount) {
        require(_amount <= balance, "Insufficient balance");
        balance -= _amount;
    }
}`,
            completed: false
          }
        ]
      },
      {
        id: "lesson-3",
        title: "Advanced Concepts",
        description: "Exploring advanced Solidity features",
        completed: false,
        steps: [
          {
            id: "step-1",
            title: "Inheritance",
            briefDescription: "Understanding contract inheritance",
            content: `Inheritance is a powerful feature in Solidity that allows contracts to inherit properties and functions from other contracts. Let's explore how to use it effectively.

1. Basic Inheritance:

• Use the is keyword

• Can inherit from multiple contracts

• Can override functions

• Can call parent functions using super

Example:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

contract Parent {
    string public name;
    
    constructor(string memory _name) public {
        name = _name;
    }
    
    function setName(string memory _name) public {
        name = _name;
    }
}

contract Child is Parent {
    uint256 public age;
    
    constructor(string memory _name, uint256 _age) Parent(_name) public {
        age = _age;
    }
    
    function setAge(uint256 _age) public {
        age = _age;
    }
}
\`\`\`

2. Multiple Inheritance:
\`\`\`
contract A {
    function foo() public pure returns (string memory) {
        return "A";
    }
}

contract B {
    function foo() public pure returns (string memory) {
        return "B";
    }
}

contract C is A, B { 
    function foo() public pure override(A, B) returns (string memory) { 
        return super.foo(); 
    } 
} 
\`\`\`

3. Abstract Contracts:
\`\`\`
abstract contract AbstractContract {
    function abstractFunction() public virtual;
    
    function concreteFunction() public pure returns (uint256) {
        return 42;
    }
}

contract ConcreteContract is AbstractContract {
    function abstractFunction() public override {
        // Implementation here
    }
}
\`\`\`

Key Points:

• Use virtual and override keywords

• Call parent constructors

• Handle multiple inheritance carefully

• Use abstract contracts for interfaces

• Consider gas costs

Put it to the test:
Create a contract hierarchy with:
1. A base contract named Animal containing:
   
• A public string variable named name
   
   • A public function named setName
   
   • A virtual function named makeSound
2. A contract named Dog that:
   
• Inherits from Animal
   
   • Overrides makeSound to return "Woof!"
3. A contract named Cat that:
   
• Inherits from Animal
   
   • Overrides makeSound to return "Meow!"`,
            initialCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    // Add your code here
}`,
            expectedCode: `pragma solidity >=0.5.0 <0.6.0;

contract Animal {
    string public name;
    
    function setName(string memory _name) public {
        name = _name;
    }
    
    function makeSound() public virtual pure returns (string memory) {
        return "";
    }
}

contract Dog is Animal {
    function makeSound() public override pure returns (string memory) {
        return "Woof!";
    }
}

contract Cat is Animal {
    function makeSound() public override pure returns (string memory) {
        return "Meow!";
    }
}`,
            completed: false
          },
          {
            id: "step-2",
            title: "Interfaces",
            briefDescription: "Working with interfaces and abstract contracts",
            content: `Interfaces and abstract contracts are essential for defining contract behavior and enabling contract interaction. Let's explore how to use them effectively.

1. Interfaces:

• Define function signatures

• Cannot have state variables

• Cannot have constructors

• Cannot have function implementations

• Can inherit from other interfaces

Example:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract MyToken is IERC20 {
    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    
    function totalSupply() external view override returns (uint256) {
        return _totalSupply;
    }
    
    function balanceOf(address account) external view override returns (uint256) {
        return _balances[account];
    }
    
    // Implement other interface functions...
}
\`\`\`

2. Abstract Contracts:

• Can have state variables

• Can have constructors

• Can have implemented functions

• Must implement all abstract functions

• Cannot be deployed directly

Example:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

abstract contract BaseContract {
    uint256 public value;
    
    constructor(uint256 _value) public {
        value = _value;
    }
    
    function abstractFunction() public virtual;
    
    function concreteFunction() public pure returns (uint256) {
        return 42;
    }
}

contract ConcreteContract is BaseContract {
    constructor(uint256 _value) BaseContract(_value) public {}
    
    function abstractFunction() public override {
        value += 1;
    }
}
\`\`\`

3. Best Practices:

• Use interfaces for external contract interaction

• Use abstract contracts for shared functionality

• Keep interfaces minimal and focused

• Document interface requirements

• Consider gas costs

Put it to the test:
Create:
1. An interface named ICalculator with:
   
• A function add that takes two uint256 parameters and returns uint256
   
   • A function subtract that takes two uint256 parameters and returns uint256
2. A contract named Calculator that:
   
• Implements ICalculator
   
   • Implements both functions with basic arithmetic`,
            initialCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    // Add your code here
}`,
            expectedCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    function calculateTotal(uint256 price, uint256 quantity) public pure returns (uint256) {
        return price * quantity;
    }
    
    function calculateDiscount(uint256 amount, uint256 discountPercentage) public pure returns (uint256) {
        require(discountPercentage <= 100, "Discount percentage must be <= 100");
        return amount * (100 - discountPercentage) / 100;
    }
}`,
            completed: false
          },
          {
            id: "step-3",
            title: "Libraries",
            briefDescription: "Using libraries in Solidity",
            content: `Libraries are reusable code snippets that can be used across multiple contracts. Let's explore how to create and use libraries effectively.

1. Basic Libraries:

• Cannot have state variables

• Cannot inherit

• Cannot be inherited

• Can be used with using for

• Can be linked to contracts

Example:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

library Math {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }
    
    function subtract(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }
    
    function multiply(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }
    
    function divide(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0, "Division by zero");
        return a / b;
    }
}

contract Calculator {
    using Math for uint256;
    
    function calculate(uint256 a, uint256 b) public pure returns (uint256) {
        return a.add(b).multiply(2);
    }
}
\`\`\`

2. Advanced Library Features:

a. String Operations:
\`\`\`
library StringUtils {
    function concat(string memory a, string memory b) internal pure returns (string memory) {
        return string(abi.encodePacked(a, b));
    }
    
    function toUpperCase(string memory str) internal pure returns (string memory) {
        bytes memory bStr = bytes(str);
        bytes memory bUpper = new bytes(bStr.length);
        for (uint i = 0; i < bStr.length; i++) {
            if ((bStr[i] >= 97) && (bStr[i] <= 122)) {
                bUpper[i] = bytes1(uint8(bStr[i]) - 32);
            } else {
                bUpper[i] = bStr[i];
            }
        }
        return string(bUpper);
    }
}
\`\`\`

b. Array Operations:
\`\`\`
library ArrayUtils {
    function remove(uint256[] storage array, uint256 index) internal {
        require(index < array.length, "Index out of bounds");
        array[index] = array[array.length - 1];
        array.pop();
    }
    
    function contains(uint256[] storage array, uint256 value) internal view returns (bool) {
        for (uint i = 0; i < array.length; i++) {
            if (array[i] == value) {
                return true;
            }
        }
        return false;
    }
}
\`\`\`

3. Best Practices:

• Keep libraries focused and reusable

• Use internal functions for gas efficiency

• Consider using for syntax

• Document library functions

• Test library functions thoroughly

Put it to the test:
Create:
1. A library named StringUtils with:
   
• A function concat that takes two strings and returns their concatenation
   
   • A function length that takes a string and returns its length
2. A contract named StringProcessor that:
   
• Uses the StringUtils library
   
   • Has a function process that takes two strings and returns their concatenated length`,
            initialCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    // Add your code here
}`,
            expectedCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    function calculateTotal(uint256 price, uint256 quantity) public pure returns (uint256) {
        return price * quantity;
    }
    
    function calculateDiscount(uint256 amount, uint256 discountPercentage) public pure returns (uint256) {
        require(discountPercentage <= 100, "Discount percentage must be <= 100");
        return amount * (100 - discountPercentage) / 100;
    }
}`,
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: "chainlink-oracles",
    title: "Chainlink: Decentralized Oracles",
    subtitle: "Chainlink Oracle Intermediate",
    description: "Learn how to integrate Chainlink oracles into your smart contracts",
    difficulty: "Intermediate",
    completion: 0,
    backgroundColor: "bg-gray-800",
    imageUrl: "https://cryptologos.cc/logos/chainlink-link-logo.png?v=040",
    lessons: [
      {
        id: "lesson-1",
        title: "Introduction to Chainlink",
        description: "Understanding what Chainlink is and its role in DeFi",
        completed: false,
        steps: [
          {
            id: "step-1",
            title: "What is Chainlink?",
            briefDescription: "Introduction to Chainlink and its purpose",
            content: `Chainlink is a decentralized oracle network that enables smart contracts to securely interact with real-world data and external APIs. Let's explore its core concepts and importance.

1. Core Concepts:

• Decentralized Oracle Network

• Price Feeds

• VRF (Verifiable Random Function)

• Keepers

• External Adapters

Example:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

import "@chainlink/contracts/src/v0.5/interfaces/AggregatorV3Interface.sol";

contract PriceConsumer {
    AggregatorV3Interface internal priceFeed;
    
    constructor(address _priceFeed) public {
        priceFeed = AggregatorV3Interface(_priceFeed);
    }
    
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
\`\`\`

2. Key Features:

• Decentralized Data Sources

• Secure Price Feeds

• Random Number Generation

• Automated Execution

• Cross-chain Compatibility

3. Use Cases:

• DeFi Applications

• Gaming

• Insurance

• Supply Chain

• Sports Betting

Put it to the test:
Create a contract that:

• Imports the Chainlink AggregatorV3Interface

• Has a constructor that takes a price feed address

• Has a function that returns the latest price from the feed`,
            initialCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    // Add your code here
}`,
            expectedCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    AggregatorV3Interface internal priceFeed;
    
    constructor(address _priceFeed) public {
        priceFeed = AggregatorV3Interface(_priceFeed);
    }
    
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}`,
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: "advanced-solidity",
    title: "Advanced Solidity: Get In-depth Knowledge",
    subtitle: "Solidity Advanced",
    description: "Master advanced Solidity concepts and patterns",
    difficulty: "Advanced",
    completion: 0,
    backgroundColor: "bg-gray-800",
    imageUrl: "https://cryptozombies.io/course/1f0a6418177020aeb1e1.png",
    lessons: [
      {
        id: "lesson-1",
        title: "Advanced Contract Patterns",
        description: "Understanding complex contract patterns",
        completed: false,
        steps: [
          {
            id: "step-1",
            title: "Factory Pattern",
            briefDescription: "Implementing the Factory pattern",
            content: `The Factory pattern is a creational pattern that allows contracts to create other contracts. Let's explore how to implement it effectively.

1. Factory Pattern Structure:

• Factory Contract

• Product Contracts

• Creation Logic

• Event Logging

• Address Tracking

Example:
\`\`\`
pragma solidity >=0.5.0 <0.6.0;

contract Product {
    string public name;
    uint256 public price;
    
    constructor(string memory _name, uint256 _price) public {
        name = _name;
        price = _price;
    }
}

contract ProductFactory {
    address[] public products;
    
    event ProductCreated(address productAddress, string name, uint256 price);
    
    function createProduct(string memory _name, uint256 _price) public returns (address) {
        Product newProduct = new Product(_name, _price);
        products.push(address(newProduct));
        
        emit ProductCreated(address(newProduct), _name, _price);
        return address(newProduct);
    }
    
    function getProductCount() public view returns (uint256) {
        return products.length;
    }
    
    function getProduct(uint256 index) public view returns (address) {
        require(index < products.length, "Index out of bounds");
        return products[index];
    }
}
\`\`\`

2. Advanced Factory Features:

• Upgradeable Products

• Product Registry

• Access Control

• Event Tracking

• Error Handling

Put it to the test:
Create a factory contract that:

• Creates new product contracts

• Tracks all created products

• Allows querying product count

• Emits events for creation

• Includes access control`,
            initialCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    // Add your code here
}`,
            expectedCode: `pragma solidity >=0.5.0 <0.6.0;

contract MyFirstContract {
    function calculateTotal(uint256 price, uint256 quantity) public pure returns (uint256) {
        return price * quantity;
    }
    
    function calculateDiscount(uint256 amount, uint256 discountPercentage) public pure returns (uint256) {
        require(discountPercentage <= 100, "Discount percentage must be <= 100");
        return amount * (100 - discountPercentage) / 100;
    }
}`,
            completed: false
          }
        ]
      }
    ]
  }
];

export default courses; 