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
	</head>
	<body id="luna">
		
		<div class="center-align" id="carga">
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
		
		<canvas id="canvas-luna"></canvas>
		
		<div class="hide" id="contenido-pagina">
			<h4 class="white-text">Exito al cargar el sidebar.</h4>

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
								<a href="#">
									<i class="fas fa-flag"></i>
									<span class="link_text">Terrenos</span>
								</a>
							</li>
							<li>
								<a data-target="menu-side" class="sidenav-trigger" href="#">
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

				<ul class="sidenav grey darken-4" id="menu-side">
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
			</div>
		</div>

		<script type="module" src="js/luna.js"></script>
		<script type="text/javascript" src="../node_modules/materialize-css/dist/js/materialize.min.js"></script>
		<script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
	</body>
</html>