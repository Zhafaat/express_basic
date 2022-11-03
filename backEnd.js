var data;
var nameData = '';
var countData = '';
var kindData = '';
var length;
var deleteStatus = ''
$(document).ready(function(){
    
    $("#containerDisplay").hide();
    $("#containerDisplayData").hide();
    $("#containerDelete").hide();

    getData()
    $("#inputButton").click(function(){
        $("#containerInput").show();
        $("#containerDelete").hide();
        $("#containerDisplay").hide();
        $("#containerDisplayData").hide();
    });
    $("#deleteButton").click(function(){
        $("#containerInput").hide();
        $("#containerDelete").show();
        $("#containerDisplay").hide();
        $("#containerDisplayData").hide();
    });
    $("#displayButton").click(() => {
        $("#containerInput").hide();
        $("#containerDelete").hide();
        $("#containerDisplay").show();
        $("#containerDisplayData").hide();
        getData();
    })
    $("#displayDataButton").click(() => {
        $("#containerInput").hide();
        $("#containerDelete").hide();
        $("#containerDisplay").hide();
        $("#containerDisplayData").show();
    })
    $("#hint").click(function(){
        // console.log(name)
        // console.log(A)
        var name = $("#name").val()
        var count = $("#count").val()
        var kind = $("#kind").val()
        postData({
            name,count,kind
        })
        
    })
    
    $("#refresh").click(function(){

        $("#display").empty()
        // location.reload(true);
        // console.log(A.length)
        // if (A.length = )
        $("#display").append(`<table id="table">
        <tr>
          <th>Name</th>
          <th>Count</th>
          <th>Kind</th>
        </tr>
    </table>`)
        data.forEach(el => {
            $("#table").append(`<tr>
            <td>${el.Name}</td>
            <td>${el.Count}</td>
            <td>${el.Kind}</td>
          </tr>`)
        })
    })
    
    $("#search").click( async function(){
        $("#OneData").empty()
        var nama = $("#nama").val()
        await getOne(nama)        
        $("#OneData").append(`Nama: ${nameData}, Count: ${countData}, Kind: ${kindData}`)
    })

    $("#delete").click( async function(){
        $("#deleteData").empty()
        var nama = $("#deleteName").val()
        await deleteOne(nama)        
        $("#deleteData").append(`${deleteStatus}`)
    })
    
})
// console.log("hallo");

function getData(){
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/values',
        crossDomain: true,
        dataType: "json",
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        }
    }).done(res => {
        data = res.Data
        length = res.length
        // console.log(data)
        // data.forEach(el => {
        //     $("#display").append(`<tr>
        //     <td>${el.Name}</td>
        //     <td>${el.Count}</td>
        //     <td>${el.Kind}</td>
        //   </tr>`)
        // })
    }).fail(err => {
        console.log(err)
    })
}

const deleteOne = (Delete) => {
    return $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/value/${Delete}`,
        crossDomain: true,
        dataType: "json",
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        }
    }).done(res => {
        console.log(res)
        deleteStatus = res.message
    }).fail(err => {
        console.log(err)
    })
}

const getOne = (Insert) => {
    return $.ajax({
        method: 'GET',
        url: `http://localhost:3000/value/${Insert}`,
        crossDomain: true,
        dataType: "json",
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        }
    }).done(res => {
        // console.log(res, "<<<")
        nameData = res.Name
        countData = res.Count
        kindData = res.Kind
        // console.log(nameData)
    }).fail(err => {
        console.log(err)
    })
}

const postData = (payload)  =>{
    const {name, count, kind} = payload
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/value',
        crossDomain: true,
        data: {
            name: `${name}`,
            count: `${count}`,
            kind : `${kind}`
        },
        dataType: "json",
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        }
    }).done(res => {
        // A = res
        console.log(res)
        // const obj = {
        //     Count : count,Name: name ,Kind: kind
        // }
        // data.push(obj)
    }).fail(err => {
        console.log(err)
    })
}


