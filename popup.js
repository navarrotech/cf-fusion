/* Save Page Button */
var e, r, f=false;
let saveCFpage = document.getElementById('saveCFpage');
saveCFpage.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.querySelector(".editorHelpTopBar div[data-editor=\'save\']").click();'});
  });
  think(saveCFpage);
};
function think(el){
    if(!f){
        r = el.innerHTML; 
        el.innerHTML = "<img src='images/thinking.png' class='thinking' alt/>";

        e = el;
        setTimeout(function(){
            el.innerHTML = r; f = false;
        }, 2300);
        f = true;
    }
}

/* Preview Page Button */
let previewCFpage = document.getElementById('previewCFpage');
previewCFpage.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.querySelector(".editorHelpTopBar #previewURL").click();'});
  });
};

/* Code editor height slider */
let codeEditorHeightSlider = document.getElementById("CodeEditorHeight")
codeEditorHeightSlider.oninput = function(element) {
    adjustEditorHeight();
    chrome.storage.sync.set({'fs_editor_height':codeEditorHeightSlider.value}, function(){
        console.log("Saved code editor height slider");
    })
};
chrome.storage.sync.get('fs_editor_height', function(data) {
    if(data.fs_editor_height == '' || data.fs_editor_height == null){
        data.fs_editor_height = "0";
    }
    codeEditorHeightSlider.value = data.fs_editor_height;
    setTimeout(function(){ adjustEditorHeight(); }, 1000);
});
function adjustEditorHeight(){
    let pval = parseInt((parseInt(codeEditorHeightSlider.value) * 3.2) + 50) + "px";
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: `document.querySelector("#customCSSPopup").style.marginTop = \'${pval}\'; document.querySelector("#trackingcodePopup").style.marginTop = '${pval}'; try{document.querySelector("#customCodePopup").style.marginTop = '${pval}'}catch(e){};`});
    });
}

/* Mirror Themes */
var addedThemes = ["pastel-on-dark"], current_theme;
let changeMirrorTheme = document.getElementById("mirrorTheme");
changeMirrorTheme.addEventListener('change', function(){
    updateMirrorTheme();
    chrome.storage.sync.set({'cust_theme':changeMirrorTheme.value}, function() {
      console.log("Saved theme.")
    });
})
function updateMirrorTheme(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let theme = changeMirrorTheme.value;
        if(!addedThemes.includes(theme)){
            let assetroot = "https://master.d2rgdk1u6tmmqm.amplifyapp.com/web/mooch/codemirror-themes/";
            let themevar = theme.replaceAll("-", "");
            chrome.tabs.executeScript(
                tabs[0].id, {
                    code: `let FS_${themevar}=document.createElement('link'); FS_${themevar}.setAttribute('rel','stylesheet');FS_${themevar}.setAttribute('href','${assetroot}${theme}.css');document.head.appendChild(FS_${themevar});`
                });
            addedThemes.push(theme);
        }
        setTimeout(function(){
            chrome.tabs.executeScript(
            tabs[0].id, {
                code: `document.querySelector(".CodeMirror").className=\"CodeMirror cm-s-${theme} CodeMirror-wrap\"`
            });
            chrome.tabs.executeScript(
            tabs[0].id, {
                code: `document.querySelector('.modalBackdropWrapper').setAttribute('fs-fusion-code-theme', '${theme}');`
            });
        }, 200);
    });
}

chrome.storage.sync.get('cust_theme', function(data) {
    if(data.cust_theme == '' || data.cust_theme == null){ data.cust_theme = "pastel-on-dark"; }
    changeMirrorTheme.value = data.cust_theme;
    updateMirrorTheme();
});