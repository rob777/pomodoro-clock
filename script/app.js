$(document).ready(function () {

    //increment and decrement break time
    $('#brk-plus').on('click', function () {
        var $brVl = $('#break').text();
        $brVl++;
        $('#break').text($brVl);
    });

    $('#brk-minus').on('click', function () {
        var $brVl = $('#break').text();
        $brVl--;
        if ($brVl < 1) {
            $('#break').text(1);
        } else {
            $('#break').text($brVl);
        }
    });

    //increment and decrement work time
    $('#wrk-plus').on('click', function () {
        var $wrVl = $('#work').text();
        $wrVl++;
        $('#work').text($wrVl);
        $('#timer').text($wrVl + ':' + '00');
    });

    $('#wrk-minus').on('click', function () {
        var $wrVl = $('#work').text();
        $wrVl--;
        if ($wrVl < 1) {
            $('#work').text(1);
        } else {
            $('#work').text($wrVl);
            $('#timer').text($wrVl + ':' + '00');
        }
    });

});

//make Countdown constructor
function Countdown(startTime) {
    this.startTime = startTime;
    this.targetId = '#timer';
    this.name = 'timer';
    this.paused = true;
}

Countdown.prototype.init = function () {
    this.reset();
    intr = setInterval(this.name + '.tick()', 1000);
}

Countdown.prototype.start = function () {
    this.paused = false;
}

Countdown.prototype.pause = function () {
    if (!this.paused) {
        this.paused = true;
    }
}

Countdown.prototype.reset = function (time) {
    time = this.startTime.split(':');
    this.minutes = parseInt(time[0]);
    this.seconds = parseInt(time[1]);
    this.updateTarget();
    if (!this.paused) {
        this.paused = true;
    }
}

Countdown.prototype.tick = function () {
    if (!this.paused && !(this.seconds <= 0 && this.minutes <= 0)) {
        this.seconds--;
        if (this.seconds <= 0 && this.minutes > 0) {
            this.minutes--;
            this.seconds = 59;
        } else if (this.seconds == 0 && this.minutes == 0 && $('#current-task').text() == 'WORK') {
            $('#current-task').text('BREAK');
            $('.display').css({
                "background-color": "red"
            });
            this.minutes = $('#break').text();
        } else if (this.seconds == 0 && this.minutes == 0 && $('#current-task').text() == 'BREAK') {
            $('#current-task').text('WORK');
            $('.display').css({
                "background-color": "blue"
            });
            this.minutes = $('#work').text();
        }
    }
    this.updateTarget();
}

Countdown.prototype.updateTarget = function () {
    seconds = this.seconds;
    minutes = this.minutes;
    if (seconds < 10) seconds = '0' + seconds;
    if (minutes < 10) minutes = '0' + minutes;
    $(this.targetId).text(minutes + ':' + seconds);
}