
//selection item 요소들 가져오자.
const selectionItemDivs = document.getElementsByClassName("selection-item");

//4개의 페이지 요소 가져오자
const calendarDiv = document.getElementById("calendar");
const selectionWashingmachineTimeDiv = document.querySelector("#selection-washingmachine-time");
const selectionRoomNameDiv = document.getElementById("selection-room-name");
const boardDiv = document.querySelector("#board");

const pageDivs = [calendarDiv, selectionWashingmachineTimeDiv, selectionRoomNameDiv, boardDiv];

const setPage = (page) => {
    //clear selection
    for(const selectionItemDiv of selectionItemDivs) {
        selectionItemDiv.classList.remove("select-menu");
    }

    //selection 잘하자
    selectionItemDivs[page-1].classList.add("select-menu");


    //clear pageDiv
    pageDivs.forEach(pageDivs => {
        pageDivs.style.display = "none";
    });

    //show pageDiv 1
    pageDivs[page-1].style.display = "block";
}
setPage(1);

