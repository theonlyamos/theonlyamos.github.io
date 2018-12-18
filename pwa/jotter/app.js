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
    }

    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/pwa-examples/js13kpwa/sw.js');
    };

    document.addEventListener('click', function(e){
        if (e.target.matches('.add-button')) {
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
    });




    /* app functions */

    function saveJot(){
        var content = document.getElementById("content").value;
        document.getElementById("content").value = '';
        var time = new Date().toDateString();
        var template = document.getElementById('cardTemplate');

        let jots = localStorage.getItem('jots')
        if (!jots) {
            jots = []
        }else{
            jots = JSON.parse(jots)
        }
        jots.push({"time": time, "content": content})
        
        localStorage.setItem('jots', JSON.stringify(jots))


        var card = template.cloneNode([true]);
        card.removeAttribute('hidden')
        card.removeAttribute('id')
        card.querySelector(".jot-time").textContent = time;
        card.querySelector(".jot-body").textContent = content;
        
        document.getElementById("jotsContainer").prepend(card)
    }

    function loadJots(jots){
        jots = JSON.parse(jots)
        for (let i = 0; i < jots.length; i++) {
            var jot = jots[i]
            var template = document.getElementById('cardTemplate');
            var card = template.cloneNode([true]);
            card.removeAttribute('hidden')
            card.removeAttribute('id')
            card.querySelector(".jot-time").textContent = jot.time;
            card.querySelector(".jot-body").textContent = jot.content;

            document.getElementById("jotsContainer").prepend(card)
        }
    }
})();