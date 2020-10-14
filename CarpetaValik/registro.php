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
    <title>Registro</title>
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
            <h5>Registro</h5>
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
                </div>
            </div>
            <!-- <div class="row">
                <div class="input-field col s12">
                    <input id="password_input2" type="password" class="validate">
                    <label for="password_input2">Repetir Contraseña</label>
                </div>
            </div> -->
            <div class="row"></div>
            <div class="row">
                <div class="col s6">¿Ya tienes una cuenta? Inicia sesión <a href="login.php"><b>aqui.</b></div>
                <div class="col s6 right-align"><button class="waves-effect waves-light btn" type="submit">Registrarse</button></div>
            </div>
        </form>
    </div>
    <script type="module" src="js/login.js"></script>
</body>
</html>
