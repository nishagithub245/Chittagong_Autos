$(document).ready(function(){

    // Enable/Disable Post button
    $('#name, #comment').on('input', function(){
       let name = $('#name').val().trim(); 
       let comment = $('#comment').val().trim(); 
       $('#post').prop('disabled', !(name && comment));
    });

    // replay button functionalities............

    $('#comment-body tr').each(function(){
        if ($(this).find('.reply-link').length === 0) {
            let name = $(this).find('td:eq(1)').text();
            let no = $(this).find('td:eq(0)').text();
            $(this).append(`<a  class="reply-link" data-commenter="${name}" data-no="${no}">[Reply]</a>`);
        }
    });

    // Reply button clicked
    $(document).on('click', '.reply-link', function(){
        let commenter = $(this).data('commenter');
        let no = $(this).data('no');

        $('#replyto').val(no);

        // multipul tags....
        let current = $('#comment').val();
        $('#comment').val(current + '@' + commenter + ' ').focus();
    });

    // Post comment
    $('#post').click(function(){

        let name = $('#name').val().trim();
        let comment = $('#comment').val().trim();
        let replyto = $('#replyto').val();

        $.post("save_comments.php", {
            name: name,
            comment: comment,
            replyto: replyto
        }, function(data){

            let row = JSON.parse(data);
            let no = row.commentnumber;

            // Append live comment
            $('#comment-body').append(`
                <tr>
                    <td>${no}</td>
                    <td>${row.commenter}</td>
                    <td>${row.commenttime}</td>
                    <td>${row.comment}</td>
                    <a  class="reply-link" data-commenter="${row.commenter}" data-no="${no}">Reply</a>
                </tr>
            `);

            // Clear fields
            $('#name, #comment').val('');
            $('#replyto').val('');
            $('#post').prop('disabled', true);

        }).fail(function(){
            alert("ERROR: save_comments.php not found or server issue!");
        });
    });

});
