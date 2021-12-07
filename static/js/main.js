$(document).ready(function () {

    setInterval(getSwitches, 1000);

    // get switches
    function getSwitches()
    {
        $.ajax({
            type: 'GET',
            url: 'api/getswitches',
            datatype: 'json',
            success: function (data) {
                // data = JSON.parse(data)
                // console.log(data)
    
                var i = 0
                for (sw =0; sw< data.length; sw++){
                    sw_id = data[sw]['switch_id'];
                    sw_st = data[sw]['status'];
                    switch_find = document.getElementById(sw_id);
                    
                    if (sw_st == true){
                        $(switch_find).attr( 'checked', true );
                    }
                    if (sw_st == false) {
                        $(switch_find).attr('checked',false);
                    }
                    
                }
            }
        });
    }

    //Post switches new status
    $('.switch').click(function () {
        clicked_sw_id = $(this).attr('id');
        var value = this.checked ? this.value : 'unchecked';
        switch_st = false;

        if (value == 'checked') {
            switch_st = true;
            console.log('Switch',clicked_sw_id ,'status',switch_st)
            console.log("Switch",clicked_sw_id, "is ON")
        }
        else {
            switch_st = false;
            console.log('Switch status',switch_st)
            console.log('Switch',clicked_sw_id,'is OFF')
        }
        
        var endpoint = '/api/updateswitch/' + clicked_sw_id;
        $.ajax({
            type: 'POST',
            url: endpoint,
            datatype: 'json',
            success: function (data) {
                console.log(data)
            },
            error: function (result) {
                alert('Error');
            }
        });
    });
});