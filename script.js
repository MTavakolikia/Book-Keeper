const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEL = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];

// Show Modal , Focus on Input
function ShowModal(){
    modal.classList.add('show-modal');
    websiteNameEL.focus();
}

// Modal Event Listeners
modalShow.addEventListener('click', ShowModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) =>(e.target === modal ? modal.classList.remove('show-modal') : false));

function validate(nameValue , urlValue){
    const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
    const regx = new RegExp(expression);
    if(!nameValue || !urlValue){
        alert('Please submit values for both fields.')
        return false;
    }
    if(!urlValue.match(regx)){
        alert('Please provide a valid web address');
        return false;
    }
    // Valid
    return true;
}

// Fetch Bookmarks
function fetchBookmarks(){
    // Get bookmarks from localStorage if available
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        bookmarks =[{
            name: 'Mohammad design',
            url: 'https://mtwebdesign.com'
        },
        ],
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
}

function storeBookmark(e) { 
    e.preventDefault();
    const nameValue = websiteNameEL.value;
    let urlValue =websiteUrlEl.value;
    if(!urlValue.includes('http://', 'https://')){
        urlValue=`https://${urlValue}`;
    }
    if (!validate(nameValue, urlValue)){
        return false
    }
    const bookmark= {
        name: nameValue,
        url: urlValue,
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEL.focus();
 }
bookmarkForm.addEventListener('submit', storeBookmark);

// On Load, Fetch Bookmarks
fetchBookmarks();