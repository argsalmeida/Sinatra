/***********************************
 Função que retorna a data corrente
 Formato: yyyy-mm-dd
************************************/
function getCurrentDate(){
	var $date = new Date();

	var $month = $date.getMonth()+1;
	var $day = $date.getDate();

	var $currentDate = $date.getFullYear() + '-' +
			    ($month<10 ? '0' : '') + $month + '-' +
			    ($day<10 ? '0' : '') + $day;

	return $currentDate;
}
/***********************************
 Função que retorna a hora corrente
 Formato: hh:mm (24h)
************************************/
function getCurrentTime(){
	var $date = new Date();

	var $hours = $date.getHours();
	var $minutes = $date.getMinutes();

	var $currentTime = ($hours<10 ? '0' : '') + $hours + ':' +
			    ($minutes<10 ? '0' : '') + $minutes;

	return $currentTime;
}
