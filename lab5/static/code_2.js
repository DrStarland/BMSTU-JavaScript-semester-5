"use strict";

window.onload = function() {
    const f1 = document.getElementById("mail-field");

    // button
    const btn = document.getElementById("read-btn");

    // label
    const label = document.getElementById("result-label");

    // ajax get
    function ajaxGet(urlString, callback) {
        let r = new XMLHttpRequest();
        r.open("GET", urlString, true);
        r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        r.send(null);
        r.onload = function() {
            callback(r.response);
        }
    };

    // click event
    btn.onclick = function() {
        const mail = f1.value;
        const url = `/base/read?mail=${mail}`;
        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            const result = objectAnswer.result;
            label.innerHTML = `Ответ: ${result}.`;
        });
    };
};