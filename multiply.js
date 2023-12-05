// <!--
// File: multiply.js
// GUI Assignment: Creating an Interactive Dynamic Table
// Javier Solares, UMass Lowell Computer Science, Javier_Solares@student.uml.edu
// Copyright (c) 2023 by Javier. All rights reserved. May be freely copied or
// excerpted for educational purposes with credit to the author.
// updated by JS on December, 2023 at 11:38 PM
// Description: This is the javascript code for the Dynamic Multiplication Table.
// I create a dynamic table and its elements inside to append to my div. I also
// added the jquery validation and its conditions to validate the form. I added
// sliders for each one of my inputs and update them dynamically to display in the
// text field as well. I tried adding a close button for each one of my tabs but
// I wasn't able to get it fully functioning in time before the deadline.
// -->

$(document).ready(function () {
    // Sliders for each of the inputs to synchronize with the text fields
    $("#sliderMinColumn").slider({
        range: "min",
        min: -50,
        max: 50,
        slide: function (event, ui) {
            $("#numMinColumn").val(ui.value);
            $("#row_column_form").valid();
        }
    });

    $("#sliderMaxColumn").slider({
        range: "min",
        min: -50,
        max: 50,
        slide: function (event, ui) {
            $("#numMaxColumn").val(ui.value);
            $("#row_column_form").valid();
        }
    });

    $("#sliderMinRow").slider({
        range: "min",
        min: -50,
        max: 50,
        slide: function (event, ui) {
            $("#numMinRow").val(ui.value);
            $("#row_column_form").valid();
        }
    });

    $("#sliderMaxRow").slider({
        range: "min",
        min: -50,
        max: 50,
        slide: function (event, ui) {
            $("#numMaxRow").val(ui.value);
            $("#row_column_form").valid(); 
        }
    });

    // These automatically adjust the sliders after changing the input text field
    $("#numMinColumn").on("input", function () {
        updateSliders();
        $("#row_column_form").valid();
        createMultTable(event);
    });

    $("#numMaxColumn").on("input", function () {
        updateSliders();
        $("#row_column_form").valid();
        createMultTable(event);
    });

    $("#numMinRow").on("input", function () {
        updateSliders();
        $("#row_column_form").valid();
        createMultTable(event);
    });

    $("#numMaxRow").on("input", function () {
        updateSliders();
        $("#row_column_form").valid();
        createMultTable(event);
    });

    // Prevents the page from automatically refreshing after clicking the submit button
    $("#row_column_form").submit(function (event) {
        event.preventDefault();
        createMultTable(event);
    });
    
    $("#row_column_form").validate({
        rules: {
            numMinColumn: {
                required: true,
                number: true,
                range: [-50, 50],
                lessThanMaxColumn: true
            },
            numMaxColumn: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            numMinRow: {
                required: true,
                number: true,
                range: [-50, 50],
                lessThanMaxRow: true
            },
            numMaxRow: {
                required: true,
                number: true,
                range: [-50, 50]
            }
        },
        messages: {
            numMinColumn: {
                required: "Please enter a value for Minimum Column.",
                range: "Please enter a value between -50 and 50 for Minimum Column.",
                lessThanMaxColumn: "Minimum column must be less than or equal to maximum column."
            },
            numMaxColumn: {
                required: "Please enter a value for Maximum Column.",
                range: "Please enter a value between -50 and 50 for Maximum Column."
            },
            numMinRow: {
                required: "Please enter a value for Minimum Row.",
                range: "Please enter a value between -50 and 50 for Minimum Row.",
                lessThanMaxRow: "Minimum row must be less than or equal to maximum row."
            },
            numMaxRow: {
                required: "Please enter a value for Maximum Row.",
                range: "Please enter a value between -50 and 50 for Maximum Row."
            }
        }
    });

    $("#tabs").tabs({
        // Handler for closing the tabs
        beforeActivate: function (event, ui) {
            var closeTab = $(ui.newTab.context).find('.ui-icon-close');
            if (closeTab.length > 0) {
                // Checks to see if "x" was clicked
                var tabIndex = ui.newTab.index();
                $("#tabs ul li:nth-child(" + (tabIndex + 1) + ")").remove();
                $("#tabs div:nth-child(" + (tabIndex + 1) + ")").remove();
                $("#tabs").tabs("refresh");
            }
        }
    });

    function tabCloseButton() {
        var tabs = $("#tabs ul li");
        // Removes the existing "x"s
        tabs.find('.ui-icon-close').remove();

        tabs.each(function (index) {
            var closeTab = $("<span>").addClass("ui-icon ui-icon-close").attr("role", "presentation");
            $(this).append(closeTab);
        });
    }

    // Function to update the sliders for each input
    function updateSliders() {
        $("#sliderMinColumn").slider("value", $("#numMinColumn").val());
        $("#sliderMaxColumn").slider("value", $("#numMaxColumn").val());
        $("#sliderMinRow").slider("value", $("#numMinRow").val());
        $("#sliderMaxRow").slider("value", $("#numMaxRow").val());
    }

    // Generating the multiplication table
    function createMultTable(event) {  
        if (!$("#row_column_form").valid()) {
            return;
        }
        // Creating and styling the dynamic table
        var tableDiv = document.getElementById('dynamic-table');
        tableDiv.classList.add('table', 'table-bordered', 'border-primary');

        // Clear the existing table
        tableDiv.innerHTML = '';

        // Prevents the page from refreshing
        event.preventDefault();

        // Variable to create the table body
        var tbody = document.createElement('tbody');

        // Variable to keep of track of the numbers in the top of the header and update it
        var topHeaderCounter = parseInt($("#numMinColumn").val());

        // Variable to keep track of the numbers in the left of the header and update it
        var leftHeaderCounter = parseInt($("#numMinRow").val());

        // Getting the number of columns needed (max - min = # of rows)
        var num_cols = parseInt($("#numMaxColumn").val()) - parseInt($("#numMinColumn").val()) + 1;

        // Getting the number of rows needed (max - min = # of rows)
        var num_rows = parseInt($("#numMaxRow").val()) - parseInt($("#numMinRow").val()) + 1;

        for (var i = 0; i <= num_rows; i++) {
            var rows = document.createElement('tr');

            for (var j = 0; j <= num_cols; j++) {
                // creating cells
                if (i === 0 && j === 0) {       // this is for the top-left of the header
                    var topLeftHeader = document.createElement('th');
                    topLeftHeader.textContent = 'x';
                    rows.appendChild(topLeftHeader)
                } else if (i === 0) {       // this is for the top row of numbers
                    var topHeader = document.createElement('th');
                    topHeader.textContent = topHeaderCounter;
                    topHeaderCounter++;
                    rows.appendChild(topHeader);
                } else if (j === 0) {       // this is for the left-most column of numbers
                    var leftHeader = document.createElement('th');
                    leftHeader.textContent = leftHeaderCounter;
                    leftHeaderCounter++;
                    rows.appendChild(leftHeader);
                } else {                    // this is for the table data when the left and top numbers multiply
                    var multiply = document.createElement('td');
                    multiply.textContent = topHeaderCounter * (leftHeaderCounter - 1);
                    topHeaderCounter++;
                    rows.appendChild(multiply);
                }
            }
            topHeaderCounter = parseInt($("#numMinColumn").val());
            tbody.appendChild(rows)
        }
        tableDiv.appendChild(tbody);

        // This gives the tab it's label of the four parameters
        var tabLabel = `${$("#numMinColumn").val()},${$("#numMaxColumn").val()},${$("#numMinRow").val()},${$("#numMaxRow").val()}`;
        var tabContent = `<div>${tableDiv.outerHTML}</div>`;

        // Checking to see if the tab with the same label already exists
        var tabExists = $(`#tabs ul li:contains("${tabLabel}")`);
        if (tabExists.length > 0) {
            var tabIndex = tabExists.index();
            $(`#tabs div:nth-child(${tabIndex + 1})`).html(tabContent);
        } else {
            // Creates a new tab if it doesn't exist
            $("#tabs ul").append(`<li><a href="#tab-${$("#tabs ul li").length + 1}">${tabLabel}</a></li>`);
            $("#tabs").append(`<div id="tab-${$("#tabs ul li").length}">${tabContent}</div>`);
            $("#tabs").tabs("refresh");
        }
        tabCloseButton();
    }

    // This function is to check if the minimum value for column is less than or equal to their maximum counterpart
    $.validator.addMethod("lessThanMaxColumn", function (value) {
        return parseInt(value) <= parseInt($("#numMaxColumn").val());
    });

    // This function is to check if the minimum value for row is less than or equal to its maximum counterpart
    $.validator.addMethod("lessThanMaxRow", function (value) {
        return parseInt(value) <= parseInt($("#numMaxRow").val());
    });
});
