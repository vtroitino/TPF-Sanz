<?php
    $DB_PATH = "./sqlite/login.sqlite3";
    
    $db_exists = file_exists($DB_PATH);

    $db = new SQLite3($DB_PATH);
    if (!$db_exists) {
        $query = file_get_contents("./sqlite/login.sql");
        $res = $db->exec($query);
        if (!$res) {
            die("error inicializando db");
        }
    }
?>