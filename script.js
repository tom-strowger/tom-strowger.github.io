function setsizes(){

    var isMobile = window.innerWidth < 600;

    // Update the styles if displaying on a mobile
    if( isMobile ){

        var h1Elements = document.getElementsByTagName("h1");

        for(var i = 0; i < h1Elements.length; i++) {
            h1Elements[i].style.textIndent = 0;
            h1Elements[i].style.fontSize = 40;
        }

        var bodyElements = document.getElementsByTagName("body");

        for(var i = 0; i < bodyElements.length; i++) {
            bodyElements[i].style.fontSize = 20;
        }

        var container_elements = document.getElementsByClassName("container");

        for(var i = 0; i < container_elements.length; i++) {
            container_elements[i].style.margin = 10;
        }
    }
    else
    {
        var h1Elements = document.getElementsByTagName("h1");

        for(var i = 0; i < h1Elements.length; i++) {
            h1Elements[i].style.textIndent = -20;
            h1Elements[i].style.fontSize = 25;
        }

        var bodyElements = document.getElementsByTagName("body");

        for(var i = 0; i < bodyElements.length; i++) {
            bodyElements[i].style.fontSize = 17;
        }


        var container_elements = document.getElementsByClassName("container");

        for(var i = 0; i < container_elements.length; i++) {
            container_elements[i].style.margin = 50;
        }
    }
}