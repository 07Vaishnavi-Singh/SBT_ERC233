require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const QUICKNODE_HTTP_URL = process.env.QUICKNODE_HTTP_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: "https://long-billowing-hexagon.ethereum-goerli.discover.quiknode.pro/a2c26742839dc11b429e4989c4042fedcf1e486b/",
      accounts: [ "a3187aecc91f28fa34b4ca927c53c2a54ceb6601acb2037c3dce8d78d9018a4e" ],
    },
  },
};
