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
//#endregion

//#region Filter logic
class searchFilters{
    commandFilter = [];
    characterFilter = [];
    hitLevelFilter = [];
    stanceFilter = "";
    
    applyUrlFilter(){
        //Vars
        var urlCharacterFilter = "";
        var urlImpactFilter = "";

        //
        let urlParam = new URLSearchParams(window.location.search);
        
        //Character filter
        var characterlist = ["2b", "amy", "astaroth", "azwel", "cassandra", "cervantes", "geralt", "groh", "haohmaru", "hilde", "inferno", "ivy", "kilik", "maxi", "mitsurugi", "nightmare", "raphael", "seong-mi-na", "setsuka", "siegfried", "sophitia", "taki", "talim", "tira", "voldo", "xianghua", "yoshimitsu", "zasalamel", "hwang"]
        if(characterlist.includes(urlParam.get("character").toLocaleLowerCase())){
            $("#charMultiSelector").val($("#charMultiSelector").val().concat([urlParam.get("character")])).trigger("change")
        }

        //Impact filter
        // if(!isNaN(urlParam.get("imapct"))){
        //     urlImpactFilter = urlParam.get("impact");
        // }

        this.applyFilter();
        
    }

    setCommandFilter(filter){
        function addStance(vStances){
            //Allow for input string and array
            if(typeof(vStances) == 'string'){
                vStances = [vStances]
            }
            //Adds stances 
            $("#stanceMultiselector").val($("#stanceMultiselector").val().concat(vStances)).trigger("change")
            return true
        }

        //A.*K
        //Replace dict 
        var replaceValues = [
            ["11", "(1)"],
            ["22", "(2)"],
            ["33", "(3)"],
            ["44", "(4)"],
            ["55", "(5)"],
            ["66", "(6)"],
            ["77", "(7)"],
            ["88", "(8)"],
            ["99", "(9)"],
        ];
        
        var vFilter = filter.toLowerCase();
        
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
        ]

        for (let index = 0; index < stances.length; index++) {
            if(vFilter.includes(stances[index][0])){
                vFilter = vFilter.replaceAll(stances[index][0], "")
                addStance(stances[index][1]);    
            }
        }

        //Overwrite userinput incase stances are in command field
        $("#commandInput").val(vFilter)
        //#endregion

        for (let index = 0; index < replaceValues.length; index++) {
            vFilter = vFilter.replaceAll(replaceValues[index][0], replaceValues[index][1]);
        }

        //Escapes characters like ( ) [ ]
        vFilter = vFilter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        // Could be replaced by positive lookahead?
        vFilter = vFilter.replaceAll(")", ").*");
        vFilter = vFilter.replaceAll("]", "].*");
        vFilter = vFilter.replaceAll("A", "A.*");
        vFilter = vFilter.replaceAll("B", "B.*");
        vFilter = vFilter.replaceAll("K", "K.*");

        this.commandFilter = vFilter; 
    }

    //#region Simple setters
    setStanceFilter(filter){
        var vFilter = filter;
        for (let index = 0; index < vFilter.length; index++) {
            vFilter[index] = "((?<![A-Za-z])" + vFilter[index] + "(?![A-Za-z]))"
        }
        vFilter = vFilter.join("&");
        this.stanceFilter = vFilter;
    }

    setCharacterFilter(filter){
        this.characterFilter = filter;
    }

    setHitlevelFilter(filter){
        this.hitLevelFilter = filter;
    }
    //#endregion


    applyFilter(){

        var filterArray = [];

        // Code to keep old filter when applying through command search modal
        // if(Dtable.searchBuilder.getDetails().criteria !== undefined && $("#keepFilterBox").val() == true){
        //     filterArray = Object.values(Dtable.searchBuilder.getDetails().criteria);
        //     console.log("DEBUG Keeping filter");
        // }

        //Character filter
        if(this.characterFilter.length > 0){
            var charFilter = [];
            for (let index = 0; index < this.characterFilter.length; index++) {

                charFilter.push(
                    {
                        condition: "=",
                        data: "Character",
                        type: "string",
                        value: [this.characterFilter[index]]
                    }
                );
                
            }
            //console.log(charFilter);
            filterArray.push({
                criteria: charFilter,
                logic: "OR"
            });
        }

        //Hit level
        if(this.hitLevelFilter.length > 0){
            var hitFilter = [];
            for (let index = 0; index < this.hitLevelFilter.length; index++) {

                hitFilter.push(
                    {
                        condition: "contains",
                        data: "Hit level",
                        type: "string",
                        value: [this.hitLevelFilter[index]]
                    }
                );
                
            }
            //console.log(hitLevelFilter);
            filterArray.push({
                criteria: hitFilter,
                logic: "OR"
            });
        }

        //Stance level
        Dtable.column(3).search(this.stanceFilter, true, true, false).draw();

        //Command filter
        Dtable.column(4).search(this.commandFilter, true, true, false).draw();

        //#region Note filters
        if($("#breakAttackCHK").is(":checked")) {
            filterArray.push(
                {
                    condition: "contains",
                    data: "Notes",
                    type: "html",
                    value: [":BA:"],
                }
            );
        }

        if($("#throwCHK").is(":checked")) {
            filterArray.push(
                {
                    condition: "contains",
                    data: "Notes",
                    type: "html",
                    value: [":TH:"],
                }
            );
        }

        if($("#LethalhitCHK").is(":checked")) {
            filterArray.push(
                {
                    condition: "contains",
                    data: "Notes",
                    type: "html",
                    value: [":LH:"],
                }
            );
        }

        if($("#StanceShiftCHK").is(":checked")) {
            filterArray.push(
                {
                    condition: "contains",
                    data: "Notes",
                    type: "html",
                    value: [":SS:"],
                }
            );
        }

        if($("#unblockableCHK").is(":checked")) {
            filterArray.push(
                {
                    condition: "contains",
                    data: "Notes",
                    type: "html",
                    value: [":UA:"],
                }
            );
        }

        if($("#guardImpactCHK").is(":checked")) {
            filterArray.push(
                {
                    condition: "contains",
                    data: "Notes",
                    type: "html",
                    value: [":GI:"],
                }
            );
        }
        //#endregion 


        //Apply filter
        if(this.characterFilter.length != 0){
            Dtable.searchBuilder.rebuild({
                criteria: filterArray,
                logic: "AND"
            });
        }


    }
}

//Create instance of searchFilter as global
var Filters = new searchFilters()


// #region Gloabl icons
var Icons = {
    //Notes
    ":TH:": '<img width="40" height="20" src="Icons/TH.png" value="TH" ></img>',
    ":BA:": '<img width="40" height="20" src="Icons/BA.png" value="BA" ></img>',
    ":GI:": '<img width="40" height="20" src="Icons/GI.png" value="GI" ></img>',
    ":SS:": '<img width="40" height="20" src="Icons/SS.png" value="SS" ></img>',
    ":UA:": '<img width="40" height="20" src="Icons/UA.png" value="UA" ></img>',
    ":LH:": '<img width="40" height="20" src="Icons/LH.png" value="LH" ></img>',
    ":RE:": '<img width="40" height="20" src="Icons/RE.png" value="RE" ></img>',
    ":GC:": '<img width="40" height="20" src="Icons/GC.png" value="GC" ></img>',
    ":AT:": '<img width="40" height="20" src="Icons/AT.png" value="AT" ></img>',
    ":CE:": '<img width="40" height="20" src="Icons/CE.png" value="CE" ></img>',
    ":SC:": '<img width="40" height="20" src="Icons/SC.png" value="SC" ></img>',
    //":TS:": '<img width="40" height="20" src="Icons/TS.png" value = "TS"></img>',

    //Slide combo buttons
    ":a::A:": '<img width="28" height="20" src="Icons/A-A.png" class="mr-1" value = "aA" ></img>',
    ":a::B:": '<img width="28" height="20" src="Icons/A-B.png" class="mr-1" value = "aB" ></img>',
    ":a::K:": '<img width="28" height="20" src="Icons/A-K.png" class="mr-1" value = "aK" ></img>',
    ":a::G:": '<img width="28" height="20" src="Icons/A-G.png" class="mr-1" value = "aG" ></img>',
    ":b::A:": '<img width="28" height="20" src="Icons/B-A.png" class="mr-1" value = "bA" ></img>',
    ":b::B:": '<img width="28" height="20" src="Icons/B-B.png" class="mr-1" value = "bB" ></img>',
    ":b::K:": '<img width="28" height="20" src="Icons/B-K.png" class="mr-1" value = "bK" ></img>',
    ":b::G:": '<img width="28" height="20" src="Icons/B-G.png" class="mr-1" value = "bG" ></img>',
    ":k::A:": '<img width="28" height="20" src="Icons/K-A.png" class="mr-1" value = "kA" ></img>',
    ":k::B:": '<img width="28" height="20" src="Icons/K-B.png" class="mr-1" value = "kB" ></img>',
    ":k::K:": '<img width="28" height="20" src="Icons/K-K.png" class="mr-1" value = "kK" ></img>',
    ":k::G:": '<img width="28" height="20" src="Icons/K-G.png" class="mr-1" value = "kG" ></img>',
    ":g::A:": '<img width="28" height="20" src="Icons/G-A.png" class="mr-1" value = "gA" ></img>',
    ":g::B:": '<img width="28" height="20" src="Icons/G-B.png" class="mr-1" value = "gB" ></img>',
    ":g::K:": '<img width="28" height="20" src="Icons/G-K.png" class="mr-1" value = "gK" ></img>',
    ":g::G:": '<img width="28" height="20" src="Icons/G-G.png" class="mr-1" value = "gG" ></img>',
    
    //Directions
    ":9:": '<img width="20" height="20" src="Icons/9.png" value = "9" ></img>',
    ":8:": '<img width="20" height="20" src="Icons/8.png" value = "8" ></img>',
    ":7:": '<img width="20" height="20" src="Icons/7.png" value = "7" ></img>',
    ":6:": '<img width="20" height="20" src="Icons/6.png" value = "6" ></img>',
    ":5:": '<img width="20" height="20" src="Icons/5.png" value = "5" ></img>',
    ":4:": '<img width="20" height="20" src="Icons/4.png" value = "4" ></img>',
    ":3:": '<img width="20" height="20" src="Icons/3.png" value = "3" ></img>',
    ":2:": '<img width="20" height="20" src="Icons/2.png" value = "2" ></img>',
    ":1:": '<img width="20" height="20" src="Icons/1.png" value = "1" ></img>',

    //Directions held
    ":(9):": '<img width="20" height="20" src="Icons/9-.png" value = "(9)" ></img>',
    ":(8):": '<img width="20" height="20" src="Icons/8-.png" value = "(8)" ></img>',
    ":(7):": '<img width="20" height="20" src="Icons/7-.png" value = "(7)" ></img>',
    ":(6):": '<img width="20" height="20" src="Icons/6-.png" value = "(6)" ></img>',
    ":(4):": '<img width="20" height="20" src="Icons/4-.png" value = "(4)" ></img>',
    ":(3):": '<img width="20" height="20" src="Icons/3-.png" value = "(3)" ></img>',
    ":(2):": '<img width="20" height="20" src="Icons/2-.png" value = "(2)" ></img>',
    ":(1):": '<img width="20" height="20" src="Icons/1-.png" value = "(1)" ></img>',

    //Held buttons
    ":(G):": '<img width="20" height="20" src="Icons/G-.png" class="mr-1" value = "(G)" ></img>',
    ":(A):": '<img width="20" height="20" src="Icons/A-.png" class="mr-1" value = "(A)" ></img>',
    ":(B):": '<img width="20" height="20" src="Icons/B-.png" class="mr-1" value = "(B)" ></img>',
    ":(K):": '<img width="20" height="20" src="Icons/K-.png" class="mr-1" value = "(K)" ></img>',

    //Buttons
    ":G:": '<img width="20" height="20" src="Icons/G.png" class="mr-1" value = "G" ></img>',
    ":A:": '<img width="20" height="20" src="Icons/A.png" class="mr-1" value = "A" ></img>',
    ":B:": '<img width="20" height="20" src="Icons/B.png" class="mr-1" value = "B" ></img>',
    ":K:": '<img width="20" height="20" src="Icons/K.png" class="mr-1" value = "K" ></img>',

    //Slide buttons
    ":g:": '<img width="20" height="20" src="Icons/gs.png" value = "g" ></img>',
    ":a:": '<img width="20" height="20" src="Icons/As.png" value = "a" ></img>',
    ":b:": '<img width="20" height="20" src="Icons/Bs.png" value = "b" ></img>',
    ":k:": '<img width="20" height="20" src="Icons/Ks.png" value = "k" ></img>',

    //Held combo buttons
    ":(A)+(K):": '<img width="46" height="20" src="Icons/AK-.png" class="mr-1" value = "(A)+(K)" ></img>',
    ":(A)+(B):": '<img width="46" height="20" src="Icons/AB-.png" class="mr-1" value = "(A)+(B)" ></img>',
    ":(K)+(G):": '<img width="46" height="20" src="Icons/KG-.png" class="mr-1" value = "(K)+(H)" ></img>',
    ":(B)+(K):": '<img width="46" height="20" src="Icons/BK-.png" class="mr-1" value = "(B+K)" ></img>',
    ":(A)+(G):": '<img width="46" height="20" src="Icons/AG-.png" class="mr-1" value = "(A)+(G)" ></img>',
    ":(B)+(G):": '<img width="46" height="20" src="Icons/BG-.png" class="mr-1" value = "(B+G)" ></img>',

    //Combo buttons
    ":A+K:": '<img width="46" height="20" src="Icons/AK.png" class="mr-1" value="A+K" ></img>',
    ":A+B:": '<img width="46" height="20" src="Icons/AB.png" class="mr-1" value="A+B" ></img>',
    ":K+G:": '<img width="46" height="20" src="Icons/KG.png" class="mr-1" value="K+G" ></img>',
    ":A+G:": '<img width="46" height="20" src="Icons/AG.png" class="mr-1" value="A+G" ></img>',
    ":B+K:": '<img width="46" height="20" src="Icons/BK.png" class="mr-1" value="B+K" ></img>',
    ":B+G:": '<img width="46" height="20" src="Icons/BG.png" class="mr-1" value="B+G" ></img>',

    ":A+B+K:": '<img width="72" height="20" src= "Icons/ABK.png" class="mr-1" value="A+B+K"></img>',
    ":(A)+(B)+(K):": '<img width="72" height="20" src="Icons/ABK-.png" class="mr-1" value="(A+B+K)"></img>',

    //Height
    ":H:": '<img width="20" height="20" src="Icons/H.png" value="H"></img>',
    ":M:": '<img width="20" height="20" src="Icons/M.png" value="M"></img>',
    ":L:": '<img width="20" height="20" src="Icons/L.png" value="L"></img>',
    ":SH:": '<img width="40" height="20" src="Icons/SH.png" value="SH"></img>',
    ":SM:": '<img width="40" height="20" src="Icons/SM.png" value="SM"></img>',
    ":SL:": '<img width="40" height="20" src="Icons/SL.png" value="SL"></img>',

    //Misc
    ":a+b:": '<img width="46" height="20" src="Icons/AB.png" class="mr-1" value="a+b"></img>',
}

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

// #endregion

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
            //Pre process
            results.data.splice(0,3);

            //Add framedata to localstorage
            //localStorage.setItem("Fdata", JSON.stringify(results.data));

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
        data.forEach(function (row, index){
    
            //Sum damage
            sumDamage = row[Fheaders[7]].split(",").map(Number).reduce((partialSum, a) => partialSum + a, 0);
    
    
            //Command
            var Command = row[Fheaders[4]];
            for (let index = 0; index < CommandIcons.length; index++) {
                Command = Command.replaceAll(CommandIcons[index][0], CommandIcons[index][1]);
            }
            Command = Command.replaceAll("_", '<img width="10" height="20" src="Icons/underscore.png" value = "_"></img>');
            var Command =  Command + `<p class="superHidden">${row[Fheaders[4]]}</p>`;
    
    
            //Hit level
            var hitLevel = row[Fheaders[5]];
            for (let index = 0; index < HeightIcons.length; index++) {
                hitLevel = hitLevel.replaceAll(HeightIcons[index][0], HeightIcons[index][1]);
            }
            hitLevel = hitLevel.replaceAll("_", "");
            hitLevel = hitLevel + `<p class="superHidden">${row[Fheaders[5]]}</p>`;
    
    
            //Notes
            var Notes = row[Fheaders[13]];
            for (let index = 0; index < NotesIcons.length; index++) {
                Notes = Notes.replaceAll(NotesIcons[index][0], NotesIcons[index][1]);
            }
            Notes =  Notes + `<p class="superHidden">${row[Fheaders[13]]}</p>`;
    
    
            vData.push([
                row[Fheaders[0]],//"Character"
                row[Fheaders[1]],//"Move category"
                row[Fheaders[2]],//"Move Name"
                row[Fheaders[3]],//"Stance"
                Command,//"Command"
                hitLevel,//"Hit level"
                row[Fheaders[6]],//"Impact",
                row[Fheaders[7]],//"Damage",
                sumDamage,       //"Sum(Damage)"
                row[Fheaders[9]],//"Block",
                row[Fheaders[10]],//"Hit",
                row[Fheaders[11]],//"Counter Hit"
                row[Fheaders[12]],//"Guard Burst"
                Notes,//"Notes"
            ]);
        });
        
        //Save to cache
        localStorage.setItem("vData", JSON.stringify(vData));
    }
    //console.log(`Created vData ${performance.now() - StartTime} milliseconds.`);



    var vDom = `
                <"row mx-0"
                    <"col-6"l>
                    <"col-6 px-0 float-right"B>
                    
                >
                rt
                <"row fixed-bottom mx-0 bg-light"
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
        
        buttons: [
            {
                text: "Command search",
                action: function () {
                    $("#commandSearchModal").modal("show");
                }
            },
            
            "colvis",

            {
                extend: 'collection',
                text: 'Advanced',
                buttons: [
                    { extend: 'searchBuilder', text: 'Advanced search' },
                    { extend: 'copy', text: 'Copy table to clipboard' },
                    { extend: 'excel', text: 'Save as Excel' },
                    { extend: 'csv', text: 'Save as CSV' },
                ]
            },
        ],

        bProcessing: true,
        orderCellsTop: true,
        responsive: false,
        fixedHeader: true,
        deferRender: true,

        pageLength: 20,
        lengthMenu: [[10, 15, 20, 30, 40, 50, -1], [10, 15, 20, 30, 40, 50, "All"]],

        scrollCollapse: true,
        scrollX: true,
        //scrollY: '1vh',
        scrollY: true,
          
        colReorder: {
            realtime: false
        },
        columnDefs: [
            {targets: 0, visible: true},//Character
            {targets: 1, visible: false},//Move category
            {targets: 2, visible: false},//Move Name
            {targets: 3, visible: true,className: 'dt-body-right'},//Stance
            {targets: 4, visible: true, width: "10%",},//Command
            {targets: 5, visible: true,},//Hitlevel
            {targets: 6, visible: true},//impact
            {targets: 7, visible: false},//Damage 
            {targets: 8, type: 'numeric-comma'},//Sum damage
            {targets: 13, visible: true,},//Notes
        ],

        on_resize: function(){
            $('div.dataTables_scrollBody').css('height', newHt, 'maxHeight', newHt);
        },

        searchBuilder: {
            columns: [3,4,5],
        },

        searchCols: [
            null,//"Character"
            null,//"Move categ
            null,//"Move Name"
            { "regex": true },//"Stance"
            { "regex": true },//"Command"
            null,//"Hit level"
            null,//"Impact",
            null,//"Damage",
            null,//"Sum(Damage
            null,//"Block",
            null,//"Hit",
            null,//"Counter H
            null,//"Guard Bur
            null,//"Notes"
        ],
    });

    //Url filters when datatables if finished
    Filters.applyUrlFilter();
}


function refreshFrameData(){
    if(Dtable !== undefined){
        Dtable.destroy();
        $("#fdata").html("");
    }
    downloadFrameData();
}

//#region Command filter modal
//Fires on buttons in command search modal are pressed
function filterModal(e){
    Filters.pushCommandFilter($(this).attr("Value"));
}

function clearCmdFilter(){

    Dtable.searchBuilder.rebuild({});
}

function applyCmdModalFilter(){
    // Enforce char filter
    if($("#charMultiSelector").val().length == 0){
        toastr.warning('Character filter is required please set one', 'Error',{
            target: 'body',
            tapToDismiss: true,
            positionClass: 'toast-top-left',
            timeOut: 4000,
            progressBar:true,
            hideMethod: "slideUp",
          })

        //toastr.warning("Character filter is required.");
        return false;
    }

    //Sets character modal
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
    version = "0.12"
    if(!localStorage.hasOwnProperty("version")){
        localStorage.setItem("version", version);
    }
    
    if(localStorage.getItem("version") != version){
        localStorage.clear("Fdata")
        localStorage.setItem("version", version);
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
    });

    $("#stanceMultiselector").select2({
        allowClear: true,//Adds clear all button
    });
    
    //#endregion


    //#region Buttons
    $("#btnRefreshFramedata").on("click", refreshFrameData);

    //#region Cmd modal
    $(".btnCall input").on("click", filterModal);
    $("#applyCmdModalFilter").on("click", applyCmdModalFilter);
    $("#clearCmdFilter").on("click", clearCmdFilter);

    //onchange couldnt directly call for some reason
    $("#charMultiSelector").on("change", function(){
        Filters.setCharacterFilter($("#charMultiSelector").val())
    });
    
    $("#hitlevelMultiSelector").on("change", function(){
        Filters.setHitlevelFilter($("#hitlevelMultiSelector").val())
    });

    $("#stanceMultiselector").on("change", function(){
        Filters.setStanceFilter($("#stanceMultiselector").val())
    });

    $('#commandSearchModal').on('shown.bs.modal', function () {
        if($("#charMultiSelector").val().length == 0){
            $('#charMultiSelector').focus();
            $('#charMultiSelector').select2("open");
        } else {
            $('#commandInput').focus();
        }
    })  
    //#endregion
        

    //#endregion

    //Determine if data is already downloaded
    if (localStorage.hasOwnProperty("vData")) {
        createTable();
    } else {
        downloadFrameData();
    }
      
    
});