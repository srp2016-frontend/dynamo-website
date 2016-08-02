/// <reference path="jquery.d.ts" />

function changeSettings()
{
    let type = JSON.parse(document.cookie).type;
    let manifest_name = type === "Triathlon" ? "Participants" : type === "Shooter" ? "Responders" : "Manifest"
    $("#manifest").html(manifest_name)
    $("#manifest-check-name").html(manifest_name)
    if(type !== "Triathlon")
        $("#course-dropdown").remove()
    $("#title").append(": " + type)
    if(type === "Water")
    {
        $("#menu-boxes").html('<input type="checkbox" id="video-check" check>Video</input><br/><input type="checkbox" id ="tech-check">Technology</input><br/>')
        ["selection-panel", "position-feed", "alert-panel", "manifest-panel"].map(item => $("#" + item).remove())
        $("#video-feed").css("float", "none")
        $("#content").css("text-align", "center")
    }
}