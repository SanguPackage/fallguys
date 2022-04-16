$(function() {
    $('.flybywrapper .flyby-btn, .flybywrapper flyby').click(function() {
        $('.flybywrapper').hide();
        $('.flyby-movie').show();
    });


    $('.level-detail .btn-group > button').click(function() {
        var self = $(this);

        var allButtons = $('button', self.parent());
        allButtons.each(function() {
            $(this).removeClass('btn-secondary').addClass('btn-light');

            var id = $(this).data('id');
            $('.' + id).addClass('hidden');
        });

        var id = self.data('id');
        $('.' + id).removeClass('hidden');
        self.addClass('btn-secondary').removeClass('btn-light');
    });

    $('#search').keyup(function() {
        var needle = $(this).val().toLowerCase();
        var rows = $('table.table tbody tr');

        if (needle === '') {
            rows.each(function() {
                $(this).show();
            });
            return;
        }

        rows.each(function() {
            var row = $(this);
            if (row.text().toLowerCase().includes(needle)) {
                row.show();
            } else {
                row.hide();
            }
        });
    });
});
