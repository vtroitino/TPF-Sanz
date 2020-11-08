<?php
	session_start();
?>
<!DOCTYPE html>
<html>
	<head>
		<title>La Luna</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<link type="text/css" rel="stylesheet" href="css/estilo.css">
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<link type="text/css" rel="stylesheet" href="../node_modules/materialize-css/dist/css/materialize.min.css"  media="screen,projection"/>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<script type="text/javascript" src="../node_modules/three/examples/js/libs/dat.gui.min.js"></script>
	</head>
	<body id="luna">
		
		<canvas id="canvas-luna"></canvas>

		<div class="contenido">
			<div class="wrapper">
				<div class="sidebar">
					<ul>
						<li>
							<a href="#">
								<i class="fas fa-search-dollar"></i>
								<span class="link_text">Buscador</span>
							</a>
						</li>
						<li>
							<a data-target="terrenos-side" class="sidenav-trigger" href="#">
								<i class="fas fa-flag"></i>
								<span class="link_text">Terrenos</span>
							</a>
						</li>
						<li>
							<a data-target="user-side" class="sidenav-trigger" href="#">
								<i class="fas fa-user"></i>
								<span class="link_text">Usuario</span>
							</a>
						</li>
						<li>
							<a href="#">
								<i class="fas fa-random"></i>
								<span class="link_text">Random</span>
							</a>
						</li>
					</ul> 
				</div>
			</div>

			<ul class="sidenav grey darken-4" id="user-side">
					<li>
						<div class="user-view">
							<div class="background">
								<img src="imagenes/backg.jpg" width="300" height="212">
							</div>
							<div class="logo"></div>
							<span class="name white-text center-align"><?php echo $_SESSION["usuario"]; ?></span>
							<span class="email white-text center-align"><?php echo $_SESSION["email"]; ?></span>
						</div>
					</li>
				<div class="user-options">
					<li class="user-items user-custom">
						<a class="white-text left-align" href="#"> Cambiar nombre de usuario </a>
					</li>
					<li class="user-items user-custom">
						<a class="white-text left-align" href="#"> Información de cuenta </a>
					</li>
					<li class="user-items">
						<a class="user-link red white-text center-align" href="login.php"> Cerrar Sesión </a>
					</li>
				</div>
			</ul>

			<ul class="sidenav grey darken-4" id="terrenos-side">
				<li><div id="user-view_terreno" class="user-view">
					<div id = "backg-terreno" class="background">
						<img id="foto-terreno" src="imagenes/backg.jpg" width="533" height="300">
					</div>
					<span id="nombre-terreno" class="name white-text center-align"></span>
				</div></li>
				<li>
					<h3 id="precio-terreno" class="white-text"></h3>					
				</li>
				<li class="desc-container">
					<span id="desc-terreno" class="name white-text center-align"></span>					
				</li>
				<li>
					<a href="#" class="waves-effect waves-light btn light-blue darken-3">Comprar</a>					
				</li>
			</ul>
		</div>

		<script type="module" src="../CarpetaJusto/scripts/escena_luna.js"></script>
		<script type="text/javascript" src="../node_modules/materialize-css/dist/js/materialize.min.js"></script>
		<script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
	</body>
</html>