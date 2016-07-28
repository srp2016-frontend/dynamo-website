/// <reference path="jquery.d.ts" />

function changeSettings()
{
    let type = JSON.parse(document.cookie).type;
    let manifest_name = type === "Triathlon" ? "Participants" : type === "Shooter" ? "Responders" : "Manifest"
    $("#manifest").html(manifest_name)
    $("#manifest-check-name").html(manifest_name)
    if(type !== "Triathlon")
        $("#course-dropdown").remove()
}