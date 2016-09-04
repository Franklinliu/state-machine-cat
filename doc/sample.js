define(function (require) {
    var stategenny = require('../src/index');
    var gCurrentRenderer = "svg";

    function render(pType){
        pType = Boolean(pType) ? pType : gCurrentRenderer;
        gCurrentRenderer = pType;

        window.output.innerHTML = "";
        stategenny.render(
            window.inputscript.value,
            {
                inputType: "stategenny",
                outputType: pType
            },
            function (pError, pSuccess){
                if (Boolean(pError)){
                    window.output.innerHTML = pError;
                }
                if (Boolean(pSuccess)){
                    switch (pType){
                    case "json": {
                        window.output.innerHTML = "<pre>" + JSON.stringify(pSuccess, null, "  ") + "</pre>";
                        break;
                    }
                    case "svg": {
                        window.output.innerHTML = pSuccess;
                        break;
                    }
                    default: {
                        window.output.innerHTML = "<pre>" + pSuccess + "</pre>";
                    }
                    }
                }

            }
        );
    }

    function setTextAreaToWindowHeight(){
        window.inputscript.style.height = '${height}px'.replace('${height}', window.innerHeight - 100);
    }

    window.json.addEventListener(
        "click",
        function(){
            render("json");
        },
        false
    );
    window.dot.addEventListener(
        "click",
        function(){
            render("dot");
        },
        false
    );
    window.stategenny.addEventListener(
        "click",
        function(){
            render("stategenny");
        },
        false
    );
    window.svg.addEventListener(
        "click",
        function(){
            render("svg");
        },
        false
    );
    window.inputscript.addEventListener(
        "input",
        function(){
            if (window.autorender.checked){
                render();
            }
        },
        false
    );

    window.autorender.addEventListener(
        "click",
        function(){
            if (window.autorender.checked){
                window.render.style = "display : none";
                render();
            } else {
                window.render.style = "";
            }
        }
    );

    window.render.addEventListener(
        "click",
        function(){
            render();
        }
    );

    window.addEventListener("resize", setTextAreaToWindowHeight);

    setTextAreaToWindowHeight();
    window.version.innerHTML = "StateGenny ${version}".replace("${version}", stategenny.version);
    render(gCurrentRenderer);


});
