pragma solidity ^0.5.0;

contract DataExchangeContract {
    string public data;

    function set(string memory _data) public {
        data = _data;
    
        }
    
    uint public ids;
    
    uint public count = 0;

event Increment(uint value);
event Decrement(uint value);

function getCount() view public returns (uint) {
    return count;
}

function increment() public {
    count += 1;
    emit Increment(count);
}

function decrement() public{
    count -= 1;
    emit Decrement(count);
}
}

contract FundExchangeContract {
    string public data;


    function set(string memory _data) public {
        data = _data;
    
        }
    
    uint public ids;
    
    uint public count = 0;

event Increment(uint value);
event Decrement(uint value);

function getCount() view public returns (uint) {
    return count;
}

function increment() public {
    count += 1;
    emit Increment(count);
}

function decrement() public{
    count -= 1;
    emit Decrement(count);
}
}
