<?php
 
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
 
//required files
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

$first_name = $_POST["firts_name"];
$last_name = $_POST["last_name"];

$full_name = $first_name . " " . $last_name;
$email = $_POST["email"];
$message = $_POST["message"];
$selected_option = $_POST["selecciones"];

 
//Create an instance; passing `true` enables exceptions
if (isset($_POST["send"])) {
 
  $mail = new PHPMailer(true);
 
    //Server settings
    $mail->isSMTP();                              //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';       //Set the SMTP server to send through
    $mail->SMTPAuth   = true;             //Enable SMTP authentication
    $mail->Username   = 'fabiant0763@gmail.com';   //SMTP write your email
    $mail->Password   = 'fbuaxtewjrxludhb';      //SMTP password
    $mail->SMTPSecure = 'ssl';            //Enable implicit SSL encryption
    $mail->Port       = 465;                                    
 
    //Recipients
    $mail->setFrom( $_POST["email"], $_POST["firts_name"]); // Sender Email and name
    $mail->addAddress('fabiant0763@gmail.com');    //Add a recipient email  
    $mail->addReplyTo($_POST["email"], $_POST["firts_name"]); // reply to sender email
 
    //Content
    $mail->isHTML(true);
    $mail->Subject = "Nuevo cliente: " . $full_name;
    $mail->Body = "
        <p>Nombre completo: " . $full_name."</p>
        <p>Email: " . $email . "</p>
        <h4> Requerimiento: ".$selected_option."</h4>
        <p>Message: " . $message . "</p>
    ";
      
    // Success sent message alert
    $mail->send();
    echo
    " 
    <script> 
     alert('Message was sent successfully!');
     document.location.href = '../view/contact.html';
    </script>
    ";
}