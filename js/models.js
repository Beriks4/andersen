/**
 * Created by Борис on 11.10.2016.
 */
var Models =  (function () {

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

    function getRecipes() {
        return recipes;

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

    return {
        getItems: getItems,
        setItems: setItems,
        itemsToDiv: itemsToDiv,
        getRecipes: getRecipes
    };
})();