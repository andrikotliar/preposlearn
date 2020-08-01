const root = document.querySelector('.card-content');
const checkBtn = document.querySelector('#checkBtn');
const nextBtn = document.querySelector('#nextBtn');
const exampleText = document.querySelector('.card-example'); 
const count = document.querySelector('#count');
const full = document.querySelector('#full');
const rate = document.querySelector('#rate');
const reset = document.querySelector('#reset');
const menu = document.querySelector('#menu');
const menuModal = document.querySelector('#menuModal');

let index = 0;
let incorrectAnswers = 0;

function createCard() {
	let {word, translate, prepos, preposTranslate, additionalWords, additionalWordsTranslate} = collection[index];
	const prepositionValue = document.querySelector('#prepositionValue');
	let card = `
		<p class="translate">${translate} <i>${additionalWordsTranslate[0]}</i> <b>${preposTranslate}</b> <i>${additionalWordsTranslate[1]}</i></p>
		<div class="verb-prepos">
			<span class="word"><b>${word}</b></span>
			<i>${additionalWords[0]}</i>
			<input type="text" class="preposition" id="prepositionValue">
			<i>${additionalWords[1]}</i>
		</div>
	`;

	root.textContent = '';
	root.insertAdjacentHTML('beforeend', card);
}

function createMenu() {
	let menuItems = `
		<ul class="menu-list">
			<li>Все слова</li>
			<li>Скрыть перевод</li>
			<li>Скрыть счетчики</li>
		</ul>
	`;
	menuModal.insertAdjacentHTML('beforeend', menuItems);
}

createMenu()

function showNumbers() {
	count.textContent = index;
	full.textContent = collection.length;
}

function showIncorrectAnswers() {
	rate.textContent = incorrectAnswers;
}

function showExample() {
	exampleText.classList.add('show');
}

function checkAnswer() {
	let value = prepositionValue.value;
	state = true;
	if(value === collection[index].prepos) {
		exampleText.innerHTML = collection[index].example;
		showExample();
		nextBtn.removeAttribute('disabled');
		resetState()
	} else {
		exampleText.innerHTML = '<span class="wrong-answer">Ответ неверный</span>';
		showExample();
		incorrectAnswers++;
		showIncorrectAnswers();
		resetState()
	}		
}

function nextWord() {
	index++;
	createCard();
	nextBtn.setAttribute('disabled', true);
	showNumbers();		
}

function resetState() {
	reset.removeAttribute('disabled');
}

function resetAll() {
	count.textContent = 0;
	rate.textContent = 0;
	reset.setAttribute('disabled', true);
	exampleText.classList.remove('show');
}

function showMenu() {
	menuModal.classList.toggle('show-menu');
	if(menu.textContent = 'Меню') {
		menu.textContent = 'Закрыть';
	}
}

function callFunctions() {
	createCard();
	showNumbers();
	showIncorrectAnswers();

	checkBtn.addEventListener('click', checkAnswer);
	nextBtn.addEventListener('click', nextWord);		
	reset.addEventListener('click', resetAll);		
	menu.addEventListener('click', showMenu);		
}

callFunctions();