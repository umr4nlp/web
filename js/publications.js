if (document.readyState !== 'loading') {
    getPubs();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        getPubs();
    });
}

function getPubs()
{
    var filepath = 'resources/pubs.csv'

    var csv = fetch(filepath)
    .then(response => response.text())
        .then(data => {
            var pubs = decodePubs(data);
            addPubs(pubs);
        })
}

function decodePubs(csv)
{
    var rows = csv.split(splitter="\n")

    var pubs = []
    var row_split = []

    rows.forEach(element =>
    {
        row_split = element.split(splitter="|")
        let pub = {
            authors: row_split[0],
            title: row_split[1],
            journal: row_split[2],
            pages: row_split[3],
            year: row_split[4],
            link: row_split[5]
        }
        pubs.push(pub)
    })

    return pubs
}

async function addPubs(pubs)
{
    const groupByYear = (pubs) => pubs.reduce((acc, pub) => {
        let annum = pub.year.trim()
        if(!acc[annum]) {
            acc[annum] = [];
        }
        
        acc[annum].push(pub);

        return acc;
    }, {})

    var pubs_grouped = groupByYear(pubs);
    console.log(pubs_grouped);

    var i = 0;

    Object.entries(pubs_grouped).reverse().forEach(([year, publications]) => {
        var this_year = document.createElement("div");
        this_year.setAttribute("class", "pub_year");
        this_year.setAttribute("id", year);
        
        year_label = document.createElement("div");
        year_label.setAttribute("class", "year_label");
        year_label.innerHTML = year;
        this_year.appendChild(year_label);

        publications.forEach(pub => {
            var pub_span = document.createElement("div");
            pub_span.setAttribute("class", "pub_span")
            
            pub_title = document.createElement("div");
            pub_title.setAttribute("class", "pub_title")
            pub_title.innerHTML = pub.title;

            pub_span.appendChild(pub_title)

            pub_authors = document.createElement("div");
            pub_authors.setAttribute("class", "pub_authors")
            pub_authors.innerHTML = pub.authors;

            pub_span.appendChild(pub_authors)

            pub_journal = pub.journal;

            pub_journal = document.createElement("div");
            pub_journal.setAttribute("class", "pub_journal")
            pub_journal.innerHTML = pub.journal;

            if(pub.pages != "")
            {
                pub_journal.innerHTML += " (pp. " + pub.pages + ")"
            }

            pub_span.appendChild(pub_journal)

            pub_link = document.createElement("div");
            pub_link.setAttribute("class", "pub_link")
            
            if(pub.link.trim().length !== 0)
            {
                let link = document.createElement("a");
                link.setAttribute("href", pub.link);
                link.innerHTML = "[link]";
                pub_link.setAttribute("style", "padding-bottom:10px;")

                pub_link.appendChild(link);
            }
            else
            {
                pub_link.innerHTML = "<br>"
            }

            pub_span.appendChild(pub_link);

            this_year.appendChild(pub_span);
        })
        
        document.getElementById("pub_body").appendChild(this_year);
    })
}