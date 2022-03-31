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


var CommandIcons = [
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

    [":(G):", '<img width="20" height="20" src="icons/G_.png" value = "(G)"></img>'],
    [":G:", '<img width="20" height="20" src="icons/G.png" value = "G"></img>'],
    [":g:", '<img width="20" height="20" src="icons/gs.png" value = "g"></img>'],

    [":(A):", '<img width="20" height="20" src="icons/A_.png" value = "(A)"></img>'],
    [":A:", '<img width="20" height="20" src="icons/A.png" value = "A"></img>'],
    [":a:", '<img width="20" height="20" src="icons/As.png" value = "a"></img>'],

    [":(B):", '<img width="20" height="20" src="icons/B_.png" value = "(B)"></img>'],
    [":B:", '<img width="20" height="20" src="icons/B.png" value = "B"></img>'],
    [":b:", '<img width="20" height="20" src="icons/Bs.png" value = "b"></img>'],

    [":(K):", '<img width="20" height="20" src="icons/K_.png" value = "(K)"></img>'],
    [":K:", '<img width="20" height="20" src="icons/K.png" value = "K"></img>'],
    [":k:", '<img width="20" height="20" src="icons/Ks.png" value = "k"></img>'],

    [":A+K:", '<img width="46" height="20" src="icons/AK.png" value = "A+K"></img>'],
    [":(A)+(K):", '<img width="46" height="20" src="icons/AK_.png" value = "(A)+(K)"></img>'],

    [":A+B:", '<img width="46" height="20" src="icons/AB.png" value = "A+B"></img>'],
    [":a+b:", '<img width="46" height="20" src="icons/AB.png" value = "A+B"></img>'],
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

    //["\_", '<img width="72" height="20" src="icons/underscore.png" value = "underscore"></img>'],

];

function downloadFrameData(){
    const CSVHeaders = ["Character", "Move category", "Move Name", "Stance", "Command", "Hit level", "Impact", "Damage", "Block", "Hit", "Counter Hit", "Guard Burst", "Notes"];
    toastr.warning("Getting framedata...");

    Papa.parse(FrameDataCSV, {
        download: true,
        header: true,
        delimiter: "\t",
        transformHeader: function(header,index){
            //Applies headers from Fheaders
            return CSVHeaders[index];
        },
        //Might not be needed
        beforeFirstChunk: (chunk) => {
            //Removes the header of the csv file
            chunk = chunk.split("*CSV LINE MARKER*,,,,,,,,,,,,,\r\n")[1];
            return chunk;
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

        scrollX: false,
        scrollY: false,
          
        colReorder: {
            realtime: false
        },
        columnDefs: [
            {targets: 0, visible: true},//Character
            {targets: 1, visible: false},//Move category
            {targets: 2, visible: false},//Move Name
            {
                targets: 4, visible: true,
                render: function(data, type, row){
                    value = data;
                    for (let index = 0; index < CommandIcons.length; index++) {
                        value = value.replaceAll(CommandIcons[index][0], CommandIcons[index][1])
                    }
                    return value;
                }
            },//Command
            // {
            //     targets: 5, visible: true,
            //     render: function(data, type, row){
            //         value = data;
            //         for (let index = 0; index < CommandIcons.length; index++) {
            //             value = value.replaceAll(CommandIcons[index][0], CommandIcons[index][1])
            //         }
            //         return value;
            //     }
            // },//Input
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
    