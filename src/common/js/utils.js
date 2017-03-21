    class Utils {
        $$(selector, context) {
            context = context || document
            var elements = context.querySelectorAll(selector)
            return Array.prototype.slice.call(elements)
        }
        playBtn(sekectClass, text) {
            var p = text
            this.$$(sekectClass).forEach(function(pie) {
                var NS = "http://www.w3.org/2000/svg"
                var svg = document.createElementNS(NS, "svg")
                var circle = document.createElementNS(NS, "circle")
                var title = document.createElementNS(NS, "title")
                
                circle.setAttribute("r", 16)
                circle.setAttribute("cx", 16)
                circle.setAttribute("cy", 16)
                circle.setAttribute("stroke-dasharray", p + " 100")
                
                svg.setAttribute("viewBox", "0 0 32 32")
                title.textContent = p
                pie.textContent = ''
                svg.appendChild(title)
                svg.appendChild(circle)
                pie.appendChild(svg)
            })
        }
    }
    export default new Utils() 
