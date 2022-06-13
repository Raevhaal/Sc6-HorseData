/*
    Author: Horseface
    Date: 27/03:2022

    Framedata url: https://docs.google.com/spreadsheets/d/1R3I_LXfqhvFjlHTuj-wSWwwqYmlUf299a3VY9pVyGEw/
        CSV: https://docs.google.com/spreadsheets/d/1R3I_LXfqhvFjlHTuj-wSWwwqYmlUf299a3VY9pVyGEw/export?exportFormat=csv
*/


// #region GLobal variables
//CSV lol
const FrameDataCSV = "https://docs.google.com/spreadsheets/d/1R3I_LXfqhvFjlHTuj-wSWwwqYmlUf299a3VY9pVyGEw/export?exportFormat=tsv";

//Var framedata data
var Fdata;

//Framedata Datatable refrenece
var Dtable;

//Can refresh
var CanRefresh = 0;

var Test;

//#endregion

//#region Filter logic
class searchFilters{
    commandFilter = [];
    characterFilter = [];
    hitLevelFilter = [];
    stanceFilter = "";
    notesFilter = [];

    addStance(vStances){//rename to addStances
        //Allow for input string and array
        if(typeof(vStances) == 'string'){
            vStances = [vStances];
        }
        //Adds stances 
        $("#stanceMultiselector").val($("#stanceMultiselector").val().concat(vStances)).trigger("change");
        return true;
    }

    addCharacters(vCharacters){
        //Allow for input string and array
        if(typeof(vCharacters) == 'string'){
            vCharacters = [vCharacters];
        }
        //Adds stances 
        $("#charMultiSelector").val($("#charMultiSelector").val().concat(vCharacters)).trigger("change");
        return true;
    }

    removeCharacter(vCharacters){
        let vChars = $("#charMultiSelector").val();
        let _index = vChars.indexOf(vCharacters);
        if(_index != -1){
            vChars.splice(_index,1);
            $("#charMultiSelector").val(vChars).trigger("change");
            return true;
        }
        
        return false;
    }

    removeStance(vStances){
        //Allow for input string and array
        if(typeof(vStances) == 'string'){
            vStances = [vStances];
        }

        // Removes unwanted stances
        var currentStances = new Set($("#stanceMultiselector").val());
        for (let index = 0; index < vStances.length; index++) {
            currentStances.delete(vStances[index]);
        }

        //Set new stance filter
        $("#stanceMultiselector").val(Array.from(currentStances)).trigger("change");
    }
    
    applyUrlFilter(){
        let urlParam = new URLSearchParams( window.location.search);
        
        //Character filter
        if(urlParam.get("character") != null){
            var characterlist = ["2b", "amy", "astaroth", "azwel", "cassandra", "cervantes", "geralt", "groh", "haohmaru", "hilde", "inferno", "ivy", "kilik", "maxi", "mitsurugi", "nightmare", "raphael", "seong-mi-na", "setsuka", "siegfried", "sophitia", "taki", "talim", "tira", "voldo", "xianghua", "yoshimitsu", "zasalamel", "hwang"]
            if(characterlist.includes(urlParam.get("character").toLocaleLowerCase())){
                $("#charMultiSelector").val($("#charMultiSelector").val().concat([urlParam.get("character").toLocaleLowerCase()])).trigger("change");
                
            }
        } else {
            $("#navbarFilter").click(); //Shows quick filter menu
        }

        // Apply filter
        this.applyFilter();
    }

    setCommandFilter(filter){
        var vFilter = filter.toLowerCase();
        //#region Stance fixer

        if(UserSettings.settings.StanceSelector == false){
            $("#stanceMultiselector").val([]).trigger("change");
        }

        //#region Add stances to stance filter instead of command
        
        //0 is what the user types (lowercase) second is what the stance is named
        var stances = [
            ["se mid-air opponent", "SE Mid-air Opponent"],
            ["downed opponent", "Downed Opponent"],
            ["manji dragonfly", "Manji Dragonfly"],
            ["midair opponent", "Midair Opponent"],
            ["even activation", "even activation"],
            ["sky  stage iii", "SKY  stage III"],
            ["odd activation", "odd activation"],
            ["during motion", "DURING MOTION"],
            ["indian stance", "Indian Stance"],
            ["sky  stage ii", "SKY  stage II"],
            ["sky  stage i", "SKY  stage I"],
            ["flea stance", "Flea Stance"],
            ["short hold", "short hold"],
            ["weaponless", "weaponless"],
            ["tip range", "tip range"],
            ["vs crouch", "vs crouch"],
            ["grounded", "GROUNDED"],
            ["mcft far", "MCFT far"],
            ["almighty", "almighty"],
            ["partial", "partial"],
            ["revenge", "revenge"],
            ["mp wrp", "MP WRP"],
            ["medium", "medium"],
            ["evade", "Evade"],
            ["shura", "Shura"],
            ["quake", "quake"],
            ["short", "short"],
            ["spear", "spear"],
            ["sword", "sword"],
            ["down", "DOWN"],
            ["down", "Down"],
            ["jump", "JUMP"],
            ["mcft", "MCFT"],
            ["mcht", "MCHT"],
            ["sgdf", "SGDF"],
            ["srsh", "SRSH"],
            ["long", "long"],
            ["miss", "miss"],
            ["ags", "AGS"],
            ["air", "AIR"],
            ["ang", "ANG"],
            ["avn", "AVN"],
            ["bhh", "BHH"],
            ["bkn", "BKN"],
            ["bob", "BOB"],
            ["coe", "COE"],
            ["dgf", "DGF"],
            ["fle", "FLE"],
            ["ind", "IND"],
            ["mst", "MST"],
            ["nbs", "NBS"],
            ["nls", "NLS"],
            ["nss", "NSS"],
            ["ntc", "NTC"],
            ["pxs", "PXS"],
            ["rlc", "RLC"],
            ["rrp", "RRP"],
            ["run", "RUN"],
            ["rxp", "RXP"],
            ["sbh", "SBH"],
            ["sch", "SCH"],
            ["spr", "SPR"],
            ["ssh", "SSH"],
            ["ssr", "SSR"],
            ["stg", "STG"],
            ["stk", "STK"],
            ["swr", "SWR"],
            ["sxs", "SXS"],
            ["tas", "TAS"],
            ["tow", "TOW"],
            ["ts1", "TS1"],
            ["ts2", "TS2"],
            ["ts3", "TS3"],
            ["wnb", "WNB"],
            ["wnc", "WNC"],
            ["wnf", "WNF"],
            ["wns", "WNS"],
            ["wro", "WRO"],
            ["wrp", "WRP"],
            ["woh", "WoH"],
            ["yyt", "YYT"],
            ["hit", "hit"],
            ["run", "run"],
            ["ag", "AG"],
            ["al", "AL"],
            ["as", "AS"],
            ["at", "AT"],
            ["be", "BE"],
            ["bl", "BL"],
            ["bp", "BP"],
            ["bs", "BS"],
            ["bt", "BT"],
            ["ch", "CH"],
            ["cr", "CR"],
            ["db", "DB"],
            ["dc", "DC"],
            ["df", "DF"],
            ["dl", "DL"],
            ["ds", "DS"],
            ["dw", "DW"],
            ["fc", "FC"],
            ["fj", "FJ"],
            ["gi", "GI"],
            ["gs", "GS"],
            ["hl", "HL"],
            ["hp", "HP"],
            ["js", "JS"],
            ["li", "LI"],
            ["lo", "LO"],
            ["lp", "LP"],
            ["ls", "LS"],
            ["mc", "MC"],
            ["mo", "MO"],
            ["mp", "MP"],
            ["ms", "MS"],
            ["ng", "NG"],
            ["po", "PO"],
            ["pr", "PR"],
            ["qp", "QP"],
            ["rc", "RC"],
            ["re", "RE"],
            ["rg", "RG"],
            ["ro", "RO"],
            ["rs", "RS"],
            ["rt", "RT"],
            ["sc", "SC"],
            ["se", "SE"],
            ["sg", "SG"],
            ["sl", "SL"],
            ["ss", "SS"],
            ["ts", "TS"],
            ["ud", "UD"],
            ["vg", "VG"],
            ["vs", "VS"],
            ["wd", "WD"],
            ["wf", "WF"],
            ["wr", "WR"],
            ["ws", "WS"],
            ["wt", "WT"],
            ["ax", "ax"],
            ["c", "c"],
        ];

        for (let index = 0; index < stances.length; index++) {
            if(vFilter.includes(stances[index][0])){
                vFilter = vFilter.replaceAll(stances[index][0], "");
                this.addStance(stances[index][1]);    
            }
        }

        //#endregion

        //#region Replace 236 with stance where applicable
        if(
            this.characterFilter.length == 1 
            && ["2b", "cassandra", "sophitia", "voldo"].includes(this.characterFilter[0])
            && vFilter.match("236") != null
            && vFilter.match("2.*3.*6.*a.*b.*k") === null //
        ){
            //Checks for TAS
            if(
                this.characterFilter[0] == "sophitia"
                && (vFilter.match("236236") != null || vFilter.match("2366") != null)
            ){
                vFilter = vFilter.replaceAll("236236", "");
                vFilter = vFilter.replaceAll("2366", "");
                this.addStance("TAS");
            } else {
                vFilter = vFilter.replaceAll("236", "");
                var stance236Chars = {
                    "2b": "AGS",
                    "cassandra": "AS",
                    "sophitia": "AS",
                    "voldo": "CR"
                };
                this.addStance(stance236Chars[this.characterFilter[0]]);                
            }
        }
        //#endregion

        //Overwrite userinput with stances removed
        $("#commandInput").val(vFilter);
        //#endregion


        //#region Please dont look

        // Remove all spaces
        vFilter = vFilter.replaceAll(" ", "");
        // Add space between each character
        vFilter = vFilter.split("").join(" ") + " ";

        vFilter = vFilter.replaceAll("( ", "(");
        vFilter = vFilter.replaceAll(" )", ")");
        vFilter = vFilter.replaceAll("[ ", "(");
        vFilter = vFilter.replaceAll(" ]", ")");

        vFilter = vFilter.replaceAll("1 1 ", "(1) ");
        vFilter = vFilter.replaceAll("2 2 ", "(2) ");
        vFilter = vFilter.replaceAll("3 3 ", "(3) ");
        vFilter = vFilter.replaceAll("4 4 ", "(4) ");
        vFilter = vFilter.replaceAll("5 5 ", "(5) ");
        vFilter = vFilter.replaceAll("6 6 ", "(6) ");
        vFilter = vFilter.replaceAll("7 7 ", "(7) ");
        vFilter = vFilter.replaceAll("8 8 ", "(8) ");
        vFilter = vFilter.replaceAll("9 9 ", "(9) ");

        //Escapes characters like ( ) [ ]
        vFilter = vFilter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        // Could be replaced by positive lookahead?
        vFilter = vFilter.replaceAll(") ", ").*");
        vFilter = vFilter.replaceAll("] ", "].*");
        vFilter = vFilter.replaceAll("+ ", "+.*");
        vFilter = vFilter.replaceAll("a ", "a.*");
        vFilter = vFilter.replaceAll("b ", "b.*");
        vFilter = vFilter.replaceAll("k ", "k.*");

        vFilter = vFilter.replaceAll("A ", "A.*");
        vFilter = vFilter.replaceAll("B ", "B.*");
        vFilter = vFilter.replaceAll("K ", "K.*");
 
        vFilter = vFilter.replaceAll("1 ", "1.*");
        vFilter = vFilter.replaceAll("2 ", "2.*");
        vFilter = vFilter.replaceAll("3 ", "3.*");
        vFilter = vFilter.replaceAll("4 ", "4.*");
        vFilter = vFilter.replaceAll("5 ", "5.*");
        vFilter = vFilter.replaceAll("6 ", "6.*");
        vFilter = vFilter.replaceAll("7 ", "7.*");
        vFilter = vFilter.replaceAll("8 ", "8.*");
        vFilter = vFilter.replaceAll("9 ", "9.*");
        //#endregion

        //console.log(vFilter);
        if(vFilter == " "){
            vFilter = "";
        } else {
            this.commandFilter = vFilter; 
        }
    }

    //#region Simple setters
    setStanceFilter(filter){
        function permute(permutation) {
            var length = permutation.length,
                result = [permutation.slice()],
                c = new Array(length).fill(0),
                i = 1, k, p;
          
            while (i < length) {
              if (c[i] < i) {
                k = i % 2 && c[i];
                p = permutation[i];
                permutation[i] = permutation[k];
                permutation[k] = p;
                ++c[i];
                i = 1;
                result.push(permutation.slice());
              } else {
                c[i] = 0;
                ++i;
              }
            }
            return result;
        }

        var vFilter = "";

        if(UserSettings.settings.StanceAND){
            if(filter.length > 0){
                var vPermFilter = permute(filter);
                vFilter = [];
        
                //(\bSC\b.*\bAS\b|\bAS\b.*\bSC\b)
                for (let index = 0; index < vPermFilter.length; index++) {
                    vFilter[index] = "(\\b" + vPermFilter[index].join("\\b.*\\b") + "\\b)"
                }
        
                vFilter = vFilter.join("|");
            }
        } else {
            vFilter = "\\b" + filter.join("|\\b") + "\\b";
        }
        this.stanceFilter = vFilter;
    }

    setCharacterFilter(filter){
        this.characterFilter = filter;
    }

    setHitlevelFilter(filter){
        this.hitLevelFilter = filter;
    }

    setNoteFilter(filter){
        this.notesFilter = filter;
    }
    //#endregion


    applyFilter(){
        // Code to keep old filter when applying through command search modal
        // if(Dtable.searchBuilder.getDetails().criteria !== undefined && $("#keepFilterBox").val() == true){
        //     filterArray = Object.values(Dtable.searchBuilder.getDetails().criteria);
        //     console.log("DEBUG Keeping filter");
        // }

        //Character filter
        Dtable.column(0).search(this.characterFilter.join("|"), true, false, false).draw();

        //Hit level 
        Dtable.column(5).search(this.hitLevelFilter.join("|"), true, false, false).draw();

        //Stance level
        Dtable.column(3).search(this.stanceFilter, true, false, false).draw();

        //Command filter
        Dtable.column(4).search(this.commandFilter, true, false, true).draw();

        //Notes filter
        Dtable.column(13).search(this.notesFilter.join("|"), true, false, false).draw();
    }
}

//Create instance of searchFilter as global
var Filters = new searchFilters()
// #endregion

// #region Gloabl icons
var Icons = {
    // .V{width: 72px;height: 20px;}
    // .W{width: 46px;height: 20px;}
    // .X{width: 20px;height: 20px;}
    // .Y{width: 40px;height: 20px;}
    // .Z{width: 28px;height: 20px;}

    //Notes
    ":TH:": '<img class="X" src="Icons/TH.png"></img><p class="superHidden">:TH:</p>',
    ":BA:": '<img class="X" src="Icons/BA.png"></img><p class="superHidden">:BA:</p>',
    ":GI:": '<img class="X" src="Icons/GI.png"></img><p class="superHidden">:GI:</p>',
    ":SS:": '<img class="X" src="Icons/SS.png"></img><p class="superHidden">:SS:</p>',
    ":UA:": '<img class="X" src="Icons/UA.png"></img><p class="superHidden">:UA:</p>',
    ":LH:": '<img class="X" src="Icons/LH.png"></img><p class="superHidden">:LH:</p>',
    ":RE:": '<img class="X" src="Icons/RE.png"></img><p class="superHidden">:RE:</p>',
    ":GC:": '<img class="X" src="Icons/GC.png"></img><p class="superHidden">:GC:</p>',
    ":AT:": '<img class="X" src="Icons/AT.png"></img><p class="superHidden">:AT:</p>',
    ":CE:": '<img class="X" src="Icons/CE.png"></img><p class="superHidden">:CE:</p>',
    ":SC:": '<img class="X" src="Icons/SC.png"></img><p class="superHidden">:SC:</p>',
    //":TS:": '<img width="40" height="20" src="Icons/TS.png" value = "TS"></img>',

    //Slide combo buttons
    ":a::A:": '<img class="X" src="Icons/A-A.png"></img><p class="superHidden">aA</p>',
    ":a::B:": '<img class="X" src="Icons/A-B.png"></img><p class="superHidden">aB</p>',
    ":a::K:": '<img class="X" src="Icons/A-K.png"></img><p class="superHidden">aK</p>',
    ":a::G:": '<img class="X" src="Icons/A-G.png"></img><p class="superHidden">aG</p>',
    ":b::A:": '<img class="X" src="Icons/B-A.png"></img><p class="superHidden">bA</p>',
    ":b::B:": '<img class="X" src="Icons/B-B.png"></img><p class="superHidden">bB</p>',
    ":b::K:": '<img class="X" src="Icons/B-K.png"></img><p class="superHidden">bK</p>',
    ":b::G:": '<img class="X" src="Icons/B-G.png"></img><p class="superHidden">bG</p>',
    ":k::A:": '<img class="X" src="Icons/K-A.png"></img><p class="superHidden">kA</p>',
    ":k::B:": '<img class="X" src="Icons/K-B.png"></img><p class="superHidden">kB</p>',
    ":k::K:": '<img class="X" src="Icons/K-K.png"></img><p class="superHidden">kK</p>',
    ":k::G:": '<img class="X" src="Icons/K-G.png"></img><p class="superHidden">kG</p>',
    ":g::A:": '<img class="X" src="Icons/G-A.png"></img><p class="superHidden">gA</p>',
    ":g::B:": '<img class="X" src="Icons/G-B.png"></img><p class="superHidden">gB</p>',
    ":g::K:": '<img class="X" src="Icons/G-K.png"></img><p class="superHidden">gK</p>',
    ":g::G:": '<img class="X" src="Icons/G-G.png"></img><p class="superHidden">gG</p>',
    
    //Directions
    ":9:": '<img class="X" src="Icons/9.png" ></img><p class="superHidden">9</p>',
    ":8:": '<img class="X" src="Icons/8.png" ></img><p class="superHidden">8</p>',
    ":7:": '<img class="X" src="Icons/7.png" ></img><p class="superHidden">7</p>',
    ":6:": '<img class="X" src="Icons/6.png" ></img><p class="superHidden">6</p>',
    ":5:": '<img class="X" src="Icons/5.png" ></img><p class="superHidden">5</p>',
    ":4:": '<img class="X" src="Icons/4.png" ></img><p class="superHidden">4</p>',
    ":3:": '<img class="X" src="Icons/3.png" ></img><p class="superHidden">3</p>',
    ":2:": '<img class="X" src="Icons/2.png" ></img><p class="superHidden">2</p>',
    ":1:": '<img class="X" src="Icons/1.png" ></img><p class="superHidden">1</p>',

    //Directions held
    ":(9):": '<img class="X" src="Icons/9-.png" ></img><p class="superHidden">(9)</p>',
    ":(8):": '<img class="X" src="Icons/8-.png" ></img><p class="superHidden">(8)</p>',
    ":(7):": '<img class="X" src="Icons/7-.png" ></img><p class="superHidden">(7)</p>',
    ":(6):": '<img class="X" src="Icons/6-.png" ></img><p class="superHidden">(6)</p>',
    ":(4):": '<img class="X" src="Icons/4-.png" ></img><p class="superHidden">(4)</p>',
    ":(3):": '<img class="X" src="Icons/3-.png" ></img><p class="superHidden">(3)</p>',
    ":(2):": '<img class="X" src="Icons/2-.png" ></img><p class="superHidden">(2)</p>',
    ":(1):": '<img class="X" src="Icons/1-.png" ></img><p class="superHidden">(1)</p>',

    //Held buttons
    ":(G):": '<img class="X" src="Icons/G-.png"></img><p class="superHidden">(G)</p>',
    ":(A):": '<img class="X" src="Icons/A-.png"></img><p class="superHidden">(A)</p>',
    ":(B):": '<img class="X" src="Icons/B-.png"></img><p class="superHidden">(B)</p>',
    ":(K):": '<img class="X" src="Icons/K-.png"></img><p class="superHidden">(K)</p>',

    //Buttons
    ":G:": '<img class="X" src="Icons/G.png"></img><p class="superHidden">G</p>',
    ":A:": '<img class="X" src="Icons/A.png"></img><p class="superHidden">A</p>',
    ":B:": '<img class="X" src="Icons/B.png"></img><p class="superHidden">B</p>',
    ":K:": '<img class="X" src="Icons/K.png"></img><p class="superHidden">K</p>',

    //Slide buttons
    ":g:": '<img class="X" src="Icons/Gs.png"></img><p class="superHidden">g</p>',
    ":a:": '<img class="X" src="Icons/As.png"></img><p class="superHidden">a</p>',
    ":b:": '<img class="X" src="Icons/Bs.png"></img><p class="superHidden">b</p>',
    ":k:": '<img class="X" src="Icons/Ks.png"></img><p class="superHidden">k</p>',

    //Held combo buttons
    ":(A)+(K):": '<img class="X" src="Icons/AK-.png"></img><p class="superHidden">(A)+(K)</p>',
    ":(A)+(B):": '<img class="X" src="Icons/AB-.png"></img><p class="superHidden">(A)+(B)</p>',
    ":(K)+(G):": '<img class="X" src="Icons/KG-.png"></img><p class="superHidden">(K)+(H)</p>',
    ":(A)+(G):": '<img class="X" src="Icons/AG-.png"></img><p class="superHidden">(A)+(G)</p>',
    ":(B)+(K):": '<img class="X" src="Icons/BK-.png"></img><p class="superHidden">(B+K)</p>',
    ":(B)+(G):": '<img class="X" src="Icons/BG-.png"></img><p class="superHidden">(B+G)</p>',

    //Combo buttons
    ":A+K:": '<img class="X" src="Icons/AK.png"></img><p class="superHidden">A+K</p>',
    ":A+B:": '<img class="X" src="Icons/AB.png"></img><p class="superHidden">A+B</p>',
    ":K+G:": '<img class="X" src="Icons/KG.png"></img><p class="superHidden">K+G</p>',
    ":A+G:": '<img class="X" src="Icons/AG.png"></img><p class="superHidden">A+G</p>',
    ":B+K:": '<img class="X" src="Icons/BK.png"></img><p class="superHidden">B+K</p>',
    ":B+G:": '<img class="X" src="Icons/BG.png"></img><p class="superHidden">B+G</p>',

    ":A+B+K:":       '<img class="X" src= "Icons/ABK.png" ></img><p class="superHidden">A+B+K</p>',
    ":(A)+(B)+(K):": '<img class="X" src="Icons/ABK-.png" ></img><p class="superHidden">(A+B+K)</p>',

    //Height
    ":H:":  '<img class="X" src="Icons/H.png" ></img><p class="superHidden">:H:</p>',
    ":M:":  '<img class="X" src="Icons/M.png" ></img><p class="superHidden">:M:</p>',
    ":L:":  '<img class="X" src="Icons/L.png" ></img><p class="superHidden">:L:</p>',
    ":SH:": '<img class="X" src="Icons/SH.png" ></img><p class="superHidden">:SH:</p>',
    ":SM:": '<img class="X" src="Icons/SM.png" ></img><p class="superHidden">:SM:</p>', 
    ":SL:": '<img class="X" src="Icons/SL.png" ></img><p class="superHidden">:SL:</p>',

    //Misc
    ":a+b:": '<img class="X" src="Icons/AB.png" ></img><p class="superHidden">a+b</p>',
};

var CommandIcons = [
    //Slide inputs
    [":a::A:", Icons[":a::A:"]],
    [":a::B:", Icons[":a::B:"]],
    [":a::K:", Icons[":a::K:"]],
    [":a::G:", Icons[":a::G:"]],
    [":b::A:", Icons[":b::A:"]],
    [":b::B:", Icons[":b::B:"]],
    [":b::K:", Icons[":b::K:"]],
    [":b::G:", Icons[":b::G:"]],
    [":k::A:", Icons[":k::A:"]],
    [":k::B:", Icons[":k::B:"]],
    [":k::K:", Icons[":k::K:"]],
    [":k::G:", Icons[":k::G:"]],
    [":g::A:", Icons[":g::A:"]],
    [":g::B:", Icons[":g::B:"]],
    [":g::K:", Icons[":g::K:"]],
    [":g::G:", Icons[":g::G:"]],

    //B6B missing

    //Directions
    [":9:", Icons[":9:"]],
    [":8:", Icons[":8:"]],
    [":7:", Icons[":7:"]],
    [":6:", Icons[":6:"]],
    [":5:", Icons[":5:"]],
    [":4:", Icons[":4:"]],
    [":3:", Icons[":3:"]],
    [":2:", Icons[":2:"]],
    [":1:", Icons[":1:"]],
 
    [":(9):", Icons[":(9):"]],
    [":(8):", Icons[":(8):"]],
    [":(7):", Icons[":(7):"]],
    [":(6):", Icons[":(6):"]],
    [":(4):", Icons[":(4):"]],
    [":(3):", Icons[":(3):"]],
    [":(2):", Icons[":(2):"]],
    [":(1):", Icons[":(1):"]],

    //Buttons
    [":(G):", Icons[":(G):"]],
    [":(A):", Icons[":(A):"]],
    [":(B):", Icons[":(B):"]],
    [":(K):", Icons[":(K):"]],

    [":G:", Icons[":G:"]],
    [":A:", Icons[":A:"]],
    [":B:", Icons[":B:"]],
    [":K:", Icons[":K:"]],

    [":A+K:", Icons[":A+K:"]],
    [":A+B:", Icons[":A+B:"]],
    [":K+G:", Icons[":K+G:"]],
    [":A+G:", Icons[":A+G:"]],
    [":B+K:", Icons[":B+K:"]],
    [":B+G:", Icons[":B+G:"]],

    
    [":(A)+(K):", Icons[":(A)+(K):"]],
    [":(A)+(B):", Icons[":(A)+(B):"]],
    [":(K)+(G):", Icons[":(K)+(G):"]],
    [":(B)+(K):", Icons[":(B)+(K):"]],
    [":(A)+(G):", Icons[":(A)+(G):"]],
    [":(B)+(G):", Icons[":(B)+(G):"]],

    [":A+B+K:", Icons[":A+B+K:"]],
    [":(A)+(B)+(K):", Icons[":(A)+(B)+(K):"]],
    
    [":g:", Icons[":g:"]],
    [":a:", Icons[":a:"]],
    [":b:", Icons[":b:"]],
    [":k:", Icons[":k:"]],

    //Misc
    [":(B+K):", '<img width="46" height="20" src="Icons/BK-.png" value = "(B+K)"></img>'],
    [":a+b:", '<img width="46" height="20" src="Icons/AB.png" value = "a+b"></img>'],
    [":b+k:", '<img width="46" height="20" src="Icons/BK.png" value = "B+K"></img>'],
];

var HeightIcons = [
    [":H:", Icons[":H:"]],
    [":M:", Icons[":M:"]],
    [":L:", Icons[":L:"]],
    [":SH:", Icons[":SH:"]],
    [":SM:", Icons[":SM:"]],
    [":SL:", Icons[":SL:"]],
];

var NotesIcons = [
    //Unique notes Icons
    [":TH:", Icons[":TH:"]],
    [":BA:", Icons[":BA:"]],
    [":GI:", Icons[":GI:"]],
    [":SS:", Icons[":SS:"]],
    [":UA:", Icons[":UA:"]],
    [":LH:", Icons[":LH:"]],
    [":RE:", Icons[":RE:"]],
    [":GC:", Icons[":GC:"]],
    [":AT:", Icons[":AT:"]],
    //[":TS:", Icons[":TS:"]],
    [":CE:", Icons[":CE:"]],
    [":SC:", Icons[":SC:"]],


    //Directions
    [":9:", Icons[":9:"]],
    [":8:", Icons[":8:"]],
    [":7:", Icons[":7:"]],
    [":6:", Icons[":6:"]],
    [":5:", Icons[":5:"]],
    [":4:", Icons[":4:"]],
    [":3:", Icons[":3:"]],
    [":2:", Icons[":2:"]],
    [":1:", Icons[":1:"]],

    //Height Icons
    [":H:", Icons[":H:"]],
    [":M:", Icons[":M:"]],
    [":L:", Icons[":L:"]],

    [":SH:", Icons[":SH:"]],
    [":SM:", Icons[":SM:"]],
    [":SL:", Icons[":SL:"]],

];
// #endregion



//#region Settings
class Settings {

    //Settings { value of setting,  jquery selector for dom check }
    defaultSettings = {
        "StanceSelector": true,
        "StanceAND": true,
    };

    // Setting checkbox translator
    settingCheckbox = {
        "StanceSelector": "#StanceSelectorCHK",
        "StanceAND": "#StanceANDCHK",
    }

    //Settings variable where everything is stored
    settings = {};

    //Change setting
    set(setting, value){
        this.settings[setting] = value;
        this.saveSettings();
        
        if(setting == "StanceAND"){ Filters.setStanceFilter($("#stanceMultiselector").val()); }

        this.applySettings();
    }

    resetSettings(){
        this.settings = this.defaultSettings;
        this.saveSettings();
        this.udpateSettingsDisplay();
    }

    loadSettings(){
        
        //Load settings
        if(!localStorage.hasOwnProperty("settings")){
            this.settings = this.defaultSettings;
        } else {
            this.settings = JSON.parse(localStorage.settings);
        }

        
        //Add missing settings from defaults
        var _changed = 0;
        for (const [key, value] of Object.entries(this.defaultSettings)) {
            if(!this.settings.hasOwnProperty(key)){
                this.settings[key] = value;
                _changed = 1;
            }
        }

        //Save settings if anything has been changed
        if(_changed == 1){
            this.saveSettings();
        }

        this.udpateSettingsDisplay();
        //this.applySettings();
    }

    // Update to use new generalization thing ma ef sduighswiu iqeur hgåoi 
    udpateSettingsDisplay(){
        for (const [key, value] of Object.entries(this.settings)) {
            $(this.settingCheckbox[key]).prop("checked", value );
        }
    }

    saveSettings(){
        localStorage.setItem("settings", JSON.stringify(this.settings));
    }

    applySettings(){
        //StanceSelector
        if(this.settings.StanceSelector){
            $("#stanceMultiselector").prop('disabled', false);
        } else {
            $("#stanceMultiselector").prop('disabled', true);
        }


    }
};


//Settings
var UserSettings = new Settings();
UserSettings.loadSettings();
UserSettings.applySettings();

//Handles dom settings page
$("#settingsModal .modal-body input").change(function(event){
    UserSettings.set(
        this.getAttribute("settingName"),
        this.checked
    );
});

//#endregion


function downloadFrameData(){
    const CSVHeaders = ["Character", "Move category", "Move Name", "Stance", "Command", "Hit level", "Impact", "Damage", "Block", "Hit", "Counter Hit", "Guard Burst", "Notes"];
    toastr.warning("Downloading framedata...");

    Papa.parse(FrameDataCSV, {
        download: true,
        header: true,
        delimiter: "\t",
        transformHeader: function(header,index){
            //Applies headers from Fheaders
            return CSVHeaders[index];
        },
        complete: (results) => {
            //Remove data header
            results.data.splice(0,3);

            createTable(results.data);
            toastr.clear();
        }
    });

}

function clearCache(){
    localStorage.clear("vData");
}

function createTable(data){
    const Fheaders = ["Character", "Move category", "Move Name", "Stance", "Command", "Hit level", "Impact", "Damage", "Sum(Damage)", "Block", "Hit", "Counter Hit", "Guard Burst", "Notes"];

    //console.log(`Creating tablestart ${performance.now() - StartTime} milliseconds.`);
    var vData;
    if(data === undefined || data === null){
        //Load cached version
        vData = JSON.parse(localStorage.vData);
    } else {
        vData = [];

        // Transform raw csv data
        data.forEach(function (row, index){
    
            //Sum damage
            sumDamage = row[Fheaders[7]].split(",").map(Number).reduce((partialSum, a) => partialSum + a, 0);

            //Command
            var Command = row[Fheaders[4]];
            for (let index = 0; index < CommandIcons.length; index++) {
                Command = Command.replaceAll(CommandIcons[index][0], CommandIcons[index][1]);
            }
            Command = Command.replaceAll("_", '<img class="X" src="Icons/underscore.png"</img>');
    
    
            //Hit level
            var hitLevel = row[Fheaders[5]];
            for (let index = 0; index < HeightIcons.length; index++) {
                hitLevel = hitLevel.replaceAll(HeightIcons[index][0], HeightIcons[index][1]);
            }
            hitLevel = hitLevel.replaceAll("_", "");
    
    
            //Notes
            var Notes = row[Fheaders[13]];
            for (let index = 0; index < NotesIcons.length; index++) {
                Notes = Notes.replaceAll(NotesIcons[index][0], NotesIcons[index][1]);
            }
    
    
            vData.push([
                row[Fheaders[0]],  //Character
                row[Fheaders[1]],  //Move category
                row[Fheaders[2]],  //Move Name
                row[Fheaders[3]],  //Stance
                Command,           //Command
                hitLevel,          //Hit level
                row[Fheaders[6]],  //Impact
                row[Fheaders[7]],  //Damage
                sumDamage,         //Sum(Damage)
                row[Fheaders[9]],  //Block
                row[Fheaders[10]], //Hit
                row[Fheaders[11]], //Counter Hit
                row[Fheaders[12]], //Guard Burst
                Notes,             //"Notes"
            ]);
        });
        
        //Save to cache
        localStorage.setItem("vData", JSON.stringify(vData));
    }
    //console.log(`Created vData ${performance.now() - StartTime} milliseconds.`);



    var vDom = `
                <"row bg-themed mx-0"
                    <"col-6"l>
                    <"col-6 px-0 float-right"B>
                    
                >
                rt
                <"my-3">
                <"row fixed-bottom mx-0 bg-themed"
                    <"col-6"i>
                    <"col-6 px-0 float-right"p>
                >
    `;
    
    Dtable = $('#fdata').DataTable({
        // initComplete: function(settings, json){
        //     console.log(`Datatable took ${performance.now() - StartTime} milliseconds.`);
        // },

        data: vData,
        columns: [
            { title: Fheaders[0] },//"Character"
            { title: Fheaders[1] },//"Move category"
            { title: Fheaders[2] },//"Move Name"
            { title: Fheaders[3] },//"Stance"
            { title: Fheaders[4] },//"Command"
            { title: Fheaders[5] },//"Hit level"
            { title: Fheaders[6] },//"Impact",
            { title: Fheaders[7] },//"Damage",
            { title: Fheaders[8] },//"Sum(Damage)"
            { title: Fheaders[9] },//"Block",
            { title: Fheaders[10] },//"Hit",
            { title: Fheaders[11] },//"Counter Hit"
            { title: Fheaders[12] },//"Guard Burst"
            { title: Fheaders[13] },//"Notes"
        ],

        dom: vDom,

        buttons: {
            buttons: [
                {
                    text: "Command search",
                    action: function () {
                        $("#commandSearchModal").modal("show");
                    },
                    className: 'btn btn-outline-secondary'
                },
                
                {
                    extend: 'colvis',
                    className: 'btn btn-outline-secondary',
                },
    
                {
                    extend: 'collection',
                    text: 'Advanced',
                    className: 'btn btn-outline-secondary',
                    buttons: [
                        {
                            text: "Settings",
                            action: function () {
                                $(".dt-button-background").trigger("click"); //Close dropdown
                                $("#settingsModal").modal("show");
                            },
                            className: 'btn btn-outline-secondary'
                        },
                        { extend: 'searchBuilder', text: 'Advanced search' },
                        { 
                            extend: 'copy',
                            text: 'Copy table to clipboard',
                            exportOptions: {
                                columns: ':visible'
                            }
                        },
                        { 
                            extend: 'excel',
                            text: 'Save as Excel',
                            exportOptions: {
                                columns: ':visible'
                            }
                        },
                        { 
                            extend: 'csv', 
                            text: 'Save as CSV',
                            exportOptions: {
                                columns: ':visible'
                            }
                        },
                    ]
                },
            ],
            dom: {
                button: {
                    className: ''
                }
            }
        },

        bProcessing: true,
        orderCellsTop: true,
        responsive: false,
        fixedHeader: true,
        deferRender: true,//Performance fix since wokring with lots of data

        pageLength: 20,//Default record amount
        lengthMenu: [//Record amount
            [10, 15, 20, 30, 40, 50, 100, 150, -1],//Actual value
            [10, 15, 20, 30, 40, 50, 100, 150, "All"]],//Displayed value

        scrollCollapse: true,
        scrollX: true,
        scrollY: true,
          
        colReorder: {
            realtime: false
        },

        columnDefs: [ 
            {targets: 0, visible: true, type:"string", className: "text-capitalize"}//Character
            ,{targets: 1, visible: false, type:"string"}//Move category
            ,{targets: 2, visible: false, type:"string"}//Move Name
            ,{targets: 3, visible: true, type:"string", className: "dt-body-right"}//Stance allign text right
            ,{targets: 4, visible: true, type:"html", width: "10%", className: "user-select-all"}//Command
            ,{targets: 5, visible: true, type:"html", className:"user-select-all"}//Hitlevel
            ,{targets: 6, visible: true, type:"num"}//impact
            ,{targets: 7, visible: false, type:"string"}//Damage 
            ,{targets: 8, visible: true, type:"num"}//Sum damage
            ,{targets: 9, visible: true, type:"num"}//"Block"
            ,{targets: 10, visible: true, type:"num"}//"Hit"
            ,{targets: 11, visible: true, type:"num"}//"Counter
            ,{targets: 12, visible: true, type:"num"}//"Guard Burst
            ,{targets: 13, visible: true, type:"html", className:"user-select-all"}//Notes
        ],
        
        searchCols: [
            null,//"Character"
            null,//"Move categ
            null,//"Move Name"
            { "regex": true },//"Stance"
            { "regex": true },//"Command"
            { "regex": true },//"Hit level"
            null,//"Impact",
            null,//"Damage",
            null,//"Sum(Damage
            null,//"Block",
            null,//"Hit",
            null,//"Counter H
            null,//"Guard Bur
            { "regex": true },//"Notes"
        ],

        on_resize: function(){ //lol dont remember 
            $('div.dataTables_scrollBody').css('height', newHt, 'maxHeight', newHt);
        },
    });

    //Can refresh
    CanRefresh = 1;

    //Url filters when datatables if finished
    Filters.applyUrlFilter();
}


function refreshFrameData(){
    if(CanRefresh == 1){
        CanRefresh = 0;
        if(Dtable !== undefined){
            Dtable.destroy();
            $("#fdata").html("");
        }
        downloadFrameData();
    } else {
        console.log("Already refreshing framedata")
    }
}


function heightState (state) {
    if (!state.id) {
      return state.text;
    }
    var baseUrl = "/user/pages/images/flags";
    var $state = $(
      '<span><img height="20" src="Icons/' + state.text + '.png" class="img-flag" /> ' + state.text + '</span>'
    );
    return $state;
};

//#region Command filter modal
//Fires on buttons in command search modal are pressed
function filterModal(e){
    Filters.pushCommandFilter($(this).attr("Value"));
}

function clearCmdFilter(){
    Dtable.searchBuilder.rebuild({});

    Dtable.column(1).search("", true, true, false);
    Dtable.column(2).search("", true, true, false);
    Dtable.column(3).search("", true, true, false);
    Dtable.column(4).search("", true, true, false);
    Dtable.column(5).search("", true, true, false);
    Dtable.column(6).search("", true, true, false);
    Dtable.column(7).search("", true, true, false);
    Dtable.column(8).search("", true, true, false);
    Dtable.column(9).search("", true, true, false);
    Dtable.column(10).search("", true, true, false);
    Dtable.column(11).search("", true, true, false);
    Dtable.column(12).search("", true, true, false);
    Dtable.column(13).search("", true, true, false).draw();

    //TODO:
    // Clear filters in command search modal???
}

function applyCmdModalFilter(){
    //Sets command filter
    Filters.setCommandFilter($("#commandInput").val());
    
    Filters.applyFilter()
}
//#endregion

var StartTime;
$(document).ready(function() {
    //Debug timing code
    //StartTime = performance.now();
    //console.log(`Starting: ${performance.now() - StartTime} milliseconds.`);

    //Version checker very primitive but works
    version = "0.13"
    if(!localStorage.hasOwnProperty("version")){
        localStorage.setItem("version", version);
    } else {
        if(localStorage.getItem("version") != version){
            clearCache();
            localStorage.setItem("version", version);
        }
    }
    
    
    //Options for toastr
    toastr.options = {
        "closeButton": true,
        "newestOnTop": false,
        "positionClass": "toast-middle-left",
        "preventDuplicates": false,
        "onclick": null,
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
    };


    //#region SELECT2 dropdowns
    $("#charMultiSelector").select2({
        allowClear: true,//Adds clear all button
    });

    $("#hitlevelMultiSelector").select2({
        allowClear: true,//Adds clear all button
        templateResult: heightState
    });

    $("#noteFilterMultiSelector").select2({
        allowClear: true,//Adds clear all button
        templateResult: heightState
    });

    $("#stanceMultiselector").select2({
        //allowClear: true,//Adds clear all button
    });
    
    //#endregion


    //#region Buttons
    $("#btnRefreshFramedata").on("click", refreshFrameData);

    //Quick filter section toggle
    $("#navbarFilter").on("click", function(){
        if($("#filtercontainer").hasClass("show")){
            $("#navbarFilterIcon").removeClass("fa-angles-down");
            $("#navbarFilterIcon").addClass("fa-angles-left");

        } else {
            $("#navbarFilterIcon").removeClass("fa-angles-left");
            $("#navbarFilterIcon").addClass("fa-angles-down");
        }
    });

    //Quick filters below header
    $("#charSelectNavbar button").on("click", function(){
        //Filters.setCharacterFilter = this.value;

        if($(this).hasClass("active")){
            Filters.removeCharacter(this.value)
        } else {
            Filters.addCharacters(this.value);
        }
        
        Filters.applyFilter()
    });

    //#region Cmd modal
    $(".btnCall input").on("click", filterModal);
    $("#applyCmdModalFilter").on("click", applyCmdModalFilter);
    $("#clearCmdFilter").on("click", clearCmdFilter);

    //onchange couldnt directly call for some reason
    $("#charMultiSelector").on("change", function(){

        //Set url filter if only one character
        if($("#charMultiSelector").val().length == 1){
            const url = new URL(window.location);
            url.searchParams.set('character', $("#charMultiSelector").val()[0]);
            window.history.replaceState({}, '', url);
        }

        $("#charSelectNavbar button.active").removeClass("active");
        var _characters = $(this).val();
        $( "#charSelectNavbar button" ).each(function( index ) {
            if(_characters.indexOf(this.value) != -1){
                $(this).addClass("active");
            }
        });

        Filters.setCharacterFilter($("#charMultiSelector").val());
    });
    
    $("#hitlevelMultiSelector").on("change", function(){
        Filters.setHitlevelFilter($("#hitlevelMultiSelector").val())
    });

    $("#noteFilterMultiSelector").on("change", function(){
        Filters.setNoteFilter($("#noteFilterMultiSelector").val())
    });

    $("#stanceMultiselector").on("change", function(){
        Filters.setStanceFilter($("#stanceMultiselector").val())
    });

    // Open character select if empty
    $('#commandSearchModal').on('shown.bs.modal', function () {
        if($("#charMultiSelector").val().length == 0){
            $('#charMultiSelector').focus();
            $('#charMultiSelector').select2("open");
        } else {
            $('#commandInput').focus();
        }
    });
    
    // Pressing Enter applies filter
    $("#commandInput").on('keypress',function(e) {
        if(e.which == 13) {
            $("#applyCmdModalFilter").click();
        }
    });

    //tab open 
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (
            evt.key == "Tab"
            && !$("#commandSearchModal").data('bs.modal')?._isShown
            && !$("#settingsModal").data('bs.modal')?._isShown
        ) {
            console.log("iran");
            $("#commandSearchModal").modal("show");
        }
    };
    //#endregion

    //#endregion



    //Determine if data is already downloaded
    if (localStorage.hasOwnProperty("vData")) {
        createTable();
    } else {
        downloadFrameData();
    }
      
    
});