define([
  "base/js/namespace",
  "jquery",
  "./font_style/font_control",
  "./font_style/font_spacing",
  "./Color_style/Color_control"
], function(Jupyter, $, Font_control, Font_spacing, Color_control) {
  "use strict";

  var fontStyle = function() {
    var fs_flag = false;
    var fc_obj = new Font_control();
    var fsp_obj = new Font_spacing();
    var cc_obj = new Color_control();
    fontStyle.prototype.fs_initial = function() {
      //fs_initial
      //find Customise font button on the page
      var fs = $('button[title="Customise font"]');
      fs.addClass("dropdown-toggle main-btn");
      fs.attr("data-toggle", "dropdown");
      fs.attr("id", "fs");
      var fsdiv = $("<div>", { style: "display:inline", class: "btn-group" });
      fs.parent().append(fsdiv);
      fsdiv.append(fs);
      this.fs_dropdown_initial(fs);
    }; //end fs_initial

    fontStyle.prototype.fs_dropdown_initial = function(fs) {
      //Create the dropdown menu
      var dropMenu = $("<ul/>")
        .addClass("dropdown-menu dropdown-menu-style")
        .attr("id", "fs_dropdown");
      fs.parent().append(dropMenu);
      $(document).on("click", "#fs", function(e) {
        e.stopPropagation();
      });
      $(document).on("click", "#fs_dropdown", function(e) {
        e.stopPropagation();
      });
      //Create the contents of dropdown menu
      //Predefined style
      var fs_menuitem1 = $("<li/>").attr("role", "none");
      var fs_predefined_styles = $("<a/>")
        .text("Predefined styles")
        .attr("href", "#");
      fs_menuitem1.append(fs_predefined_styles);
      dropMenu.append(fs_menuitem1);
      //&submenu
      //&end submenu

      //font color
      var fs_menuitem5 = $("<li/>");
      var colorpicker2 = $("<a/>")
        .attr("href", "#")
        .addClass("font-select-box")
        .attr("id", "color-picker")
        .text("Font color")
        .attr("data-toggle", "dropdown")
        .attr("aria-haspopup", "true")
        .attr("aria-label", "font color");
      var fs_font_color = cc_obj.font_color();
      fs_menuitem5.append(fs_font_color);
      fs_menuitem5.append(colorpicker2);
      dropMenu.append(fs_menuitem5);
      //end

      //Font name
      var fs_menuitem3 = $("<li/>")
        .addClass("font-select-box")
        .text("Font style");
      var fs_font_name = fc_obj.font_name();
      fs_menuitem3.append(fs_font_name);
      dropMenu.append(fs_menuitem3);
      //end

      //Font size
      var fs_menuitem4 = $("<li/>")
        .addClass("font-select-box")
        .text("Font size");
      var fs_font_size = fc_obj.font_size();
      fc_obj.font_change();
      fs_menuitem4.append(fs_font_size);
      dropMenu.append(fs_menuitem4);
      //end

      //Background color
      var fs_menuitem2 = $("<li/>");
      var colorpicker1 = $("<a/>")
        .attr("href", "#")
        .addClass("font-select-box")
        .attr("id", "color-picker-background")
        .text("Background color")
        .attr("data-toggle", "dropdown")
        .attr("aria-haspopup", "true")
        .attr("aria-label", "text background color")
        .attr("data-toggle", "dropdown")
        .attr("aria-haspopup", "true")
        .attr("aria-label", "text background color");

      var fs_background_color = cc_obj.background_color();

      fs_menuitem2.append(colorpicker1);
      fs_menuitem2.append(fs_background_color);
      dropMenu.append(fs_menuitem2);
      //end

      //Line height
      var fs_menuitem6 = $("<li/>")
        .attr("id", "height_elem")
        .text("Line height");
      var zoom_div = `
                <div class="zoom btn-group" id="line_height_buttons">
                    <button class="btn icon-button" id="reduce_line_height" title="Reduce line height"><i class="fa fa-minus"></i></button>
                    <button class="btn icon-button" id="increase_line_height" title="Increase line height"><i class="fa fa-plus"></i></button>
                </div>`;
      fs_menuitem6.append(zoom_div);
      dropMenu.append(fs_menuitem6);
      //end

      //Letter spacing
      var fs_menuitem7 = $("<li/>")
        .attr("id", "space_elem")
        .text("Letter Spacing");
      var zoom_div = `
                <div class="zoom btn-group" id="letter_space_buttons">
                    <button class="btn icon-button" id="reduce_letter_space" title="Reduce letter spacing"><i class="fa fa-minus"></i></button>
                    <button class="btn icon-button" id="increase_letter_space" title="Increase letter spacing"><i class="fa fa-plus"></i></button>
                </div>
            </div>`;
      fs_menuitem7.append(zoom_div);
      dropMenu.append(fs_menuitem7);
      //end

      //Transform
      var fs_menuitem8 = $("<li/>");
      var fs_transform = $("<a/>").text("Transform");
      fs_menuitem8.append(fs_transform);
      dropMenu.append(fs_menuitem8);
      //end
      //On/off
      var fs_menuitem9 = $("<li/>")
        .addClass("switch text-center")
        .text("OFF\xa0\xa0");
      var fs_switch = $("<input/>", {
        type: "checkbox",
        id: "fs_switch",
        "data-toggle": "toggle",
        "data-style": "ios",
        "data-onstyle": "warning",
        "data-offstyle": "default",
        "data-width": "58",
        "data-on": " ",
        "data-off": " "
      });
      var offText = $("<p>", { style: "display:inline" }).text("\xa0\xa0ON");
      fs_menuitem9.on("click", function() {
        fs_flag = !fs_flag;
      });
      fs_menuitem9.append(fs_switch);
      fs_menuitem9.append(offText);
      dropMenu.append(fs_menuitem9);
      //end
      fsp_obj.initialise_font_spacing();
    };
  };

  return fontStyle;
});