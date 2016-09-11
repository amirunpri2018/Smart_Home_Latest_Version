<!DOCTYPE html>
<!--
 description

 @category Smart Home Project Files
 @author Brody Bruns <brody.bruns@hotmail.com>
 @copyright (c) 2016, Brody Bruns
 @version 1.0

-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <?php
            require_once('shell.php');
            echo json_encode((new Z_Way_vDev_API())->getPlatformStatus());
            echo "<hr>";
            echo json_encode((new Z_Way_vDev_API())->authenticate());
            echo "<hr>";
            //echo json_encode((new Z_Way_zDev_API())->retrieveSystemData()); //timing out
        ?>
    </body>
</html>