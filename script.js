// (1) querySelector를 이용하여 해당 요소를 선택하여 title 변수에 할당
const title = document.querySelector('h1');
// (2) 
const url = "https://api.github.com/users/john-smilga/followers?per_page=100";

const fetchFollowers = async () => { //비동기로 받아오기
  // 데이터 가져오기 
    
        const response = await fetch(url) //url 가져오기
        const data = await response.json(); //json 메서드로 변환한 뒤에 data로 반환
       return data;
}

const init = async () => {
  // fetchFollowers 함수의 반환값을 followers에 저장
	const followers = await fetchFollowers();
	// Loading -> Pagination 텍스트 수정
	title.textContent = "Pagination";

  pages = paginate(followers);
  setupUI();
};

const setupUI = () => {
  displayFollowers(pages[index]);
  displayButtons(btnContainer, pages, index);
};

let index = 0; // index 변수 선언 및 초기값 설정

init();


// (1) querySelector를 이용하여 해당 요소를 선택하여 container 변수에 할당
const container =  document.querySelector('.container');


// 2. 데이터 보여주기
const displayFollowers = (followers) => {
  let newFollowers = followers.map((person) => {
    const { avatar_url, login, html_url } = person;

    return `
        <article class="card">
            <img src="${avatar_url}" alt='person'/>
            <h4>${login}</h4>
            <a href="${html_url}" class="btn">view profile</a>
        </article>`;
  });

  newFollowers = newFollowers.join("");
  container.innerHTML = newFollowers;
};



// (1) querySelector를 이용하여 해당 요소를 선택하여 container 변수에 할당
const btnContainer = document.querySelector('.btn-container');



// (2)
const displayButtons = (container, pages, activeIndex) => {
  let btns = pages.map((_, pageIndex) => {
    // (4)
    return `<button class="page-btn ${
      activeIndex === pageIndex ? "active-btn" : ""
    }" data-index="${pageIndex}">
    ${pageIndex + 1}</button>`;
  });
  btns.push(`<button class="next-btn">next</button>`); //맨 뒤에 버튼 넣음
  btns.unshift(`<button class="prev-btn">prev</button>`); //맨 앞에 넣음

  container.innerHTML = btns.join("");
};

// 버튼에 이벤트 달기
btnContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-container")) return; //버튼영역이라 처리 x
  
    if (e.target.classList.contains("page-btn")) {
      index = parseInt(e.target.dataset.index);
      //int 형으로 바꾸기
    }
      
    if (e.target.classList.contains("next-btn")) {
      index++;
      if (index > pages.length - 1) {
        index = 0;
      }
    }
  
    if (e.target.classList.contains("prev-btn")) {
      index--;
      if (index < 0) {
        index = pages.length - 1;
      }
    }
    setupUI();

  
  });

  let pages = [];  // 팔로워 정보를 10개씩 나눠서 저장할 배열

// paginate() 함수는 팔로워 전체를 입력으로 받아 10명씩 나눠서 저장하는 함수
const paginate = (followers) => {
  const itemsPerPage = 10; //페이지당 10개
  const numberOfPages = Math.ceil(followers.length / itemsPerPage);

  const newFollowers = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
		
		
    return followers.slice(start, start + itemsPerPage);
  });

  return newFollowers;
};



