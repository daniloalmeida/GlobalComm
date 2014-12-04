<?php
if($_POST)
{
    $to_email       = "contato@globalcommls.com"; //Recipient email, Replace with own email here
    
    //check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        
        $output = json_encode(array( //create JSON data
            'type'=>'error', 
            'text' => 'Sorry Request must be Ajax POST'
        ));
        die($output); //exit script outputting json data
    } 
    
    //Sanitize input data using PHP filter_var().
    $user_name      = filter_var($_POST["user_name"], FILTER_SANITIZE_STRING);
    $user_email     = filter_var($_POST["user_email"], FILTER_SANITIZE_EMAIL);
    $phone_number   = filter_var($_POST["phone"], FILTER_SANITIZE_NUMBER_INT);
    $message        = filter_var($_POST["msg"], FILTER_SANITIZE_STRING);
    
    //additional php validation
    if(strlen($user_name)<4){ // If length is less than 4 it will output JSON error.
        $output = json_encode(array('type'=>'error', 'text' => 'Nome é muito curto ou está vazio!'));
        die($output);
    }
    if(!filter_var($user_email, FILTER_VALIDATE_EMAIL)){ //email validation
        $output = json_encode(array('type'=>'error', 'text' => 'Por favor, digite um e-mail válido!'));
        die($output);
    }
    if(!filter_var($phone_number, FILTER_SANITIZE_NUMBER_FLOAT)){ //check for valid numbers in phone number field
        $output = json_encode(array('type'=>'error', 'text' => 'Por favor, use somente números para o número de telefone'));
        die($output);
    }
    if(strlen($message)<3){ //check emtpy message
        $output = json_encode(array('type'=>'error', 'text' => 'Mensagem muito curta! Por favor, digite alguma mensagem.'));
        die($output);
    }
    
    //email body
    //$message_body = "GLOBALCOMM - Email request from site<br>".$message."\r\n\r\n-".$user_name."\r\nEmail : ".$user_email."\r\nPhone Number :". $phone_number ;
    $message_body = '<table align="center" cellpadding="0" cellspacing="0" style="width: 90%; height: auto; border: 1px solid #EEE; border-bottom:3px solid #CCC; margin:0 auto; font-family: Arial, Helvetica, sans-serif; font-size: 1em;">';
    $message_body .= '<tbody>';
    $message_body .= '<tr><td style="border-bottom:1px dotted #ccc; padding: 1em 0; text-align: center; font-size: 1.5em; color: #485275;"><strong>GLOBALCOMM - Email request from website</strong></td></tr>';
    $message_body .= '<tr><td style="border-bottom:1px dotted #ccc; padding: 1em 0;">';
    $message_body .= '<span style="display: block; float:left; background-color: #DDD; color: #333; margin: 0 1em; border-radius: 7px; border-bottom:2px solid #BBB; padding: 0.5em;">De: '.$user_name.'</span>';
    $message_body .= '<span style="display: block; float:left; background-color: #DDD; color: #333; margin: 0 1em; border-radius: 7px; border-bottom:2px solid #BBB; padding: 0.5em;">Email: '.$user_email.'</span>';
    $message_body .= '<span style="display: block; float:left; background-color: #DDD; color: #333; margin: 0 1em; border-radius: 7px; border-bottom:2px solid #BBB; padding: 0.5em;">Contato: '.$phone_number.'</span>';
    $message_body .= '<div style="width: 100%; height: 1em; clear: both; border-bottom:1px dotted #ccc; display: block; margin:2em auto;"></div>';
    $message_body .= '<p style="margin: 1em;">'.$message.'</p>';
    $message_body .= '</td></tr>';
    $message_body .= '<tr><td style="padding: 1em 0; text-align: center; font-size: 0.8em; color: #485275; background-color: #EEE;">GlobalComm - Language Solutions - Email delivery system</td></tr></tbody></table>';

    //proceed with PHP email.
    $headers = "From: $user_email\r\n";
    $headers .= "Content-type: text/html\r\n";

    //$headers = 'From: '.$user_name.''."\r\n".'Reply-To: '.$user_email.'' . "\r\n";
    
    $send_mail = mail($to_email, "[GLOBALCOMM: SITE] - Site Message Request", $message_body, $headers);
    
    if(!$send_mail)
    {
        //If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
        $output = json_encode(array('type'=>'error', 'text' => 'Desculpe! Não foi possível enviar a sua mensagem. Tente novamente mais tarde.'));
        die($output);
    }else{
        $output = json_encode(array('type'=>'message', 'text' => 'Ola '.$user_name .'! Obrigado pela sua mensagem. Vamos retornar assim que possível!'));
        die($output);
    }
}
?>