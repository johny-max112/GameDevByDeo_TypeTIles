export let typedWord = "";

// Function to clear typed word
(window as any).clearTypedWord = () => {
    typedWord = "";
};

window.addEventListener("keydown", (e) => {
    if(e.key === "Backspace"){
        typedWord = typedWord.slice(0,-1);
        return;
    }

    if(e.key.length === 1 && /[a-zA-Z]/.test(e.key)){
        typedWord += e.key;
    }
});