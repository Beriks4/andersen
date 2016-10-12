/**
 * Created by Борис on 10.10.2016.
 */

var elemCraftItems;
var elemItems;
var elemGo;
var elemAddBtn;
var elemRecipes;
var elemAdd;

function ready () {
    getElements();
    addListeners();
}

function getElements() {
    elemCraftItems   = document.getElementById('craftItems');
    elemItems  = document.getElementById('items');
    elemGo  = document.getElementById('go');
    elemAddBtn = document.getElementById('addBtn');
    elemRecipes = document.getElementById('recipes');
    elemAdd = document.getElementById('add');
}

function addListeners() {
    elemCraftItems.addEventListener('click', toCraft);
    elemItems.addEventListener('click', toCraft);
    elemGo.addEventListener('click', craft);
    elemCraftItems.addEventListener('mouseover', getRecipe);
    elemItems.addEventListener('mouseover', getRecipe);
    elemAddBtn.addEventListener('click', addItem);
}

function itemsView() {
    elemItems.innerHTML = '';
    var items = Models.getItems();
    for (var i = 0; i < items.length; i++) {
        Models.itemsToDiv(items[i]);
    }

}

function addItem() {
    var element = elemAdd.value;
    if (element) {
        Models.setItems(element);
        itemsView();
        elemAdd.value = '';
    } else {
        alert('Пустое имя');
    }

}
function getRecipe(event) {
    var outputRecipes = '';
    var recipes = Models.getRecipes();
    if (event.target.tagName === 'BUTTON') {
        var value = event.target.innerHTML;
        for (var i = 0; i < recipes.length; i++) {
            var index = recipes[i].in.indexOf(value);
            if (index >= 0) {	// собираем рецепты, где упоминается переданный ингредиент
                outputRecipes += recipes[i].in.join(' + ') + ' = ' + recipes[i].out + '\n' + '</br>';
            }
        }
        if (outputRecipes != '') {
            var div = document.createElement('div');
            div.id = 'recipe';
            div.innerHTML = outputRecipes;
            elemRecipes.innerHTML = 'Рецепты: </br>';
            elemRecipes.appendChild(div);
        } else {
            elemRecipes.innerHTML = '';
            elemRecipes.innerHTML = 'Нет рецепта, где используется этот элемент!';

        }
    }
}
function toCraft(event) {
    if (event.target.tagName === 'BUTTON') {
        var element = event.target;
        if (event.target.parentElement.id == 'items') {
            elemItems.removeChild(element);
            elemCraftItems.appendChild(element);
        } else if (event.target.parentElement.id == 'craftItems') {
            elemItems.appendChild(element);
            elemCraftItems.removeChild(element);
        }
    }
}
function craft() {
    var message = document.getElementById('message');
    message.innerHTML = '';

    var out = '';
    var selected = elemCraftItems.querySelectorAll('button');
    if (selected.length != 0) {
        var arrOfItems = [];
        for (var i = 0; i < selected.length; i++) {
            arrOfItems.push(selected[i].innerHTML);
        }
        var recipes = Models.getRecipes();
        for (var i = 0; i < recipes.length; i++) {
            var selectedRecipe = recipes[i].in.slice();
            var count = 0;
            for (var j = 0; j < arrOfItems.length; j++) {
                var ind = selectedRecipe.indexOf(arrOfItems[j]);
                if (ind >= 0) {
                    selectedRecipe.splice(ind, 1);
                    count++;
                }
                if (count == arrOfItems.length && selectedRecipe.length == 0) {
                    out = recipes[i].out;
                }
            }
        }
        if (out != 0) {
            message.innerHTML = 'Создано ' + out;
            Models.setItems(out);
            itemsView();
        } else {
            message.innerHTML = 'Нет такого рецепта';
        }
    } else {
        message.innerHTML = 'Не добавлены элементы';
    }
}
ready();
itemsView();