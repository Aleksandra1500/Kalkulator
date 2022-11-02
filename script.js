const numberButtons = document.querySelectorAll(".light_button");
const operationButtons = document.querySelectorAll(".dark_button");
const additionalButtons = document.querySelectorAll(".additional_button");
const display = document.querySelectorAll(".display_main p");
const additionalDisplay = document.querySelectorAll(".display_additional p");
const enter = document.querySelector("#enter");
let stack = [];
let isOperation = false;

function loop() {
	for (let i = 1; i <= 4; i++) {
		display[i].textContent = stack[stack.length - i];
	}
}

function numberClick(e) {
	additionalDisplay[0].textContent = "";
	if (isOperation == false) {
		number = e.target.innerText;
		display[0].textContent += number;
	} else {
		loop();
		display[0].textContent = "";
		number = e.target.innerText;
		display[0].textContent += number;
	}
	isOperation = false;
	console.log(stack);
}

function enterClick() {
	if (display[0].textContent !== "") {
		console.log(stack);
		if (
			(display[1].textContent == "" && stack.length == 1) ||
			isOperation == true
		) {
			loop();
			display[0].textContent = "";
		} else {
			stack.push(display[0].textContent);
			loop();
			display[0].textContent = "";
		}
		console.log(stack);
	}
}

function operationClick(e) {
	if (e.target.innerText == "C") {
		delateAll();
	} else if (e.target.innerText == "⌫") {
		backspace();
	} else {
		if (
			(stack.length != 0 && stack.length != 1) ||
			(stack.length == 1 &&
				display[1].textContent != "" &&
				display[0].textContent != "")
		) {
			if (isOperation == false) {
				enterClick();
			} else {
				loop();
			}

			x = stack.pop();
			y = stack.pop();
			console.log(x, y);

			switch (e.target.innerText) {
				case "%":
					result = parseInt(y) % parseInt(x);
					break;
				case "^":
					result = Math.pow(parseInt(y), parseInt(x));
					break;
				case "÷":
					if (x == 0) {
						window.alert("Nie można dzielić przez zero!");
						stack.push(y);
						stack.push(x);
						for (let i = 0; i <= 4; i++) {
							display[i].textContent = stack[stack.length - i - 1];
						}
						isOperation = true;
						return;
					} else {
						result = parseInt(parseInt(y) / parseInt(x));
					}
					break;
				case "×":
					result = parseInt(y) * parseInt(x);
					break;
				case "-":
					result = parseInt(y) - parseInt(x);
					break;
				case "+":
					result = parseInt(y) + parseInt(x);
					break;
			}

			loop();

			const maxNum = Number.MAX_SAFE_INTEGER;

			if (result >= maxNum) {
				result = "MAX";
			}

			if (display[0].textContent == "Infinity") {
				result = "MAX";
			}

			display[0].textContent = result;

			console.log(display[0].textContent);

			stack.push(result);
		}
		isOperation = true;
		console.log(stack);
	}
}

function delateAll() {
	stack = [];
	for (let i = 0; i <= 4; i++) {
		display[i].textContent = "";
	}
	additionalDisplay[0].textContent = "";
}

function backspace() {
	if (display[0].textContent == "") {
		stack.pop();
		loop();
	} else if (display[0].textContent == "0" && isOperation == true) {
		stack.pop();
		display[0].textContent = "";
	} else {
		display[0].textContent = "";
	}
	console.log(stack);
}

function additionalClick(e) {
	temp = e.target.innerText;
	console.log("temp" + temp);
	switch (temp) {
		case "↹":
			changeElements();
			break;
		case "Prime":
			math_prime();
			break;
		case "Prime sum":
			math_primeSum();
			break;
		case "NWW":
			nww_nwd(temp);
			break;
		case "NWD":
			nww_nwd(temp);
			break;
	}
}

function changeElements() {
	if (stack.length != 0) {
		if (display[0].textContent != "") {
			temp = display[0].textContent;
			stack[stack.length - 1] = temp;
			display[0].textContent = display[1].textContent;
			display[1].textContent = temp;
			console.log(stack);
		} else {
			temp = "0";
			display[0].textContent = display[1].textContent;
			display[1].textContent = temp;

			stack[stack.length - 1] = display[1].textContent;
			console.log(stack);
		}
	}
}

function math_prime() {
	additionalDisplay[0].textContent = "";
	additionalDisplay[0].textContent += "\\[ " + prime();
	additionalDisplay[0].textContent += "\\]";
	MathJax.typesetPromise();
}

function prime() {
	if (
		(display[0].textContent != "" && stack.length == 0) ||
		(display[0].textContent != "" && display[1].textContent != "")
	) {
		n = display[0].textContent;
		let str = "";

		if (isPrime(n)) {
			str = n;
			return str;
		} else {
			let count = 0;
			while (n % 2 == 0) {
				n = parseInt(n / 2);
				count++;
			}

			if (count) str += `2^${count}`;

			for (var i = 3; i <= parseInt(Math.sqrt(n)); i += 2) {
				count = 0;
				while (n % i == 0) {
					count++;
					n = parseInt(n / i);
				}
				if (count != 0) {
					if (count > 1) str += ` \\cdot ${i}^${count}`;
					else str += ` \\cdot ${i}`;
				}
			}

			if (str.charAt(1) === "\\") str = str.substring(6);

			if (n > 2) str += ` \\cdot ${n}`;

			return str;
		}
	} else if (display[0].textContent == "" && stack.length == 1) {
		n = stack[stack.length - 1];

		if (isPrime(n)) {
			str = n;
			return str;
		} else {
			let count = 0;

			while (n % 2 == 0) {
				n = parseInt(n / 2);
				count++;
			}

			if (count) str += `2^${count}`;

			for (var i = 3; i <= parseInt(Math.sqrt(n)); i += 2) {
				count = 0;
				while (n % i == 0) {
					count++;
					n = parseInt(n / i);
				}
				if (count != 0) {
					if (count > 1) str += ` \\cdot ${i}^${count}`;
					else str += ` \\cdot ${i}`;
				}
			}

			if (str.charAt(1) === "\\") str = str.substring(6);

			if (n > 2) str += ` \\cdot ${n}`;

			return str;
		}
	}
}

function math_primeSum() {
	temp = "";
	temp += "\\[ " + primeSum();
	temp += "\\]";

	additionalDisplay[0].textContent = "";
	additionalDisplay[0].textContent += "\\[ " + primeSum();
	additionalDisplay[0].textContent += "\\]";
	MathJax.typesetPromise();

	if (additionalDisplay[0].textContent == "undefined") {
		additionalDisplay[0].textContent = "Brak rozkładu";
	}
}

function isPrime(a) {
	for (let i = 2; i <= Math.sqrt(a); i++) {
		if (a % i == 0) {
			return false;
		}
	}
	return true;
}

function primeSum() {
	str = "";
	if (
		(display[0].textContent != "" && stack.length == 0) ||
		(display[0].textContent != "" && display[1].textContent != "")
	) {
		a = display[0].textContent;
		for (let i = 2; i <= a - i; i++) {
			if (isPrime(i) && isPrime(a - i)) {
				str += i;
				str += "+";
				str += a - i;

				return str;
			}
		}
	} else if (display[0].textContent == "" && stack.length == 1) {
		a = stack[stack.length - 1];
		for (let i = 2; i <= a - i; i++) {
			if (isPrime(i) && isPrime(a - i)) {
				str += i;
				str += "+";
				str += a - i;
				return str;
			}
		}
	}
}

let isNWD = false;

function nww_nwd(btn) {
	if (
		(display[0].textContent != "" && display[1].textContent != "") ||
		stack.length > 1
	) {
		if (display[0].textContent != "") {
			b = display[0].textContent;
			a = stack[stack.length - 1];
		} else {
			b = stack[stack.length - 2];
			a = stack[stack.length - 1];
		}

		switch (btn) {
			case "NWW":
				nww(a, b);
				break;
			case "NWD":
				isNWD = true;
				nwd(a, b);
				break;
		}
	}
}

function nww(a, b) {
	x = nwd(a, b);
	result = (a * b) / x;
	additionalDisplay[0].textContent = "NWW: " + result;
}

function nwd(a, b) {
	let r;
	while (b) {
		r = a % b;
		a = b;
		b = r;
	}
	if (isNWD == true) {
		additionalDisplay[0].textContent = "NWD: " + a;
	}
	isNWD = false;
	return a;
}

numberButtons.forEach((numberButton) =>
	numberButton.addEventListener("click", numberClick)
);

enter.addEventListener("click", enterClick);

operationButtons.forEach((operation) =>
	operation.addEventListener("click", operationClick)
);

additionalButtons.forEach((additional) =>
	additional.addEventListener("click", additionalClick)
);
