if (document.readyState !== 'loading') {
    createSharedElements();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        createSharedElements();
    });
}

async function createSharedElements() {
    await createNavbar();
    await createHeader();
    await createFooter(); 
}

async function createNavbar() {
    await fetch('include/navigation.html')
        .then(response => response.text())
            .then(data => {
                var navbar = document.createElement('div');

                navbar.setAttribute("id", "navbar")
                navbar.innerHTML = data;

                document.getElementById('wrapper').prepend(navbar);
                return Promise.resolve();
            })
}

async function createHeader() {
    await fetch('include/title.html')
        .then(response => response.text())
            .then(data => {
                var title = document.createElement('div');

                title.setAttribute("id", "header")
                title.innerHTML = data;

                document.getElementById('wrapper').prepend(title);
                return Promise.resolve();
            })
}

async function createFooter() {
    await fetch('include/footer.html')
        .then(response => response.text())
            .then(data => {
                var navbar = document.createElement('footer');

                navbar.setAttribute("id", "footer")
                navbar.innerHTML = data;

                document.getElementById('wrapper').append(navbar);
                return Promise.resolve();
            })
}