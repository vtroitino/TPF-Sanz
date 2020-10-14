<?php
    $DB_PATH = "./sqlite/login.sqlite3";
    
    $db_exists = file_exists($DB_PATH);
    $message = '';

    $db = new SQLite3($DB_PATH);
    if (!$db_exists) {
        $query = file_get_contents("./sqlite/login.sql");
        $res = $db->exec($query);
        if (!$res) {
            die("error inicializando db");
        }
    }

    session_start();

    if (!empty($_POST['email']) && !empty($_POST['contraseña'])) {
        $sql = "INSERT INTO users(email, password) VALUES(:email, :contraseña)";
        $post = $db->prepare($sql);
        $post->bindValue(':email', $_POST['email']);
        $post->bindValue(':contraseña', $_POST['contraseña']);
        if ($post->execute()) {
            $message = 'Exito al crear el usuario';
        } else {
            $message = 'ERROR';
        }
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
        </div>
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
        <div class="row"></div>
        <div class="row">
            <div class="col s6"><a href="registro.php">Crear Cuenta</a></div>
            <div class="col s6 right-align"><a class="waves-effect waves-light btn">Ingresar</a></div>
        </div>
    </div>
    <script type="module" src="js/login.js"></script>
</body>
</html>