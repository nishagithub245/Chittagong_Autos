// Function to highlight @mentions in blue
function highlightMentions(text) {
    // Escape HTML first
    text = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/\n/g, '<br>');
    
    // Highlight @mentions - match @ followed by any non-space characters
    // This will match full names with spaces until it hits a space or HTML tag
    text = text.replace(/@([^\s<]+)/g, '<span class="mention">@$1</span>');
    
    return text;
}