var monthArray= new Array();
        monthArray[1]="January";
        monthArray[2]="February";
        monthArray[3]="March";
        monthArray[4]="April";
        monthArray[5]="May";
        monthArray[6]="June";
        monthArray[7]="July";
        monthArray[8]="August";
        monthArray[9]="September";
        monthArray[10]="October";
        monthArray[11]="November";
        monthArray[12]="December";

var weekday = new Array();
        weekday[0] = "Monday";
        weekday[1] = "Tuesday";
        weekday[2] = "Wednesday";
        weekday[3] = "Thursday";
        weekday[4] = "Friday";
        weekday[5] = "Saturday";
        weekday[6] = "Sunday";

var workingDay;
var settings;

$(function() {
    $('#day').text("Day");
    $('#date').text("00");
    $('#month').text("Month");
    $('#year').text("Year");
    

    $(".datepicker").datepicker({ 
        autoclose: true,
        format: "dd/mm/yyyy", 
    }).on('changeDate', function(e) {
        $('#input').val(e.format());
        var input=$('#input').val();
        var date=input[0]+input[1];
        var month=input[3]+input[4];
        var year=input[6]+input[7]+input[8]+input[9];
        var d = new Date(year,month-1,date);
        var n = weekday[d.getUTCDay()];

        $('#day').text(n);

        //date
        if(d.getDate()<10){
            $('#date').text("0"+d.getDate());
        } else {
            $('#date').text(d.getDate());
        }

        //month
        var m=monthArray[(d.getMonth()+1)];
        $('#month').text(m);

        //year
        $('#year').text(d.getFullYear());
        var mm=parseInt(d.getMonth())+1;

        console.log(workingDay);
        workingDay=d.getFullYear()+'-'+ ('0' + (d.getMonth()+1)).slice(-2)+'-'+('0' + d.getDate()).slice(-2);
        console.log(workingDay);

    });

    });

        $("#mark").click(function(e) {
            settings = {
                "url": "https://node-mysql-richard.herokuapp.com/students/workdate",
                "method": "POST",
                "timeout": 0,
                "headers":
                {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({"date":String(workingDay)}),
            };
            e.preventDefault();
            $.ajax(settings).done(function (response) {
                console.log(response.message);
            if (response.message=="Marked as Present Day") {
                swal({
                    title: "Working Day",
                    text: "Your Date is successfully marked as working day",
                    icon: "success",
                    });
            }
            else {
                swal({
                    title: "Already Working Day",
                    text: "Your Date is already marked as working day",
                    icon: "warning",
                    });
            }
    });

}); 
