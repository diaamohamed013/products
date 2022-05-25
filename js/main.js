//CRUD create retreive update delete search
var productName = document.getElementById("pName");
var productPrice = document.getElementById("pPrice");
var productType = document.getElementById("pType");
var productDesc = document.getElementById("pDesc");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var input1 = document.getElementById("input1");
var input2 = document.getElementById("input2");
var input3 = document.getElementById("input3");
var input4 = document.getElementById("input4");



var productsContainer;
if (localStorage.getItem("ourProducts") == null) {
    productsContainer = [];
}
else {
    productsContainer = JSON.parse(localStorage.getItem("ourProducts"));
    displayProduct(productsContainer);
}

function addProduct() {
    if (validateProductName() && validateProductPrice() && validateProductType() && validateProductDesc()) {
        var newProduct = {
            name: productName.value,
            price: productPrice.value,
            type: productType.value,
            desc: productDesc.value
        };
        productsContainer.push(newProduct);
        localStorage.setItem("ourProducts", JSON.stringify(productsContainer));
        displayProduct(productsContainer);
        clearForm();
    }
    // else{
    //     alert("product name must start with uppercase letter");
    // }

}

function displayProduct(x) {
    var cartoona = ``;
    for (let i = 0; i < x.length; i++) {
        // console.log(productsContainer[i].name);
        cartoona += `<tr>
                        <td>${i}</td>
                        <td>${x[i].name}</td>
                        <td>${x[i].price}</td>
                        <td>${x[i].type}</td>
                        <td>${x[i].desc}</td>
                        <td><button onclick = "updateProduct(${i})" class="btn btn-danger">Update</button></td>
                        <td><button onclick = "deleteProduct(${i})" class="btn btn-warning">Delete </button></td>
                    </tr>`;
    }
    document.getElementById("myTable").innerHTML = cartoona;
}

var globalIndex;
function updateProduct(updatedIndex) {
    globalIndex = updatedIndex;
    productName.value = productsContainer[updatedIndex].name;
    productPrice.value = productsContainer[updatedIndex].price;
    productType.value = productsContainer[updatedIndex].type;
    productDesc.value = productsContainer[updatedIndex].desc;
    updateBtn.classList.replace("d-none", "d-inline-block");
    addBtn.classList.add("d-none");
}

function edit() {
    if (validateProductName()&&validateProductPrice()&&validateProductType()&&validateProductDesc()) {
        productsContainer[globalIndex].name = productName.value;
        productsContainer[globalIndex].price = productPrice.value;
        productsContainer[globalIndex].type = productType.value;
        productsContainer[globalIndex].desc = productDesc.value;
        localStorage.setItem("ourProducts", JSON.stringify(productsContainer));
        displayProduct(productsContainer);
        addBtn.classList.replace("d-none", "d-inline-block");
        updateBtn.classList.add("d-none");
        clearForm();
        productName.classList.remove("is-valid");
        productPrice.classList.remove("is-valid");
        productType.classList.remove("is-valid");
        productDesc.classList.remove("is-valid");
        
    }
}

function deleteProduct(index) {
    productsContainer.splice(index, 1);
    localStorage.setItem("ourProducts", JSON.stringify(productsContainer));
    displayProduct(productsContainer);
}

function search(x) {
    var searchedItems = [];
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(x.toLowerCase()) || productsContainer[i].type.toLowerCase().includes(x.toLowerCase())) {
            searchedItems.push(productsContainer[i]);
        }

    }
    displayProduct(searchedItems);
}

function validateProductName() {
    var regx = /^[A-Z][a-z]{1,8}$/;
    if (regx.test(productName.value)) {
        productName.classList.replace("is-invalid", "is-valid");
        input1.classList.add("d-none");
        return true;
    }
    else {
        productName.classList.add("is-invalid");
        input1.classList.replace("d-none", "d-block");
        return false;
    }
}

function validateProductPrice() {
    var regx2 = /^([1-9][0-9][0-9][0-9]\$?|10000\$?)$/;
    if (regx2.test(productPrice.value)) {
        productPrice.classList.replace("is-invalid", "is-valid");
        input2.classList.add("d-none");
        return true;
    }
    else {
        productPrice.classList.add("is-invalid");
        input2.classList.replace("d-none", "d-block");
        return false;
    }
}

function validateProductType() {
    var regx3 = /^(mobile|device|tv)$/gi;
    if (regx3.test(productType.value)) {
        productType.classList.replace("is-invalid", "is-valid");
        input3.classList.add("d-none");
        return true;
    }
    else {
        productType.classList.add("is-invalid");
        input3.classList.replace("d-none", "d-block");
        return false;
    }
}

function validateProductDesc() {
    var regx4 = /^[a-z\s]{1,500}$/gmi;
    if (regx4.test(productDesc.value)) {
        productDesc.classList.replace("is-invalid", "is-valid");
        input4.classList.add("d-none");
        return true;
    }
    else {
        productDesc.classList.add("is-invalid");
        input4.classList.replace("d-none", "d-block");
        return false;
    }
}

function clearForm() {
    productName.value = " ";
    productPrice.value = " ";
    productType.value = " ";
    productDesc.value = " ";
    productName.classList.remove("is-valid");
    productPrice.classList.remove("is-valid");
    productType.classList.remove("is-valid");
    productDesc.classList.remove("is-valid");
    productName.classList.remove("is-invalid");
    productPrice.classList.remove("is-invalid");
    productType.classList.remove("is-invalid");
    productDesc.classList.remove("is-invalid");
}
