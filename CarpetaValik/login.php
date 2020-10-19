<?php
    session_start();

    require 'database.php';

    if (!empty($_POST['email']) && !empty($_POST['contraseña'])) {
        $records = $db->prepare('SELECT id, email, contraseña FROM users WHERE email=:email');
        $records->bindParam(':email', $_POST['email']);
        $results = $records->execute();
        
        $message = '';

        while($row = $results->fetchArray(SQLITE3_ASSOC) ) {
           $id = $row['id'];
           $email = $row['email'];
           $contraseña = $row['contraseña'];
           if ($id != "") {
               if ($contraseña == $_POST["contraseña"]) {
                   $_SESSION["login"] = $email;
                   header('Location: /CarpetaValik/camara_de_planeta.php');
                } else {
                    $message = "Contraseña incorrecta.";
                }
            } else {
               $message = "El usuario no existe, porfavor registrese para continuar.";
            }
        }
        //echo "Operation done successfully\n";
        $db->close();
    } elseif (empty($_POST['email']) && empty($_POST['contraseña'])) {
        $message = 'Ingrese sus credenciales.';
    }
?>
<!DOCTYPE html>
<head>
    <title>Login</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <link type="text/css" rel="stylesheet" href="css/estilo.css">
    <link type="text/css" rel="stylesheet" href="../node_modules/materialize-css/dist/css/materialize.min.css"  media="screen,projection"/>
    <script type="text/javascript" src="../node_modules/materialize-css/dist/js/materialize.min.js"></script>
</head>
<body>
    <canvas id="canvas-login"></canvas>
    <div class="login">
        <div class="row">
            <div class="logo"></div>
        </div>
            <div class="row center-align">
            <h5>Iniciar sesión</h5>
            <?php if(!empty($message)): ?>
            <p><?= $message ?></p>
            <?php endif; ?>
        </div>
        <form method="POST" action>
            <div class="row">
                <div class="input-field col s12">
                    <input id="email_input" type="email" name="email" class="validate">
                    <label for="email_input">Email</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input id="password_input" type="password" name="contraseña" class="validate">
                    <label for="password_input">Contraseña</label>
                    <a href="#"><b>¿Olvido su contraseña?</b></a>
                </div>
            </div>
            <div class="row">
                <?php if (!empty($message)): ?>
                <span class="helper-text col s12" data-error="<?= $message ?>" type="text"></span>
                <?php endif; ?>
            </div>
            <div class="row">
                <div class="col s6"><a href="registro.php">Crear Cuenta</a></div>
                <div class="col s6 right-align"><button class="waves-effect waves-light btn light-blue darken-3" type="submit">Ingresar</button></div>
            </div>
        </form>
    </div>
    <script type="module" src="js/login.js"></script>
</body>
</html>