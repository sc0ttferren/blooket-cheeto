(function() {
    var guiContainer = document.querySelector('.custom-gui');

    if (!guiContainer) {
        guiContainer = document.createElement("div");
        guiContainer.className = "custom-gui";
        guiContainer.style.position = "fixed";
        guiContainer.style.top = "20px";
        guiContainer.style.left = "20px";
        guiContainer.style.padding = "10px";
        guiContainer.style.border = "5px solid black";
        guiContainer.style.backgroundColor = "white";
        guiContainer.style.zIndex = "9999";
        guiContainer.style.cursor = "move";
        guiContainer.style.borderRadius = "10px";

        var categoryButtons = ["Global", "Crypto", "Gold"];
        var buttons = {};

        categoryButtons.forEach(category => {
            var categoryButton = document.createElement("button");
            categoryButton.textContent = category;
            categoryButton.onclick = function() {
                toggleCategory(category.toLowerCase());
            };
            guiContainer.appendChild(categoryButton);

            buttons[category.toLowerCase()] = [];
        });

        document.body.appendChild(guiContainer);

        function toggleCategory(category) {
            categoryButtons.forEach(cat => {
                var display = cat.toLowerCase() === category ? 'block' : 'none';
                buttons[cat.toLowerCase()].forEach(btn => {
                    btn.style.display = display;
                });
            });
        }

        var highlightAnswersButton = createButton("Highlight Answers", "highlightAnswers", "https://raw.githubusercontent.com/sc0ttferren/blooket-cheeto/main/global/highlightanswers.js");
        var setCryptoButton = createButton("Set Crypto", "setCrypto", "https://raw.githubusercontent.com/sc0ttferren/blooket-cheeto/main/crypto/setcrypto.js");
        var setGoldButton = createButton("Set Gold (WIP)", "setGold", "https://raw.githubusercontent.com/sc0ttferren/blooket-cheeto/main/goldquest/setgold.js");

        guiContainer.appendChild(highlightAnswersButton);
        guiContainer.appendChild(setCryptoButton);
        guiContainer.appendChild(setGoldButton);

        buttons['global'].push(highlightAnswersButton);
        buttons['crypto'].push(setCryptoButton);
        buttons['gold'].push(setGoldButton);

        // Make the GUI draggable
        var offsetX = 0, offsetY = 0;
        guiContainer.onmousedown = function(e) {
            offsetX = e.clientX - guiContainer.getBoundingClientRect().left;
            offsetY = e.clientY - guiContainer.getBoundingClientRect().top;

            document.onmousemove = function(e) {
                guiContainer.style.left = (e.clientX - offsetX) + 'px';
                guiContainer.style.top = (e.clientY - offsetY) + 'px';
            };

            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };

    } else {
        guiContainer.remove();
    }

    function createButton(text, name, scriptUrl) {
        var button = document.createElement("button");
        button.textContent = text;
        button.style.display = "none";
        button.name = name;
        button.onclick = function() {
            console.log(name + " button clicked");
            fetch(scriptUrl)
                .then(response => response.text())
                .then(script => eval(script));
        };
        return button;
    }
})();
