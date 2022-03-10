
function searchMeal(){
    var listOfItems = [];
    
    clearSearchResult();
    var mealName = document.getElementById("mealName").value;
    // var xhr = new XMLHttpRequest();

    // //Making the connection
     let url  = "https://www.themealdb.com/api/json/v1/1/search.php?s="+mealName;
        fetch(url)
        .then(response => response.json())
        .then((data) => {
            listOfItems = data.meals;
            console.log(listOfItems.length);
            var tbody = document.getElementById("searchMealstBody");
            for(var i=0;i<listOfItems.length;i++){
                var row = tbody.insertRow(i);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var mealName = listOfItems[i].strMeal;
                var idMeal = listOfItems[i].idMeal;
                console.log(mealName);
                cell1.innerHTML=mealName;
                var button1 = "<button onclick=\"addToFavourite('"+mealName+"')\">Add to Favourite</button>";
                //console.log(button1);
                cell2.innerHTML=button1;
                var button2 = "<button onclick=\"showDetail("+idMeal+")\">Detail</button>";
                cell3.innerHTML=button2;
            }

        } ).
        catch(function (err) {
	console.warn('Something went wrong.', err);
});
    console.log("Searching for meal with name=>"+mealName);
}

//It deletes all the search results from old search.
function clearSearchResult(){
    var tBody = document.getElementById("searchMealstBody");
    var l = tBody.rows.length;
    console.log("length of the table is ->"+l);
    for(var r=0;r<l;r++){
        tBody.deleteRow(0);
    }
}

function clearFavouriteMealResult(){
    var tBody = document.getElementById("favouriteTablebody");
    var l = tBody.rows.length;
    console.log("length of the table is ->"+l);
    for(var r=0;r<l;r++){
        tBody.deleteRow(0);
    }
}
function addToFavourite(favouriteMealName){
    localStorage.setItem(favouriteMealName,favouriteMealName);
}

function pageload (){
    //localStorage.setItem("pizza","pizza");
    var h = localStorage.length;
    console.log(localStorage);
    var tbody = document.getElementById("favouriteTablebody");
    clearFavouriteMealResult();
    for(var i=0;i<h;i++){
        if(localStorage.key(i)!="mealId"){
            var row = tbody.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = localStorage.key(i).toString()
        var removeButton="<button onclick=\"remove('"+localStorage.key(i)+"')\">remove</button>";
        cell2.innerHTML = removeButton;
        }
        

    }
};

function remove(item){
    localStorage.removeItem(item);
    pageload();

}

function showDetail(itemid){
    console.log("Show detail -->"+itemid);
    localStorage.setItem("mealId",itemid);
    var mealDetail = window.open("/Users/indrabijaynarayan/Documents/CodingNinjas-2021/mealApp/MealDetail.html");
    
    
    
}

