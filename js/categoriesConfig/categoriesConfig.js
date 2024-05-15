import { deleteDefaultCategories, updateDefaultCategories } from "../../src/graphql/mutations.js";
import { getCategories, getDefaultCategories, listCategories, listCommunications, listDefaultCategories } from "../../src/graphql/queries";
import { client } from "../amplifyConfig.js";
import {form} from './form.js'

(async function ($) {

    // USE STRICT
    "use strict";

    try {
        //WidgetChart 1
        var ctx = document.getElementById("widgetChart1");
        if (ctx) {
            ctx.height = 130;
            var myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    type: "line",
                    datasets: [
                        {
                            data: [78, 81, 80, 45, 34, 12, 40],
                            label: "Dataset",
                            backgroundColor: "rgba(255,255,255,.1)",
                            borderColor: "rgba(255,255,255,.55)",
                        },
                    ],
                },
                options: {
                    maintainAspectRatio: true,
                    legend: {
                        display: false,
                    },
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        },
                    },
                    responsive: true,
                    scales: {
                        xAxes: [
                            {
                                gridLines: {
                                    color: "transparent",
                                    zeroLineColor: "transparent",
                                },
                                ticks: {
                                    fontSize: 2,
                                    fontColor: "transparent",
                                },
                            },
                        ],
                        yAxes: [
                            {
                                display: false,
                                ticks: {
                                    display: false,
                                },
                            },
                        ],
                    },
                    title: {
                        display: false,
                    },
                    elements: {
                        line: {
                            borderWidth: 0,
                        },
                        point: {
                            radius: 0,
                            hitRadius: 10,
                            hoverRadius: 4,
                        },
                    },
                },
            });
        }

        //WidgetChart 2
        var ctx = document.getElementById("widgetChart2");
        if (ctx) {
            ctx.height = 130;
            var myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: ["January", "February", "March", "April", "May", "June"],
                    type: "line",
                    datasets: [
                        {
                            data: [1, 18, 9, 17, 34, 22],
                            label: "Dataset",
                            backgroundColor: "transparent",
                            borderColor: "rgba(255,255,255,.55)",
                        },
                    ],
                },
                options: {
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },
                    responsive: true,
                    tooltips: {
                        mode: "index",
                        titleFontSize: 12,
                        titleFontColor: "#000",
                        bodyFontColor: "#000",
                        backgroundColor: "#fff",
                        titleFontFamily: "Montserrat",
                        bodyFontFamily: "Montserrat",
                        cornerRadius: 3,
                        intersect: false,
                    },
                    scales: {
                        xAxes: [
                            {
                                gridLines: {
                                    color: "transparent",
                                    zeroLineColor: "transparent",
                                },
                                ticks: {
                                    fontSize: 2,
                                    fontColor: "transparent",
                                },
                            },
                        ],
                        yAxes: [
                            {
                                display: false,
                                ticks: {
                                    display: false,
                                },
                            },
                        ],
                    },
                    title: {
                        display: false,
                    },
                    elements: {
                        line: {
                            tension: 0.00001,
                            borderWidth: 1,
                        },
                        point: {
                            radius: 4,
                            hitRadius: 10,
                            hoverRadius: 4,
                        },
                    },
                },
            });
        }

        //WidgetChart 3
        var ctx = document.getElementById("widgetChart3");
        if (ctx) {
            ctx.height = 130;
            var myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: ["January", "February", "March", "April", "May", "June"],
                    type: "line",
                    datasets: [
                        {
                            data: [65, 59, 84, 84, 51, 55],
                            label: "Dataset",
                            backgroundColor: "transparent",
                            borderColor: "rgba(255,255,255,.55)",
                        },
                    ],
                },
                options: {
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },
                    responsive: true,
                    tooltips: {
                        mode: "index",
                        titleFontSize: 12,
                        titleFontColor: "#000",
                        bodyFontColor: "#000",
                        backgroundColor: "#fff",
                        titleFontFamily: "Montserrat",
                        bodyFontFamily: "Montserrat",
                        cornerRadius: 3,
                        intersect: false,
                    },
                    scales: {
                        xAxes: [
                            {
                                gridLines: {
                                    color: "transparent",
                                    zeroLineColor: "transparent",
                                },
                                ticks: {
                                    fontSize: 2,
                                    fontColor: "transparent",
                                },
                            },
                        ],
                        yAxes: [
                            {
                                display: false,
                                ticks: {
                                    display: false,
                                },
                            },
                        ],
                    },
                    title: {
                        display: false,
                    },
                    elements: {
                        line: {
                            borderWidth: 1,
                        },
                        point: {
                            radius: 4,
                            hitRadius: 10,
                            hoverRadius: 4,
                        },
                    },
                },
            });
        }

        //WidgetChart 4
        var ctx = document.getElementById("widgetChart4");
        if (ctx) {
            ctx.height = 115;
            var myChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    datasets: [
                        {
                            label: "My First dataset",
                            data: [78, 81, 80, 65, 58, 75, 60, 75, 65, 60, 60, 75],
                            borderColor: "transparent",
                            borderWidth: "0",
                            backgroundColor: "rgba(255,255,255,.3)",
                        },
                    ],
                },
                options: {
                    maintainAspectRatio: true,
                    legend: {
                        display: false,
                    },
                    scales: {
                        xAxes: [
                            {
                                display: false,
                                categoryPercentage: 1,
                                barPercentage: 0.65,
                            },
                        ],
                        yAxes: [
                            {
                                display: false,
                            },
                        ],
                    },
                },
            });
        }

        // Recent Report
        const brandProduct = "rgba(0,181,233,0.8)";
        const brandService = "rgba(0,173,95,0.8)";

        var elements = 10;
        var data1 = [52, 60, 55, 50, 65, 80, 57, 70, 105, 115];
        var data2 = [102, 70, 80, 100, 56, 53, 80, 75, 65, 90];

        var ctx = document.getElementById("recent-rep-chart");
        if (ctx) {
            ctx.height = 250;
            var myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", ""],
                    datasets: [
                        {
                            label: "My First dataset",
                            backgroundColor: brandService,
                            borderColor: "transparent",
                            pointHoverBackgroundColor: "#fff",
                            borderWidth: 0,
                            data: data1,
                        },
                        {
                            label: "My Second dataset",
                            backgroundColor: brandProduct,
                            borderColor: "transparent",
                            pointHoverBackgroundColor: "#fff",
                            borderWidth: 0,
                            data: data2,
                        },
                    ],
                },
                options: {
                    maintainAspectRatio: true,
                    legend: {
                        display: false,
                    },
                    responsive: true,
                    scales: {
                        xAxes: [
                            {
                                gridLines: {
                                    drawOnChartArea: true,
                                    color: "#f2f2f2",
                                },
                                ticks: {
                                    fontFamily: "Poppins",
                                    fontSize: 12,
                                },
                            },
                        ],
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    maxTicksLimit: 5,
                                    stepSize: 50,
                                    max: 150,
                                    fontFamily: "Poppins",
                                    fontSize: 12,
                                },
                                gridLines: {
                                    display: true,
                                    color: "#f2f2f2",
                                },
                            },
                        ],
                    },
                    elements: {
                        point: {
                            radius: 0,
                            hitRadius: 10,
                            hoverRadius: 4,
                            hoverBorderWidth: 3,
                        },
                    },
                },
            });
        }

        // Percent Chart
        var ctx = document.getElementById("percent-chart");
        if (ctx) {
            ctx.height = 280;
            var myChart = new Chart(ctx, {
                type: "doughnut",
                data: {
                    datasets: [
                        {
                            label: "My First dataset",
                            data: [60, 40],
                            backgroundColor: ["#00b5e9", "#fa4251"],
                            hoverBackgroundColor: ["#00b5e9", "#fa4251"],
                            borderWidth: [0, 0],
                            hoverBorderColor: ["transparent", "transparent"],
                        },
                    ],
                    labels: ["Products", "Services"],
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    cutoutPercentage: 55,
                    animation: {
                        animateScale: true,
                        animateRotate: true,
                    },
                    legend: {
                        display: false,
                    },
                    tooltips: {
                        titleFontFamily: "Poppins",
                        xPadding: 15,
                        yPadding: 10,
                        caretPadding: 0,
                        bodyFontSize: 16,
                    },
                },
            });
        }
    } catch (error) {
        console.log(error);
    }

    try {
        // Recent Report 2
        const bd_brandProduct2 = "rgba(0,181,233,0.9)";
        const bd_brandService2 = "rgba(0,173,95,0.9)";
        const brandProduct2 = "rgba(0,181,233,0.2)";
        const brandService2 = "rgba(0,173,95,0.2)";

        var data3 = [52, 60, 55, 50, 65, 80, 57, 70, 105, 115];
        var data4 = [102, 70, 80, 100, 56, 53, 80, 75, 65, 90];

        var ctx = document.getElementById("recent-rep2-chart");
        if (ctx) {
            ctx.height = 230;
            var myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", ""],
                    datasets: [
                        {
                            label: "My First dataset",
                            backgroundColor: brandService2,
                            borderColor: bd_brandService2,
                            pointHoverBackgroundColor: "#fff",
                            borderWidth: 0,
                            data: data3,
                        },
                        {
                            label: "My Second dataset",
                            backgroundColor: brandProduct2,
                            borderColor: bd_brandProduct2,
                            pointHoverBackgroundColor: "#fff",
                            borderWidth: 0,
                            data: data4,
                        },
                    ],
                },
                options: {
                    maintainAspectRatio: true,
                    legend: {
                        display: false,
                    },
                    responsive: true,
                    scales: {
                        xAxes: [
                            {
                                gridLines: {
                                    drawOnChartArea: true,
                                    color: "#f2f2f2",
                                },
                                ticks: {
                                    fontFamily: "Poppins",
                                    fontSize: 12,
                                },
                            },
                        ],
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    maxTicksLimit: 5,
                                    stepSize: 50,
                                    max: 150,
                                    fontFamily: "Poppins",
                                    fontSize: 12,
                                },
                                gridLines: {
                                    display: true,
                                    color: "#f2f2f2",
                                },
                            },
                        ],
                    },
                    elements: {
                        point: {
                            radius: 0,
                            hitRadius: 10,
                            hoverRadius: 4,
                            hoverBorderWidth: 3,
                        },
                        line: {
                            tension: 0,
                        },
                    },
                },
            });
        }
    } catch (error) {
        console.log(error);
    }

    try {
        // Recent Report 3
        const bd_brandProduct3 = "rgba(0,181,233,0.9)";
        const bd_brandService3 = "rgba(0,173,95,0.9)";
        const brandProduct3 = "transparent";
        const brandService3 = "transparent";

        var data5 = [52, 60, 55, 50, 65, 80, 57, 115];
        var data6 = [102, 70, 80, 100, 56, 53, 80, 90];

        var ctx = document.getElementById("recent-rep3-chart");
        if (ctx) {
            ctx.height = 230;
            var myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July", ""],
                    datasets: [
                        {
                            label: "My First dataset",
                            backgroundColor: brandService3,
                            borderColor: bd_brandService3,
                            pointHoverBackgroundColor: "#fff",
                            borderWidth: 0,
                            data: data5,
                            pointBackgroundColor: bd_brandService3,
                        },
                        {
                            label: "My Second dataset",
                            backgroundColor: brandProduct3,
                            borderColor: bd_brandProduct3,
                            pointHoverBackgroundColor: "#fff",
                            borderWidth: 0,
                            data: data6,
                            pointBackgroundColor: bd_brandProduct3,
                        },
                    ],
                },
                options: {
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },
                    responsive: true,
                    scales: {
                        xAxes: [
                            {
                                gridLines: {
                                    drawOnChartArea: true,
                                    color: "#f2f2f2",
                                },
                                ticks: {
                                    fontFamily: "Poppins",
                                    fontSize: 12,
                                },
                            },
                        ],
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    maxTicksLimit: 5,
                                    stepSize: 50,
                                    max: 150,
                                    fontFamily: "Poppins",
                                    fontSize: 12,
                                },
                                gridLines: {
                                    display: false,
                                    color: "#f2f2f2",
                                },
                            },
                        ],
                    },
                    elements: {
                        point: {
                            radius: 3,
                            hoverRadius: 4,
                            hoverBorderWidth: 3,
                            backgroundColor: "#333",
                        },
                    },
                },
            });
        }
    } catch (error) {
        console.log(error);
    }

    try {
        //WidgetChart 5
        var ctx = document.getElementById("widgetChart5");
        if (ctx) {
            ctx.height = 220;
            var myChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    datasets: [
                        {
                            label: "My First dataset",
                            data: [78, 81, 80, 64, 65, 80, 70, 75, 67, 85, 66, 68],
                            borderColor: "transparent",
                            borderWidth: "0",
                            backgroundColor: "#ccc",
                        },
                    ],
                },
                options: {
                    maintainAspectRatio: true,
                    legend: {
                        display: false,
                    },
                    scales: {
                        xAxes: [
                            {
                                display: false,
                                categoryPercentage: 1,
                                barPercentage: 0.65,
                            },
                        ],
                        yAxes: [
                            {
                                display: false,
                            },
                        ],
                    },
                },
            });
        }
    } catch (error) {
        console.log(error);
    }

    try {
        // Percent Chart 2
        var ctx = document.getElementById("percent-chart2");
        if (ctx) {
            ctx.height = 209;
            var myChart = new Chart(ctx, {
                type: "doughnut",
                data: {
                    datasets: [
                        {
                            label: "My First dataset",
                            data: [60, 40],
                            backgroundColor: ["#00b5e9", "#fa4251"],
                            hoverBackgroundColor: ["#00b5e9", "#fa4251"],
                            borderWidth: [0, 0],
                            hoverBorderColor: ["transparent", "transparent"],
                        },
                    ],
                    labels: ["Products", "Services"],
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    cutoutPercentage: 87,
                    animation: {
                        animateScale: true,
                        animateRotate: true,
                    },
                    legend: {
                        display: false,
                        position: "bottom",
                        labels: {
                            fontSize: 14,
                            fontFamily: "Poppins,sans-serif",
                        },
                    },
                    tooltips: {
                        titleFontFamily: "Poppins",
                        xPadding: 15,
                        yPadding: 10,
                        caretPadding: 0,
                        bodyFontSize: 16,
                    },
                },
            });
        }
    } catch (error) {
        console.log(error);
    }

    try {
        //Sales chart
        var ctx = document.getElementById("sales-chart");
        if (ctx) {
            ctx.height = 150;
            var myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016"],
                    type: "line",
                    defaultFontFamily: "Poppins",
                    datasets: [
                        {
                            label: "Foods",
                            data: [0, 30, 10, 120, 50, 63, 10],
                            backgroundColor: "transparent",
                            borderColor: "rgba(220,53,69,0.75)",
                            borderWidth: 3,
                            pointStyle: "circle",
                            pointRadius: 5,
                            pointBorderColor: "transparent",
                            pointBackgroundColor: "rgba(220,53,69,0.75)",
                        },
                        {
                            label: "Electronics",
                            data: [0, 50, 40, 80, 40, 79, 120],
                            backgroundColor: "transparent",
                            borderColor: "rgba(40,167,69,0.75)",
                            borderWidth: 3,
                            pointStyle: "circle",
                            pointRadius: 5,
                            pointBorderColor: "transparent",
                            pointBackgroundColor: "rgba(40,167,69,0.75)",
                        },
                    ],
                },
                options: {
                    responsive: true,
                    tooltips: {
                        mode: "index",
                        titleFontSize: 12,
                        titleFontColor: "#000",
                        bodyFontColor: "#000",
                        backgroundColor: "#fff",
                        titleFontFamily: "Poppins",
                        bodyFontFamily: "Poppins",
                        cornerRadius: 3,
                        intersect: false,
                    },
                    legend: {
                        display: false,
                        labels: {
                            usePointStyle: true,
                            fontFamily: "Poppins",
                        },
                    },
                    scales: {
                        xAxes: [
                            {
                                display: true,
                                gridLines: {
                                    display: false,
                                    drawBorder: false,
                                },
                                scaleLabel: {
                                    display: false,
                                    labelString: "Month",
                                },
                                ticks: {
                                    fontFamily: "Poppins",
                                },
                            },
                        ],
                        yAxes: [
                            {
                                display: true,
                                gridLines: {
                                    display: false,
                                    drawBorder: false,
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: "Value",
                                    fontFamily: "Poppins",
                                },
                                ticks: {
                                    fontFamily: "Poppins",
                                },
                            },
                        ],
                    },
                    title: {
                        display: false,
                        text: "Normal Legend",
                    },
                },
            });
        }
    } catch (error) {
        console.log(error);
    }

    try {
        //Team chart
        var ctx = document.getElementById("team-chart");
        if (ctx) {
            ctx.height = 150;
            var myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016"],
                    type: "line",
                    defaultFontFamily: "Poppins",
                    datasets: [
                        {
                            data: [0, 7, 3, 5, 2, 10, 7],
                            label: "Expense",
                            backgroundColor: "rgba(0,103,255,.15)",
                            borderColor: "rgba(0,103,255,0.5)",
                            borderWidth: 3.5,
                            pointStyle: "circle",
                            pointRadius: 5,
                            pointBorderColor: "transparent",
                            pointBackgroundColor: "rgba(0,103,255,0.5)",
                        },
                    ],
                },
                options: {
                    responsive: true,
                    tooltips: {
                        mode: "index",
                        titleFontSize: 12,
                        titleFontColor: "#000",
                        bodyFontColor: "#000",
                        backgroundColor: "#fff",
                        titleFontFamily: "Poppins",
                        bodyFontFamily: "Poppins",
                        cornerRadius: 3,
                        intersect: false,
                    },
                    legend: {
                        display: false,
                        position: "top",
                        labels: {
                            usePointStyle: true,
                            fontFamily: "Poppins",
                        },
                    },
                    scales: {
                        xAxes: [
                            {
                                display: true,
                                gridLines: {
                                    display: false,
                                    drawBorder: false,
                                },
                                scaleLabel: {
                                    display: false,
                                    labelString: "Month",
                                },
                                ticks: {
                                    fontFamily: "Poppins",
                                },
                            },
                        ],
                        yAxes: [
                            {
                                display: true,
                                gridLines: {
                                    display: false,
                                    drawBorder: false,
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: "Value",
                                    fontFamily: "Poppins",
                                },
                                ticks: {
                                    fontFamily: "Poppins",
                                },
                            },
                        ],
                    },
                    title: {
                        display: false,
                    },
                },
            });
        }
    } catch (error) {
        console.log(error);
    }

    try {
        //bar chart
        var ctx = document.getElementById("barChart");
        if (ctx) {
            ctx.height = 200;
            var myChart = new Chart(ctx, {
                type: "bar",
                defaultFontFamily: "Poppins",
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: [
                        {
                            label: "My First dataset",
                            data: [65, 59, 80, 81, 56, 55, 40],
                            borderColor: "rgba(0, 123, 255, 0.9)",
                            borderWidth: "0",
                            backgroundColor: "rgba(0, 123, 255, 0.5)",
                            fontFamily: "Poppins",
                        },
                        {
                            label: "My Second dataset",
                            data: [28, 48, 40, 19, 86, 27, 90],
                            borderColor: "rgba(0,0,0,0.09)",
                            borderWidth: "0",
                            backgroundColor: "rgba(0,0,0,0.07)",
                            fontFamily: "Poppins",
                        },
                    ],
                },
                options: {
                    legend: {
                        position: "top",
                        labels: {
                            fontFamily: "Poppins",
                        },
                    },
                    scales: {
                        xAxes: [
                            {
                                ticks: {
                                    fontFamily: "Poppins",
                                },
                            },
                        ],
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    fontFamily: "Poppins",
                                },
                            },
                        ],
                    },
                },
            });
        }
    } catch (error) {
        console.log(error);
    }

    try {
        //radar chart
        var ctx = document.getElementById("radarChart");
        if (ctx) {
            ctx.height = 200;
            var myChart = new Chart(ctx, {
                type: "radar",
                data: {
                    labels: [["Eating", "Dinner"], ["Drinking", "Water"], "Sleeping", ["Designing", "Graphics"], "Coding", "Cycling", "Running"],
                    defaultFontFamily: "Poppins",
                    datasets: [
                        {
                            label: "My First dataset",
                            data: [65, 59, 66, 45, 56, 55, 40],
                            borderColor: "rgba(0, 123, 255, 0.6)",
                            borderWidth: "1",
                            backgroundColor: "rgba(0, 123, 255, 0.4)",
                        },
                        {
                            label: "My Second dataset",
                            data: [28, 12, 40, 19, 63, 27, 87],
                            borderColor: "rgba(0, 123, 255, 0.7",
                            borderWidth: "1",
                            backgroundColor: "rgba(0, 123, 255, 0.5)",
                        },
                    ],
                },
                options: {
                    legend: {
                        position: "top",
                        labels: {
                            fontFamily: "Poppins",
                        },
                    },
                    scale: {
                        ticks: {
                            beginAtZero: true,
                            fontFamily: "Poppins",
                        },
                    },
                },
            });
        }
    } catch (error) {
        console.log(error);
    }

    try {
        //line chart
        var ctx = document.getElementById("lineChart");
        if (ctx) {
            ctx.height = 150;
            var myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    defaultFontFamily: "Poppins",
                    datasets: [
                        {
                            label: "My First dataset",
                            borderColor: "rgba(0,0,0,.09)",
                            borderWidth: "1",
                            backgroundColor: "rgba(0,0,0,.07)",
                            data: [22, 44, 67, 43, 76, 45, 12],
                        },
                        {
                            label: "My Second dataset",
                            borderColor: "rgba(0, 123, 255, 0.9)",
                            borderWidth: "1",
                            backgroundColor: "rgba(0, 123, 255, 0.5)",
                            pointHighlightStroke: "rgba(26,179,148,1)",
                            data: [16, 32, 18, 26, 42, 33, 44],
                        },
                    ],
                },
                options: {
                    legend: {
                        position: "top",
                        labels: {
                            fontFamily: "Poppins",
                        },
                    },
                    responsive: true,
                    tooltips: {
                        mode: "index",
                        intersect: false,
                    },
                    hover: {
                        mode: "nearest",
                        intersect: true,
                    },
                    scales: {
                        xAxes: [
                            {
                                ticks: {
                                    fontFamily: "Poppins",
                                },
                            },
                        ],
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    fontFamily: "Poppins",
                                },
                            },
                        ],
                    },
                },
            });
        }
    } catch (error) {
        console.log(error);
    }

    try {
        //doughut chart
        var ctx = document.getElementById("doughutChart");
        if (ctx) {
            ctx.height = 150;
            var myChart = new Chart(ctx, {
                type: "doughnut",
                data: {
                    datasets: [
                        {
                            data: [45, 25, 20, 10],
                            backgroundColor: ["rgba(0, 123, 255,0.9)", "rgba(0, 123, 255,0.7)", "rgba(0, 123, 255,0.5)", "rgba(0,0,0,0.07)"],
                            hoverBackgroundColor: ["rgba(0, 123, 255,0.9)", "rgba(0, 123, 255,0.7)", "rgba(0, 123, 255,0.5)", "rgba(0,0,0,0.07)"],
                        },
                    ],
                    labels: ["Green", "Green", "Green", "Green"],
                },
                options: {
                    legend: {
                        position: "top",
                        labels: {
                            fontFamily: "Poppins",
                        },
                    },
                    responsive: true,
                },
            });
        }
    } catch (error) {
        console.log(error);
    }

    try {
        //pie chart
        var ctx = document.getElementById("pieChart");
        if (ctx) {
            ctx.height = 200;
            var myChart = new Chart(ctx, {
                type: "pie",
                data: {
                    datasets: [
                        {
                            data: [45, 25, 20, 10],
                            backgroundColor: ["rgba(0, 123, 255,0.9)", "rgba(0, 123, 255,0.7)", "rgba(0, 123, 255,0.5)", "rgba(0,0,0,0.07)"],
                            hoverBackgroundColor: ["rgba(0, 123, 255,0.9)", "rgba(0, 123, 255,0.7)", "rgba(0, 123, 255,0.5)", "rgba(0,0,0,0.07)"],
                        },
                    ],
                    labels: ["Green", "Green", "Green"],
                },
                options: {
                    legend: {
                        position: "top",
                        labels: {
                            fontFamily: "Poppins",
                        },
                    },
                    responsive: true,
                },
            });
        }
    } catch (error) {
        console.log(error);
    }

    try {
        // polar chart
        var ctx = document.getElementById("polarChart");
        if (ctx) {
            ctx.height = 200;
            var myChart = new Chart(ctx, {
                type: "polarArea",
                data: {
                    datasets: [
                        {
                            data: [15, 18, 9, 6, 19],
                            backgroundColor: ["rgba(0, 123, 255,0.9)", "rgba(0, 123, 255,0.8)", "rgba(0, 123, 255,0.7)", "rgba(0,0,0,0.2)", "rgba(0, 123, 255,0.5)"],
                        },
                    ],
                    labels: ["Green", "Green", "Green", "Green"],
                },
                options: {
                    legend: {
                        position: "top",
                        labels: {
                            fontFamily: "Poppins",
                        },
                    },
                    responsive: true,
                },
            });
        }
    } catch (error) {
        console.log(error);
    }

    try {
        // single bar chart
        var ctx = document.getElementById("singelBarChart");
        if (ctx) {
            ctx.height = 150;
            var myChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["Sun", "Mon", "Tu", "Wed", "Th", "Fri", "Sat"],
                    datasets: [
                        {
                            label: "My First dataset",
                            data: [40, 55, 75, 81, 56, 55, 40],
                            borderColor: "rgba(0, 123, 255, 0.9)",
                            borderWidth: "0",
                            backgroundColor: "rgba(0, 123, 255, 0.5)",
                        },
                    ],
                },
                options: {
                    legend: {
                        position: "top",
                        labels: {
                            fontFamily: "Poppins",
                        },
                    },
                    scales: {
                        xAxes: [
                            {
                                ticks: {
                                    fontFamily: "Poppins",
                                },
                            },
                        ],
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    fontFamily: "Poppins",
                                },
                            },
                        ],
                    },
                },
            });
        }
    } catch (error) {
        console.log(error);
    }
})(jQuery);
(async function ($) {
    // USE STRICT
    "use strict";
    try {
        const {data : {listCommunications: { items}}} = await client.graphql({
            query: listCommunications
        });
        const dataSet = items.map(e => {const values = Object.values(e); 
            return values})

        let categories, defaultCategories = await client.graphql({
            query: listDefaultCategories
        }), customCategories = await client.graphql({query: listCategories})
      
        categories = [...defaultCategories.data.listDefaultCategories.items, ...customCategories.data.listCategories.items]

        ///007 ERROR NO FUNCIONAN EL SIDEBAR LAS CATEGORIAS AL AHCERSE PARA MIVL EN EL HTML CATEGORIES

        // Obtener el elemento ul donde se agregarán las categorías
        const ul2 = document.querySelector(".js-sub-list");
        // Crear las categorías y agregarlas al elemento ul

        categories.forEach((category) => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            const icon = document.createElement("i");

            a.href = "Categories.html";
            a.classList.add("showTable");
            icon.classList.add("fas", "fa-tags");
            a.appendChild(icon);
            a.appendChild(document.createTextNode(category.categoryName));
            li.appendChild(a);
            ul2.appendChild(li);
        });

        dataSet.forEach((r, index) => {
            var div1 = document.createElement("div");
            var category = r[2];
            var badgeClass = "";

            switch (category) {
                case "Active":
                    badgeClass = "badge-primary";
                    break;
                case "Inactive":
                    badgeClass = "badge-success";
                    break;
                case "Pending":
                    badgeClass = "badge-warning";
                    break;
                case "Blocked":
                    badgeClass = "badge-danger";
                    break;
                case "On Hold":
                    badgeClass = "badge-info";
                    break;
                default:
                    badgeClass = "badge-secondary";
                    break;
            }

            div1.innerHTML = `<span class="badge ${badgeClass}">${category}</span>`;
            r[2] = div1;

            var div3 = document.createElement("div");
            div3.innerHTML = r[3];
            r[3] = div3;

            var buttonContainer1 = document.createElement("div");
            buttonContainer1.className = "view1  d-flex justify-content-center";
            buttonContainer1.innerHTML = `
                <button  class="btn btn-outline-primary" style="margin-right: 5px;" ><i class="fas fa-eye"></i></button>
            `;

            var buttonContainer2 = document.createElement("div");
            buttonContainer2.className = "view2  d-flex justify-content-center";
            buttonContainer2.innerHTML = `
                <button  class="btn btn-outline-primary" style="margin-right: 5px;" ><i class="fas fa-eye"></i></button>
            `;

            var buttonContainer3 = document.createElement("div");
            buttonContainer3.className = "view3 d-flex justify-content-center";
            buttonContainer3.innerHTML = `
                <button  class="btn btn-outline-primary" style="margin-right: 5px;" ><i class="fas fa-eye"></i></button>
            `;

            var buttonContainer = document.createElement("div");

            buttonContainer.innerHTML = `
                <button  class="edit btn btn-primary" style="margin-right: 5px;"><i class="fas fa-pencil-alt"></i></button>
              <button class="validate btn btn-success" style="background-color: #86dfc4e7;"><i class="fas fa-check"></i></button>
            `;

            r.push(buttonContainer1);
            r.push(buttonContainer2);
            r.push(buttonContainer3);
            r.push(buttonContainer);
            
        });

        new DataTable("#tabla", {
            columns: [
                { title: "Com ID" },
                { title: "Channel" },
                { title: "Category" },
                { title: "Datetime" },
                { title: "From" },
                { title: "To" },
                { title: "Response AI" },
                { title: "Response Attachment" },
                { title: "Message Content" },
                { title: "Response Content" },
                { title: "Thread" },
                { title: "Acciones" },
            ],
            data: dataSet,
            layout: {
                topStart: {
                    buttons: ["csv", "excel", "pdf", "print"],
                },
            },
        });

        let table = new DataTable("#tabla");

        ////////////////////MODALES////////////////////////////////////////

        table.on("click", "tbody .edit", function () {
            let data = table.row($(this).closest("tr")).data();

            // Aquí puedes abrir el modal y mostrar el formulario con los campos de la fila
            // Utiliza el modal de Bootstrap

            // Crea el formulario con los campos de la fila
            let form = $("<form>");
            form.append(
                $("<div>")
                    .addClass("form-row")
                    .append($("<div>").addClass("form-group1 col-md-6").append($("<label>").text("From:")).append($("<input>").attr("type", "text").addClass("form-control").prop("disabled", true).val(data[0])))
                    .append($("<div>").addClass("form-group1 col-md-6").append($("<label>").text("Datetime:")).append($("<input>").attr("type", "text").addClass("form-control").prop("disabled", true).val(data[0])))
            );

            form.append(
                $("<div>")
                    .addClass("form-row")
                    .append(
                        $("<div>")
                            .addClass("form-group1 col-md-6")
                            .append(
                                $("<label>").text("Category:"),
                                $("<select>")
                                    .addClass("form-control")
                                    .val(data[0])
                                    .append($("<option>").text("Opción 1").val("opcion1"), $("<option>").text("Opción 2").val("opcion2"), $("<option>").text("Opción 3").val("opcion3"))
                            ),

                        $("<div>").addClass("form-group1 col-md-6").append($("<label>").text("Response attachment"), $("<input>").attr("type", "text").addClass("form-control").val(data[4]))
                    )
            );
            form.append($("<div>").addClass("form-group1").append($("<label>").text("Response AI:")).append($("<input>").attr("type", "text").addClass("form-control").val(data[5])));

            form.append($("<div>").addClass("form-group1").append($("<label>").text("Message subjet:")).append($("<input>").attr("type", "text").addClass("form-control").prop("disabled", true).val(data[0])));
            form.append($("<div>").addClass("form-group1").append($("<label>").text("Message Body:")).append($("<textarea>").addClass("form-control").prop("disabled", true).val(data[1]))); // Crea el modal con el formulario
            form.append($("<div>").addClass("form-group1").append($("<label>").text("Response Subjet:")).append($("<input>").attr("type", "text").addClass("form-control").val(data[2])));
            form.append($("<div>").addClass("form-group1").append($("<label>").text("Response Body:")).append($("<textarea>").addClass("form-control").val(data[3])));
            // Crea el modal con el formulario
            let modal = $("<div>").addClass("modal fade").attr("id", "myModal");
            let modalDialog = $("<div>").addClass("modal-dialog");
            let modalContent = $("<div>").addClass("modal-content");
            let modalHeader = $("<div>").addClass("modal-header");
            let modalBody = $("<div>").addClass("modal-body").append(form);
            let modalFooter = $("<div>")
                .addClass("modal-footer")
                .append($("<button>").addClass("btn btn-primary").text("Guardar").attr("data-dismiss", "modal"))
                .append($("<button>").addClass("btn btn-secondary").text("Cancelar").attr("data-dismiss", "modal"));
            modalContent.append(modalHeader);
            modalContent.append(modalBody);
            modalContent.append(modalFooter);
            modalDialog.append(modalContent);
            modal.append(modalDialog);

            // Agrega el modal al documento
            $("body").append(modal);

            // Abre el modal al hacer clic en el botón de editar
            $("#myModal").modal("show");
        });
        /////////////vista 1 detalle del MAIL/////////////////////
        table.on("click", "tbody .view1",async function () {
            //message content detail
            let data = table.row($(this).closest("tr")).data();

            const content = await window.MyVars.then(async (data) => {
                const arr = await data.showMessageContent();
                return arr
            })
            

            // Aquí puedes abrir el modal y mostrar el formulario con los campos de la fila
            // Utiliza el modal de Bootstrap

            // Crea el formulario con los campos de la fila
            let form = $("<form>");
            form.append(
                $("<div>")
                    .addClass("form-row")
                    .append(
                        $("<div>")
                            .addClass("form-group2 col-md-6")
                            .append(
                                $("<label>").text("Category:"),
                                $("<select>")
                                    .addClass("form-control")
                                    .prop("disabled", true)
                                    .val(data[0])
                                    .append($("<option>").text("Opción 1").val("opcion1"), $("<option>").text("Opción 2").val("opcion2"), $("<option>").text("Opción 3").val("opcion3"))
                            )
                    )
            );
            form.append(
                $("<div>")
                    .addClass("form-row")
                    .append($("<div>").addClass("form-group2 col-md-6").append($("<label>").text("From:")).append($("<input>").attr("type", "text").addClass("form-control").prop("disabled", true).val(data[3])))
                    .append($("<div>").addClass("form-group2 col-md-6").append($("<label>").text("Datetime:")).append($("<input>").attr("type", "text").addClass("form-control").prop("disabled", true).val(data[2])))
            );
            form.append($("<div>").addClass("form-group2").append($("<label>").text("Message Summary:")).append($("<input>").attr("type", "text").addClass("form-control").prop("disabled", true).val(data[0])));
            form.append($("<div>").addClass("form-group2").append($("<label>").text("Message Subjet:")).append($("<input>").attr("type", "text").addClass("form-control").prop("disabled", true).val(data[0])));
            form.append($("<div>").addClass("form-group2").append($("<label>").text("Message Body:")).append($("<textarea>").addClass("form-control").prop("disabled", true).val(data[1]))); // Crea el modal con el formulario
            let modal = $("<div>").addClass("modal fade").attr("id", "myModal2");
            let modalDialog = $("<div>").addClass("modal-dialog");
            let modalContent = $("<div>").addClass("modal-content");
            let modalHeader = $("<div>").addClass("modal-header");
            let modalBody = $("<div>").addClass("modal-body").append(form);
            let modalFooter = $("<div>")
                .addClass("modal-footer")
                .append($("<button>").addClass("btn btn-primary").text("Guardar").attr("data-dismiss", "modal"))
                .append($("<button>").addClass("btn btn-secondary").text("Cancelar").attr("data-dismiss", "modal"));
            modalContent.append(modalHeader);
            modalContent.append(modalBody);
            modalContent.append(modalFooter);
            modalDialog.append(modalContent);
            modal.append(modalDialog);

            // Agrega el modal al documento
            $("body").append(modal);

            // Abre el modal al hacer clic en el botón de editar
            $("#myModal2").modal("show");
        });

        table.on("click", "tbody .view2", function () {
            let data = table.row($(this).closest("tr")).data();

            // Aquí puedes abrir el modal y mostrar el formulario con los campos de la fila
            // Utiliza el modal de Bootstrap

            // Crea el formulario con los campos de la fila
            let form = $("<form>");

            form.append(
                $("<div>")
                    .addClass("form-row")
                    .append($("<div>").addClass("form-group3 col-md-6").append($("<label>").text("Response attachment"), $("<input>").attr("type", "text").addClass("form-control").val(data[4])))
            );
            form.append($("<div>").addClass("form-group3").append($("<label>").text("Response AI:")).append($("<input>").attr("type", "text").addClass("form-control").val(data[5])));

            form.append($("<div>").addClass("form-group3").append($("<label>").text("Response Subjet:")).append($("<input>").attr("type", "text").addClass("form-control").val(data[2])));
            form.append($("<div>").addClass("form-group3").append($("<label>").text("Response Body:")).append($("<textarea>").addClass("form-control").val(data[3])));
            // Crea el modal con el formulario
            let modal = $("<div>").addClass("modal fade").attr("id", "myModal3");
            let modalDialog = $("<div>").addClass("modal-dialog");
            let modalContent = $("<div>").addClass("modal-content");
            let modalHeader = $("<div>").addClass("modal-header");
            let modalBody = $("<div>").addClass("modal-body").append(form);
            let modalFooter = $("<div>")
                .addClass("modal-footer")
                .append($("<button>").addClass("btn btn-primary").text("Guardar").attr("data-dismiss", "modal"))
                .append($("<button>").addClass("btn btn-secondary").text("Cancelar").attr("data-dismiss", "modal"));
            modalContent.append(modalHeader);
            modalContent.append(modalBody);
            modalContent.append(modalFooter);
            modalDialog.append(modalContent);
            modal.append(modalDialog);

            // Agrega el modal al documento
            $("body").append(modal);

            // Abre el modal al hacer clic en el botón de editar
            $("#myModal3").modal("show");
        });

        table.on("click", "tbody .view3", function () {
            var data = [
                {
                    time: "7:45PM",
                    date: "May 10",
                    who: "company",
                    from: "sadasd@asda.com",
                    to: "sadasd@asda.com",
                    title: "Admin theme!",
                    content: "Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag &amp; drop and ion slider.",
                    badges: ["Envío presupuesto"],
                    dotClass: "fb-bg",
                },
                {
                    time: "8:00 AM",
                    date: "May 10",
                    who: "client",
                    from: "sadasd@asda.com",
                    to: "sadasd@asda.com",
                    title: "Admin theme!",
                    content: "Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar.",
                    badges: ["Peticion de presupuesto"],
                    dotClass: "green-one-bg",
                },
                {
                    time: "7:25 PM",
                    date: "May 11",
                    who: "company",
                    from: "sadasd@asda.com",
                    to: "sadasd@asda.com",
                    title: "Best Admin Template!",
                    content: "Custom C3 graphs, Custom flot graphs, flot graphs, small graphs, Sass, profile and timeline.",
                    badges: ["Retargeting"],
                    dotClass: "green-two-bg",
                },
                {
                    time: "3:55 PM",
                    date: "May 11",
                    who: "company",
                    from: "sadasd@asda.com",
                    to: "sadasd@asda.com",
                    title: "Milestone Admin",
                    content: "Admin theme includes graphs, invoice, timeline, widgets, projects, calendar, components, layouts, todo's.",
                    badges: ["Retargeting"],
                    dotClass: "green-three-bg",
                },
                {
                    time: "5:24 PM",
                    date: "May 12",
                    who: "client",
                    from: "sadasd@asda.com",
                    to: "sadasd@asda.com",
                    title: "Milestone Dashboard",
                    content: "Milestone Admin Dashboard includes invoice, profile, tasks, gallery, projects, maintanence.",
                    badges: ["Aeptación presupuesto"],
                    dotClass: "green-four-bg",
                },
            ];

            var section = document.createElement("div");
            section.className = "section__content section__content--p30";

            var container = document.createElement("div");
            container.className = "container-fluid";

            var table = document.createElement("table");
            table.id = "tabla";
            table.width = "100%";

            var bootdeyContainer = document.createElement("div");
            bootdeyContainer.className = "container bootdey";

            var row = document.createElement("div");
            row.className = "row gutters";

            var col = document.createElement("div");
            col.className = "col-xl-12 col-lg-12 col-md-12 col-sm-12";

            var card = document.createElement("div");
            card.className = "card";

            var cardBody = document.createElement("div");
            cardBody.className = "card-body";

            var timeline = document.createElement("div");
            timeline.className = "timeline";

            // Crear los elementos de la sección a partir del JSON
            data.forEach(function (item) {
                var timelineRow = document.createElement("div");
                timelineRow.className = "timeline-row";

                var timelineTime = document.createElement("div");
                timelineTime.className = "timeline-time";
                timelineTime.innerHTML = item.time + "<small>" + item.date + "</small>";

                var timelineDot = document.createElement("div");
                timelineDot.className = "timeline-dot " + item.dotClass;

                var timelineContent = document.createElement("div");
                timelineContent.className = "timeline-content";

                var fromDiv = document.createElement("div");
                fromDiv.style.display = "flex";
                fromDiv.style.alignItems = "center";

                var fromLabel = document.createElement("p");
                fromLabel.style.paddingRight = "10px";
                fromLabel.style.margin = "0";
                fromLabel.style.color = "black";
                fromLabel.innerHTML = "From:";

                var fromValue = document.createElement("p");
                fromValue.style.paddingRight = "10px";
                fromValue.style.margin = "0";
                fromValue.innerHTML = item.from;

                var toDiv = document.createElement("div");
                toDiv.style.display = "flex";
                toDiv.style.alignItems = "center";

                var toLabel = document.createElement("p");
                toLabel.style.paddingRight = "10px";
                toLabel.style.marginBottom = "10px";
                toLabel.style.color = "black";
                toLabel.innerHTML = "To:";

                var toValue = document.createElement("p");
                toValue.style.paddingRight = "10px";
                toValue.style.marginBottom = "10px";
                toValue.innerHTML = item.to;

                var title = document.createElement("h4");
                title.innerHTML = item.title;

                var content = document.createElement("p");
                content.innerHTML = item.content;

                var badgesDiv = document.createElement("div");

                item.badges.forEach(function (badge) {
                    var badgeSpan = document.createElement("span");
                    badgeSpan.className = "badge badge-light";
                    badgeSpan.innerHTML = badge;
                    badgesDiv.appendChild(badgeSpan);
                });

                fromDiv.appendChild(fromLabel);
                fromDiv.appendChild(fromValue);

                toDiv.appendChild(toLabel);
                toDiv.appendChild(toValue);

                timelineContent.appendChild(fromDiv);
                timelineContent.appendChild(toDiv);
                timelineContent.appendChild(title);
                timelineContent.appendChild(content);
                timelineContent.appendChild(badgesDiv);

                timelineRow.appendChild(timelineTime);
                timelineRow.appendChild(timelineDot);
                timelineRow.appendChild(timelineContent);

                timeline.appendChild(timelineRow);
            });

            // Construir la estructura de la sección
            cardBody.appendChild(timeline);
            card.appendChild(cardBody);
            col.appendChild(card);
            row.appendChild(col);
            bootdeyContainer.appendChild(row);
            container.appendChild(table);
            container.appendChild(bootdeyContainer);
            section.appendChild(container);

            // Crea el modal con el formulario
            let modal = $("<div>").addClass("modal fade").attr("id", "myModal4");
            let modalDialog = $("<div>").addClass("modal-dialog Modal_BIG"); // Cambia "modal-lg" por "modal-sm" si quieres un modal más pequeño
            let modalContent = $("<div>").addClass("modal-content");
            let modalHeader = $("<div>").addClass("modal-header");
            let modalBody = $("<div>").addClass("modal-body");
            modalBody.append(section);
            let modalFooter = $("<div>").addClass("modal-footer").append($("<button>").addClass("btn btn-secondary").text("Cerrar").attr("data-dismiss", "modal"));
            modalContent.append(modalHeader);
            modalContent.append(modalBody);
            modalContent.append(modalFooter);
            modalDialog.append(modalContent);
            modal.append(modalDialog);
            // Agrega el modal al documento
            $("body").append(modal);

            // Abre el modal al hacer clic en el botón de editar
            $("#myModal4").modal("show");
        });
        document.querySelector("#button").addEventListener("click", function () {
            table.row(".selected").remove().draw(false);
        });
    } catch (error) {
        console.log(error);
    }
})(jQuery);
(function ($) {
    // USE STRICT
    "use strict";
    var navbars = ["header", "aside"];
    var hrefSelector = 'a:not([target="_blank"]):not([href^="#"]):not([class^="chosen-single"])';
    var linkElement = navbars.map((element) => element + " " + hrefSelector).join(", ");
    $(".animsition").animsition({
        inClass: "fade-in",
        outClass: "fade-out",
        inDuration: 900,
        outDuration: 900,
        linkElement: linkElement,
        loading: true,
        loadingParentElement: "html",
        loadingClass: "page-loader",
        loadingInner: '<div class="page-loader__spin"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: ["animation-duration", "-webkit-animation-duration"],
        overlay: false,
        overlayClass: "animsition-overlay-slide",
        overlayParentElement: "html",
        transition: function (url) {
            window.location.href = url;
        },
    });
})(jQuery);
(function ($) {
    // USE STRICT
    "use strict";

    // Map
    try {
        var vmap = $("#vmap");
        if (vmap[0]) {
            vmap.vectorMap({
                map: "world_en",
                backgroundColor: null,
                color: "#ffffff",
                hoverOpacity: 0.7,
                selectedColor: "#1de9b6",
                enableZoom: true,
                showTooltip: true,
                values: sample_data,
                scaleColors: ["#1de9b6", "#03a9f5"],
                normalizeFunction: "polynomial",
            });
        }
    } catch (error) {
        console.log(error);
    }

    // Europe Map
    try {
        var vmap1 = $("#vmap1");
        if (vmap1[0]) {
            vmap1.vectorMap({
                map: "europe_en",
                color: "#007BFF",
                borderColor: "#fff",
                backgroundColor: "#fff",
                enableZoom: true,
                showTooltip: true,
            });
        }
    } catch (error) {
        console.log(error);
    }

    // USA Map
    try {
        var vmap2 = $("#vmap2");

        if (vmap2[0]) {
            vmap2.vectorMap({
                map: "usa_en",
                color: "#007BFF",
                borderColor: "#fff",
                backgroundColor: "#fff",
                enableZoom: true,
                showTooltip: true,
                selectedColor: null,
                hoverColor: null,
                colors: {
                    mo: "#001BFF",
                    fl: "#001BFF",
                    or: "#001BFF",
                },
                onRegionClick: function (event, code, region) {
                    event.preventDefault();
                },
            });
        }
    } catch (error) {
        console.log(error);
    }

    // Germany Map
    try {
        var vmap3 = $("#vmap3");
        if (vmap3[0]) {
            vmap3.vectorMap({
                map: "germany_en",
                color: "#007BFF",
                borderColor: "#fff",
                backgroundColor: "#fff",
                onRegionClick: function (element, code, region) {
                    var message = 'You clicked "' + region + '" which has the code: ' + code.toUpperCase();

                    alert(message);
                },
            });
        }
    } catch (error) {
        console.log(error);
    }

    // France Map
    try {
        var vmap4 = $("#vmap4");
        if (vmap4[0]) {
            vmap4.vectorMap({
                map: "france_fr",
                color: "#007BFF",
                borderColor: "#fff",
                backgroundColor: "#fff",
                enableZoom: true,
                showTooltip: true,
            });
        }
    } catch (error) {
        console.log(error);
    }

    // Russia Map
    try {
        var vmap5 = $("#vmap5");
        if (vmap5[0]) {
            vmap5.vectorMap({
                map: "russia_en",
                color: "#007BFF",
                borderColor: "#fff",
                backgroundColor: "#fff",
                hoverOpacity: 0.7,
                selectedColor: "#999999",
                enableZoom: true,
                showTooltip: true,
                scaleColors: ["#C8EEFF", "#006491"],
                normalizeFunction: "polynomial",
            });
        }
    } catch (error) {
        console.log(error);
    }

    // Brazil Map
    try {
        var vmap6 = $("#vmap6");
        if (vmap6[0]) {
            vmap6.vectorMap({
                map: "brazil_br",
                color: "#007BFF",
                borderColor: "#fff",
                backgroundColor: "#fff",
                onRegionClick: function (element, code, region) {
                    var message = 'You clicked "' + region + '" which has the code: ' + code.toUpperCase();
                    alert(message);
                },
            });
        }
    } catch (error) {
        console.log(error);
    }
})(jQuery);
(function ($) {
    // Use Strict
    "use strict";
    try {
        var progressbarSimple = $(".js-progressbar-simple");
        progressbarSimple.each(function () {
            var that = $(this);
            var executed = false;
            $(window).on("load", function () {
                that.waypoint(
                    function () {
                        if (!executed) {
                            executed = true;
                            /*progress bar*/
                            that.progressbar({
                                update: function (current_percentage, $this) {
                                    $this.find(".js-value").html(current_percentage + "%");
                                },
                            });
                        }
                    },
                    {
                        offset: "bottom-in-view",
                    }
                );
            });
        });
    } catch (err) {
        console.log(err);
    }
})(jQuery);
(function ($) {
    // USE STRICT
    "use strict";

    // Scroll Bar
    try {
        var jscr1 = $(".js-scrollbar1");
        if (jscr1[0]) {
            const ps1 = new PerfectScrollbar(".js-scrollbar1");
        }

        var jscr2 = $(".js-scrollbar2");
        if (jscr2[0]) {
            const ps2 = new PerfectScrollbar(".js-scrollbar2");
        }
    } catch (error) {
        console.log(error);
    }
})(jQuery);
(function ($) {
    // USE STRICT
    "use strict";

    // Select 2
    try {
        $(".js-select2").each(function () {
            $(this).select2({
                minimumResultsForSearch: 20,
                dropdownParent: $(this).next(".dropDownSelect2"),
            });
        });
    } catch (error) {
        console.log(error);
    }
})(jQuery);
(function ($) {
    // USE STRICT
    "use strict";

    // Dropdown
    try {
        var menu = $(".js-item-menu");
        var sub_menu_is_showed = -1;

        for (var i = 0; i < menu.length; i++) {
            $(menu[i]).on("click", function (e) {
                e.preventDefault();
                $(".js-right-sidebar").removeClass("show-sidebar");
                if (jQuery.inArray(this, menu) == sub_menu_is_showed) {
                    $(this).toggleClass("show-dropdown");
                    sub_menu_is_showed = -1;
                } else {
                    for (var i = 0; i < menu.length; i++) {
                        $(menu[i]).removeClass("show-dropdown");
                    }
                    $(this).toggleClass("show-dropdown");
                    sub_menu_is_showed = jQuery.inArray(this, menu);
                }
            });
        }
        $(".js-item-menu, .js-dropdown").click(function (event) {
            event.stopPropagation();
        });

        $("body,html").on("click", function () {
            for (var i = 0; i < menu.length; i++) {
                menu[i].classList.remove("show-dropdown");
            }
            sub_menu_is_showed = -1;
        });
    } catch (error) {
        console.log(error);
    }

    var wW = $(window).width();
    // Right Sidebar
    var right_sidebar = $(".js-right-sidebar");
    var sidebar_btn = $(".js-sidebar-btn");

    sidebar_btn.on("click", function (e) {
        e.preventDefault();
        for (var i = 0; i < menu.length; i++) {
            menu[i].classList.remove("show-dropdown");
        }
        sub_menu_is_showed = -1;
        right_sidebar.toggleClass("show-sidebar");
    });

    $(".js-right-sidebar, .js-sidebar-btn").click(function (event) {
        event.stopPropagation();
    });

    $("body,html").on("click", function () {
        right_sidebar.removeClass("show-sidebar");
    });

    // Sublist Sidebar
    try {
        var arrow = $(".js-arrow");
        arrow.each(function () {
            var that = $(this);
            that.on("click", function (e) {
                e.preventDefault();
                that.find(".arrow").toggleClass("up");
                that.toggleClass("open");
                that.parent().find(".js-sub-list").slideToggle("250");
            });
        });
    } catch (error) {
        console.log(error);
    }

    try {
        // Hamburger Menu
        $(".hamburger").on("click", function () {
            $(this).toggleClass("is-active");
            $(".navbar-mobile").slideToggle("500");
        });
        $(".navbar-mobile__list li.has-dropdown > a").on("click", function () {
            var dropdown = $(this).siblings("ul.navbar-mobile__dropdown");
            $(this).toggleClass("active");
            $(dropdown).slideToggle("500");
            return false;
        });
    } catch (error) {
        console.log(error);
    }
    /////////////////////////////////////////007
})(jQuery);
(function ($) {
    // USE STRICT
    "use strict";

    try {
        var showTablebutton = document.getElementsByClassName("showTable")[0];
        var showstatisticbutton = document.getElementsByClassName("showstatistic");
        var statistic = document.getElementById("statistics");
        var table = document.getElementById("table");

        showTablebutton.addEventListener("click", function () {
            statistic.style.display = "none";
            table.style.display = "block";
        });
        for (var i = 0; i < showstatisticbutton.length; i++) {
            showstatisticbutton[i].addEventListener("click", function (event) {
                statistic.style.display = "block";
                table.style.display = "none";
            });
        }
    } catch (error) {
        console.log(error);
    }
})(jQuery);
(function ($) {
    // USE STRICT
    "use strict";

    // Load more
    try {
        var list_load = $(".js-list-load");
        if (list_load[0]) {
            list_load.each(function () {
                var that = $(this);
                that.find(".js-load-item").hide();
                var load_btn = that.find(".js-load-btn");
                load_btn.on("click", function (e) {
                    $(this)
                        .text("Loading...")
                        .delay(1500)
                        .queue(function (next) {
                            $(this).hide();
                            that.find(".js-load-item").fadeToggle("slow", "swing");
                        });
                    e.preventDefault();
                });
            });
        }
    } catch (error) {
        console.log(error);
    }
})(jQuery);
(function ($) {
    // USE STRICT
    "use strict";

    try {
        $('[data-toggle="tooltip"]').tooltip();
    } catch (error) {
        console.log(error);
    }

    // Chatbox
    try {
        var inbox_wrap = $(".js-inbox");
        var message = $(".au-message__item");
        message.each(function () {
            var that = $(this);

            that.on("click", function () {
                $(this).parent().parent().parent().toggleClass("show-chat-box");
            });
        });
    } catch (error) {
        console.log(error);
    }
})(jQuery);
(async function ($) {
    // USE STRICT
    "use strict"
    try {
        var select = document.getElementById("selectOptionCategory"), divCategory = document.getElementById("divCategory")
       
        let categories, defaultCategories = await client.graphql({
            query: listDefaultCategories
        }), customCategories = await client.graphql({query: listCategories})
      
        categories = [...defaultCategories.data.listDefaultCategories.items, ...customCategories.data.listCategories.items]
        categories.forEach(e =>{
            const option = document.createElement("option")
            option.value = e.categoryName
            option.innerHTML = e.categoryName
            select.appendChild(option)

            
        })

        select.addEventListener("change", async (e)=> {
            if (divCategory.firstChild) {
                divCategory.removeChild(divCategory.firstChild);
            }
            if(e.target.value !== "Selecciona"){
                const categ = categories.find(c => c.categoryName === e.target.value) 
                let tempElement = document.createElement('div');
                let params = {
                    autoRedirect: false, autoRetargeting: false, autoTrigger: false , autoQuote: false, autoResponse: false, redirectTo: {}, quoteOption:{}, triggerOption:{}, retargetingOption:{},retargetingTime:""
                },{data} = await client.graphql({query: getDefaultCategories, variables: {id: categ.id}}); 
                params = data.getDefaultCategories.configuration ? {...params,...data.getDefaultCategories.configuration} : params
                tempElement.innerHTML = form(params);
                divCategory.appendChild(tempElement);
                tempElement.addEventListener("change", async (e)=> {
                    params[e.target.id] = e.target.checked 
                })
                const saveButton = document.getElementById("saveChange")
                saveButton.addEventListener("click",async(e)=>{
                    const {__typename, ...other} = params
                    const a = await client.graphql({query: updateDefaultCategories, variables: {input: {id:categ.id ,configuration: other}}})
                })
                const resetButton = document.getElementById("resetDefault")
                resetButton.addEventListener("click",async(e)=>{
                    const {__typename, ...other} = params
                    const a = await client.graphql({query: updateDefaultCategories, variables: {input: {id:categ.id ,configuration: {
                        autoRedirect: false, autoRetargeting: false, autoTrigger: false , autoQuote: false, autoResponse: false, redirectTo: null, quoteOption:null, triggerOption:null ,retargetingOption:null,retargetingTime:null
                    }}}})
                    console.log(a)
                    divCategory.removeChild(divCategory.firstChild);
                    tempElement = document.createElement('div');
                    tempElement.innerHTML = form( {
                        autoRedirect: false, autoRetargeting: false, autoTrigger: false , autoQuote: false, autoResponse: false, redirectTo: null, quoteOption:null, triggerOption:null ,retargetingOption:null,retargetingTime:null
                    });
                    divCategory.appendChild(tempElement);
                })

            }else{
                let tempElement2 = document.createElement('div');
                tempElement2.style.height = '50vh';
                divCategory.appendChild(tempElement2);
            }

        })

        const editCategoriesBtn = document.querySelector(".edit_categories");
        const categoryForm = document.createElement("form");
        // const initialCategories = document.createElement("form");
            const addCategoryBtn = document.createElement("button");
            addCategoryBtn.id = "addCategory";
            addCategoryBtn.className = "btn btn-primary";
            addCategoryBtn.textContent = "Agregar categoría";

            const saveBtn = document.createElement("button");
            saveBtn.id = "saveBtn";
            saveBtn.className = "btn btn-primary";
            saveBtn.textContent = "Guardar";

            const cancelBtn = document.createElement("button");
            cancelBtn.id = "cancelCategory";
            cancelBtn.className = "btn btn-secondary";
            cancelBtn.textContent = "Cancelar";

            editCategoriesBtn.addEventListener("click", function () {
                $("#myModal").modal("show");
            });
         
            addCategoryBtn.addEventListener("click", function () {
                const newCategory = document.createElement("div");
                newCategory.className = "form-group row";
                const inputWrapper = document.createElement("div");
                inputWrapper.className = "col-9";
                const input = document.createElement("input");
                input.type = "text";
                input.className = "form-control";
                inputWrapper.appendChild(input);
                const deleteBtnWrapper = document.createElement("div");
                deleteBtnWrapper.className = "col-3";
                const deleteBtn = document.createElement("button");
                deleteBtn.className = "btn";
                deleteBtn.innerHTML = '<i class="fa fa-times" style="color: red;" data-toggle="tooltip" data-placement="top" title="Borrar categoría"></i>';
                deleteBtn.addEventListener("click", function () {
                    categoryForm.removeChild(newCategory);
                    // initialCategories.removeChild(newCategory);
                });
                deleteBtnWrapper.appendChild(deleteBtn);
                newCategory.appendChild(inputWrapper);
                newCategory.appendChild(deleteBtnWrapper);
                // initialCategories.appendChild(newCategory);
                categoryForm.appendChild(newCategory);
            });
            // saveBtn.addEventListener("click", function () {
            //     const categFormChild = [...categoryForm.childNodes]
            //     const initialCatChild = [...initialCategories.childNodes]
            //     console.log("categFom", categFormChild)
            //     console.log("init", initialCatChild)
            //     const addedCategories = categFormChild.map(c => {
            //         console.log(c)
            //         if(initialCatChild.includes(c)){
            //             return c
            //         }
            //     })
            //     console.log("addedCategories: ",addedCategories)
            // })
            cancelBtn.addEventListener("click", function () {
                $("#myModal").modal("hide");
            });

            const modalBody = document.createElement("div");
            modalBody.className = "modal-body";
            modalBody.appendChild(categoryForm);

            const buttonsWrapper = document.createElement("div");
            buttonsWrapper.className = "row";
            const addBtnWrapper = document.createElement("div");
            addBtnWrapper.className = "col-4";
            addBtnWrapper.appendChild(addCategoryBtn);
            const saveBtnWrapper = document.createElement("div");
            saveBtnWrapper.className = "col-4";
            saveBtnWrapper.appendChild(saveBtn);
            const cancelBtnWrapper = document.createElement("div");
            cancelBtnWrapper.className = "col-4";
            cancelBtnWrapper.appendChild(cancelBtn);
            buttonsWrapper.appendChild(addBtnWrapper);
            buttonsWrapper.appendChild(saveBtnWrapper);
            buttonsWrapper.appendChild(cancelBtnWrapper);
            modalBody.appendChild(buttonsWrapper);

            const modalContent = document.createElement("div");
            modalContent.className = "modal-content";
            modalContent.appendChild(modalBody);

            const modalDialog = document.createElement("div");
            modalDialog.className = "modal-dialog";
            modalDialog.role = "document";
            modalDialog.appendChild(modalContent);

            const modal = document.createElement("div");
            modal.className = "modal fade";
            modal.id = "myModal";
            modal.tabIndex = -1;
            modal.role = "dialog";
            modal.setAttribute("aria-labelledby", "myModalLabel");
            modal.setAttribute("aria-hidden", "true");
            modal.appendChild(modalDialog);

            document.body.appendChild(modal);

            categories.forEach(function (category) {
                const newCategory = document.createElement("div");
                newCategory.className = "form-group row";
                const inputWrapper = document.createElement("div");
                inputWrapper.className = "col-9";
                const input = document.createElement("input");
                input.type = "text";
                input.className = "form-control";
                input.value = category.categoryName;
                inputWrapper.appendChild(input);
                const deleteBtnWrapper = document.createElement("div");
                deleteBtnWrapper.className = "col-3";
                const deleteBtn = document.createElement("button");
                deleteBtn.className = "btn";
                deleteBtn.innerHTML = '<i class="fa fa-times" style="color: red;" data-toggle="tooltip" data-placement="top" title="Borrar categoría"></i>';
                deleteBtn.addEventListener("click", async function () {
                    categoryForm.removeChild(newCategory);
                    await client.graphql({
                        query: deleteDefaultCategories,
                        variables: {
                          input: {id: category.id}
                        }
                      });

                });
                deleteBtnWrapper.appendChild(deleteBtn);
                newCategory.appendChild(inputWrapper);
                newCategory.appendChild(deleteBtnWrapper);
                categoryForm.appendChild(newCategory);
            });
     

    } catch (error) {
        console.log(error);
    }
})(jQuery);