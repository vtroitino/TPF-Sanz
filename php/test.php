<!DOCTYPE html>
<head>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Sidebar</title>

  <!--Import Google Icon Font-->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

  <!-- Compiled and minified CSS -->
  <link type="text/css" rel="stylesheet" href="../node_modules/materialize-css/dist/css/materialize.min.css"  media="screen,projection"/>

</head>

<body>

  <div class="container section">

    <div class="wrapper">
        <div class="sidebar">
          <ul>
            <li>
              <a href="#">
                <i class="fas fa-home"></i>
                <span class="link_text">Home</span>
              </a>
            </li>
            <li>
              <a data-target="menu-side" class="sidenav-trigger" href="#">
                <i class="fas fa-user"></i>
                <span class="link_text">Profile</span>
              </a>
            </li>
          </ul> 
        </div>
     </div>

    <ul class="sidenav" id="menu-side">
      <li>
        <div class="user-view">
          <div class="background">
            <img src="" alt="">
          </div>
          <a href="#">
            <img src="" alt="" class="circle">
          </a>
          <a href="">
            <span class="name white-text">Ignacio Gutiérrez</span>
          </a>
          <a href="">
            <span class="email white-text">Ignacio@tucorreo.cl</span>
          </a>
        </div>
      </li>
      <li>
        <a href="">
          <i class="material-icons">cloud</i>
          Primer Elemento
        </a>
      </li>
      <li>
        <a href="">
          <i class="material-icons">cloud</i>
          Segundo Elemento
        </a>
      </li>
      <li>
        <div class="divider"></div>
      </li>
      <li>
        <a href="">
          <i class="material-icons">cloud</i>
          Tercer Elemento
        </a>
      </li>
    </ul>

  </div>




  <!-- Compiled and minified JavaScript -->
  <script type="text/javascript" src="../node_modules/materialize-css/dist/js/materialize.min.js"></script>
  </script>

  <script>

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems);
    });

  </script>


</body>

</html>