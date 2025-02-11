if (document.readyState !== 'loading') {
    getActivities();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        getActivities();
    });
}

function getActivities() {
    var filepath = 'resources/activities.csv';  // Ensure the path is correct
    
    fetch(filepath)
        .then(response => response.text())
        .then(data => {
            var activities = parseActivities(data);
            displayActivities(activities);
        })
        .catch(error => {
            console.error("Error fetching activities CSV:", error);
        });
}

function parseActivities(csv) {
    var rows = csv.split("\n");
    var activities = [];

    rows.forEach((element, index) => {
        if (element.trim() === "" || index === 0) return; // Skip empty or header row
        
        let row_split = element.split("|");

        if (row_split.length < 6) {  // Ensure all columns exist
            console.warn(`Skipping malformed row ${index + 1}:`, row_split);
            return;
        }

        let event = {
            year: row_split[0]?.trim() || "Unknown",  
            title: row_split[1]?.trim() || "Unknown",
            date: row_split[2]?.trim() || "Unknown",
            location: row_split[3]?.trim() || "Unknown",
            link: row_split[4]?.trim() || "",  // Primary link
            additional_link: row_split[5]?.trim() || ""  // New additional link
        };

        activities.push(event);
    });

    return activities;
}

function displayActivities(activities) {
    const groupByYear = (activities) => activities.reduce((acc, event) => {
        let annum = event.year.trim();
        if (!acc[annum]) {
            acc[annum] = [];
        }
        acc[annum].push(event);
        return acc;
    }, {});

    var activitiesGrouped = groupByYear(activities);

    Object.entries(activitiesGrouped).reverse().forEach(([year, events]) => {
        var yearDiv = document.createElement("div");
        yearDiv.setAttribute("class", "activity_year");
        yearDiv.setAttribute("id", year);

        var yearLabel = document.createElement("h3");
        yearLabel.setAttribute("class", "year_label text-secondary mt-3");
        yearLabel.innerHTML = year;
        yearDiv.appendChild(yearLabel);

        events.forEach(event => {
            var eventDiv = document.createElement("div");
            eventDiv.setAttribute("class", "event_item");

            var eventTitle = document.createElement("strong");
            eventTitle.innerHTML = event.title;
            eventDiv.appendChild(eventTitle);

            var eventDetails = document.createElement("p");
            eventDetails.innerHTML = `<em>${event.date} | ${event.location}</em>`;
            eventDiv.appendChild(eventDetails);

            if (event.link.trim().length !== 0) {
                let eventLink = document.createElement("a");
                eventLink.setAttribute("href", event.link);
                eventLink.setAttribute("target", "_blank");
                eventLink.innerHTML = "[More Info]";
                eventDetails.appendChild(eventLink);
            }

            if (event.additional_link.trim().length !== 0) {
                let additionalLink = document.createElement("a");
                additionalLink.setAttribute("href", event.additional_link);
                additionalLink.setAttribute("target", "_blank");
                additionalLink.innerHTML = "[Slides]";
                eventDetails.appendChild(document.createTextNode(" | ")); // Separator
                eventDetails.appendChild(additionalLink);
            }

            yearDiv.appendChild(eventDiv);
        });

        document.getElementById("activities_body").appendChild(yearDiv);
    });
}

