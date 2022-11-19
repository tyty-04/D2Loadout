const express = require("express");
const fs = require("fs");
const { destiny } = require("./database");
const app = express();

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

app.use("/", express.static(__dirname + "/public"));

let weapons = [];
function processWeapons(weapon) {
  if (weapon.slot == 953998645) {
    weapon.slot = 3;
  } else if (weapon.slot == 2465295065) {
    weapon.slot = 2;
  } else {
    weapon.slot = 1;
  }
  weapons.push(weapon);
}

function importWeapons() {
  destiny("DestinyInventoryItemDefinition")
    .jsonExtract("json", "$.displayProperties.name", "name")
    .jsonExtract("json", "$.displayProperties.icon", "image")
    .jsonExtract("json", "$.equippingBlock.ammoType", "ammo")
    .jsonExtract("json", "$.inventory.tierTypeName", "tier")
    .jsonExtract("json", "$.equippingBlock.equipmentSlotTypeHash", "slot")
    .whereLike("json", "%item_type.weapon%")
    .then((DestinyInventoryItemDefinition) =>
      DestinyInventoryItemDefinition.forEach((element) => {
        processWeapons(element);
      })
    );
}

importWeapons();
module.exports = { weapons };
