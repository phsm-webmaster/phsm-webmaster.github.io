/*
 * Andrew L. Criswell II -- 2024
 */
const eventsVersion = 1;
let eventGallery = null;

const dateFormatter = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
});

function createEventElement(json) {
    let eventName = json["name"] ?? "Unknown Event";
    let eventDesc = json["description"] ?? "No description has been set for this event.";
    let date = json["date"];
    if (date) {
        let parsed = new Date(Date.parse(date));
        date = dateFormatter.format(parsed);
    } else {
        date = "Unknown Date";
    }
    let images = json["gallery"];
    let hasImages = images && images.length > 0;
    if(hasImages) {
        let plural = images.length === 1 ? "image" : "images";
        date += ` - ${images.length} ${plural}`;
    }
    
    
    const element = document.createElement("div")
    element.classList.add("event");
    if(hasImages) {
        element.classList.add("collapsed");
        element.innerHTML = `
    <h1>${eventName}</h1>
    <h3>${date}</h3>
    <h2 class="hide-if-collapsed">${eventDesc}</h2>
    <h2 class="show-if-collapsed">Click to expand.</h2>
`;
    } else {
        element.innerHTML = `
    <h1>${eventName}</h1>
    <h3>${date}</h3>
    <h2>${eventDesc}</h2>
`;
    }


    if (hasImages) {
        const galleryContainer = document.createElement("div");
        galleryContainer.classList.add("gallery-container");

        const gallery = document.createElement("div");
        gallery.classList.add("image-gallery", "collapsed"); // Start collapsed
        galleryContainer.appendChild(gallery);

        for (const image of images) {
            const img = document.createElement("img");
            img.src = image;
            img.alt = `Image of the event "${eventName}"`;
            gallery.appendChild(img);
        }

        element.addEventListener('click', () => {
            gallery.classList.toggle("collapsed");
            element.classList.toggle("collapsed");
        });

        element.appendChild(galleryContainer);
    }

    return element;
}
/**
 * Loads the events into the DOM.
 * @param {*} json
 */
function loadEvents(json) {
    let events = json["events"];
    events.sort((a, b) => new Date(Date.parse(b["date"])) - new Date(Date.parse(a["date"])));

    for (const eventJSON of events) {
        let element = createEventElement(eventJSON);
        eventGallery.appendChild(element);
    }
}


eventGallery = document.getElementById("event-gallery");

fetch("dynamic/events.json").then(response => {
    if(!response.ok) {
        throw new Error("Couldn't get events.json. Page will not load.");
    }
    return response.json();
}).then(data => {
    loadEvents(data)
});