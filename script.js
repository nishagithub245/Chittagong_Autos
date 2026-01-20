$(document).ready(function(){

    // Enable Post button only if both exists
    $('#name, #comment').on('input', function(){
        let name = $('#name').val().trim(); 
        let comment = $('#comment').val().trim(); 
        $('#post').prop('disabled', !(name && comment));
    });

    // Handle reply clicks dynamically
    $(document).on('click', '.reply-link', function(e){
        e.preventDefault();
        let commenter = $(this).data('commenter');
        let id = $(this).data('id');

        $('#replyto').val(id); 
        let current = $('#comment').val();
        $('#comment').val(current + '@' + commenter).focus();
    });

    // Function to count rows in a thread
    function countThreadRows(rootId){
        let count = 1; // root
        $(`#comment-body tr[data-id='${rootId}']`).nextAll().each(function(){
            let parent = $(this).data('parent');
            if(parent == rootId) count++;
            else if(parent == 0) return false; 
        });
        return count;
    }

    // Function to reposition thread based on number of entries
    function repositionThread(rootId){
        let rootRow = $(`#comment-body tr[data-id='${rootId}']`);
        let threadCount = countThreadRows(rootId);

        let topRows = $('#comment-body tr[data-parent="0"]');
        let inserted = false;

        topRows.each(function(){
            let id = $(this).data('id');
            if(id == rootId) return true; 

            let otherCount = countThreadRows(id);
            if(threadCount > otherCount){
                $(rootRow).nextAll().each(function(){
                    if($(this).data('parent') != rootId) return false;
                    rootRow = $(this);
                });
                $(rootRow).insertBefore($(this));
                inserted = true;
                return false; 
            }
        });
        if(!inserted){
            let lastRow = $('#comment-body tr[data-parent="0"]').last();
            $(rootRow).nextAll().each(function(){
                if($(this).data('parent') != rootId) return false;
                rootRow = $(this);
            });
            $(rootRow).insertAfter(lastRow);
        }
    }

    function findLastDescendant(parentId) {
        let lastDescendant = $(`#comment-body tr[data-id='${parentId}']`);
        let currentRow = lastDescendant;
        let foundMore = true;
        
        while (foundMore) {
            foundMore = false;
            currentRow.nextAll().each(function() {
                let rowParent = parseInt($(this).data('parent'));
                // Check if this row is a descendant of our parentId
                if (rowParent === 0) return false; 
                
                // Check if this row is a child of our current last descendant
                let currentId = parseInt(currentRow.data('id'));
                if (rowParent === currentId) {
                    lastDescendant = $(this);
                    currentRow = $(this);
                    foundMore = true;
                    return false; 
                }
            });
        }
        return lastDescendant;
    }

    // Function to highlight @mentions in blue
   function highlightMentions(text) {
        
        
        text = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
            .replace(/\n/g, '<br>')
      text = text.replace(/@([\w\s]+?)(?=[\s.,!?;:]|$)/g, '<span class="mention">@$1</span>');
    
    return text;
    }

    // Post functionalities
    $('#post').click(function(e){
        e.preventDefault();

        let name = $('#name').val().trim();
        let comment = $('#comment').val().trim();
        let replyto = $('#replyto').val() || 0;

        if (!name || !comment) {
            alert("Please enter both name and comment!");
            return;
        }

        console.log("Posting comment:", { name, comment, replyto });

         $.ajax({
            url: 'save_comments.php',
            type: 'POST',
            dataType: 'json',   
            data: {         
                name: name, 
                comment: comment, 
                replyto: replyto 
            },
         success: function(response){
                console.log("Server response:", response);
                
                let no = response.commentnumber;
                let parent = response.replyto;
                let time = response.commenttime;
                let commenter = response.commenter;
                
                // Highlight mentions in the comment text
                let commentText = highlightMentions(response.comment);

                // Build table row
                let newRow = `
                    <tr class="comment-row" data-id="${no}" data-parent="${parent}">
                        <td>${no}</td>
                        <td>${commenter}</td>
                        <td>${time}</td>
                        <td>
                        ${commentText}
                        <button class="reply-link" data-id="${no}" data-commenter="${commenter}">Reply</button>
                        </td>
                    </tr>
                `;

                // Insert new row
                if(parent == 0){
                   
                   
                    $('#comment-body .thread-separator:last').remove();
                    
                    // Add the new comment
                    $('#comment-body').append(newRow);
                    
                    // Add separator after the new comment
                    let separator = '<tr class="thread-separator"><td colspan="4"></td></tr>';
                    $('#comment-body').append(separator);
                } else {
                    // For replies, find the last descendant of the parent
                    let lastDescendant = findLastDescendant(parent);
                    $(newRow).insertAfter(lastDescendant);
                }

                // Reset form
                $('#name').val('');
                $('#comment').val('');
                $('#replyto').val('0');
                $('#post').prop('disabled', true);
                
                // Scroll to the new comment
                $('html, body').animate({
                    scrollTop: $(`tr[data-id="${no}"]`).offset().top
                }, 500);
                
            } ,
            error: function(xhr, status, error){
                console.error("AJAX error:", status, error);
                console.error("Response text:", xhr.responseText);
                alert("ERROR: Could not save comment. Check save_comments.php.");
            }
        });
    });

});