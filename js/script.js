document.addEventListener("DOMContentLoaded", () => {


    //Crazy code for loading all different user facing text
    
    const goWriterElement = document.getElementById("go-writer");
    if (goWriterElement) {
        goWriterElement.textContent = messages.goWriter;
    }

    const goReaderElement = document.getElementById("go-reader");
    if (goReaderElement) {
        goReaderElement.textContent = messages.goReader;
    }

    const labNumElement = document.getElementById("lab-num");
    if (labNumElement) {
        labNumElement.textContent = messages.labNum;
    }

    const myNameElement = document.getElementById("my-name");
    if (myNameElement) {
        myNameElement.textContent = messages.myName;
    }

    const saveTimeElement = document.getElementById("save-time");
    if (saveTimeElement) {
        saveTimeElement.textContent = `${messages.save}: ${messages.nev}`;
    }

    const fetchTimeElement = document.getElementById("fetch-time");
    if (fetchTimeElement) {
        fetchTimeElement.textContent = `${messages.ret}: ${messages.nev}`;
    }

    const backToElement = document.getElementById("back-to");
    if (backToElement) {
        backToElement.textContent = messages.back;
    }

    const addNoteElement = document.getElementById("add-note");
    if (addNoteElement) {
        addNoteElement.textContent = messages.add;
    }

    //Change title based on path
    const pathname = window.location.pathname.toLowerCase();
    if (pathname.includes("writer")) {
        document.title = `${messages.writer} - ${messages.labNum}`;
        setupWriter();
    } else if (pathname.includes("reader")) {
        document.title = `${messages.reader} - ${messages.labNum}`;
        setupReader();
    } else {
        document.title = messages.labNum;
    }
});

//Setup writer page
function setupWriter() {
    // load writer elements
    const container = document.getElementById("notes-container");
    const addNoteButton = document.getElementById("add-note");
    const saveTime = document.getElementById("save-time");

   

    // Load existing notes
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    renderNotes();

    addNoteButton.addEventListener("click", () => {
        notes.push("");

        renderNotes();
    });

    // Save notes to localStorage every 2 seconds
    setInterval(() => {
        const textareas = document.querySelectorAll("#notes-container textarea");
        notes = Array.from(textareas).map((textarea) => textarea.value);
        localStorage.setItem("notes", JSON.stringify(notes));
        saveTime.textContent = `${messages.save}: ${new Date().toLocaleTimeString()}`;
    }, 2000);

    //function to load all notes
    function renderNotes() {

        container.innerHTML = "";
        
        //Create boxes for notes
        notes.forEach((note, index) => {
            const noteDiv = document.createElement("div");
            const textarea = document.createElement("textarea");
            const removeButton = document.createElement("button");

            textarea.value = note;
            textarea.addEventListener("input", () => {
                notes[index] = textarea.value;
            });

            removeButton.textContent = messages.rem;
            removeButton.addEventListener("click", () => {
                notes.splice(index, 1);
                renderNotes();
            });

            noteDiv.appendChild(textarea);
            noteDiv.appendChild(removeButton);
            container.appendChild(noteDiv);
        });
    }
}

//Setup reader page
function setupReader() {
    const container = document.getElementById("notes-container");
    const fetchTime = document.getElementById("fetch-time");

    function fetchNotes() {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        container.innerHTML = notes
            .map((note) => `<div class="note">${note}</div>`)
            .join("");
        fetchTime.textContent = `${messages.ret}: ${new Date().toLocaleTimeString()}`;
    }

    setInterval(fetchNotes, 2000);
    fetchNotes();
}
