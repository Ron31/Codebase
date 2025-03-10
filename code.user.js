// ==UserScript==
// @name         ReSi-Codebase BETA
// @version      1.4.2
// @description  Erweitert viele Funktionen und fügt neue hinzu. Das alle kostenlos in einem Browsergamne!
// @author       NiZi112
// @match        https://rettungssimulator.online/
// @include      www.rettungssimulator.online
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @updateURL    https://github.com/NiZi112/Codebase/raw/main/code.user.js
// @downloadURL  https://github.com/NiZi112/Codebase/raw/main/code.user.js
// @grant        GM_addStyle
/* global $ sounds openFrame socket systemMessage */
// ==/UserScript==

(function () {
    'use strict';
    const css = `
    <style>
    .codebase:focus{
      outline: none;
    }
    </style>`;
    const head = document.head || $("head:first");
    $(head).append(css);
    let storage;
    //Start Storage-Abfrage
    if (!localStorage.getItem('storage_resi_base')) {
        localStorage.setItem(
            'storage_resi_base',
            JSON.stringify({
                toplist: false,
                gesamtmuenzen: false,
                einsatzzealer: false,
                einsatzliste_max: false,
                flogout: false,
                autocomplete: false,
                streamer: false,
                sounds: false,
                einsatzzaeler: false,
                chat_alarm: false,
                push_fms: false,
                zeitwechsel: false,
                uhr: false,
                settings: false,
                chat_count: false,
                alert_chat: false,
                greet_user: false,
            })
        );
        systemMessage({
            title: 'Willkommen bei der ReSi-Codebase!',
            message: `Schön, dass Du dich entschlossen hast, die ReSi-Codebase zu nutzen!<br><br>
            Du kannst jeden Modul einzeln aktivieren, die Möglichkeit findest Du in einem Einstellungs-Panel, welches Du über die Seitenleiste aufrufen kannst.<br>
            Probier doch einfach mal alle Module aus. Wenn Du nicht weißt, was ein Modul tut, dann klick einfach auf das [?] hinter dem Namen, damit kommst Du zur Wikiseite des Moduls.<br><br>
            Fehler bitte im Forum melden - oder im Thread ReSi-Codebase auf Discord im Bereich <code>#skripting</code><br><br>
            Viel Spaß,<br>
            Dein Team der ReSi-Codebase`,
            type: 'info'
        });
    } else {
        storage = JSON.parse(localStorage.storage_resi_base);
        var toplist_aktiv = storage.toplist;
        var gesamtmuenzen_aktiv = storage.gesamtmuenzen;
        var einsatzliste_max_aktiv = storage.einsatzliste_max;
        var flogout_aktiv = storage.flogout;
        var autocomplete_aktiv = storage.autocomplete;
        var sounds_aktiv = storage.sounds;
        var streamer_aktiv = storage.streamer;
        var chat_alarm_aktiv = storage.chat_alarm;
        var push_fms_aktiv = storage.push_fms;
        var zeitwechsel_aktiv = storage.zeitwechsel;
        var uhr_aktiv = storage.uhr;
        var einsatzzaehler_aktiv = storage.einsatzzaeler;
        var settings = storage.settings;
        var chat_count_aktiv = storage.chat_count;
        var alert_chat_aktiv = storage.alert_chat;
        var greet_user_aktiv = storage.greet_user
        }
    if (!localStorage.getItem('chat_alarm_audio_resi_base'))
        localStorage.setItem('chat_alarm_audio_resi_base', '');

    if (!localStorage.getItem('newCall_audio_resi_base'))
        localStorage.setItem('newCall_audio_resi_base', '');

    if (!localStorage.getItem('fms_audio_resi_base'))
        localStorage.setItem('fms_audio_resi_base', '');

    if (!localStorage.getItem('fms5_audio_resi_base'))
        localStorage.setItem('fms5_audio_resi_base', '');

    if (!localStorage.getItem('error_audio_resi_base'))
        localStorage.setItem('error_audio_resi_base', '');

    if (!localStorage.getItem('stream_text_resi_base')) {
        localStorage.setItem(
            'stream_text_resi_base',
            'Es handelt sich um ein Spiel mit fiktiven Einsätzen, es sind keine echten Szenarien!'
        );
    }
    if (!localStorage.getItem('finish_audio_resi_base'))
        localStorage.setItem('finish_audio_resi_base', '');

    if (!localStorage.getItem('uhr_min_resi_base'))
        localStorage.setItem('uhr_min_resi_base', '7');

    if (!localStorage.getItem('uhr_max_resi_base'))
        localStorage.setItem('uhr_max_resi_base', '19');

    if ($('#darkMode').html().includes('Tag'))
        localStorage.setItem('darkmode_resi_base', 'true');
    else localStorage.setItem('darkmode_resi_base', 'false');

    const btn = document.getElementById('darkMode');
    btn.addEventListener('click', () => {
        if (localStorage.getItem('darkmode_resi_base') == 'true')
            localStorage.setItem('darkmode_resi_base', 'false');
        else localStorage.setItem('darkmode_resi_base', 'true');
    });
    //Ende Storage-Abfrage
    //Start eigener Frame
    const listenelement = document.createElement('li');
    const vater = $('#darkMode');
    vater.after(listenelement);
    listenelement.innerHTML = 'ReSi-Codebase';
    listenelement.id='Codebase'
    if(settings) $(".brand").after(`<i class="fas fa-cogs codebase" focusable="false" data-tooltip="ReSi-Codebase-Einstellungen" onclick="$('#Codebase').click()"></i>`);
    $(listenelement).on('click', () => {
        openFrame('', '1/1/4/5');
        const frame = $('#iframe');
        frame.on('load', () => {
            frame.contents().find('body').append(`<div class='panel-body'>
            <script src='https://rettungssimulator.online/js/jquery-3.5.0.min.js'></script>
            <link rel='stylesheet' href='css/index.css?v=0.6a' charset='utf-8'>
            <script src='https://rettungssimulator.online/js/index.js?v=0.6.1e'></script>
            <script src='https://rettungssimulator.online/js/iframe.js?new=true&v=0.6.1e'></script>
            <script src='https://rettungssimulator.online/js/controlCenter.js?v=0.6.1e'></script>
            <script src='https://rettungssimulator.online/js/tippy.js?v=0.6.1e'></script>
            <script>
            if(localStorage.getItem('darkmode_resi_base')=='true'){document.getElementsByTagName('body')[0].classList.add('dark');}
            var changes = false;
            $('.checkbox-container').on('click', function(){
              changes = true;
            })
            $('.input-round').on('keydown', function(){
              changes = true;
            })
            const speichern = function(){
              gesamtmuenzen_aktiv = document.getElementById('gesamtmuenzen_check').checked;
              toplist_aktiv = document.getElementById('toplist_check').checked;
              einsatzliste_max_aktiv = document.getElementById('einsatzliste_max_check').checked;
              flogout_aktiv = document.getElementById('flogout_check').checked;
              autocomplete_aktiv = document.getElementById('autocomplete_check').checked;
              streamer_aktiv = document.getElementById('streamer_check').checked;
              sounds_aktiv = document.getElementById('sounds_check').checked;
              chat_alarm_aktiv = document.getElementById('chat_alarm_check').checked;
              einsatzzaehler_aktiv = document.getElementById('einsatzaehler_check').checked;
              push_fms_aktiv = document.getElementById('push_fms_check').checked;
              zeitwechsel_aktiv = document.getElementById('zeitwechsel_check').checked;
              uhr_aktiv = document.getElementById('uhr_check').checked;
              settings_aktiv = document.getElementById('settings_check').checked;
              chat_count_aktiv = document.getElementById('chat_count_check').checked;
              alert_chat_aktiv = document.getElementById('alert_chat_check').checked;
              greet_user_aktiv = document.getElementById('greet_user_check').checked;
              localStorage.setItem("storage_resi_base", JSON.stringify({'toplist': toplist_aktiv, 'gesamtmuenzen': gesamtmuenzen_aktiv, 'einsatzzealer': einsatzzaehler_aktiv, 'einsatzliste_max': einsatzliste_max_aktiv, 'flogout': flogout_aktiv, 'autocomplete': autocomplete_aktiv, 'streamer': streamer_aktiv, 'sounds': sounds_aktiv, 'einsatzzaeler': einsatzzaehler_aktiv, 'chat_alarm': chat_alarm_aktiv, 'push_fms': push_fms_aktiv, 'zeitwechsel': zeitwechsel_aktiv, 'uhr': uhr_aktiv, 'chat_count': chat_count_aktiv, 'settings': settings_aktiv, 'alert_chat':alert_chat_aktiv, 'greet_user': greet_user_aktiv}));
              const sound_input_chat = $('#sound_chat_input').val();
              localStorage.setItem('chat_alarm_audio_resi_base', valide(sound_input_chat));
              const sound_input_fms = $('#sound_fms_input').val();
              localStorage.setItem('fms_audio_resi_base', valide(sound_input_fms));
              const sound_input_fms5 = $('#sound_fms5_input').val();
              localStorage.setItem('fms5_audio_resi_base', valide(sound_input_fms5));
              const sound_input_error = $('#sound_error_input').val();
              localStorage.setItem('error_audio_resi_base', valide(sound_input_error));
              const sound_input_newCall = $('#sound_newCall_input').val();
              localStorage.setItem('newCall_audio_resi_base', valide(sound_input_newCall));
              const sound_input_finish = $('#sound_finish_input').val();
              localStorage.setItem('finish_audio_resi_base', valide(sound_input_finish));
              const text_input_stream = $('#text_stream_input').val();
              localStorage.setItem('stream_text_resi_base', valide(text_input_stream));
              const uhr_min_input = $('#uhr_min_input').val();
              localStorage.setItem('uhr_min_resi_base', valide(uhr_min_input));
              const uhr_max_input = $('#uhr_max_input').val();
              localStorage.setItem('uhr_max_resi_base', valide(uhr_max_input));
              window.top.location.reload()
            };
            storage = JSON.parse(localStorage.storage_resi_base);
            let toplist_aktiv = storage.toplist;
            let gesamtmuenzen_aktiv = storage.gesamtmuenzen;
            let einsatzliste_max_aktiv = storage.einsatzliste_max;
            let flogout_aktiv = storage.flogout;
            let autocomplete_aktiv = storage.autocomplete;
            let sounds_aktiv = storage.sounds;
            var streamer_aktiv = storage.streamer;
            var chat_alarm_aktiv = storage.chat_alarm;
            var push_fms_aktiv = storage.push_fms;
            var zeitwechsel_aktiv = storage.zeitwechsel;
            var uhr_aktiv = storage.uhr;
            var einsatzzaehler_aktiv = storage.einsatzzaeler;
            var chat_count_aktiv = storage.chat_count;
            var settings_aktiv = storage.settings;
            var alert_chat_aktiv = storage.alert_chat;
            var greet_user_aktiv = storage.greet_user;
            if(toplist_aktiv){$('#toplist_check').attr('checked', true);}
            if(gesamtmuenzen_aktiv){$('#gesamtmuenzen_check').attr('checked', true);}
            if(flogout_aktiv){$('#flogout_check').attr('checked', true);}
            if(einsatzliste_max_aktiv){$('#einsatzliste_max_check').attr('checked', true);}
            if(streamer_aktiv){$('#streamer_check').attr('checked', true);}
            if(autocomplete_aktiv){$('#autocomplete_check').attr('checked', true);}
            if(einsatzzaehler_aktiv){$('#einsatzaehler_check').attr('checked', true);}
            if(chat_alarm_aktiv){$('#chat_alarm_check').attr('checked', true);}
            if(push_fms_aktiv){$('#push_fms_check').attr('checked', true);}
            if(zeitwechsel_aktiv){$('#zeitwechsel_check').attr('checked', true);}
            if(uhr_aktiv){$('#uhr_check').attr('checked', true);}
            if(sounds_aktiv){$('#sounds_check').attr('checked', true);}
            if(chat_count_aktiv){$('#chat_count_check').attr('checked', true);}
            if(settings_aktiv){$('#settings_check').attr('checked', true);}
            if(alert_chat_aktiv){$('#alert_chat_check').attr('checked', true);}
            if(greet_user_aktiv){$('#greet_user_check').attr('checked', true);}
            $('#uhr_min_input').val(parseInt(localStorage.getItem('uhr_min_resi_base')));
            $('#uhr_max_input').val(parseInt(localStorage.getItem('uhr_max_resi_base')));
            $('#sound_newCall_input').val(localStorage.getItem('newCall_audio_resi_base'));
            $('#sound_error_input').val(localStorage.getItem('error_audio_resi_base'));
            $('#sound_fms_input').val(localStorage.getItem('fms_audio_resi_base'));
            $('#sound_fms5_input').val(localStorage.getItem('fms5_audio_resi_base'));
            $('#sound_finish_input').val(localStorage.getItem('finish_audio_resi_base'));
            $('#text_stream_input').val(localStorage.getItem('stream_text_resi_base'));
            $('#text_chat_input').val(localStorage.getItem('chat_alarm_audio_resi_base'));
            const valide = value => value.replace(/<>/g, '');
            $('body').on('keyup', function(e){if(e.keyCode===27){$(".right").click();}});
            </script>
            <div class='detail-header'>
            <div class='detail-title'>ReSi-Codebase <div class='right' onclick='if(changes === true){modal("Ohne Speichern verlassen?", "Du hast Änderungen vorgenommen, willst du diese Seichern?", "Speichern", "Ohne speichern verlassen", speichern, cancel = function(){window.parent.closeFrame()})}else{window.parent.closeFrame()}'> X </div></div>
            <div class='detail-subtitle'>Verwalte hier deine Einstellungen für die ReSi-Codebase</div>
            </div>
            <div class='tabs tabs-horizotal'>
            <div class='tab tab-active' for='settings-moduls'>Module</div>
            <div class='tab' for='settings-inputs'>Texte & URL's</div>
            <div class='tab' for='licence'>Sonstiges & Lizenzen</div>
            </div>
            <div class='tab-container'>
            <div class='tab-content tab-content-active' id='tab_settings-moduls'>
            <h2>Module:</h2>
            <div class='checkbox-container'><input id='gesamtmuenzen_check' type='checkbox'><label for='gesamtmuenzen_check'>Gesamtmünzenzähler aktivieren<a class='no-prevent' href='https://github.com/Notme112/Codebase/wiki/Gesamtm%C3%BCnzenz%C3%A4hler' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input id='toplist_check' type='checkbox'><label for='toplist_check'>Topliste aktivieren<a class='no-prevent' href='https://github.com/Notme112/Codebase/wiki/Toplist-Position' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input id='einsatzliste_max_check' type='checkbox'><label for='einsatzliste_max_check'>Maximierte Einsatzliste aktivieren<a class='no-prevent' href='https://github.com/Notme112/Codebase/wiki/Maximierte-Einsatzliste' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input id='flogout_check' type='checkbox'><label for='flogout_check'>FastLogout aktivieren<a class='no-prevent' href='https://github.com/Notme112/Codebase/wiki/Flogout' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input id='streamer_check' type='checkbox'><label for='streamer_check'>Eigenen Streammode-Text aktivieren<a class='no-prevent' href='https://github.com/Notme112/Codebase/wiki/Eigener-Streammode-Text' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input id='sounds_check' type='checkbox'><label for='sounds_check'>Eigene Sounds aktivieren<a class='no-prevent' href='https://github.com/Notme112/Codebase/wiki/Eigene-Sounds' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input id='autocomplete_check' type='checkbox'><label for='autocomplete_check'>Autocomplet verhindern aktivieren<a class='no-prevent' href='https://github.com/Notme112/Codebase/wiki/Autocomplete-verhindern' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input id='einsatzaehler_check' type='checkbox'><label for='einsatzaehler_check'>Einsatzzähler aktivieren<a class='no-prevent' href='https://github.com/Notme112/Codebase/wiki/Einsatzz%C3%A4hler' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input id='chat_alarm_check' type='checkbox'><label for='chat_alarm_check'>Chat-Alarm aktivieren<a class='no-prevent' href='https://github.com/Notme112/Codebase/wiki/Chat-Alarm' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input type='checkbox' id='push_fms_check'><label for='push_fms_check'>Push-FMS5 aktivieren<a class='no-prevent' href='https://github.com/Notme112/Codebase/wiki/Push-FMS5' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input type='checkbox' id='zeitwechsel_check'><label for='zeitwechsel_check'>Wechsel in den Darkmode nach Uhrzeit aktivieren<a class='no-prevent' href='https://github.com/Notme112/Codebase/wiki/Darkmode-nach-Uhrzeit' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input type='checkbox' id='uhr_check' ><label for='uhr_check'>Uhr aktivieren<a class='no-prevent' href='https://github.com/Notme112/Codebase/wiki/Uhr' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input type='checkbox' id='settings_check' ><label for='settings_check'>Einstellungen über die Navbar aktivieren<a class='no-prevent' href='https://github.com/Notme112/Codebase/wiki/Settings-Modul' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input type='checkbox' id='chat_count_check' ><label for='chat_count_check'>Chat-Count aktivieren<a class='no-prevent' href='https://github.com/Notme112/Codebase/wiki/Chat-Count' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input type='checkbox' id='alert_chat_check' ><label for='alert_chat_check'>Chat mit Popup in der Ecke anzeigen aktivieren<a class='no-prevent' href='https://github.com/Notme112/Codebase/wiki/Alert-Chat' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input type='checkbox' id='greet_user_check' ><label for='greet_user_check'>Begrüßung durch das System aktivieren<a class='no-prevent' href='https://github.com/Notme112/Codebase/wiki/Greet-User' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <button class='button-success button button-round' onclick='speichern()'>Speichern</button>
            </div>
            <div class='tab-content' id='tab_settings-inputs'>
            <h2>Texte & URL's:</h2>
            <h3>Eigene Sounds:</h3>
            <div class='input-container'><div class='input-label'>Neuer-Anruf-Sound (URL)</div><div class='input-icon'></div><input class='input-round' autocomplete='off' id='sound_newCall_input' placeholder='Link'></div>
            <div class='input-container'><div class='input-label'>FMS-Sound (URL)</div><div class='input-icon'></div><input class='input-round' autocomplete='off' id='sound_fms_input' placeholder='Link'></div>
            <div class='input-container'><div class='input-label'>FMS-5-Sound (URL)</div><div class='input-icon'></div><input class='input-round' autocomplete='off' id='sound_fms5_input' placeholder='Link'></div>
            <div class='input-container'><div class='input-label'>Mission-fertiggestellt-Sound (URL)</div><div class='input-icon'></div><input class='input-round' autocomplete='off' id='sound_finish_input' placeholder='Link'></div>
            <div class='input-container'><div class='input-label'>Error-Alarm-Sound (URL)</div><div class='input-icon'></div><input class='input-round' autocomplete='off' id='sound_error_input' placeholder='Link'></div>
            <h3>Streammode-Text:</h3>
            <div class='input-container'><div class='input-label'>Streammode-Text (TEXT)</div><div class='input-icon'></div><input class='input-round' autocomplete='off' id='text_stream_input' placeholder='Link'></div>
            <h3>Chat-Alarm:</h3>
            <div class='input-container'><div class='input-label'>Chat-Alarm-Sound (URL)</div><div class='input-icon'></div><input class='input-round' autocomplete='off' id='sound_chat_input' placeholder='Link'></div>
            <h3>Darkmode nach Zeit:</h3>
            <div class='input-container'><div class='input-label'>Darkmode ausschalten um ... Uhr (ZAHL)</div><div class='input-icon'></div><input class='input-round' autocomplete='off' id='uhr_min_input' type='number'></div>
            <div class='input-container'><div class='input-label'>Darkmode einschalten um ... Uhr (ZAHL)</div><div class='input-icon'></div><input class='input-round' autocomplete='off' id='uhr_max_input' type='number'></div><br>
            <button class='button-success button button-round' onclick='speichern()'>Speichern</button>
            </div>
            <div class='tab-content' id='tab_licence'>
            <h2>Fehler melden:</h2>
            <p>
            <a href='https://github.com/Notme112/Codebase/issues/new?assignees=NiZi112&labels=bug&template=bugs---fehler.md&title=BUG%3A+' class='no-prevent button button-success button-round' target='_blank'>Github</a> - <a href='https://forum.rettungssimulator.online/index.php?thread/1423-resi-codebase-v1-0/&action=lastPost' class='no-prevent button button-success button-round' target='_blank'>Forum</a> - Discord: im Thread ReSi-Codebase im Bereich <code>#skripting</code>
            <h3>Vielen Danke für deine Mithilfe!</h3>
            </p>
            <h2>Open-Source:</h2>
            <p>
            Icons:
            Icons by <a href='https://fontawesome.com/' target='_blank' class='no-prevent'><u>Fontawesome</u></a> unter <a href='https://creativecommons.org/licenses/by/4.0/' target='_blank'><u>CC-BY 4.0-Lizenz</u></a>.
            </p>
            <p>
            JQuery:
            Copyright (c) 2021 OpenJS Foundation and other contributors, https://openjsf.org/, <br>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
            <br>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.<br>
            THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
            </p>
            </div>
            </div>
            <h3>Danke für die Nutzung der ReSi-Codebase!</h3>
            </div>`);
            frame.off('load');
        });
    });
    //Ende eigener Frame
    //Start function-definding
    const gesamtmuenzenanzeiger = function () {
        $.ajax({
            url: '/api/user',
            dataType: 'json',
            type: 'GET',
            success(r) {
                $('#darkMode').after(
                    `<li>${r.muenzenTotal.toLocaleString()} Münzen</li>`
                );
            },
        });
    };
    const einsatzliste_max = function () {
        $('.panel-expand').children().eq(0).click();
    };
    const flogout = function () {
        const platz = document.getElementsByClassName('brand-img')[0];
        platz.style.display = 'inline';
        platz.style.paddingRight = '20px';
        platz.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
        platz.addEventListener('click', () => {
            $.ajax({
                url: '/api/deauthenticate',
                type: 'GET',
                success() {
                    window.location.reload();
                },
            });
        });
    };
    const autocomplete = function () {
        $('#chatInput').attr('autocomplete', 'off');
        $('#newMissionNameInput').attr('autocomplete', 'off');
        $('#newNameInput').attr('autocomplete', 'off');
        $('#newMissionRoadInput').attr('autocomplete', 'off');
        $('#newMissionHousenumberInput').attr('autocomplete', 'off');
        $('#newMissionCityInput').attr('autocomplete', 'off');
    };
    const streamerinfos = function () {
        const text = `<div class='panel-headline'>Streamer-Modus</div><p class='label label-info'>${localStorage.getItem(
            'stream_text_resi_base'
        )}</p>`;
        $('#chat').html(text);
    };
    const toplist = function () {
        if (sessionStorage.getItem('topliste_nizi') === null) {
            $.ajax({
                url: '/api/user',
                dataType: 'json',
                type: 'GET',
                success(res) {
                    document.getElementsByClassName(
                        'frame-opener'
                    )[5].innerHTML = `Topliste: ${res.toplistRank}`;
                },
            });
        }
    };
    const custom_sounds = function () {
        const audioElement_fms = new Audio(
            localStorage.getItem('fms_audio_resi_base')
        );
        sounds.radioFMS = audioElement_fms;
        const audioElement_call = new Audio(
            localStorage.getItem('newCall_audio_resi_base')
        );
        sounds.newCall = audioElement_call;
        const audioElement_fms5 = new Audio(
            localStorage.getItem('fms5_audio_resi_base')
        );
        sounds.radioFMS = audioElement_fms5;
        const audioElement_mission = new Audio(
            'https://rettungssimulator.online/sounds/newCall.mp3'
        );
        sounds.finishedMission = audioElement_mission;
        const audioElement_error = new Audio(
            localStorage.getItem('error_audio_resi_base')
        );
        sounds.error = audioElement_error;
    };
    const chat_alarm = function () {
        socket.on('associationMessage', () => {
            const audio_chat = new Audio(
                localStorage.getItem('chat_alarm_audio_resi_base')
            );
            audio_chat.play();
        });
    };
    const einsatzzaehler = function () {
        const datum = new Date();
        const datum_heute = datum.getDate();
        if (!localStorage.getItem('finished_missions_nizi'))
            localStorage.setItem('finished_missions_nizi', '0');

        if (!localStorage.getItem('finished_missions_nizi_time'))
            localStorage.setItem('finished_missions_nizi_time', datum_heute);

        if (localStorage.getItem('finished_missions_nizi_time') != datum_heute)
            localStorage.setItem('finished_missions_nizi', '0');

        if (localStorage.getItem('finished_missions_nizi_time') != datum_heute)
            localStorage.setItem('finished_missions_nizi_time', datum_heute);

        const neue_liste = document.createElement('li');
        neue_liste.innerHTML = `Einsätze heute: ${localStorage.finished_missions_nizi}`;
        $('#darkMode').after(neue_liste);
        socket.on('finishMission', () => {
            let mission = localStorage.finished_missions_nizi;
            mission++;
            localStorage.finished_missions_nizi = mission;
            neue_liste.innerHTML = `Einsätze heute: ${mission}`;
        });
    };
    const push_fms = function () {
        function notifyMe() {
            let news = false;
            if (Notification.permission === 'granted') {
                news = true;
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission((permission) => {
                    if (permission === 'granted') news = true;
                });
            }
            return news;
        }
        notifyMe();

        socket.on('vehicleFMS', (vehicleFMSObject) => {
            const fmsType = `${vehicleFMSObject.userVehicleFMS}`;
            if (fmsType.includes('5')) {
                new Notification('Sprechwunsch!', {
                    body: `Dein Fahrzueg ${vehicleFMSObject.userVehicleFMS} im Rettungssimulator hat einen Sprechwunsch! Bitte bearbeite diesen!`,
                });
            }
        });
    };
    const zeitwechsel = function () {
        const check = function () {
            const min = parseInt(localStorage.getItem('uhr_min_resi_base'));
            const max = parseInt(localStorage.getItem('uhr_max_resi_base'));
            const date = new Date();
            const tag = $('#darkMode').html();
            if (
                min < date.getHours() &&
                max > date.getHours() &&
                tag.includes('Tag')
            )
                $('#darkMode').click();
            else if (
                min > date.getHours() ||
                (max < date.getHours() && tag.includes('Nacht'))
            )
                $('#darkMode').click();
        };
        setInterval(check(), 3000);
    };
    const uhr = function () {
        const divElement = document.createElement('div');
        document.getElementsByClassName('brand')[0].after(divElement);
        const aktualisieren = function () {
            const date = new Date();
            const stunde = date.getHours();
            let minute = date.getMinutes();
            let sekunde = date.getSeconds();
            if (sekunde < 10) sekunde = `0${sekunde}`;

            if (minute < 10) minute = `0${minute}`;

            divElement.innerHTML = `${stunde} : ${minute} Uhr`;
        };
        setInterval(aktualisieren, 50);
    };
    function chat_count(){
        $("#chatInput").css("width", "85%");
        $("#chatInput").after(`&nbsp;<span class="label label-success" id="chracktarsChatCount" style="width: 12%">000</span>`);
        function countCharackters(){
            var charackters = $("#chatInput").val().length;
            if(charackters < 10){
                charackters = "00" + charackters
            }else if(charackters < 100){
                charackters = "0" + charackters
            }else{charackters = charackters
                 };
            $("#chracktarsChatCount").html(charackters);
            if(charackters > 300){
                $("#chracktarsChatCount").addClass("label-danger");
                $("#chracktarsChatCount").removeClass("label-success");
            }else{
                $("#chracktarsChatCount").addClass("label-success");
                $("#chracktarsChatCount").removeClass("label-danger");
            }
        };
        $("#chatInput").on("keyup", countCharackters);
        $("#chatInput").on("change", countCharackters);
        $("#chatForm").on("submit", countCharackters);
    };
    function alertChat(){
        socket.on("associationMessage", (msg) =>{
            if(msg.message && msg.userName != $(".username .frame-opener").html()){
                systemMessage({
                    'title':`${msg.userName}`,
                    'message':`${msg.message}`,
                    'type':'info'
                });
            }
        });
    };
    function greetUser(){
        systemMessage({
            'title':'Willkommen!',
            'message':`Hallo ${$(".username").text()}, du hast ${parseInt($(".call-next").text()) + 1} offene Anrufe. Es gibt ${$(".mission-list-icon-1").length} rote Einsätze!`,
            'type':'info'
        });
    };
    //Ende function-definding
    //Start ausführen
    if (toplist_aktiv === true) toplist();

    if (gesamtmuenzen_aktiv === true) gesamtmuenzenanzeiger();

    if (flogout_aktiv === true) flogout();

    if (autocomplete_aktiv === true) autocomplete();

    if (streamer_aktiv === true) streamerinfos();

    if (einsatzliste_max_aktiv === true) einsatzliste_max();

    if (sounds_aktiv === true) custom_sounds();

    if (chat_alarm_aktiv === true) chat_alarm();

    if (einsatzzaehler_aktiv === true) einsatzzaehler();

    if (push_fms_aktiv === true) push_fms();

    if (zeitwechsel_aktiv === true) zeitwechsel();

    if (uhr_aktiv === true) uhr();

    if(chat_count_aktiv) chat_count();

    if(greet_user_aktiv) greetUser();

    if(alert_chat_aktiv) alertChat();

    console.log(`Running ReSi-Codebase in Version 1.4.2!
- Topliste: ${toplist_aktiv};
- Gesamtmünzen: ${gesamtmuenzen_aktiv};
- Flogout: ${flogout_aktiv};
- Autocomplete: ${autocomplete_aktiv};
- Streamer: ${streamer_aktiv};
- Einsatzliste: ${einsatzliste_max_aktiv};
- Sounds: ${sounds_aktiv};
- Chat-Alarm: ${chat_alarm_aktiv};
- Einsatzzähler: ${einsatzzaehler_aktiv};
- Push-FMS: ${push_fms_aktiv};
- Uhr: ${uhr_aktiv};
- Darkmode nach Zeit: ${zeitwechsel_aktiv};
- Chat-Count: ${chat_count_aktiv};
- Settings: ${settings};
- Alert Chat: ${alert_chat_aktiv};
- Begrüßung: ${greet_user_aktiv};
Das Team der Codebase wünscht viel Spaß!
Bei Fehlern, kopiere bitte diesen Text und füg ihn in deine Fehlermeldung ein!
Der Text enthält wichtige Informationenn zu deinen verwendeten Modulen!;`);
    //Ende auführen
})();
