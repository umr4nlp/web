document.addEventListener("DOMContentLoaded", add_navbar_elements);


async function add_navbar_elements(pagename) {
    console.log("the")
    
    var pages = ["index.html", "people.html", "publications.html", "guidelines.html", "tools.html", "data.html", "participation.html", "activities.html", "sponsors.html", "events/UMRPartsingWorkshop.html"]

    pages.forEach(page => async () => {
        var filepath = window.location.pathname;
        var found_index = false;
        console.log("omg")

        while(!found_index)
        {
            var try_index_filepath = filepath.split('/').slice(0, -1).join() + page;

            try
            { 
                const response = await fetch(try_index_filepath);

                return response.ok;
            } 
            catch (error)
            {
                found_index = false
            }

            pagename = (exists ? "../" + pagename : pagename);
            found_index = (exists ? true : false);
            console.log(found_index);
        }

        var listElement = document.createElement("li");
        var linkElement = document.createElement("a");
        
        linkElement.className = "nav-link";
        linkElement.href = filepath;

        listElement.appendChild(linkElement);

        document.getElementsByClassName("navbar-nav").appendChild(listElement);
    })
}