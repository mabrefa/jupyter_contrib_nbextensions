define([
  "base/js/namespace",
  "jquery",
  "https://unpkg.com/anycontrol/dist/index.umd.min.js",
  "//cdnjs.cloudflare.com/ajax/libs/annyang/2.6.0/annyang.min.js",
  "../planner/planner"
], function(Jupyter, $, anycontrol, annyang, Planner) {
  "use strict";

  var Voice_control = function() {
    Voice_control.prototype.setup_voice_control = function() {
      this.create_menu();
      if (annyang) {
        let commands = {
          "view commands": function() {
            $("#view_commands_div").modal("toggle");
          },
          "open planner": function() {
            $('button[title="Planner"]').click();
          },
          "close planner": function() {
            $('button[title="Planner"]').click();
          },
          run: function() {
            Jupyter.notebook.execute_cell();
          },
          "run all": function() {
            Jupyter.notebook.execute_all_cells();
          },
          "restart kernel": function() {
            Jupyter.notebook.kernel.restart();
          },
          "stop voice control": function() {
            $("#voice_toggle")
              .prop("checked", false)
              .trigger("change");
          }
        };
        annyang.debug(true);
        annyang.addCommands(commands);
      }

      $("#voice_toggle").change(function(e) {
        if ($(this).prop("checked")) {
          annyang.start();
          $("#vc_menu").addClass("voice-control-on");
          console.log("Voice control started");
        } else {
          annyang.abort();
          $("#vc_menu").removeClass("voice-control-on");
          console.log("Voice control stopped");
        }
      });
      $(document).on("click", "#vc_menu", function(e) {
        e.stopPropagation();
      });
      $(document).on("click", "#vc_dropdown", function(e) {
        e.stopPropagation();
      });
    };

    Voice_control.prototype.create_menu = function() {
      var div = $("<div/>").addClass("btn-group");

      var node = $('button[title="Voice Control"]')
        .addClass("dropdown-toggle main-btn")
        .attr("data-toggle", "dropdown")
        .attr("id", "vc_menu")
        .attr("aria-haspopup", "true")
        .attr("aria-controls", "vc_dropdown");

      div.appendTo(node.parent());
      node.appendTo(div);
      this.popup = $("<ul/>")
        .addClass("dropdown-menu dropdown-menu-style")
        .attr("id", "vc_dropdown")
        .attr("role", "menu")
        .attr("aria-labelledby", "vc_menu")
        .appendTo(node.parent());

      var button_li = $("<li/>")
        .attr("role", "none")
        .appendTo(this.popup);

      $("<a/>")
        .attr("href", "#")
        .attr("data-toggle", "modal")
        .attr("data-target", "#view_commands_div")
        .attr("data-backdrop", "false")
        .attr("id", "view_commands")
        .text("View commands")
        .attr("role", "menuitem")
        .appendTo(button_li);

      let view_commands = $("<div>", {
        id: "view_commands_div",
        tabindex: "-1",
        class: "modal fade",
        role: "dialog"
      });

      let view_commands_modal = `
                <div id="style_modal" class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="view_commands_modal">View all voice control commands</h4>
                </div>
                <div class="modal-body">
                  <ul>
                    <li>View commands</li>
                    <li>Run cell</li>
                    <li>Restart Kernel</li>
                    <li>Shutdown Kernel</li>
                  </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
                </div>`;

      view_commands.append(view_commands_modal);
      div.append(view_commands);
      var voice_toggle = $("<li/>")
        .addClass("text-center switch")
        .attr("id", "voice_toggle_switch")
        .attr("role", "none")
        .text("OFF\xa0\xa0")
        .appendTo(this.popup);

      var input_sw = $("<input/>")
        .attr("role", "menuitem")
        .attr("id", "voice_toggle")
        .attr("title", "Voice control switch")
        .attr("type", "checkbox")
        .attr("data-toggle", "toggle")
        .attr("data-style", "ios")
        .attr("data-onstyle", "warning")
        .attr("data-width", "58")
        .attr("data-on", " ")
        .attr("data-off", " ")
        .appendTo(voice_toggle);
      var offText = $("<p>", { style: "display:inline" }).text("\xa0\xa0ON");
      voice_toggle.append(offText);
    };
  };
  return Voice_control;
});
