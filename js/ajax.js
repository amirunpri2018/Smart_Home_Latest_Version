$(document).ready(function(){
    $(".lightbulb").click(function(){toggleLight(this);});
    $(".dimmer").click(function(e) {
        e.stopPropagation();
   });
   $("#settings").click(function(e) {
        e.stopPropagation();
   });
   $(".settingsToggle").click(function(e) {
        e.stopPropagation();
   });
});

function toggleLight(element){
    var status = element.dataset.status;
    var lightID = element.dataset.id;
    console.log(status);
    $.ajax({
        type: "POST",
        url: "ajax/lightbulb.ajax.php",
        data: { 
                AJAX : (true),
                status : (status),
                ID : (lightID)
                } ,
        success: function (data) {
            console.log("Success! " + data);
            //update button div
            $('#lightbulb_on_'+lightID).toggle();
            $('#lightbulb_off_'+lightID).toggle();
            if(status === "on"){
                element.dataset.status = "off";
            }else{
                element.dataset.status = "on";
            }
        },
        error: function(data){
            console.log("Error" + data);
        }
    });
}

//left this method for now, may prove to be a good generic device method
function toggleLock(element){
    var lockId = element.dataset.id;
    var ajax_handler = element.dataset.handler;
    $.ajax({
        type: "POST",
        url: "ajax/" + ajax_handler,
        data: {
            AJAX : (true),
            ID : (lockId)
        },
        success: function(data){
            console.log("Success! " + data);
            //update button div
            $('#locked_'+lockId).toggle();
            $('#unlocked_'+lockId).toggle();
        },
        error: function(data){
            console.log("Error: " + data);
        }
    });
    
}

function menuButtonHandler(classname,method){
    ajax_handler = "menuHandler.ajax.php";
    $('.content').html('<h3>Loading...</h3>');
    $.ajax({
        type: "POST",
        url: "ajax/" + ajax_handler,
        data: {
            AJAX : (true),
            className : (classname),
            methodName : (method),
        },
        success: function(data){
            console.log("Success! " + data);
            $('.content').html(data);
        },
        error: function(data){
            console.log("Error: " + data);
            $('.content').html("Could not access menu");
        }
    });
}

function addNewUser(form){
    var inputs = $(form).find('[type="text"]');
    for(var i =0; i<3; i++){
        console.log($(inputs[i]));
        if($(inputs[i]).val() === ""){
            $(inputs[i]).css("background-color","salmon");
            alert("Please fill in the indicated field");
            return;
        }
    }
    var name = $('[name="username"]').val();
    var password = $('[name="password"]').val();
    var check = $('[name="passwordCheck"]').val();
    console.log($('[name="role"]').val());
    var role = $('[name="role"]').val();
    if(password !== check){
        $('[name="passwordCheck"]').css("background-color","salmon");
        alert('The second password must match the first');
        return;
    }
    $('.content').html('Working...');
    $.ajax({
        type: "POST",
        url: "ajax/addUser.ajax.php",
        data: {
            AJAX : (true),
            username : (name),
            password : (password),
            role : (role)
        },
        success: function(data){
            console.log("Success! " + data);
            $('.content').html(data);
        },
        error: function(data){
            console.log("Error: " + data);
            $('.content').html("Could not add user");
        }
    });    
    
}

function dimLight(groupId){
    console.log("Current Choice: " + $('#dim_slide').val());
    var choice = $('#dim_slide_'+groupId).val();
    $.ajax({
        type: "POST",
        url: "ajax/dimLight.ajax.php",
        data: {
            AJAX : (true),
            choice : (choice),
            groupId : (groupId),
        },
        success: function(data){
            console.log("Success! " + data);            
            console.log($('#lightbulb_on_'+groupId).closest('.lightbulb'));
            //$('#lightbulb_on_'+groupId).show();
            //$('#lightbulb_off_'+groupId).hide();
            //$('#lightbulb_on_'+groupId).closest('.lightbulb').attr('data-status','off');
        },
        error: function(data){
            console.log("Error: " + JSON.stringify(data));
        }
    }); 
    //$('#display_value').html(choice + "&deg;C");
    //choice = parseInt(choice) * 2.5 + 15;
    //$(".bar").css({'width' : choice + "px"});
}

function changeColor(groupId){
    var color = $('[name="color_'+groupId+'"]').val();
    console.log('color',color);
    console.log($('[name="color_'+groupId+'"]'));
    $.ajax({
        type: "POST",
        url: "ajax/changeColor.ajax.php",
        data: {
            AJAX : (true),
            color : (color),
            groupId : (groupId),
        },
        success: function(data){
            console.log("Success! " + data);            
            
        },
        error: function(data){
            console.log("Error: " + JSON.stringify(data));
        }
    }); 
}

function updateName(groupId){
    console.log($('#updateName_'+groupId));
    var name = $('[name="groupName_'+groupId+'"]').val();
    $('#updateName_'+groupId).html("Working...");
    $.ajax({
        type: "POST",
        url: "ajax/updateName.ajax.php",
        data: {
            AJAX : (true),
            name : (name),
            groupId : (groupId),
        },
        success: function(data){
            console.log("Success! " + data);            
            $('#updateName_'+groupId).html("Changed Name to " + name + "!");
        },
        error: function(data){
            console.log("Error: " + JSON.stringify(data));
            $('#updateName_'+groupId).html("Could not change name!");
        }
    }); 
}
