// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./SBTERC223.sol";

// just see how to inherit interfaces 

 abstract contract Vesting is IERC223{

IERC223  public token ;
uint public founderCap = 120000000 * (10**18);
uint public advisorCap = 16000000 * (10**18);
uint public developerCap = 24000000 * (10**18);
uint public nMaxFounder;
uint public nMaxAdvisor;
uint public nMaxDeveloper;
uint public nFounder;
uint public nAdvisor;
uint public nDeveloper;
uint public percentage = 10 ;
uint public VESTING_START_TIME ;
address payable public  FOUNDER_WALLET ;
address payable public  ADVISOR_ADDRESS ;
address payable public  TEAM_ADDRESS;
address public TOKEN_CONTRACT_ADDRESS ;
bool public locked = true  ;

constructor(uint _VESTING_START_TIME,address _FOUNDER_WALLET, address _ADVISOR_ADDRESS , address _TEAM_ADDRESS , address _TOKEN_CONTRACT_ADDRESS ) {


VESTING_START_TIME = _VESTING_START_TIME ;
FOUNDER_WALLET = payable(_FOUNDER_WALLET) ;
ADVISOR_ADDRESS = payable(_ADVISOR_ADDRESS) ;
TEAM_ADDRESS = payable(_TEAM_ADDRESS) ;
// TOKEN_CONTRACT_ADDRESS = IERC223(_TOKEN_CONTRACT_ADDRESS) ; // this showing an error till all the unimplemented functions are implemented in this contract 


}

function getNumberOfTimes() public {

nMaxFounder = founderCap / 600 ;
nMaxAdvisor = advisorCap /600 ;
nMaxDeveloper = developerCap /600 ;

}


function check() public {

require(!locked,"It is already unlocked");
require(block.timestamp > VESTING_START_TIME , "" );
require((((block.timestamp - VESTING_START_TIME)%600 == 0 ) && ((nFounder <= nMaxFounder) || (nAdvisor <= nMaxAdvisor) || (nDeveloper <= nMaxDeveloper)) ), "Only after 10 minutes ");
withdrawal();
}


function withdrawal() internal {

if(nFounder <= nMaxFounder){
       ADVISOR_ADDRESS.transfer((percentage * founderCap )/100);
      nFounder++;
}



if(nAdvisor <= nMaxAdvisor){
       ADVISOR_ADDRESS.transfer((percentage * advisorCap )/100);
      nAdvisor++;
}



if(nDeveloper <= nMaxDeveloper){
       TEAM_ADDRESS.transfer((percentage * advisorCap )/100);
      nDeveloper++;
}


}



}