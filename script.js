/**
 * Created by Борис on 10.10.2016.
 */

var resurses = ['1', '2', '3', '4', '5'];

var recipes = [
    {
        in: ['1', '2'],
        out: '3'
    },
    {
        in: ['2', '3'],
        out: '5'
    },
    {
        in: ['1', '4'],
        out: '5'
    },
    {
        in: ['1', '2', '3'],
        out: '6'
    }
];

function getRes() {
    return resurses;
}

function setRes(element) {
    resurses.push(element);
}

function itemsIn(item) {

    document.getElementById('craft').innerHTML = '';
    var button = document.createElement('button');
    button.className = 'btn';
    button.style.margin = '2px';
    button.id = 'res';
    //button.setAttribute('draggable', true);
    //button.ondragstart = drag;
    button.innerHTML = item;
    document.getElementById('items').appendChild(button);
}

function itemsView() {
    document.getElementById('items').innerHTML = '';
    var items = getRes();
    for (var i = 0; i < items.length; i++) {
        itemsIn(items[i]);
    }

}

function addItem() {
    var element = document.getElementById('add').value;
    if (element) {
        setRes(element);
        itemsView();
        document.getElementById('add').value = '';
        //alert('Add!');
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

            if (index >= 0) {	// собираем пачку рецептов, где упоминается переданный ингредиент
                outputRecipes += recipes[i].in.join(' + ') + ' = ' + recipes[i].out + '\n' + '</br>';
            }

        }
        if (outputRecipes != '') {
            //alert(outputRecipes);
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
    // alert(event.target.parentElement.id);
    if (event.target.tagName === 'BUTTON') {
        if (event.target.parentElement.id == 'items') {
            var element = event.target;
            document.getElementById('items').removeChild(element);
            document.getElementById('craft').appendChild(element);
        } else if (event.target.parentElement.id == 'craft') {
            var element = event.target;
            document.getElementById('items').appendChild(element);
            document.getElementById('craft').removeChild(element);
        }
    }
}
function craft() {
    var message = document.getElementById('message');
    message.innerHTML = '';

    var out = '';
    var selected = document.getElementById('craft').querySelectorAll('button');
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
            setRes(out);
            itemsView();
        } else {
            message.innerHTML = 'Нет такого рецепта';
        }
    } else {
        message.innerHTML = 'Не добавлены элементы';
    }

}

document.getElementById('craft').addEventListener('click', toCraft);
document.getElementById('items').addEventListener('click', toCraft);
document.getElementById('go').addEventListener('click', craft);
document.getElementById('craft').addEventListener('mouseover', getRecipe);
document.getElementById('items').addEventListener('mouseover', getRecipe);
document.getElementById('addBtn').addEventListener('click', addItem);
itemsView();

// alert(recipes[1].in);