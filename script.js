var url_link = "http://localhost:3000/test-app-data/"
/*
var jquery_script = document.createElement('script');

my_awesome_script.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js');

document.head.appendChild(jquery_script);
*/
function addScript() {
    var jquery_script = document.createElement('script');

    jquery_script.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js');

    document.head.appendChild(jquery_script);   
}
function clearInputForm() {
    $("#name-box").val("");
    $("#update-name-box").val("");
}
function getData() {
    $.ajax({
    type: 'GET',
    url: url_link,
    dataType: 'json',
    success: function(data) {
        $("#read-box").text(JSON.stringify(data,null,"\t"));
    }
    });
}
function insertData() {
    var userName= $("#name-box").val();
    var json_data = {
        name: userName 
    };
    $.ajax({
        type: "GET",
        url: url_link+"?name="+userName,
        dataType: "json",
        success: function (data) {
            if(data.length == 0){
                $.ajax({
                    type: "POST",
                    url: url_link,
                    data: json_data,
                    dataType: "json",
                    success: function (response) {
                        console.log(response);
                    },complete: function() {
                        getData();
                    }
                });
            }else{
                console.log("Already exists !");
            }            
        },complete: function() {
            clearInputForm();
        }
    });
}

function deleteData() {
    var userName= $("#name-box").val();
    var json_data = {
        name: userName 
    };
    $.ajax({
        type: "GET",
        url: url_link+"?name="+userName,
        dataType: "json",
        success: function (data) {
            if(data.length != 0){
                console.log(data);
                $.ajax({
                    type: "DELETE",
                    url: url_link+data[0].id,
                    data: json_data,
                    dataType: "json",
                    success: function (response) {
                        console.log("Deleted !");
                    },complete: function() {
                        getData();
                    }     
                });
            }else{
                console.log("Doesn't exist");
            }            
        },complete: function() {
            clearInputForm();
        }
    });
}

function updateData() {
    var oldName = $("#name-box").val(); 
    var newName= $("#update-name-box").val();
    var json_data = {
        name: newName 
    };
    $.ajax({
        type: "GET",
        url: url_link+"?name="+oldName,
        dataType: "json",
        success: function (data) {
            if(data.length != 0){
                $.ajax({
                    type: "PUT",
                    url: url_link+data[0].id,
                    data: json_data,
                    dataType: "json",
                    success: function (response) {
                        console.log(response);
                    },complete: function() {
                        getData();
                    }      
                });
            }else{
                console.log("Doesn't exists !");
            }            
        },complete: function() {
            clearInputForm();
        } 
    });
}