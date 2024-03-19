if (document.readyState !== 'loading') {
    getPeople();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        getPeople();
    });
}

function getPeople()
{
    var filepath = 'resources/people.csv'

    var csv = fetch(filepath)
    .then(response => response.text())
        .then(data => {
            var people = decodePeople(data);
            createPeopleCards(people);
        })
}

function decodePeople(csv)
{
    var rows = csv.split(splitter="\n")

    var people = []
    var row_split = []

    rows.forEach(element =>
    {
        row_split = element.split(splitter="|")
        let person = {
            category: row_split[0],
            name: row_split[1],
            institution: row_split[2],
            website: row_split[3],
            email: row_split[4]
        }
        people.push(person)
    })

    return people
}

async function imageExists(image_name) {
    try {
        fetch("images/people/" + image_name + ".jpg")
            .then(response => response.blob())
            {
                return image_name;
            }
        }
        catch {
            return "placeholder.jpg"
        }
}

function createPeopleCards(people)
{
    var all_cats = []

    const groupByCategory = (people) => people.reduce((accum, person) => {
        let cat = person.category.trim()
        if(!accum[cat]) {
            accum[cat] = [];
        }

        accum[cat].push(person);

        return accum;
    }, {})

    var people_grouped = groupByCategory(people);

    for (const category of Object.entries(people_grouped)) {
        var this_cat = [];

        for (const person of category[1]) {
            var person_card = document.createElement("div");
            person_card.setAttribute("class", "card person_card");
            person_card.setAttribute("id", person.name)
            
            // Add name
            person_name = document.createElement("div");
            person_name.setAttribute("class", "person_name")
            person_name.innerHTML = person.name;

            person_card.appendChild(person_name)

            // Add institution
            person_institution = document.createElement("div");
            person_institution.setAttribute("class", "person_institution")
            person_institution.innerHTML = person.institution;

            person_card.appendChild(person_institution)

            // Add website
            person_website = document.createElement("div");
            person_website.setAttribute("class", "person_website")

            if(person.website.trim().length !== 0)
            {
                let website = document.createElement("a");
                website.setAttribute("href", person.website);
                website.innerHTML = "Website";
                website.setAttribute("style", "padding-bottom:10px;")

                person_website.appendChild(website);
            }
            else
            {
                person_website.innerHTML = "<br>"
            }


            person_card.appendChild(person_website)

            // Add email
            person_email = document.createElement("div");
            person_email.setAttribute("class", "person_email")
            
            if(person.email.trim().length !== 0)
            {
                let email = document.createElement("a");
                email.setAttribute("href", person.email);
                email.innerHTML = "Email";
                person_email.setAttribute("style", "padding-bottom:10px;")

                person_email.appendChild(email);
            }
            else
            {
                person_email.innerHTML = "<br>"
            }

            person_card.appendChild(person_email);

            // Add image
            name_split = person.name.split(" ")
            let image_path = "web/images/people/" + name_split[0] + name_split[1][0] + ".jpg";
            const person_image = document.createElement("img")
            person_image.setAttribute("class", "card-img-top")
            person_image.setAttribute("src", image_path)

            person_card.prepend(person_image)

            person_image.onerror = () => {
                person_image.setAttribute("src", "web/images/people/placeholder.jpg");
            };

            // Append to category
            this_cat.push(person_card);
        }
        all_cats.push({
            label: category[0],
            cards: this_cat
        })
    }

    console.log(all_cats)

    addPeopleCards(all_cats)
}

function addPeopleCards(all_cats)
{
    all_cats.forEach(category => {
        var this_cat = document.createElement("div")
        this_cat.setAttribute("class", "person_category");
        this_cat.setAttribute("id", category.label);
        
        cat_label = document.createElement("div");
        cat_label.setAttribute("class", "category_label");
        cat_label.innerHTML = category.label;
        main_body.appendChild(cat_label);

        cards = category.cards
        
        var i = 0;
        cards.forEach(card => {

            this_cat.appendChild(card);
        })
        document.getElementById("main_body").appendChild(this_cat);
    })
}