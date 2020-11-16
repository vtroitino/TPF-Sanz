<!DOCTYPE HTML PUBLIC>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=0.1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/main.css">
    <link type="text/css" rel="stylesheet" href="../node_modules/materialize-css/dist/css/materialize.min.css"  media="screen,projection"/>
    <title>Document</title>
<!--     <link rel="stylesheet" href="css/main.css"> -->
</head>
<body id='body'>
    <canvas id='canvaspace'></canvas>
    
    <div class="center section" id="carga">
        <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="hide" id="contenido-pagina">
        <div id='contbotones' class="buttondiv">
            <button  class="waves-effect waves-light btn" style="margin-right:0.4em;color: rgb(255,255,235,1);">fotito</button>
            <button  class="waves-effect waves-light btn" style="margin-right:0.4em;color: rgb(255,255,235,1);">fotito</button>
        </div>
    </div>

    <script type="text/javascript" src="../node_modules/materialize-css/dist/js/materialize.min.js"></script>
    <script id='espacio' type="module" src='./scripts/escena_luna.js'></script>
    <script id='mapeo' src='./scripts/mapeador.js'></script>
</body>
</html>