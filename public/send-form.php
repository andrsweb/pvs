<?php

/**
 * Clean incoming value from trash.
 *
 * @param	mixed	$value	Some value to clean.
 * @return	mixed	$value	The same value, but cleaned.
 */
function as_clean_value( $value )
{
	$value = trim( $value );
	$value = stripslashes( $value );
	$value = strip_tags( $value );

	return htmlspecialchars( $value );
}

if( ! empty( $_POST ) && isset( $_POST['func'] ) ){
	switch( $_POST['func'] ){
		case 'contact-form':
			as_send_contacts_form();
			break;

		case 'main-form':
			as_send_main_form();
			break;

		default:
			as_send_main_form();
	}
}

function as_send_contacts_form(){
	$email		= isset( $_POST['contacts-email'] ) ? as_clean_value( $_POST['contacts-email'] ) : null;
	$text		= isset( $_POST['contacts-text'] ) ? as_clean_value( $_POST['contacts-text'] ) : null;
	$title		= 'Contacts form';

	// Required fields.
	if( ! $email || ! $text ){
		echo json_encode( [
			'success'	=> 0,
			'message'	=> 'Please complete all fields.'
		] );
		die();
	}

	// Prepare message for mail.
	$message = "Hello!\n" .
		"{$title}:\n\n" .
		"Email - $email\n" .
		"Text - $text \n\n\n";

	as_send_email( $title, $message );
}

function as_send_main_form(){
	$email		= isset( $_POST['main-email'] ) ? as_clean_value( $_POST['main-email'] ) : null;
	$text		= isset( $_POST['main-text'] ) ? as_clean_value( $_POST['main-text'] ) : null;
	$title	= 'Main form';


	// Prepare message for mail.
	$message = "Hello!\n" .
		"{$title}:\n\n" .
		"Email - $email\n" .
		"Text - $text \n\n\n";

	as_send_email( $title, $message );
}

/**
 * @param string $subject
 * @param string $message
 * @return void
 */
function as_send_email( string $subject, string $message ){
	// Mail headers.
	$headers = "From: no-reply@" . $_SERVER['HTTP_HOST'] . "\r\n" .
		"Reply-To: no-reply@" . $_SERVER['HTTP_HOST'] . "\r\n" .
		"X-Mailer: PHP/" . phpversion();

	$result = mail('Venkatesh@pvs-edit.pro', $subject, $message, $headers );

	if( $result )
		echo json_encode( [
			'success'	=> 1,
			'message'	=> 'Thank you for your message! I will contact you as soon as possible.'
		] );	// Success.
	else
		echo json_encode( [
			'success'	=> 0,
			'message'	=> 'Sending error. Please try again later.'
		] );	// Failed.
}

die();