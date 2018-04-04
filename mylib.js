var $ = (function(){
    function doCSS(prop, val){
        var isSet = Boolean(val),
        action = CSSStyleDeclaration.prototype.setProperty,
        args = arguments;
        if(isSet){
            this.each(function(node, i){
                action.apply(node.style, args);
            });
            return this;

        } else {
            return this.nodes[0].style[prop];
        }
    }

    function doATTR(prop, val) {
        var isSet = Boolean(val),
            args = arguments;
        if(isSet){
            this.each(function (node, i) {
                action.apply(node, args);
            });
            return this;

        } else {
            return Array.prototype.map.call(this.nodes, function (node) {
                return node.getAttribute(prop);
            })
        }
    }
    
    return (function(selector){
        var q = new Function();
        q.selector = selector;
        q.nodes = document.querySelectorAll(selector);
        q.each = function(action){
            Array.prototype.forEach.call(this.nodes, function(item, i){
                action(item, i);
            });
            return this;
        }
        q.toString = function(){return this.selector;}
        q.css = function(prop, val){
            return doCSS.call(this, prop, val);
        }
        q.attr = function (prop, val) {
            return doATTR.call(this, prop, val);
        }
        return q;
    });
})();