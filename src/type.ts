/// <reference path="jquery.d.ts" />
let type : string = JSON.parse(document.cookie).type;
function changeSettings()
{
    let manifest_name = type === "Triathlon" ? "Participants" : type === "Shooter" ? "Responders" : "Manifest"
    $("#manifest").html(manifest_name)
    $("#manifest-check-name").html(manifest_name)
    
    if(type !== "Triathlon")
        $("#course-dropdown").remove()
        
    $("#title").append(": " + type)
    
    if(type === "Water")
    {
        $("#menu-boxes").html('<input type="checkbox" id="video-check" checked>Video</input><br/><input type="checkbox" id ="tech-check">Technology</input><br/>')
        $("#position-feed").remove()
        $("#selection-panel").remove()
        $("#alert-panel").remove()
        $("#manifest-panel").remove()
        $("#searchbar-container").remove()
        $("#video-feed").css("float", "none")
        $("#content").css("text-align", "center")
        $("#water-tech").css("visibility", "visible")
        $("#video-feed source").attr('src', "../video/likeABausVideo.mp4") 
        $("#video-feed")[0].load()
    }
    else if(type === "Triathlon")
    {
        $("#triathlon-tech").css("visibility", "visible")
    }
    else if(type === "Shooter")
    {
        $("#menu-boxes").html('<input type = "checkbox" id = "search-check" checked>Searchbar</input><br/> <input type = "checkbox" id = "time-check">Time Management</input><br/>' +
        '<input type = "checkbox" id = "selection-check" checked>Selection Panel</input><br/> <input type = "checkbox" id = "map-check" checked>Virtual Map</input><br/>' +
        '<input type = "checkbox" id = "alert-check">Alert System</input><br/> <input type = "checkbox" id = "manifest-check">Manifest</input><br/> ' +
        '<input type = "checkbox" id = "tech-check">Technology</input><br/>') 
        $("#video-feed").remove()
        $("#shooter-tech").css("visibility", "visible");    
        $("#map-background").attr("src", "../img/blueprint.png")
    }
}