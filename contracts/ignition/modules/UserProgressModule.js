const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("UserProgressModule", (m) => {
  const userProgress = m.contract("UserProgress", []);

  return { userProgress };
});
