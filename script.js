'use strict';

// 스크롤에 따른 메뉴바 색상 처리
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height; 
console.log(navbarHeight);
document.addEventListener("scroll", () => {
    // console.log("이벤트가 발생되었음!");
    // console.log(window.scrollY);
    if(window.scrollY > navbarHeight){
        navbar.classList.add("navbar--bold"); // if문이 true일때 클래스 생성됨
    }else{
        navbar.classList.remove("navbar--bold"); // if문이 false일때 클래스 삭제됨
    }
});

// 스크롤에 따른 메뉴바 고정 처리 + 메뉴 클릭시 자동 스크롤되어 화면 전환 처리
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (e) => {
    // console.log(e);
    const target = e.target;
    const link = target.dataset.link;

    if(link == null){
        return;
    }
    // console.log(link);
    navbarMenu.classList.remove("open");
    scrollIntoView(link);
});


// 모바일 메뉴 버튼 설정
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
    navbarMenu.classList.toggle("open");
});


// constact 버튼
const homeContactButton = document.querySelector(".home__contact");
homeContactButton.addEventListener("click", () => {
    scrollIntoView("#contact");
});


// arrow-up 버튼
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;

const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
    if(window.scrollY > homeHeight / 2){
        arrowUp.classList.add("visible");
    }else{
        arrowUp.classList.remove("visible");
    }
    home.style.opacity = 1 - window.scrollY / homeHeight;
});

arrowUp.addEventListener("click", () => {
    scrollIntoView("#home");
});


// 스크롤 관련 function
function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: "smooth" });
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}


// 선택한 프로젝트 보이게하기
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");

workBtnContainer.addEventListener("click", (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null){
        return;
    }

    const active = document.querySelector(".category__btn.selected");
    if(active != null){
        active.classList.remove("selected");
    }
    e.target.classList.add("selected");

    projectContainer.classList.add("anim-out");
    setTimeout(() => {
        projects.forEach((project) => {
            console.log(project.dataset.type);
            if(filter === "*" || filter === project.dataset.type){
                project.classList.remove("invisible");
            }else{
                project.classList.add("invisible");
            }
        });
        projectContainer.classList.remove("anim-out");
    }, 300);
});


//
const sectionIds = [
    "#home",
    "#about",
    "#skills",
    "#work",
    "#testimonials",
    "#contact"
];

const sections = sectionIds.map((id) => document.querySelector(id));
// console.log(sections);
const navItems = sectionIds.map((id) => document.querySelector(`[data-link="${id}"]`));
// console.log(navItems);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected){
    selectedNavItem.classList.remove("active");
    selectedNavItem = selected;
    selectedNavItem.classList.add("active");
}

const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3
}

const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0){
            console.log("y");
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            // console.log(index);
            if(entry.boundingClientRect.y < 0){
                selectedNavIndex = index + 1;
            }else{
                selectedNavIndex = index - 1;
            }
            console.log(selectedNavIndex);
        }
    });
}

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener("wheel", () => {
    if(window.scrollY === 0){
        selectedNavIndex = 0;
    }else if (window.scrollY + window.innerHeight === document.body.clientHeight){
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});








