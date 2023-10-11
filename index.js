document.addEventListener("DOMContentLoaded",function (){
    document.getElementById("php").reset()
    document.getElementById("imgt").style.height=document.getElementById("con").style.height
    if (typeof subtrue === 'undefined') {
        subtrue=false;
        document.getElementById("submit").disabled=true
        document.getElementById("imgt").style.height=document.getElementById("con").style.height
    }
})
window.setInterval(function () {
    document.getElementById("imgt").style.height=document.getElementById("con").style.height
    document.getElementById("Y").addEventListener('input', Ycheck)
    document.getElementById("X").addEventListener('input', Xcheck)
    document.getElementById("R").addEventListener('input', Rcheck)
    if(document.getElementById("Yprov1")!= null || document.getElementById("Yprov2")!= null
        || document.getElementById("Yprov3")!= null || document.getElementById("Xprov")!= null
        || document.getElementById("Rprov")!= null || typeof yprov === 'undefined'
        || typeof xprov === 'undefined' || typeof rprov === 'undefined' || document.getElementById("Y").value==="-"){
        document.getElementById("submit").disabled=true
    } else {
        document.getElementById("submit").disabled=false
    }
})
//})
sub=false
function on(){
    //document.getElementById("submit").disabled = false;
    if (typeof xprov === 'undefined') {
        xprov = 0;
        yprov = 0;
        rprov = 0;
        t=true;
    }

    f=true
    document.getElementById('php').action = "table.php";

    //alert(document.getElementById('php').action)


    Ycheck();
    Xcheck();
    Rcheck();
    if(!f){
        document.getElementById("frame").style="background:#d04141";
    } else {
        document.getElementById("frame").style=color();
    }
    document.getElementById('time').value=Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function del() {
    document.getElementById('php').action="delete.php";
}

function color(){
    return  "background: rgba(196, 119, 23, 0.96)";
}
function Ycheck() {
    if (typeof yprov === 'undefined') {
        yprov = 0
    }
    let y = document.getElementById("Y").value;
    if (y.includes('0x')) {
        y = y.replace('0x', '');
        document.getElementById("Y").value = y;
    }
    if (y.includes('0X')) {
        y = y.replace('0X', '');
        document.getElementById("Y").value = y;
    }

    if (y === "") {
        document.getElementById("submit").disabled = true;
        if (yprov > 0) {
            yprov = delete_element(yprov);}
        yprov = 1;
        f = false;
        document.getElementById("yblock").innerHTML +=
            "<h4 class='prov' id='Yprov1' >Не введён Y</h4>";

    }else if (isNaN(y) && y !== "-" && !y.includes(",")) {
        document.getElementById("submit").disabled = true;
        if (yprov > 0) {
            yprov = delete_element(yprov);
        }
        yprov = 2;
        f = false;
        document.getElementById("yblock").innerHTML +=
            "<h4 class='prov' id='Yprov2'>Ошибка при вводе Y</h4>";
    } else if(y.includes(",")) {
        if (!y.includes(".")) {
            y = y.replace(',', '.');
        } else{
            y = y.replace(',', '');
        }
        document.getElementById("Y").value = y;
    } else if (y < -5 || y > 3) {
        document.getElementById("submit").disabled = true;
        if (yprov > 0) {
            yprov = delete_element(yprov);
        }
        yprov = 3;
        f = false;
        document.getElementById("yblock").innerHTML +=
            "<h4 class='prov' id='Yprov3' >Y вышел за приделы от -5 до 3</h4>";
    } else if(y==="-"){
        document.getElementById("submit").disabled = true;
        if (yprov > 0) {
            yprov = delete_element(yprov);
        }
    } else {
        document.getElementById("submit").disabled = false;
        yprov=delete_element(yprov)
    }
}
function delete_element(prov) {
    if (prov === 1) {
        document.getElementById("Yprov1").remove();
    }
    if (prov === 2) {
        document.getElementById("Yprov2").remove();
    }
    if (prov === 3) {
        document.getElementById("Yprov3").remove();
    }
    return  0;
}

function Xcheck(){
    if (typeof xprov === 'undefined') {
        xprov = 0
        t=true;
    }
    let x = document.getElementById("X").value;
    if (x===""){
        document.getElementById("submit").disabled = true;
        f=false
        xprov+=1;
        if (xprov===1) {
            document.getElementById("xblock").innerHTML +=
                "<h4 class='prov' id='Xprov' for='X'>Введите X</h4>";
        }
    } else {
        document.getElementById("submit").disabled = false;
        if (xprov>=1){
            document.getElementById("Xprov").remove();
            xprov=0;
        }
    }
}

function Rcheck(){
    if (typeof rprov === 'undefined') {
        rprov = 0
        t=true;
    }
    let checkbox = document.getElementsByClassName('messageCheckbox');
    let checkboxChecked = [];
    for (let index=0; index<checkbox.length; index++){
        if(checkbox[index].checked){
            checkboxChecked.push(checkbox[index].value);
        }
    }

    if (checkboxChecked.length===0){
        rprov+=1;
        if (rprov===1) {
            document.getElementById("rblock").innerHTML +=
                "<h4 class='prov' id='Rprov' for='R'>Выберите R</h4>";
        }
        f=false;
    } else {
        if (rprov >= 1) {
            document.getElementById("Rprov").remove();
            rprov = 0;
        }
    }
}
