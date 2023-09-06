

// =================== NAVIGATION MENU +===============================

(() =>{

	const hamburgerBtn = document.querySelector(".hamburger-btn"),
	navMenu = document.querySelector(".nav-menu"),
	closeNavBtn = navMenu.querySelector(".close-nav-menu")

	hamburgerBtn.addEventListener("click", showNavMenu);
	closeNavBtn.addEventListener("click", hideNavMenu);


	function showNavMenu(){
		navMenu.classList.add("open");
		bodyScrollingToggle();
	}
	function hideNavMenu(){
		navMenu.classList.remove("open");
		fadeOutEffect();
		bodyScrollingToggle();
	}
	function fadeOutEffect(){
		document.querySelector(".fade-out-effect").classList.add("active");
		setTimeout(() =>{
			document.querySelector(".fade-out-effect").classList.remove("active");
		},300)
	}

	document.addEventListener("click", (event) =>{
		if(event.target.classList.contains('link-item')){
			if(event.target.hash !==""){
				event.preventDefault();
				const hash = event.target.hash;
				// deactive
				document.querySelector(".section.active").classList.add("hide");
				document.querySelector(".section.active").classList.remove("active");
				// active
				document.querySelector(hash).classList.add("active");
				document.querySelector(hash).classList.remove("hide");
				// deactive nav
				navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
				navMenu.querySelector(".active").classList.remove("active","inner-shadow");
				// jika ngeclik lewat navigation menu
				if(navMenu.classList.contains("open")){
					// active new nav
					event.target.classList.add("active","inner-shadow");
					event.target.classList.remove("outer-shadow","hover-in-shadow");
					// hide nav
					hideNavMenu();
				}
				else{
					let navItems = navMenu.querySelectorAll(".link-item");
					navItems.forEach((item) =>{
						if(hash === item.hash){
							item.classList.add("active","inner-shadow");
							item.classList.remove("outer-shadow","hover-in-shadow");
						}
					})
					fadeOutEffect();
				}
				window.location.hash = hash;
			}
		}
	})

})();


// ------------------- ABOUT SECTION TABS -----------------------------

(() =>{
		const aboutSection = document.querySelector(".about-section"),
		tabsContainer = document.querySelector(".about-tabs");

		tabsContainer.addEventListener("click", (event) => {
			if(event.target.classList.contains("tab-item") &&
			  !event.target.classList.contains("active")){
				const target = event.target.getAttribute("data-target");
				// deactive existing active 'tab-item'
				tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
				// active new 'tab-item'
				event.target.classList.add("active", "outer-shadow");
				// deactive existing active 'tab-content'
				aboutSection.querySelector(".tab-content.active").classList.remove("active");
				// active new 'tab-content'
				aboutSection.querySelector(target).classList.add("active");
			}
		})
})();

function bodyScrollingToggle(){
	document.body.classList.toggle("hidden-scrolling");
}

// ====================== PORTOFOLIO SECTION ==================================

(() =>{

	const filterContainer = document.querySelector(".portofolio-filter"),
	portofolioItemsContainer = document.querySelector(".portofolio-items"),
	portofolioItems = document.querySelectorAll(".portofolio-item"),
	popup = document.querySelector(".portofolio-popup"),
	prevBtn = popup.querySelector(".pp-prev"),
	nextBtn = popup.querySelector(".pp-next"),
	closeBtn = popup.querySelector(".pp-close"),
	projectDetailsContainer = popup.querySelector(".pp-details"),
	projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
	let itemIndex, slideIndex, screenshots;

	// filter portofolio item
	filterContainer.addEventListener("click", (event)=>{
		if(event.target.classList.contains("filter-item") &&
			!event.target.classList.contains("active")){
			// deactive existing active 'filter-item'
			filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
			// active new 'filter-item'
			event.target.classList.add("active","outer-shadow");
			const target = event.target.getAttribute("data-target");
			portofolioItems.forEach((item) =>{
				if(target === item.getAttribute("data-category") || target === 'all'){
					item.classList.remove("hide");
					item.classList.add("show");
				}
				else{
					item.classList.remove("show");
					item.classList.add("hide");
				}
			})
		}
	})

	portofolioItemsContainer.addEventListener("click", (event) =>{
		if(event.target.closest(".portofolio-item-inner")){
			const portofolioItem = event.target.closest(".portofolio-item-inner").parentElement;
			// get the portofolioItem Index
			itemIndex = Array.from(portofolioItem.parentElement.children).indexOf(portofolioItem);
			screenshots = portofolioItems[itemIndex].querySelector(".portofolio-item-img img").getAttribute("data-screenshots");
			// convert screenshots into array
			screenshots = screenshots.split(",");
			if(screenshots.length === 1){
				prevBtn.style.display="none";
				nextBtn.style.display="none";
			}
			else{
				prevBtn.style.display="block";
				nextBtn.style.display="block";
			}
			slideIndex = 0;
			popupToggle();
			popupSlideshow();
			popupDetails();
		}
	})

	closeBtn.addEventListener("click", () =>{
		popupToggle();
		if(projectDetailsContainer.classList.contains("active")){
			popupDetailsToggle();
		}
	})

	function popupToggle() {
		popup.classList.toggle("open");
		bodyScrollingToggle();
	}

	function popupSlideshow(){
		const imgSrc = screenshots[slideIndex];
		const popupImg = popup.querySelector(".pp-img");
		// active loader until the popupImg loaded
		popup.querySelector(".pp-loader").classList.add("active");
		popupImg.src=imgSrc;
		popupImg.onload = () => {
			// deactive
			popup.querySelector(".pp-loader").classList.remove("active");
		}
		popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + screenshots.length;
	}

	// next slide
	nextBtn.addEventListener("click", () => {
		if(slideIndex === screenshots.length-1){
			slideIndex = 0;
		}
		else{
			slideIndex++;
		}
		popupSlideshow();
	})

	// prev slide
	prevBtn.addEventListener("click", () => {
		if(slideIndex === 0){
			slideIndex = screenshots.length-1
		}
		else{
			slideIndex--;
		}
		popupSlideshow();
	})

	function popupDetails(){
		if(!portofolioItems[itemIndex].querySelector(".portofolio-item-details")){
			projectDetailsBtn.style.display="none";
			return;
		}
		projectDetailsBtn.style.display="block";
		// get project details
		const details = portofolioItems[itemIndex].querySelector(".portofolio-item-details").innerHTML;
		popup.querySelector(".pp-project-details").innerHTML = details;
		const title = portofolioItems[itemIndex].querySelector(".portofolio-item-title").innerHTML;
		popup.querySelector(".pp-title h2").innerHTML = title;
		const category = portofolioItems[itemIndex].getAttribute("data-category");
		popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
	}

	projectDetailsBtn.addEventListener("click", () => {
		popupDetailsToggle();
	})

	function popupDetailsToggle(){
		if(projectDetailsContainer.classList.contains("active")){
			projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
			projectDetailsBtn.querySelector("i").classList.add("fa-plus");
			projectDetailsContainer.classList.remove("active");
			projectDetailsContainer.style.maxHeight = 0 + "px";
		}
		else{
			projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
			projectDetailsBtn.querySelector("i").classList.add("fa-minus");
			projectDetailsContainer.classList.add("active");
			projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
			popup.scrollTo(0,projectDetailsContainer.offsetTop);
		}
	}

})();

// hide all section

(() =>{

	const sections = document.querySelectorAll(".section");
	sections.forEach((section) =>{
		if(!section.classList.contains("active")){
			section.classList.add("hide");
		}
	})

})();


	window.addEventListener("load", () =>{
		document.querySelector(".preloader").classList.add("fade-out");
		setTimeout(() =>{
			document.querySelector(".preloader").style.display="none";
		},600)
	})