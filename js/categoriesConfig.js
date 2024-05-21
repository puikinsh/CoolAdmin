import {
    createCategories,
    deleteCategories,
    updateCategories,
    updateDefaultCategories,
} from "../src/graphql/mutations.js";
import {
    getCategories,
    getDefaultCategories,
    listCategories,
    listDefaultCategories,
} from "../src/graphql/queries.js";
import { client } from "./amplifyConfig.js";

(async function ($) {
    // USE STRICT
    "use strict";
    try {
        var select = document.getElementById("selectOptionCategory"),
            divCategory = document.getElementById("divCategory");

        let categories,
            defaultCategories = await client.graphql({
                query: listDefaultCategories,
            }),
            customCategories = await client.graphql({ query: listCategories });

        categories = [
            ...defaultCategories.data.listDefaultCategories.items,
            ...customCategories.data.listCategories.items,
        ];
        categories.forEach((e) => {
            const option = document.createElement("option");
            option.value = e.categoryName;
            option.innerHTML = e.categoryName;
            select.appendChild(option);
        });

        select.addEventListener("change", async (e) => {
            if (e.target.value !== "Selecciona") {
                const categ = categories.find(
                    (c) => c.categoryName === e.target.value
                ),
                    props = [
                        "autoRedirect",
                        "autoRetargeting",
                        "autoTrigger",
                        "autoQuote",
                        "autoResponse",
                        "redirectTo",
                        "quoteOption",
                        "triggerOption",
                        "retargetingOption",
                        "retargetingTime",
                    ];
                let isDefault = true,
                    { data } = await client.graphql({
                        query: getDefaultCategories,
                        variables: { id: categ.id },
                    });
                !data.getDefaultCategories &&
                    ({ data } = await client.graphql({
                        query: getCategories,
                        variables: { id: categ.id },
                    })) &&
                    (isDefault = false);
                const config = data?.getDefaultCategories
                    ? data?.getDefaultCategories.configuration
                    : data?.getCategories.configuration;
                console.log(data);
                for (const key in config) {
                    let value = config[key];
                    const element = document.getElementById(key);
                    console.log("key", key, "value", value);
                    if (element && key !== "__typename") {
                        let valueParsed;
                        switch (element.type) {
                            case "checkbox":
                                element.checked = value;
                                break;
                            case "select-one":
                                valueParsed = JSON.parse(value);
                                element.value = valueParsed?.option
                                    ? valueParsed.option
                                    : value;
                                break;
                            default:
                                valueParsed = value ? JSON.parse(value) : {};
                                element.value = valueParsed?.value
                                    ? valueParsed.value
                                    : value === "{}"
                                        ? ""
                                        : value;
                                break;
                        }
                    }
                }

                const saveButton = document.getElementById("saveChange");
                saveButton.addEventListener("click", async (e) => {
                    let params = {};
                    props.forEach((p) => {
                        let elem = document.getElementById(p);
                        console.log(p, elem.type);
                        switch (elem.type) {
                            case "checkbox":
                                params[p] = elem.checked;
                                break;
                            case "select-one":
                                console.log("hola", elem.value);
                                params[p] = elem.value
                                    ? `{\"option\":\"${elem.value}\"}`
                                    : "{}";
                                break;
                            default:
                                params[p] =
                                    p === "redirectTo"
                                        ? elem.value === ""
                                            ? `{}`
                                            : `{\"value\":[${elem.value
                                                .split(",")
                                                .map((e) => `\"${e}\"`)}]}`
                                        : elem.value;
                        }
                    });
                    console.log(params);
                    isDefault
                        ? await client.graphql({
                            query: updateDefaultCategories,
                            variables: {
                                input: {
                                    id: categ.id,
                                    configuration: params,
                                },
                            },
                        })
                        : await client.graphql({
                            query: updateCategories,
                            variables: {
                                input: {
                                    id: categ.id,
                                    configuration: params,
                                },
                            },
                        });
                    window.alert("Se guardo la configuracion");
                });
                const resetButton = document.getElementById("resetDefault");
                resetButton.addEventListener("click", async (e) => {
                    const a = await client.graphql({
                        query: updateDefaultCategories,
                        variables: {
                            input: {
                                id: categ.id,
                                configuration: {
                                    autoRedirect: false,
                                    autoRetargeting: false,
                                    autoTrigger: false,
                                    autoQuote: false,
                                    autoResponse: false,
                                    redirectTo: {},
                                    quoteOption: {},
                                    triggerOption: {},
                                    retargetingOption: {},
                                    retargetingTime: "",
                                },
                            },
                        },
                    });
                });
            }
        });

        const editCategoriesBtn = document.querySelector(".edit_categories");
        const categoryForm = document.createElement("form");
        let newCategories = [];
        let oldCategories = [],
            deletedCategories = [];
        const addCategoryBtn = document.createElement("button");
        const icon = document.createElement("i");

        addCategoryBtn.id = "addCategory";
        addCategoryBtn.className = "btn btn-success";
        addCategoryBtn.textContent = "Agregar ";
        addCategoryBtn.appendChild(icon);
        icon.classList.add("fas", "fa-plus");

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

        let count = 1;
        addCategoryBtn.addEventListener("click", function () {
            const newCategory = document.createElement("div");
            newCategory.className = "form-group row";
            newCategory.key = count;
            const inputWrapper = document.createElement("div");
            inputWrapper.className = "col-9";
            const input = document.createElement("input");
            input.type = "text";
            input.className = "form-control";
            input.id = count;
            inputWrapper.appendChild(input);
            const deleteBtnWrapper = document.createElement("div");
            deleteBtnWrapper.className = "col-3";
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "btn";
            deleteBtn.innerHTML =
                '<i class="fa fa-times" style="color: red;" data-toggle="tooltip" data-placement="top" title="Borrar categoría"></i>';
            deleteBtn.addEventListener("click", function () {
                categoryForm.removeChild(newCategory);
                newCategories = newCategories.filter(
                    (e) => e.id !== newCategory.key
                );
            });
            deleteBtnWrapper.appendChild(deleteBtn);
            newCategory.appendChild(inputWrapper);
            newCategory.appendChild(deleteBtnWrapper);
            newCategories.push({ id: count });
            categoryForm.appendChild(newCategory);
            count += 1;
        });
        saveBtn.addEventListener("click", async function () {
            let elementRepeted = [];

            for (let i = 0; i < newCategories.length; i++) {
                let parameters = {
                    autoRedirect: false,
                    autoRetargeting: false,
                    autoTrigger: false,
                    autoQuote: false,
                    autoResponse: false,
                    redirectTo: "{}",
                    quoteOption: "{}",
                    triggerOption: "{}",
                    retargetingOption: "{}",
                    retargetingTime: "",
                };
                const c = newCategories[i],
                    element = document.getElementById(c.id);
                oldCategories.forEach((categ) => {
                    let categElement = document.getElementById(categ.id);
                    categElement.value === element.value &&
                        elementRepeted.push(element);
                });

                console.log("categoryAdded:", element.categoryName);
                if (!elementRepeted.includes(element)) {
                    await client.graphql({
                        query: createCategories,
                        variables: {
                            input: {
                                clientId: "0001",
                                categoryName: element.value,
                                configuration: parameters,
                            },
                        },
                    });
                } else {
                    window.alert(
                        `Ya existe una categoria con el nombre ${element.value}`
                    );
                }
            }

            for (let i = 0; i < oldCategories.length; i++) {
                const c = oldCategories[i];
                const element = document.getElementById(c.id);
                await client.graphql({
                    query: updateCategories,
                    variables: {
                        input: { id: c.id, categoryName: element.value },
                    },
                });
            }

            for (let i = 0; i < deletedCategories.length; i++) {
                const c = deletedCategories[i];
                await client.graphql({
                    query: deleteCategories,
                    variables: { input: { id: c.id } },
                });
            }

            location.reload();
        });
        cancelBtn.addEventListener("click", function () {
            $("#myModal").modal("hide");
        });

        const modalBody = document.createElement("div");
        modalBody.className = "modal-body m-t-20 m-b-10 m-l-40 p-l-40";
        modalBody.appendChild(categoryForm);

        const buttonsWrapper = document.createElement("div");
        buttonsWrapper.className = "row justify-content-center";
        const addBtnWrapper = document.createElement("div");
        addBtnWrapper.className = "col-3";
        addBtnWrapper.appendChild(addCategoryBtn);
        const saveBtnWrapper = document.createElement("div");
        saveBtnWrapper.className = "col-3";
        saveBtnWrapper.appendChild(saveBtn);
        const cancelBtnWrapper = document.createElement("div");
        cancelBtnWrapper.className = "col-3";
        cancelBtnWrapper.appendChild(cancelBtn);
        buttonsWrapper.appendChild(cancelBtnWrapper);
        buttonsWrapper.appendChild(addBtnWrapper);
        buttonsWrapper.appendChild(saveBtnWrapper);
        modalBody.appendChild(buttonsWrapper);

        const modalContent = document.createElement("div");
        modalContent.className = "modal-content";
        modalContent.appendChild(modalBody);

        const modalDialog = document.createElement("div");
        modalDialog.className = "modal-dialog";
        modalDialog.role = "document";
        modalDialog.appendChild(modalContent);
        modalDialog.style = "max-width: 800px;"

        const modal = document.createElement("div");
        modal.className = "modal fade";
        modal.id = "myModal";
        modal.tabIndex = -1;
        modal.role = "dialog";
        modal.setAttribute("aria-labelledby", "myModalLabel");
        modal.setAttribute("aria-hidden", "true");
        modal.appendChild(modalDialog);

        document.body.appendChild(modal);

        customCategories.data.listCategories.items.forEach(function (category) {
            const newCategory = document.createElement("div");
            newCategory.className = "form-group row";
            newCategory.key = category.id;
            const inputWrapper = document.createElement("div");
            inputWrapper.className = "col-9";
            const input = document.createElement("input");
            input.type = "text";
            input.className = "form-control";
            input.id = category.id;
            input.value = category.categoryName;
            inputWrapper.appendChild(input);
            const deleteBtnWrapper = document.createElement("div");
            deleteBtnWrapper.className = "col-3";
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "btn";
            deleteBtn.innerHTML =
                '<i class="fa fa-times" style="color: red;" data-toggle="tooltip" data-placement="top" title="Borrar categoría"></i>';
            deleteBtn.addEventListener("click", function () {
                categoryForm.removeChild(newCategory);
                deletedCategories.push({
                    categoryName: category.categoryName,
                    id: newCategory.key,
                });
                oldCategories = oldCategories.filter(
                    (e) => e.id !== newCategory.key
                );
            });
            deleteBtnWrapper.appendChild(deleteBtn);
            newCategory.appendChild(inputWrapper);
            newCategory.appendChild(deleteBtnWrapper);
            categoryForm.appendChild(newCategory);
            oldCategories.push({ id: category.id });
        });
    } catch (error) {
        console.log(error);
    }
})(jQuery);
