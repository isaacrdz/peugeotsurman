<?php
require '../coors.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);

try {
  $name=$_POST['name'];
  $phone=$_POST['phone'];
  $email=$_POST['email'];
  $vehicle=$_POST['vehicle'];
  $vin=$_POST['vin'];
  $placas=$_POST['placas'];
  $servicio=$_POST['servicio'];
  $comments=$_POST['comments'];
  $mail->addAddress('calidad.peugeotmonterrey@surman.com');
  $mail->addAddress('leonel.vargas@surman.com');
  $mail->setFrom($email, $name);
  $mail->isHTML(true);
  $mail->CharSet = 'UTF-8';                       
  $mail->Subject = $servicio." - Peugeot Garza Sada Monterrey";
  $mail->Body = '<b>Nombre:</b> '.$name.' <br>
  <b>Correo:</b>: '.$email.' <br>
  <b>Teléfono:</b>: '.$phone.' <br>
  <b>Vehículo:</b>: '.$vehicle.'<br>
  <b>VIN:</b> '.$vin.'<br>
  <b>Placas:</b> '.$placas.'<br>
  <b>Servicio:</b> '.$servicio.'<br>
  <b>Comentario:</b> '.preg_replace("/([\r\n]+)|(\\n)|(\\\\n)|(\\\\r)|(\\r)|(\r+)|(\n+)|(\v+)/im","<br>",$comments);

  if($mail->send()){
      echo json_encode(["sent"=>true]);
  }else{
      echo json_encode(["error"=>ERROR]);
  }
} catch (Exception $e) {
  echo json_encode(["error"=>$mail->ErrorInfo]);
}
?>