<?php session_start() ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        table {
            width:100%;
            border-collapse: collapse;
            border: 2px solid rgba(125, 8, 203, 0.96);
            color:white;background:rgba(8,24,203,0.96);
            border-radius: 10px;
            box-shadow: 0px 5px 5px 5px #810a3b, 2px 1px 6px 4px rgba(150, 128, 137, 0.5);
        }
        td{
            padding: 3px;
            border: 1.5px solid black ;
            text-align: center;
        }
        .xyrn {
            width: 20%;
        }
        .xyr{
            width: 10%;
        }
        ::selection{
            color: white;
            background-color: black;
        }
    </style>
</head>
<body>
<?php
$start=microtime(true);
$R=[];
$y=$_POST['y'];
$x=$_POST['X'];
$time=$_POST['time'];


if (!isset($_SESSION['X'])){
    $_SESSION['X']=array();
}
if (!isset($_SESSION['Y'])){
    $_SESSION['Y']=array();
}
if (!isset($_SESSION['R'])) {
    $_SESSION['R'] = array();
}
if (!isset($_SESSION['COUNT_R'])) {
    $_SESSION['COUNT_R'] = array();
}

$newline=false;
if(!empty($_POST['r1'])) {
    if(prov($_POST['r1'], $y, $x)) $newline=true;}
if(!empty($_POST['r2'])) {
    if(prov($_POST['r2'], $y, $x)) $newline=true;}
if(!empty($_POST['r3'])) {
    if(prov($_POST['r3'], $y, $x)) $newline=true;}
if(!empty($_POST['r4'])) {
    if(prov($_POST['r4'], $y, $x)) $newline=true;}
if(!empty($_POST['r5'])) {
    if(prov($_POST['r5'], $y, $x)) $newline=true;}

array_push($_SESSION['COUNT_R'],count($R));

$dt=new DateTime("now", new DateTimeZone($time));

if (!isset($_SESSION['execution time'])){
    $_SESSION['execution time']=array();
}
if (!isset($_SESSION['time'])){
    $_SESSION['time']=array();
}
if (!isset($_SESSION['count'])){
    $_SESSION['count']=0;
}
$_SESSION['count']+=1;

if (!$newline){?>
    <h3 id="mistake" style="margin-left:25%; text-align:center; background-color: green; width: 50%">Ошибка в вводимых данных</h3>
<?php
} else{?>
    <script>
         document.getElementById("mistake").remove();
    </script>
<?php }?>

<table>
    <?php $number=0;
    for($i=-1;$i<$_SESSION['count'];$i++){
        if($i==-1){ ?>
            <tr style="background: #030385">
                <td>X</td>
                <td>Y</td>
                <td>R</td>
                <td>Результат</td>
                <td>Время работы<br>скрипта</td>
                <td>Время запуска</td>
            </tr>
        <?php }
        else {
            for($j=0;$j<$_SESSION['COUNT_R'][$i];$j++){?>
                    <tr>
                        <td class="xyr"><?php echo $_SESSION['X'][$number]?></td>
                        <td class="xyr"><?php echo $_SESSION['Y'][$number]?></td>
                        <td class="xyr"><?php echo $_SESSION['R'][$number]?></td>
                        <td class="xyrn"><?php echo ch($_SESSION['R'][$number],
                                $_SESSION['Y'][$number],$_SESSION['X'][$number]);
                            $finish=microtime(true);?></td>
                        <td class="xyrn"><?php if($i+1==$_SESSION['count']){
                            $elevent=round(($finish-$start)*1000000,3);
                            array_push($_SESSION['execution time'],$elevent);
                            echo $elevent." ms";
                        } else {
                            echo $_SESSION['execution time'][$number]." ms";
                        }?></td>
                        <td class="xyrn"><?php if($i+1==$_SESSION['count']){
                                $elevent=$dt->format('H:i:s');
                                array_push($_SESSION['time'],$elevent);
                                echo $elevent;
                            } else {
                                echo $_SESSION['time'][$number];
                            }
                            $number+=1; ?></td>
                    </tr>
            <?php }
        }
    } ?>
</table>
<?php

function prov($r,$x,$y){
    if ($x=='' || $y==''){
        return false;
    } else if (!is_numeric($y)){
        return false;
    } else if ($y>3 || $y<-5){
        return false;
    } else{
        return rez($r,$x,$y);
    }
}
function rez($r,$y,$x){
    global $R;
    array_push($_SESSION['X'],$x);
    array_push($_SESSION['Y'],$y);
    array_push($_SESSION['R'],$r);
    array_push($R,$r);
    return true;
}
function ch($r,$y,$x){
    if(($x>=0 && $y>=0 && $x<=$r && $y<=$r) ||
        ($x<=0 && $y<=0 && sqrt($x*$x+$y*$y)<=$r/2) ||
        ($x<=0 && $y>=0 && $y<=($x+$r)/2)){
        return "Входит";
    } else{
        return "Не входит";
    }
}?>
</body>
</html>