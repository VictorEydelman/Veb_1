function on(){
    if (typeof xprov === 'undefined') {
        xprov = 0;
        yprov = 0;
        rprov = 0;
        t=true;
    }

    f=true
    if (document.getElementById('php').action==="delete.php"){
        document.getElementById('php').action ="table.php";
    }

    let x = document.getElementById("X").value;
    if (x===""){
        t=false
        f=false
        //document.getElementById("frame").style="background:#d04141";
        xprov+=1;
        if (xprov===1) {
            document.getElementById("xblock").innerHTML +=
                "<h4 class='prov' id='Xprov' for='X'>Введите X</h4>";
        }
    } else {
        //document.getElementById("frame").style=color();
        if (xprov>=1){
            document.getElementById("Xprov").remove();
            xprov=0;
        }
    }

    let y=document.getElementById("Y").value;
    if (y.includes(',')) {
        y= y.replace(',', '.');
        document.getElementById("Y").value=y;
    }

    if (y===""){
        if(yprov>0){
            yprov=fr(yprov);
        }
        yprov = 1;
        t=false;
        f=false;
        //document.getElementById("frame").style="background:#d04141";
        document.getElementById("yblock").innerHTML +=
            "<h4 class='prov' id='Yprov1' >Не введён Y</h4>";
    } else if(isNaN(y)){
        if (yprov>0) {
            yprov = fr(yprov);
        }
        yprov = 2;
        t=false;
        f=false;
        //document.getElementById("frame").style="background:#d04141";
        document.getElementById("yblock").innerHTML +=
            "<h4 class='prov' id='Yprov2'>Ошибка при вводе Y</h4>";
    } else if(y<-5 || y>3){
        if (yprov >0) {
            yprov = fr(yprov);
        }
        yprov = 3;
        t=false;
        f=false;
        //document.getElementById("frame").style="background:#d04141";
        document.getElementById("yblock").innerHTML +=
            "<h4 class='prov' id='Yprov3' >Y вышел за приделы от -5 до 3</h4>";
    } else {
        //document.getElementById("frame").style=color();
        yprov=fr(yprov)
    }

    function fr(prov) {
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

    let checkbox = document.getElementsByClassName('messageCheckbox');
    let checkboxChecked = [];
    for (let index=0; index<checkbox.length; index++){
        if(checkbox[index].checked){
            checkboxChecked.push(checkbox[index].value);
        }
    }

    if (checkboxChecked.length===0){
        rprov+=1;
        //document.getElementById("frame").style="background:#d04141";
        if (rprov===1) {
            document.getElementById("rblock").innerHTML +=
                "<h4 class='prov' id='Rprov' for='R'>Выберите R</h4>";
            document.getElementById('php').action = "table.php";
        }
        t=false;
        f=false;
    } else {
        //document.getElementById("frame").style=color();
        if (rprov>=1){
            document.getElementById("Rprov").remove();
            rprov=0;
        }
        document.getElementById('php').action = "table.php";
    }

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
    //return "background: rgba(196, 182, 23, 0.96)";
    return  "background: rgba(196, 119, 23, 0.96)";
}