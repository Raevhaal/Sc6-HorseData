
// #region Graphs
// TODO: Move to another file
$(document).ready(function() {
    class Graph{
        HeaderIndex = 1;
        HeaderText = "";
        GraphData = [];

        constructor(pGraphDiv, pGraphSelector, pGraphDataSelector) {
            this.GraphDiv = pGraphDiv;
            this.GraphSelector = pGraphSelector;
            this.GraphDataSelector = pGraphDataSelector;
        }

        getGraphdata(){
            this.HeaderIndex = $("#graphDataSelector").val();
            this.HeaderText = $(`select#graphDataSelector option[value=${$("#graphDataSelector").val()}]`).text();
            this.GraphData = Array.from(Dtable.rows( { search: 'applied' } ).data());
        }

        TreeMap(){
            let vGraphData = [];
            let vGraphCounts = {};
        
            this.GraphData.forEach((vRow) => {
                let value = vRow[this.HeaderIndex];
                if(value != ""){
                    if(!vGraphCounts[value]){
                        vGraphCounts[value] = 1;
                    } else {
                        vGraphCounts[value] += 1;
                    }
                }
            });
        
            const vSorted = Object.entries(vGraphCounts).sort((a, b) => a[1] - b[1]);
        
            $.each(vSorted, (pIndex, pRow) => {
                vGraphData.push(
                    {
                        name: pRow[0],
                        value: pRow[1],
                        colorValue: pIndex
                    }
                );
            });

            Highcharts.chart(this.GraphDiv.replace("#",""), {
                type: 'treemap',
                layoutAlgorithm: 'stripes',
                alternateStartingDirection: true,
                levels: [{
                    level: 1,
                    layoutAlgorithm: 'sliceAndDice',
                    dataLabels: {
                        enabled: true,
                        align: 'left',
                        verticalAlign: 'top',
                        style: {
                            fontSize: '15px',
                            fontWeight: 'bold'
                        }
                    }
                }],
                series: [
                    {
                        type: 'treemap',
                        layoutAlgorithm: 'squarified',
                        data: vGraphData
                        // [
                        //     {
                        //         name: 'A',
                        //         value: 6,
                        //         colorValue: 1
                        //     },
                        // ]
                    }
                ],
                title: {
                    text: `${this.HeaderText} Graph`
                }
            });
        }
        
        donut3d(){
            let vGraphData = [];
            let vGraphCounts = {};
        
            this.GraphData.forEach((vRow) => {
                let value = vRow[this.HeaderIndex];
                if(value != ""){
                    if(!vGraphCounts[value]){
                        vGraphCounts[value] = 1;
                    } else {
                        vGraphCounts[value] += 1;
                    }
                }
            });
        
            const vSorted = Object.entries(vGraphCounts).sort((a, b) => a[1] - b[1]);
        
            $.each(vSorted, (pIndex, pRow) => {
                vGraphData.push(
                    [
                        pRow[0],
                        parseInt(pRow[1])
                    ]
                );
            });

            Highcharts.chart(this.GraphDiv.replace("#",""), {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    }
                },
                title: {
                    text: `${this.HeaderText} Graph`,
                    align: 'left'
                },
                plotOptions: {
                    pie: {
                        innerSize: 100,
                        depth: 45
                    }
                },
                series: [{
                    name: 'Medals',
                    data: vGraphData
                }]
            });
        }
        
        createNewGraph(){
            this.getGraphdata();
            switch ($("#graphSelector").val()) {
                case "Treemap":
                    this.TreeMap();
                    break;
                case "Piechart":
                    this.donut3d();
                    break;
                default:
                    console.warn("Ran default route of Graph function");
                    $("#graphDiv").html("");
                    break;   
            }
        }
    };

    var gGraph = new Graph(
        "#graphDiv",
        "#graphSelector",
        "#graphDataSelector",
    );

    $("#updateGraphsBT").on("click", () => {
        gGraph.createNewGraph();
    });
});


// #endregion Graphs