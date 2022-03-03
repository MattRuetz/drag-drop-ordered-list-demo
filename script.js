const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

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

let listItems = [];

let dragStartIndex = 0;

const createList = () => {
    [...values].forEach((item, index) => {
        const listItem = document.createElement('li');

        listItem.setAttribute('data-index', index);

        listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="item-name">${item}</p>
                <i class="fa-solid fa-grip"></i>
            </div>
        `;

        listItems.push(listItem);
        draggableList.appendChild(listItem);
    });
};

createList();
