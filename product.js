function Product(id, name, price, quantity){
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;

    this.getQuantity = function(){
        return this.quantity;
    }
    this.setQuantity = function(quantity){
        this.quantity  = quantity;
    }
    this.getId = function(){
        return this.id;
    }
    this.setId = function(id){
        this.id = id;
    }
    this.getName = function(){
        return this.name;
    }
    this.setName = function(name){
        this.name = name;
    }
    this.getPrice = function(){
        return this.price;
    }
    this.setPrice  = function(price){
        this.price = price;
    }
}
let KEY_PRODUCTS = "products";
function initData(){

    if(localStorage.getItem(KEY_PRODUCTS)!=null){
        let data = localStorage.getItem(KEY_PRODUCTS);        // data: JSON
        let productsData = JSON.parse(data);                // JSON - 
        

        for(let i=0;i<productsData.length;i++){
            let pData = productsData[i];
            let p = new Product(pData.id, pData.name, pData.price, pData.quantity);
            products.push(p);
        }

        console.log(products);
    }else{
        let p1 = new Product(1, "aSony v1", 10000000, 10);
        let p2 = new Product(10, "aaSony v1", 10000000, 10);
        let p3 = new Product(4, "bnSony v1", 30000000, 10);
        let p4 = new Product(3, "Sony v1", 10000000, 10);

        products = [p1, p2, p3, p4];

        localStorage.setItem(KEY_PRODUCTS, JSON.stringify(products));
    }

    

    
}
/**
function drawProduct(){
    let str = "";
    for(let i=0;i<products.length;i++){
        str += `
        <tr>
            <td>${products[i].getId()}</td>
            <td>${products[i].getName()}</td>
            <td class="text-right">1</td>
            <td class="text-right">${products[i].getPrice()}</td>
            <td class="text-right">${formatNumberCurrency(products[i].getPrice())}</td>
            <td class="text-center">
                <input type="button" class="btn  btn-danger" value="Delete"/>
                <input type="button" onclick="handleEditItem(${products[i].getId()})" class="btn  btn-dark" value="Edit"/>
            </td>
        </tr>
        `
    }
    document.getElementById("tbProducts").innerHTML = str;
}
function findProductById(id){
    for(let i=0;i<products.length;i++){
        if(products[i].getId()==id){
            return products[i];
        }
    }
    return null;
}

function displayHiddenFrmAddUpdate2(showing){
    let frmAdd = 'none';
    let frmEdit = 'none';

    if(showing=='add'){
        frmAdd = 'block';
        frmEdit = 'none';
    }else{
        // showing = edit;
        frmAdd = 'none';
        frmEdit = 'block'
    }

    document.getElementById("idCreate").style.display = frmAdd;
    document.getElementById("idUpdate").style.display = frmEdit;
    document.getElementById("idCancel").style.display = frmEdit;
}

 */
function drawProduct2(){
    let total = 0;
    let strProducts = products.map((product)=>{
        total += product.getQuantity()*product.getPrice();
        return `
            <tr>
            <td>${product.getId()}</td>
            <td>${product.getName()}</td>
            <td class="text-right">${product.getQuantity()}</td>
            <td class="text-right">${product.getPrice()}</td>
            <td class="text-right">${formatNumberCurrency(product.getPrice())}</td>
            <td class="text-center">
                <input type="button" class="btn btn-danger" onclick="handleDeleteItem(${product.getId()})" value="Delete"/>
                <input type="button" onclick="handleEditItem(${product.getId()})" class="btn  btn-dark" value="Edit"/>
            </td>
        </tr>
        `
    });
    document.getElementById("tbProducts").innerHTML = strProducts.join("");
    updateTotal(total);
}
function drawProductsFilter(productsFilter){
    let total = 0;
    let strProducts = productsFilter.map((product)=>{
        total += product.getQuantity()*product.getPrice();
        return `
            <tr>
            <td>${product.getId()}</td>
            <td>${product.getName()}</td>
            <td class="text-right">${product.getQuantity()}</td>
            <td class="text-right">${product.getPrice()}</td>
            <td class="text-right">${formatNumberCurrency(product.getPrice())}</td>
            <td class="text-center">
                <input type="button" class="btn  btn-danger" value="Delete"/>
                <input type="button" onclick="handleEditItem(${product.getId()})" class="btn  btn-dark" value="Edit"/>
            </td>
        </tr>
        `
    });
    document.getElementById("tbProducts").innerHTML = strProducts.join("");
    updateTotal(total);
}


function updateTotal(total){
    document.getElementById("txtSubTotal").innerText = formatNumberCurrency(total);
    document.getElementById("txtTotal").innerText = formatNumberCurrency(total);
}
function formatNumberCurrency(price){
    return  price.toLocaleString('vi-VI', {style : 'currency', currency : 'VND'});
}

function handleCreate(){
    let name = document.getElementById("txtName").value;
    let price = document.getElementById("txtPrice").value;
    let quantity = document.getElementById("txtQuantity").value;


    if(name == "" || price == "" || quantity == ""){
        alert("Thông tin không hợp lệ vui lòng nhập lại")
    }else{
        // tim sản phẩm có ID lớn nhất
        let maxId = productMaxId(products) + 1;
        let product = new Product(maxId, name, price, quantity);

        products.push(product);


        localStorage.setItem(KEY_PRODUCTS, JSON.stringify(products))
        drawProduct2();
    }
    

}
let products = [];
initData();
drawProduct2();

function productMaxId(products){
    let pMax = products[0];
    for(let i=0;i<products.length;i++){
        if(products[i].getId()>pMax.getId()){
            pMax = products[i];
        }
    }
    return pMax.getId();
}

function handleEditItem(id){
    let product = findProductById2(id);


    document.getElementById("txtName").value = product.getName();
    document.getElementById("txtPrice").value = product.getPrice();
    document.getElementById("txtQuantity").value = product.getQuantity();

    document.getElementById("txtProductUpdate").value = id;

    displayHiddenFrmAddUpdate('update');

}


function findProductById2(id){
    let product = products.find((product)=>{
        if(id==product.getId()){
            return true;
        }
    })
    return product;
}


function handleUpdate(){
    let name = document.getElementById("txtName").value;
    let price = +document.getElementById("txtPrice").value;
    let quantity = +document.getElementById("txtQuantity").value;

    let idProductUpdate = document.getElementById("txtProductUpdate").value;


    if(name == "" || price == "" || quantity == ""){
        alert("Thông tin không hợp lệ vui lòng nhập lại")
    }else{
        let p = new Product();
        p.setName(name);
        p.setPrice(price);
        p.setQuantity(quantity);
        updateProductById(idProductUpdate, p);

        localStorage.setItem(KEY_PRODUCTS, JSON.stringify(products))
        drawProduct2();
    }

    displayHiddenFrmAddUpdate('add');


}

function updateProductById(idProduct, product){
    for(let i=0;i<products.length;i++){
        if(products[i].getId()==idProduct){
            products[i].setName(product.getName());
            products[i].setPrice(product.getPrice());
            products[i].setQuantity(product.getQuantity());
        }
    }
}
function resetForm(){
    document.getElementById("txtName").value = "";
    document.getElementById("txtPrice").value = "";
    document.getElementById("txtQuantity").value = "";
}

function handleCancel(){
    resetForm();
    displayHiddenFrmAddUpdate('add')
    
}

function displayHiddenFrmAddUpdate(showing){
    if(showing=='add'){
        document.getElementById("idCreate").style.display = "block";
        document.getElementById("idUpdate").style.display = "none";
        document.getElementById("idCancel").style.display = "none";
    }else{
        document.getElementById("idCreate").style.display = "none";
        document.getElementById("idUpdate").style.display = "block";
        document.getElementById("idCancel").style.display = "block";
    }
}

function handleSearchChange(){
    let txtSearch = document.getElementById("search").value;

    let productFilters = [];
    for(let i=0;i<products.length;i++){
        if(products[i].getName().toUpperCase().includes(txtSearch.toUpperCase())){
            productFilters.push(products[i]);
        }
    }
    drawProductsFilter(productFilters);
}
function findIndexProductById(id){
    let index = -1;
    for(let i=0;i<products.length;i++){
        if(products[i].getId()==id){
            index = i;
        }
    }
    return index;
}

function handleDeleteItem(id){

    let product = findProductById2(id);
    let check = confirm("Bạn có muốn xóa sản phẩm: " + product.getName());

    if(check==true){
        // Tìm vị trí đã
        let index = findIndexProductById(id);
        if(index!=-1){
            products.splice(index, 1);
        }

        localStorage.setItem(KEY_PRODUCTS, JSON.stringify(products));
        drawProduct2();
        
    }
}

