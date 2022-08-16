import { age, knackData, knacks, skillData, skills } from "./data.js";

let adventure = [];
let cat = {};

const mainMenu = document.getElementById("mainMenu");
const chooseClan = document.getElementById("chooseClan");

const title = document.getElementById("title");

const playButton = document.getElementById("playButton");
playButton.addEventListener("click", () => {
	mainMenu.hidden = true;
	chooseClan.hidden = false;
	title.innerHTML = "Choose a Clan";
});

const importCat = document.getElementById("importCat");
const importCode = document.getElementById("importCode");

importCat.addEventListener("click", () => {
	cat = JSON.parse(importCode.value);
	mainMenu.hidden = true;
	gameChooser.hidden = false;
});

const thunderSelect = document.getElementById("thunderSelect");
const riverSelect = document.getElementById("riverSelect");
const windSelect = document.getElementById("windSelect");
const shadowSelect = document.getElementById("shadowSelect");

thunderSelect.addEventListener("click", () => {
	cat.clan = "ThunderClan";
	cat.skills[7] += 1;
	document.getElementById("ponderCount").innerHTML = "+1";
	chooseClan.hidden = true;
	createCat.hidden = false;
	title.innerHTML = "Create Your Cat";
});

riverSelect.addEventListener("click", () => {
	cat.clan = "RiverClan";
	cat.skills[13] += 1;
	document.getElementById("swimCount").innerHTML = "+1";
	chooseClan.hidden = true;
	createCat.hidden = false;
	title.innerHTML = "Create Your Cat";
});

windSelect.addEventListener("click", () => {
	cat.clan = "WindClan";
	cat.skills[6] += 1;
	document.getElementById("listenCount").innerHTML = "+1";
	chooseClan.hidden = true;
	createCat.hidden = false;
	title.innerHTML = "Create Your Cat";
});

shadowSelect.addEventListener("click", () => {
	cat.clan = "ShadowClan";
	cat.skills[11] += 1;
	document.getElementById("sneakCount").innerHTML = "+1";
	chooseClan.hidden = true;
	createCat.hidden = false;
	title.innerHTML = "Create Your Cat";
});

const abilityPointsC = document.getElementById("abilityPointsC");
const skillPointsC = document.getElementById("skillPointsC");
const knackPointsC = document.getElementById("knackPointsC");

let abilityPoints = 11;
let skillPoints = 3;
let knackPoints = 3;
let intsptPoints = 0;

cat.abilities = [0, 0, 0];

["strength", "intelligence", "spirit"].forEach((c, i) => {
	document.getElementById(c + "Plus").addEventListener("click", () => {
		if (abilityPoints > 0) {
			abilityPoints--;
			cat.abilities[i]++;
			abilityPointsC.innerHTML = abilityPoints;
			document.getElementById(c + "Count").innerHTML = cat.abilities[i];
		}
	});
	document.getElementById(c + "Minus").addEventListener("click", () => {
		if (cat.abilities[i] > 0) {
			abilityPoints++;
			cat.abilities[i]--;
			abilityPointsC.innerHTML = abilityPoints;
			document.getElementById(c + "Count").innerHTML = cat.abilities[i];
		}
	});
});

["strength", "intelligence", "spirit"].forEach((c, i) => {
	document.getElementById(c + "Plus2").addEventListener("click", () => {
		if (abilityPoints > 0) {
			abilityPoints--;
			cat.abilities[i]++;
			document.getElementById("abilityUpgrades").innerHTML =
				abilityPoints;
			document.getElementById(c + "Count3").innerHTML = cat.abilities[i];
			switch (i) {
				case 0:
					strChips++;
					break;
				case 1:
					intChips++;
					break;
				case 2:
					sptChips++;
			}
		}
	});
	document.getElementById(c + "Minus2").addEventListener("click", () => {
		if (cat.abilities[i] > 0) {
			abilityPoints++;
			cat.abilities[i]--;
			document.getElementById("abilityUpgrades").innerHTML =
				abilityPoints;
			document.getElementById(c + "Count3").innerHTML = cat.abilities[i];
		}
	});
});

["intelligence", "spirit"].forEach((c, i) => {
	document.getElementById(c + "Plus4").addEventListener("click", () => {
		if (intsptPoints > 0) {
			intsptPoints--;
			cat.abilities[i]++;
			document.getElementById("intsptUpgrades").innerHTML = intsptPoints;
			document.getElementById(c + "Count4").innerHTML = cat.abilities[i];
		}
	});
	document.getElementById(c + "Minus4").addEventListener("click", () => {
		if (cat.abilities[i] > 0) {
			intsptPoints++;
			cat.abilities[i]--;
			document.getElementById("intsptUpgrades").innerHTML = intsptPoints;
			document.getElementById(c + "Count4").innerHTML = cat.abilities[i];
		}
	});
});

const chooseSkills = document.getElementById("chooseSkills");

const skillRows = [];

const parsedSkills = JSON.parse(JSON.stringify(skills));
for (let i = 0; i < parsedSkills.length; i += 5) {
	const chunk = parsedSkills.slice(i, i + 5);
	let column = 0;
	chunk.forEach(c => {
		const skillPart = document.createElement("td");
		skillPart.innerHTML = `<b>${c}</b><span class="skillType">(${
			["Strength", "Intelligence", "Spirit"][skillData[skills.indexOf(c)]]
		})</span><span id="${c.toLowerCase()}Count" class="skillCount"></span><button id="${c.toLowerCase()}Plus" class="plus">+</button><button id="${c.toLowerCase()}Minus" class="minus">-</button>`;
		column++;
		if (skillRows[column] === undefined) {
			skillRows[column] = document.createElement("tr");
		}
		skillRows[column].appendChild(skillPart);
	});
}
skillRows.forEach(c => {
	chooseSkills.appendChild(c);
});

cat.skills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

skills.forEach((c, i) => {
	c = c.toLowerCase();
	document.getElementById(c + "Plus").addEventListener("click", () => {
		if (skillPoints > 0) {
			skillPoints--;
			cat.skills[i]++;
			skillPointsC.innerHTML = skillPoints;
			document.getElementById(c + "Count").innerHTML =
				"+" + cat.skills[i];
		}
	});
	document.getElementById(c + "Minus").addEventListener("click", () => {
		if (
			cat.skills[i] > 0 &&
			(cat.skills[i] > 1
				? true
				: {
						ThunderClan: 7,
						RiverClan: 13,
						WindClan: 6,
						ShadowClan: 11,
				  }[cat.clan] !== i)
		) {
			skillPoints++;
			cat.skills[i]--;
			skillPointsC.innerHTML = skillPoints;
			document.getElementById(c + "Count").innerHTML =
				cat.skills[i] > 0 ? "+" + cat.skills[i] : "";
		}
	});
});

const doneCreating = document.getElementById("doneCreating");
const knackChooser = document.getElementById("knackChooser");

doneCreating.addEventListener("click", () => {
	cat.name = document.getElementById("catNameI").value;
	cat.age = Number(document.getElementById("catAgeI").value);
	cat.earnedExp = [];
	createCat.hidden = true;
	knackChooser.hidden = false;
	title.innerHTML = "Choose Some Knacks";
});

cat.knacks = {};
cat.knackLevels = {};

const knackListE = document.getElementById("knackList");
knacks.forEach((c, i) => {
	const knackDiv = document.createElement("div");
	knackDiv.classList.add("knack");
	knackDiv.innerHTML = c;
	knackDiv.addEventListener("click", () => {
		let knackIndex =
			cat.knacks[0] !== undefined
				? cat.knacks[1] !== undefined
					? 2
					: 1
				: 0;
		if (knackPoints > 0 && !Object.values(cat.knacks).includes(i)) {
			document.getElementById("knackc" + knackIndex).innerHTML = c;
			cat.knacks[knackIndex] = i;
			cat.knackLevels[i] = 1;
			knackPoints--;
			knackPointsC.innerHTML = knackPoints;
		}
	});
	knackListE.appendChild(knackDiv);
});

for (let i = 0; i < 3; i++) {
	document.getElementById("knackc" + i).addEventListener("click", () => {
		document.getElementById("knackc" + i).innerHTML = "";
		if (i in cat.knacks) {
			knackPoints++;
			knackPointsC.innerHTML = knackPoints;
			delete cat.knacks[i];
			delete cat.knacksLevels[i];
		}
	});
}

const knackList2 = document.getElementById("knackList2");
const knackUpgrades = document.getElementById("knackUpgrades");

knacks.forEach((c, i) => {
	const knackDiv = document.createElement("div");
	knackDiv.classList.add("knack");
	knackDiv.innerHTML = c;
	knackDiv.addEventListener("click", () => {
		let knackIndex = null;
		for (let i = 0; i < 25; i++) {
			if (cat.knacks[i] === undefined) {
				knackIndex = i;
				break;
			}
		}

		if (knackPoints > 0 && !Object.values(cat.knacks).includes(i)) {
			document.getElementById("knacku" + knackIndex).innerHTML = c;
			cat.knacks[knackIndex] = i;
			cat.knackLevels[i] = 1;
			knackPoints--;
			knackUpgrades.innerHTML = knackPoints;
		} else if (
			knackPoints > 0 &&
			(knackData[i].upgrade === -1 ? Infinity : knackData[i].upgrade) >
				cat.knackLevels[i]
		) {
			cat.knackLevels[i]++;
			document.getElementById("knacku" + cat.knacks[i]).innerHTML =
				c + " [Level " + cat.knackLevels[i] + "]";
			knackPoints--;
		}
	});
	knackList2.appendChild(knackDiv);
});

for (let i = 0; i < 25; i++) {
	document.getElementById("knacku" + i).addEventListener("click", () => {
		document.getElementById("knacku" + i).innerHTML = "";
		if (i in cat.knacks) {
			knackPoints++;
			knackUpgrades.innerHTML = knackPoints;
			delete cat.knacks[i];
			delete cat.knackLevels[i];
		}
	});
}

const saveCat = document.getElementById("saveCat");
const gameChooser = document.getElementById("gameChooser");

saveCat.addEventListener("click", () => {
	knackChooser.hidden = true;
	gameChooser.hidden = false;
	title.innerHTML = "Choose a Game";
});

const mission = document.getElementById("mission");

document.getElementById("mission1").addEventListener("click", async () => {
	adventure = await (await fetch("/missions/savethekits.json")).json();
	startAdventure();
});

document.getElementById("mission2").addEventListener("click", async () => {
	adventure = await (await fetch("/missions/feverdreams.json")).json();
	startAdventure();
});

const startAdventure = () => {
	gameChooser.hidden = true;
	mission.hidden = false;
	title.innerHTML = "Saving the Kits";
	strChips = cat.abilities[0];
	intChips = cat.abilities[1];
	sptChips = cat.abilities[2];
	document.getElementById("catNameText").innerHTML = cat.name;
	document.getElementById("strengthCount2").innerHTML = cat.abilities[0];
	document.getElementById("intelligenceCount2").innerHTML = cat.abilities[1];
	document.getElementById("spiritCount2").innerHTML = cat.abilities[2];

	currentStrength.style.width = "100%";
	currentStrength.innerHTML = `${cat.abilities[0]}/${cat.abilities[0]} STR Chips`;

	currentIntelligence.style.width = "100%";
	currentIntelligence.innerHTML = `${cat.abilities[1]}/${cat.abilities[1]} INT Chips`;

	currentSpirit.style.width = "100%";
	currentSpirit.innerHTML = `${cat.abilities[2]}/${cat.abilities[2]} SPT Chips`;

	run(adventure);
};

const exportCat = document.getElementById("exportCat");
const exportCode = document.getElementById("exportCode");

exportCat.addEventListener("click", () => {
	exportCode.value = JSON.stringify(cat);
});

const currentStrength = document.getElementById("currentStrength");
const currentIntelligence = document.getElementById("currentIntelligence");
const currentSpirit = document.getElementById("currentSpirit");

const upgradeSkills = document.getElementById("upgradeSkills");

const upgradeSkillRows = [];

const parsedUpgradeSkills = JSON.parse(JSON.stringify(skills));
for (let i = 0; i < parsedUpgradeSkills.length; i += 5) {
	const chunk = parsedUpgradeSkills.slice(i, i + 5);
	let column = 0;
	chunk.forEach(c => {
		const skillPart = document.createElement("td");
		skillPart.innerHTML = `<b>${c}</b><span class="skillType">(${
			["Strength", "Intelligence", "Spirit"][skillData[skills.indexOf(c)]]
		})</span><span id="${c.toLowerCase()}Count2" class="skillCount"></span><button id="${c.toLowerCase()}Plus2" class="plus">+</button><button id="${c.toLowerCase()}Minus2" class="minus">-</button>`;
		column++;
		if (upgradeSkillRows[column] === undefined) {
			upgradeSkillRows[column] = document.createElement("tr");
		}
		upgradeSkillRows[column].appendChild(skillPart);
	});
}
upgradeSkillRows.forEach(c => {
	upgradeSkills.appendChild(c);
});

const skillPointsU = document.getElementById("skillUpgrades");

skills.forEach((c, i) => {
	c = c.toLowerCase();
	document.getElementById(c + "Plus2").addEventListener("click", () => {
		if (skillPoints > 0) {
			skillPoints--;
			cat.skills[i]++;
			skillPointsU.innerHTML = skillPoints;
			document.getElementById(c + "Count2").innerHTML = cat.skills[i];
		}
	});
	document.getElementById(c + "Minus2").addEventListener("click", () => {
		if (
			cat.skills[i] > 0 &&
			(cat.skills[i] > 1
				? true
				: {
						ThunderClan: 7,
						RiverClan: 13,
						WindClan: 6,
						ShadowClan: 11,
				  }[cat.clan] !== i)
		) {
			skillPoints++;
			cat.skills[i]--;
			skillPointsU.innerHTML = skillPoints;
			document.getElementById(c + "Count2").innerHTML =
				cat.skills[i] > 0 ? cat.skills[i] : "";
		}
	});
});

let skillUpgraderCallback = () => {};
document
	.getElementById("doneUpgradingSkills")
	.addEventListener("click", () => skillUpgraderCallback());
const buttons = document.getElementById("buttons");

const skillUpgrader = document.getElementById("skillUpgrader");

let knackUpgraderCallback = () => {};
document
	.getElementById("doneUpgradingKnacks")
	.addEventListener("click", () => knackUpgraderCallback());

const knackUpgrader = document.getElementById("knackUpgrader");

let abilityUpgraderCallback = () => {};
document
	.getElementById("doneUpgradingAbilities")
	.addEventListener("click", () => abilityUpgraderCallback());

const abilityUpgrader = document.getElementById("abilityUpgrader");

let intsptUpgraderCallback = () => {};
document
	.getElementById("doneUpgradingIntspt")
	.addEventListener("click", () => intsptUpgraderCallback());

const intsptUpgrader = document.getElementById("intsptUpgrader");

const textContent = document.getElementById("textContent");

const setGameText = text => (textContent.innerHTML = text);

const clearButtons = () => (buttons.innerHTML = "");
const createButton = (name, callback) => {
	const button = document.createElement("button");
	button.addEventListener("click", callback);
	button.innerHTML = name;
	buttons.appendChild(button);
};

let strChips = 0;
let intChips = 0;
let sptChips = 0;

let strLost = 0;
let intLost = 0;
let sptLost = 0;
let id = null;

const abilityCheck = async c => {
	for (const x of Object.entries(c.outcomes).sort((a, b) => b[0] - a[0])) {
		if (!Array.isArray(c.value)) {
			if (
				cat.abilities[c.value] + (c.change ? varScope[c.change] : 0) >=
				x[0]
			) {
				await run(x[1]);
				break;
			}
		} else {
			let check = 0;
			c.value.map(xa => {
				check += cat.abilities[skillData[xa]];
			});

			if (check + (c.change ? varScope[c.change] : 0) >= x[0]) {
				await run(x[1]);
				break;
			}
		}
	}
};

const knackCheck = async c => {
	for (const x of Object.entries(c.outcomes).sort((a, b) => b[0] - a[0])) {
		if (!Array.isArray(c.value)) {
			if (Object.values(cat.knacks).includes(c.value)) {
				await run(x[1]);
				break;
			}
		} else {
			let check = 0;
			c.value.map(xa => {
				check += Object.values(cat.knacks).includes(c.value);
			});
			if (check >= x[0]) {
				await run(x[1]);
				break;
			}
		}
	}
};

const skillCheckBtns = async (c, varScope, fromCheck, fromScript) => {
	if (Array.isArray(c.value)) {
		let sum = 0;
		for (let x of c.value) {
			sum += await skillCheckBtns({ value: x }, null, true);
		}
		for (const x of Object.entries(c.outcomes).sort(
			(a, b) => Number(b[0]) - Number(a[0])
		)) {
			if (
				sum - (c.change && !fromCheck ? varScope[c.change] : 0) >=
				x[0]
			) {
				await run(x[1]);
				break;
			}
		}
		return;
	}
	if (c.message) {
		setGameText(c.message);
	}
	clearButtons();
	const resultElem = document.createElement("span");
	resultElem.innerHTML =
		"Result of Check: " +
		(cat.skills[c.value] + cat.abilities[skillData[c.value]]);
	buttons.appendChild(resultElem);
	const breakElem = document.createElement("div");
	breakElem.classList.add("break");
	buttons.appendChild(breakElem);
	let bonus = 0;
	let res1 = () => {};
	const promise = new Promise((res, rej) => (res1 = res));
	createButton(skills[c.value], async () => {
		if (fromCheck) {
			res1();
		} else if (fromScript) {
			res1();
		} else {
			const check =
				cat.skills[c.value] +
				cat.abilities[skillData[c.value]] +
				bonus -
				(c.change && !fromCheck ? varScope[c.change] : 0);
			for (const x of Object.entries(c.outcomes).sort(
				(a, b) => Number(b[0]) - Number(a[0])
			)) {
				if (check >= x[0]) {
					await run(x[1]);
					break;
				}
			}
		}
		res1();
	});
	createButton(
		"Use 1 " +
			["Strength", "Intelligence", "Spirit"][skillData[c.value]] +
			" Chip",
		() => {
			switch (skillData[c.value]) {
				case 0:
					if (strChips > 0) {
						strChips--;
						currentStrength.style.width = `${
							(strChips / cat.abilities[0]) * 100
						}%`;
						currentStrength.innerHTML = `${strChips}/${cat.abilities[0]} STR Chips`;
						bonus++;
					}
					break;
				case 1:
					if (intChips > 0) {
						intChips--;
						currentIntelligence.style.width = `${
							(intChips / cat.abilities[1]) * 100
						}%`;
						currentIntelligence.innerHTML = `${intChips}/${cat.abilities[1]} INT Chips`;
						bonus++;
					}
					break;
				case 2:
					if (sptChips > 0) {
						sptChips--;
						currentSpirit.style.width = `${
							(sptChips / cat.abilities[2]) * 100
						}%`;
						currentSpirit.innerHTML = `${sptChips}/${cat.abilities[2]} SPT Chips`;
						bonus++;
					}
			}
			resultElem.innerHTML =
				"Result of Check: " +
				(cat.skills[c.value] +
					cat.abilities[skillData[c.value]] +
					bonus -
					(c.change && !fromCheck ? varScope[c.change] : 0));
		}
	);
	for (let x of Object.values(cat.knacks)) {
		if (
			(knackData[x].category === c.category ||
				knackData[x].category === "all") &&
			knackData[x].spentOn.includes(c.value)
		) {
			createButton(
				`${knackData[x].name} (${
					knackData[x].cost -
					(knackData[x].upgradeReward === "cost"
						? cat.knackLevels[x]
						: 0)
				} ${["STR", "INT", "SPT"][knackData[x].costType]} Chip = +${
					knackData[x].upgradeReward === "bonusIncrease"
						? cat.knackLevels[x]
						: 1
				})`,
				() => {
					switch (knackData[x].costType) {
						case 0:
							if (
								strChips >
								knackData[x].cost -
									(knackData[x].upgradeReward === "cost"
										? cat.knackLevels[x]
										: 0)
							) {
								strChips -=
									knackData[x].cost -
									(knackData[x].upgradeReward === "cost"
										? cat.knackLevels[x]
										: 0);
								currentStrength.style.width = `${
									(strChips / cat.abilities[0]) * 100
								}%`;
								currentStrength.innerHTML = `${strChips}/${cat.abilities[0]} STR Chips`;
								bonus +=
									knackData[x].upgradeReward ===
									"bonusIncrease"
										? cat.knackLevels[x]
										: 1;
							}
							break;
						case 1:
							if (
								intChips >
								knackData[x].cost -
									(knackData[x].upgradeReward === "cost"
										? cat.knackLevels[x]
										: 0)
							) {
								intChips -=
									knackData[x].cost -
									(knackData[x].upgradeReward === "cost"
										? cat.knackLevels[x]
										: 0);
								currentIntelligence.style.width = `${
									(intChips / cat.abilities[1]) * 100
								}%`;
								currentIntelligence.innerHTML = `${intChips}/${cat.abilities[1]} INT Chips`;
								bonus +=
									knackData[x].upgradeReward ===
									"bonusIncrease"
										? cat.knackLevels[x]
										: 1;
							}
							break;
						case 2:
							if (
								sptChips >
								knackData[x].cost -
									(knackData[x].upgradeReward === "cost"
										? cat.knackLevels[x]
										: 0)
							) {
								sptChips -=
									knackData[x].cost -
									(knackData[x].upgradeReward === "cost"
										? cat.knackLevels[x]
										: 0);
								currentSpirit.style.width = `${
									(sptChips / cat.abilities[2]) * 100
								}%`;
								currentSpirit.innerHTML = `${sptChips}/${cat.abilities[2]} SPT Chips`;
								bonus +=
									knackData[x].upgradeReward ===
									"bonusIncrease"
										? cat.knackLevels[x]
										: 1;
							}
					}
					resultElem.innerHTML =
						"Result of Check: " +
						(cat.skills[c.value] +
							cat.abilities[skillData[c.value]] +
							bonus -
							(c.change && !fromCheck ? varScope[c.change] : 0));
				}
			);
		}
	}
	await promise;
	if (fromCheck) {
		return cat.skills[c.value] + cat.abilities[skillData[c.value]] + bonus;
	} else if (fromScript) {
		return cat.skills[c.value] + cat.abilities[skillData[c.value]] + bonus;
	}
};

const abilityCheckBtns = async (c, varScope, fromCheck, fromScript) => {
	if (Array.isArray(c.value)) {
		let sum = 0;
		for (let x of c.value) {
			sum += await abilityCheckBtns({ value: x }, null, true);
		}
		for (const x of Object.entries(c.outcomes).sort(
			(a, b) => Number(b[0]) - Number(a[0])
		)) {
			if (
				sum + (c.change && !fromCheck ? varScope[c.change] : 0) >=
				x[0]
			) {
				await run(x[1]);
			}
		}
		return;
	}
	if (c.message) {
		setGameText(c.message);
	}
	clearButtons();
	const resultElem = document.createElement("span");
	resultElem.innerHTML =
		"Result of Check: " +
		(cat.abilities[c.value] -
			(c.change && !fromCheck ? varScope[c.change] : 0));
	buttons.appendChild(resultElem);
	const breakElem = document.createElement("div");
	breakElem.classList.add("break");
	buttons.appendChild(breakElem);
	let bonus = 0;
	let res1 = () => {};
	const promise = new Promise((res, rej) => (res1 = res));
	createButton(["Strength", "Intelligence", "Spirit"][c.value], async () => {
		if (fromCheck) {
			res1();
		} else if (fromScript) {
			res1();
		} else {
			const check =
				cat.abilities[c.value] +
				bonus +
				(c.change && !fromCheck ? varScope[c.change] : 0);
			for (const x of Object.entries(c.outcomes).sort(
				(a, b) => Number(b[0]) - Number(a[0])
			)) {
				if (check >= x[0]) {
					await run(x[1]);
				}
			}
		}
		res1();
	});
	createButton(
		"Use 1 " + ["Strength", "Intelligence", "Spirit"][c.value] + " Chip",
		() => {
			switch (c.value) {
				case 0:
					if (strChips > 0) {
						strChips--;
						currentStrength.style.width = `${
							(strChips / cat.abilities[0]) * 100
						}%`;
						currentStrength.innerHTML = `${strChips}/${cat.abilities[0]} STR Chips`;
						bonus++;
					}
					break;
				case 1:
					if (intChips > 0) {
						intChips--;
						currentIntelligence.style.width = `${
							(intChips / cat.abilities[1]) * 100
						}%`;
						currentIntelligence.innerHTML = `${intChips}/${cat.abilities[1]} INT Chips`;
						bonus++;
					}
					break;
				case 2:
					if (sptChips > 0) {
						sptChips--;
						currentSpirit.style.width = `${
							(sptChips / cat.abilities[2]) * 100
						}%`;
						currentSpirit.innerHTML = `${sptChips}/${cat.abilities[2]} SPT Chips`;
						bonus++;
					}
			}
			resultElem.innerHTML =
				"Result of Check: " +
				(cat.abilities[c.value] +
					bonus -
					(c.change && !fromCheck ? varScope[c.change] : 0));
		}
	);
	for (let x of Object.values(cat.knacks)) {
		if (knackData[x].spentAbil !== undefined) {
			if (
				(knackData[x].category === c.category ||
					knackData[x].category === "all") &&
				knackData[x].spentAbil.includes(c.value)
			) {
				createButton(
					`${knackData[x].name} (${
						knackData[x].cost -
						(knackData[x].upgradeReward === "cost"
							? cat.knackLevels[x]
							: 0)
					} ${["STR", "INT", "SPT"][knackData[x].costType]} Chip = +${
						knackData[x].upgradeReward === "bonusIncrease"
							? cat.knackLevels[x]
							: 1
					})`,
					() => {
						switch (knackData[x].costType) {
							case 0:
								if (
									strChips >
									knackData[x].cost -
										(knackData[x].upgradeReward === "cost"
											? cat.knackLevels[x]
											: 0)
								) {
									strChips -=
										knackData[x].cost -
										(knackData[x].upgradeReward === "cost"
											? cat.knackLevels[x]
											: 0);
									currentStrength.style.width = `${
										(strChips / cat.abilities[0]) * 100
									}%`;
									currentStrength.innerHTML = `${strChips}/${cat.abilities[0]} STR Chips`;
									bonus +=
										knackData[x].upgradeReward ===
										"bonusIncrease"
											? cat.knackLevels[x]
											: 1;
								}
								break;
							case 1:
								if (
									intChips >
									knackData[x].cost -
										(knackData[x].upgradeReward === "cost"
											? cat.knackLevels[x]
											: 0)
								) {
									intChips -=
										knackData[x].cost -
										(knackData[x].upgradeReward === "cost"
											? cat.knackLevels[x]
											: 0);
									currentIntelligence.style.width = `${
										(intChips / cat.abilities[1]) * 100
									}%`;
									currentIntelligence.innerHTML = `${intChips}/${cat.abilities[1]} INT Chips`;
									bonus +=
										knackData[x].upgradeReward ===
										"bonusIncrease"
											? cat.knackLevels[x]
											: 1;
								}
								break;
							case 2:
								if (
									sptChips >
									knackData[x].cost -
										(knackData[x].upgradeReward === "cost"
											? cat.knackLevels[x]
											: 0)
								) {
									sptChips -=
										knackData[x].cost -
										(knackData[x].upgradeReward === "cost"
											? cat.knackLevels[x]
											: 0);
									currentSpirit.style.width = `${
										(sptChips / cat.abilities[2]) * 100
									}%`;
									currentSpirit.innerHTML = `${sptChips}/${cat.abilities[2]} SPT Chips`;
									bonus +=
										knackData[x].upgradeReward ===
										"bonusIncrease"
											? cat.knackLevels[x]
											: 1;
								}
						}
						resultElem.innerHTML =
							"Result of Check: " +
							cat.abilities[c.value] +
							bonus -
							(c.change && !fromCheck ? varScope[c.change] : 0);
					}
				);
			}
		}
	}
	await promise;
	if (fromCheck) {
		return cat.abilities[c.value] + bonus;
	} else if (fromScript) {
		return (
			cat.abilities[c.value] +
			bonus -
			(c.change && !fromCheck ? varScope[c.change] : 0)
		);
	}
};

const ageFunc = async () => {
	cat.age++;
	if (age[cat.age] === "skill") {
		skillUpgrader.hidden = false;
		mission.hidden = true;

		let res3 = () => {};
		const promise = new Promise((res, rej) => (res3 = res));

		skillUpgraderCallback = res3;

		skillPoints++;

		skillPointsU.innerHTML = skillPoints;

		await promise;

		mission.hidden = false;
		skillUpgrader.hidden = true;
	} else if (age[cat.age] === "ability") {
		abilityUpgrader.hidden = false;
		mission.hidden = true;

		let res3 = () => {};
		const promise = new Promise((res, rej) => (res3 = res));

		abilityUpgraderCallback = res3;

		abilityPoints++;

		abilityUpgrades.innerHTML = abilityPoints;

		await promise;

		mission.hidden = false;
		abilityUpgrader.hidden = true;
	} else if (age[cat.age] === "knack") {
		knackUpgrader.hidden = false;
		mission.hidden = true;

		let res1 = () => {};
		const promise = new Promise((res, rej) => (res1 = res));

		knackUpgraderCallback = res1;

		abilityPoints++;

		knackUpgrades.innerHTML = knackPoints;

		await promise;

		mission.hidden = false;
		knackUpgrader.hidden = true;
	} else if (age[cat.age] === "intSpt") {
		intsptUpgrader.hidden = false;
		mission.hidden = true;

		let res3 = () => {};
		const promise = new Promise((res, rej) => (res3 = res));

		intsptUpgraderCallback = res3;

		intsptPoints++;

		intsptUpgrades.innerHTML = intsptPoints;

		await promise;

		mission.hidden = false;
		intsptUpgrader.hidden = true;
	} else if (age[cat.age] === "skillKnack") {
		skillUpgrader.hidden = false;
		mission.hidden = true;

		let res1 = () => {};
		const promise = new Promise((res, rej) => (res1 = res));

		skillUpgraderCallback = res1;

		skillPoints++;

		skillPointsU.innerHTML = skillPoints;

		await promise;

		mission.hidden = false;
		skillUpgrader.hidden = true;

		knackUpgrader.hidden = false;
		mission.hidden = true;

		let res2 = () => {};
		const promise2 = new Promise((res, rej) => (res2 = res));

		knackUpgraderCallback = res2;

		knackPoints++;

		knackUpgrades.innerHTML = knackPoints;

		await promise2;

		mission.hidden = false;
		knackUpgrader.hidden = true;
	} else if (age[cat.age] === "int") {
		cat.abilities[1] += 1;
	} else if (age[cat.age] === "spt") {
		cat.abilities[2] += 1;
	} else if (age[cat.age] === "weaken") {
		cat.abilities[0] -= 1;
	}
};

let preFunScope = {};
let preVarScope = {};

const run = async actions => {
	let funScope = preFunScope;
	let varScope = preVarScope;

	for (let c of actions) {
		console.log(c);
		if (c.type === "message") {
			setGameText(c.value);
			clearButtons();
			let res1 = () => {};
			const promise = new Promise((res, rej) => (res1 = res));
			createButton("Next", res1);
			await promise;
		} else if (c.type === "check") {
			await skillCheckBtns(c, varScope);
		} else if (c.type === "checks") {
			if (c.message !== null && c.message !== undefined) {
				setGameText(c.message);
			}
			clearButtons();
			let res1 = () => {};
			const promise = new Promise((res, rej) => (res1 = res));

			for (let x of c.value) {
				if (x.type ? x.type === "skill" : c.method === "skill") {
					createButton(skills[x.value], async () => {
						await skillCheckBtns(x);
						res1();
					});
				} else if (
					x.type ? x.type === "ability" : c.method === "ability"
				) {
					createButton(
						["Strength", "Intelligence", "Spirit"][x.value],
						async () => {
							await abilityCheck(x);
							res1();
						}
					);
				} else if (x.type ? x.type === "knack" : c.method === "knack") {
					createButton(knacks[x.value].name, async () => {
						await knacksCheck(x);
						res1();
					});
				}
			}
			await promise;
		} else if (c.type === "abilcheck") {
			if (c.message) {
				setGameText(c.message);
			}
			clearButtons();
			let res1 = () => {};
			const promise = new Promise((res, rej) => (res1 = res));
			createButton(["Strength", "Intellience", "Spirit"][c.value], res1);
			await promise;
			await abilityCheckBtns(c, varScope);
		} else if (c.type === "knackCheck") {
			if (c.message) {
				setGameText(c.message);
			}
			clearButtons();
			let res1 = () => {};
			const promise = new Promise((res, rej) => (res1 = res));
			createButton(knacks[c.value].name, res1);
			await promise;
			await knackCheck(c);
		} else if (c.type === "choose") {
			if (c.message !== null && c.message !== undefined) {
				setGameText(c.message);
			}
			clearButtons();
			let res1 = () => {};
			let anAnswer = null;
			const promise = new Promise((res, rej) => (res1 = res));
			for (const x of Object.keys(c.outcomes)) {
				createButton(x, () => {
					anAnswer = x;
					res1();
				});
			}
			await promise;

			preVarScope = varScope;
			preFunScope = funScope;

			await run(c.outcomes[anAnswer]);
		} else if (c.type === "random") {
			preVarScope = varScope;
			preFunScope = funScope;

			await run(
				c.outcomes[Math.floor(Math.random() * c.outcomes.length)]
			);
		} else if (c.type === "function") {
			funScope[c.id] = c.value;
		} else if (c.type === "runfunction") {
			preVarScope = varScope;
			preFunScope = funScope;

			if (funScope[c.id] === undefined) {
				console.error("Function not found: " + c.id);
				console.error("Function Scope:");
				console.error(funScope);
				console.error("Parameters:");
				console.error(c);
			}

			await run(funScope[c.id]);
		} else if (c.type === "setvariable") {
			if (c.by === "direct") {
				varScope[c.id] = c.valVar ? varScope[c.value] : c.value;
			} else if (c.by === "math") {
				if (c.operator === "add") {
					varScope[c.id] += c.valVar ? varScope[c.value] : c.value;
				} else if (c.operator === "subtract") {
					varScope[c.id] -= c.valVar ? varScope[c.value] : c.value;
				}
			} else if (c.by === "check") {
				varScope[c.id] = skillCheckBtns(c, null, null, true);
			}
		} else if (c.type === "if") {
			if (c.operator === "equals") {
				if (varScope[c.id] === c.value) {
					preVarScope = varScope;
					preFunScope = funScope;

					await run(c.outcome);
				}
			} else if (c.operator === "less") {
				if (varScope[c.id] < c.value) {
					preVarScope = varScope;
					preFunScope = funScope;

					await run(c.outcome);
				}
			} else if (c.operator === "more") {
				if (varScope[c.id] > c.value) {
					preVarScope = varScope;
					preFunScope = funScope;

					await run(c.outcome);
				}
			}
		} else if (c.type === "fight") {
			if (c.amount === null || c.amount === undefined) {
				c.amount = 1;
			}
			c.dHealth = c.health;
			c.spiritD = 2;

			c.round = 0;

			c.knockedout = false;

			while (1) {
				if (!c.goesFirst || c.round !== 0) {
					if (c.knockedout) {
						return;
					}
					setGameText("Opponent's Health: " + c.health);

					clearButtons();
					let res1 = () => {};
					let anAnswer = null;
					const promise = new Promise((res, rej) => (res1 = res));
					createButton("Swat", () => {
						anAnswer = "Swat";
						res1();
					});
					if (
						c.canbite ||
						c.canbite === "undefined" ||
						c.canbite === "null"
					) {
						createButton("Bite", () => {
							anAnswer = "Bite";
							res1();
						});
					}

					if (c.canescape) {
						createButton("Run Away", () => {
							anAnswer = "Run Away";
							res1();
						});
					}

					let mightySwatBonus = 0;
					let pummel = false;

					if (Object.values(cat.knacks).includes(15)) {
						createButton(
							cat.knackLevels[15] === 2
								? "Mighty Swat (1 STR chip = 2 damage)"
								: "Mighty Swat (2 STR Chip = 2 damage)",
							async () => {
								strChips -= cat.knackLevels[15] === 2 ? 1 : 2;
								mightySwatBonus++;

								let res2 = () => {};
								let anAnswer2 = null;
								const promise2 = new Promise(
									(res, rej) => (res2 = res)
								);
								createButton("Done", () => res2());
								createButton("Spend Again", () => {
									strChips -=
										cat.knackLevels[15] === 2 ? 1 : 2;
									mightySwatBonus++;
								});

								await promise2;

								anAnswer = "Mighty Swat";
								res1();
							}
						);
					}

					if (Object.values(cat.knacks).includes(15)) {
						createButton("Mighty Swat", () => {
							anAnswer = "Swat";
							pummel = true;
							res1();
						});
					}

					await promise;

					if (
						c.round >=
						(c.rounds === null || c.rounds === undefined
							? Infinity
							: c.rounds)
					) {
						if (c.ontimeout !== null && c.ontimeout !== undefined) {
							preVarScope = varScope;
							preFunScope = funScope;

							await run(funScope[c.ontimeout]);
						}
						break;
					}

					if (anAnswer === "Swat" || anAnswer === "Bite") {
						if (
							cat.skills[12] +
								(pummel
									? cat.abilities[1]
									: cat.abilities[skillData[12]]) >=
							c.jump
						) {
							let strengthCheck = cat.abilities[0];

							if (
								cat.skills[12] +
									(pummel
										? cat.abilities[1]
										: cat.abilities[skillData[12]]) >=
								c.jump * 2
							) {
								strengthCheck += 2;
							}

							if (
								strengthCheck <=
								(c.defenseStrength
									? c.defenseStrength
									: c.strength)
							) {
								c.health -=
									anAnswer === "Bite"
										? 2
										: 1 + mightySwatBonus;
							} else if (
								strengthCheck <=
								(c.defenseStrength
									? c.defenseStrength
									: c.strength) *
									2
							) {
								c.health -=
									anAnswer === "Bite"
										? 3
										: 2 + mightySwatBonus;
							} else if (
								strengthCheck >
								(c.defenseStrength
									? c.defenseStrength
									: c.strength) *
									2
							) {
								c.health -=
									anAnswer === "Bite"
										? 4
										: 3 + mightySwatBonus;
							}
						} else if (c.onattackfailturns) {
							for (let i = 0; i < c.onattackfailturns; i++) {
								if (c.attack === "swat") {
									if (
										c.swat >=
										(c.firstattacknoescape && c.round === 1
											? 0
											: cat.skills[12] +
											  cat.abilities[skillData[12]])
									) {
										let strengthCheck = c.strength;

										if (
											c.swat >=
											cat.skills[12] +
												cat.abilities[skillData[12]] * 2
										) {
											strengthCheck += 2;
										}

										if (strengthCheck <= cat.abilities[0]) {
											await anChoice(1);
										} else if (
											strengthCheck <=
											cat.abilities[0] * 2
										) {
											await anChoice(2);
										} else if (
											strengthCheck >
											cat.abilities[0] * 2
										) {
											await anChoice(3);
										}
									}
								} else if (c.attack === "bite") {
									if (
										c.bite >=
										(c.firstattacknoescape && c.round === 1
											? 0
											: cat.skills[12] +
											  cat.abilities[skillData[12]])
									) {
										let strengthCheck = c.strength;

										if (
											c.bite >=
											cat.skills[12] +
												cat.abilities[skillData[12]] * 2
										) {
											strengthCheck += 2;
										}

										if (strengthCheck <= cat.abilities[0]) {
											await anChoice(2);
										} else if (
											strengthCheck <=
											cat.abilities[0] * 2
										) {
											await anChoice(3);
										} else if (
											strengthCheck >
											cat.abilities[0] * 2
										) {
											await anChoice(4);
										}
									}
								} else if (c.attack === "poisonbite") {
									if (cat.abilities[2] <= c.spiritD) {
										c.spiritD += 1;
										await anChoice(1);
									}
								}
							}
						}
					} else if (anAnswer === "Escape" && c.canescape) {
						if (cat.skills[5] + cat.abilities[skillData[5] >= 3]) {
							if (
								c.onescape !== null &&
								c.onescape !== undefined
							) {
								await run(funScope[c.onescape]);
							}
							return true;
						} else {
							setGameText("You failed to escape.");
							clearButtons();
							let res1 = () => {};
							const promise = new Promise(
								(res, rej) => (res1 = res)
							);
							createButton("Ok", res1);
							await promise;

							if (
								c.onfailescape !== null &&
								c.onfailescape !== undefined
							) {
								await run(funScope[c.onfailescape]);
							}
						}
					}
					if (c.health <= 0) {
						c.amount -= 1;

						c.health = c.dHealth;

						if (c.amount <= 0) {
							if (c.onwin !== null && c.onwin !== undefined) {
								await run(funScope[c.onwin]);
							}
							break;
						}
					}
				}
				anChoice = async damage => {
					for (let i = 0; i < damage; i++) {
						if (
							strChips === 0 &&
							intChips === 0 &&
							sptChips === 0
						) {
							await run(funScope[c.onknockout]);
							c.knockedout = true;
							return;
						}

						setGameText(`You got hurt. Which type of chips would you like to remove? (${damage} chips) [${i}/${damage}]
You have ${strChips} strength chips.
You have ${intChips} intelligence chips.
You have ${sptChips} spirit chips.`);

						clearButtons();
						let res2 = () => {};
						let anAnswer2 = null;
						const promise = new Promise((res, rej) => (res2 = res));
						createButton("Strength", () => {
							anAnswer2 = "Strength";
							res2();
						});
						createButton("Intelligence", () => {
							anAnswer2 = "Intelligence";
							res2();
						});
						createButton("Spirit", () => {
							anAnswer2 = "Spirit";
							res2();
						});

						await promise;

						if (anAnswer2 === "Strength") {
							if (strChips >= 1) {
								strChips -= 1;
								strLost += 1;

								currentStrength.style.width = `${
									(strChips / cat.abilities[0]) * 100
								}%`;
								currentStrength.innerHTML = `${strChips}/${cat.abilities[0]} STR Chips`;
							} else {
								setGameText(
									"You don't have enough strength chips."
								);
								clearButtons();
								let res1 = () => {};
								const promise = new Promise(
									(res, rej) => (res1 = res)
								);
								createButton("Ok", res1);
								await promise;

								await anChoice(i - damage);
								i--;
								break;
							}
						} else if (anAnswer2 === "Intelligence") {
							if (intChips >= 1) {
								intChips -= 1;
								intLost += 1;

								currentIntelligence.style.width = `${
									(intChips / cat.abilities[1]) * 100
								}%`;
								currentIntelligence.innerHTML = `${intChips}/${cat.abilities[1]} INT Chips`;
							} else {
								setGameText(
									"You don't have enough intelligence chips."
								);
								clearButtons();
								let res1 = () => {};
								const promise = new Promise(
									(res, rej) => (res1 = res)
								);
								createButton("Ok", res1);
								await promise;
								await anChoice(i - damage);
								i--;
								break;
							}
						} else if (anAnswer2 === "Spirit") {
							if (sptChips >= 1) {
								sptChips -= 1;
								sptLost += 1;

								currentSpirit.style.width = `${
									(sptChips / cat.abilities[2]) * 100
								}%`;
								currentSpirit.innerHTML = `${sptChips}/${cat.abilities[2]} SPT Chips`;
							} else {
								setGameText(
									"You don't have enough spirit chips."
								);
								clearButtons();
								let res1 = () => {};
								const promise = new Promise(
									(res, rej) => (res1 = res)
								);
								createButton("Ok", res1);
								await promise;
								await anChoice(i - damage);
								i--;
								break;
							}
						}
					}
				};

				for (let i = 0; i < c.amount; i++) {
					if (c.attack === "swat") {
						if (
							c.swat >=
							(c.firstattacknoescape && c.round === 1
								? 0
								: cat.skills[12] + cat.abilities[skillData[12]])
						) {
							let strengthCheck = c.strength;

							if (
								c.swat >=
								cat.skills[12] +
									cat.abilities[skillData[12]] * 2
							) {
								strengthCheck += 2;
							}

							if (strengthCheck <= cat.abilities[0]) {
								await anChoice(1);
							} else if (strengthCheck <= cat.abilities[0] * 2) {
								await anChoice(2);
							} else if (strengthCheck > cat.abilities[0] * 2) {
								await anChoice(3);
							}
						}
					} else if (c.attack === "bite") {
						if (
							c.bite >=
							(c.firstattacknoescape && c.round === 1
								? 0
								: cat.skills[12] + cat.abilities[skillData[12]])
						) {
							let strengthCheck = c.strength;

							if (
								c.bite >=
								cat.skills[12] +
									cat.abilities[skillData[12]] * 2
							) {
								strengthCheck += 2;
							}

							if (strengthCheck <= cat.abilities[0]) {
								await anChoice(2);
							} else if (strengthCheck <= cat.abilities[0] * 2) {
								await anChoice(3);
							} else if (strengthCheck > cat.abilities[0] * 2) {
								await anChoice(4);
							}
						}
					} else if (c.attack === "poisonbite") {
						if (cat.abilities[2] <= c.spiritD) {
							c.spiritD += 1;
							await anChoice(1);
						}
					}
				}
				c.round += 1;
			}
		} else if (c.type === "id") {
			id = c.value;
		} else if (c.type === "exp") {
			if (!cat.earnedExp.includes(id) && id !== null) {
				skillUpgrader.hidden = false;
				mission.hidden = true;

				let res1 = () => {};
				const promise = new Promise((res, rej) => (res1 = res));

				skillUpgraderCallback = res1;

				skillPoints++;

				skillPointsU.innerHTML = skillPoints;

				await promise;

				mission.hidden = false;
				skillUpgrader.hidden = true;

				knackUpgrader.hidden = false;
				mission.hidden = true;

				let res2 = () => {};
				const promise2 = new Promise((res, rej) => (res2 = res));

				knackUpgraderCallback = res2;

				knackPoints++;

				knackUpgrades.innerHTML = knackPoints;

				await promise2;

				mission.hidden = false;
				knackUpgrader.hidden = true;

				await ageFunc();
			}
		} else if (c.type === "damage") {
			anChoice = async damage => {
				for (let i = 0; i < damage; i++) {
					if (strChips === 0 && intChips === 0 && sptChips === 0) {
						await run(funScope[c.onknockout]);
						return;
					}

					setGameText(`You got hurt. Which type of chips would you like to remove? (${damage} chips) [${i}/${damage}]
You have ${strChips} strength chips.
You have ${intChips} intelligence chips.
You have ${sptChips} spirit chips.`);

					clearButtons();
					let res2 = () => {};
					let anAnswer2 = null;
					const promise = new Promise((res, rej) => (res2 = res));
					createButton("Strength", () => {
						anAnswer2 = "Strength";
						res2();
					});
					createButton("Intelligence", () => {
						anAnswer2 = "Intelligence";
						res2();
					});
					createButton("Spirit", () => {
						anAnswer2 = "Spirit";
						res2();
					});

					await promise;

					if (anAnswer2 === "Strength") {
						if (strChips >= 1) {
							strChips -= 1;
							strLost += 1;

							currentStrength.style.width = `${
								(strChips / cat.abilities[0]) * 100
							}%`;
							currentStrength.innerHTML = `${strChips}/${cat.abilities[0]} STR Chips`;
						} else {
							setGameText(
								"You don't have enough strength chips."
							);
							clearButtons();
							let res1 = () => {};
							const promise = new Promise(
								(res, rej) => (res1 = res)
							);
							createButton("Ok", res1);
							await promise;

							await anChoice(i - damage);
							i--;
							break;
						}
					} else if (anAnswer2 === "Intelligence") {
						if (intChips >= 1) {
							intChips -= 1;
							intLost += 1;

							currentIntelligence.style.width = `${
								(intChips / cat.abilities[1]) * 100
							}%`;
							currentIntelligence.innerHTML = `${intChips}/${cat.abilities[1]} INT Chips`;
						} else {
							setGameText(
								"You don't have enough intelligence chips."
							);
							clearButtons();
							let res1 = () => {};
							const promise = new Promise(
								(res, rej) => (res1 = res)
							);
							createButton("Ok", res1);
							await promise;
							await anChoice(i - damage);
							i--;
							break;
						}
					} else if (anAnswer2 === "Spirit") {
						if (sptChips >= 1) {
							sptChips -= 1;
							sptLost += 1;

							currentSpirit.style.width = `${
								(sptChips / cat.abilities[2]) * 100
							}%`;
							currentSpirit.innerHTML = `${sptChips}/${cat.abilities[2]} SPT Chips`;
						} else {
							setGameText("You don't have enough spirit chips.");
							clearButtons();
							let res1 = () => {};
							const promise = new Promise(
								(res, rej) => (res1 = res)
							);
							createButton("Ok", res1);
							await promise;
							await anChoice(i - damage);
							i--;
							break;
						}
					}
				}
			};
			await anChoice(c.value);
		} else if (c.type === "skillup") {
			cat.skills[c.value] += c.amount;
		} else if (c.type === "sleep") {
			let healTypes = [];

			if (strLost > 0) {
				healTypes.push("str");
			}

			if (intLost > 0) {
				healTypes.push("int");
			}

			if (sptLost > 0) {
				healTypes.push("spt");
			}

			let healType =
				healTypes[Math.floor(Math.random() * healTypes.length)];

			if (healType === "str") {
				strChips++;
				strLost--;

				currentStrength.style.width = `${
					(strChips / cat.abilities[0]) * 100
				}%`;
				currentStrength.innerHTML = `${strChips}/${cat.abilities[0]} STR Chips`;
			} else if (healType === "int") {
				intChips++;
				intLost--;

				currentIntelligence.style.width = `${
					(intChips / cat.abilities[1]) * 100
				}%`;
				currentIntelligence.innerHTML = `${intChips}/${cat.abilities[1]} INT Chips`;
			} else if (healType === "spt") {
				sptChips++;
				sptLost--;

				currentSpirit.style.width = `${
					(sptChips / cat.abilities[2]) * 100
				}%`;
				currentSpirit.innerHTML = `${sptChips}/${cat.abilities[2]} SPT Chips`;
			}
		} else if (c.type === "age") {
			for (let i = 0; i < (c.value || 1); i++) {
				await ageFunc();
			}
			currentStrength.style.width = `${
				(strChips / cat.abilities[0]) * 100
			}%`;
			currentStrength.innerHTML = `${strChips}/${cat.abilities[0]} STR Chips`;

			currentIntelligence.style.width = `${
				(intChips / cat.abilities[1]) * 100
			}%`;
			currentIntelligence.innerHTML = `${intChips}/${cat.abilities[1]} INT Chips`;

			currentSpirit.style.width = `${
				(sptChips / cat.abilities[2]) * 100
			}%`;
			currentSpirit.innerHTML = `${sptChips}/${cat.abilities[2]} SPT Chips`;
		}
	}
};
