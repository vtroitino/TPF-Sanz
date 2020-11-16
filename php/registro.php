<?php
    session_start();

    unset($_SESSION['usuario']);
    unset($_SESSION['email']);

    require 'database.php';

    if (!empty($_POST['email']) && !empty($_POST['contraseña'])) {
        $usuario = trim($_POST['usuario']);
        $email = trim($_POST['email']);
        $contraseña = trim($_POST['contraseña']);
        $rcontraseña = trim($_POST['rcontraseña']);
        $results = $db->query("SELECT email FROM users WHERE email = '$email'");


        $rowEmail = [];
        while($row = $results->fetchArray(SQLITE3_ASSOC) ) {
            $rowEmail[] = $row;
        }
        if ($usuario == '' || $email == '' || $contraseña == '' || $rcontraseña == '') {
            $errormsg = 'Complete los campos vacios';
        } elseif (count($rowEmail) > 0) {
            $errormsg = 'Este mail ya esta en uso.';
        } elseif ($contraseña != $rcontraseña) {
            $errormsg = 'La contraseña no coincide.';
        } else {
            $sql = 'INSERT INTO users(id, usuario, email, contraseña, saldo) VALUES("'.uniqid().'", :usuario, :email, :contraseña, :saldo)';
            $post = $db->prepare($sql);
            $post->bindValue(':usuario', $usuario);
            $post->bindValue(':email', $email);
            $post->bindValue(':contraseña', $contraseña);
            $post->bindValue(':saldo', 1000000);
            $post->execute();
            $message = 'Exito al crear el usuario';
        }
    }
?>
<!DOCTYPE html>
<head>
    <title>Frederic Moon - Registro</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <link type="text/css" rel="stylesheet" href="../css/estilo.css">
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
            <h5>Registro</h5>
        </div>
        <form method="POST" action>
        <div class="row">
                <div class="input-field col s12">
                    <input id="user_input" type="text" name="usuario" class="validate" required>
                    <label for="user_input">Nombre de Usuario</label>
                </div>
            </div>
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
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input id="repeat-password_input" type="password" name="rcontraseña" class="validate" required>
                    <label for="repeat-password_input">Repetir Contraseña</label>
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
            <?php if (!empty($message)): ?>
            <div class="row" id="alert_box">
                <div class="col s12 m12">
                    <div class="card green darken-1">
                    <div class="row">
                        <div class="col s12 m10">
                        <div class="card-content white-text">
                            <p><?= $message ?></p>
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
            <div class="row"></div>
            <div class="row">
                <div class="col s6">¿Ya tienes una cuenta? Inicia sesión <a href="login.php"><b>aqui.</b></div>
                <div class="col s6 right-align"><button class="waves-effect waves-light btn light-blue darken-3" type="submit">Registrarse</button></div>
            </div>
        </form>
    </div>
    <script type="module" src="../js/login.js"></script>
</body>
</html>
