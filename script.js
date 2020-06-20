$("document").ready(function () {

    var searchTerm = "obama";
    var startDate = "";
    var endDate = "";
    var articleLimit = 5;

    $("#submitBtn").on("click", function (event) {
        event.preventDefault();
        var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
        var apiKey = "ApRgWGOV6SQ2IxlYkrDdXeuInSpdcEEQ";
        clear();
        searchTerm = $("#searchTerm").val().trim();
        articleLimit = $("#recordRetrieve").val();
        startDate = $("#startYear").val().trim();
        endDate = $("#endYear").val().trim();
       
        if (startDate.trim() !== "") {
            queryUrl += "begin_date=" + startDate + "0101" + "&";
        }
        if (endDate.trim() !== "") {
            queryUrl += "end_date=" + endDate + "0101"
        }
        queryUrl += "&q=" + searchTerm + "&api-key=" + apiKey;
        callAPI(queryUrl);
    })
    $("#resetBtn").on("click", clear
    )

    function callAPI(queryUrl) {
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (data) {
           
            for (var i = 0; i < articleLimit; i++) {
                //console.log(data);
                var newLi = $("<li>");
                var newHeadline = $("<h1>");
                var newByline = $("<p>");
                newHeadline.text(data.response.docs[i].headline.main);
                newByline.text(data.response.docs[i].byline.original);
                newLi.append(newHeadline, newByline);
                $("#articlesHere").append(newLi);
            }
        })
    }
    function clear(){
        $("#articlesHere").empty();
    }
});