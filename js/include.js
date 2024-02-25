if (document.readyState !== 'loading') {
    console.log('document is already ready, just execute code here');
    createSharedElements();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('document was not ready, place code here');
        createSharedElements();
    });
}

async function createSharedElements() {
    await createHeader();
    await createNavbar();
    await createFooter(); 
}

async function createNavbar() {
    fetch('include/navigation.html')
        .then(response => response.text())
            .then(data => {
                var navbar = document.createElement('div');

                navbar.setAttribute("id", "navbar")
                navbar.innerHTML = data;

                document.getElementById('wrapper').prepend(navbar);
            })

    return Promise.resolve();
}

async function createHeader() {
    fetch('include/title.html')
        .then(response => response.text())
            .then(data => {
                var title = document.createElement('div');

                title.setAttribute("id", "header")
                title.innerHTML = data;

                document.getElementById('wrapper').prepend(title);
            })

    return Promise.resolve();
}

async function createFooter() {
    fetch('include/footer.html')
        .then(response => response.text())
            .then(data => {
                var navbar = document.createElement('footer');

                navbar.setAttribute("id", "footer")
                navbar.innerHTML = data;

                document.getElementById('wrapper').append(navbar);
            })
    
    return Promise.resolve();
}