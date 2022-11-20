const express = require("express");
const fs = require("fs");
const { destiny } = require("./database");
const app = express();
const ejs = require("ejs");
const { off } = require("process");
let weapons = [];
let armors = [];
let titan = [
  {
    className: "Hammer of Sol",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/746ed830d614d66f57d379811a57d03d.png",
  },
  {
    className: "Burning Maul",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/81b0c61ff8ac802d3216324028b7e835.png",
  },
  {
    className: "Thundercrash",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/4e03473a24049bdb6013badca6b61965.png",
  },
  {
    className: "Fists of Havoc",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/20f5a1879f8562e3ce6c0140b0e2fd8d.png",
  },
  {
    className: "Ward of Dawn",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/91eec50f00de84db8b666ec299859a21.png",
  },
  {
    className: "Sentinel Shield",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/f02fd0d90b8d3d7182b9c7cab1a46f64.png",
  },
  {
    className: "Glacial Quake",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/a764f6e02c1912967ea8e2b701d90cfd.png",
  },
];
let hunter = [
  {
    className: "Golden Gun - Deadshot",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/16e3aaf50ac9fa802b692af48b895886.png",
  },
  {
    className: "Golden Gun - Marksman",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/6f3e329cf7d330f7ba0cd0f940e98110.png",
  },
  {
    className: "Blade Barrage",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/5178685d628a640be304950a6b7da11f.png",
  },
  {
    className: "Arc Staff",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/022d0ea9e0ca89294bb1c9cef65273b8.png",
  },
  {
    className: "Gathering Storm",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/5919e3e43ab455cee03ff23cdaa23080.png",
  },
  {
    className: "Shadowshot - Deadfall",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/a30563f95eea66ef729a4e65a7152fa7.png",
  },
  {
    className: "Shadowshot - Moebius Quiver",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/af58a42be4e803d1b5a7885b13985977.png",
  },
  {
    className: "Spectral Blades",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/a219dacf9847a5c6174d096ce394e460.png",
  },
  {
    className: "Silence and Squall",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/bac0872a1d59eb9a6f3a0ca7f349b8cc.png",
  },
];
let warlock = [
  {
    className: "Daybreak",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/ce006cb360a96d8f054e49499d924603.png",
  },
  {
    className: "Well of Radiance",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/5dbb9a2f285df3ee20fe37d073350a37.png",
  },
  {
    className: "Chaos Reach",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/c1e711eb4bd8ee24a257fd83a635054c.png",
  },
  {
    className: "Stormtrance",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/2dd43a50e48bab5c297c8459bc125bd2.png",
  },
  {
    className: "Nova Bomb - Vortex",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/0230272ce6d6d6ed1d1a3a951e460f34.png",
  },
  {
    className: "Nova Warp - Cataclysm",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/fd0d80cb5f7c0f777795ab3d1b701f4f.png",
  },
  {
    className: "Winter's Wrath",
    classImage:
      "https://www.bungie.net/common/destiny2_content/icons/3adf16d07aab7c46551bd1bfa9e2e283.png",
  },
];

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

app.set("view engine", "ejs");
app.set("views", __dirname + "/public");

app.use("/", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home");
});

let randomized = {
  kineticImg: "",
  kineticText: "",
  energyImg: "",
  energyText: "",
  heavyImg: "",
  heavyText: "",
  armorImg: "",
  armorText: "",
  classImg: "",
  classText: "",
};

app.get("/randomizer", (req, res) => {
  res.render("randomizer", { randomized });
});

app.post("/randomizer", (req, res) => {
  randomize();
  res.render("randomizer", { randomized });
});

async function randomize() {
  await importWeapons;
  await importArmor;
  let kinetic;
  let energy;
  let heavy;
  let armor;
  let classSuper;
  let kineticOptions = weapons.filter(function (element) {
    return element.slot == 0;
  });
  let energyOptions = weapons.filter(function (element) {
    return element.slot == 1;
  });
  let heavyOptions = weapons.filter(function (element) {
    return element.slot == 2;
  });
  let firstSlot = Math.floor(Math.random() * 3);
  console.log(firstSlot);
  if (firstSlot == 0) {
    kinetic = kineticOptions[Math.floor(Math.random() * kineticOptions.length)];
    randomized.kineticImg = kinetic.image;
    randomized.kineticText = kinetic.name;
    if (kinetic.tier == "Exotic") {
      heavyOptions = heavyOptions.filter(function (element) {
        return element.tier != "Exotic";
      });
      energyOptions = energyOptions.filter(function (element) {
        return element.tier != "Exotic";
      });
    }
    if (kinetic.ammo == 2) {
      energyOptions = energyOptions.filter(function (element) {
        return element.ammo != 2;
      });
    }
    let nextSlot = Math.floor(Math.random() * 2);
    if (nextSlot == 0) {
      heavy = heavyOptions[Math.floor(Math.random() * heavyOptions.length)];
      randomized.heavyImg = heavy.image;
      randomized.heavyText = heavy.name;
      if (heavy.tier == "Exotic") {
        energyOptions = energyOptions.filter(function (element) {
          return element.tier != "Exotic";
        });
      }
      energy = energyOptions[Math.floor(Math.random() * energyOptions.length)];
      randomized.energyImg = energy.image;
      randomized.energyText = energy.name;
    } else {
      energy = energyOptions[Math.floor(Math.random() * energyOptions.length)];
      randomized.energyImg = energy.image;
      randomized.energyText = energy.name;
      if (energy.tier == "Exotic") {
        heavyOptions = heavyOptions.filter(function (element) {
          return element.tier != "Exotic";
        });
      }
      heavy = heavyOptions[Math.floor(Math.random() * heavyOptions.length)];
      randomized.heavyImg = heavy.image;
      randomized.heavyText = heavy.name;
    }
  } else if (firstSlot == 1) {
    energy = energyOptions[Math.floor(Math.random() * energyOptions.length)];
    randomized.energyImg = energy.image;
    randomized.energyText = energy.name;
    if (energy.tier == "Exotic") {
      heavyOptions = heavyOptions.filter(function (element) {
        return element.tier != "Exotic";
      });
      kineticOptions = kineticOptions.filter(function (element) {
        return element.tier != "Exotic";
      });
    }
    if (energy.ammo == 2) {
      kineticOptions = kineticOptions.filter(function (element) {
        return element.ammo != 2;
      });
    }
    let nextSlot = Math.floor(Math.random() * 2);
    if (nextSlot == 0) {
      kinetic =
        kineticOptions[Math.floor(Math.random() * kineticOptions.length)];
      randomized.kineticImg = kinetic.image;
      randomized.kineticText = kinetic.name;
      if (kinetic.tier == "Exotic") {
        heavyOptions = heavyOptions.filter(function (element) {
          return element.tier != "Exotic";
        });
      }
      heavy = heavyOptions[Math.floor(Math.random() * heavyOptions.length)];
      randomized.heavyImg = heavy.image;
      randomized.heavyText = heavy.name;
    } else {
      heavy = heavyOptions[Math.floor(Math.random() * heavyOptions.length)];
      randomized.heavyImg = heavy.image;
      randomized.heavyText = heavy.name;
      if (heavy.tier == "Exotic") {
        kineticOptions = kineticOptions.filter(function (element) {
          return element.tier != "Exotic";
        });
      }
      kinetic =
        kineticOptions[Math.floor(Math.random() * kineticOptions.length)];
      randomized.kineticImg = kinetic.image;
      randomized.kineticText = kinetic.name;
    }
  } else {
    heavy = heavyOptions[Math.floor(Math.random() * heavyOptions.length)];
    randomized.heavyImg = heavy.image;
    randomized.heavyText = heavy.name;
    if (heavy.tier == "Exotic") {
      kineticOptions = kineticOptions.filter(function (element) {
        return element.tier != "Exotic";
      });
      energyOptions = energyOptions.filter(function (element) {
        return element.tier != "Exotic";
      });
    }
    let nextSlot = Math.floor(Math.random() * 2);
    if (nextSlot == 0) {
      kinetic =
        kineticOptions[Math.floor(Math.random() * kineticOptions.length)];
      randomized.kineticImg = kinetic.image;
      randomized.kineticText = kinetic.name;
      if (kinetic.tier == "Exotic") {
        energyOptions = energyOptions.filter(function (element) {
          return element.tier != "Exotic";
        });
      }
      if (kinetic.ammo == 2) {
        energyOptions = energyOptions.filter(function (element) {
          return element.ammo != 2;
        });
      }
      energy = energyOptions[Math.floor(Math.random() * energyOptions.length)];
      randomized.energyImg = energy.image;
      randomized.energyText = energy.name;
    } else {
      energy = energyOptions[Math.floor(Math.random() * energyOptions.length)];
      randomized.energyImg = energy.image;
      randomized.energyText = energy.name;
      if (energy.tier == "Exotic") {
        kineticOptions = kineticOptions.filter(function (element) {
          return element.tier != "Exotic";
        });
      }
      if (energy.ammo == 2) {
        kineticOptions = kineticOptions.filter(function (element) {
          return element.ammo != 2;
        });
      }
      kinetic =
        kineticOptions[Math.floor(Math.random() * kineticOptions.length)];
      randomized.kineticImg = kinetic.image;
      randomized.kineticText = kinetic.name;
    }
  }
  armor = armors[Math.floor(Math.random() * armors.length)];
  randomized.armorImg = armor.image;
  randomized.armorText = armor.name;
  if (armor.class == 0) {
    classSuper = titan[Math.floor(Math.random() * titan.length)];
  } else if (armor.class == 1) {
    classSuper = hunter[Math.floor(Math.random() * hunter.length)];
  } else {
    classSuper = warlock[Math.floor(Math.random() * warlock.length)];
  }
  randomized.classImg = classSuper.classImage;
  randomized.classText = classSuper.className;
  console.log(kinetic.name);
}

function processWeapons(weapon) {
  if (weapon.slot == 953998645) {
    weapon.slot = 2;
  } else if (weapon.slot == 2465295065) {
    weapon.slot = 1;
  } else {
    weapon.slot = 0;
  }
  weapon.image = "https://www.bungie.net" + weapon.image;
  weapons.push(weapon);
}

let importWeapons = new Promise(function (resolve, reject) {
  destiny("DestinyInventoryItemDefinition")
    .jsonExtract("json", "$.displayProperties.name", "name")
    .jsonExtract("json", "$.displayProperties.icon", "image")
    .jsonExtract("json", "$.equippingBlock.ammoType", "ammo")
    .jsonExtract("json", "$.inventory.tierTypeName", "tier")
    .jsonExtract("json", "$.equippingBlock.equipmentSlotTypeHash", "slot")
    .whereLike("json", "%equipmentSlotTypeHash%")
    .whereLike("json", "%item_type.weapon%")
    .andWhereLike("json", "%Legendary%")
    .orWhereLike("json", "%item_type.weapon%")
    .andWhereLike("json", "%Exotic%")
    .then((DestinyInventoryItemDefinition) =>
      DestinyInventoryItemDefinition.forEach((element) => {
        processWeapons(element);
      })
    );
  resolve(console.log("Weapons imported"));
});

function processArmor(armor) {
  armor.image = "https://www.bungie.net" + armor.image;
  armors.push(armor);
}

let importArmor = new Promise(function (resolve, reject) {
  destiny("DestinyInventoryItemDefinition")
    .jsonExtract("json", "$.displayProperties.name", "name")
    .jsonExtract("json", "$.displayProperties.icon", "image")
    .jsonExtract("json", "$.classType", "class")
    .whereLike("json", "%item_type.armor%")
    .andWhereLike("json", "%Exotic%")
    .then((DestinyInventoryItemDefinition) =>
      DestinyInventoryItemDefinition.forEach((element) => {
        processArmor(element);
      })
    );
  resolve(console.log("Armor imported"));
});
