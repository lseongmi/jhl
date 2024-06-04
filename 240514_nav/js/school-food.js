// 현재 날짜를 저장하는 변수 선언
let currentDate = new Date();

// 날짜, 요일을 화면에 표시하는 함수 
const displayDate = () => {
    // 요일을 나타내는 문자열을 선언
    let days = "일월화수목금토";
    // 현재 월 가져오기(month는 0부터 시작, +1 해줘야 함)
    let month = currentDate.getMonth() + 1 //1월이 0이기 때문
    // 현재 날짜 가져오기
    let date = currentDate.getDate();
    // 현재 요일 가져오기 (0:일요일, 1:월요일....)
    let day = currentDate.getDay()
    // days = days.split("");  /* 일월화수목금토 --> ['일', '월', ...] */
    // 제목 텍스트를 변경
    const schoolFoodTitleHeader = document.getElementsByClassName("school-food-title")[0];
    const titleText = `🍚 ${days.charAt(day)}요일(${month}/${date})의 메뉴 🍚`
    schoolFoodTitleHeader.innerText = titleText;    //innerText - 안쪽 텍스트를 대체된다.
}

//학교 급식 API 이용해서 급식 정보 가져오자
const API_KEY = "c6dd6fc68ca74cc99c15febc315f18ef";
const URL = "https://open.neis.go.kr/hub/mealServiceDietInfo";
const ATPT_OFCDC_SC_CODE = "B10";   //서울 특별시 교육청
const SD_SCHUL_CODE = "7011569";
const TYPE = "json";

const getSchoolFoodMenu = (dateData) => {
    let api_url = `${URL}?\
KEY=${API_KEY}\
&Type=${TYPE}\
&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}\
&SD_SCHUL_CODE=${SD_SCHUL_CODE}\
&MLSV_YMD=${dateData}`;
    
    // console.log(api_url);
    //동기요청
    // window.location.href = api_url
    
    //비동기 요청
    //error 없이 응답오면, 데이터 처리
    //error있으면 에러처리
    //fetch(api_url).then().catch()
    
    
    fetch(api_url) //api_url에 비동기적으로 요청
    .then((response) => response.json())
    .then((data) => setSchoolFoodMenu(data))
    .catch((error) => console.log(error)); 
    
    
    
}


//학교 급식 정보 표시하자
const setSchoolFoodMenu = (data) => {
    
    //HTML -> js 변수
    const breakfastMenuUL = document.getElementsByClassName("menu breakfast")[0];
    const lunchMenuUL = document.getElementsByClassName("menu lunch")[0];
    const dinnerMenuUL = document.getElementsByClassName("menu dinner")[0];
    
    //초기화 안하면 기존 값이 남아있음 주의
    breakfastMenuUL.innerHTML = "<li>급식 정보가 없습니다.</li>";
    lunchMenuUL.innerHTML = "<li>급식 정보가 없습니다.</li>";
    dinnerMenuUL.innerHTML = "<li>급식 정보가 없습니다.</li>";

    
    //data 적절히 처리: 조식음식들, 중식음식들, 석식음식들
    //식사들 가져오자
    //급식 정보가 없을때 data["mealServiceDietInfo"]으로 undefined 나온다 그럼 나가자
    if(data["mealServiceDietInfo"] == undefined) return;
    const menuData = data["mealServiceDietInfo"][1]["row"];
    //하나씩 꺼내자
    menuData.forEach((menuRow) => {
        let menuFood = ""; //음식 하나씩 <li> 태그로 감싼 덩어리
        //음식들 가져오자
        let menu = menuRow["DDISH_NM"];
        // menu: 음식 (1,2,3)<br/>음식2.(5)<br/>음식3 (3)
        //정규표현식: (....)찾아서 ""로 대체
        menu = menu.replace(/\([^()]*\)/g, "");
        menu = menu.replace("\.", "");
        menu = menu.replace("\*", "");
        
        
        //음식들 <br>태그로 나누자
        menu = menu.split("<br/>");
        
        //하나씩 꺼내어 <li class = "menu-food">하나의 꺼낸 음식</li>
        menu.forEach((food) => {
            menuFood += `<li class = "menu-food">${food}</li>\n`
        });
        
        //js 변수 -> HTML 표시
        if(menuRow["MMEAL_SC_NM"] == "조식") {
            breakfastMenuUL.innerHTML = menuFood;
        }
        else if(menuRow["MMEAL_SC_NM"] == "중식") {
            lunchMenuUL.innerHTML = menuFood;
        }
        else if(menuRow["MMEAL_SC_NM"] == "석식") {
            dinnerMenuUL.innerHTML = menuFood;
        }
    })
    // console.log("식사들 : ", data["mealServiceDietInfo"][1]["row"]);
    let breakfastMenu = "<li>밥</li><li>국</li>";
    
};

// 날짜 변경하고 화면에 표시하는 함수
const changeDate = (diff) => {
    // 현재 날짜에 diff만큼 더하거나 빼기
    currentDate.setDate(currentDate.getDate() + diff);
    // 변경된 날짜를 화면에 표시
    displayDate();


    // YYYYMMDD로 변환하고
    const dateData = currentDate.toISOString().slice(0, 10).replace(/-/g, "");
    getSchoolFoodMenu(dateData);
}

changeDate(0); //페이지 열자마자 오늘날짜 구해서 표시하자



// let 변우석 = {
    //     'name' : "변우석",
    //     'age' : 34,
    //     'height' : 189,
    //     'filmography' : ['선재업고튀어', '20세기 소녀'],
    
    // }
    
    // console.log(변우석.age);
    // console.log(변우석["age"]);
    // console.log(변우석.filmography) //-가 에러가남
    // console.log(변우석["filmography"]); //안정적으로 잘 나온다 -도 변수로 인식
    // console.log(변우석.filmography[0]) 
    // console.log(변우석["filmography"][0]);
    