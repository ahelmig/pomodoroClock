var Clock = {
  //sets the total time that is used with the circle fill graphic
  totalTime: 0,
  //sets total number of seconds left for timer
  totalSeconds: 0,
  //start timer
  start: function() {
    var time = this;
    //countdown timer
    this.interval = setInterval(function() {
      if (time.totalSeconds >= 0) {
        var fillPercent = (time.totalSeconds / time.totalTime) * 100;
        $('.circle').css({
          "background-color": "rgba(138, 227, 43, 0.3)"
        });
        $('.fill').css({
          "height": +fillPercent + "%"
        });
        var minutes = Math.floor(time.totalSeconds / 60);
        var seconds = time.totalSeconds % 60;
        $('#minutes').text(minutes + ':');
        $('#seconds').text(twoNums(seconds));
      } else if (time.totalSeconds < 0) {
        var audio = new Audio('http://www.wavsource.com/snds_2016-06-05_6174362464058618/sfx/alarm_beep.wav#t=0,1');
        audio.play();
        clearInterval(this.interval);
        delete this.interval;
        changeSession();
        this.start();
      }
      --time.totalSeconds;
    }, 1000);
  },
  //reset timer
  reset: function() {
    clearInterval(this.interval);
    delete this.interval;
    $('.fill').css({
      "height": "0%"
    });
    $('.circle').css({
      "background-color": "#191919"
    });
  },
  //timer pause function
  pause: function() {
    clearInterval(this.interval);
    delete this.interval;
  },
  //timer resume function
  resume: function() {
    if (!this.interval) this.start();
  }
};
var session = 'work';
var toggle = false;
var stop = false;

//selects which session it is, break or work
function changeSession() {
  if (session === 'work') {
    var a = $('#workLength').text();
    Clock.totalSeconds = parseInt(a) * 60;
    Clock.totalTime = parseInt(a) * 60;
    $('#sessionName').text('Session!');
    $('.fill').css({
      "height": "0%"
    });
    session = 'break';
  } else {
    var b = $('#breakLength').text();
    Clock.totalSeconds = parseInt(b) * 60;
    Clock.totalTime = parseInt(b) * 60;
    $('#sessionName').text('Break!');
    $('.fill').css({
      "height": "0%"
    });
    session = 'work';
  }
};

//converts the seconds to two digits
function twoNums(n) {
  if (n < 10) {
    return '0' + n;
  } else {
    return n;
  }
};

//Starts the session on first click, then allows the same id to act as a toggle between pause and resume
$('#sessionName').click(function() {
  if (toggle == false) {
    changeSession();
    Clock.start();
    //prevents sequential clicks from restarting timer
    toggle = true;
  } else {
    //pause toggle
    if (stop == false) {
      Clock.pause();
      stop = true;
    } 
    //resume toggle
    else {
      Clock.resume();
      stop = false;
    }
  }
});

//Decreases work session time
$('#minusWork').click(function() {
  var b = parseInt($('#workLength').text());
  var c = 0;
  //clears whatever the session is/time is when time is added to work time and has it restart as a 'work' session
  $('#minutes').empty();
  $('#seconds').empty();
  Clock.reset();
  toggle = false;
  session = 'work';
  $('#sessionName').text('Click here to get started!');
  //allows the user to select a work time down to 1 minute
  if (b > 1) {
    var c = b - 1;
    $('#workLength').html(c);
    $('#minutes').text(c);
  } else {
    $('#minutes').text(1);
  }
});

//Increases work session time
$('#plusWork').click(function() {
  var b = parseInt($('#workLength').text());
  var c = 0;
  $('#minutes').empty();
  $('#seconds').empty();
  Clock.reset();
  toggle = false;
  session = 'work';
  $('#sessionName').text('Click here to get started!');
  //allows the user to only add up to 59 minutes
  if (b < 59) {
    var c = b + 1;
    $('#workLength').html(c);
    $('#minutes').text(c);
  } else {
    $('#minutes').text(59);
  }
});

//Decrease time for break session
$('#minusBreak').click(function() {
  var b = parseInt($('#breakLength').text());
  var c = 0;
  $('#minutes').empty();
  $('#seconds').empty();
  Clock.reset();
  toggle = false;
  session = 'work';
  $('#sessionName').text('Click here to get started!');
  if (b > 1) {
    var c = b - 1;
    $('#breakLength').html(c);
    var d = parseInt($('#workLength').text());
    $('#minutes').text(d);
  } else {
    $('#minutes').text(1);
  }
});

//Increase time for break session
$('#plusBreak').click(function() {
  var b = parseInt($('#breakLength').text());
  var c = 0;
  $('#minutes').empty();
  $('#seconds').empty();
  Clock.reset();
  toggle = false;
  session = 'work';
  $('#sessionName').text('Click here to get started!');
  if (b < 59) {
    var c = b + 1;
    $('#breakLength').html(c);
    var d = parseInt($('#workLength').text());
    $('#minutes').text(d);
  } else {
    $('#minutes').text(59);
  }
});