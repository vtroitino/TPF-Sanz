<?php
	session_start();

	require 'database.php';

	if(!isset($_SESSION['usuario']) && !isset($_SESSION['email'])) {
		header('Location: login.php');
	}
?>
<!DOCTYPE html>
<html>
	<head>
		<title>La Luna</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<link type="text/css" rel="stylesheet" href="../css/estilo.css">
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
							<a data-target="bterrenos-side" class="sidenav-trigger" href="#">
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
								<i class="fas fa-info-circle"></i>
								<span class="link_text">Informacion</span>
							</a>
						</li>

						<li id="logout-button">
							<a href="login.php">
								<i class="fas fa-sign-out-alt"></i>
								<span class="link_text">Cerrar Sesión</span>
							</a>
						</li>

					</ul> 
				</div>
			</div>

			<ul class="sidenav grey darken-4" id="user-side">
				<li>
					<div class="user-view">
						<div class="background">
							<img src="../imagenes/backg.jpg" width="300" height="212">
						</div>
						<div class="logo"></div>
						<span class="name white-text center-align"><?php echo $_SESSION["usuario"]; ?></span>
						<span class="email white-text center-align"><?php echo $_SESSION["email"]; ?></span>
					</div>
				</li>
				<div class="user-options">
					<li>
						<a id="saldo" class="subheader white-text">Tu saldo: $<?php echo $_SESSION["saldo"]; ?>
							<i id="saldo-icon" class="fas fa-wallet"></i>
						</a>
					</li>
					<!-- <script></script> -->
					<!-- <li><div class="divider grey darken-3"></div></li>
					<li class="user-items user-custom">
						<a class="white-text left-align" href="#"> Cambiar nombre de usuario </a>
					</li>
					<li class="user-items user-custom">
						<a class="white-text left-align" href="#"> Información de cuenta </a>
					</li>
				</div> -->
			</ul>

			<ul class="sidenav grey darken-4" id="cterrenos-side">
				<li><div id="user-view_terreno" class="user-view">
					<div id = "backg-terreno" class="background">
						<img id="foto-terreno" src="" width="533" height="300">
					</div>
					<span id="nombre-terreno" class="name white-text center-align"></span>
				</div></li>
				<li>
					<h3 id="precio-terreno" class="white-text"></h3>
				</li>
				<li class="desc-container">
					<p id="desc-terreno" class="name white-text left-align"></p>	
				</li>
				<li>
					<a id="comprar-terreno" href="#" class="waves-effect waves-light btn light-blue darken-3">Comprar</a>
				</li>
			</ul>

			<ul class="sidenav grey darken-4" id="bterrenos-side">
				<div class="row">
					<div class="container center-align">
						<i id="bterr-icon" class="fas fa-flag"></i>
					</div>

					<div class="col s12 ">
						<div class="card small grey darken-3 z-depth-5">
							<div class="card-image">
								<img src="../imagenes/Terrenos/Copernicus.jpg">
								<span class="card-title">Copernicus</span>
							</div>
							<div class="card-content">
								<p class="white-text">Lugar donde se planto al bandera en el primer alunizaje.</p>
							</div>
							<div class="card-action">
								<a id="Copernicus" data-target="cterrenos-side" class="ver sidenav-trigger light-blue-text darken-3" href="#">VER</a>
        					</div>
						</div>
					</div>

					<div class="col s12 ">
						<div class="card small grey darken-3 z-depth-5">
							<div class="card-image">
								<img src="../imagenes/Terrenos/Kepler.jpg">
								<span class="card-title">Kepler</span>
							</div>
							<div class="card-content">
								<p class="white-text">Lugar donde se planto al bandera en el primer alunizaje.</p>
							</div>
							<div class="card-action">
								<a id="Kepler" data-target="cterrenos-side" class="ver sidenav-trigger light-blue-text darken-3" href="#">VER</a>
        					</div>
						</div>
					</div>

					<div class="col s12 ">
						<div class="card small grey darken-3 z-depth-5">
							<div class="card-image">
								<img src="../imagenes/Terrenos/Langrenus.jpg">
								<span class="card-title">Langrenus</span>
							</div>
							<div class="card-content">
								<p class="white-text">Lugar donde se planto al bandera en el primer alunizaje.</p>
							</div>
							<div class="card-action">
								<a id="Langrenus" data-target="cterrenos-side" class="ver sidenav-trigger light-blue-text darken-3" href="#">VER</a>
        					</div>
						</div>
					</div>

					<div class="col s12 ">
						<div class="card small grey darken-3 z-depth-5">
							<div class="card-image">
								<img src="../imagenes/Terrenos/Stevinus.jpg">
								<span class="card-title">Stevinus</span>
							</div>
							<div class="card-content">
								<p class="white-text">Lugar donde se planto al bandera en el primer alunizaje.</p>
							</div>
							<div class="card-action">
								<a id="Stevinus" data-target="cterrenos-side" class="ver sidenav-trigger light-blue-text darken-3" href="#">VER</a>
        					</div>
						</div>
					</div>

					<div class="col s12 ">
						<div class="card small grey darken-3 z-depth-5">
							<div class="card-image">
								<img src="../imagenes/Terrenos/Oceanus Procellarum.jpg">
								<span class="card-title z-depth-5">Oceanus Procellarum</span>
							</div>
							<div class="card-content">
								<p class="white-text">Lugar donde se planto al bandera en el primer alunizaje.</p>
							</div>
							<div class="card-action">
								<a id="Oceanus Procellarum" data-target="cterrenos-side" class="ver sidenav-trigger light-blue-text darken-3" href="#">VER</a>
        					</div>
						</div>
					</div>

					<div class="col s12 ">
						<div class="card small grey darken-3 z-depth-5">
							<div class="card-image">
								<img src="../imagenes/Terrenos/Eduardo Castex.jpg">
								<span class="card-title">Eduardo Castex</span>
							</div>
							<div class="card-content">
								<p class="white-text">Lugar donde se planto al bandera en el primer alunizaje.</p>
							</div>
							<div class="card-action">
								<a id="Eduardo Castex" data-target="cterrenos-side" class="ver sidenav-trigger light-blue-text darken-3" href="#">VER</a>
        					</div>
						</div>
					</div>
				</div>
			</ul>
		</div>

		<script type="module" src="../js/escena_luna.js"></script>
		<script type="text/javascript" src="../node_modules/materialize-css/dist/js/materialize.min.js"></script>
		<script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
	</body>
</html>