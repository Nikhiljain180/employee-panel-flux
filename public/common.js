/**
 * Created by Nikhil Jain on 29-12-2016.
 */

/**********Small Javascript Function Library **********************/
/**
 * PolyFiling
 */
(function(global, document, undef) {

    var strundef = typeof(undef),
        strstring = typeof("");

    var stayZila = global.stayZila = global.stayZila||{};
    stayZila.stayZilaElement = function(elem){
        return({
            hasClass: function (className) {
                if (elem && typeof(className) === strstring) {
                    var classAttr = elem.getAttribute("class");
                    var classes = (classAttr) ? classAttr.split(" ") : [];
                    return (classes.indexOf(className) > -1);
                }
                return false;
            },
            addClass: function (className) {
                if (elem && typeof(className) === strstring && !this.hasClass(className)) {
                    var classAttr = elem.getAttribute("class");
                    var classes = (classAttr) ? classAttr.split(" ") : [];
                    classes.push(className);
                    this.attr("class", classes.join(" "));
                }
                return this;
            },
            attr: function(attrName, attrValue) {
                if (elem && typeof(attrName) === strstring && typeof(attrValue) === strundef) {
                    return elem.getAttribute(attrName);
                } else if (elem && typeof(attrName) === strstring && typeof(attrValue) !== strundef) {
                    elem.setAttribute(attrName, attrValue);
                    return attrValue;
                }
                return null;
            },
            removeClass: function(className) {
                if (elem && typeof(className) === strstring && this.hasClass(className)) {
                    var classAttr = elem.getAttribute("class");
                    var classes = (classAttr) ? classAttr.split(" ") : [];
                    var indexOfClass = classes.indexOf(className);
                    while (indexOfClass > -1) {
                        classes.splice(indexOfClass, 1);
                        indexOfClass = classes.indexOf(className);
                    }
                    this.attr("class", classes.join(" "));
                }
                return this;
            }
        })
    };
    stayZila.intToFormat = function(nStr){
        var neg = false;

        nStr = nStr += '';

        if(nStr.indexOf('-') !== -1){
            neg = true;
            nStr = nStr.split('-')[1];
        } else {
            neg = false;
        }


        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        var z = 0;
        var len = String(x1).length;
        var num = parseInt((len/2)-1);

        while (rgx.test(x1))
        {
            if(z > 0)
            {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            else
            {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
                rgx = /(\d+)(\d{2})/;
            }
            z++;
            num--;
            if(num === 0)
            {
                break;
            }
        }
        return (neg) ? ('-' + x1 + x2) : (x1 + x2);
    };
    stayZila.priceTransition = function (comp, initialPrice, finalPrice) {
        var diff, del, slots = 20, chPr, sign, time = 30;
        diff = finalPrice - initialPrice;
        if(diff === 0){
            return;
        }
        sign = diff < 0 ? -1 : 1;
        del = Math.abs(Math.abs(diff) < slots ? 1 : diff / slots);
        del = sign * Math.ceil(del);
        chPr = +initialPrice;

        setTimeout(function updatePrice() {
            chPr += del;
            slots = finalPrice - chPr == 0 ? 1 : slots;
            var textContent = slots == 1 ? finalPrice : chPr;
            comp.innerHTML = 'Rs.' + stayZila.intToFormat(textContent);

            slots -= 1;
            slots > 0 ? setTimeout(updatePrice, time) : '';
        }, time);
    };

}(window, document));

/********************************************************************************************************/

