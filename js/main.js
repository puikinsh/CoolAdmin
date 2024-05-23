import { Amplify } from 'aws-amplify'
import { generateClient } from "aws-amplify/api";
import { listCommunications, listDefaultCategories, listCategories, messageDetails, responseDetails, actionsQuery, threadQuery } from "../src/graphql/queries";
import { updateCommunications } from "../src/graphql/mutations";
import backendConfig from '../src/amplifyconfiguration.json'
import { getUserInfo } from "./authentication";

(function ($) {
    // USE STRICT
    "use strict";

    try {
        // Recent Report 2

        // var data3 = [52, 60, 55, 50, 65, 80, 57, 70, 105, 115, 40, 130];
        // var data4 = [102, 70, 80, 100, 56, 53, 80, 75, 65, 90, 110, 75];

        var ctx = document.getElementById("recent-rep2-chart");
        if (ctx) {
            ctx.height = 230;
            window.myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                    datasets: [],
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
        //bar chart
        var ctx = document.getElementById("barChart");
        if (ctx) {
            ctx.height = 200;
            var myChart = new Chart(ctx, {
                type: "bar",
                defaultFontFamily: "Poppins",
                data: {
                    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
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

})(jQuery);
(async function ($) {
    // USE STRICT
    "use strict";
    try {

        // Config de Amplify con la config del backend como prop
        Amplify.configure(backendConfig)

        // Se genera el cliente para las llamadas
        const client = generateClient()

        let selectedCategoryName;
        let categories
        const select1 = document.createElement('select');

        const colorObjects = [
            { category_line: "rgba(0,181,233,0.9)", bg: "rgba(0,181,233,0.2)", class: "dot dot--blue" },
            { category_line: "rgba(0,173,95,0.9)", bg: "rgba(0,173,95,0.2)", class: "dot dot--green" },
            { category_line: "rgba(255,99,132,0.9)", bg: "rgba(255,99,132,0.2)", class: "dot dot--red" },
            { category_line: "rgba(255,159,64,0.9)", bg: "rgba(255,159,64,0.2)", class: "dot dot--orange" },
            { category_line: "rgba(75,192,192,0.9)", bg: "rgba(75,192,192,0.2)", class: "dot dot--turquoise" },
            { category_line: "rgba(153,102,255,0.9)", bg: "rgba(153,102,255,0.2)", class: "dot dot--purple" },
            { category_line: "rgba(255,205,86,0.9)", bg: "rgba(255,205,86,0.2)", class: "dot dot--yellow" }
        ]

        // Función para normalizar la fecha
        const normalizeDate = (dateString) => {
            const date = new Date(dateString)
            const year = date.getFullYear()
            const month = (date.getMonth() + 1).toString().padStart(2, "0")
            const day = date.getDate().toString().padStart(2, "0")
            const hour = date.getHours().toString().padStart(2, "0")
            const minutes = date.getMinutes().toString().padStart(2, "0")
            const formattedDateTime = `${year}-${month}-${day} ${hour}:${minutes}`
            return formattedDateTime
        }

        // Función para obtener comunicaciones
        async function fetchCommunications(selectedCategoryName) {
            let allCommunications;
            const variables = selectedCategoryName ? { filter: { category: { eq: selectedCategoryName } } } : {};

            try {
                const response = await client.graphql({
                    query: listCommunications,
                    variables
                });

                allCommunications = response.data.listCommunications.items.map(comm => ({
                    ...comm,
                    dateTime: normalizeDate(comm.dateTime)
                }));
                return allCommunications;
            } catch (error) {
                console.error("Error fetching communications:", error);
            }
        }

        // Función para renderizar las comunicaciones y categorías
        async function renderCommunications() {
            try {
                let allCommunications = await fetchCommunications(selectedCategoryName);
                let allCommsCount = allCommunications.length;

                const [defaultCateg, customCateg] = await Promise.all([
                    client.graphql({ query: listDefaultCategories }),
                    client.graphql({ query: listCategories })
                ]);

                categories = [...defaultCateg.data.listDefaultCategories.items, ...customCateg.data.listCategories.items];

                renderCategoryList(categories, allCommunications, allCommsCount);
                renderTable(allCommunications);

            } catch (error) {
                console.error("Error rendering communications:", error);
            }
        }

        // Función para renderizar la lista de categorías
        function renderCategoryList(categories, allCommunications, allCommsCount) {
            const ul2 = document.querySelector(".js-sub-list");
            ul2.innerHTML = '';
            const chartRightRef = document.getElementById("chart-info__right");

            if (!chartRightRef.querySelector('.rs-select2--dark')) {
                // Crear el primer div
                const div1 = document.createElement('div');
                div1.classList.add('rs-select2--dark', 'rs-select2--md', 'm-r-10');

                // Crear el primer select
                select1.classList.add('js-select2');
                select1.setAttribute('name', 'property');

                // Crear las opciones del primer select dinámicamente
                const option1_default = document.createElement('option');
                option1_default.selected = true;
                option1_default.textContent = 'Todas';
                select1.appendChild(option1_default);

                // Crear el div de dropDownSelect2 para el primer select
                const dropDown1 = document.createElement('div');
                dropDown1.classList.add('dropDownSelect2');

                // Añadir el select y el dropdown al primer div
                div1.appendChild(select1);
                div1.appendChild(dropDown1);

                // Crear el segundo div
                const div2 = document.createElement('div');
                div2.classList.add('rs-select2--dark', 'rs-select2--sm');

                // Crear el segundo select
                const select2 = document.createElement('select');
                select2.classList.add('js-select2', 'au-select-dark');
                select2.setAttribute('name', 'time');

                // Crear las opciones del segundo select
                const option2_1 = document.createElement('option');
                option2_1.selected = true;
                option2_1.textContent = 'Mes y dia';

                const option2_2 = document.createElement('option');
                option2_2.value = '';
                option2_2.textContent = 'Por mes';

                const option2_3 = document.createElement('option');
                option2_3.value = '';
                option2_3.textContent = 'Por día';

                // Añadir las opciones al segundo select
                select2.appendChild(option2_1);
                select2.appendChild(option2_2);
                select2.appendChild(option2_3);

                // Crear el div de dropDownSelect2 para el segundo select
                const dropDown2 = document.createElement('div');
                dropDown2.classList.add('dropDownSelect2');

                // Añadir el select y el dropdown al segundo div
                div2.appendChild(select2);
                div2.appendChild(dropDown2);

                // Añadir ambos divs al elemento chartRightRef
                chartRightRef.appendChild(div1);
                chartRightRef.appendChild(div2);
            } else {
                // Actualizar select1 con nuevas opciones de categoría sin duplicar
                const select1 = chartRightRef.querySelector('select[name="property"]');
                select1.innerHTML = '';
                const option1_default = document.createElement('option');
                option1_default.selected = true;
                option1_default.textContent = 'Todas';
                select1.appendChild(option1_default);
            }

            categories.forEach((category, index) => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                const icon = document.createElement("i");

                const commsByCategoryCount = allCommunications.filter(email => email.category === category.categoryName).length;
                const countPortion = parseFloat((commsByCategoryCount * 100 / allCommsCount).toFixed(2));

                const colorObj = colorObjects[index];

                const categoryDataset = {
                    label: category.categoryName,
                    backgroundColor: colorObj.bg,
                    borderColor: colorObj.category_line,
                    pointHoverBackgroundColor: colorObj.category_line,
                    borderWidth: 0,
                    data: [52, 60, 55, 50, 65, 80, 57, 70, 105, 115, 40, 130], // Placeholder data
                };

                a.href = "#";
                a.classList.add("showTable");
                icon.classList.add("fas", "fa-tags");
                a.appendChild(icon);
                a.appendChild(document.createTextNode(category.categoryName));
                li.appendChild(a);
                ul2.appendChild(li);

                const option = document.createElement('option');
                option.value = category.categoryName;
                option.textContent = category.categoryName;
                select1.appendChild(option);

                if (!selectedCategoryName) {
                    renderProgressBar(category.categoryName, countPortion);
                    window.myChart.data.datasets.push(categoryDataset);
                    renderChartInfo(category, colorObj);

                }

                a.addEventListener("click", async function (event) {
                    event.preventDefault();
                    selectedCategoryName = category.categoryName;

                    document.getElementById("step1").innerHTML = "categories";
                    document.getElementById("step2").innerHTML = selectedCategoryName;

                    await renderCommunications();
                });
            });
        }

        // Función para renderizar la información del gráfico
        function renderChartInfo(category, colorObj) {
            const chartLeftRef = document.getElementById("chart-info__left");

            const chartNote = document.createElement("div");
            chartNote.className = "chart-note";

            const colorSpan = document.createElement("span");
            colorSpan.className = colorObj.class;

            const labelSpan = document.createElement("span");
            labelSpan.textContent = category.categoryName;

            chartNote.appendChild(colorSpan);
            chartNote.appendChild(labelSpan);
            chartLeftRef.appendChild(chartNote);

        }

        // Función para renderizar la barra de progreso
        function renderProgressBar(categoryName, countPortion) {
            const skillContainer = document.getElementById("skill-container");
            // Crear los elementos necesarios
            const progressContainer = document.createElement("div");
            progressContainer.className = "progress-cont";

            const progressDiv = document.createElement("div");
            progressDiv.className = "progress";

            const titleSpan = document.createElement("span");
            titleSpan.className = "progress__title";
            titleSpan.textContent = categoryName;

            const barDiv = document.createElement("div");
            barDiv.className = "progress-bar";
            barDiv.setAttribute("role", "progressbar");
            barDiv.setAttribute("aria-valuenow", countPortion);
            barDiv.setAttribute("aria-valuemin", "0");
            barDiv.setAttribute("aria-valuemax", "100");
            barDiv.style.width = countPortion + "%";

            const valueSpan = document.createElement("span");
            valueSpan.className = "progress__value js-value";
            valueSpan.textContent = countPortion + "%";

            // Añadir los elementos al DOM en el orden correcto
            barDiv.appendChild(valueSpan);
            progressDiv.appendChild(barDiv);
            progressContainer.appendChild(titleSpan);
            progressContainer.appendChild(progressDiv);
            skillContainer.appendChild(progressContainer);

            // Inicializar la barra de progreso de Bootstrap
            $(barDiv).progressbar();
        }

        // Función para renderizar la tabla de comunicaciones
        function renderTable(allCommunications) {
            const dataSet = allCommunications.map(email => {
                const values = Object.values(email);
                if (selectedCategoryName) {
                    values.splice(2, 1);
                }
                return values;
            });

            dataSet.forEach((row) => {
                row[2] = createBadge(row[2]);
                row[3] = createDiv(row[3]);
                row.push(createButtonContainer("view1", "eye"));
                row.push(createButtonContainer("view2", "eye"));
                row.push(createButtonContainer("view3", "eye"));
                row.push(createActionButtonContainer());
            });

            if ($.fn.DataTable.isDataTable('#tabla')) {
                // Si DataTables ya está aplicado, destruir la instancia existente antes de volver a inicializarla
                $('#tabla').DataTable().destroy();
            }

            const table = new DataTable("#tabla", {
                columns: [
                    { title: "Com ID" },
                    { title: "Channel" },
                    ...(selectedCategoryName ? [] : [{ title: "Category" }]),
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

            initializeTableEvents(table);
        }

        // Función para crear un contenedor de botones
        function createButtonContainer(className, icon) {
            const container = document.createElement("div");
            container.className = `${className} d-flex justify-content-center`;
            container.innerHTML = `<button class="btn btn-outline-primary" style="margin-right: 5px;"><i class="fas fa-${icon}"></i></button>`;
            return container;
        }

        // Función para crear el contenedor de acciones
        function createActionButtonContainer() {
            const container = document.createElement("div");
            container.className = "headerCenter"
            container.innerHTML = `
        <button class="edit btn btn-primary" style="margin-right: 5px;"><i class="fas fa-pencil-alt"></i></button>
        <button class="btn btn-success" style="background-color: #86dfc4e7;"><i class="fas fa-check"></i></button>`;
            return container;
        }

        // Función para crear una div con contenido
        function createDiv(content) {
            const div = document.createElement("div");
            div.innerHTML = content;
            return div;
        }

        // Función para crear un badge
        function createBadge(category) {
            const badgeClass = {
                "DefaultCategory1": "badge-primary",
                "DefaultCategory2": "badge-success",
                "custom 1": "badge-warning",
                "Leidos": "badge-danger",
                "Recibidos": "badge-info",
                "default": "badge-secondary"
            }[category] || "badge-secondary";

            const div = document.createElement("div");
            div.innerHTML = `<span class="badge ${badgeClass}">${category}</span>`;
            return div;
        }

        // Función para inicializar eventos de la tabla
        function initializeTableEvents(table) {
            table.on("click", "tbody .edit", async function () {
                const data = table.row($(this).closest("tr")).data();
                await openEditModal(data);
            });

            table.on("click", "tbody .view1", async function () {
                const data = table.row($(this).closest("tr")).data();
                await openMessageModal(data);
            });

            table.on("click", "tbody .view2", async function () {
                const data = table.row($(this).closest("tr")).data();
                await openResponseModal(data);
            });

            table.on("click", "tbody .view3", async function () {
                const data = table.row($(this).closest("tr")).data();
                await openThreadModal(data);
            });
        }

        async function openEditModal(data) {
            let actions = await client.graphql({
                query: actionsQuery,
                variables: {
                    filter: {
                        messageId: { eq: data[0] }
                    }
                }
            });

            actions = actions.data.listCommunications.items[0]

            // const normalizedDate = normalizeDate(actions.dateTime)
            let selectedCategory = categories.filter(category => category.categoryName === actions.category)

            selectedCategory = selectedCategory[0]
            let form = $("<form>").attr("id", "actionForm");
            form.append(
                $("<div>")
                    .addClass("form-row")
                    .append($("<div>").addClass("form-group1 col-md-6").attr("id", "fromId").append($("<label>").text("From:")).append($("<input>").attr("type", "text").addClass("form-control").prop("disabled", true).attr("name", "fromId").val(actions.fromId)))
                    .append($("<div>").addClass("form-group1 col-md-6").attr("id", "dateTime").append($("<label>").text("Datetime:")).append($("<input>").attr("type", "text").addClass("form-control").prop("disabled", true).attr("name", "dateTime").val(actions.dateTime)))
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
                                    .addClass("form-control").attr("id", "category")
                                    .append(categories.map(category => $("<option>").text(category.categoryName).val(category.categoryName))
                                    ).val(selectedCategory.categoryName)
                            ),

                        $("<div>").addClass("form-group1 col-md-6").attr("id", "responseAttachment").append($("<label>").text("Response attachment"),
                            $("<div>").addClass("input-group")
                                .append(
                                    $("<input>").attr("type", "text").addClass("form-control").val(actions.responseAttachment).prop("readonly", true),
                                    $("<div>").addClass("input-group-append")
                                        .append(
                                            $("<button>").addClass("btn").attr("type", "button").append($("<i>").addClass("fa fa-times").css({ "color": "red" }))
                                                .on("click", function () {
                                                    $(this).closest(".input-group").find("input").val("");
                                                })
                                        )
                                )
                        )
                    ))

            form.append($("<div>").addClass("form-group1").attr("id", "responseAi").append($("<label>").text("Response AI:")).append($("<input>").attr("type", "text").addClass("form-control").val(actions.responseAi)));

            form.append($("<div>").addClass("form-group1").attr("id", "messageSubject").append($("<label>").text("Message subjet:")).append($("<input>").attr("type", "text").addClass("form-control").prop("disabled", true).attr("name", "messageSubject").val(actions.messageSubject)));
            form.append($("<div>").addClass("form-group1").attr("id", "messageBody").append($("<label>").text("Message Body:")).append($("<textarea>").addClass("form-control").prop("disabled", true).attr("name", "messageBody").val(actions.messageBody))); // Crea el modal con el formulario
            form.append($("<div>").addClass("form-group1").attr("id", "responseSubject").append($("<label>").text("Response Subjet:")).append($("<input>").attr("type", "text").addClass("form-control").val(actions.responseSubject)));
            form.append($("<div>").addClass("form-group1").attr("id", "responseBody").append($("<label>").text("Response Body:")).append($("<textarea>").addClass("form-control").val(actions.responseBody)));
            // Crea el modal con el formulario
            // tabindex, role, aria,labelledby, aria-hidden para mejorar la accesibilidad y el comportamiento del modal
            let modal = $("<div>").addClass("modal fade").attr("id", "actionModal").attr("tabindex", "-1").attr("role", "dialog").attr("aria-labelledby", "actionModalLabel").attr("aria-hidden", "true");
            let modalDialog = $("<div>").addClass("modal-dialog").attr("role", "document");
            let modalContent = $("<div>").addClass("modal-content");
            let modalHeader = $("<div>").addClass("modal-header headerCenter").append($("<h3>").addClass("modal-title").attr("id", "actionModalLabel").text("Editar"));
            let modalBody = $("<div>").addClass("modal-body").append(form);
            let modalFooter = $("<div>")
                .addClass("modal-footer")
                .append($("<button>").addClass("btn btn-primary").text("Guardar").attr("type", "button").attr("id", "saveBtn"))
                .append($("<button>").addClass("btn btn-secondary").text("Cancelar").attr("data-dismiss", "modal").attr("id", "cancelBtn"));
            modalContent.append(modalHeader, modalBody, modalFooter);
            modalDialog.append(modalContent);
            modal.append(modalDialog);

            $("#actionModal").remove();
            $("body").append(modal);

            $("#actionModal").modal("show");

            $("#saveBtn").on("click", function () {
                $("#actionForm").submit()
            })

            // REEMPLAZAR EN FORMDATA CUANDO TENGAMOS DATA REAL
            // const userInfo = await getUserInfo()
            // let clientId = userInfo.sub

            $("body").on("submit", "#actionForm", async function (event) {
                event.preventDefault();

                let formData = {};

                $("#actionForm").find(":input:disabled").each(function () {
                    let name = $(this).attr("name")
                    if (name) {
                        formData[name] = $(this).val()
                    }
                })

                formData = {
                    ...formData,
                    clientId: "0001", // Traer con getUserInfo()
                    category: $("#category").val(),
                    responseAttachment: $("#responseAttachment input").val(),
                    responseAi: $("#responseAi input").val(),
                    responseSubject: $("#responseSubject input").val(),
                    responseBody: $("#responseBody textarea").val()
                };

                await client.graphql({
                    query: updateCommunications,
                    variables: {
                        input: formData,
                        condition: {
                            messageId: {
                                eq: data[0]
                            }
                        }
                    }
                })

                $("#actionModal").modal("hide");
                location.reload()
            })
        }

        async function openMessageModal(data) {
            let message = await client.graphql({
                query: messageDetails,
                variables: {
                    filter: {
                        messageId: { eq: data[0] }
                    }
                }
            });
            message = message.data.listCommunications.items[0]
            const normalizedDate = normalizeDate(message.dateTime);

            let form = $("<form>").attr("id", "messageForm");

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
                                    .val(message.category)
                                    .append($("<option>").text(message.category).val(message.category))
                            )
                    )
            );
            form.append(
                $("<div>")
                    .addClass("form-row")
                    .append($("<div>").addClass("form-group2 col-md-6").append($("<label>").text("From:")).append($("<input>").attr("type", "text").addClass("form-control").prop("disabled", true).val(message.fromId)))
                    .append($("<div>").addClass("form-group2 col-md-6").append($("<label>").text("Datetime:")).append($("<input>").attr("type", "text").addClass("form-control").prop("disabled", true).val(normalizedDate)))
            );
            form.append($("<div>").addClass("form-group2").append($("<label>").text("Message Summary:")).append($("<input>").attr("type", "text").addClass("form-control").prop("disabled", true).val(message.messagSummary)));
            form.append($("<div>").addClass("form-group2").append($("<label>").text("Message Subjet:")).append($("<input>").attr("type", "text").addClass("form-control").prop("disabled", true).val(message.messageSubject)));
            form.append($("<div>").addClass("form-group2").append($("<label>").text("Message Body:")).append($("<textarea>").addClass("form-control").prop("disabled", true).val(message.messageBody))); // Crea el modal con el formulario
            let modal = $("<div>").addClass("modal fade").attr("id", "messageModal");
            let modalDialog = $("<div>").addClass("modal-dialog");
            let modalContent = $("<div>").addClass("modal-content");
            let modalHeader = $("<div>").addClass("modal-header headerCenter").append($("<h3>").addClass("modal-title").attr("id", "myModalLabel").text("Contenido de la comunicación"));
            let modalBody = $("<div>").addClass("modal-body").append(form);
            let modalFooter = $("<div>")
                .addClass("modal-footer")
                .append($("<button>").addClass("btn btn-secondary").text("Cerrar").attr("data-dismiss", "modal"));
            modalContent.append(modalHeader, modalBody, modalFooter);
            modalDialog.append(modalContent);
            modal.append(modalDialog);

            $("#messageModal").remove();
            $("body").append(modal);

            $("#messageModal").modal("show");
        }

        async function openResponseModal(data) {
            let response = await client.graphql({
                query: responseDetails,
                variables: {
                    filter: {
                        messageId: { eq: data[0] }
                    }
                }
            });
            response = response.data.listCommunications.items[0];

            let form = $("<form>").attr("id", "responseForm");

            form.append(
                $("<div>")
                    .addClass("form-row")
                    .append($("<div>").addClass("form-group3 col-md-6").append($("<label>").text("Response attachment"), $("<input>").attr("type", "text").addClass("form-control").prop("disabled", true).val(response.responseAttachment)))
            );
            form.append($("<div>").addClass("form-group3").append($("<label>").text("Response AI:")).append($("<input>").attr("type", "text").addClass("form-control").prop("disabled", true).val(response.responseAi)));

            form.append($("<div>").addClass("form-group3").append($("<label>").text("Response Subjet:")).append($("<input>").attr("type", "text").addClass("form-control").prop("disabled", true).val(response.responseSubject)));
            form.append($("<div>").addClass("form-group3").append($("<label>").text("Response Body:")).append($("<textarea>").addClass("form-control").prop("disabled", true).val(response.responseBody)));
            // Crea el modal con el formulario
            let modal = $("<div>").addClass("modal fade").attr("id", "responseModal");
            let modalDialog = $("<div>").addClass("modal-dialog");
            let modalContent = $("<div>").addClass("modal-content");
            let modalHeader = $("<div>").addClass("modal-header headerCenter").append($("<h3>").addClass("modal-title").attr("id", "myModalLabel").text("Contenido de la respuesta"));
            let modalBody = $("<div>").addClass("modal-body").append(form);
            let modalFooter = $("<div>")
                .addClass("modal-footer")
                .append($("<button>").addClass("btn btn-secondary").text("Cerrar").attr("data-dismiss", "modal"));
            modalContent.append(modalHeader, modalBody, modalFooter);
            modalDialog.append(modalContent);
            modal.append(modalDialog);

            $("#responseModal").remove();
            $("body").append(modal);

            $("#responseModal").modal("show");
        }

        async function openThreadModal(data) {
            let thread = await client.graphql({
                query: threadQuery,
                variables: {
                    filter: {
                        messageId: { eq: data[0] }
                    }
                }
            });
            thread = JSON.parse(thread.data.listCommunications.items[0].thread)
            const normalizedDate = normalizeDate(thread.dateTime);

            var section = document.createElement("div");
            section.className = "section__content section__content--p30";

            var container = document.createElement("div");
            container.className = "container-fluid";

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

            thread.forEach(function (item) {
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
            container.appendChild(bootdeyContainer);
            section.appendChild(container);

            // Crea el modal con el formulario
            let modal = $("<div>").addClass("modal fade").attr("id", "threadModal");
            let modalDialog = $("<div>").addClass("modal-dialog Modal_BIG"); // Cambia "modal-lg" por "modal-sm" si quieres un modal más pequeño
            let modalContent = $("<div>").addClass("modal-content");
            let modalHeader = $("<div>").addClass("modal-header headerCenter").append($("<h3>").addClass("modal-title").attr("id", "threadModalLabel").text("Hilo de la conversación"));
            let modalBody = $("<div>").addClass("modal-body");
            modalBody.append(section);
            let modalFooter = $("<div>").addClass("modal-footer").append($("<button>").addClass("btn btn-secondary").text("Cerrar").attr("data-dismiss", "modal"));
            modalContent.append(modalHeader, modalBody, modalFooter);
            modalDialog.append(modalContent);
            modal.append(modalDialog);
            $("#threadModal").remove();
            $("body").append(modal);

            $("#threadModal").modal("show");
        }

        window.onload = function () {
            renderCommunications()
        }

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
// (function ($) {
//     // Use Strict
//     "use strict";
//     try {
//         var progressbarSimple = $(".js-progressbar-simple");
//         progressbarSimple.each(function () {
//             var that = $(this);
//             var executed = false;
//             $(window).on("load", function () {
//                 that.waypoint(
//                     function () {
//                         if (!executed) {
//                             executed = true;
//                             /*progress bar*/
//                             that.progressbar({
//                                 update: function (current_percentage, $this) {
//                                     $this.find(".js-value").html(current_percentage + "%");
//                                 },
//                             });
//                         }
//                     },
//                     {
//                         offset: "bottom-in-view",
//                     }
//                 );
//             });
//         });
//     } catch (err) {
//         console.log(err);
//     }
// })(jQuery);
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
