(function ($) {
    // shorten references to variables. this is better for uglification
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget

    var customWidget = kendo.ui.AutoComplete.extend({
        init: function (element, options) {
            var that = this;

            that.options.dataSource = new kendo.data.DataSource({
                serverFiltering: true,
                type: "json",
                transport: {
                    read: {
                        url: COMMON.WebAPIHostURL + "/api/Common/Search",
                        type: "GET",
                        contentType: 'application/json; charset=utf-8',
                        datatype: "json"
                    },
                    parameterMap: function (options, type) {
                        var param = {
                            type: "PRODUCT",
                            keyword: that.options.Keyword
                        }

                        return param;
                    }
                },
                schema: {
                    data: function (response) {
                        var data = JSON.parse(response);
                        if (!data.Table || data.Table.length <= 0) {
                            return [];
                        }
                        else {
                            return data.Table;
                        }
                    }
                }
            });

            that.options.filtering = function (e) {
                var keyword = e.filter.value;
                that.options.Keyword = keyword;
                that.options.dataSource.read();
            };

            kendo.ui.AutoComplete.fn.init.call(this, element, that.options);
        },
        options: {
            name: "SelectProduct",
            delay: 300,
            minLength: 3,
            dataTextField: "ProductCode",

        }
    });

    kendo.ui.plugin(customWidget);

})(jQuery);