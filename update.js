
function updateClock() {
    var now = new Date();
    
    var months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    var month = months[now.getMonth()];
    var day = now.getDate();
    var year = now.getFullYear();

    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    day = day < 10 ? '0' + day : day;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    var timeString = month + ' ' + day + ' ' + year + ', ' +
                     hours + ':' + minutes + ':' + seconds + ' ' + ampm;

    document.getElementById('ctime').innerHTML = timeString;
}

function getTimeDifference(startDate, endDate) {
    const timeDiff = endDate.getTime() - startDate.getTime();
  
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
    return formattedTime;
}

function Elapsed() {
    var timerElement = document.getElementById('timesince');

    const predeterminedTime = new Date(sessionStorage.getItem('activationTime'));
    const currentTime = new Date();

    
    const timeDiff = getTimeDifference(predeterminedTime, currentTime);
    
    timerElement.innerText = timeDiff
    var bigTimer = subtractTimes('24:00:00' , timeDiff);
    document.getElementById('bigtime').innerHTML = bigTimer;
  } 

function subtractTimes(time1, time2) {
    const date1 = new Date(`1970-01-01T${time1}`);
    const date2 = new Date(`1970-01-01T${time2}`);
  
    const timeDiff = date1 - date2;
  
    const resultDate = new Date(timeDiff);
  
    const resultTime = resultDate.toISOString().substr(11, 8);
  
    return resultTime;
  }

function generateText(){
    var textelem1 = document.getElementById("route");
    var textelem2 = document.getElementById("tns");
    var bigimage = document.getElementById("ticket_img");


    if (String(sessionStorage.getItem('mode')) == "Railpass"){
        bigimage.src = "images/tix.png";
    }

    const tx1 = `${String(sessionStorage.getItem('origin'))}${" to "}${String(sessionStorage.getItem('destination'))}
    ${" - $10 One Day Pass"}`;
    const tx2 = String(sessionStorage.getItem('ticketnum'))
    textelem1.innerText = tx1;
    textelem2.innerText = tx2;
}
generateText(); 
setInterval(updateClock, 1000);
setInterval(Elapsed, 1000);

updateClock();
Elapsed();

