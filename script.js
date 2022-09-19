let title = document.getElementById(`title`);
let price = document.getElementById(`price`)
let taxes = document.getElementById(`taxes`)
let ads = document.getElementById(`ads`)
let discount = document.getElementById(`discount`)
let total = document.getElementById(`total`)
let count = document.getElementById(`count`)
let category = document.getElementById(`category`)
let create = document.getElementById(`create`)

let mood = `create`
let variable;

function getTotal() {

    if (price.value != ``) {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "blue"
    } else {
        total.innerHTML = ``
        total.style.background = "red"
    }
}

let dataprod;
if (localStorage.product != null) {
    dataprod = JSON.parse(localStorage.product)
} else {
    dataprod = []
}

create.onclick = function () {
    let newprod = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }

    if (mood === `create`) {
        if (newprod.count > 1) {
            for (let i = 0; i < newprod.count; i++) {
                dataprod.push(newprod)
            }
        } else {
            dataprod.push(newprod);
        }
    } else {
        dataprod[variable] = newprod;
        mood = `create`
        create.innerHTML = `create`
        count.style.display = `block`
    }

    localStorage.setItem("product", JSON.stringify(dataprod))
    cleardata();
    showdata();
}

function cleardata() {
    title.value = ``
    price.value = ``
    taxes.value = ``
    ads.value = ``
    discount.value = ``
    total.innerHTML = ``
    count.value = ``
    category.value = ``
}
function showdata() {
    getTotal();
    let table = ``;
    for (let i = 0; i < dataprod.length; i++) {
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataprod[i].title}</td>
            <td>${dataprod[i].price}</td>
            <td>${dataprod[i].taxes}</td>
            <td>${dataprod[i].ads}</td>
            <td>${dataprod[i].discount}</td>
            <td>${dataprod[i].total}</td>
            <td>${dataprod[i].category}</td>
            <td><button onclick="deleteData(${i})" id="update">update</button></td>
            <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
    </tr>
        `
    }
    document.getElementById(`tbody`).innerHTML = table
    let btndelete = document.getElementById(`deleteAll`)
    if (dataprod.length > 0) {
        btndelete.innerHTML = `
        <button onclick ="deleteall()">delete All (${dataprod.length}) </button>
        `
    } else {
        btndelete.innerHTML = ``;
    }
}
showdata();


function deletedata(i) {
    dataprod.splice(i, 1);
    localStorage.product = JSON.stringify(dataprod);
    showdata();
}

function deleteall() {
    localStorage.clear()
    dataprod.splice(0)
    showdata();

}

function deleteData(i) {
    title.value = dataprod[i].title
    price.value = dataprod[i].price
    taxes.value = dataprod[i].taxes
    ads.value = dataprod[i].ads
    discount.value = dataprod[i].discount
    getTotal();
    count.style.display = `none`

    category.value = dataprod[i].category
    create.innerHTML = `update`
    mood = `update`
    variable = i
    scroll({
        top: 0,
        behavior: `smooth`
    })
}

let searchmood = `title`

function getsearch(id) {
    let search = document.getElementById(`search`);
    if (id == `stitle`) {
        searchmood = `title`
        search.placeholder = `search by title`
    } else {
        searchmood = `category`;
        search.placeholder = `search by category`

    }
    search.focus()
}

function searchData(value) {
    let table = ``;
    if (searchmood == `title`) {
        for (let i = 0; i < dataprod.length; i++) {
            if (dataprod[i].title.includes(value)) {
                table += `
        <tr>
            <td>${i}</td>
            <td>${dataprod[i].title}</td>
            <td>${dataprod[i].price}</td>
            <td>${dataprod[i].taxes}</td>
            <td>${dataprod[i].ads}</td>
            <td>${dataprod[i].discount}</td>
            <td>${dataprod[i].total}</td>
            <td>${dataprod[i].category}</td>
            <td><button onclick="deleteData(${i})" id="update">update</button></td>
            <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
    </tr>
        `
            }
        }

    } else {
        for (let i = 0; i < dataprod.length; i++) {
            if (dataprod[i].category.includes(value)) {
                table += `
        <tr>
            <td>${i}</td>
            <td>${dataprod[i].title}</td>
            <td>${dataprod[i].price}</td>
            <td>${dataprod[i].taxes}</td>
            <td>${dataprod[i].ads}</td>
            <td>${dataprod[i].discount}</td>
            <td>${dataprod[i].total}</td>
            <td>${dataprod[i].category}</td>
            <td><button onclick="deleteData(${i})" id="update">update</button></td>
            <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
    </tr>
        `
            }
        }
    }
    document.getElementById(`tbody`).innerHTML = table

}


