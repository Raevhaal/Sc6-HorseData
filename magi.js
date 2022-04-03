/*
    Author: Horseface
    Date: 27/03:2022

    Framedata url: https://docs.google.com/spreadsheets/d/1R3I_LXfqhvFjlHTuj-wSWwwqYmlUf299a3VY9pVyGEw/
        CSV: https://docs.google.com/spreadsheets/d/1R3I_LXfqhvFjlHTuj-wSWwwqYmlUf299a3VY9pVyGEw/export?exportFormat=csv
*/

//Globals
const FrameDataCSV = "https://docs.google.com/spreadsheets/d/1R3I_LXfqhvFjlHTuj-wSWwwqYmlUf299a3VY9pVyGEw/export?exportFormat=tsv";

//Var framedata
var Fdata;

//Datatable refrenece
var Dtable;

//
var CharacterFilter = "";
var UrlFilter = "";

//Icons
var CommandIcons = [
    //Slide inputs
    [":a::A:", '<img width="28" height="20" src="icons/A_A.png" value = "aA"></img>'],
    [":a::B:", '<img width="28" height="20" src="icons/A_B.png" value = "aB"></img>'],
    [":a::K:", '<img width="28" height="20" src="icons/A_K.png" value = "aK"></img>'],
    [":a::G:", '<img width="28" height="20" src="icons/A_G.png" value = "aG"></img>'],
    
    [":b::A:", '<img width="28" height="20" src="icons/B_A.png" value = "bA"></img>'],
    [":b::B:", '<img width="28" height="20" src="icons/B_B.png" value = "bB"></img>'],
    [":b::K:", '<img width="28" height="20" src="icons/B_K.png" value = "bK"></img>'],
    [":b::G:", '<img width="28" height="20" src="icons/B_G.png" value = "bG"></img>'],
    
    [":k::A:", '<img width="28" height="20" src="icons/K_A.png" value = "kA"></img>'],
    [":k::B:", '<img width="28" height="20" src="icons/K_B.png" value = "kB"></img>'],
    [":k::K:", '<img width="28" height="20" src="icons/K_K.png" value = "kK"></img>'],
    [":k::G:", '<img width="28" height="20" src="icons/K_G.png" value = "kG"></img>'],
    
    [":g::A:", '<img width="28" height="20" src="icons/G_A.png" value = "gA"></img>'],
    [":g::B:", '<img width="28" height="20" src="icons/G_B.png" value = "gB"></img>'],
    [":g::K:", '<img width="28" height="20" src="icons/G_K.png" value = "gK"></img>'],
    [":g::G:", '<img width="28" height="20" src="icons/G_G.png" value = "gG"></img>'],

    //B6B missing

    //Directions
    [":9:", '<img width="20" height="20" src="icons/9.png" value = "9"></img>'],
    [":8:", '<img width="20" height="20" src="icons/8.png" value = "8"></img>'],
    [":7:", '<img width="20" height="20" src="icons/7.png" value = "7"></img>'],
    [":6:", '<img width="20" height="20" src="icons/6.png" value = "6"></img>'],
    [":5:", '<img width="20" height="20" src="icons/5.png" value = "5"></img>'],
    [":4:", '<img width="20" height="20" src="icons/4.png" value = "4"></img>'],
    [":3:", '<img width="20" height="20" src="icons/3.png" value = "3"></img>'],
    [":2:", '<img width="20" height="20" src="icons/2.png" value = "2"></img>'],
    [":1:", '<img width="20" height="20" src="icons/1.png" value = "1"></img>'],
 
    [":(9):", '<img width="20" height="20" src="icons/9_.png" value = "(9)"></img>'],
    [":(8):", '<img width="20" height="20" src="icons/8_.png" value = "(8)"></img>'],
    [":(7):", '<img width="20" height="20" src="icons/7_.png" value = "(7)"></img>'],
    [":(6):", '<img width="20" height="20" src="icons/6_.png" value = "(6)"></img>'],
    [":(4):", '<img width="20" height="20" src="icons/4_.png" value = "(4)"></img>'],
    [":(3):", '<img width="20" height="20" src="icons/3_.png" value = "(3)"></img>'],
    [":(2):", '<img width="20" height="20" src="icons/2_.png" value = "(2)"></img>'],
    [":(1):", '<img width="20" height="20" src="icons/1_.png" value = "(1)"></img>'],

    //Buttons
    [":(G):", '<img width="20" height="20" src="icons/G_.png" value = "(G)"></img>'],
    [":G:", '<img width="20" height="20" src="icons/G.png" value = "G"></img>'],

    [":(A):", '<img width="20" height="20" src="icons/A_.png" value = "(A)"></img>'],
    [":A:", '<img width="20" height="20" src="icons/A.png" value = "A"></img>'],

    [":(B):", '<img width="20" height="20" src="icons/B_.png" value = "(B)"></img>'],
    [":B:", '<img width="20" height="20" src="icons/B.png" value = "B"></img>'],

    [":(K):", '<img width="20" height="20" src="icons/K_.png" value = "(K)"></img>'],
    [":K:", '<img width="20" height="20" src="icons/K.png" value = "K"></img>'],

    [":A+K:", '<img width="46" height="20" src="icons/AK.png" value = "A+K"></img>'],
    [":(A)+(K):", '<img width="46" height="20" src="icons/AK_.png" value = "(A)+(K)"></img>'],

    [":A+B:", '<img width="46" height="20" src="icons/AB.png" value = "A+B"></img>'],
    [":a+b:", '<img width="46" height="20" src="icons/AB.png" value = "a+b"></img>'],
    [":(A)+(B):", '<img width="46" height="20" src="icons/AB_.png" value = "(A)+(B)"></img>'],

    [":K+G:", '<img width="46" height="20" src="icons/KG.png" value = "K+G"></img>'],
    [":(K)+(G):", '<img width="46" height="20" src="icons/KG_.png" value = "(K)+(H)"></img>'],

    [":A+G:", '<img width="46" height="20" src="icons/AG.png" value = "A+G"></img>'],
    [":(A)+(G):", '<img width="46" height="20" src= "icons/AG_.png" value = "(A)+(G)"></img>'],

    [":B+K:", '<img width="46" height="20" src="icons/BK.png" value = "B+K"></img>'],
    [":b+k:", '<img width="46" height="20" src="icons/BK.png" value = "B+K"></img>'],
    [":(B+K):", '<img width="46" height="20" src="icons/BK_.png" value = "(B+K)"></img>'],
    [":(B)+(K):", '<img width="46" height="20" src="icons/BK_.png" value = "(B+K)"></img>'],

    [":B+G:", '<img width="46" height="20" src="icons/BG.png" value = "B+G"></img>'],
    [":(B)+(G):", '<img width="46" height="20" src="icons/BG_.png" value = "(B+G)"></img>'],
    
    [":A+B+K:", '<img width="72" height="20" src= "icons/ABK.png" value = "A+B+K"></img>'],
    [":(A)+(B)+(K):", '<img width="72" height="20" src="icons/ABK_.png" value = "(A+B+K)"></img>'],

    [":g:", '<img width="20" height="20" src="icons/gs.png" value = "g"></img>'],
    [":a:", '<img width="20" height="20" src="icons/As.png" value = "a"></img>'],
    [":b:", '<img width="20" height="20" src="icons/Bs.png" value = "b"></img>'],
    [":k:", '<img width="20" height="20" src="icons/Ks.png" value = "k"></img>'],

    //["\_", '<img width="72" height="20" src="icons/underscore.png" value = "underscore"></img>'],

];
var HeightIcons = [
    [":H:", '<img width="20" height="20" src="icons/H.png" value = "H"></img>'],
    [":M:", '<img width="20" height="20" src="icons/M.png" value = "M"></img>'],
    [":L:", '<img width="20" height="20" src="icons/L.png" value = "L"></img>'],

    [":SH:", '<img width="40" height="20" src="icons/SH.png" value = "SH"></img>'],
    [":SM:", '<img width="40" height="20" src="icons/SM.png" value = "SM"></img>'],
    [":SL:", '<img width="40" height="20" src="icons/SL.png" value = "SL"></img>'],
];

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
            localStorage.setItem("Fdata", JSON.stringify(results.data));

            createTable(results.data);
            toastr.clear();
        }
    });

}

function createTable(data){
    const Fheaders = ["Character", "Move category", "Move Name", "Stance", "Command", "Hit level", "Impact", "Damage", "Block", "Hit", "Counter Hit", "Guard Burst", "Notes"];

    var vData = [];
    data.forEach(function (row, index){
        vData.push([
            row[Fheaders[0]],
            row[Fheaders[1]],
            row[Fheaders[2]],
            row[Fheaders[3]],
            row[Fheaders[4]],
            row[Fheaders[5]],
            row[Fheaders[6]],
            row[Fheaders[7]],
            row[Fheaders[8]],
            row[Fheaders[9]],
            row[Fheaders[10]],
            row[Fheaders[11]],
            row[Fheaders[12]],
        ]);
    });

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
        data: vData,
        columns: [
            { title: Fheaders[0] },
            { title: Fheaders[1] },
            { title: Fheaders[2] },
            { title: Fheaders[3] },
            { title: Fheaders[4] },
            { title: Fheaders[5] },
            { title: Fheaders[6] },
            { title: Fheaders[7] },
            { title: Fheaders[8] },
            { title: Fheaders[9] },
            { title: Fheaders[10] },
            { title: Fheaders[11] },
            { title: Fheaders[12] },
        ],

        dom: vDom,
        buttons: [
            'colvis',
            'csv',
            'excel',
            'searchBuilder'
        ],

        bProcessing: true,
        orderCellsTop: true,
        responsive: true,
        fixedHeader: true,

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
            {
                targets: 4, 
                visible: true,
                width: "10%",
                render: function(data, type, row){
                    value = data;
                    for (let index = 0; index < CommandIcons.length; index++) {
                        value = value.replaceAll(CommandIcons[index][0], CommandIcons[index][1])
                    }
                    return value;
                }
            },//Command
            {
                targets: 5, visible: true,
                render: function(data, type, row){
                    value = data;
                    for (let index = 0; index < HeightIcons.length; index++) {
                        value = value.replaceAll(HeightIcons[index][0], HeightIcons[index][1])
                    }
                    return value;
                }
            },//Input
            {targets: 7, type: 'numeric-comma'},//Damage
            {targets: 12, visible: true},//Notes
        ],

        searchBuilder: {
            columns: [3,4,5],
        },
    });

    Dtable.searchBuilder.rebuild({
        criteria:[
            {
                condition: '=',
                data: 'Character',
                type: 'string',
                value: [CharacterFilter]
            },
        ],
        logic: 'AND'
    });

    //Dtable.columns(0).search(CharacterFilter).draw()
}


function refreshFrameData(){
    if(Dtable !== undefined){
        Dtable.destroy();
        $("#fdata").html("");
    }
    downloadFrameData();
}

function getUrlParameters(){
    let urlParam = new URLSearchParams(window.location.search)
    CharacterFilter = urlParam.get("character");
}

$(document).ready(function() {
    getUrlParameters();

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
        "hideMethod": "fadeOut"
    };

    //Buttons
    $("#btnRefreshFramedata").on("click", refreshFrameData);

    $("#btnCredits").on("click", function(){
        $("#creditModal").modal("show");
    });


    //
    if (localStorage.hasOwnProperty("Fdata")) {
        createTable(JSON.parse(localStorage.Fdata));
    } else {
        downloadFrameData();
    }
      
    
});
    