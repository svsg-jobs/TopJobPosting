class HeaderAnimation {
  // Hide Header on scroll downand reveal on scroll up
  constructor(headerSelector, delta = 50) {
    this.lastScrollTop = 0;
    this.delta = delta;
    this.header = document.querySelector(headerSelector);
    this.headerHeight = this.header.offsetHeight;

    // Ensure that the handleScroll method always has the correct "this" context
    this.handleScroll = this.handleScroll.bind(this);

    // Initial call to start the animation loop
    this.handleScroll();
  }

  hasScrolledTo(posY) {
    // Make sure they scroll more than delta
    if (Math.abs(this.lastScrollTop - posY) <= this.delta) return;
 
    // If they scrolled down and are past the navbar, prevent seeing header_space "behind" the navbar.
    if (posY > this.lastScrollTop && posY > this.headerHeight) {
      // Scrolled Down
      this.header.style.top = `-${this.headerHeight}px`;
    } else {
      // Scrolled Up
      if (posY + window.innerHeight < document.documentElement.scrollHeight) {
        this.header.style.top = '0px';
      }
    }
    this.lastScrollTop = posY;
  }

  handleScroll() {
    this.hasScrolledTo(window.scrollY);
    requestAnimationFrame(this.handleScroll);
  }
}
// Launch header scroll animation
const scrollHandlerInstance = new HeaderAnimation('body > header');

class Carousel {
  constructor(container) {
    // Check if there is a carousel
    if( !container ) return;  
    // Check if there are carousel items
    const listItems = container.querySelectorAll(":scope > li");
    if( !listItems.length ) return;
    
    this.container = container;
    this.defaultHeight = container.clientHeight; //offsetHeight;
    this.activeHeight = 4 * this.defaultHeight;
    this.activeLi = null;
    
    //listItems.forEach( (li) => {
    for(const li of listItems) {
      // Get index of current list item
      //li.idx = Array.prototype.indexOf.call(li.parentElement.children, li)
      
      li.addEventListener('pointerenter',  (element) => {
        const li = element.target;
        li.classList.add('active');
        
        // Set height to "active" when first time a list item is hovered
        if( this.activeLi == null ) {
          // First resize, then scroll
          element.target.parentElement.style.height = `${this.activeHeight}px`;
          window.scrollTo(0, window.scrollY + this.activeHeight - this.defaultHeight);
         };
        this.activeLi = li;
      });
      
      li.addEventListener('pointerleave',  (element) => {
        element.target.classList.remove('active');
      });
    };
    
    this.container.addEventListener('pointerleave', (element) => {
      if( this.activeLi == null ) return;
      // Remove delay from activ li
      //this.activeLi.style.transitionDuration = "0s";
      //this.activeLi.style.transitionDelay = "0s";
      // First scroll, then resize
      window.scrollTo(0, window.scrollY + this.defaultHeight - this.activeHeight);
      element.target.style.height = `${this.defaultHeight}px`;
      this.activeLi = null;
    });
  }  
};
// Create an instance of the Carousel class
const benefits = new Carousel(document.querySelector(".Company.benefits ul.carousel"));



const resizeBenefits = new ResizeObserver( (entries) => {
  for (const entry of entries) {
    let maxLeft = benefits.container.clientWidth - benefits.container.scrollWidth;
    if( maxLeft == 0 ) {
      document.querySelector('.log').innerText = benefits.container.clientWidth +" no scroll"
      benefits.container.style.cursor = "revert";
    } else {
      document.querySelector('.log').innerText = benefits.container.clientWidth +" "+ benefits.container.scrollWidth +" "+ maxLeft +" "+ (maxLeft / 2);
      benefits.container.style.marginLeft = `${maxLeft / 2}px`;
      benefits.container.style.cursor = "grab";
    }
  };
});
//resizeBenefits.observe(document.querySelector(".Company.benefits"));

const resizeContainer = new ResizeObserver( (entries) => {
  let txt = "<h2>resizeContainer.observe</h2>";
  txt += `entries.length: ${entries.length}<br>`;
  txt += `benefits.container.clientWidth: ${benefits.container.clientWidth}<br>`;
  txt += `benefits.container.scrollWidth: ${benefits.container.scrollWidth}<br>`;
  txt += `entries[0].target.clientWidth: ${entries[0].target.clientWidth}<br>`;
  txt += `entries[0].target.scrollWidth: ${entries[0].target.scrollWidth}<br>`;
  txt += `entries[0].borderBoxSize[0].inlineSize: ${entries[0].borderBoxSize[0].inlineSize}<br>`;
  txt += `entries[0].borderBoxSize[0].blockSize: ${entries[0].borderBoxSize[0].blockSize}<br>`;
  document.querySelector('.log').innerHTML = txt;
});
for (const li of document.querySelectorAll(".Company.benefits ul.carousel li")) {
  resizeContainer.observe(li);
}


document.addEventListener('mousemove', (event) => {
  //document.querySelector('.log').innerText = benefits.container.clientWidth +" "+ benefits.container.scrollWidth;
});
