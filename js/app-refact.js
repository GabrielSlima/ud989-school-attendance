/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStoage.
 */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


/* STUDENT APPLICATION */
$(function() {
	var student_model = {
		localstorage: localStorage.attendance,
		students: [
			{
				id: 1,
				name: 'Slappy the Frog',
				missed: 0,
				days: []
			}
		]
	}
	var controller = {
		init: function(){
			view.init();
		},
		countMissed: function(allMissed, allCheckBoxes) {
			allMissed.each(function(){
				var studentRow = $(this).parent('tr'),
					daysChecks = $(studentRow).children('td').children('input'),
					numMissed = 0;
				daysChecks.each(function(){
					if(!$(this).prop('checked')) {
						numMissed++;
					}
				});
				console.log("teste com a controller");
				console.log(studentRow[0].id);
				console.log(numMissed);
				$(this).text(numMissed);
			});
		}
	}
	
	var view = {
		init: function(){
			this.$allMissed = $('tbody .missed-col');
			this.$allCheckBoxes = $('tbody input');
			controller.countMissed(this.$allMissed, this.$allCheckBoxes);
			this.$allCheckBoxes.on('click', function(){
				var studentRows = $('tbody .student'),
					newAttendance = {};

				studentRows.each(function(){
					var name = $(this).children('.name-col').text(),
						$allCheckBoxes = $(this).children('td').children('input');
					newAttendance[name] = [];

					$allCheckBoxes.each(function(){
						newAttendance[name].push($(this).prop('checked'));
					});
				});
				var $allMissed = $('tbody .missed-col');
				var $allCheckedBoxes = $('tbody input');
				console.log("Dentro do click");
				console.log($allMissed);
				controller.countMissed($allMissed, $allCheckedBoxes);
				localStorage.attendance = JSON.stringify(newAttendance);
			});

		}
	}
	
	console.log("LocalStorage: ");
	console.log(localStorage.attendance);
    var attendance = JSON.parse(localStorage.attendance);
    // Check boxes, based on attendace records
    $.each(attendance, function(name, days) {
	    console.log(name);
	    console.log(days);
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');
	    console.log(studentRow);
	    console.log(dayChecks);
        dayChecks.each(function(i) {
		console.log(days[i]);
            $(this).prop('checked', days[i]);
        	console.log($(this).prop('checked', days[i]));
	});
    });

	controller.init();
}());
