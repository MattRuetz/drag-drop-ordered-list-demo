const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

// Holds values to be shown as list items in DOM
const values = [
    'English Mastiff',
    'Saint Bernard',
    'Great Dane',
    'Neapolitan Mastiff',
    'Irish Wolfhound',
    'Leonberger',
    'Newfoundland Dog',
    'Anatolian Shepherd Dog',
    'French Mastiff',
    'Great Pyrenees',
];

let listItems = []; // HTML for each LI made from values
let dragStartIndex = 0;

// Insert list items into DOM
function createList() {
    [...values]
        .map((a) => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)
        .forEach((item, index) => {
            const listItem = document.createElement('li');

            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
                <span class="number">${index + 1}</span>
                <div class="draggable" draggable="true">
                <p class="item-name">${item}</p>
                <i class="fas fa-grip-lines"></i>
                </div>
            `;

            listItems.push(listItem); //push to runtime array
            draggableList.appendChild(listItem); //append to DOM
        });

    addEventListeners();
}

// ----------- Event Handlers for dragging -----------
function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
    this.classList.add('obscured');
}

function dragLeave() {
    this.classList.remove('obscured');
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('obscured');
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

// Check the order of list items
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem
            .querySelector('.draggable')
            .innerText.trim();

        if (personName !== values[index]) {
            listItem.classList.add('incorrect');
        } else {
            listItem.classList.remove('incorrect');
            listItem.classList.add('correct');
        }
    });
}

// ----------- Function adds event listeners to each list item -----------
function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach((draggable) => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach((item) => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

// Event Listeners
check.addEventListener('click', checkOrder);

// On Load
createList();
