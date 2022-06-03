/**
 * Script pour une fonctionnalités de filtrage. Les div affichés sont celles qui ont au moins 1 des langages filtrés. 
 * 
 * Pré-requis: les divisions doit avoir des classes correspond aux arguments de la fonction filtrer()
 *              -html -> Html
 *              -css -> Css
 *              -js -> JavaScript
 *              -java -> Java
 *              -py -> Python
 */

function filter(element,langage) {
    
    //toggle
    mapLangage.set(langage, !mapLangage.get(langage));
    console.log("mapLangage = ",mapLangage);
    
    
    //affichage/masquage des button
    let langageFiltre = getSetLangageAConserver();
    let listButtons = document.getElementById("filtre").getElementsByTagName("button");
    if (langageFiltre.size != 0) {
        for (let i = 0; i < listButtons.length; i++) {
            if (classListContientLangs(listButtons.item(i).classList, langageFiltre)) {
                listButtons.item(i).classList.remove("grey");
            } else {
                listButtons.item(i).classList.add("grey");
            }
        }
    }
    else {
        for (let i = 0; i < listButtons.length; i++) {
            listButtons.item(i).classList.remove("grey");
        }
    }
    
    //affichage/masquage des div 
    maj();
}

function getSetLangageAConserver() { 
    let langageFiltre = new Set();

    for (let [lang,b] of mapLangage.entries()) {
        if (b) { langageFiltre.add(lang); }
    }

    return langageFiltre; 
}

function classListContientLangs(classList, langs) {
    let contientLangFiltre = false;
    
    for (let lang of langs.values()) {
        if (classList.contains(lang)) { contientLangFiltre = true; }
    }

    return contientLangFiltre;
}

function maj() {
    let langageFiltre = getSetLangageAConserver();
    console.log("filtre actif? ", langageFiltre.size != 0, langageFiltre);

    if (langageFiltre.size != 0) {
        let listProjet = document.getElementsByClassName("projet");
        for (let i = 0; i < listProjet.length; i++) {
            
            let contientLangFiltre = classListContientLangs(listProjet.item(i).classList, langageFiltre);
            if (contientLangFiltre) {
                /* on affiche la division projet */
                listProjet.item(i).classList.remove("removed"); 
            } else { // if (!contientLangFiltre) {
                /* on cache la div */
                listProjet.item(i).classList.add("removed");
            }
        }
    } else {
        let listProjet = document.getElementsByClassName("projet");
        for (let i = 0; i < listProjet.length; i++) { listProjet.item(i).classList.remove("removed"); }
    }
    return;
}

let mapLangage = new Map();
mapLangage.set("html", false);
mapLangage.set("css", false);
mapLangage.set("sass", false);
mapLangage.set("js", false);
mapLangage.set("java", false);
mapLangage.set("py", false);

window.addEventListener('load', function () {
    // maj()
  })