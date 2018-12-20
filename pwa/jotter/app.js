(function(){
    "use strict";

    window.addEventListener('load', () => {
        let jots = localStorage.getItem('jots')
        if (jots) {
            app.load(jots)
        }
        else {
            localStorage.setItem('jots', [])
        }
    })

    let app = {
        save: saveJot,
        load: loadJots,
        colors: {
            "primary": {"bg": "bg-primary", "color": "text-primary"},
            "secondary": {"bg": "bg-secondary", "color": "text-dark"},
            "info": {"bg": "bg-info", "color": "text-info"},
            "warning": {"bg": "bg-warning", "color": "text-info"},
            "danger": {"bg": "bg-danger", "color": "text-warning"},
            "dark": {"bg": "bg-dark", "color": "text-light"},
            "light": {"bg": "bg-light", "color": "text-dark"},
            "success": {"bg": "bg-success", "color": "text-light"},
        }
    }

    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/pwa-examples/js13kpwa/sw.js');
    };

    document.addEventListener('click', function(e){
        if (e.target.matches('.add-button')) {
            if (!document.getElementById("deleteButton").classList.contains("invisible")){
                document.getElementById("deleteButton").classList.toggle('invisible')
            }
            var editor = document.getElementById('editor');
            editor.style.display = 'flex'
            return;
        }
        else if (e.target.matches('#cancelButton')) {
            var editor = document.getElementById('editor');
            editor.style.display = 'none'
            return;
        }
        else if (e.target.matches('#saveButton')) {
            app.save()
            var editor = document.getElementById('editor');
            editor.style.display = 'none'
            return;
        }
        else if (e.target.matches('#editor')) {
            var editor = document.getElementById('editor');
            editor.style.display = 'none'
            return;
        }
        else if (e.target.matches('.jot-body')) {
            var parent = getClosest(e.target, '.card')
            for (let i = 0; i<parent.classList.length; i++){
                if (parent.classList[i].indexOf('bg-') > -1){
                    var c = parent.classList[i]
                }
            }
            document.getElementById("content").value = e.target.textContent;
            var time = parent.querySelector('.jot-time').textContent;
            if (document.getElementById("deleteButton").classList.contains("invisible")){
                document.getElementById("deleteButton").classList.toggle('invisible')
            }
            var editor = document.getElementById('editor');
            editor.setAttribute("data-index", parent.getAttribute("data-index"))
            editor.style.display = 'flex'
        }
        else if (e.target.matches("#color-tool")) {
            var colors = e.target.getAttribute("data-colors")
            var editor = document.getElementById('editor');
            editor.setAttribute("data-colors", colors)
        }
    });





    /* app functions */
    function getClosest (elem, selector) {
        for ( ; elem && elem !== document; elem = elem.parentNode ) {
            if ( elem.matches( selector ) ) return elem;
        }
        return null;
    };

    function saveJot(){
        var editor = document.getElementById('editor');
        var content = document.getElementById("content").value;
        document.getElementById("content").value = '';
        var time = new Date().toGMTString();
        var colors = editor.getAttribute("data-colors")
        let jots = localStorage.getItem('jots')
        if (!jots) {
            jots = []
        }else{
            jots = JSON.parse(jots)
        }
        
        if (editor.hasAttribute("data-index")){
            
            var index = parseInt(editor.getAttribute("data-index"))
            console.log(jots, index)
            var jot = jots[index]
            jot.time = time
            jot.content = content
            jot.colors = colors

            jots[index] = jot
            localStorage.setItem("jots", JSON.stringify(jots))
            jots = localStorage.getItem("jots")

            app.load(jots)
        }
        else {
            var template = document.getElementById('cardTemplate');

            
            jots.push({"time": time, "content": content, "colors": colors})
            
            localStorage.setItem('jots', JSON.stringify(jots))


            var card = template.cloneNode([true]);
            card.removeAttribute('hidden')
            card.removeAttribute('id')
            card.classList.add(bg)
            card.querySelector(".jot-time").textContent = time;
            card.querySelector(".jot-body").textContent = content;
            
            document.getElementById("jotsContainer").prepend(card)
        }
    }

    function loadJots(jots){
        jots = JSON.parse(jots)
        document.getElementById("jotsContainer").innerHTML = ""
        for (let i = 0; i < jots.length; i++) {
            var jot = jots[i]
            var template = document.getElementById('cardTemplate');
            var card = template.cloneNode([true]);
            card.removeAttribute('hidden')
            card.removeAttribute('id')
            card.setAttribute("data-index", i)
            if (jot.hasOwnProperty("colors")) {
                card.classList.add(app.colors[jot.colors].bg)
                card.querySelector(".jot-time").classList.add(app.colors[jot.colors].color)
                card.querySelector(".jot-body").classList.add(app.colors[jot.colors].color)
            }
            card.querySelector(".jot-time").textContent = jot.time;
            card.querySelector(".jot-body").textContent = jot.content;

            document.getElementById("jotsContainer").prepend(card)
        }
    }
})();