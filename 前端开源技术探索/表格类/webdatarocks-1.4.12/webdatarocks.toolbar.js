/**
 * WebDataRocks Reporting v1.4.12 (https://www.webdatarocks.com/)
 * Copyright © 2023 WebDataRocks. All rights reserved.
 *
 * By downloading, installing and/or using WebDataRocks you agree with the terms of
 * WebDataRocks End User License Agreement, a copy of which is located at: https://www.webdatarocks.com/license-agreement/.
 */
var WebDataRocksToolbar = function (pivotContainer, pivot, _, width, labels) {
    this.pivot = pivot;
    this.pivotContainer = pivotContainer;
    this.width = (typeof width == "number" || (width.indexOf("px") < 0 && width.indexOf("%") < 0)) ? width + "px" : width;
    this.Labels = labels;
}
WebDataRocksToolbar.prototype.getTabs = function () {
    var tabs = [];
    var Labels = this.Labels;
    // Connect tab
    tabs.push({
        title: Labels.connect, id: "wdr-tab-connect", icon: this.icons.connect,
        menu: [
            { title: Labels.connect_local_csv, id: "wdr-tab-connect-local-csv", handler: this.connectLocalCSVHandler, mobile: false, icon: this.icons.connect_csv },
            { title: Labels.connect_local_json, id: "wdr-tab-connect-local-json", handler: this.connectLocalJSONHandler, mobile: false, icon: this.icons.connect_json },
            { title: this.osUtils.isMobile ? Labels.connect_remote_csv_mobile : Labels.connect_remote_csv, id: "wdr-tab-connect-remote-csv", handler: this.connectRemoteCSV, icon: this.icons.connect_csv },
            { title: this.osUtils.isMobile ? Labels.connect_remote_json_mobile : Labels.connect_remote_json, id: "wdr-tab-connect-remote-json", handler: this.connectRemoteJSON, icon: this.icons.connect_json },
        ]
    });

    // Open tab
    tabs.push({
        title: Labels.open, id: "wdr-tab-open", icon: this.icons.open,
        menu: [
            { title: Labels.local_report, id: "wdr-tab-open-local-report", handler: this.openLocalReport, mobile: false, icon: this.icons.open_local },
            { title: this.osUtils.isMobile ? Labels.remote_report_mobile : Labels.remote_report, id: "wdr-tab-open-remote-report", handler: this.openRemoteReport, icon: this.icons.open_remote }
        ]
    });

    // Save tab
    tabs.push({ title: Labels.save, id: "wdr-tab-save", handler: this.saveHandler, mobile: false, icon: this.icons.save });

    // Export tab
    tabs.push({
        title: Labels.export, id: "wdr-tab-export", mobile: false, icon: this.icons.export,
        menu: [
            { title: Labels.export_print, id: "wdr-tab-export-print", handler: this.printHandler, icon: this.icons.export_print },
            { title: Labels.export_html, id: "wdr-tab-export-html", handler: this.exportHandler, args: "html", icon: this.icons.export_html },
            { title: Labels.export_excel, id: "wdr-tab-export-excel", handler: this.exportHandler, args: "excel", icon: this.icons.export_excel },
            { title: Labels.export_pdf, id: "wdr-tab-export-pdf", handler: this.exportHandler, args: "pdf", icon: this.icons.export_pdf },
        ]
    });

    // Format tab
    tabs.push({
        title: Labels.format, id: "wdr-tab-format", icon: this.icons.format, rightGroup: true,
        menu: [
            { title: this.osUtils.isMobile ? Labels.format_cells_mobile : Labels.format_cells, id: "wdr-tab-format-cells", handler: this.formatCellsHandler, icon: this.icons.format_number },
            { title: this.osUtils.isMobile ? Labels.conditional_formatting_mobile : Labels.conditional_formatting, id: "wdr-tab-format-conditional", handler: this.conditionalFormattingHandler, icon: this.icons.format_conditional }
        ]
    });

    // Options tab
    tabs.push({ title: Labels.options, id: "wdr-tab-options", handler: this.optionsHandler, icon: this.icons.options, rightGroup: true });

    // Fields tab
    tabs.push({ title: Labels.fields, id: "wdr-tab-fields", handler: this.fieldsHandler, icon: this.icons.fields, rightGroup: true });

    // Fullscreen tab
    if (document["addEventListener"] != undefined) { // For IE8
        tabs.push({ title: Labels.fullscreen, id: "wdr-tab-fullscreen", handler: this.fullscreenHandler, mobile: false, icon: this.icons.fullscreen, rightGroup: true });
    }

    return tabs;
}
WebDataRocksToolbar.prototype.create = function () {
    this.popupManager = new WebDataRocksToolbar.PopupManager(this);
    this.dataProvider = this.getTabs();
    this.init();
}

WebDataRocksToolbar.prototype.applyToolbarLayoutClasses = function() {
    if (!this.osUtils.isMobile) {
        var _this = this;
        var addLayoutClasses = function() {
            if (!_this.toolbarWrapper) return;
            var toolbarWidth = _this.toolbarWrapper.getBoundingClientRect().width;
            _this.toolbarWrapper.classList.remove("wdr-layout-500");
            _this.toolbarWrapper.classList.remove("wdr-layout-360");
            _this.toolbarWrapper.classList.remove("wdr-layout-300");
            if (toolbarWidth < 500) {
                _this.toolbarWrapper.classList.add("wdr-layout-500");
            }
            if (toolbarWidth < 360) {
                _this.toolbarWrapper.classList.add("wdr-layout-360");
            }
            if (toolbarWidth < 300) {
                _this.toolbarWrapper.classList.add("wdr-layout-300");
            }
        };
        addLayoutClasses();
        window.addEventListener("resize", addLayoutClasses);
    }
}

WebDataRocksToolbar.prototype.init = function () {
    this.container = this.pivotContainer;
    this.container.style.position = (this.container.style.position == "") ? "relative" : this.container.style.position;
    this.toolbarWrapper = document.createElement("div");
    this.toolbarWrapper.id = "wdr-toolbar-wrapper";
    this.toolbarWrapper.style.width = this.width;
    if (this.osUtils.isMobile) {
        this.addClass(this.toolbarWrapper, "wdr-mobile");
    }
    this.addClass(this.toolbarWrapper, "wdr-toolbar-ui");
    this.toolbarWrapper.style.width = this.width;
    var toolbar = document.createElement("ul");
    toolbar.id = "wdr-toolbar";
    var rightGroup = document.createElement("div");
    rightGroup.classList.add("wdr-toolbar-group-right");
    toolbar.appendChild(rightGroup);

    for (var i = 0; i < this.dataProvider.length; i++) {
        if (this.isDisabled(this.dataProvider[i])) continue;
        if (this.osUtils.isMobile && this.dataProvider[i].menu != null && this.dataProvider[i].collapse != true) {
            for (var j = 0; j < this.dataProvider[i].menu.length; j++) {
                if (this.isDisabled(this.dataProvider[i].menu[j])) continue;
                toolbar.appendChild(this.createTab(this.dataProvider[i].menu[j]));
            }
        } else {
            var tab = (this.dataProvider[i].divider) ? this.createDivider(this.dataProvider[i]) : this.createTab(this.dataProvider[i]);
            if (rightGroup && this.dataProvider[i].rightGroup) {
                rightGroup.appendChild(tab);
            } else {
                toolbar.appendChild(tab);
            }
        }
    }
    this.toolbarWrapper.appendChild(toolbar);
    this.container.insertBefore(this.toolbarWrapper, this.container.firstChild);
    this.updateLabels(this.Labels);

    this.applyToolbarLayoutClasses();
}

// LABELS
WebDataRocksToolbar.prototype.updateLabels = function (labels) {
    var Labels = this.Labels = labels;

    this.setText(document.querySelector("#wdr-tab-connect > a > span"), Labels.connect);
    this.setText(document.querySelector("#wdr-tab-connect-local-csv > a > span"), Labels.connect_local_csv);
    this.setText(document.querySelector("#wdr-tab-connect-local-json > a > span"), Labels.connect_local_json);
    this.setText(document.querySelector("#wdr-tab-connect-remote-csv > a > span"), this.osUtils.isMobile ? Labels.connect_remote_csv_mobile : Labels.connect_remote_csv);

    this.setText(document.querySelector("#wdr-tab-open > a > span"), Labels.open);
    this.setText(document.querySelector("#wdr-tab-open-local-report > a > span"), Labels.local_report);
    this.setText(document.querySelector("#wdr-tab-open-remote-report > a > span"), this.osUtils.isMobile ? Labels.remote_report_mobile : Labels.remote_report);

    this.setText(document.querySelector("#wdr-tab-save > a > span"), Labels.save);

    this.setText(document.querySelector("#wdr-tab-format > a > span"), Labels.format);
    this.setText(document.querySelector("#wdr-tab-format-cells > a > span"), this.osUtils.isMobile ? Labels.format_cells_mobile : Labels.format_cells);
    this.setText(document.querySelector("#wdr-tab-format-conditional > a > span"), this.osUtils.isMobile ? Labels.conditional_formatting_mobile : Labels.conditional_formatting);

    this.setText(document.querySelector("#wdr-tab-options > a > span"), Labels.options);
    this.setText(document.querySelector("#wdr-tab-fullscreen > a > span"), Labels.fullscreen);

    this.setText(document.querySelector("#wdr-tab-export > a > span"), Labels.export);
    this.setText(document.querySelector("#wdr-tab-export-print > a > span"), Labels.export_print);
    this.setText(document.querySelector("#wdr-tab-export-html > a > span"), Labels.export_html);
    this.setText(document.querySelector("#wdr-tab-export-excel > a > span"), Labels.export_excel);
    this.setText(document.querySelector("#wdr-tab-export-pdf > a > span"), Labels.export_pdf);

    this.setText(document.querySelector("#wdr-tab-fields > a > span"), Labels.fields);
}
// ICONS
WebDataRocksToolbar.prototype.icons = {
    connect: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="-305.5 396.5 36 36"><path fill="#555" d="M-274.5 425.409s-.988.277-1.422.761l-3.536-1.783c.189-.509.258-1.066.07-1.572l3.719-1.76a2.36 2.36 0 0 0 3.317.147 2.341 2.341 0 0 0 .157-3.3 2.335 2.335 0 0 0-4.055 1.582c-.009.122-.008.237.001.358l-3.896 1.884a2.281 2.281 0 0 0-1.359-.451 2.338 2.338 0 0 0-2.177 2.481 2.33 2.33 0 0 0 2.177 2.179c.491 0 .967-.156 1.359-.451l3.921 1.892a2.317 2.317 0 0 0 1.981 2.604 2.316 2.316 0 0 0 2.604-1.981c.171-1.269-1-2.432-2.262-2.603a8.794 8.794 0 0 0-.6-.026v.039zM-301.592 413.883c-.008.105-.908.222.092.326v6.836c0 2.587 5.827 5.455 13.177 5.455h1.081c-1.146-3 .303-6.854 3.299-8.155-1.448.172-2.868.069-4.334.069-7.056.009-12.775-2.093-13.315-4.531z"/><path fill="#555" d="M-288.5 416.217c7.377 0 13-2.097 13-4.683v-6.853c0-2.586-5.647-4.682-13-4.682-7.352 0-13 2.104-13 4.69v6.853c0 2.586 5.648 4.675 13 4.675zm.177-15.268c5.903 0 10.691 1.661 10.691 3.741s-4.796 3.741-10.691 3.741c-5.894 0-10.683-1.67-10.683-3.741 0-2.072 4.79-3.741 10.683-3.741z"/></svg>',
    connect_csv: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M11 24l6 0V27h-6V24z"/><path d="M12.8 22L12.8 22l1.2-2.5L15.1 22h1.9l-2-3.9L16.9 14h-1.8l-1 2.5L12.9 14h-1.8l1.9 3.9L11 22H12.8z"/><path d="M19 19h6v3h-6V19z"/><path d="M19 14h6v3L19 17V14z"/><path d="M19 24h6v3h-6V24z"/><path d="M23 4H7v28h22V11L23 4zM8 31V5h14v7h6v19H8L8 31z"/></svg>',
    connect_json: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M23 4H7v28h22V11L23 4zM8 31V5h14v7h6v19H8L8 31z"/><path d="M19 24c0 0.6-0.4 1-1 1 -0.6 0-1-0.4-1-1v-2c0-0.6 0.4-1 1-1 0.6 0 1 0.4 1 1V24zM21 18v-2c0-0.6-0.4 0-1 0 -0.6 0-1-0.4-1-1 0-0.6 0.4-1 1-1 1.7 0 3 0.3 3 2v2c0 1.1 0.9 2 2 2 0.6 0 1 0.4 1 1 0 0.6-0.4 1-1 1 -1.1 0-2 0.9-2 2v2c0 1.7-1.3 2-3 2 -0.6 0-1-0.4-1-1s0.4-1 1-1c0.6 0 1 0.6 1 0v-2c0-1.2 0.5-2.3 1.4-3C21.5 20.3 21 19.2 21 18zM11 20c1.1 0 2-0.9 2-2v-2c0-1.7 1.3-2 3-2 0.6 0 1 0.4 1 1 0 0.6-0.4 1-1 1 -0.6 0-1-0.6-1 0v2c0 1.2-0.5 2.3-1.4 3 0.8 0.7 1.4 1.8 1.4 3v2c0 0.6 0.4 0 1 0 0.6 0 1 0.4 1 1s-0.4 1-1 1c-1.7 0-3-0.3-3-2v-2c0-1.1-0.9-2-2-2 -0.6 0-1-0.4-1-1C10 20.4 10.4 20 11 20z"/><path d="M18 17c0.6 0 1 0.4 1 1s-0.4 1-1 1 -1-0.4-1-1S17.4 17 18 17z"/></svg>',
    open: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="-305.5 396.5 36 36"><path fill="#555" d="M-279.351 408.5h8.976c.064 0 .126-.067.167-.025.021.052.021.055 0 .107l-2.053 20.701c-.01.117-.104.217-.219.217h-30.102c-.116 0-.21-.104-.221-.22l-1.989-16.009c-.022-.041-.022.124 0 .083.042-.054.115.146.178.146h21.198c.87 0 1.665-.726 2.053-1.499l1.812-3.446a.414.414 0 0 1 .2-.055zm-4.052 2.473c.084-.011.162-.052.194-.126l1.813-3.288c.408-.754 1.196-1.059 2.054-1.059h7.842v-2.637c0-1.102-.83-2.166-1.929-2.25-.053 0-.183-.113-.235-.113h-18.328c-.104 0-.188.006-.241-.09.01-1.1-.858-1.91-1.958-1.91h-6.902c-1.226 0-2.406.864-2.406 2.089v9.426l20.096-.042z"/></svg>',
    open_local: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><style>.a{fill:none;}</style><path d="M30.9 10.6C30.8 10.4 30.2 10 30 10h-1V8c0-0.4-0.6-1-1-1H15l-1-2H8C7.6 5 7 5.6 7 6v4H6c-0.2 0-0.8 0.4-0.9 0.6 -0.1 0.1-0.2 0.3-0.1 0.5l2.1 19.5C7.2 30.8 7.7 31 8 31h20c0.3 0 0.8-0.2 0.9-0.5l2.1-19.5C31 10.9 31 10.7 30.9 10.6zM28 30H8L6 11h24L28 30z"/><line x1="11" y1="23" x2="11" y2="23" class="a"/><line x1="25" y1="23" x2="25" y2="23" class="a"/><polygon points="11 15 11 23 17 23 17 25 14 25 14 26 22 26 22 25 19 25 19 23 25 23 25 15 "/></svg>',
    open_remote: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M30.9 10.6C30.8 10.4 30.2 10 30 10h-1V8c0-0.4-0.6-1-1-1H15l-1-2H8C7.6 5 7 5.6 7 6v4H6c-0.2 0-0.8 0.4-0.9 0.6 -0.1 0.1-0.2 0.3-0.1 0.5l2.1 19.5C7.2 30.8 7.7 31 8 31h20c0.3 0 0.8-0.2 0.9-0.5l2.1-19.5C31 10.9 31 10.7 30.9 10.6zM28 30H8L6 11h24L28 30z"/><path d="M24.8 18.1l-0.8 1.5c-0.2 0.2-0.5 0.2-0.8 0 -1.3-1.2-3.2-1.9-5.3-1.9 -2.1 0-4 0.7-5.3 1.9 -0.2 0.2-0.5 0.2-0.8 0l-0.8-1.5c-0.1-0.1-0.2-0.2-0.2-0.3 0-0.1 0.1-0.2 0.2-0.3 1.7-1.5 4.1-2.5 6.8-2.5 2.7 0 5.1 0.9 6.8 2.5 0.1 0 0.2 0.2 0.2 0.3C25 17.9 24.9 18 24.8 18.1zM18 19.6c1.5 0 2.8 0.5 3.8 1.4 0.2 0.2 0.2 0.5 0 0.7l-0.8 1.5c-0.2 0.2-0.5 0.2-0.8 0 -0.6-0.5-1.4-0.8-2.3-0.8 -0.9 0-1.7 0.3-2.3 0.8 -0.2 0.2-0.5 0.2-0.8 0l-0.8-1.5c-0.2-0.2-0.2-0.5 0-0.7C15.2 20.1 16.5 19.6 18 19.6zM18 23.4c0.8 0 1.4 0.6 1.4 1.3 0 0.7-0.6 1.3-1.4 1.3 -0.8 0-1.4-0.6-1.4-1.3C16.6 24 17.2 23.4 18 23.4z"/></svg>',
    save: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="-17.5 774.5 36 36"><g fill="#555"><path d="M15.191 783.284l-5.457-5.467a1.101 1.101 0 0 0-.781-.317h-.835c-.2 0-.618.163-.618.363v8.889c0 .618-.245.748-.853.748H-5.638c-.617 0-.862-.14-.862-.748v-8.889c0-.2-.409-.363-.609-.363h-6.283c-.618 0-1.108.499-1.108 1.107v27.785c0 .617.5 1.107 1.108 1.107h27.784c.618 0 1.108-.499 1.108-1.107v-22.337c0-.29-.109-.562-.309-.771zM8.98 801.463c0 .618-.499 1.037-1.107 1.037H-6.873c-.617 0-.627-.357-.627-.966v-8.626c0-.617.019-1.408.627-1.408H7.882c.618 0 1.108.613 1.108 1.223l-.01 8.74z"/><path d="M-4.167 784.5h9.361c.2 0 .306.228.306.028v-6.665c0-.2-.106-.363-.306-.363h-9.361c-.2 0-.333.163-.333.363v6.665c0 .191.124-.028.333-.028zm5.667-4.294c0-.618.392-1.108 1-1.108.618 0 1 .5 1 1.108v1.97c0 .618-.392 1.108-1 1.108-.618 0-1-.5-1-1.108v-1.97zM4.168 796.5h-7.31c-.617 0-1.108.393-1.108 1s.5 1 1.108 1h7.31c.617 0 1.107-.393 1.107-1s-.498-1-1.107-1z"/></g></svg>',
    export: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="-17.5 774.5 36 36"><g fill="#555"><path d="M15.446 795.615l-4.289-6.461c-.346-.515-.803-.654-1.428-.654H7.788c-.186 0-.346-.029-.363.156-.008.076.017.07.059.137l4.76 7.108c.042.06.034.337-.017.38-.025.025-.067.219-.102.219H6.699c-.194 0-.354-.063-.363.125-.305 3.23-3.174 5.495-6.407 5.192-2.81-.263-5.039-2.329-5.3-5.14-.009-.195-.168-.178-.363-.178h-5.401c-.076 0-.144-.281-.144-.357 0-.025.008-.157.017-.175l4.76-7.203c.102-.16.05-.245-.109-.347-.06-.035-.118.082-.187.082h-1.94c-.616 0-1.199.145-1.553.658l-4.664 6.547c-.203.304-.545.586-.545.95v9.216c1 .911 1.267 1.646 2.187 1.629h27.625c.903.009 1.188-.709 1.188-1.611v-9.233c1-.373.157-.735-.054-1.04z"/><path d="M-3.674 783.5H-2.5v10.2c1 1.4 1.764 2.464 3.165 2.371 1.274-.083 1.835-1.097 2.835-2.371v-10.2h1.207c.346 0 .641-.04.65-.387.008-.151-.042-.193-.144-.311l-4.186-5.11c-.228-.287-.642-.302-.929-.073-.042.034-.076.081-.101.115l-4.135 5.172c-.22.271-.187.447.084.668.11.085.244-.074.38-.074z"/></g></svg>',
    export_print: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="-17.5 774.5 36 36"><path fill="#555" d="M-5.5 798.685v3.815h11v-7h-11v3.185zm2-1.185h7v1h-7v-1zm0 2h7v1h-7v-1zM5.5 786.308V782.5h-11v7h11z"/><path fill="#555" d="M8.94 786.5H7.5v4h-14v-4h-1.44c-1.493 0-2.56 1.064-2.56 2.558v6.87c0 1.493 1.067 2.572 2.56 2.572h1.44v-4h14v4h1.44c1.493 0 2.56-1.064 2.56-2.557v-6.878c0-1.501-1.074-2.565-2.56-2.565z"/></svg>',
    export_excel: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M24.4 15h-3.8L18 18.6 15.3 15h-3.8l4.5 5.2L11 27h7.3L18 25h-2l2-3L21.1 27H25l-5.1-6.8L24.4 15z"/><path d="M23 4H7v28h22V11L23 4zM8 31V5h14v7h6v19H8L8 31z"/></svg>',
    export_html: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M25.7 20.8l-2.3-2.5c-0.2-0.2-0.4-0.3-0.6-0.3 -0.2 0-0.4 0.1-0.6 0.3 -0.3 0.4-0.3 1 0 1.4l1.7 1.9 -1.7 1.9c-0.2 0.2-0.3 0.4-0.3 0.7 0 0.3 0.1 0.5 0.3 0.7 0.2 0.2 0.4 0.3 0.6 0.3 0.2 0 0.4-0.1 0.6-0.3l2.3-2.5C26.1 21.8 26.1 21.2 25.7 20.8z"/><path d="M14 24c0-0.3-0.1-0.5-0.3-0.7l-1.7-1.9 1.7-1.9c0.3-0.4 0.3-1 0-1.4 -0.2-0.2-0.4-0.3-0.6-0.3 -0.2 0-0.4 0.1-0.6 0.3l-2.3 2.5c-0.3 0.4-0.3 1 0 1.4l2.3 2.5c0.2 0.2 0.4 0.3 0.6 0.3 0.2 0 0.4-0.1 0.6-0.3C13.9 24.5 14 24.3 14 24z"/><path d="M20.4 15.1c-0.1 0-0.2-0.1-0.3-0.1 -0.4 0-0.8 0.3-0.9 0.6l-4.1 11.1c-0.1 0.2-0.1 0.5 0 0.7 0.1 0.2 0.3 0.4 0.5 0.5C15.7 28 15.8 28 16 28c0.4 0 0.8-0.3 0.9-0.6l4.1-11.1C21.1 15.8 20.9 15.2 20.4 15.1z"/><path d="M23 4H7v28h22V11L23 4zM8 31V5h14v7h6v19H8L8 31z"/></svg>',
    export_pdf: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M17.2 17.1L17.2 17.1C17.3 17.1 17.3 17.1 17.2 17.1c0.1-0.5 0.2-0.7 0.2-1V15.8c0.1-0.6 0.1-1 0-1.1 0 0 0 0 0-0.1l-0.1-0.1 0 0 0 0c0 0 0 0.1-0.1 0.1C16.9 15.2 16.9 16 17.2 17.1L17.2 17.1zM13.8 24.8c-0.2 0.1-0.4 0.2-0.6 0.3 -0.8 0.7-1.3 1.5-1.5 1.8l0 0 0 0 0 0C12.5 26.9 13.1 26.2 13.8 24.8 13.9 24.8 13.9 24.8 13.8 24.8 13.9 24.8 13.8 24.8 13.8 24.8zM24.1 23.1c-0.1-0.1-0.6-0.5-2.1-0.5 -0.1 0-0.1 0-0.2 0l0 0c0 0 0 0 0 0.1 0.8 0.3 1.6 0.6 2.1 0.6 0.1 0 0.1 0 0.2 0l0 0h0.1c0 0 0 0 0-0.1l0 0C24.2 23.3 24.1 23.3 24.1 23.1zM24.6 24c-0.2 0.1-0.6 0.2-1 0.2 -0.9 0-2.2-0.2-3.4-0.8 -1.9 0.2-3.4 0.5-4.5 0.9 -0.1 0-0.1 0-0.2 0.1 -1.3 2.4-2.5 3.5-3.4 3.5 -0.2 0-0.3 0-0.4-0.1l-0.6-0.3v-0.1c-0.1-0.2-0.1-0.3-0.1-0.6 0.1-0.6 0.8-1.6 2.1-2.4 0.2-0.1 0.6-0.3 1-0.6 0.3-0.6 0.7-1.2 1.1-2 0.6-1.1 0.9-2.3 1.2-3.3l0 0c-0.4-1.4-0.7-2.1-0.2-3.7 0.1-0.5 0.4-0.9 0.9-0.9h0.2c0.2 0 0.4 0.1 0.7 0.2 0.8 0.8 0.4 2.6 0 4.1 0 0.1 0 0.1 0 0.1 0.4 1.2 1.1 2.3 1.8 2.9 0.3 0.2 0.6 0.5 1 0.7 0.6 0 1-0.1 1.5-0.1 1.3 0 2.2 0.2 2.6 0.8 0.1 0.2 0.1 0.5 0.1 0.7C24.9 23.5 24.8 23.8 24.6 24zM17.3 19.6c-0.2 0.8-0.7 1.7-1.1 2.7 -0.2 0.5-0.4 0.8-0.7 1.2h0.1 0.1l0 0c1.5-0.6 2.8-0.9 3.7-1 -0.2-0.1-0.3-0.2-0.4-0.3C18.4 21.6 17.7 20.7 17.3 19.6z"/><path d="M23 4H7v28h22V11L23 4zM8 31V5h14v7h6v19H8L8 31z"/></svg>',
    format: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="-17.5 774.5 36 36"><g fill="#555"><path d="M15.144 781.92a7.62 7.62 0 0 0-4.238-4.157 4.634 4.634 0 0 0-1.201-.254.99.99 0 0 0-.906.36l-10.797 10.829c-1.462 1.462-2.916 2.908-4.37 4.378a1.347 1.347 0 0 0-.326.596c-.481 2.197-.939 4.402-1.413 6.607a.639.639 0 0 0 .792.793l6.551-1.381c.253-.049.49-.171.67-.359 5.063-5.08 10.127-10.144 15.19-15.207.237-.229.384-.548.4-.882a8.491 8.491 0 0 0-.352-1.323zm-16.825 16.652l-2.54.531a2.367 2.367 0 0 0-1.911-1.87c.18-.906.384-1.813.571-2.729a2.05 2.05 0 0 1 1.078.229 6.007 6.007 0 0 1 2.671 2.605c.139.318.245.653.311.996 0 .157 0 .157-.18.238z"/><path d="M6.568 804.5H-11.5v-18h7.761l1.83-2.118 1.593-1.882h-12.455c-.947 0-1.729 1.241-1.729 2.18v21.097c0 .947.77 1.724 1.726 1.724H8.283c.947 0 2.217-.769 2.217-1.724v-12.488l-4 3.438v7.773h.068z"/></g></svg>',
    format_number: '<svg xmlns="http://www.w3.org/2000/svg" width="52" height="36" viewBox="0 0 52 36"><path d="M31 19.2v-3.4l2.5-0.4c0.2-0.7 0.5-1.4 0.9-2.1l-1.4-2 2.4-2.4 2 1.4c0.7-0.4 1.4-0.7 2.1-0.9l0.4-2.5h3.4l0.4 2.5c0.7 0.2 1.4 0.5 2.1 0.9l2-1.4 2.4 2.4 -1.4 2c0.4 0.7 0.7 1.4 0.9 2.1L52 15.8v3.4l-2.5 0.4c-0.2 0.7-0.5 1.4-0.9 2.1l1.4 2 -2.4 2.4 -2-1.5c-0.7 0.4-1.4 0.7-2.1 0.9l-0.4 2.5h-3.4l-0.4-2.5c-0.7-0.2-1.4-0.5-2.1-0.9l-2 1.5 -2.4-2.4 1.4-2c-0.4-0.7-0.7-1.4-0.9-2.1L31 19.2zM41.5 21c1.9 0 3.5-1.6 3.5-3.5 0-1.9-1.6-3.5-3.5-3.5 -1.9 0-3.5 1.6-3.5 3.5C38 19.4 39.6 21 41.5 21z"/><path d="M38 30H1V6h36V5H0v26h38V30L38 30z"/><path d="M9.4 21.1c-0.3 0.3-0.7 0.4-1.2 0.4 -0.5 0-0.9-0.2-1.2-0.5s-0.4-0.8-0.4-1.4H5c0 0.9 0.2 1.7 0.7 2.2 0.5 0.6 1.2 0.9 2 1v1.3h1.1v-1.4c0.8-0.1 1.5-0.4 1.9-0.9 0.5-0.5 0.7-1.1 0.7-1.9 0-0.4-0.1-0.8-0.2-1.1 -0.1-0.3-0.3-0.6-0.5-0.8 -0.2-0.2-0.5-0.4-0.8-0.6 -0.3-0.2-0.8-0.4-1.4-0.6 -0.6-0.2-1-0.4-1.2-0.7s-0.4-0.6-0.4-1c0-0.4 0.1-0.8 0.4-1 0.2-0.2 0.6-0.4 1-0.4 0.4 0 0.8 0.2 1 0.5 0.3 0.3 0.4 0.8 0.4 1.4h1.6c0-0.9-0.2-1.6-0.6-2.2 -0.4-0.6-1-0.9-1.8-1v-1.5H7.9v1.5C7.1 12.6 6.5 12.9 6 13.4s-0.7 1.1-0.7 1.9c0 1.1 0.5 2 1.6 2.6 0.3 0.2 0.8 0.4 1.3 0.6 0.6 0.2 1 0.4 1.2 0.7s0.4 0.6 0.4 1C9.8 20.5 9.7 20.8 9.4 21.1z"/><path d="M16.3 12.6h-0.2l-3.8 1.5v1.4l2.4-0.8v8.1h1.6V12.6z"/><path d="M19.9 23.8c0.2-0.5 0.4-1 0.4-1.5l0-1.2h-1.5v1.3c0 0.3-0.1 0.6-0.2 1 -0.1 0.3-0.3 0.7-0.5 1.1l0.9 0.5C19.3 24.7 19.6 24.3 19.9 23.8z"/><path d="M27 16.7c0-1.4-0.3-2.5-0.8-3.2s-1.3-1.1-2.4-1.1c-1.1 0-1.9 0.4-2.4 1.1 -0.5 0.7-0.8 1.8-0.8 3.3v1.8c0 1.4 0.3 2.5 0.8 3.2s1.3 1.1 2.4 1.1c1.1 0 1.9-0.4 2.4-1.1 0.5-0.7 0.8-1.8 0.8-3.3V16.7zM25.4 18.9c0 0.9-0.1 1.6-0.4 2 -0.2 0.4-0.6 0.6-1.2 0.6 -0.5 0-0.9-0.2-1.2-0.7 -0.3-0.5-0.4-1.2-0.4-2.1v-2.3c0-0.9 0.1-1.5 0.4-2 0.3-0.4 0.6-0.6 1.2-0.6 0.5 0 0.9 0.2 1.2 0.7 0.3 0.4 0.4 1.1 0.4 2.1V18.9z"/></svg>',
    format_conditional: '<svg xmlns="http://www.w3.org/2000/svg" width="52" height="36" viewBox="0 0 52 36"><polygon points="38 5 0 5 0 31 26 31 26 30 1 30 1 6 37 6 37 10 38 10 "/><path d="M9 13H8.6L5 14.4v1.4l2-0.8V23h2V13z"/><path d="M17 22h-4l2.4-2.9c0.6-0.7 1-1.3 1.3-1.8 0.3-0.5 0.4-1.1 0.4-1.5 0-0.8-0.3-1.5-0.8-2 -0.5-0.5-1.2-0.7-2.2-0.7 -0.6 0-1.2 0.1-1.7 0.4s-0.9 0.6-1.1 1C11.1 14.9 11 16 11 16h1.6c0 0 0.1-0.9 0.4-1.3s0.7-0.4 1.2-0.4c0.4 0 0.8 0.2 1 0.5 0.3 0.3 0.4 0.7 0.4 1.1 0 0.4-0.1 0.7-0.3 1.1 -0.2 0.4-0.6 0.8-1.1 1.3L11 21.9V23h6V22z"/><path d="M21 19h0.8c0.6 0 1-0.1 1.3 0.2 0.3 0.3 0.4 0.6 0.4 1.1 0 0.5-0.1 0.8-0.4 1.1 -0.3 0.3-0.6 0.4-1.1 0.4 -0.5 0-0.8-0.3-1.1-0.5C20.6 20.9 20.5 21 20.5 20h-1.5c0 1 0.3 1.6 0.8 2.1s1.3 0.8 2.1 0.8c0.9 0 1.6-0.2 2.2-0.7 0.6-0.5 0.8-1.2 0.8-2.1 0-0.5-0.1-1-0.4-1.4 -0.3-0.4-0.6-0.7-1.1-0.9 0.4-0.2 0.7-0.5 1-0.9 0.3-0.4 0.4-0.8 0.4-1.2 0-0.9-0.3-1.5-0.8-2 -0.5-0.5-1.2-0.7-2.1-0.7 -0.5 0-1 0.1-1.5 0.3 -0.4 0.2-0.8 0.7-1 1.1S19.1 15 19.1 16h1.5c0-1 0.1-0.9 0.4-1.1 0.3-0.3 0.6-0.5 1-0.5 0.5 0 0.8 0.1 1 0.3s0.3 0.6 0.3 1.1c0 0.5-0.1 0.7-0.4 1C22.7 17 22.3 17 21.9 17H21V19z"/><path d="M47.8 7C50.1 7 52 8.9 52 11.2c0 1-0.3 1.8-0.8 2.5l-1.7 1.7L43.6 9.5l1.7-1.7C46 7.3 46.8 7 47.8 7zM30.7 22.4L29 30l7.6-1.7 11.6-11.6 -5.9-5.9L30.7 22.4zM42 17.9l-5.1 5.1 -0.9-0.9 5.1-5L42 17.9z"/></svg>',
    options: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="-17.5 774.5 36 36"><path fill="#555" d="M11.363 789.058l-.76-1.838a33.692 33.692 0 0 0 1.601-4.223l-2.327-2.328a31.444 31.444 0 0 0-4.142 1.691l-1.829-.76a32.88 32.88 0 0 0-1.83-4.101h-3.291a32.106 32.106 0 0 0-1.731 4.133l-1.83.76a33.556 33.556 0 0 0-4.206-1.609l-2.328 2.32a31.563 31.563 0 0 0 1.69 4.141l-.759 1.838a34.366 34.366 0 0 0-4.117 1.838v3.3a32.519 32.519 0 0 0 4.117 1.731l.759 1.829a33.633 33.633 0 0 0-1.608 4.223l2.327 2.328a32.986 32.986 0 0 0 4.133-1.699l1.83.76a31.481 31.481 0 0 0 1.862 4.108h3.291a32.194 32.194 0 0 0 1.732-4.133l1.837-.76a33.57 33.57 0 0 0 4.207 1.609l2.327-2.328a31.481 31.481 0 0 0-1.69-4.141l.76-1.838a32.532 32.532 0 0 0 4.108-1.829v-3.3a30.142 30.142 0 0 0-4.133-1.722zM.5 799.202a6.706 6.706 0 1 1 6.706-6.706A6.71 6.71 0 0 1 .5 799.202z"/></svg>',
    fields: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="-17.5 774.5 36 36"><g fill="#555"><path d="M11.351 787.279c1.112.367 2.027 1.221 2.55 2.221H13.5v-10.627c0-.744-.089-1.357-.825-1.373h-26.339c-.736.008-.836.612-.836 1.349v21.656c0 .735.093.995.836.995h10.836c-.008 0 .205-1.314.629-2.025-.073-.098-.123.025-.18.025H-12.5v-6h10.563l.83-1.699c.4-.76 1.606-1.258 1.606-1.667V785.5h10.843l.009 1.779zM-1.5 791.5h-11v-6h11v6z"/><path d="M15.805 801.444l-1.602-1.308c0-.237.082-.49.082-.817a2.483 2.483 0 0 0-.082-.817l1.602-1.389a.399.399 0 0 0 .082-.49l-1.528-2.86a.364.364 0 0 0-.278-.123.678.678 0 0 0-.18 0l-1.912.866a6.95 6.95 0 0 0-1.299-.817l-.311-1.989c-.017-.195-.188-.199-.384-.199H6.93c-.147 0-.384.037-.384.199l-.311 2.053c-.458.229-.899.468-1.299.786l-1.912-.834c-.041-.008-.09-.016-.131-.008a.356.356 0 0 0-.319.192l-1.528 2.817c-.082.164-.082.408.082.489l1.749 1.308c0 .237-.082.489-.082.816a2.48 2.48 0 0 0 .082.817l-1.602 1.356a.399.399 0 0 0-.082.49l1.528 2.86a.364.364 0 0 0 .278.123.678.678 0 0 0 .18 0l1.912-.817c.4.318.842.597 1.299.817l.311 2.116a.322.322 0 0 0 .221.4c.033.008.065.017.09.017h3.065c.147 0 .384-.164.384-.327l.311-2.215c.466-.212.907-.49 1.299-.817l1.831.817a.441.441 0 0 0 .54-.163l1.528-2.86c.056-.08-.018-.326-.165-.489zm-7.306.744a2.865 2.865 0 0 1-3.064-2.664c-.114-1.585 1.079-2.95 2.664-3.064a2.867 2.867 0 0 1 3.072 2.868 2.804 2.804 0 0 1-2.672 2.86z"/></g></svg>',
    fullscreen: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="-17.5 774.5 36 36"><g fill="#555"><path d="M-7.5 779.976V777.5h-7v7h3v-2.752l3.758 4.067 1.74-1.846-4.342-4.003 2.844.01zM-7.742 799.096l-3.758 4.101V800.5h-3v7h7v-2h-2.618l-.049-.371 4.124-4.054-1.699-1.979zM8.746 785.913l3.754-4.092v2.679h3v-7h-7v2h2.602l.082.381-4.126 4.041 1.688 1.991zM13.5 800.5v2.598l-.382.074-4.058-4.003-1.882 1.575 4.006 3.756H8.5v3h7v-7h-2zM-4 786.5h9c1.104 0 2.5.908 2.5 2.011v7.996c0 1.103-1.396 1.993-2.5 1.993h-9c-1.104 0-2.5-.891-2.5-1.993v-8.005c0-1.103 1.396-2.002 2.5-2.002z"/></g></svg>',
};
// HANDLERS
// Connect tab
WebDataRocksToolbar.prototype.connectLocalCSVHandler = function () {
    this.pivot.connectTo({ dataSourceType: "csv", browseForFile: true });
}
WebDataRocksToolbar.prototype.connectLocalJSONHandler = function () {
    this.pivot.connectTo({ dataSourceType: "json", browseForFile: true });
}
WebDataRocksToolbar.prototype.connectRemoteCSV = function () {
    this.showConnectToRemoteCSVDialog();
}
WebDataRocksToolbar.prototype.connectRemoteJSON = function () {
    this.showConnectToRemoteJSONDialog();
}
// Open tab
WebDataRocksToolbar.prototype.openLocalReport = function () {
    this.pivot.open();
}
WebDataRocksToolbar.prototype.openRemoteReport = function () {
    this.showOpenRemoteReportDialog();
}
// Save tab
WebDataRocksToolbar.prototype.saveHandler = function () {
    this.pivot.save("report.json", 'file');
}
// Format tab
WebDataRocksToolbar.prototype.formatCellsHandler = function () {
    this.showFormatCellsDialog();
}
WebDataRocksToolbar.prototype.conditionalFormattingHandler = function () {
    this.showConditionalFormattingDialog();
}
// Options tab
WebDataRocksToolbar.prototype.optionsHandler = function () {
    this.showOptionsDialog();
}
// Fields tab
WebDataRocksToolbar.prototype.fieldsHandler = function () {
    this.pivot.openFieldsList();
}
// Export tab
WebDataRocksToolbar.prototype.printHandler = function () {
    this.pivot.print();
}
WebDataRocksToolbar.prototype.exportHandler = function (type) {
    (type == "pdf") ? this.showExportPdfDialog() : this.pivot.exportTo(type);
}
// Fullscreen tab
WebDataRocksToolbar.prototype.fullscreenHandler = function () {
    this.toggleFullscreen();
}

// DIALOGS
WebDataRocksToolbar.prototype.defaults = {};
// Connect to remote CSV
WebDataRocksToolbar.prototype.showConnectToRemoteCSVDialog = function () {
    var self = this;
    var Labels = this.Labels;
    var applyHandler = function () {
        if (textInput.value.length > 0) {
            self.pivot.connectTo({ filename: textInput.value, dataSourceType: "csv" });
        }
    }
    var dialog = this.popupManager.createPopup();
    dialog.content.classList.add("wdr-popup-w500");
    dialog.setTitle(Labels.open_remote_csv);
    dialog.setToolbar([
        { id: "wdr-btn-open", label: Labels.open, handler: applyHandler, isPositive: true },
        { id: "wdr-btn-cancel", label: Labels.cancel }
    ]);

    var content = document.createElement("div");
    var textInput = document.createElement("input");
    textInput.id = "wdr-inp-file-url";
    textInput.type = "text";
    textInput.value = "https://cdn.webdatarocks.com/data/data.csv";
    content.appendChild(textInput);

    dialog.setContent(content);
    this.popupManager.addPopup(dialog.content);
}
// Connect to remote JSON
WebDataRocksToolbar.prototype.showConnectToRemoteJSONDialog = function () {
    var self = this;
    var Labels = this.Labels;
    var applyHandler = function () {
        if (textInput.value.length > 0) {
            self.pivot.connectTo({ filename: textInput.value, dataSourceType: "json" });
        }
    }
    var dialog = this.popupManager.createPopup();
    dialog.content.classList.add("wdr-popup-w500");
    dialog.setTitle(Labels.open_remote_json);
    dialog.setToolbar([
        { id: "wdr-btn-open", label: Labels.open, handler: applyHandler, isPositive: true },
        { id: "wdr-btn-cancel", label: Labels.cancel }
    ]);

    var content = document.createElement("div");
    var textInput = document.createElement("input");
    textInput.id = "wdr-inp-file-url";
    textInput.type = "text";
    textInput.value = "https://cdn.webdatarocks.com/data/data.json";
    content.appendChild(textInput);

    dialog.setContent(content);
    this.popupManager.addPopup(dialog.content);
}
// Open remote report
WebDataRocksToolbar.prototype.showOpenRemoteReportDialog = function () {
    var self = this;
    var Labels = this.Labels;
    var applyHandler = function () {
        if (textInput.value.length > 0) {
            self.pivot.load(textInput.value);
        }
    }
    var dialog = this.popupManager.createPopup();
    dialog.content.classList.add("wdr-popup-w500");
    dialog.setTitle(Labels.open_remote_report);
    dialog.setToolbar([
        { id: "wdr-btn-open", label: Labels.open, handler: applyHandler, isPositive: true },
        { id: "wdr-btn-cancel", label: Labels.cancel }
    ]);
    var content = document.createElement("div");
    var textInput = document.createElement("input");
    textInput.type = "text";
    var options = self.pivot.getOptions() || {};
    var isFlatTable = (options.grid && options.grid.type == "flat");
    textInput.value = isFlatTable ? "https://cdn.webdatarocks.com/reports/report-flat.json" : "https://cdn.webdatarocks.com/reports/report.json";
    content.appendChild(textInput);

    dialog.setContent(content);
    this.popupManager.addPopup(dialog.content);
}
// Format cells
WebDataRocksToolbar.prototype.showFormatCellsDialog = function () {
    var self = this;
    var Labels = this.Labels;
    function updateDropdowns() {
        textAlignDropDown.disabled = thousandsSepDropDown.disabled = decimalSepDropDown.disabled = decimalPlacesDropDown.disabled = currencySymbInput.disabled = currencyAlignDropDown.disabled = nullValueInput.disabled = isPercentDropdown.disabled = (valuesDropDown.value == "empty");
    }
    var valuesDropDownChangeHandler = function () {
        updateDropdowns();
        var formatVO = self.pivot.getFormat(valuesDropDown.value);
        textAlignDropDown.value = (formatVO.textAlign == "left" || formatVO.textAlign == "right") ? formatVO.textAlign : "right";
        thousandsSepDropDown.value = formatVO.thousandsSeparator;
        decimalSepDropDown.value = formatVO.decimalSeparator;
        decimalPlacesDropDown.value = formatVO.decimalPlaces;
        currencySymbInput.value = formatVO.currencySymbol;
        currencyAlignDropDown.value = formatVO.currencySymbolAlign;
        nullValueInput.value = formatVO.nullValue;
        isPercentDropdown.value = (formatVO.isPercent == true) ? true : false;
    }
    var applyHandler = function () {
        var formatVO = {};
        if (valuesDropDown.value == "") formatVO.name = "";

        formatVO.textAlign = textAlignDropDown.value;
        formatVO.thousandsSeparator = thousandsSepDropDown.value;
        formatVO.decimalSeparator = decimalSepDropDown.value;
        formatVO.decimalPlaces = decimalPlacesDropDown.value;
        formatVO.currencySymbol = currencySymbInput.value;
        formatVO.currencySymbolAlign = currencyAlignDropDown.value;
        formatVO.nullValue = nullValueInput.value;
        formatVO.isPercent = isPercentDropdown.value == "true" ? true : false;
        self.pivot.setFormat(formatVO, (valuesDropDown.value == "" ? null : valuesDropDown.value));
        self.pivot.refresh();
    }

    var dialog = this.popupManager.createPopup();
    dialog.content.id = "wdr-popup-format-cells";
    dialog.setTitle(this.osUtils.isMobile ? Labels.format : Labels.format_cells);
    dialog.setToolbar([
        { id: "wdr-btn-apply", label: Labels.apply, handler: applyHandler, isPositive: true },
        { id: "wdr-btn-cancel", label: Labels.cancel }
    ], true);

    var content = document.createElement("div");
    var group = document.createElement("div");
    group.classList.add("wdr-inp-group");
    content.appendChild(group);

    var row = document.createElement("div");
    row.classList.add("wdr-inp-row");
    row.classList.add("wdr-ir-horizontal");
    group.appendChild(row);

    // measures
    var label = document.createElement("label");
    label.classList.add("wdr-uc");
    self.setText(label, Labels.choose_value);
    row.appendChild(label);
    var select = self.createSelect();
    var valuesDropDown = select.select;
    valuesDropDown.onchange = valuesDropDownChangeHandler;
    valuesDropDown.options[0] = new Option(Labels.choose_value, "empty");
    valuesDropDown.options[0].disabled = true;
    valuesDropDown.options[1] = new Option(Labels.all_values, "");
    row.appendChild(select);

    var row = document.createElement("div");
    row.classList.add("wdr-inp-row");
    row.classList.add("wdr-ir-horizontal");
    group.appendChild(row);

    var group = document.createElement("div");
    group.classList.add("wdr-inp-group");
    content.appendChild(group);

    // text align
    var row = document.createElement("div");
    row.classList.add("wdr-inp-row");
    row.classList.add("wdr-ir-horizontal");
    group.appendChild(row);
    var label = document.createElement("label");
    self.setText(label, Labels.text_align);
    row.appendChild(label);
    var select = self.createSelect();
    var textAlignDropDown = select.select;
    textAlignDropDown.options[0] = new Option(Labels.align_left, "left");
    textAlignDropDown.options[1] = new Option(Labels.align_right, "right");
    row.appendChild(select);

    // thousand_separator
    var row = document.createElement("div");
    row.classList.add("wdr-inp-row");
    row.classList.add("wdr-ir-horizontal");
    group.appendChild(row);
    var label = document.createElement("label");
    self.setText(label, Labels.thousand_separator);
    row.appendChild(label);
    var select = self.createSelect();
    var thousandsSepDropDown = select.select;
    thousandsSepDropDown.options[0] = new Option(Labels.none, "");
    thousandsSepDropDown.options[1] = new Option(Labels.space, " ");
    thousandsSepDropDown.options[2] = new Option(",", ",");
    thousandsSepDropDown.options[3] = new Option(".", ".");
    row.appendChild(select);

    // decimal_separator
    var row = document.createElement("div");
    row.classList.add("wdr-inp-row");
    row.classList.add("wdr-ir-horizontal");
    group.appendChild(row);
    var label = document.createElement("label");
    self.setText(label, Labels.decimal_separator);
    row.appendChild(label);
    var select = self.createSelect();
    var decimalSepDropDown = select.select;
    decimalSepDropDown.options[0] = new Option(".", ".");
    decimalSepDropDown.options[1] = new Option(",", ",");
    row.appendChild(select);

    // decimal_places
    var row = document.createElement("div");
    row.classList.add("wdr-inp-row");
    row.classList.add("wdr-ir-horizontal");
    group.appendChild(row);
    var label = document.createElement("label");
    self.setText(label, Labels.decimal_places);
    row.appendChild(label);
    var select = self.createSelect();
    var decimalPlacesDropDown = select.select;
    for (var i = 0; i < 11; i++) {
        decimalPlacesDropDown.options[i] = new Option(i === 0 ? Labels.none : (i - 1), i - 1);
    }
    row.appendChild(select);

    // currency_symbol
    var row = document.createElement("div");
    row.classList.add("wdr-inp-row");
    row.classList.add("wdr-ir-horizontal");
    group.appendChild(row);
    var label = document.createElement("label");
    self.setText(label, Labels.currency_symbol);
    row.appendChild(label);
    var currencySymbInput = document.createElement("input");
    currencySymbInput.classList.add("wdr-inp");
    currencySymbInput.type = "text";
    row.appendChild(currencySymbInput);

    // currency_align
    var row = document.createElement("div");
    row.classList.add("wdr-inp-row");
    row.classList.add("wdr-ir-horizontal");
    group.appendChild(row);
    var label = document.createElement("label");
    self.setText(label, Labels.currency_align);
    row.appendChild(label);
    var select = self.createSelect();
    var currencyAlignDropDown = select.select;
    currencyAlignDropDown.options[0] = new Option(Labels.align_left, "left");
    currencyAlignDropDown.options[1] = new Option(Labels.align_right, "right");
    row.appendChild(select);

    // null_value
    var row = document.createElement("div");
    row.classList.add("wdr-inp-row");
    row.classList.add("wdr-ir-horizontal");
    group.appendChild(row);
    var label = document.createElement("label");
    self.setText(label, Labels.null_value);
    row.appendChild(label);
    var nullValueInput = document.createElement("input");
    nullValueInput.classList.add("wdr-inp");
    nullValueInput.type = "text";
    row.appendChild(nullValueInput);

    // is_percent
    var row = document.createElement("div");
    row.classList.add("wdr-inp-row");
    row.classList.add("wdr-ir-horizontal");
    group.appendChild(row);
    var label = document.createElement("label");
    self.setText(label, Labels.is_percent);
    row.appendChild(label);
    var select = self.createSelect();
    var isPercentDropdown = select.select;
    isPercentDropdown.options[0] = new Option(Labels.true_value, true);
    isPercentDropdown.options[1] = new Option(Labels.false_value, false);
    row.appendChild(select);

    dialog.setContent(content);
    this.popupManager.addPopup(dialog.content);

    var measures = self.pivot.getMeasures();
    for (var i = 0; i < measures.length; i++) {
        valuesDropDown.options[i + 2] = new Option(measures[i].caption, measures[i].uniqueName);
    }
    valuesDropDownChangeHandler();
}
// Conditional formatting
WebDataRocksToolbar.prototype.showConditionalFormattingDialog = function () {
    var self = this;
    var Labels = this.Labels;
    var conditions = this.pivot.getAllConditions();
    var applyHandler = function () {
        self.pivot.removeAllConditions();
        for (var i = 0; i < conditions.length; i++) {
            var formula = composeFormula(conditions[i].sign, conditions[i].value1, conditions[i].value2);
            if (formula == null) return;
            conditions[i].formula = formula;
            self.pivot.addCondition(conditions[i]);
        }
        self.pivot.refresh();
    };
    var onAddConditionBtnClick = function () {
        var condition = {
            sign: "<",
            value1: "0",
            measures: self.pivot.getMeasures(),
            format: { fontFamily: 'Arial', fontSize: '12px', color: '#000000', backgroundColor: '#FFFFFF' }
        };
        conditions.push(condition);
        content.appendChild(self.createConditionalFormattingItem(condition, conditions));
        self.popupManager.centerPopup(dialog.content);
    };
    var composeFormula = function (sign, value1, value2) {
        var formula = '';
        var firstValueEmpty = (value1 == null || value1.length == 0);
        var secondValueEmpty = (value2 == null || value2.length == 0);
        var isBetween = (sign === '><');
        var isEmpty = (sign === 'isNaN');
        if ((firstValueEmpty && !isEmpty) || (isBetween && secondValueEmpty)) {
            return formula;
        }
        if (isBetween && !secondValueEmpty) {
            formula = "AND(#value > " + value1 + ", #value < " + value2 + ")";
        } else if (isEmpty) {
            formula = "isNaN(#value)";
        } else {
            var isString = isNaN(parseFloat(value1));
            if (isString) {
                value1 = "'" + value1 + "'";
            }
            formula = "#value " + sign + " " + value1;
        }
        return formula;
    };
    var parseStrings = function (input) {
        var output = [];
        var openQuote = false;
        var str = "";
        for (var i = 0; i < input.length; i++) {
            if (input[i] == '"' || input[i] == "'") {
                if (openQuote) {
                    output.push(str);
                } else {
                    str = "";
                }
                openQuote = !openQuote;
                continue;
            }
            if (openQuote) {
                str += input[i];
            }
        }
        return output;
    };
    var parseFormula = function (formula) {
        var parseNumber = /\W\d+\.*\d*/g;
        var parseSign = /<=|>=|<|>|=|=|!=|isNaN/g;
        var numbers = formula.match(parseNumber);
        var strings = parseStrings(formula);
        var signs = formula.match(parseSign);
        if (numbers == null && strings == null) return {};
        return {
            value1: (numbers != null) ? numbers[0].replace(/\s/, '') : strings[0],
            value2: (numbers != null && numbers.length > 1) ? numbers[1].replace(/\s/, '') : '',
            sign: signs ? signs.join('') : ""
        };
    };
    var dialog = this.popupManager.createPopup();
    dialog.content.id = "wdr-popup-conditional";
    dialog.setTitle(this.osUtils.isMobile ? Labels.conditional : Labels.conditional_formatting);
    dialog.setToolbar([
        { id: "wdr-btn-apply", label: Labels.apply, handler: applyHandler, isPositive: true },
        { id: "wdr-btn-cancel", label: Labels.cancel }
    ], true);

    var addConditionBtn = document.createElement("a");
    addConditionBtn.id = "wdr-add-btn";
    addConditionBtn.setAttribute("href", "javascript:void(0)");
    addConditionBtn.classList.add("wdr-ui-btn");
    addConditionBtn.classList.add("wdr-ui-btn-light");
    addConditionBtn.classList.add("wdr-button-add");
    addConditionBtn.onclick = onAddConditionBtnClick;
    addConditionBtn.setAttribute("title", Labels.add_condition);
    var icon = document.createElement("span");
    icon.classList.add("wdr-icon");
    icon.classList.add("wdr-icon-act_add");
    addConditionBtn.appendChild(icon);
    dialog.toolbar.insertBefore(addConditionBtn, dialog.toolbar.firstChild);

    var content = document.createElement("div");
    content.classList.add("wdr-popup-content");
    content.onclick = function (event) {
        if (event.target.classList.contains("wdr-cr-delete")) {
            self.popupManager.centerPopup(dialog.content);
        }
    }

    for (var i = 0; i < conditions.length; i++) {
        var formula = parseFormula(conditions[i].formula);
        conditions[i].value1 = formula.value1;
        conditions[i].value2 = formula.value2;
        conditions[i].sign = formula.sign;
        conditions[i].measures = self.pivot.getMeasures();
        content.appendChild(self.createConditionalFormattingItem(conditions[i], conditions));
    }
    dialog.setContent(content);
    this.popupManager.addPopup(dialog.content);
};
WebDataRocksToolbar.prototype.defaults.fontSizes = ["8px", "9px", "10px", "11px", "12px", "13px", "14px"],
    WebDataRocksToolbar.prototype.defaults.fonts = ['Arial', 'Lucida Sans Unicode', 'Verdana', 'Courier New', 'Palatino Linotype', 'Tahoma', 'Impact', 'Trebuchet MS', 'Georgia', 'Times New Roman'],
    WebDataRocksToolbar.prototype.defaults.conditions = [
        { label: "less_than", sign: '<' },
        { label: "less_than_or_equal", sign: '<=' },
        { label: "greater_than", sign: '>' },
        { label: "greater_than_or_equal", sign: '>=' },
        { label: "equal_to", sign: '=' },
        { label: "not_equal_to", sign: '!=' },
        { label: "between", sign: '><' },
        { label: "is_empty", sign: 'isNaN' }
    ];
WebDataRocksToolbar.prototype.createConditionalFormattingItem = function (data, allConditions) {
    var self = this;
    var Labels = this.Labels;
    var fillValuesDropDown = function (measures, selectedMeasure) {
        valuesDropDown[0] = new Option(Labels.all_values, "");
        var options = self.pivot.getOptions() || {};
        var isFlatTable = (options.grid && options.grid.type == "flat");
        for (var i = 0; i < measures.length; i++) {
            if (isFlatTable && measures[i].type == 7) { // count measure
                continue;
            }
            valuesDropDown[valuesDropDown.options.length] = new Option(measures[i].caption, measures[i].uniqueName);
        }
        if (selectedMeasure != null) {
            valuesDropDown.value = selectedMeasure;
        } else {
            valuesDropDown.selectedIndex = 0;
        }
    };
    var fillConditionsDropDown = function (selectedCondition) {
        for (var i = 0; i < self.defaults.conditions.length; i++) {
            conditionsDropDown[i] = new Option(Labels[self.defaults.conditions[i].label], self.defaults.conditions[i].sign);
        }
        if (selectedCondition != null) {
            conditionsDropDown.value = selectedCondition;
        } else {
            conditionsDropDown.selectedIndex = 0;
        }
    };
    var fillFontFamiliesDropDown = function (selectedFont) {
        for (var i = 0; i < self.defaults.fonts.length; i++) {
            fontFamiliesDropDown[i] = new Option(self.defaults.fonts[i], self.defaults.fonts[i]);
        }
        fontFamiliesDropDown.value = (selectedFont == null ? 'Arial' : selectedFont);
    };
    var fillFontSizesDropDown = function (selectedFontSize) {
        for (var i = 0; i < self.defaults.fontSizes.length; i++) {
            fontSizesDropDown[i] = new Option(self.defaults.fontSizes[i], self.defaults.fontSizes[i]);
        }
        fontSizesDropDown.value = (selectedFontSize == null ? "12px" : selectedFontSize);
    };
    var onValueChanged = function () {
        data.measure = valuesDropDown.value;
    };
    var onFontFamilyChanged = function () {
        if (data.format != null) {
            data.format.fontFamily = fontFamiliesDropDown.value;
            drawSample();
        }
    };
    var onFontSizeChanged = function () {
        if (data.format != null) {
            data.format.fontSize = fontSizesDropDown.value;
            drawSample();
        }
    };
    var onConditionChanged = function () {
        data.sign = conditionsDropDown.value;
        if (('sign' in data) && data.sign === '><') {
            data.value2 = 0;
        } else if (('sign' in data) && data.sign === 'isNaN') {
            delete data.value1;
            delete data.value2;
        } else {
            delete data.value2;
        }
        drawInputs();
    };
    var onInput1Changed = function () {
        data.value1 = (input1.value.length == 0) ? "0" : input1.value;
    };
    var onInput2Changed = function () {
        data.value2 = (input2.value.length == 0) ? "0" : input2.value;
    };
    var onRemoveBtnClick = function () {
        var idx = allConditions.indexOf(data);
        if (idx > -1) {
            allConditions.splice(idx, 1);
        }
        output.parentNode.removeChild(output);
    };
    var onColorChanged = function () {
        if (data.format != null) {
            sample.style.color = colorPicker.fontColor || '#000';
            sample.style.backgroundColor = colorPicker.backgroundColor || '#fff';
        }
    };
    var onColorApply = function () {
        if (data.format != null) {
            data.format.color = colorPicker.fontColor;
            data.format.backgroundColor = colorPicker.backgroundColor;
            drawSample();
        }
    };
    var onColorCancel = function () {
        if (data.format != null) {
            colorPicker.setColor(data.format.hasOwnProperty('backgroundColor') ? data.format.backgroundColor : '0xFFFFFF', "bg");
            colorPicker.setColor(data.format.hasOwnProperty('color') ? data.format.color : '0x000000', "font");
        }
        drawSample();
    }
    var drawInputs = function () {
        if (('sign' in data) && data.sign === '><') {
            input1.classList.remove("wdr-width120");
            input1.classList.add("wdr-width50");
            input1.style.display = "inline-block";
            input2.value = ('value2' in data ? data.value2 : "0");
            input2.style.display = "inline-block";
            andLabel.style.display = "inline-block";
        } else if (('sign' in data) && data.sign === 'isNaN') {
            input1.style.display = "none";
            input2.style.display = "none";
            andLabel.style.display = "none";
        } else {
            input1.classList.add("wdr-width120");
            input1.classList.remove("wdr-width50");
            input1.style.display = "inline-block";
            input2.style.display = "none";
            andLabel.style.display = "none";
        }
    };
    var drawSample = function () {
        var format = data.format;
        if (format != null) {
            sample.style.backgroundColor = format.backgroundColor || '#fff';
            sample.style.color = format.color || '#000';
            sample.style.fontFamily = format.fontFamily || 'Arial';
            sample.style.fontSize = format.fontSize || '12px';
        }
    };

    var output = document.createElement("div");
    output.classList.add("wdr-condition-row");

    var itemRenderer = document.createElement("div");
    itemRenderer.classList.add("wdr-wrap-relative");
    output.appendChild(itemRenderer);

    var removeBtn = document.createElement("span");
    removeBtn.classList.add("wdr-cr-delete");
    removeBtn.classList.add("wdr-icon");
    removeBtn.classList.add("wdr-icon-act_trash");
    removeBtn.onclick = onRemoveBtnClick;
    itemRenderer.appendChild(removeBtn);

    var row = document.createElement("div");
    row.classList.add("wdr-cr-inner");
    itemRenderer.appendChild(row);

    var label = document.createElement("div");
    label.classList.add("wdr-cr-lbl");
    label.classList.add("wdr-width50");
    self.setText(label, Labels.value + ":");
    row.appendChild(label);

    var select = self.createSelect();
    select.id = "wdr-values";
    var valuesDropDown = select.select;
    if ('measures' in data) {
        fillValuesDropDown(data.measures, data.measure);
        valuesDropDown.disabled = (data.measures.length === 0);
    } else {
        valuesDropDown.disabled = true;
    }
    valuesDropDown.onchange = onValueChanged;
    row.appendChild(select);

    var select = self.createSelect();
    select.id = "wdr-conditions";
    var conditionsDropDown = select.select;
    fillConditionsDropDown(!('sign' in data) ? null : data.sign);
    conditionsDropDown.onchange = onConditionChanged;
    row.appendChild(select);

    var input1 = document.createElement("input");
    input1.classList.add("wdr-number-inp");
    input1.classList.add("wdr-width50");
    input1.type = "number";
    input1.value = ('value1' in data ? data.value1 : "0");
    input1.onchange = onInput1Changed;
    row.appendChild(input1);

    var andLabel = document.createElement("span");
    andLabel.id = "wdr-and-label";
    andLabel.classList.add("wdr-width20");
    self.setText(andLabel, Labels.and_symbole);
    row.appendChild(andLabel);

    var input2 = document.createElement("input");
    input2.classList.add("wdr-number-inp");
    input2.classList.add("wdr-width50");
    input2.type = "number";
    input2.value = ('value2' in data ? data.value2 : "0");
    input2.onchange = onInput2Changed;
    row.appendChild(input2);

    drawInputs();

    var row = document.createElement("div");
    row.classList.add("wdr-cr-inner");
    itemRenderer.appendChild(row);

    var label = document.createElement("div");
    label.classList.add("wdr-cr-lbl");
    label.classList.add("wdr-width50");
    self.setText(label, Labels.format + ":");
    row.appendChild(label);

    var select = self.createSelect();
    select.id = "wdr-font-family";
    var fontFamiliesDropDown = select.select;
    fillFontFamiliesDropDown((data.hasOwnProperty('format')) && (data.format.hasOwnProperty('fontFamily')) ? data.format.fontFamily : null);
    fontFamiliesDropDown.onchange = onFontFamilyChanged;
    row.appendChild(select);

    var select = self.createSelect();
    select.id = "wdr-font-size";
    var fontSizesDropDown = select.select;
    fillFontSizesDropDown((data.hasOwnProperty('format')) && (data.format.hasOwnProperty('fontSize')) ? data.format.fontSize : null);
    fontSizesDropDown.onchange = onFontSizeChanged;
    row.appendChild(select);

    var colorPicker = new WebDataRocksToolbar.ColorPicker(this, output);
    colorPicker.setColor((data.hasOwnProperty('format')) && (data.format.hasOwnProperty('backgroundColor')) ? data.format.backgroundColor : '0xFFFFFF', "bg");
    colorPicker.setColor((data.hasOwnProperty('format')) && (data.format.hasOwnProperty('color')) ? data.format.color : '0x000000', "font");
    colorPicker.changeHandler = onColorChanged;
    colorPicker.applyHandler = onColorApply;
    colorPicker.cancelHandler = onColorCancel;
    row.appendChild(colorPicker.element);

    var sample = document.createElement("input");
    sample.id = "wdr-sample";
    sample.classList.add("wdr-inp");
    sample.type = "number";
    sample.value = "73.93";
    sample.style.pointerEvents = "none";
    row.appendChild(sample);
    drawSample();

    return output;
};
// Options
WebDataRocksToolbar.prototype.showOptionsDialog = function () {
    var self = this;
    var Labels = this.Labels;
    var applyHandler = function () {
        var showGrandTotals;
        if (offRowsColsCbx.checked) {
            showGrandTotals = "off";
        } else if (onRowsColsCbx.checked) {
            showGrandTotals = "on";
        } else if (onRowsCbx.checked) {
            showGrandTotals = "rows";
        } else if (onColsCbx.checked) {
            showGrandTotals = "columns";
        }
        var showTotals;
        if (offSubtotalsCbx.checked) {
            showTotals = "off";
        } else if (onSubtotalsCbx.checked) {
            showTotals = "on";
        } else if (rowsSubtotalsCbx.checked) {
            showTotals = "rows";
        } else if (colsSubtotalsCbx.checked) {
            showTotals = "columns";
        }
        var gridType = "compact";
        if (classicViewCbx && classicViewCbx.checked) {
            gridType = "classic";
        } else if (flatViewCbx && flatViewCbx.checked) {
            gridType = "flat";
        }

        var options = self.pivot.getOptions();
        var currentViewType = options["viewType"];
        var currentType = options["grid"]["type"];

        var options = {
            grid: {
                showGrandTotals: showGrandTotals,
                showTotals: showTotals,
                type: gridType
            }
        };

        self.pivot.setOptions(options);
        self.pivot.refresh();
    }
    var dialog = this.popupManager.createPopup();
    dialog.content.id = "wdr-popup-options";
    dialog.setTitle(this.osUtils.isMobile ? Labels.options : Labels.layout_options);
    dialog.setToolbar([
        { id: "wdr-btn-apply", label: Labels.apply, handler: applyHandler, isPositive: true },
        { id: "wdr-btn-cancel", label: Labels.cancel }
    ], true);

    var content = document.createElement("div");
    content.classList.add("wdr-popup-content");

    var row = document.createElement("div");
    row.classList.add("wdr-ui-row");
    content.appendChild(row);

    var col = document.createElement("div");
    col.classList.add("wdr-ui-col-2");
    row.appendChild(col);

    // grand totals
    var title = document.createElement("div");
    title.classList.add("wdr-title-2");
    self.setText(title, Labels.grand_totals);
    col.appendChild(title);

    var grandTotalsGroup = "wdr-grand-totals-" + Date.now();
    var list = document.createElement("ul");
    list.classList.add("wdr-radiobtn-list");
    col.appendChild(list);

    // grand totals - off
    var item = document.createElement("li");
    var itemWrap = document.createElement("div");
    itemWrap.classList.add("wdr-radio-wrap");
    var offRowsColsCbx = document.createElement("input");
    offRowsColsCbx.type = "radio";
    offRowsColsCbx.name = grandTotalsGroup;
    offRowsColsCbx.id = "wdr-gt-1";
    offRowsColsCbx.value = "off";
    itemWrap.appendChild(offRowsColsCbx);
    var label = document.createElement("label");
    label.setAttribute("for", "wdr-gt-1");
    self.setText(label, Labels.grand_totals_off);
    itemWrap.appendChild(label);
    item.appendChild(itemWrap);
    list.appendChild(item);

    // grand totals - on
    var item = document.createElement("li");
    var itemWrap = document.createElement("div");
    itemWrap.classList.add("wdr-radio-wrap");
    var onRowsColsCbx = document.createElement("input");
    onRowsColsCbx.type = "radio";
    onRowsColsCbx.name = grandTotalsGroup;
    onRowsColsCbx.id = "wdr-gt-2";
    onRowsColsCbx.value = "on";
    itemWrap.appendChild(onRowsColsCbx);
    var label = document.createElement("label");
    label.setAttribute("for", "wdr-gt-2");
    self.setText(label, Labels.grand_totals_on);
    itemWrap.appendChild(label);
    item.appendChild(itemWrap);
    list.appendChild(item);

    // grand totals - on rows
    var item = document.createElement("li");
    var itemWrap = document.createElement("div");
    itemWrap.classList.add("wdr-radio-wrap");
    var onRowsCbx = document.createElement("input");
    onRowsCbx.type = "radio";
    onRowsCbx.name = grandTotalsGroup;
    onRowsCbx.id = "wdr-gt-3";
    onRowsCbx.value = "rows";
    itemWrap.appendChild(onRowsCbx);
    var label = document.createElement("label");
    label.setAttribute("for", "wdr-gt-3");
    self.setText(label, Labels.grand_totals_on_rows);
    itemWrap.appendChild(label);
    item.appendChild(itemWrap);
    list.appendChild(item);

    // grand totals - on cols
    var item = document.createElement("li");
    var itemWrap = document.createElement("div");
    itemWrap.classList.add("wdr-radio-wrap");
    var onColsCbx = document.createElement("input");
    onColsCbx.type = "radio";
    onColsCbx.name = grandTotalsGroup;
    onColsCbx.id = "wdr-gt-4";
    onColsCbx.value = "rows";
    itemWrap.appendChild(onColsCbx);
    var label = document.createElement("label");
    label.setAttribute("for", "wdr-gt-4");
    self.setText(label, Labels.grand_totals_on_columns);
    itemWrap.appendChild(label);
    item.appendChild(itemWrap);
    list.appendChild(item);

    // layout
    var title = document.createElement("div");
    title.classList.add("wdr-title-2");
    self.setText(title, Labels.layout);
    col.appendChild(title);

    var layoutGroup = "wdr-layout-" + Date.now();
    var list = document.createElement("ul");
    list.classList.add("wdr-radiobtn-list");
    col.appendChild(list);

    // layout - compact
    var item = document.createElement("li");
    var itemWrap = document.createElement("div");
    itemWrap.classList.add("wdr-radio-wrap");
    var compactViewCbx = document.createElement("input");
    compactViewCbx.type = "radio";
    compactViewCbx.name = layoutGroup;
    compactViewCbx.id = "wdr-lt-1";
    compactViewCbx.value = "compact";
    itemWrap.appendChild(compactViewCbx);
    var label = document.createElement("label");
    label.setAttribute("for", "wdr-lt-1");
    self.setText(label, Labels.compact_view);
    itemWrap.appendChild(label);
    item.appendChild(itemWrap);
    list.appendChild(item);

    // layout - classic
    var item = document.createElement("li");
    var itemWrap = document.createElement("div");
    itemWrap.classList.add("wdr-radio-wrap");
    var classicViewCbx = document.createElement("input");
    classicViewCbx.type = "radio";
    classicViewCbx.name = layoutGroup;
    classicViewCbx.id = "wdr-lt-2";
    classicViewCbx.value = "classic";
    itemWrap.appendChild(classicViewCbx);
    var label = document.createElement("label");
    label.setAttribute("for", "wdr-lt-2");
    self.setText(label, Labels.classic_view);
    itemWrap.appendChild(label);
    item.appendChild(itemWrap);
    list.appendChild(item);

    var options = self.pivot.getReport({ withDefaults: true, withGlobals: true });

        // layout - flat
        var item = document.createElement("li");
        var itemWrap = document.createElement("div");
        itemWrap.classList.add("wdr-radio-wrap");
        var flatViewCbx = document.createElement("input");
        flatViewCbx.type = "radio";
        flatViewCbx.name = layoutGroup;
        flatViewCbx.id = "wdr-lt-3";
        flatViewCbx.value = "flat";
        itemWrap.appendChild(flatViewCbx);
        var label = document.createElement("label");
        label.setAttribute("for", "wdr-lt-3");
        self.setText(label, Labels.flat_view);
        itemWrap.appendChild(label);
        item.appendChild(itemWrap);
        list.appendChild(item);

    var col = document.createElement("div");
    col.classList.add("wdr-ui-col-2");
    row.appendChild(col);

    // subtotals
    var title = document.createElement("div");
    title.classList.add("wdr-title-2");
    self.setText(title, Labels.subtotals);
    col.appendChild(title);

    var subTotalsGroup = "wdr-subtotals-" + Date.now();
    var list = document.createElement("ul");
    list.classList.add("wdr-radiobtn-list");
    col.appendChild(list);

    // subtotals - off
    var item = document.createElement("li");
    var itemWrap = document.createElement("div");
    itemWrap.classList.add("wdr-radio-wrap");
    var offSubtotalsCbx = document.createElement("input");
    offSubtotalsCbx.type = "radio";
    offSubtotalsCbx.name = subTotalsGroup;
    offSubtotalsCbx.id = "wdr-st-1";
    offSubtotalsCbx.value = "off";
    itemWrap.appendChild(offSubtotalsCbx);
    var label = document.createElement("label");
    label.setAttribute("for", "wdr-st-1");
    self.setText(label, Labels.subtotals_off);
    itemWrap.appendChild(label);
    item.appendChild(itemWrap);
    list.appendChild(item);

    // subtotals - on
    var item = document.createElement("li");
    var itemWrap = document.createElement("div");
    itemWrap.classList.add("wdr-radio-wrap");
    var onSubtotalsCbx = document.createElement("input");
    onSubtotalsCbx.type = "radio";
    onSubtotalsCbx.name = subTotalsGroup;
    onSubtotalsCbx.id = "wdr-st-2";
    onSubtotalsCbx.value = "on";
    itemWrap.appendChild(onSubtotalsCbx);
    var label = document.createElement("label");
    label.setAttribute("for", "wdr-st-2");
    self.setText(label, Labels.subtotals_on);
    itemWrap.appendChild(label);
    item.appendChild(itemWrap);
    list.appendChild(item);

    // subtotals - rows
    var item = document.createElement("li");
    var itemWrap = document.createElement("div");
    itemWrap.classList.add("wdr-radio-wrap");
    var rowsSubtotalsCbx = document.createElement("input");
    rowsSubtotalsCbx.type = "radio";
    rowsSubtotalsCbx.name = subTotalsGroup;
    rowsSubtotalsCbx.id = "wdr-st-3";
    rowsSubtotalsCbx.value = "rows";
    itemWrap.appendChild(rowsSubtotalsCbx);
    var label = document.createElement("label");
    label.setAttribute("for", "wdr-st-3");
    self.setText(label, Labels.subtotals_on_rows);
    itemWrap.appendChild(label);
    item.appendChild(itemWrap);
    list.appendChild(item);

    // subtotals - columns
    var item = document.createElement("li");
    var itemWrap = document.createElement("div");
    itemWrap.classList.add("wdr-radio-wrap");
    var colsSubtotalsCbx = document.createElement("input");
    colsSubtotalsCbx.type = "radio";
    colsSubtotalsCbx.name = subTotalsGroup;
    colsSubtotalsCbx.id = "wdr-st-4";
    colsSubtotalsCbx.value = "columns";
    itemWrap.appendChild(colsSubtotalsCbx);
    var label = document.createElement("label");
    label.setAttribute("for", "wdr-st-4");
    self.setText(label, Labels.subtotals_on_columns);
    itemWrap.appendChild(label);
    item.appendChild(itemWrap);
    list.appendChild(item);
	
    dialog.setContent(content);
    this.popupManager.addPopup(dialog.content);

    var options = self.pivot.getOptions() || {};
    var optionsGrid = options.grid || {};

    if (optionsGrid.showGrandTotals == "off" || optionsGrid.showGrandTotals == false) {
        offRowsColsCbx.checked = true;
    } else if (optionsGrid.showGrandTotals == "on" || optionsGrid.showGrandTotals == true) {
        onRowsColsCbx.checked = true;
    } else if (optionsGrid.showGrandTotals == "rows") {
        onRowsCbx.checked = true;
    } else if (optionsGrid.showGrandTotals == "columns") {
        onColsCbx.checked = true;
    }

    if (optionsGrid.showTotals == "off") {
        offSubtotalsCbx.checked = true;
    } else if (optionsGrid.showTotals == "on") {
        onSubtotalsCbx.checked = true;
    } else if (optionsGrid.showTotals == "rows") {
        rowsSubtotalsCbx.checked = true;
    } else if (optionsGrid.showTotals == "columns") {
        colsSubtotalsCbx.checked = true;
    }

    if (optionsGrid.type == "flat" && flatViewCbx) {
        flatViewCbx.checked = true;
    } else if (optionsGrid.type == "classic" && classicViewCbx) {
        classicViewCbx.checked = true;
    } else if (compactViewCbx) {
        compactViewCbx.checked = true;
    }
}
// Export to PDF
WebDataRocksToolbar.prototype.showExportPdfDialog = function () {
    var self = this;
    var Labels = this.Labels;
    var applyHandler = function () {
        var orientation = "portrait";
        if (landscapeRadio.checked) {
            orientation = "landscape";
        }
        self.pivot.exportTo('pdf', { pageOrientation: orientation });
    }
    var dialog = this.popupManager.createPopup();
    dialog.setTitle(Labels.choose_page_orientation);
    dialog.setToolbar([
        { id: "wdr-btn-apply", label: Labels.apply, handler: applyHandler, isPositive: true },
        { id: "wdr-btn-cancel", label: Labels.cancel }
    ]);

    var content = document.createElement("div");

    var list = document.createElement("ul");
    list.classList.add("wdr-radiobtn-list");
    content.appendChild(list);

    // portrait
    var item = document.createElement("li");
    list.appendChild(item);
    var wrap = document.createElement("div");
    wrap.classList.add("wdr-radio-wrap");
    item.appendChild(wrap);

    var portraitRadio = document.createElement("input");
    portraitRadio.id = "wdr-portrait-radio";
    portraitRadio.type = "radio";
    portraitRadio.name = "wdr-pdf-orientation";
    portraitRadio.checked = true;
    wrap.appendChild(portraitRadio);

    var label = document.createElement("label");
    label.setAttribute("for", "wdr-portrait-radio");
    self.setText(label, Labels.portrait);
    wrap.appendChild(label);

    // landscape
    var item = document.createElement("li");
    list.appendChild(item);
    var wrap = document.createElement("div");
    wrap.classList.add("wdr-radio-wrap");
    item.appendChild(wrap);

    var landscapeRadio = document.createElement("input");
    landscapeRadio.id = "wdr-landscape-radio";
    landscapeRadio.type = "radio";
    landscapeRadio.name = "wdr-pdf-orientation";
    wrap.appendChild(landscapeRadio);

    var label = document.createElement("label");
    label.setAttribute("for", "wdr-landscape-radio");
    self.setText(label, Labels.landscape);
    wrap.appendChild(label);

    dialog.setContent(content);
    this.popupManager.addPopup(dialog.content);
}

// Fullscreen
WebDataRocksToolbar.prototype.toggleFullscreen = function () {
    this.isFullscreen() ? this.exitFullscreen() : this.enterFullscreen(this.container);
}
WebDataRocksToolbar.prototype.isFullscreen = function () {
    return document.fullScreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
}
WebDataRocksToolbar.prototype.enterFullscreen = function (element) {
    if (element.requestFullscreen || element.webkitRequestFullScreen
        || element.mozRequestFullScreen || (element.msRequestFullscreen && window == top)) {
        this.containerStyle = {
            width: this.container.style.width,
            height: this.container.style.height,
            position: this.container.style.position,
            top: this.container.style.top,
            bottom: this.container.style.bottom,
            left: this.container.style.left,
            right: this.container.style.right,
            marginTop: this.container.style.marginTop,
            marginLeft: this.container.style.left,
            toolbarWidth: this.toolbarWrapper.style.width
        };
        this.container.style.width = "100%";
        this.container.style.height = "100%";
        this.container.style.position = "fixed";
        this.container.style.top = 0 + "px";
        this.container.style.left = 0 + "px";

        this.toolbarWrapper.style.width = "100%";

        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
            var ua = navigator.userAgent;
            if ((ua.indexOf("Safari") > -1) && (ua.indexOf("Chrome") == -1)) {
                element.webkitRequestFullScreen();
            } else {
                element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) { //IE 11
            if (window == top) {
                element.msRequestFullscreen();
            } else {
                alert("Fullscreen mode in IE 11 is not currently supported while Pivot embeded in iframe.");
            }
        }

        element.addEventListener("fullscreenchange", function () {
            if (!window.screenTop && !window.screenY && !this.isFullscreen()) {
                this.exitFullscreen();
            }
        }.bind(this), false);

        element.addEventListener("webkitfullscreenchange", function () {
            if (!window.screenTop && !window.screenY && !this.isFullscreen()) {
                this.exitFullscreen();
            }
        }.bind(this), false);

        element.addEventListener("mozfullscreenchange", function () {
            if (!(window.fullScreen) && !(window.innerWidth == screen.width && window.innerHeight == screen.height)) {
                this.exitFullscreen();
            }
        }.bind(this), false);
    }
}
WebDataRocksToolbar.prototype.exitFullscreen = function () {
    this.container.style.width = this.containerStyle.width;
    this.container.style.height = this.containerStyle.height;
    this.container.style.position = this.containerStyle.position;
    this.container.style.top = this.containerStyle.top;
    this.container.style.left = this.containerStyle.left;
    this.container.style.marginTop = this.containerStyle.marginTop;
    this.container.style.marginLeft = this.containerStyle.marginLeft;

    this.toolbarWrapper.style.width = this.containerStyle.toolbarWidth;
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.cancelFullscreen) {
        document.cancelFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullScreen) {
        document.webkitExitFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) { //IE 11
        document.msExitFullscreen();
    }
}

// PRIVATE API
WebDataRocksToolbar.prototype.nullOrUndefined = function (val) {
    return (typeof (val) === 'undefined' || val === null);
}
WebDataRocksToolbar.prototype.hasClass = function (elem, cls) {
    return elem.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
WebDataRocksToolbar.prototype.addClass = function (elem, cls) {
    if (!this.hasClass(elem, cls)) {
        elem.className += " " + cls;
    }
}
WebDataRocksToolbar.prototype.removeClass = function (elem, cls) {
    if (this.hasClass(elem, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        elem.className = elem.className.replace(reg, ' ');
    }
}
WebDataRocksToolbar.prototype.setText = function (target, text) {
    if (!target) return;
    if (target.innerText !== undefined) {
        target.innerText = text;
    }
    if (target.textContent !== undefined) {
        target.textContent = text;
    }
}
WebDataRocksToolbar.prototype.createSelect = function () {
    var wrapper = document.createElement("div");
    wrapper.classList.add("wdr-select");
    var select = document.createElement("select");
    wrapper.appendChild(select);
    wrapper.select = select;
    return wrapper;
}
WebDataRocksToolbar.prototype.createDivider = function (data) {
    var item = document.createElement("li");
    item.className = "wdr-divider";
    return item;
}
WebDataRocksToolbar.prototype.createTab = function (data) {
    var tab = document.createElement("li");
    tab.id = data.id;
    var tabLink = document.createElement("a");
    if (data.hasOwnProperty("class_attr")) {
        tabLink.setAttribute("class", data.class_attr);
    }
    tabLink.setAttribute("href", "javascript:void(0)");

    if (data.icon) {
        var svgIcon = document.createElement("div");
        svgIcon.classList.add("wdr-svg-icon");
        svgIcon.innerHTML = data.icon;
        tabLink.appendChild(svgIcon);
    }

    var title = document.createElement("span");
    this.setText(title, data.title);
    tabLink.appendChild(title);
    var _this = this;
    var _handler = typeof data.handler == "function" ? data.handler : this[data.handler];
    if (!this.nullOrUndefined(_handler)) {
        tabLink.onclick =
            function (handler, args) {
                return function () {
                    handler.call(_this, args);
                }
            }(_handler, data.args);
    }
    if (!this.nullOrUndefined(this[data.onShowHandler])) {
        tabLink.onmouseover =
            function (handler) {
                return function () {
                    handler.call(_this);
                }
            }(this[data.onShowHandler]);
    }
    tab.onmouseover = function () {
        _this.showDropdown(this);
    }
    tab.onmouseout = function () {
        _this.hideDropdown(this);
    }
    tab.appendChild(tabLink);
    if (data.menu != null && (!this.osUtils.isMobile || data.collapse == true)) {
        tab.appendChild(this.createTabMenu(data.menu));
    }
    return tab;
}
WebDataRocksToolbar.prototype.showDropdown = function (elem) {
    var menu = elem.querySelectorAll(".wdr-dropdown")[0];
    if (menu) {
        menu.style.display = "block";
        if (menu.getBoundingClientRect().right > this.toolbarWrapper.getBoundingClientRect().right) {
            menu.style.right = 0;
            this.addClass(elem, "wdr-align-rigth");
        }
    }
};
WebDataRocksToolbar.prototype.hideDropdown = function (elem) {
    var menu = elem.querySelectorAll(".wdr-dropdown")[0];
    if (menu) {
        menu.style.display = "none";
        menu.style.right = null;
        this.removeClass(elem, "wdr-align-rigth");
    }
};
WebDataRocksToolbar.prototype.createTabMenu = function (dataProvider) {
    var container = document.createElement("div");
    container.className = "wdr-dropdown wdr-shadow-container";
    var content = document.createElement("ul");
    content.className = "wdr-dropdown-content";
    for (var i = 0; i < dataProvider.length; i++) {
        if (this.isDisabled(dataProvider[i])) continue;
        content.appendChild((dataProvider[i].divider) ? this.createMenuDivider() : this.createTab(dataProvider[i]));
    }
    container.appendChild(content);
    return container;
}
WebDataRocksToolbar.prototype.createMenuDivider = function () {
    var item = document.createElement("li");
    item.className = "wdr-v-divider";
    return item;
}
WebDataRocksToolbar.prototype.isDisabled = function (data) {
    if (this.nullOrUndefined(data)) return true;
    return (data.ios === false && this.osUtils.isIOS) || (data.android === false && this.osUtils.isAndroid) || (data.mobile === false && this.osUtils.isMobile);
}
WebDataRocksToolbar.prototype.getElementById = function (id, parent) {
    var find = function (node, id) {
        for (var i = 0; i < node.childNodes.length; i++) {
            var child = node.childNodes[i];
            if (child.id == id) {
                return child;
            } else {
                var res = find(child, id);
            }
            if (res != null) {
                return res;
            }
        }
        return null;
    };
    return find(parent || this.toolbarWrapper, id);
}

WebDataRocksToolbar.prototype.osUtils = {
    isIOS: navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.platform.match(/iPhone|iPad|iPod/i) ? true : false,
    isMac: /Mac/i.test(navigator.platform),
    isAndroid: navigator.userAgent.match(/Android/i) ? true : false,
    isBlackBerry: /BlackBerry/i.test(navigator.platform),
    isMobile: navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.platform.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/Android/i) || /BlackBerry/i.test(navigator.platform)
};
WebDataRocksToolbar.PopupManager = function (toolbar) {
    this.toolbar = toolbar;
    this.activePopup = null;
}
WebDataRocksToolbar.PopupManager.prototype.createPopup = function () {
    return new WebDataRocksToolbar.PopupManager.PopupWindow(this);
};
WebDataRocksToolbar.PopupManager.prototype.addPopup = function (popup) {
    if (popup == null) return;
    this.removePopup();
    this.modalOverlay = this.createModalOverlay();
    this.activePopup = popup;
    this.toolbar.toolbarWrapper.appendChild(popup);
    this.toolbar.toolbarWrapper.appendChild(this.modalOverlay);
    this.addLayoutClasses(popup);
    this.centerPopup(popup);
    var _this = this;
    popup.resizeHandler = function () {
        if (!popup) return;
        _this.addLayoutClasses(popup);
        _this.centerPopup(popup);
    };
    window.addEventListener("resize", popup.resizeHandler);
};
WebDataRocksToolbar.PopupManager.prototype.addLayoutClasses = function (popup) {
    popup.classList.remove("wdr-layout-tablet");
    popup.classList.remove("wdr-layout-mobile");
    popup.classList.remove("wdr-layout-mobile-small");
    var rect = this.getBoundingRect(this.toolbar.container);
    if (rect.width < 768) {
        popup.classList.add("wdr-layout-tablet");
    }
    if (rect.width < 580) {
        popup.classList.add("wdr-layout-mobile");
    }
    if (rect.width < 460) {
        popup.classList.add("wdr-layout-mobile-small");
    }
};
WebDataRocksToolbar.PopupManager.prototype.centerPopup = function (popup) {
    var containerRect = this.getBoundingRect(this.toolbar.container);
    var popupRect = this.getBoundingRect(popup);
    var toolbarRect = this.getBoundingRect(this.toolbar.toolbarWrapper);
    popup.style.zIndex = parseInt(this.modalOverlay.style.zIndex) + 1;
    //this.modalOverlay.style.top = toolbarRect.height + "px";
    this.modalOverlay.style.height = containerRect.height /*- toolbarRect.height*/ + "px";
    popup.style.left = Math.max(0, (toolbarRect.width - popupRect.width) / 2) + "px";
    popup.style.top = Math.max(0, (containerRect.height - popupRect.height) / 2) + "px";
};
WebDataRocksToolbar.PopupManager.prototype.removePopup = function (popup) {
    var popup = (popup || this.activePopup);
    if (this.modalOverlay != null) {
        this.toolbar.toolbarWrapper.removeChild(this.modalOverlay);
        this.modalOverlay = null;
    }
    if (popup != null) {
        this.toolbar.toolbarWrapper.removeChild(popup);
        this.activePopup = null;
        window.removeEventListener("resize", popup.resizeHandler);
    }
};
WebDataRocksToolbar.PopupManager.prototype.getBoundingRect = function (target) {
    var rect = target.getBoundingClientRect();
    return {
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
        width: rect.width || target.clientWidth,
        height: rect.height || target.clientHeight
    };
};
WebDataRocksToolbar.PopupManager.prototype.createModalOverlay = function () {
    var modalOverlay = document.createElement("div");
    modalOverlay.className = "wdr-modal-overlay";
    modalOverlay.id = "wdr-popUp-modal-overlay";
    var _this = this;
    modalOverlay.addEventListener('click', function (e) {
        _this.removePopup(_this.activePopup);
    });
    return modalOverlay;
};
WebDataRocksToolbar.PopupManager.PopupWindow = function (popupManager) {
    this.popupManager = popupManager;
    var contentPanel = document.createElement("div");
    contentPanel.className = "wdr-panel-content";
    var titleBar = document.createElement("div");
    titleBar.className = "wdr-title-bar";
    var titleLabel = document.createElement("div");
    titleLabel.className = "wdr-title-text";
    var toolbar = document.createElement("div");
    toolbar.className = "wdr-toolbox";
    toolbar.style.clear = "both";
    this.content = document.createElement("div");
    this.content.className = "wdr-popup wdr-panel wdr-toolbar-ui wdr-ui";
    this.content.appendChild(contentPanel);
    contentPanel.appendChild(titleBar);
    titleBar.appendChild(titleLabel);

    this.setTitle = function (title) {
        WebDataRocksToolbar.prototype.setText(titleLabel, title);
    }
    this.setContent = function (content) {
        contentPanel.insertBefore(content, titleBar.nextSibling);
    }
    var _this = this;
    this.setToolbar = function (buttons, toHeader) {
        toolbar.innerHTML = "";
        for (var i = buttons.length - 1; i >= 0; i--) {
            var button = document.createElement("a");
            button.setAttribute("href", "javascript:void(0)");
            button.className = "wdr-ui-btn" + (buttons[i].isPositive ? " wdr-ui-btn-dark" : "");
            if (buttons[i].id) button.id = buttons[i].id;
            WebDataRocksToolbar.prototype.setText(button, buttons[i].label);
            button.onclick =
                function (handler) {
                    return function () {
                        if (handler != null) {
                            handler.call();
                        }
                        _this.popupManager.removePopup();
                    }
                }(buttons[i].handler);
            if (buttons[i].disabled === true) {
                WebDataRocksToolbar.prototype.addClass(button, "wdr-ui-disabled");
            } else {
                WebDataRocksToolbar.prototype.removeClass(button, "wdr-ui-disabled");
            }
            if (buttons[i].isPositive && (WebDataRocksToolbar.prototype.osUtils.isMac || WebDataRocksToolbar.prototype.osUtils.isIOS)) {
                toolbar.appendChild(button);
            } else {
                toolbar.insertBefore(button, toolbar.firstChild);
            }
        }
        if (toHeader) {
            toolbar.classList.add("wdr-ui-col");
            titleBar.appendChild(toolbar);
            titleBar.classList.add("wdr-ui-row");
            titleLabel.classList.add("wdr-ui-col");
        } else {
            contentPanel.appendChild(toolbar);
        }
    }
    this.toolbar = toolbar;
    this.titleBar = titleBar;
    this.title = titleLabel;
    return this;
};
WebDataRocksToolbar.ColorPicker = function (toolbar, popupContainer) {
    this.toolbar = toolbar;

    this.element = document.createElement("div");
    this.element.classList.add("wdr-colorpick-wrap");
    this.element.classList.add("wdr-width40");

    this.colorPickerButton = document.createElement("div");
    this.colorPickerButton.classList.add("wdr-colorpick-btn");
    this.element.appendChild(this.colorPickerButton);
    this.colorPickerIcon = document.createElement("span");
    this.colorPickerIcon.classList.add("wdr-icon");
    this.colorPickerIcon.classList.add("wdr-icon-act_font");
    this.colorPickerButton.appendChild(this.colorPickerIcon);

    this.popup = document.createElement('div');
    this.popup.classList.add("wdr-colorpick-popup");
    this.popup.onclick = function (event) {
        event.stopPropagation();
    };
    popupContainer.appendChild(this.popup);

    var colorSwitch = document.createElement("div");
    colorSwitch.classList.add("wdr-color-targ-switch");
    this.popup.appendChild(colorSwitch);

    var colorBtn = document.createElement("a");
    colorBtn.classList.add("wdr-cts-item");
    colorBtn.classList.add("wdr-current");
    colorBtn.href = "javascript:void(0);";
    colorBtn.innerHTML = toolbar.Labels.cp_text;
    colorBtn.onclick = function () { onSwitchChange('font'); };
    colorSwitch.appendChild(colorBtn);

    var bgColorBtn = document.createElement("a");
    bgColorBtn.classList.add("wdr-cts-item");
    bgColorBtn.innerHTML = toolbar.Labels.cp_highlight;
    bgColorBtn.href = "javascript:void(0);";
    bgColorBtn.onclick = function () { onSwitchChange('bg'); };
    colorSwitch.appendChild(bgColorBtn);

    var row = document.createElement("div");
    row.classList.add("wdr-cp-sett-row");
    this.popup.appendChild(row);

    this.colorInput = document.createElement("input");
    this.colorInput.type = "text";
    this.colorInput.classList.add("wdr-inp");
    this.colorInput.classList.add("wdr-width140");
    this.colorInput.classList.add("wdr-tac");
    this.colorInput.onchange = onColorInputChanged;
    row.appendChild(this.colorInput);

    this.colorPreview = document.createElement("div");
    this.colorPreview.classList.add("wdr-cp-curr-color");
    this.colorPreview.classList.add("wdr-width140");
    row.appendChild(this.colorPreview);

    this.mainColors = document.createElement("div");
    this.mainColors.classList.add("wdr-row-9colors");
    this.popup.appendChild(this.mainColors);
    for (var color in this.colors) {
        var item = document.createElement("div");
        item.classList.add("wdr-r9c-item");
        item.style.backgroundColor = color;
        item.setAttribute('data-c', color);
        item.addEventListener('click', onMainColorClick);
        this.mainColors.appendChild(item);

        var check = document.createElement("span");
        check.classList.add("wdr-cp-currentmark");
        check.classList.add("wdr-icon");
        check.classList.add("wdr-icon-act_check");
        item.appendChild(check);

        var arrow = document.createElement("span");
        arrow.classList.add("wdr-r9c-arrow");
        arrow.style.borderTopColor = color;
        item.appendChild(arrow);
    }

    this.shadeColors = document.createElement("div");
    this.shadeColors.classList.add("wdr-row-4colors");
    this.popup.appendChild(this.shadeColors);
    for (var i = 0; i < 8; i++) {
        var item = document.createElement("div");
        item.classList.add("wdr-r4c-item");
        item.addEventListener('click', onColorClick);
        this.shadeColors.appendChild(item);

        var check = document.createElement("span");
        check.classList.add("wdr-cp-currentmark");
        check.classList.add("wdr-icon");
        check.classList.add("wdr-icon-act_check");
        item.appendChild(check);
    }
    this.drawShades(this.colors['#000000']);

    var row = document.createElement("div");
    row.classList.add("wdr-cp-btns-row");
    this.popup.appendChild(row);

    var applyBtn = document.createElement("a");
    applyBtn.innerHTML = toolbar.Labels.apply;
    applyBtn.classList.add("wdr-ui-btn");
    applyBtn.classList.add("wdr-ui-btn-dark");
    applyBtn.addEventListener("click", onApplyClick);

    var cancelBtn = document.createElement("a");
    cancelBtn.innerHTML = toolbar.Labels.cancel;
    cancelBtn.classList.add("wdr-ui-btn");
    cancelBtn.addEventListener("click", onCancelClick);

    if (WebDataRocksToolbar.prototype.osUtils.isMac || WebDataRocksToolbar.prototype.osUtils.isIOS) {
        row.appendChild(cancelBtn);
        row.appendChild(applyBtn);
    } else {
        row.appendChild(applyBtn);
        row.appendChild(cancelBtn);
    }

    this.currentType = "font";

    this.colorPickerButton.addEventListener('click', onColorButtonClick);
    document.body.addEventListener('click', onBodyClick);

    var _this = this;

    function onBodyClick(event) {
        onCancelClick();
    }

    function onColorButtonClick(event) {
        event.stopPropagation();
        if (_this.isOpened()) {
            _this.closePopup();
        } else {
            _this.openPopup();
        }
    }

    function onMainColorClick(event) {
        var color = event.target.getAttribute('data-c');
        _this.drawShades(_this.colors[color]);
        _this.setColor(color, _this.currentType, true);
    }

    function onColorClick(event) {
        var color = event.target.getAttribute('data-c');
        _this.setColor(color, _this.currentType, true);
    }

    function onSwitchChange(type) {
        _this.currentType = type;
        colorBtn.classList.remove("wdr-current");
        bgColorBtn.classList.remove("wdr-current");
        if (type == "bg") {
            bgColorBtn.classList.add("wdr-current");
            _this.setColor(_this.backgroundColor, type, false);
        } else {
            colorBtn.classList.add("wdr-current");
            _this.setColor(_this.fontColor, type, false);
        }
    }

    function onColorInputChanged() {
        var color = _this.colorInput.value;
        if (_this.isColor(color)) {
            _this.setColor(color, _this.currentType, true);
        }
    }

    function onApplyClick() {
        _this.closePopup();
        if (_this.applyHandler) {
            _this.applyHandler();
        }
    }

    function onCancelClick() {
        _this.closePopup();
        if (_this.cancelHandler) {
            _this.cancelHandler();
        }
    }
}
WebDataRocksToolbar.ColorPicker.prototype.colors = {
    '#000000': ["#000000", "#212121", "#424242", "#616161", "#757575", "#9E9E9E", "#BDBDBD", "#FFFFFF"],
    '#F44336': ["#D32F2F", "#E53935", "#F44336", "#EF5350", "#E57373", "#EF9A9A", "#FFCDD2", "#FFEBEE"],
    '#FF9800': ["#F57C00", "#FB8C00", "#FF9800", "#FFA726", "#FFB74D", "#FFCC80", "#FFE0B2", "#FFF3E0"],
    '#FFEB3B': ["#FBC02D", "#FDD835", "#FFEB3B", "#FFEE58", "#FFF176", "#FFF59D", "#FFF9C4", "#FFFDE7"],
    '#8BC34A': ["#689F38", "#7CB342", "#8BC34A", "#9CCC65", "#AED581", "#C5E1A5", "#DCEDC8", "#F1F8E9"],
    '#009688': ["#00796B", "#00897B", "#009688", "#26A69A", "#4DB6AC", "#80CBC4", "#B2DFDB", "#E0F2F1"],
    '#03A9F4': ["#0288D1", "#039BE5", "#03A9F4", "#29B6F6", "#4FC3F7", "#81D4FA", "#B3E5FC", "#E1F5FE"],
    '#3F51B5': ["#303F9F", "#3949AB", "#3F51B5", "#5C6BC0", "#7986CB", "#9FA8DA", "#C5CAE9", "#E8EAF6"],
    '#9C27B0': ["#7B1FA2", "#8E24AA", "#9C27B0", "#AB47BC", "#BA68C8", "#CE93D8", "#E1BEE7", "#F3E5F5"],
};
WebDataRocksToolbar.ColorPicker.prototype.isOpened = function () {
    return this.popup.parentElement && this.popup.parentElement.classList.contains("wdr-popup-opened");
};
WebDataRocksToolbar.ColorPicker.prototype.drawShades = function (colors) {
    if (!colors) {
        return;
    }
    var children = this.shadeColors.children;
    for (var i = 0; i < children.length; i++) {
        var item = children[i];
        item.setAttribute('data-c', colors[i]);
        item.style.backgroundColor = colors[i];
        item.style.borderRight = colors[i] == "#FFFFFF" ? "1px solid #d5d5d5" : 'none';
        item.style.borderBottom = colors[i] == "#FFFFFF" ? "1px solid #d5d5d5" : 'none';
    }
};
WebDataRocksToolbar.ColorPicker.prototype.setColor = function (colorValue, type, dispatch) {
    if (typeof colorValue === "string" && colorValue.indexOf("0x") == 0) {
        colorValue = "#" + colorValue.substr(2);
    }
    if (type == "bg") {
        this.backgroundColor = colorValue;
        this.colorPickerButton.style.backgroundColor = colorValue;
    } else {
        this.fontColor = colorValue;
        this.colorPickerIcon.style.color = colorValue;
    }
    this.colorInput.value = colorValue;
    this.colorPreview.style.backgroundColor = colorValue;
    this.drawSelected();

    if (dispatch && this.changeHandler) {
        this.changeHandler();
    }
};
WebDataRocksToolbar.ColorPicker.prototype.drawSelected = function () {
    var color = this.currentType == "bg" ? this.backgroundColor : this.fontColor;
    var mainColor = this.findMain(color);

    this.drawShades(this.colors[mainColor]);

    var children = this.mainColors.children;
    for (var i = 0; i < children.length; i++) {
        children[i].classList.remove("wdr-current");
    }
    var mainSelected = this.mainColors.querySelector("[data-c='" + mainColor + "']");
    if (mainSelected) {
        mainSelected.classList.add("wdr-current");
    }

    children = this.shadeColors.children;
    for (var i = 0; i < children.length; i++) {
        children[i].classList.remove("wdr-current");
    }
    var shadeSelected = this.shadeColors.querySelector("[data-c='" + color + "']");
    if (shadeSelected) {
        shadeSelected.classList.add("wdr-current");
    }
};
WebDataRocksToolbar.ColorPicker.prototype.findMain = function (color) {
    if (typeof color === "string" && color.indexOf("0x") == 0) {
        color = "#" + color.substr(2);
    }
    for (var mainColor in this.colors) {
        var colors = this.colors[mainColor];
        if (colors.indexOf(color) >= 0) {
            return mainColor;
        }
    }
};
WebDataRocksToolbar.ColorPicker.prototype.isColor = function (value) {
    return value.match(/^#?[0-9A-Fa-f]{6}$/g);
}
WebDataRocksToolbar.ColorPicker.prototype.closePopup = function () {
    if (!this.popup.parentElement) {
        return;
    }
    this.popup.parentElement.classList.remove("wdr-popup-opened");
}
WebDataRocksToolbar.ColorPicker.prototype.openPopup = function () {
    // close others
    var openedPopups = this.toolbar.toolbarWrapper.querySelectorAll('.wdr-colorpick-popup');
    for (var i = 0; i < openedPopups.length; i++) {
        openedPopups[i].parentElement.classList.remove("wdr-popup-opened");
    }
    if (!this.popup.parentElement) {
        return;
    }
    // open current
    var parent = this.toolbar.toolbarWrapper.querySelector("#wdr-popup-conditional .wdr-panel-content");
    var pos = this.getWhere(this.colorPickerButton, parent);
    var posAbs = this.getWhere(this.colorPickerButton, document.body);
    if (posAbs.top - this.popup.clientHeight < 0) {
        this.popup.classList.remove("wdr-arrow-down");
        this.popup.classList.add("wdr-arrow-up");
        this.popup.style.top = (this.colorPickerButton.clientHeight + pos.top + 11) + 'px';
        this.popup.style.bottom = "";
    } else {
        this.popup.classList.add("wdr-arrow-down");
        this.popup.classList.remove("wdr-arrow-up");
        this.popup.style.bottom = (parent.clientHeight - pos.top + 5) + 'px';
        this.popup.style.top = "";
    }
    this.popup.style.left = (pos.left + (this.colorPickerButton.clientWidth / 2) + 2) + 'px';
    this.popup.parentElement.classList.add("wdr-popup-opened");
}
WebDataRocksToolbar.ColorPicker.prototype.getWhere = function (el, parent) {
    var curleft = 0;
    var curtop = 0;
    var curtopscroll = 0;
    var curleftscroll = 0;
    if (el.offsetParent) {
        curleft = el.offsetLeft;
        curtop = el.offsetTop;
        var elScroll = el;
        while (elScroll = elScroll.parentNode) {
            if (elScroll == parent) {
                break;
            }
            curtopscroll = elScroll.scrollTop ? elScroll.scrollTop : 0;
            curleftscroll = 0;
            curleft -= curleftscroll;
            curtop -= curtopscroll;
        }
        while (el = el.offsetParent) {
            if (el == parent) {
                break;
            }
            curleft += el.offsetLeft;
            curtop += el.offsetTop;
        }
    }
    var isMSIE = /*@cc_on!@*/ 0;
    var offsetX = 0;// isMSIE ? document.body.scrollLeft : window.pageXOffset;
    var offsetY = 0;// isMSIE ? document.body.scrollTop : window.pageYOffset;
    return {
        top: curtop + offsetY,
        left: curleft + offsetX
    };
}
