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

// Build Bookmarks DOM
function buildBookmarks(){
    bookmarksContainer.textContent='';
    bookmarks.forEach((bookmark) =>{
        const {name,url}=bookmark;
        // Create Item Element
        const item=document.createElement('div');
        item.classList.add('item');
        // Close Icon
        const closeIcon=document.createElement('i');
        closeIcon.classList.add('fas','fa-times');
        closeIcon.setAttribute('title','Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
        // Favicon / Link Container
        const linkInfo=document.createElement('div');
        linkInfo.classList.add('name');
        // Favicon
        const favicon=document.createElement('img');
        favicon.setAttribute('src',`https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt','Favicon');
        // Link
        const Link=document.createElement('a');
        Link.setAttribute('href',`${url}`);
        Link.setAttribute('target','_blank');
        Link.textContent=name;
        // Append to bookmarks container
        linkInfo.append(favicon,Link);
        item.append(closeIcon,linkInfo);
        bookmarksContainer.appendChild(item);
    })
};
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
    buildBookmarks();
}
function deleteBookmark(url) {
    bookmarks.forEach((bookmark,i) => {
        if(bookmark.url === url){
bookmarks.splice(i,1);
        }
    });
	// Update bookmarks array in localStorage, re-populate DOM
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	fetchBookmarks();
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