/*
    Author: Horseface
    Date: 27/03:2022

    Framedata url: https://docs.google.com/spreadsheets/d/1R3I_LXfqhvFjlHTuj-wSWwwqYmlUf299a3VY9pVyGEw/
        CSV: https://docs.google.com/spreadsheets/d/1R3I_LXfqhvFjlHTuj-wSWwwqYmlUf299a3VY9pVyGEw/export?exportFormat=csv
*/

//Globals
const FrameDataCSV = "https://docs.google.com/spreadsheets/d/1R3I_LXfqhvFjlHTuj-wSWwwqYmlUf299a3VY9pVyGEw/export?exportFormat=tsv";

var Fdata;
var Dtable;


function initFrameData(){
    const CSVHeaders = ["Character", "Move category", "Move Name", "Stance", "Command", "Hit level", "Impact", "Damage", "Block", "Hit", "Counter Hit", "Guard Burst", "Notes"];

    toastr.options = {
        "closeButton": true,
        "newestOnTop": false,
        "positionClass": "toast-top-left",
        "preventDuplicates": false,
        "onclick": null,
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
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
                <"row mx-md-n5"
                    <"col-6"
                        l
                    >
                    <"col-6 float-right"B>
                    
                >
                rt
                <"row mx-md-n5"
                    <"col-6"i>
                    <"col-6 float-right"p>
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

        scrollX: false,
        scrollY: false,

        searchBuilder: {
            columns: [3,4,5]
        },
          

        colReorder: true,
        columnDefs: [
            {targets: 0, visible: true},//Character
            {targets: 1, visible: false},//Move category
            {targets: 2, visible: false},//Move Name
            {targets: 12, visible: true},//Notes
        ],

    });
}
var Test;
$(document).ready(function() {
    if (localStorage.hasOwnProperty("Fdata")) {
        createTable(JSON.parse(localStorage.Fdata));
    } else {
        initFrameData();
    }
      
    
});
    