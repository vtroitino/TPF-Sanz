<?php
    session_start();

    unset($_SESSION['usuario']);
    unset($_SESSION['email']);

    require 'database.php';

    $errormsg = '';

    if (!empty($_POST['email']) && !empty($_POST['contraseña'])) {
        $records = $db->prepare('SELECT id, usuario, email, contraseña FROM users WHERE email=:email');
        $records->bindParam(':email', $_POST['email']);
        $results = $records->execute();
            
        while($row = $results->fetchArray(SQLITE3_ASSOC) ) {
            $id = $row['id'];
            $usuario = $row['usuario'];
            $email = $row['email'];
            $contraseña = $row['contraseña'];
            if ($id != "") {
                if ($contraseña == $_POST["contraseña"]) {
                    $_SESSION["usuario"] = $usuario;
                    $_SESSION["email"] = $email;
                    header('Location: /CarpetaValik/camara_de_planeta.php');
                } else {
                    $errormsg = "Contraseña incorrecta.";
                }
            } else {
                $errormsg = "El usuario no existe, porfavor registrese para continuar.";
            }
        }
        //echo "Operation done successfully\n";
        $db->close();
    }
?>
<!DOCTYPE html>
<head>
    <title>Login</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <link type="text/css" rel="stylesheet" href="css/estilo.css">
    <link type="text/css" rel="stylesheet" href="../node_modules/materialize-css/dist/css/materialize.min.css"  media="screen,projection"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script type="text/javascript" src="../node_modules/materialize-css/dist/js/materialize.min.js"></script>
</head>
<body id="login">
    <canvas id="canvas-login"></canvas>
    <div class="login">
        <div class="row">
            <div class="logo"></div>
        </div>
            <div class="row center-align">
            <h5>Iniciar sesión</h5>
        </div>
        <form method="POST" action>
            <div class="row">
                <div class="input-field col s12">
                    <input id="email_input" type="email" name="email" class="validate" required>
                    <label for="email_input">Email</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input id="password_input" type="password" name="contraseña" class="validate" required>
                    <label for="password_input">Contraseña</label>
                    <i class="fa fa-eye icon_style" id="toggle"></i>
                    <a href="#"><b>¿Olvido su contraseña?</b></a>
                </div>
            </div>
            <?php if (!empty($errormsg)): ?>
                <div class="row" id="alert_box">
                    <div class="col s12 m12">
                        <div class="card red darken-1">
                        <div class="row">
                            <div class="col s12 m10">
                            <div class="card-content white-text">
                                <p><?= $errormsg ?></p>
                            </div>
                        </div>
                        <div class="col s12 m2">
                            <i class="fa fa-times icon_style" id="alert_close" aria-hidden="true"></i>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            <?php endif; ?>
            <div class="row valign-wrapper">
                <div class="col s6"><a href="registro.php">Crear Cuenta</a></div>
                <div class="col s6 right-align"><button class="waves-effect waves-light btn light-blue darken-3" type="submit">Ingresar</button></div>
            </div>
        </form>
    </div>
    <script type="module" src="js/login.js"></script>
</body>
</html>