/* New Hover Tools :) */
function addHideToTools(){
    let tools = document.querySelectorAll('.de-rollover-tools');
    tools.forEach(el => {
        let A = document.createElement("div");
        A.className = "de-rollover-visibility";
        A.innerHTML = "<i class=\"fa fa-eye\"></i>"
        A.addEventListener('click', function(e){
            let A = e.target, found=false;
            if(A !== null){
                let i;for(i=0;i<6;i++){
                    A = A.parentNode;
                    if(A.classList.contains("de")){found=true;break;}
                }
                if(found){ A.style.display = "none"; }
            }
            e.preventDefault();
            e.stopImmediatePropagation();
        });
        el.insertBefore(A, el.childNodes[6]);
    });
}
function addMobileToTools(){
    let tools = document.querySelectorAll('.de-rollover-tools');
    tools.forEach(el => {
        let A = document.createElement("div");
        A.className = "de-rollover-mobileonly";
        A.innerHTML = "<i class=\"fa fa-mobile\"></i>"
        A.addEventListener('click', function(e){
            let A = e.target, found=false;
            if(A !== null){
                let i;for(i=0;i<6;i++){
                    A = A.parentNode;
                    if(A.classList.contains("de")){found=true;break;}
                }
                if(found){ 
                    A.setAttribute("data-hide-on", "mobile")
                }
            }
            e.preventDefault();
            e.stopImmediatePropagation();
        });
        el.insertBefore(A, el.childNodes[6]);
    });
}
function addDesktopToTools(){
    let tools = document.querySelectorAll('.de-rollover-tools');
    tools.forEach(el => {
        let A = document.createElement("div");
        A.className = "de-rollover-desktoponly";
        A.innerHTML = "<i class=\"fa fa-desktop\"></i>"
        A.addEventListener('click', function(e){
            let A = e.target, found=false;
            if(A !== null){
                let i;for(i=0;i<6;i++){
                    A = A.parentNode;
                    if(A.classList.contains("de")){found=true;break;}
                }
                if(found){ 
                    A.setAttribute("data-hide-on", "desktop")
                }
            }
            e.preventDefault();
            e.stopImmediatePropagation();
        });
        el.insertBefore(A, el.childNodes[6]);
    });
}

/* New CSS for new hover tools */
function addNewToolsStyle(){
    let hidetool_style = document.createElement("style");
    hidetool_style.innerHTML = ".smallWidthElementHover.de-rollover-tools{width:250px !important;}"
        +".de-rollover-visibility,.de-rollover-mobileonly,.de-rollover-desktoponly{display:inline-block;padding:2px 7px;font-size:16px;position:relative;margin-top:-1px;background-color:#F78828;margin-right:-4px;}"
        +".de-rollover-visibility,.de-rollover-mobileonly,.de-rollover-desktoponly{top:2px;border-bottom: 2px solid #CB6E20;}"
        +".smallWidthElementHover .de-rollover-visibility,.smallWidthElementHover .de-rollover-mobileonly,.smallWidthElementHover .de-rollover-desktoponly{border:none!important;border-top:2px solid transparent!important;}"
        +".de-rollover-visibility:hover,.de-rollover-mobileonly:hover,.de-rollover-desktoponly:hover{background-color: #d2641c;}"
        +".de-rollover-visibility:hover:before,.de-rollover-mobileonly:hover:before,.de-rollover-desktoponly:hover:before{top:-11px;left:13px;content:' ';width:0;height:0;position:absolute;text-align:center;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #cb6e20}"
        +".de-rollover-visibility:hover:after,.de-rollover-mobileonly:hover:after,.de-rollover-desktoponly:hover:after{content:'hide';white-space:nowrap;position:absolute;top:-35px;left:0;background-color:#f78828;border:2px solid #cb6e20;color:#fff;line-height:14px;font-weight:700;text-transform:uppercase;font-size:10px;padding:3px 8px;border-radius:2px;font-family:proxima-nova,sans-serif!important}"
        +".de-rollover-mobileonly:hover:after{content:'Mobile Only';} .de-rollover-mobileonly{padding:2px 15px;} .de-rollover-desktoponly:hover:after{content:'Desktop Only' !important;} .de-rollover-desktoponly{padding:2px 10px;}";
    document.head.appendChild(hidetool_style);
}
/* New CSS for new CSS Info Popup tools */
function addNewCSSStyle(){
    let hidetool_style = document.createElement("style");
    hidetool_style.innerHTML = "#updateElementID, #updateElementClasses{position:absolute;top:28px;right:6px;background:#E2E3E7;color:#545454;padding:5px 10px;font-size:12px;font-weight:bold;border-radius:3px;text-transform:uppercase;}"
        +"#updateElementID:hover, #updateElementClasses:hover{background-color:#0074C7;color:#FFF;text-decoration:none;}";
    document.head.appendChild(hidetool_style);
}

/* CSS # Selector button onclick */
var ID_selector_added = false;
function CSSInfoButtonUpgrade(){
    let A = document.querySelector(".editorSectionInner .editorSettingsExtras_css");
    A.addEventListener("click", function(t){
        setTimeout(function(){
            if(!ID_selector_added){ /* First time setup */
                /* Custom classses field */
                addCSSclassesField();
                
                /* ID updator */
                upgradeCSSIDField(); 
                
                ID_selector_added=true; 
            } else { /* Update the existing setup */
                /* Custom classses field */
                let selected_el_ID = document.querySelector("#nodoElementCSSIDTag").value || "";
                if(selected_el_ID !== ""){
                    if(selected_el_ID.startsWith("#")){ // Remove the # at the beginning ;)
                        selected_el_ID = selected_el_ID.substring(1);
                    }
                    console.log("SEL ID: " + selected_el_ID);
                    // Set the data-id attribute for button
                    document.querySelector("#updateElementClasses").setAttribute("data-id", selected_el_ID)
                    let DF = document.querySelector("#" + selected_el_ID).getAttribute("custom-classes") || "";
                    document.querySelector("#nodoElementCSSclasses").value = DF;
                    
                    /* ID updator */
                    let F = document.querySelector("#updateElementID");
                    if(!selected_el_ID.startsWith("#"))
                        selected_el_ID = "#" + selected_el_ID;
                    F.setAttribute( "data-previous-id", selected_el_ID);
                }
            }
        },60);
    });
}
function upgradeCSSIDField(){
    let ID_selector = document.querySelector("#nodoElementCSSIDTag")
    if(ID_selector){
        ID_selector.removeAttribute("readonly");
        let C = document.createElement("a");
        C.innerHTML = "UPDATE";
        C.setAttribute("href", "#");
        C.setAttribute("id", "updateElementID");
        C.setAttribute("data-previous-id", ID_selector.value);
        C.addEventListener('click', function(t){
            /* Update the ID */
            let A = document.querySelector('#nodoElementCSSIDTag');
            let B = document.querySelector( t.target.getAttribute("data-previous-id") )
            if(B !== null){
                console.log("ID successfully changed: " + B)
                let s = A.value;
                if(s.startsWith("#")){ s = s.substring(1); }
                B.id = s;
            } else {
                console.log("ID not changed:");
                console.dir(t.target);
            }
            /* Close the popup */
            closeCSSinfoPopup();
        });
        insertAfter(C, ID_selector);
    }
}
function addCSSclassesField(){
    let A = document.querySelector("#cssInfoForElement");
    let B = document.createElement("div");
    let elem_id = document.querySelector("#updateElementTitle").getAttribute("data-id");
    let previous_custclasses = document.querySelector("#" + elem_id).getAttribute("custom-classes") || "";
    //if(previous_custclasses === null){ previous_custclasses = ""; }
    B.className = "nodoInputForCSS";
    B.innerHTML = `<div class=\"nodoModalInputLabel\">Title:</div><input type=\"text\" id=\"nodoElementCSSclasses\" value=\"${previous_custclasses}\" placeholder=\"Custom CSS Classes\"><a href=\"#\" id=\"updateElementClasses\" data-id=\"${elem_id}\">UPDATE</a>`;
    insertAfter(B, document.querySelector("#nodoElementCSSIDTag").parentNode);
    let DD = document.querySelector("#updateElementClasses");
    DD.addEventListener('click', function(t){
        let A = document.querySelector("#nodoElementCSSclasses").value || "";
        if(A !== ""){
            console.log("t: " + t.target.getAttribute("data-id"))
            let B = document.querySelector("#" + t.target.getAttribute("data-id"))
            let G = B.getAttribute("custom-classes") || ""; // Get previously added classes (incase they removed a class!)
            B.setAttribute("custom-classes", A); // Set the new classes in a side-attribute, to avoid confusion with built-in CF classes
            // Add any new classes that haven't already existed :)
            let C = A.split(" ");
            C.forEach(gval => { 
                if(!B.classList.contains(gval)){ B.classList.add(gval); } 
            });
            if(G !== ""){
                // Compare the previously added with the newly added, and look for "extras" in the list
                let J = G.split(" ");
                J.forEach(jval =>{
                    if(!C.includes(jval)){ B.classList.remove(jval); }
                });
            }
        }
        closeCSSinfoPopup();
    });
}

/* Code editor themes */
let custCodeSettingsBtn = document.querySelectorAll(".elCustomJs");
custCodeSettingsBtn.forEach(el => {
    el.addEventListener('click', function(){
        setTimeout(function(){
            let A = document.querySelector("#openCustomHTMLEditor")
            if(A){ A.addEventListener('click', function(){ updateMirrorTheme(); }); }
        }, 100)
    })
});
document.querySelector(".editorTopNavItem[data-editor=css]").addEventListener('click', function(){ updateMirrorTheme() });
document.querySelector(".editorTopNavItem[data-editor=tracking]").addEventListener('click', function(){ updateMirrorTheme() });
var activeMirrorView, mirror_firstinit=false;
function updateMirrorTheme(){
    let theme = document.querySelector('.modalBackdropWrapper').getAttribute('fs-fusion-code-theme') || "pastel-on-dark";
    setTimeout(function(){
        document.querySelectorAll(".CodeMirror").forEach(el => {
            el.className=`CodeMirror cm-s-${theme} CodeMirror-wrap`;
        });
    }, 50);
    if(theme !== activeMirrorView){
        mirror_firstinit = false;
    }
    if(!mirror_firstinit){
        let A = document.createElement("link")
        A.setAttribute("rel", "stylesheet");
        A.setAttribute("href", "https://master.d2rgdk1u6tmmqm.amplifyapp.com/web/mooch/codemirror-themes/" + theme + ".css");
        document.head.appendChild(A);
        console.log("Added new stylesheet! :)")
        mirror_firstinit = true;
        activeMirrorView = theme;
    }
}

/* Sub Functions */
function closeCSSinfoPopup(){
    document.querySelector("#nodoElementCSSclasses").value = "";
    document.querySelector("#cssInfoForElement_close").click();
}
function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

window.onload = function(){
    setTimeout(function(){ 
        try{ addNewToolsStyle(); } catch(e){ console.log("Failed to load CF Fusion resource: Upgraded Tools Style: " + e.message); }
        try{ addHideToTools(); } catch(e){ console.log("Failed to load CF Fusion resource: Update Visibility Hover Tool: " + e.message); }
        try{ addMobileToTools(); } catch(e){ console.log("Failed to load CF Fusion resource: Set Mobile Only Hover Tool: " + e.message); }
        try{ addDesktopToTools(); } catch(e){ console.log("Failed to load CF Fusion resource: Set Desktop Only Hover Tool: " + e.message); }
        try{ addNewCSSStyle(); } catch(e){ console.log("Failed to load CF Fusion resource: Upgraded CSS Info Style: " + e.message); }
        try{ CSSInfoButtonUpgrade(); } catch(e){ console.log("Failed to load CF Fusion resource: CSS Info Button Upgrade: " + e.message); }
        try{ updateMirrorTheme(); } catch(e){ console.log("Failed to load CF Fusion resource: Update Mirrorcode theme onload: " + e.message); }
    }, 1000);
}