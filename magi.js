/*
    Author: Horseface
    Date: 27/03:2022

    Framedata url: https://docs.google.com/spreadsheets/d/1R3I_LXfqhvFjlHTuj-wSWwwqYmlUf299a3VY9pVyGEw/
        CSV: https://docs.google.com/spreadsheets/d/1R3I_LXfqhvFjlHTuj-wSWwwqYmlUf299a3VY9pVyGEw/export?exportFormat=csv
*/

//Globals
const FrameDataCSV = "https://docs.google.com/spreadsheets/d/1R3I_LXfqhvFjlHTuj-wSWwwqYmlUf299a3VY9pVyGEw/export?exportFormat=tsv";
const Fheaders = ["Character", "Move category", "Move Name", "Stance", "Command", "Hit level", "Impact", "Damage", "Block", "Hit", "Counter Hit", "Guard Burst", "Notes"];
var Fdata;
var Dtable;


function initFrameData(){
    Papa.parse(FrameDataCSV, {
        download: true,
        header: true,
        delimiter: "\t",
        transformHeader: function(header,index){
            //Applies headers from Fheaders
            return Fheaders[index];
        },
        //Might not be needed
        beforeFirstChunk: (chunk) => {
            //Removes the header of the csv file
            chunk = chunk.split("*CSV LINE MARKER*,,,,,,,,,,,,,\r\n")[1]
            return chunk;
        },
        complete: (results) => {
            results.data.splice(0,3);
            Fdata = results.data;
            createTable(Fdata);
        }
    });

}

function createTable(data){
    console.log("before");
    var startHeader = '<thead>';
    var endHeader = '</tr></thead><tbody>';
    var endTable = '</tbody></table>'
    
    //Headers
    var table = startHeader;
    Fheaders.forEach(header => table += `<th scope="col">${header}</th>`);
    table += endHeader

    data.forEach(function (row, index){
        if(index > 1000000){
            return false; //break
        } else {
            table += `<tr>
            <td scope="col">${row[Fheaders[0]]}</td>
            <td scope="col">${row[Fheaders[1]]}</td>
            <td scope="col">${row[Fheaders[2]]}</td>
            <td scope="col">${row[Fheaders[3]]}</td>
            <td scope="col">${row[Fheaders[4]]}</td>
            <td scope="col">${row[Fheaders[5]]}</td>
            <td scope="col">${row[Fheaders[6]]}</td>
            <td scope="col">${row[Fheaders[7]]}</td>
            <td scope="col">${row[Fheaders[8]]}</td>
            <td scope="col">${row[Fheaders[9]]}</td>
            <td scope="col">${row[Fheaders[10]]}</td>
            <td scope="col">${row[Fheaders[11]]}</td>
            <td scope="col">${row[Fheaders[12]]}</td>
            </tr>`
        }
    });

    //End table
    table = table + endTable;

    //Start table
    $('#fdata').html(table);

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
    `
    
    Dtable = $('#fdata').DataTable({
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

$(document).ready(function() {
    initFrameData();
});
    