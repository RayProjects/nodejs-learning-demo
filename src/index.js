$.ajax('demo/get_div_text', {
    success: function (data) {
        data = JSON.parse(data);
        $('#app').text(data.data);
    }
});