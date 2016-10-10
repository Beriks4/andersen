/**
 * Created by Борис on 10.10.2016.
 */

var items = ['Колесо', 'Колесо', 'Палка', 'Двигатель', 'Седло'];

var recipes = [
    {
        in: ['Колесо', 'Колесо'],
        out: 'Два колеса'
    },
    {
        in: ['Два колеса', 'Два колеса'],
        out: 'Четыре колеса'
    },
    {
        in: ['Два колеса', 'Палка', 'Седло'],
        out: 'Велосипед'
    },
    {
        in: ['Два колеса', 'Палка', 'Седло', 'Двигатель'],
        out: 'Мопед'
    },
    {
        in: ['Четыре колеса', 'Двигатель', 'Палка'],
        out: 'Автомобиль'
    }
];

function getItems() {
    return items;
}

function setItems(element) {
    items.push(element);
}

function itemsToDiv(item) {

    document.getElementById('craftItems').innerHTML = '';
    var button = document.createElement('button');
    button.className = 'btn btn-default';
    button.style.margin = '2px';
    button.id = 'res';
    button.innerHTML = item;
    document.getElementById('items').appendChild(button);
}

function itemsView() {
    document.getElementById('items').innerHTML = '';
    var items = getItems();
    for (var i = 0; i < items.length; i++) {
        itemsToDiv(items[i]);
    }

}

function addItem() {
    var element = document.getElementById('add').value;
    if (element) {
        setItems(element);
        itemsView();
        document.getElementById('add').value = '';
    } else {
        alert('Пустое имя');
    }

}
function getRecipe(event) {
    var outputRecipes = '';
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
            document.getElementById('recipies').innerHTML = 'Рецепты: </br>';
            document.getElementById('recipies').appendChild(div);
        } else {
            document.getElementById('recipies').innerHTML = '';
            document.getElementById('recipies').innerHTML = 'Нет рецепта, где используется этот элемент!';

        }
    }
}
function toCraft(event) {
    if (event.target.tagName === 'BUTTON') {
        if (event.target.parentElement.id == 'items') {
            var element = event.target;
            document.getElementById('items').removeChild(element);
            document.getElementById('craftItems').appendChild(element);
        } else if (event.target.parentElement.id == 'craftItems') {
            var element = event.target;
            document.getElementById('items').appendChild(element);
            document.getElementById('craftItems').removeChild(element);
        }
    }
}
function craft() {
    var message = document.getElementById('message');
    message.innerHTML = '';

    var out = '';
    var selected = document.getElementById('craftItems').querySelectorAll('button');
    if (selected.length != 0) {
        var arrOfItems = [];
        for (var i = 0; i < selected.length; i++) {
            arrOfItems.push(selected[i].innerHTML);
        }
        for (var i = 0; i < recipes.length; i++ ) {
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
            setItems(out);
            itemsView();
        } else {
            message.innerHTML = 'Нет такого рецепта';
        }
    } else {
        message.innerHTML = 'Не добавлены элементы';
    }

}

document.getElementById('craftItems').addEventListener('click', toCraft);
document.getElementById('items').addEventListener('click', toCraft);
document.getElementById('go').addEventListener('click', craft);
document.getElementById('craftItems').addEventListener('mouseover', getRecipe);
document.getElementById('items').addEventListener('mouseover', getRecipe);
document.getElementById('addBtn').addEventListener('click', addItem);
itemsView();