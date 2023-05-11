// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

abstract contract IERC223 {
    function name() public view virtual returns (string memory);

    function symbol() public view virtual returns (string memory);

    function standard() public view virtual returns (string memory);

    function decimals() public view virtual returns (uint8);

    function totalSupply() public view virtual returns (uint256);

    function balanceOf(address who) public view virtual returns (uint);

    function transfer(
        address to,
        uint value
    ) public virtual returns (bool success);

// if data is also to be transferred 
    function transferData(
        address to,
        uint value,
        bytes calldata data
    ) public virtual returns (bool success);

    event Transfer(address indexed from, address indexed to, uint value);
    event TransferData(bytes data);
}


abstract contract IERC223Recipient {
    struct ERC223TransferInfo {
        address token_contract;
        address sender;
        uint256 value;
        bytes data;
    }

    ERC223TransferInfo private tkn;

    function tokenReceived(
        address _from,
        uint _value,
        bytes memory _data
    ) public virtual {
        tkn.token_contract = msg.sender;
        tkn.sender = _from;
        tkn.value = _value;
        tkn.data = _data;
    }
}


library Address {

    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }

    function toPayable(
        address account
    ) internal pure returns (address payable) {
        return payable(account);
    }
}


contract SBTERC223 is IERC223 {
    string private _name;
    string private _symbol;
    uint8 private _decimals;
    uint256 private _totalSupply;
address public owner ;

    mapping(address => uint256) public balances; // List of user balances.


    constructor() {
        owner = msg.sender ; 
        _name = "SABATA";
        _symbol = "SBT";
        _decimals = 18;
        _totalSupply = 400000000 * (10 ** _decimals );
        balances[owner] = _totalSupply;
    }


    function standard() public pure override returns (string memory) {
        return "erc223";
    }


    function name() public view override returns(string memory) {
        return _name;
    }


    function symbol() public view override returns (string memory) {
        return _symbol;
    }


    function decimals() public view override returns (uint8) {
        return _decimals;
    }


    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }


    function balanceOf(address _owner) public view override returns (uint256) {
        return balances[_owner];
    }


    function transferData(
        address _to,
        uint _value,
        bytes calldata _data
    ) public override returns (bool success) {
        // Standard function transfer similar to ERC20 transfer with no _data .
        // Added due to backwards compatibility reasons .
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if (Address.isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value);
        emit TransferData(_data);
        return true;
    }


    function transfer(
        address _to,
        uint _value
    ) public override returns (bool success) {
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if (Address.isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value);
        emit TransferData(_empty);
        return true;
    }
}


//0xBE8f8Ea392d113B20F490164B43F8Fcb2cac92f9
