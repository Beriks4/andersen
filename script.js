/**
 * Created by Борис on 10.10.2016.
 */

function itemsView() {
    document.getElementById('items').innerHTML = '';
    var items = Models.getItems();
    for (var i = 0; i < items.length; i++) {
        Models.itemsToDiv(items[i]);
    }

}

function addItem() {
    var element = document.getElementById('add').value;
    if (element) {
        Models.setItems(element);
        itemsView();
        document.getElementById('add').value = '';
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
            document.getElementById('recipes').innerHTML = 'Рецепты: </br>';
            document.getElementById('recipes').appendChild(div);
        } else {
            document.getElementById('recipes').innerHTML = '';
            document.getElementById('recipes').innerHTML = 'Нет рецепта, где используется этот элемент!';

        }
    }
}
function toCraft(event) {
    if (event.target.tagName === 'BUTTON') {
        var element = event.target;
        if (event.target.parentElement.id == 'items') {
            document.getElementById('items').removeChild(element);
            document.getElementById('craftItems').appendChild(element);
        } else if (event.target.parentElement.id == 'craftItems') {
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
        var recipes = Models.getRecipes();
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
            Models.setItems(out);
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