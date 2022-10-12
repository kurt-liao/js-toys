let optionsButton = document.querySelectorAll(".option-button");
let advOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSize = document.getElementById("fontSize");
let contentArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let unlinkButton = document.getElementById("unlink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

// List of fontlist
let fontlist = [
	"Arial",
	"Verdana",
	"Times New Roman",
	"Garamond",
	"Georgia",
	"Courier New",
	"cursive"
];

// Init settings
const initializer = () => {
	highlighter(alignButtons, true);
	highlighter(scriptButtons, true);
	highlighter(spacingButtons, true);
	highlighter(formatButtons, true);

	// create options
	fontlist.map((font) => {
		let option = document.createElement("option");
		option.vallue = font;
		option.innerHTML = font;
		fontName.appendChild(option);
	});

	[1, 2, 3, 4, 5, 6, 7].map((size) => {
		let option = document.createElement("option");
		option.value = size;
		option.innerHTML = size;
		fontSize.append(option);
	});

	fontSize.value = 3;
};

const highlighter = (className, needsRemoval) => {
	className.forEach((button) => {
		button.addEventListener("click", () => {
			// needsRemoval = true means only one button should be highlight and other would be normal
			if (needsRemoval) {
				let alreadyActive = false;

				if (button.classList.contains("active")) {
					alreadyActive = true;
				}

				highlighterRemover(className);

				if (!alreadyActive) {
					button.classList.add("active");
				}
			} else {
				button.classList.toggle("active");
			}
		});
	});
};

const highlighterRemover = (className) => {
	className.forEach((button) => {
		button.classList.remove("active");
	});
};

const modifyText = (command, defaultUi, value) => {
	document.execCommand(command, defaultUi, value);
};

optionsButton.forEach((button) => {
	button.addEventListener("click", () => {
		modifyText(button.id, false, null);
	});
});

advOptionButton.forEach((button) => {
	button.addEventListener("change", () => {
		modifyText(button.id, false, button.value);
	});
});

linkButton.addEventListener("click", () => {
	let userLink = prompt("Enter a URL");
	if (/http/i.test(userLink)) {
		modifyText(linkButton.id, false, userLink);
	} else {
		userLink = `http://${userLink}`;
		modifyText(linkButton.id, false, userLink);
	}
});

alignButtons.forEach((button) => {
	button.addEventListener("change", () => {
		modifyText(button.id, false, null);
	});
});

unlinkButton.addEventListener("click", () => {
	modifyText(unlinkButton.id, false, "");
});

window.onload = initializer();
